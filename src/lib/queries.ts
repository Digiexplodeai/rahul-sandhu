import db, { initDb } from "./db";

// Ensure DB is initialized
initDb();

export interface SiteSettings {
  [key: string]: string;
}

export interface Specialty {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  description: string;
  symptoms: string;
  diagnosis: string;
  surgical_approaches: string;
  post_care: string;
  image: string;
  order_num: number;
  is_published: number;
}

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  description: string;
  indications: string;
  procedure_steps: string;
  benefits: string;
  recovery_info: string;
  image: string;
  order_num: number;
  is_published: number;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  read_time: string;
  published_date: string;
  is_published: number;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_location: string;
  condition: string;
  content: string;
  rating: number;
  source: string;
  is_featured: number;
  is_approved: number;
  created_at: string;
}

export interface Enquiry {
  id: string;
  patient_name: string;
  phone: string;
  email: string;
  preferred_date: string;
  preferred_location: string;
  cancer_type: string;
  message: string;
  status: string;
  created_at: string;
}

export function getSiteSettings(): Record<string, string> {
  const rows = db.prepare("SELECT key, value FROM site_settings").all() as { key: string; value: string }[];
  const settings: Record<string, string> = {};
  for (const r of rows) {
    settings[r.key] = r.value;
  }
  return settings;
}

export function updateSiteSettings(settings: Record<string, string>) {
  const stmt = db.prepare("INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)");
  const updateMany = db.transaction((entries: [string, string][]) => {
    for (const [k, v] of entries) {
      stmt.run(k, v);
    }
  });
  updateMany(Object.entries(settings));
}

export function getSpecialties(onlyPublished = true): Specialty[] {
  if (onlyPublished) {
    return db.prepare("SELECT * FROM specialties WHERE is_published = 1 ORDER BY order_num ASC").all() as Specialty[];
  }
  return db.prepare("SELECT * FROM specialties ORDER BY order_num ASC").all() as Specialty[];
}

export function getSpecialtyBySlug(slug: string): Specialty | null {
  const row = db.prepare("SELECT * FROM specialties WHERE slug = ?").get(slug) as Specialty | undefined;
  return row || null;
}

export function getTreatments(onlyPublished = true): Treatment[] {
  if (onlyPublished) {
    return db.prepare("SELECT * FROM treatments WHERE is_published = 1 ORDER BY order_num ASC").all() as Treatment[];
  }
  return db.prepare("SELECT * FROM treatments ORDER BY order_num ASC").all() as Treatment[];
}

export function getTreatmentBySlug(slug: string): Treatment | null {
  const row = db.prepare("SELECT * FROM treatments WHERE slug = ?").get(slug) as Treatment | undefined;
  return row || null;
}

export function getBlogs(onlyPublished = true): Blog[] {
  if (onlyPublished) {
    return db.prepare("SELECT * FROM blogs WHERE is_published = 1 ORDER BY id DESC").all() as Blog[];
  }
  return db.prepare("SELECT * FROM blogs ORDER BY id DESC").all() as Blog[];
}

export function getBlogBySlug(slug: string): Blog | null {
  const row = db.prepare("SELECT * FROM blogs WHERE slug = ?").get(slug) as Blog | undefined;
  return row || null;
}

export function getTestimonials(onlyApproved = true): Testimonial[] {
  if (onlyApproved) {
    return db.prepare("SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY is_featured DESC, id DESC").all() as Testimonial[];
  }
  return db.prepare("SELECT * FROM testimonials ORDER BY id DESC").all() as Testimonial[];
}

export function getEnquiries(): Enquiry[] {
  return db.prepare("SELECT * FROM enquiries ORDER BY datetime(created_at) DESC").all() as Enquiry[];
}

export function createEnquiry(enquiry: Omit<Enquiry, "id" | "status" | "created_at">): string {
  const id = "enq-" + Date.now();
  const status = "new";
  const created_at = new Date().toISOString();
  db.prepare(`
    INSERT INTO enquiries 
    (id, patient_name, phone, email, preferred_date, preferred_location, cancer_type, message, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    enquiry.patient_name,
    enquiry.phone,
    enquiry.email || "",
    enquiry.preferred_date || "",
    enquiry.preferred_location || "",
    enquiry.cancer_type || "",
    enquiry.message || "",
    status,
    created_at
  );
  return id;
}

export function updateEnquiryStatus(id: string, status: string) {
  db.prepare("UPDATE enquiries SET status = ? WHERE id = ?").run(status, id);
}

export function deleteEnquiry(id: string) {
  db.prepare("DELETE FROM enquiries WHERE id = ?").run(id);
}
