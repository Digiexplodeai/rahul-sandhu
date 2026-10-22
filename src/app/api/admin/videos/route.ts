import { NextResponse } from "next/server";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";
import { getVideos, createVideo, updateVideo, deleteVideo, getVideoById } from "@/lib/queries";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const videos = getVideos(false);
  return NextResponse.json({ success: true, data: videos });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.title || !body.youtube_url) {
      return NextResponse.json({ error: "Video title and YouTube URL are required" }, { status: 400 });
    }

    const id = createVideo({
      title: body.title,
      youtube_url: body.youtube_url,
      thumbnail: body.thumbnail || "",
      description: body.description || "",
      order_num: body.order_num !== undefined ? Number(body.order_num) : 0,
      is_published: body.is_published !== undefined ? Number(body.is_published) : 1,
    });

    logActivity("VIDEO_CREATED", "videos", id, `Added video: "${body.title}"`, admin.username);

    return NextResponse.json({ success: true, id, message: "Video added successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating video";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "Missing video ID" }, { status: 400 });

    updateVideo(body.id, {
      title: body.title,
      youtube_url: body.youtube_url,
      thumbnail: body.thumbnail,
      description: body.description,
      order_num: body.order_num !== undefined ? Number(body.order_num) : undefined,
      is_published: body.is_published !== undefined ? Number(body.is_published) : undefined,
    });

    logActivity("VIDEO_UPDATED", "videos", body.id, `Updated video: "${body.title || body.id}"`, admin.username);

    return NextResponse.json({ success: true, message: "Video updated successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating video";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing video ID" }, { status: 400 });

    const existing = getVideoById(id);
    deleteVideo(id);

    logActivity("VIDEO_DELETED", "videos", id, `Deleted video: "${existing?.title || id}"`, admin.username);

    return NextResponse.json({ success: true, message: "Video deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting video";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
