import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getAuthenticatedAdmin, verifyPassword, hashPassword, logActivity } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    // Verify current user
    const dbUser = db.prepare("SELECT * FROM admin_users WHERE username = ?").get(admin.username) as
      | { id: string; password_hash: string; salt?: string }
      | undefined;

    if (!dbUser) {
      return NextResponse.json({ error: "User record not found." }, { status: 404 });
    }

    const isCurrentValid = verifyPassword(currentPassword, dbUser.password_hash, dbUser.salt);
    if (!isCurrentValid) {
      return NextResponse.json({ error: "Incorrect current password." }, { status: 403 });
    }

    // Hash new password with cryptographically secure random salt
    const { hash, salt } = hashPassword(newPassword);

    db.prepare(`
      UPDATE admin_users 
      SET password_hash = ?, salt = ?, updated_at = ?
      WHERE id = ?
    `).run(hash, salt, new Date().toISOString(), dbUser.id);

    logActivity("PASSWORD_CHANGED", "admin_users", dbUser.id, `Password updated for user ${admin.username}`, admin.username);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully. Your account is now secured.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error changing password";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
