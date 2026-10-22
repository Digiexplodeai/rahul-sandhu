import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import {
  verifyPassword,
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit,
  createSessionToken,
  SESSION_COOKIE_NAME,
  logActivity,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    // Rate-limiting check based on IP / username
    const forwardedFor = request.headers.get("x-forwarded-for") || "local";
    const rateLimitId = `${forwardedFor}-${username}`;
    const rateCheck = checkRateLimit(rateLimitId);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please wait ${rateCheck.retryAfterSec || 900} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    // Lookup user in admin_users table
    const dbUser = db.prepare("SELECT * FROM admin_users WHERE username = ?").get(username) as
      | { id: string; username: string; password_hash: string; salt?: string; role: string }
      | undefined;

    let isValid = false;

    if (dbUser) {
      isValid = verifyPassword(password, dbUser.password_hash, dbUser.salt);
    } else {
      // Check environment variables if explicitly configured
      const envUser = process.env.ADMIN_USERNAME;
      const envPass = process.env.ADMIN_PASSWORD;
      if (envUser && envPass && username === envUser && password === envPass) {
        isValid = true;
      }
    }

    if (!isValid) {
      const lockResult = recordFailedAttempt(rateLimitId);
      logActivity("LOGIN_FAILED", "admin_users", username, `Failed login attempt from ${forwardedFor}`, username);

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

    // Successful login: reset rate limit
    clearRateLimit(rateLimitId);

    const userId = dbUser ? dbUser.id : "admin-env";
    const role = dbUser ? dbUser.role : "SuperAdmin";

    // Create cryptographically signed HMAC session token
    const token = createSessionToken(userId, username, role);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Also set legacy cookie for compatibility during transitional phase
    cookieStore.set("admin_session", "auth_" + userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    logActivity("LOGIN_SUCCESS", "admin_users", userId, `Successful login from ${forwardedFor}`, username);

    return NextResponse.json({
      success: true,
      user: { id: userId, username, role },
      message: "Logged in successfully",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error logging in";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
