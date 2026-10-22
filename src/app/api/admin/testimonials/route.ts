import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getTestimonials } from "@/lib/queries";
import { cookies } from "next/headers";

async function isAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return Boolean(session?.value);
}

export async function GET() {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = getTestimonials(false);
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: Request) {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    const id = b.id || "test-" + Date.now();
    db.prepare(`
      INSERT INTO testimonials
      (id, author_name, author_location, condition, content, rating, source, is_featured, is_approved, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      b.author_name,
      b.author_location || "Punjab",
      b.condition || "Oncology Care",
      b.content,
      b.rating || 5,
      b.source || "Google Reviews",
      b.is_featured || 0,
      b.is_approved !== undefined ? b.is_approved : 1,
      b.created_at || new Date().toISOString().split("T")[0]
    );
    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    db.prepare(`
      UPDATE testimonials SET
      author_name = ?, author_location = ?, condition = ?, content = ?,
      rating = ?, source = ?, is_featured = ?, is_approved = ?
      WHERE id = ?
    `).run(
      b.author_name,
      b.author_location,
      b.condition,
      b.content,
      b.rating,
      b.source,
      b.is_featured,
      b.is_approved,
      b.id
    );
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating testimonial";
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
    db.prepare("DELETE FROM testimonials WHERE id = ?").run(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
