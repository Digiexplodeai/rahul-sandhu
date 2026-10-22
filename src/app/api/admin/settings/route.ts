import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/queries";
import { cookies } from "next/headers";

async function isAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return Boolean(session?.value);
}

export async function GET() {
  const auth = await isAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = getSiteSettings();
  return NextResponse.json({ success: true, settings });
}

export async function POST(request: Request) {
  const auth = await isAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    updateSiteSettings(body);
    return NextResponse.json({ success: true, message: "Settings saved successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error saving settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
