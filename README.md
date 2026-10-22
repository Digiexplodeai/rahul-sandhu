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
- **Hospital Affiliations:**
  - **Shalby Hospital, Mohali:** Mohali Stadium Rd, Phase 9, Sector 63, Sahibzada Ajit Singh Nagar, Punjab 160062
  - **ClearMedi Healthcare, Kharar:** NH-21, Chandigarh-Ropar Road, Kharar, Punjab 140104
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

## 🔐 Admin Panel (`/admin`)

- **URL:** `http://localhost:3002/admin`
- **Default Username:** `admin`
- **Default Password:** `admin123`
- **Capabilities:**
  1. **Patient Consultation Enquiries:** View real-time submissions, update status (`new`, `contacted`, `scheduled`, `closed`), and delete entries.
  2. **Hero & General Text:** Edit headlines, subtitles, doctor photo paths, and hospital addresses.
  3. **Section Visibility Manager:** Show or hide any homepage section with one click.
  4. **Cancer Specialities:** Manage conditions, clinical staging, and descriptions.
  5. **Surgical Treatments:** Manage procedures, indications, and surgical steps.
  6. **Health Blogs:** Manage articles, publish status, categories, and read times.
  7. **Testimonials:** Approve and feature patient reviews.
  8. **SEO & Meta:** Configure page title templates, meta descriptions, and keywords.

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
