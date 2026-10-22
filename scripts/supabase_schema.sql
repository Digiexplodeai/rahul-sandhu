-- ==========================================================
-- Lt Col (Dr) Rahul Sandhu — Surgical Oncology Website
-- Production Supabase PostgreSQL Database Schema
-- Run this script in the Supabase SQL Editor
-- ==========================================================

-- 1. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- 2. Cancer Specialities
CREATE TABLE IF NOT EXISTS specialties (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  excerpt TEXT,
  description TEXT,
  symptoms TEXT,
  diagnosis TEXT,
  surgical_approaches TEXT,
  post_care TEXT,
  image TEXT,
  order_num INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Surgical Treatments
CREATE TABLE IF NOT EXISTS treatments (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  excerpt TEXT,
  description TEXT,
  indications TEXT,
  procedure_steps TEXT,
  benefits TEXT,
  recovery_info TEXT,
  image TEXT,
  order_num INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Health & Oncology Blogs
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT,
  author TEXT DEFAULT 'Lt Col (Dr) Rahul Sandhu',
  read_time TEXT,
  published_date TEXT,
  is_published INTEGER DEFAULT 1,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Testimonials & Reviews
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_location TEXT,
  condition TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  source TEXT DEFAULT 'Google Reviews (Verified)',
  is_featured INTEGER DEFAULT 0,
  is_approved INTEGER DEFAULT 1,
  consent_given INTEGER DEFAULT 1,
  image TEXT DEFAULT '',
  order_num INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Video Discussions & Insights
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  thumbnail TEXT,
  description TEXT,
  order_num INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Frequently Asked Questions
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  order_num INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Patient Consultation Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_date TEXT,
  preferred_location TEXT DEFAULT 'Shalby Hospital, Mohali',
  cancer_type TEXT DEFAULT 'General Consultation',
  message TEXT,
  status TEXT DEFAULT 'new',
  source TEXT DEFAULT 'website',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Media Assets Library
CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  original_name TEXT,
  mime_type TEXT,
  file_size BIGINT,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Pages & SEO Metadata
CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  is_published INTEGER DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Page Sections
CREATE TABLE IF NOT EXISTS page_sections (
  id TEXT PRIMARY KEY,
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT,
  image TEXT,
  is_visible INTEGER DEFAULT 1,
  order_num INTEGER DEFAULT 0,
  settings_json JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Admin Users & Security
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT,
  role TEXT DEFAULT 'Admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Audit & Activity Logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  username TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_specialties_slug ON specialties(slug);
CREATE INDEX IF NOT EXISTS idx_treatments_slug ON treatments(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at DESC);
