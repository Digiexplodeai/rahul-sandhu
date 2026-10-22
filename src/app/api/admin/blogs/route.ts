import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getBlogs } from "@/lib/queries";
import { cookies } from "next/headers";

async function isAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return Boolean(session?.value);
}

export async function GET() {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = getBlogs(false);
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: Request) {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    const id = b.id || "blog-" + Date.now();
    const slug = b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    db.prepare(`
      INSERT INTO blogs
      (id, slug, title, excerpt, content, cover_image, category, author, read_time, published_date, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      slug,
      b.title,
      b.excerpt || "",
      b.content || "",
      b.cover_image || "/images/surgery-300x225.png",
      b.category || "Cancer Awareness",
      b.author || "Lt Col (Dr) Rahul Sandhu",
      b.read_time || "5 min read",
      b.published_date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      b.is_published !== undefined ? b.is_published : 1
    );
    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    db.prepare(`
      UPDATE blogs SET
      title = ?, excerpt = ?, content = ?, cover_image = ?, category = ?,
      author = ?, read_time = ?, published_date = ?, is_published = ?
      WHERE id = ?
    `).run(
      b.title,
      b.excerpt || "",
      b.content || "",
      b.cover_image || "",
      b.category || "",
      b.author || "",
      b.read_time || "",
      b.published_date || "",
      b.is_published !== undefined ? b.is_published : 1,
      b.id
    );
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating blog";
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
    db.prepare("DELETE FROM blogs WHERE id = ?").run(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
