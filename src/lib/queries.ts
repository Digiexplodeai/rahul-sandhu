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
  created_at?: string;
  updated_at?: string;
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
  created_at?: string;
  updated_at?: string;
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
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
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
  consent_given?: number;
  image?: string;
  order_num?: number;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  youtube_url: string;
  thumbnail: string;
  description: string;
  order_num: number;
  is_published: number;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_num: number;
  is_published: number;
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
  source?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  file_path: string;
  original_name: string;
  mime_type: string;
  file_size: number;
  alt_text: string;
  created_at: string;
}

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  is_published: number;
  updated_at: string;
}

export interface PageSectionItem {
  id: string;
  page_slug: string;
  section_key: string;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  is_visible: number;
  order_num: number;
  settings_json?: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  username: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: string;
  ip_address?: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  username: string;
  role: string;
  created_at: string;
  updated_at?: string;
}

// ================= SITE SETTINGS =================

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
      // Safeguard: Never let an empty or whitespace string erase the published hero doctor image
      if (k === "hero_doctor_image" && (!v || !v.trim())) {
        continue;
      }
      stmt.run(k, v);
    }
  });
  updateMany(Object.entries(settings));
}

// ================= SPECIALTIES =================

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

export function getSpecialtyById(id: string): Specialty | null {
  const row = db.prepare("SELECT * FROM specialties WHERE id = ?").get(id) as Specialty | undefined;
  return row || null;
}

