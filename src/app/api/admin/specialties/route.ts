import { NextResponse } from "next/server";
import { getSpecialties, createSpecialty, updateSpecialty, deleteSpecialty, getSpecialtyById } from "@/lib/queries";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = getSpecialties(false);
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    if (!b.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const slug = b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const id = createSpecialty({
      ...b,
      slug,
      order_num: b.order_num !== undefined ? Number(b.order_num) : 0,
      is_published: b.is_published !== undefined ? Number(b.is_published) : 1,
    });

    logActivity("SPECIALTY_CREATED", "specialties", id, `Created cancer speciality: ${b.title}`, admin.username);
    return NextResponse.json({ success: true, id, data: { id, slug }, message: "Speciality created successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating specialty";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const b = await request.json();
    if (!b.id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    updateSpecialty(b.id, {
      ...b,
      order_num: b.order_num !== undefined ? Number(b.order_num) : undefined,
      is_published: b.is_published !== undefined ? Number(b.is_published) : undefined,
    });

    logActivity("SPECIALTY_UPDATED", "specialties", b.id, `Updated cancer speciality: ${b.title || b.id}`, admin.username);
    return NextResponse.json({ success: true, message: "Speciality updated successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating specialty";
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

    const current = getSpecialtyById(id);
    deleteSpecialty(id);

    logActivity("SPECIALTY_DELETED", "specialties", id, `Deleted cancer speciality: ${current?.title || id}`, admin.username);
    return NextResponse.json({ success: true, message: "Speciality deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting specialty";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
