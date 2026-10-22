import { NextResponse } from "next/server";
import { getBlogs, createBlog, updateBlog, deleteBlog, getBlogById } from "@/lib/queries";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = getBlogs(false);
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    if (!b.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const slug = b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const id = createBlog({
      ...b,
      slug,
      is_published: b.is_published !== undefined ? Number(b.is_published) : 1,
    });

    logActivity("BLOG_CREATED", "blogs", id, `Published blog article: ${b.title}`, admin.username);
    return NextResponse.json({ success: true, id, data: { id, slug }, message: "Blog created successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    if (!b.id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    updateBlog(b.id, {
      ...b,
      is_published: b.is_published !== undefined ? Number(b.is_published) : undefined,
    });

    logActivity("BLOG_UPDATED", "blogs", b.id, `Updated blog: ${b.title || b.id}`, admin.username);
    return NextResponse.json({ success: true, message: "Blog updated successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const current = getBlogById(id);
    deleteBlog(id);

    logActivity("BLOG_DELETED", "blogs", id, `Deleted blog: ${current?.title || id}`, admin.username);
    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
