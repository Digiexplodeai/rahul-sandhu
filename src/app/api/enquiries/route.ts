import { NextResponse } from "next/server";
import { createEnquiry, getEnquiries } from "@/lib/queries";
import { getAuthenticatedAdmin } from "@/lib/auth";

// Public enquiry submission rate limiting
const ipSubmissions = new Map<string, { count: number; windowStart: number }>();

export async function POST(request: Request) {
  try {
    // Rate limit checks (max 5 submissions per 10 minutes per IP)
    const forwardedFor = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const entry = ipSubmissions.get(forwardedFor);

    if (entry) {
      if (now - entry.windowStart < 10 * 60 * 1000) {
        if (entry.count >= 5) {
          return NextResponse.json(
            { error: "Too many enquiries submitted recently. Please call +91 9888970519 directly." },
            { status: 429 }
          );
        }
        entry.count += 1;
      } else {
        ipSubmissions.set(forwardedFor, { count: 1, windowStart: now });
      }
    } else {
      ipSubmissions.set(forwardedFor, { count: 1, windowStart: now });
    }

    const body = await request.json();

    const name = (body.patient_name || body.name || "").trim();
    const phone = (body.phone || "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid patient name." },
        { status: 400 }
      );
    }

    if (!phone || phone.length < 7) {
      return NextResponse.json(
        { error: "Please provide a valid contact phone number." },
        { status: 400 }
      );
    }

    const id = createEnquiry({
      patient_name: name,
      phone: phone,
      email: (body.email || "").trim(),
      preferred_date: (body.preferred_date || "").trim(),
      preferred_location: (body.preferred_location || "Shalby Hospital, Mohali").trim(),
      cancer_type: (body.cancer_type || body.speciality || body.treatment || "General Consultation").trim(),
      message: (body.message || "").trim(),
      source: (body.source || "website").trim(),
      notes: "",
    });

    return NextResponse.json({
      success: true,
      id,
      message: "Consultation enquiry received successfully. Our clinical team will contact you shortly.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET is strictly protected: only authenticated medical administrators can access patient enquiries
export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized access to patient records." },
      { status: 401 }
    );
  }

  try {
    const enquiries = getEnquiries();
    return NextResponse.json({ success: true, data: enquiries });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
