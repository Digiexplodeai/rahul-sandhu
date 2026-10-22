import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getAuthenticatedAdmin, logActivity } from "@/lib/auth";
import {
  getSiteSettings,
  getSpecialties,
  getTreatments,
  getBlogs,
  getTestimonials,
  getVideos,
  getFaqs,
  getEnquiries,
  getMediaAssets,
  getPages,
  getPageSections,
} from "@/lib/queries";

export async function GET(request: Request) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "status";

  if (type === "sqlite") {
    const dbPath = path.join(process.cwd(), "data", "site.db");
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: "Database file not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(dbPath);
    logActivity("BACKUP_DOWNLOADED", "database", "sqlite", "Downloaded full SQLite database backup", admin.username);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.sqlite3",
        "Content-Disposition": `attachment; filename="dr-sandhu-backup-${new Date().toISOString().split("T")[0]}.db"`,
      },
    });
  }

  if (type === "json") {
    const snapshot = {
      exportedAt: new Date().toISOString(),
      version: "1.0",
      settings: getSiteSettings(),
      specialties: getSpecialties(false),
      treatments: getTreatments(false),
      blogs: getBlogs(false),
      testimonials: getTestimonials(false),
      videos: getVideos(false),
      faqs: getFaqs(false),
      enquiries: getEnquiries(),
      media: getMediaAssets(),
      pages: getPages(),
      page_sections: getPageSections(),
    };

    logActivity("SNAPSHOT_EXPORTED", "database", "json", "Exported JSON snapshot of entire CMS", admin.username);

    return new NextResponse(JSON.stringify(snapshot, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="dr-sandhu-cms-snapshot-${new Date().toISOString().split("T")[0]}.json"`,
      },
    });
  }

  // Default: Return status
  const dbPath = path.join(process.cwd(), "data", "site.db");
  const exists = fs.existsSync(dbPath);
  const size = exists ? fs.statSync(dbPath).size : 0;

  return NextResponse.json({
    success: true,
    database: {
      engine: "SQLite (WAL Mode) / Supabase compatible",
      path: "data/site.db",
      exists,
      sizeBytes: size,
      sizeFormatted: `${(size / 1024 / 1024).toFixed(2)} MB`,
    },
    counts: {
      specialties: getSpecialties(false).length,
      treatments: getTreatments(false).length,
      blogs: getBlogs(false).length,
      testimonials: getTestimonials(false).length,
      videos: getVideos(false).length,
      faqs: getFaqs(false).length,
      enquiries: getEnquiries().length,
      media: getMediaAssets().length,
    },
  });
}
