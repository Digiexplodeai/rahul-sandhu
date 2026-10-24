# Lt Col (Dr) Rahul Sandhu — Surgical Oncologist Website

A luxury medical personal branding website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and a persistent **SQLite Database** (`better-sqlite3`), following the **Editorial Premium** design reference.

---

## 🎨 Visual Identity & Design System

Matched to the luxury medical personal branding aesthetic:
- **Warm Ivory:** `#F8F5F0` (Base background)
- **Champagne Beige:** `#EDE5D9` (Cards, highlights, accents)
- **Antique Gold:** `#A78248` (Buttons, badges, highlights, borders)
- **Dark Charcoal:** `#242424` / `#1C1C1C` (Headings, CTA banner, footer)
- **Soft White:** `#FFFFFF` (Content cards)
- **Muted Brown:** `#766352` (Subheadings, body descriptions)
- **Typography:** Cormorant Garamond & Playfair Display (Luxury Editorial Serif) paired with Inter (Modern Sans-Serif).

---

## 👨‍⚕️ Verified Doctor Credentials & Clinical Scope

- **Name:** Lt Col (Dr) Rahul Sandhu
- **Designation:** Surgical Oncologist
- **Clinical Experience:** 15+ years in surgical oncology, trauma care, and military medicine
- **Military Career:** Former Graded Surgical Specialist in the Indian Armed Forces (2010–2024); led General Surgery & Trauma Care at Military Hospital Panagarh (Eastern Command); deployed to Siachen Glacier; participated in Indo-French Joint Exercise (2015).
- **Qualifications:**
  - MBBS & Internship — Indira Gandhi Medical College (IGMC), Shimla (2003–2009)
  - MS General Surgery — Armed Forces Medical College (AFMC), Pune (2018–2021)
  - DNB General Surgery — National Board of Examinations (NBE), New Delhi
  - Fellowship in Surgical Oncology — Homi Bhabha Cancer Hospital and Research Centre (HBCHRC), Punjab (Tata Memorial Centre / DAE)
  - Fellowship in Minimal Access Surgery (FMAS) & FIAGES — Medicity Gurgaon
  - Diplomas in Infection Control & Antimicrobial Stewardship — NHCA Singapore
  - MBA in Hospital Care Services — Sikkim Manipal University
- **Hospital Affiliation:**
  - **Shalby Hospital, Mohali:** Mohali Stadium Rd, Phase 9, Sector 63, Sahibzada Ajit Singh Nagar, Punjab 160062
- **Direct Phone:** `+91 9888970519`
- **Email:** `drsand.rahul@gmail.com`

---

## 🚀 Website Structure & Routes

| Route | Description |
|---|---|
| `/` | **Homepage** — Full editorial split-screen hero, 4 highlights, about doctor with quote overlay, cancer specialities, surgical treatments, why choose, timeline, verified reviews, health blogs, CTA banner, clinic locations & Google Maps |
| `/about` | **About Dr. Rahul Sandhu** — In-depth military career, Siachen deployment, oncology fellowship, and qualification milestones |
| `/specialities` | **Cancer Specialities Overview** — 6 core oncology areas |
| `/specialities/[slug]` | **Individual Cancer Detail Pages** — Breast Cancer, Colorectal Cancer, Head & Neck Cancer, Liver & Pancreatic Tumors, Stomach Cancer, Thyroid & Parathyroid |
| `/treatments` | **Surgical Treatments Overview** — 8 procedures |
| `/treatments/[slug]` | **Individual Treatment Detail Pages** — Tumor Resection, Biopsy, Lymph Node Dissection, Minimally Invasive, Reconstructive, Palliative, Gynaecological, Urological |
| `/resources` | **Patient Resources** — Pre-op preparation, biopsy reports, ERAS protocol, drain care |
| `/testimonials` | **Patient Stories** — Verified Google patient reviews & video discussions |
| `/blog` | **Health Blogs** — Medically accurate awareness articles |
| `/blog/[slug]` | **Single Blog View** — Full reading view with author credentials |
| `/faqs` | **FAQs** — Interactive accordion addressing surgical oncology questions |
| `/contact` | **Contact & Appointments** — Multi-clinic switcher, directions, Google Maps, online appointment enquiry form |
| `/admin` | **Production Admin Dashboard** — Secured CMS to manage settings, specialities, treatments, blogs, testimonials, and patient enquiries |
| `/sitemap.xml` | **XML Sitemap** — SEO search engine index of all routes |
| `/robots.txt` | **Robots Directive** — Crawling directives |

---

## 📱 Mobile Experience

- **Floating Action Bar:** Stays anchored at the bottom of mobile screens with 4 quick touch-friendly actions:
  - 📞 **Call:** One-tap direct dial to `+91 9888970519`
  - 💬 **WhatsApp:** One-tap direct message initiation
  - 📅 **Book:** Instant trigger for the consultation modal
  - 📍 **Location:** One-tap navigation to Shalby Hospital Mohali on Google Maps

---

## 🔐 Admin Panel & Content Management System (`/admin`)

- **URL:** `/admin`
- **Authentication:** Server-verified sessions with PBKDF2-SHA512 password hashing (100k iterations + secure per-user salt), HMAC-SHA256 session signature, rate limiting against brute-force attacks, and complete audit logging.
- **Provisioning Administrators:**
  Admin accounts are provisioned via the secure CLI utility:
  ```bash
  npm run create-admin <email> <password> [name]
  ```
- **Complete CMS Modules:**
  1. **Executive Overview:** Real-time metrics on incoming enquiries, scheduled consultations, published content, and recent system actions.
  2. **Patient Consultation Enquiries & Leads:** View incoming submissions, filter by status (`new`, `contacted`, `scheduled`, `closed`), write internal clinical follow-up notes, and export to CSV.
  3. **Homepage Manager:** Section-by-section visual editor for hero headline, eyebrow, subtitle, hero doctor photo, about section, and dynamic show/hide section toggles.
  4. **Pages & SEO Manager:** Manage metadata, banners, and status across all 11 core routes.
  5. **Cancer Specialities CRUD:** Add, edit, reorder, and publish oncology conditions and surgical staging notes.
  6. **Surgical Treatments CRUD:** Manage surgical procedures, clinical indications, and step-by-step descriptions.
  7. **Health Blogs & Articles:** Full editorial management with categories, read times, slugs, and featured status.
  8. **Media Library:** Centralized asset repository with drag-and-drop multi-file upload, MIME validation, URL copying, and active cross-site usage detection before deletion.
  9. **Patient Reviews & Testimonials:** Manage verified patient testimonials with consent verification.
  10. **Clinical Case Videos:** Embed YouTube clinical discussions and surgical presentations.
  11. **FAQs Accordion Manager:** Add, edit, categorize, and reorder surgical oncology FAQs.
  12. **Clinics, Hospitals & Maps:** Update hospital names, addresses, OPD visiting hours, direct contact numbers, and embed maps.
  13. **Navigation & Footer:** Edit header links, mobile floating bar destinations, and copyright text.
  14. **Global SEO Settings:** Configure meta title templates, descriptions, keywords, and OpenGraph defaults.
  15. **User & Password Management:** Change master credentials with current password verification.
  16. **Security & Activity Logs:** Real-time log of administrative logins, content edits, and system actions.
  17. **Backup & Database Persistence:** On-demand database download (SQLite) or full CMS JSON snapshot, plus Supabase PostgreSQL export schema.

---

## ⚙️ Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build
```
