import { NextResponse } from "next/server";
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from "@/lib/queries";
import { cookies } from "next/headers";

async function isAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return Boolean(session?.value);
}

export async function GET() {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = getEnquiries();
  return NextResponse.json({ success: true, data: items });
}

export async function PUT(request: Request) {
  const auth = await isAuth();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, status } = await request.json();
    updateEnquiryStatus(id, status);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating enquiry";
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
    deleteEnquiry(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting enquiry";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
