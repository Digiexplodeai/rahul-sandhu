import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";
import {
  getMediaAssets,
  createMediaAsset,
  updateMediaAssetAlt,
  deleteMediaAsset,
  getMediaAssetById,
  getMediaAssetUsage,
} from "@/lib/queries";

export async function GET(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  const assets = getMediaAssets(search);
  const withUsage = assets.map((a) => ({
    ...a,
    usages: getMediaAssetUsage(a.file_path),
  }));

  return NextResponse.json({ success: true, data: withUsage });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    const fileList: File[] = [];
    if (singleFile && singleFile instanceof File) {
      fileList.push(singleFile);
    }
    for (const f of files) {
      if (f instanceof File && !fileList.includes(f)) {
        fileList.push(f);
      }
    }

    if (fileList.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const allowedMime = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/gif",
      "image/x-icon",
    ];

    const results = [];

    for (const file of fileList) {
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 10MB upload limit.` },
          { status: 400 }
        );
      }

      if (!allowedMime.includes(file.type)) {
        return NextResponse.json(
          { error: `File "${file.name}" has unsupported format (${file.type}). Allowed: JPG, PNG, WebP, SVG, GIF.` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name).toLowerCase() || ".png";
      const baseName = path
        .basename(file.name, ext)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "-")
        .replace(/-+/g, "-");
      const safeFilename = `${Date.now()}-${baseName}${ext}`;
      const filePath = path.join(uploadDir, safeFilename);

      fs.writeFileSync(filePath, buffer);

      const webPath = `/uploads/${safeFilename}`;
      const defaultAlt = baseName.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

      const id = createMediaAsset({
        filename: safeFilename,
        file_path: webPath,
        original_name: file.name,
        mime_type: file.type,
        file_size: file.size,
        alt_text: defaultAlt,
      });

      logActivity("MEDIA_UPLOADED", "media_assets", id, `Uploaded ${file.name} to ${webPath}`, admin.username);

      results.push({
        id,
        filename: safeFilename,
        file_path: webPath,
        original_name: file.name,
        mime_type: file.type,
        file_size: file.size,
        alt_text: defaultAlt,
      });
    }

    return NextResponse.json({
      success: true,
      message: `${results.length} file(s) uploaded successfully`,
      data: results,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error uploading media";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, alt_text } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing media ID" }, { status: 400 });

    updateMediaAssetAlt(id, alt_text || "");
    logActivity("MEDIA_UPDATED", "media_assets", id, `Updated alt text to: "${alt_text}"`, admin.username);

    return NextResponse.json({ success: true, message: "Media alt text updated" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating media";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const force = searchParams.get("force") === "true";

    if (!id) return NextResponse.json({ error: "Missing media ID" }, { status: 400 });

    const asset = getMediaAssetById(id);
    if (!asset) return NextResponse.json({ error: "Media asset not found" }, { status: 404 });

    // Check usage across site to prevent accidental broken images
    const usages = getMediaAssetUsage(asset.file_path);
    if (usages.length > 0 && !force) {
      return NextResponse.json(
        {
          error: `Cannot delete image because it is currently in use: ${usages.join(", ")}. Pass force=true to proceed anyway.`,
          usages,
        },
        { status: 400 }
      );
    }

    // Safely delete physical file if inside /uploads/
    if (asset.file_path.startsWith("/uploads/")) {
      const fullPath = path.join(process.cwd(), "public", asset.file_path);
      if (fs.existsSync(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
        } catch (unlinkErr) {
          console.warn("Could not delete physical upload:", unlinkErr);
        }
      }
    }

    deleteMediaAsset(id);
    logActivity("MEDIA_DELETED", "media_assets", id, `Deleted media: ${asset.filename}`, admin.username);

    return NextResponse.json({ success: true, message: "Media deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error deleting media";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
