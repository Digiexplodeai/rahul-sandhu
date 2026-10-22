import { NextResponse } from "next/server";
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from "@/lib/queries";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";

export async function GET(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");
  const items = getEnquiries();

  if (format === "csv") {
    // Generate CSV export
    const headers = ["Lead ID", "Patient Name", "Phone", "Email", "Location", "Cancer Type", "Status", "Source", "Date Submitted", "Message", "Notes"];
    const rows = items.map((e) => [
      `"${e.id}"`,
      `"${(e.patient_name || "").replace(/"/g, '""')}"`,
      `"${(e.phone || "").replace(/"/g, '""')}"`,
      `"${(e.email || "").replace(/"/g, '""')}"`,
      `"${(e.preferred_location || "").replace(/"/g, '""')}"`,
      `"${(e.cancer_type || "").replace(/"/g, '""')}"`,
      `"${(e.status || "").replace(/"/g, '""')}"`,
      `"${(e.source || "").replace(/"/g, '""')}"`,
      `"${(e.created_at || "").replace(/"/g, '""')}"`,
      `"${(e.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${(e.notes || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="dr-sandhu-patient-leads-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  }

  return NextResponse.json({ success: true, data: items });
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status, notes } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing enquiry ID" }, { status: 400 });

    updateEnquiryStatus(id, status, notes);
    logActivity("ENQUIRY_UPDATED", "enquiries", id, `Updated enquiry status to "${status}"`, admin.username);

    return NextResponse.json({ success: true, message: "Enquiry updated" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating enquiry";
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

    deleteEnquiry(id);
    logActivity("ENQUIRY_DELETED", "enquiries", id, `Deleted enquiry record`, admin.username);

    return NextResponse.json({ success: true, message: "Enquiry deleted" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting enquiry";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
