import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import {
  verifyPassword,
  hashPassword,
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit,
  createSessionToken,
  SESSION_COOKIE_NAME,
  logActivity,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON request payload" }, { status: 400 });
    }

    const { username, password } = body;

    if (!username || !password || typeof username !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    const trimmedUser = username.trim();

    // Rate-limiting check based on IP / username
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const rateLimitId = `${forwardedFor}-${trimmedUser}`;
    const rateCheck = checkRateLimit(rateLimitId);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please wait ${rateCheck.retryAfterSec || 900} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    // 1. Lookup user in admin_users table with isolated error handling
    let dbUser:
      | { id: string; username: string; password_hash: string; salt?: string; role: string }
      | undefined;

    try {
      dbUser = db.prepare("SELECT * FROM admin_users WHERE username = ?").get(trimmedUser) as
        | { id: string; username: string; password_hash: string; salt?: string; role: string }
        | undefined;
    } catch (dbErr) {
      console.error("[AUTH_DB_ERROR] Failed to query admin_users:", dbErr instanceof Error ? dbErr.message : dbErr);
      return NextResponse.json(
        { error: "Database service connectivity error. Please check server logs." },
        { status: 500 }
      );
    }

    let isValid = false;

    // 2. Primary authentication: Check stored PBKDF2 hash & salt
    if (dbUser && dbUser.password_hash) {
      isValid = verifyPassword(password, dbUser.password_hash, dbUser.salt);
    }

    // 3. Authorized Production Environment Variable Recovery & Bootstrap
    // If database verification fails or admin user does not yet exist, check if server-side environment secrets are provided
    const envUser = (process.env.ADMIN_USERNAME || "admin").trim();
    const envPass = process.env.ADMIN_PASSWORD;

    if (!isValid && envPass && envPass.length >= 8 && trimmedUser === envUser && password === envPass) {
      console.log(`[AUTH_BOOTSTRAP] Administrator credentials authenticated via environment secret for "${trimmedUser}". Synchronizing database record.`);
      const { hash: newHash, salt: newSalt } = hashPassword(envPass);

      try {
        if (dbUser) {
          db.prepare("UPDATE admin_users SET password_hash = ?, salt = ?, updated_at = ? WHERE id = ?")
            .run(newHash, newSalt, new Date().toISOString(), dbUser.id);
        } else {
          db.prepare(
            "INSERT INTO admin_users (id, username, password_hash, salt, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
          ).run("admin-1", trimmedUser, newHash, newSalt, "SuperAdmin", new Date().toISOString(), new Date().toISOString());
        }
        isValid = true;
      } catch (syncErr) {
        console.warn("[AUTH_BOOTSTRAP_WARN] Could not persist synchronized hash to database:", syncErr instanceof Error ? syncErr.message : syncErr);
        // Allow session creation since environment variable authenticated successfully
        isValid = true;
      }
    }

    // 4. Failed Authentication Handling
    if (!isValid) {
      const lockResult = recordFailedAttempt(rateLimitId);
      logActivity("LOGIN_FAILED", "admin_users", trimmedUser, `Failed login attempt from ${forwardedFor}`, trimmedUser);

      if (lockResult.locked) {
        return NextResponse.json(
          {
            error: `Too many failed login attempts. Account temporarily locked for ${lockResult.retryAfterSec} seconds.`,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: "Invalid username or password.",
        },
        { status: 401 }
      );
    }

    // 5. Successful Login: Clear rate limit & issue secure sessions
    clearRateLimit(rateLimitId);

    const userId = dbUser ? dbUser.id : "admin-1";
    const userRole = dbUser ? dbUser.role : "SuperAdmin";

    // Create cryptographically signed HMAC-SHA256 session token
    const token = createSessionToken(userId, trimmedUser, userRole);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Also set legacy cookie for backwards compatibility during rolling deployments
    cookieStore.set("admin_session", "auth_" + userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    logActivity("LOGIN_SUCCESS", "admin_users", userId, `Successful login from ${forwardedFor}`, trimmedUser);

    return NextResponse.json({
      success: true,
      user: { id: userId, username: trimmedUser, role: userRole },
      message: "Logged in successfully",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal authentication error";
    console.error("[AUTH_INTERNAL_ERROR]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST with credentials to authenticate." },
    { status: 405 }
  );
}
