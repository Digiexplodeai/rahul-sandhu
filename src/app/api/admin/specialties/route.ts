import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getSpecialties } from "@/lib/queries";
import { cookies } from "next/headers";

async function isAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return Boolean(session?.value);
}

export async function GET() {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = getSpecialties(false);
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: Request) {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    const id = b.id || "spec-" + Date.now();
    const slug = b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    db.prepare(`
      INSERT INTO specialties
      (id, slug, title, subtitle, excerpt, description, symptoms, diagnosis, surgical_approaches, post_care, image, order_num, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      slug,
      b.title,
      b.subtitle || "",
      b.excerpt || "",
      b.description || "",
      b.symptoms || "",
      b.diagnosis || "",
      b.surgical_approaches || "",
      b.post_care || "",
      b.image || "/images/tumor-resection.jpg",
      b.order_num || 99,
      b.is_published !== undefined ? b.is_published : 1
    );
    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating specialty";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    db.prepare(`
      UPDATE specialties SET
      title = ?, subtitle = ?, excerpt = ?, description = ?, symptoms = ?,
      diagnosis = ?, surgical_approaches = ?, post_care = ?, image = ?,
      order_num = ?, is_published = ?
      WHERE id = ?
    `).run(
      b.title,
      b.subtitle || "",
      b.excerpt || "",
      b.description || "",
      b.symptoms || "",
      b.diagnosis || "",
      b.surgical_approaches || "",
      b.post_care || "",
      b.image || "",
      b.order_num || 0,
      b.is_published !== undefined ? b.is_published : 1,
      b.id
    );
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating specialty";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    db.prepare("DELETE FROM specialties WHERE id = ?").run(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting specialty";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
