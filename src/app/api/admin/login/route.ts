import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "admin123";

    // Also check database admin_users
    const dbUser = db.prepare("SELECT * FROM admin_users WHERE username = ?").get(username) as
      | { password_hash: string }
      | undefined;

    const isValid =
      (username === expectedUser && password === expectedPass) ||
      (dbUser && dbUser.password_hash === password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated_session_" + Date.now(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Logged in successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error logging in";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
