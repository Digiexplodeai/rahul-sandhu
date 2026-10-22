import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuthenticatedAdmin, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    user: admin,
  });
}

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true, message: "Logged out" });
}
