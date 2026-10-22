import { NextResponse } from "next/server";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";
import { getFaqs, createFaq, updateFaq, deleteFaq, getFaqById } from "@/lib/queries";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const faqs = getFaqs(false);
  return NextResponse.json({ success: true, data: faqs });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.question || !body.answer) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }

    const id = createFaq({
      question: body.question,
      answer: body.answer,
      category: body.category || "General",
      order_num: body.order_num !== undefined ? Number(body.order_num) : 0,
      is_published: body.is_published !== undefined ? Number(body.is_published) : 1,
    });

    logActivity("FAQ_CREATED", "faqs", id, `Created FAQ: "${body.question.substring(0, 40)}..."`, admin.username);

    return NextResponse.json({ success: true, id, message: "FAQ created successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating FAQ";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "Missing FAQ ID" }, { status: 400 });

    updateFaq(body.id, {
      question: body.question,
      answer: body.answer,
      category: body.category,
      order_num: body.order_num !== undefined ? Number(body.order_num) : undefined,
      is_published: body.is_published !== undefined ? Number(body.is_published) : undefined,
    });

    logActivity("FAQ_UPDATED", "faqs", body.id, `Updated FAQ: "${(body.question || "").substring(0, 40)}..."`, admin.username);

    return NextResponse.json({ success: true, message: "FAQ updated successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating FAQ";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing FAQ ID" }, { status: 400 });

    const existing = getFaqById(id);
    deleteFaq(id);

    logActivity("FAQ_DELETED", "faqs", id, `Deleted FAQ: "${existing?.question?.substring(0, 40) || id}"`, admin.username);

    return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting FAQ";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
