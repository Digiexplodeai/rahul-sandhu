import { NextResponse } from "next/server";
import { createEnquiry, getEnquiries } from "@/lib/queries";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.patient_name || !body.phone) {
      return NextResponse.json(
        { error: "Patient name and contact phone are required" },
        { status: 400 }
      );
    }

    const id = createEnquiry({
      patient_name: body.patient_name,
      phone: body.phone,
      email: body.email || "",
      preferred_date: body.preferred_date || "",
      preferred_location: body.preferred_location || "Shalby Hospital, Mohali",
      cancer_type: body.cancer_type || "General Consultation",
      message: body.message || "",
    });

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const enquiries = getEnquiries();
    return NextResponse.json({ success: true, data: enquiries });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
