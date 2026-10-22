import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getTreatments } from "@/lib/queries";
import { cookies } from "next/headers";

async function isAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return Boolean(session?.value);
}

export async function GET() {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = getTreatments(false);
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: Request) {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    const id = b.id || "treat-" + Date.now();
    const slug = b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    db.prepare(`
      INSERT INTO treatments
      (id, slug, title, subtitle, excerpt, description, indications, procedure_steps, benefits, recovery_info, image, order_num, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      slug,
      b.title,
      b.subtitle || "",
      b.excerpt || "",
      b.description || "",
      b.indications || "",
      b.procedure_steps || "",
      b.benefits || "",
      b.recovery_info || "",
      b.image || "/images/tumor-resection.jpg",
      b.order_num || 99,
      b.is_published !== undefined ? b.is_published : 1
    );
    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating treatment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    db.prepare(`
      UPDATE treatments SET
      title = ?, subtitle = ?, excerpt = ?, description = ?, indications = ?,
      procedure_steps = ?, benefits = ?, recovery_info = ?, image = ?,
      order_num = ?, is_published = ?
      WHERE id = ?
    `).run(
      b.title,
      b.subtitle || "",
      b.excerpt || "",
      b.description || "",
      b.indications || "",
      b.procedure_steps || "",
      b.benefits || "",
      b.recovery_info || "",
      b.image || "",
      b.order_num || 0,
      b.is_published !== undefined ? b.is_published : 1,
      b.id
    );
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating treatment";
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
    db.prepare("DELETE FROM treatments WHERE id = ?").run(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting treatment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
