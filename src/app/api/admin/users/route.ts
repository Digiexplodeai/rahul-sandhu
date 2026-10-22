import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getAuthenticatedAdmin, hashPassword, logActivity } from "@/lib/auth";
import { getAdminUsers } from "@/lib/queries";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = getAdminUsers();
  return NextResponse.json({ success: true, data: users });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { username, password, role } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    // Check existing
    const existing = db.prepare("SELECT id FROM admin_users WHERE username = ?").get(username);
    if (existing) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    const { hash, salt } = hashPassword(password);
    const id = "admin-" + Date.now();
    const userRole = role || "Admin";

    db.prepare(`
      INSERT INTO admin_users (id, username, password_hash, salt, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, username, hash, salt, userRole, new Date().toISOString(), new Date().toISOString());

    logActivity("USER_CREATED", "admin_users", id, `Created admin user: ${username} (${userRole})`, admin.username);

    return NextResponse.json({ success: true, id, message: "Admin user created successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing user ID" }, { status: 400 });

    const targetUser = db.prepare("SELECT username FROM admin_users WHERE id = ?").get(id) as { username: string } | undefined;
    if (!targetUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (targetUser.username === admin.username) {
      return NextResponse.json({ error: "You cannot delete your own admin account" }, { status: 400 });
    }

    db.prepare("DELETE FROM admin_users WHERE id = ?").run(id);
    logActivity("USER_DELETED", "admin_users", id, `Deleted admin user: ${targetUser.username}`, admin.username);

    return NextResponse.json({ success: true, message: "User deleted" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
