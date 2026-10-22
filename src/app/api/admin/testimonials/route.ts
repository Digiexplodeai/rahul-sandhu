import { NextResponse } from "next/server";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, getTestimonialById } from "@/lib/queries";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = getTestimonials(false);
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const t = await request.json();
    if (!t.author_name || !t.content) {
      return NextResponse.json({ error: "Author name and content are required" }, { status: 400 });
    }

    const id = createTestimonial({
      author_name: t.author_name,
      author_location: t.author_location || "",
      condition: t.condition || "",
      content: t.content,
      rating: t.rating ? Number(t.rating) : 5,
      source: t.source || "Google Reviews (Verified)",
      is_featured: t.is_featured ? 1 : 0,
      is_approved: t.is_approved !== undefined ? Number(t.is_approved) : 1,
      consent_given: t.consent_given !== undefined ? Number(t.consent_given) : 1,
      image: t.image || "",
      order_num: t.order_num ? Number(t.order_num) : 0,
      created_at: t.created_at || new Date().toISOString(),
    });

    logActivity("TESTIMONIAL_CREATED", "testimonials", id, `Added testimonial by: ${t.author_name}`, admin.username);
    return NextResponse.json({ success: true, id, message: "Testimonial created successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const t = await request.json();
    if (!t.id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    updateTestimonial(t.id, {
      ...t,
      rating: t.rating !== undefined ? Number(t.rating) : undefined,
      is_featured: t.is_featured !== undefined ? Number(t.is_featured) : undefined,
      is_approved: t.is_approved !== undefined ? Number(t.is_approved) : undefined,
      consent_given: t.consent_given !== undefined ? Number(t.consent_given) : undefined,
      order_num: t.order_num !== undefined ? Number(t.order_num) : undefined,
    });

    logActivity("TESTIMONIAL_UPDATED", "testimonials", t.id, `Updated testimonial by: ${t.author_name || t.id}`, admin.username);
    return NextResponse.json({ success: true, message: "Testimonial updated successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating testimonial";
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

    const current = getTestimonialById(id);
    deleteTestimonial(id);

    logActivity("TESTIMONIAL_DELETED", "testimonials", id, `Deleted testimonial by: ${current?.author_name || id}`, admin.username);
    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
