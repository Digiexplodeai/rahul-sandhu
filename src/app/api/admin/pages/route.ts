import { NextResponse } from "next/server";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";
import { getPages, updatePage } from "@/lib/queries";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pages = getPages();
  return NextResponse.json({ success: true, data: pages });
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "Missing page ID" }, { status: 400 });

    updatePage(body.id, {
      title: body.title,
      meta_title: body.meta_title,
      meta_description: body.meta_description,
      is_published: body.is_published !== undefined ? Number(body.is_published) : undefined,
    });

    logActivity("PAGE_UPDATED", "pages", body.id, `Updated page metadata for "${body.title || body.id}"`, admin.username);

    return NextResponse.json({ success: true, message: "Page metadata updated successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating page";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
