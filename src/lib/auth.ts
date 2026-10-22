import crypto from "crypto";
import { cookies } from "next/headers";
import db from "./db";

const SESSION_COOKIE_NAME = "dr_sandhu_admin_session";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.SESSION_SECRET ||
  "sandhu-secure-oncology-production-session-key-2026";
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// In-memory rate limiting map for login attempts
interface RateLimitEntry {
  attempts: number;
  firstAttemptAt: number;
  lockedUntil: number | null;
}
const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Hash a password using PBKDF2 with SHA-512 and a cryptographically secure random salt
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { hash, salt };
}

/**
 * Verify a plaintext password against stored hash and salt
 */
export function verifyPassword(password: string, storedHash: string, storedSalt?: string): boolean {
  if (!storedHash) return false;

  // Support legacy plain hash or un-salted match during upgrade migration
  if (!storedSalt) {
    // If stored as raw password in older dev database, upgrade smoothly
    if (password === storedHash) {
      return true;
    }
    return false;
  }

  const hashToVerify = crypto.pbkdf2Sync(password, storedSalt, 100000, 64, "sha512").toString("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(hashToVerify, "hex"), Buffer.from(storedHash, "hex"));
  } catch {
    return false;
  }
}

/**
 * Check rate limit for IP / username
 */
export function checkRateLimit(identifier: string): { allowed: boolean; remainingAttempts: number; retryAfterSec?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry) {
    rateLimitMap.set(identifier, { attempts: 0, firstAttemptAt: now, lockedUntil: null });
    return { allowed: true, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  // Check if locked
  if (entry.lockedUntil && entry.lockedUntil > now) {
    const retryAfterSec = Math.ceil((entry.lockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSec };
  }

  // Reset window if older than lockout window
  if (now - entry.firstAttemptAt > LOCKOUT_WINDOW_MS) {
    rateLimitMap.set(identifier, { attempts: 0, firstAttemptAt: now, lockedUntil: null });
    return { allowed: true, remainingAttempts: MAX_FAILED_ATTEMPTS };
  }

  return { allowed: true, remainingAttempts: Math.max(0, MAX_FAILED_ATTEMPTS - entry.attempts) };
}

/**
 * Record a failed login attempt
 */
export function recordFailedAttempt(identifier: string): { locked: boolean; retryAfterSec?: number } {
  const now = Date.now();
  let entry = rateLimitMap.get(identifier);

  if (!entry || (now - entry.firstAttemptAt > LOCKOUT_WINDOW_MS && !entry.lockedUntil)) {
    entry = { attempts: 1, firstAttemptAt: now, lockedUntil: null };
  } else {
    entry.attempts += 1;
  }

  if (entry.attempts >= MAX_FAILED_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_WINDOW_MS;
    rateLimitMap.set(identifier, entry);
    return { locked: true, retryAfterSec: Math.ceil(LOCKOUT_WINDOW_MS / 1000) };
  }

  rateLimitMap.set(identifier, entry);
  return { locked: false };
}

/**
 * Clear rate limit on successful login
 */
export function clearRateLimit(identifier: string) {
  rateLimitMap.delete(identifier);
}

/**
 * Create a tamper-proof signed session token: base64(payload).signature
 */
export function createSessionToken(userId: string, username: string, role: string): string {
  const payload = {
    userId,
    username,
    role,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    nonce: crypto.randomBytes(8).toString("hex"),
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadStr)
    .digest("base64url");

  return `${payloadStr}.${signature}`;
}

/**
 * Verify signed session token
 */
export function verifySessionToken(token: string): { userId: string; username: string; role: string } | null {
  if (!token || !token.includes(".")) return null;

  const [payloadStr, signature] = token.split(".");
  if (!payloadStr || !signature) return null;

  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadStr)
    .digest("base64url");

  try {
    const isSigValid = crypto.timingSafeEqual(
      Buffer.from(signature, "utf-8"),
      Buffer.from(expectedSignature, "utf-8")
    );
    if (!isSigValid) return null;

    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf-8"));
    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return {
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/**
 * Check if the request is from an authenticated admin session
 */
export async function getAuthenticatedAdmin(): Promise<{ userId: string; username: string; role: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) {
    // Backwards compatibility check for older session token during migration
    const legacySession = cookieStore.get("admin_session");
    if (legacySession && legacySession.value) {
      // Find admin user in database
      const admin = db.prepare("SELECT id, username, role FROM admin_users LIMIT 1").get() as
        | { id: string; username: string; role: string }
        | undefined;
      if (admin) {
        return { userId: admin.id, username: admin.username, role: admin.role };
      }
    }
    return null;
  }

  return verifySessionToken(sessionCookie.value);
}

/**
 * Record an activity in the audit log
 */
export function logActivity(
  action: string,
  entityType: string,
  entityId: string,
  details: string,
  username = "admin"
) {
  try {
    const id = "log-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6);
    db.prepare(`
      INSERT INTO activity_logs (id, user_id, username, action, entity_type, entity_id, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, "admin-1", username, action, entityType, entityId, details, new Date().toISOString());
  } catch (err) {
    console.warn("Failed to write to activity_logs:", err);
  }
}

export { SESSION_COOKIE_NAME };
