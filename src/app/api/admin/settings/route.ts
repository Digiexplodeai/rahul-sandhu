import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/queries";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = getSiteSettings();
  return NextResponse.json({ success: true, settings, data: settings });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    updateSiteSettings(body);
    logActivity("SETTINGS_UPDATED", "site_settings", "global", `Updated ${Object.keys(body).length} site settings`, admin.username);
    return NextResponse.json({ success: true, message: "Settings updated successfully", data: getSiteSettings() });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error saving settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const PUT = POST;
