import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";
import { getPageSections, updatePageSection } from "@/lib/queries";

export async function GET(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "/";

  const sections = getPageSections(page);
  return NextResponse.json({ success: true, data: sections });
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "Missing section ID" }, { status: 400 });

    updatePageSection(body.id, {
      title: body.title,
      subtitle: body.subtitle,
      content: body.content,
      image: body.image,
      is_visible: body.is_visible !== undefined ? Number(body.is_visible) : undefined,
      order_num: body.order_num !== undefined ? Number(body.order_num) : undefined,
      settings_json: body.settings_json,
    });

    logActivity("SECTION_UPDATED", "page_sections", body.id, `Updated section ${body.title || body.id}`, admin.username);

    return NextResponse.json({ success: true, message: "Section updated successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating section";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Bulk update order or visibility
export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (Array.isArray(body.sections)) {
      const stmt = db.prepare(`
        UPDATE page_sections SET
        order_num = ?, is_visible = ?, updated_at = ?
        WHERE id = ?
      `);

      const updateTx = db.transaction((secs: { id: string; order_num: number; is_visible: number }[]) => {
        for (const s of secs) {
          stmt.run(s.order_num, s.is_visible, new Date().toISOString(), s.id);
        }
      });

      updateTx(body.sections);
      logActivity("SECTIONS_REORDERED", "page_sections", "bulk", "Reordered homepage sections", admin.username);
      return NextResponse.json({ success: true, message: "Sections reordered successfully" });
    }

    // Single add section
    const id = "sec-" + Date.now();
    db.prepare(`
      INSERT INTO page_sections (id, page_slug, section_key, title, subtitle, content, image, is_visible, order_num, settings_json, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.page_slug || "/",
      body.section_key || id,
      body.title,
      body.subtitle || "",
      body.content || "",
      body.image || "",
      body.is_visible !== undefined ? body.is_visible : 1,
      body.order_num || 99,
      body.settings_json || "{}",
      new Date().toISOString()
    );

    logActivity("SECTION_CREATED", "page_sections", id, `Created new section: ${body.title}`, admin.username);
    return NextResponse.json({ success: true, id, message: "Section added successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating sections";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