export function createSpecialty(s: Omit<Specialty, "id"> & { id?: string }): string {
  const id = s.id || "spec-" + Date.now();
  db.prepare(`
    INSERT INTO specialties 
    (id, slug, title, subtitle, excerpt, description, symptoms, diagnosis, surgical_approaches, post_care, image, order_num, is_published, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    s.slug,
    s.title,
    s.subtitle || "",
    s.excerpt || "",
    s.description || "",
    s.symptoms || "",
    s.diagnosis || "",
    s.surgical_approaches || "",
    s.post_care || "",
    s.image || "",
    s.order_num ?? 0,
    s.is_published ?? 1,
    new Date().toISOString(),
    new Date().toISOString()
  );
  return id;
}

export function updateSpecialty(id: string, s: Partial<Specialty>) {
  const current = getSpecialtyById(id);
  if (!current) throw new Error("Specialty not found");

  db.prepare(`
    UPDATE specialties SET
    slug = ?, title = ?, subtitle = ?, excerpt = ?, description = ?, symptoms = ?,
    diagnosis = ?, surgical_approaches = ?, post_care = ?, image = ?, order_num = ?, is_published = ?, updated_at = ?
    WHERE id = ?
  `).run(
    s.slug ?? current.slug,
    s.title ?? current.title,
    s.subtitle ?? current.subtitle,
    s.excerpt ?? current.excerpt,
    s.description ?? current.description,
    s.symptoms ?? current.symptoms,
    s.diagnosis ?? current.diagnosis,
    s.surgical_approaches ?? current.surgical_approaches,
    s.post_care ?? current.post_care,
    s.image ?? current.image,
    s.order_num ?? current.order_num,
    s.is_published ?? current.is_published,
    new Date().toISOString(),
    id
  );
}

export function deleteSpecialty(id: string) {
  db.prepare("DELETE FROM specialties WHERE id = ?").run(id);
}

// ================= TREATMENTS =================

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

export function getTreatmentById(id: string): Treatment | null {
  const row = db.prepare("SELECT * FROM treatments WHERE id = ?").get(id) as Treatment | undefined;
  return row || null;
}

export function createTreatment(t: Omit<Treatment, "id"> & { id?: string }): string {
  const id = t.id || "treat-" + Date.now();
  db.prepare(`
    INSERT INTO treatments
    (id, slug, title, subtitle, excerpt, description, indications, procedure_steps, benefits, recovery_info, image, order_num, is_published, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    t.slug,
    t.title,
    t.subtitle || "",
    t.excerpt || "",
    t.description || "",
    t.indications || "",
    t.procedure_steps || "",
    t.benefits || "",
    t.recovery_info || "",
    t.image || "",
    t.order_num ?? 0,
    t.is_published ?? 1,
    new Date().toISOString(),
    new Date().toISOString()
  );
  return id;
}

export function updateTreatment(id: string, t: Partial<Treatment>) {
  const current = getTreatmentById(id);
  if (!current) throw new Error("Treatment not found");

  db.prepare(`
    UPDATE treatments SET
    slug = ?, title = ?, subtitle = ?, excerpt = ?, description = ?, indications = ?,
    procedure_steps = ?, benefits = ?, recovery_info = ?, image = ?, order_num = ?, is_published = ?, updated_at = ?
    WHERE id = ?
  `).run(
    t.slug ?? current.slug,
    t.title ?? current.title,
    t.subtitle ?? current.subtitle,
    t.excerpt ?? current.excerpt,
    t.description ?? current.description,
    t.indications ?? current.indications,
    t.procedure_steps ?? current.procedure_steps,
    t.benefits ?? current.benefits,
    t.recovery_info ?? current.recovery_info,
    t.image ?? current.image,
    t.order_num ?? current.order_num,
    t.is_published ?? current.is_published,
    new Date().toISOString(),
    id
  );
}

export function deleteTreatment(id: string) {
  db.prepare("DELETE FROM treatments WHERE id = ?").run(id);
}

// ================= BLOGS =================

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

export function getBlogById(id: string): Blog | null {
  const row = db.prepare("SELECT * FROM blogs WHERE id = ?").get(id) as Blog | undefined;
  return row || null;
}

export function createBlog(b: Omit<Blog, "id"> & { id?: string }): string {
  const id = b.id || "blog-" + Date.now();
  db.prepare(`
    INSERT INTO blogs
    (id, slug, title, excerpt, content, cover_image, category, author, read_time, published_date, is_published, meta_title, meta_description, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    b.slug,
    b.title,
    b.excerpt || "",
    b.content || "",
    b.cover_image || "/images/surgery-300x225.png",
    b.category || "Cancer Awareness",
    b.author || "Lt Col (Dr) Rahul Sandhu",
    b.read_time || "5 min read",
    b.published_date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    b.is_published !== undefined ? b.is_published : 1,
    b.meta_title || "",
    b.meta_description || "",
    new Date().toISOString(),
    new Date().toISOString()
  );
  return id;
}

export function updateBlog(id: string, b: Partial<Blog>) {
  const current = getBlogById(id);
  if (!current) throw new Error("Blog not found");

  db.prepare(`
    UPDATE blogs SET
    slug = ?, title = ?, excerpt = ?, content = ?, cover_image = ?, category = ?,
    author = ?, read_time = ?, published_date = ?, is_published = ?, meta_title = ?, meta_description = ?, updated_at = ?
    WHERE id = ?
  `).run(
    b.slug ?? current.slug,
    b.title ?? current.title,
    b.excerpt ?? current.excerpt,
    b.content ?? current.content,
    b.cover_image ?? current.cover_image,
    b.category ?? current.category,
    b.author ?? current.author,
    b.read_time ?? current.read_time,
    b.published_date ?? current.published_date,
    b.is_published ?? current.is_published,
    b.meta_title ?? current.meta_title ?? "",
    b.meta_description ?? current.meta_description ?? "",
    new Date().toISOString(),
    id
  );
}

export function deleteBlog(id: string) {
  db.prepare("DELETE FROM blogs WHERE id = ?").run(id);
}

// ================= TESTIMONIALS =================

export function getTestimonials(onlyApproved = true): Testimonial[] {
  if (onlyApproved) {
    return db.prepare("SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY is_featured DESC, order_num ASC, id DESC").all() as Testimonial[];
  }
  return db.prepare("SELECT * FROM testimonials ORDER BY order_num ASC, id DESC").all() as Testimonial[];
}

export function getTestimonialById(id: string): Testimonial | null {
  const row = db.prepare("SELECT * FROM testimonials WHERE id = ?").get(id) as Testimonial | undefined;
  return row || null;
}

export function createTestimonial(t: Omit<Testimonial, "id"> & { id?: string }): string {
  const id = t.id || "test-" + Date.now();
  db.prepare(`
    INSERT INTO testimonials
    (id, author_name, author_location, condition, content, rating, source, is_featured, is_approved, consent_given, image, order_num, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    t.author_name,
    t.author_location || "",
    t.condition || "",
    t.content,
    t.rating || 5,
    t.source || "Google Reviews (Verified)",
    t.is_featured ? 1 : 0,
    t.is_approved !== undefined ? t.is_approved : 1,
    t.consent_given !== undefined ? t.consent_given : 1,
    t.image || "",
    t.order_num || 0,
    t.created_at || new Date().toISOString()
  );
  return id;
}

export function updateTestimonial(id: string, t: Partial<Testimonial>) {
  const current = getTestimonialById(id);
  if (!current) throw new Error("Testimonial not found");

  db.prepare(`
    UPDATE testimonials SET
    author_name = ?, author_location = ?, condition = ?, content = ?, rating = ?, source = ?,
    is_featured = ?, is_approved = ?, consent_given = ?, image = ?, order_num = ?
    WHERE id = ?
  `).run(
    t.author_name ?? current.author_name,
    t.author_location ?? current.author_location,
    t.condition ?? current.condition,
    t.content ?? current.content,
    t.rating ?? current.rating,
    t.source ?? current.source,
    t.is_featured ?? current.is_featured,
    t.is_approved ?? current.is_approved,
    t.consent_given ?? current.consent_given ?? 1,
    t.image ?? current.image ?? "",
    t.order_num ?? current.order_num ?? 0,
    id
  );
}

export function deleteTestimonial(id: string) {
  db.prepare("DELETE FROM testimonials WHERE id = ?").run(id);
}

// ================= VIDEOS =================

export function getVideos(onlyPublished = true): Video[] {
  if (onlyPublished) {
    return db.prepare("SELECT * FROM videos WHERE is_published = 1 ORDER BY order_num ASC, created_at DESC").all() as Video[];
  }
  return db.prepare("SELECT * FROM videos ORDER BY order_num ASC, created_at DESC").all() as Video[];
}

export function getVideoById(id: string): Video | null {
  const row = db.prepare("SELECT * FROM videos WHERE id = ?").get(id) as Video | undefined;
  return row || null;
}

export function createVideo(v: Omit<Video, "id" | "created_at"> & { id?: string }): string {
  const id = v.id || "vid-" + Date.now();
  db.prepare(`
    INSERT INTO videos (id, title, youtube_url, thumbnail, description, order_num, is_published, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    v.title,
    v.youtube_url,
    v.thumbnail || "",
    v.description || "",
    v.order_num || 0,
    v.is_published !== undefined ? v.is_published : 1,
    new Date().toISOString()
  );
  return id;
}

export function updateVideo(id: string, v: Partial<Video>) {
  const current = getVideoById(id);
  if (!current) throw new Error("Video not found");

  db.prepare(`
    UPDATE videos SET
    title = ?, youtube_url = ?, thumbnail = ?, description = ?, order_num = ?, is_published = ?
    WHERE id = ?
  `).run(
    v.title ?? current.title,
    v.youtube_url ?? current.youtube_url,
    v.thumbnail ?? current.thumbnail,
    v.description ?? current.description,
    v.order_num ?? current.order_num,
    v.is_published ?? current.is_published,
    id
  );
}

export function deleteVideo(id: string) {
  db.prepare("DELETE FROM videos WHERE id = ?").run(id);
}

// ================= FAQS =================

export function getFaqs(onlyPublished = true): FAQ[] {
  if (onlyPublished) {
    return db.prepare("SELECT * FROM faqs WHERE is_published = 1 ORDER BY order_num ASC, id ASC").all() as FAQ[];
  }
  return db.prepare("SELECT * FROM faqs ORDER BY order_num ASC, id ASC").all() as FAQ[];
}

export function getFaqById(id: string): FAQ | null {
  const row = db.prepare("SELECT * FROM faqs WHERE id = ?").get(id) as FAQ | undefined;
  return row || null;
}

export function createFaq(f: Omit<FAQ, "id" | "created_at"> & { id?: string }): string {
  const id = f.id || "faq-" + Date.now();
  db.prepare(`
    INSERT INTO faqs (id, question, answer, category, order_num, is_published, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    f.question,
    f.answer,
    f.category || "General",
    f.order_num || 0,
    f.is_published !== undefined ? f.is_published : 1,
    new Date().toISOString()
  );
  return id;
}

export function updateFaq(id: string, f: Partial<FAQ>) {
  const current = getFaqById(id);
  if (!current) throw new Error("FAQ not found");

  db.prepare(`
    UPDATE faqs SET
    question = ?, answer = ?, category = ?, order_num = ?, is_published = ?
    WHERE id = ?
  `).run(
    f.question ?? current.question,
    f.answer ?? current.answer,
    f.category ?? current.category,
    f.order_num ?? current.order_num,
    f.is_published ?? current.is_published,
    id
  );
}

export function deleteFaq(id: string) {
  db.prepare("DELETE FROM faqs WHERE id = ?").run(id);
}

// ================= ENQUIRIES & LEADS =================

export function getEnquiries(): Enquiry[] {
  return db.prepare("SELECT * FROM enquiries ORDER BY datetime(created_at) DESC").all() as Enquiry[];
}

export function getEnquiryById(id: string): Enquiry | null {
  const row = db.prepare("SELECT * FROM enquiries WHERE id = ?").get(id) as Enquiry | undefined;
  return row || null;
}

export function createEnquiry(enquiry: Omit<Enquiry, "id" | "status" | "created_at">): string {
  const id = "enq-" + Date.now();
  const status = "new";
  const created_at = new Date().toISOString();
  db.prepare(`
    INSERT INTO enquiries 
    (id, patient_name, phone, email, preferred_date, preferred_location, cancer_type, message, status, source, notes, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    enquiry.source || "website",
    enquiry.notes || "",
    created_at,
    created_at
  );
  return id;
}

export function updateEnquiryStatus(id: string, status: string, notes?: string) {
  if (notes !== undefined) {
    db.prepare("UPDATE enquiries SET status = ?, notes = ?, updated_at = ? WHERE id = ?").run(status, notes, new Date().toISOString(), id);
  } else {
    db.prepare("UPDATE enquiries SET status = ?, updated_at = ? WHERE id = ?").run(status, new Date().toISOString(), id);
  }
}

export function updateEnquiryNotes(id: string, notes: string) {
  db.prepare("UPDATE enquiries SET notes = ?, updated_at = ? WHERE id = ?").run(notes, new Date().toISOString(), id);
}

export function deleteEnquiry(id: string) {
  db.prepare("DELETE FROM enquiries WHERE id = ?").run(id);
}

// ================= MEDIA ASSETS =================

export function getMediaAssets(search = ""): MediaAsset[] {
  if (search.trim()) {
    return db.prepare("SELECT * FROM media_assets WHERE filename LIKE ? OR alt_text LIKE ? ORDER BY created_at DESC").all(`%${search}%`, `%${search}%`) as MediaAsset[];
  }
  return db.prepare("SELECT * FROM media_assets ORDER BY created_at DESC").all() as MediaAsset[];
}

export function getMediaAssetById(id: string): MediaAsset | null {
  const row = db.prepare("SELECT * FROM media_assets WHERE id = ?").get(id) as MediaAsset | undefined;
  return row || null;
}

export function createMediaAsset(m: Omit<MediaAsset, "id" | "created_at"> & { id?: string }): string {
  const id = m.id || "media-" + Date.now();
  db.prepare(`
    INSERT INTO media_assets (id, filename, file_path, original_name, mime_type, file_size, alt_text, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    m.filename,
    m.file_path,
    m.original_name,
    m.mime_type,
    m.file_size,
    m.alt_text || "",
    new Date().toISOString()
  );
  return id;
}

export function updateMediaAssetAlt(id: string, alt_text: string) {
  db.prepare("UPDATE media_assets SET alt_text = ? WHERE id = ?").run(alt_text, id);
}

export function deleteMediaAsset(id: string) {
  db.prepare("DELETE FROM media_assets WHERE id = ?").run(id);
}

export function getMediaAssetUsage(filePath: string): string[] {
  const usages: string[] = [];
  // Check settings
  const settingsMatch = db.prepare("SELECT key FROM site_settings WHERE value LIKE ?").all(`%${filePath}%`) as { key: string }[];
  for (const s of settingsMatch) {
    usages.push(`Setting: ${s.key}`);
  }
  // Check specialties
  const specMatch = db.prepare("SELECT title FROM specialties WHERE image LIKE ?").all(`%${filePath}%`) as { title: string }[];
  for (const s of specMatch) {
    usages.push(`Specialty: ${s.title}`);
  }
  // Check treatments
  const treatMatch = db.prepare("SELECT title FROM treatments WHERE image LIKE ?").all(`%${filePath}%`) as { title: string }[];
  for (const t of treatMatch) {
    usages.push(`Treatment: ${t.title}`);
  }
  // Check blogs
  const blogMatch = db.prepare("SELECT title FROM blogs WHERE cover_image LIKE ?").all(`%${filePath}%`) as { title: string }[];
  for (const b of blogMatch) {
    usages.push(`Blog: ${b.title}`);
  }
  return usages;
}

// ================= PAGES & SECTIONS =================

export function getPages(): PageItem[] {
  return db.prepare("SELECT * FROM pages ORDER BY slug ASC").all() as PageItem[];
}

export function getPageBySlug(slug: string): PageItem | null {
  const row = db.prepare("SELECT * FROM pages WHERE slug = ?").get(slug) as PageItem | undefined;
  return row || null;
}

export function updatePage(id: string, p: Partial<PageItem>) {
  const current = db.prepare("SELECT * FROM pages WHERE id = ?").get(id) as PageItem | undefined;
  if (!current) throw new Error("Page not found");

  db.prepare(`
    UPDATE pages SET
    title = ?, meta_title = ?, meta_description = ?, is_published = ?, updated_at = ?
    WHERE id = ?
  `).run(
    p.title ?? current.title,
    p.meta_title ?? current.meta_title,
    p.meta_description ?? current.meta_description,
    p.is_published ?? current.is_published,
    new Date().toISOString(),
    id
  );
}

export function getPageSections(pageSlug = "/"): PageSectionItem[] {
  return db.prepare("SELECT * FROM page_sections WHERE page_slug = ? ORDER BY order_num ASC").all(pageSlug) as PageSectionItem[];
}

export function updatePageSection(id: string, sec: Partial<PageSectionItem>) {
  const current = db.prepare("SELECT * FROM page_sections WHERE id = ?").get(id) as PageSectionItem | undefined;
  if (!current) throw new Error("Section not found");

  db.prepare(`
    UPDATE page_sections SET
    title = ?, subtitle = ?, content = ?, image = ?, is_visible = ?, order_num = ?, settings_json = ?, updated_at = ?
    WHERE id = ?
  `).run(
    sec.title ?? current.title,
    sec.subtitle ?? current.subtitle,
    sec.content ?? current.content,
    sec.image ?? current.image,
    sec.is_visible ?? current.is_visible,
    sec.order_num ?? current.order_num,
    sec.settings_json ?? current.settings_json,
    new Date().toISOString(),
    id
  );
}

// ================= ACTIVITY LOGS =================

export function getActivityLogs(limit = 100): ActivityLog[] {
  return db.prepare("SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ?").all(limit) as ActivityLog[];
}

// ================= ADMIN USERS =================

export function getAdminUsers(): AdminUser[] {
  return db.prepare("SELECT id, username, role, created_at, updated_at FROM admin_users ORDER BY created_at ASC").all() as AdminUser[];
}
