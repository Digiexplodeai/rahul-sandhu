import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

function resolveDatabasePath(): string {
  // 1. Explicit environment override
  if (process.env.DATABASE_PATH) {
    const customDir = path.dirname(process.env.DATABASE_PATH);
    if (!fs.existsSync(customDir)) {
      try {
        fs.mkdirSync(customDir, { recursive: true });
      } catch {}
    }
    return process.env.DATABASE_PATH;
  }

  const defaultDir = path.join(process.cwd(), "data");
  const defaultDbPath = path.join(defaultDir, "site.db");

  // 2. Detect serverless / read-only production environments (Vercel, AWS Lambda, Netlify)
  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT ||
    process.env.NETLIFY
  );

  let isWritable = false;
  try {
    if (!fs.existsSync(defaultDir)) {
      fs.mkdirSync(defaultDir, { recursive: true });
    }
    fs.accessSync(defaultDir, fs.constants.W_OK);
    isWritable = true;
  } catch {
    isWritable = false;
  }

  // If serverless or read-only container, copy to /tmp for persistent runtime writes
  if (isServerless || !isWritable) {
    const tmpDir = process.env.TMPDIR || process.env.TEMP || "/tmp";
    const tmpDbPath = path.join(tmpDir, "site.db");

    try {
      if (!fs.existsSync(tmpDbPath) && fs.existsSync(defaultDbPath)) {
        fs.copyFileSync(defaultDbPath, tmpDbPath);
        const walPath = defaultDbPath + "-wal";
        if (fs.existsSync(walPath)) {
          fs.copyFileSync(walPath, tmpDbPath + "-wal");
        }
      }
    } catch (copyErr) {
      console.warn("[DB] Note: Could not copy bundle DB to /tmp:", copyErr);
    }
    return tmpDbPath;
  }

  return defaultDbPath;
}

const dbPath = resolveDatabasePath();
const db = new Database(dbPath);

// Enable WAL mode safely with fallback
try {
  db.pragma("journal_mode = WAL");
} catch {
  try {
    db.pragma("journal_mode = DELETE");
  } catch {}
}

// Initialize Schema
export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS specialties (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT,
      subtitle TEXT,
      excerpt TEXT,
      description TEXT,
      symptoms TEXT,
      diagnosis TEXT,
      surgical_approaches TEXT,
      post_care TEXT,
      image TEXT,
      order_num INTEGER,
      is_published INTEGER,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS treatments (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT,
      subtitle TEXT,
      excerpt TEXT,
      description TEXT,
      indications TEXT,
      procedure_steps TEXT,
      benefits TEXT,
      recovery_info TEXT,
      image TEXT,
      order_num INTEGER,
      is_published INTEGER,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT,
      excerpt TEXT,
      content TEXT,
      cover_image TEXT,
      category TEXT,
      author TEXT,
      read_time TEXT,
      published_date TEXT,
      is_published INTEGER,
      meta_title TEXT,
      meta_description TEXT,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      author_name TEXT,
      author_location TEXT,
      condition TEXT,
      content TEXT,
      rating INTEGER,
      source TEXT,
      is_featured INTEGER,
      is_approved INTEGER,
      consent_given INTEGER DEFAULT 1,
      image TEXT DEFAULT '',
      order_num INTEGER DEFAULT 0,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS videos (
      id TEXT PRIMARY KEY,
      title TEXT,
      youtube_url TEXT,
      thumbnail TEXT,
      description TEXT,
      order_num INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS faqs (
      id TEXT PRIMARY KEY,
      question TEXT,
      answer TEXT,
      category TEXT DEFAULT 'General',
      order_num INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      patient_name TEXT,
      phone TEXT,
      email TEXT,
      preferred_date TEXT,
      preferred_location TEXT,
      cancer_type TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      source TEXT DEFAULT 'website',
      notes TEXT DEFAULT '',
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE,
      password_hash TEXT,
      salt TEXT,
      role TEXT DEFAULT 'Admin',
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS media_assets (
      id TEXT PRIMARY KEY,
      filename TEXT,
      file_path TEXT,
      original_name TEXT,
      mime_type TEXT,
      file_size INTEGER,
      alt_text TEXT,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS pages (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT,
      meta_title TEXT,
      meta_description TEXT,
      is_published INTEGER DEFAULT 1,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS page_sections (
      id TEXT PRIMARY KEY,
      page_slug TEXT,
      section_key TEXT,
      title TEXT,
      subtitle TEXT,
      content TEXT,
      image TEXT,
      is_visible INTEGER DEFAULT 1,
      order_num INTEGER DEFAULT 0,
      settings_json TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS activity_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      username TEXT,
      action TEXT,
      entity_type TEXT,
      entity_id TEXT,
      details TEXT,
      ip_address TEXT,
      created_at TEXT
    );
  `);

  // Safe migrations for added columns on existing tables
  try { db.exec("ALTER TABLE admin_users ADD COLUMN salt TEXT"); } catch {}
  try { db.exec("ALTER TABLE admin_users ADD COLUMN updated_at TEXT"); } catch {}
  try { db.exec("ALTER TABLE enquiries ADD COLUMN source TEXT DEFAULT 'website'"); } catch {}
  try { db.exec("ALTER TABLE enquiries ADD COLUMN notes TEXT DEFAULT ''"); } catch {}
  try { db.exec("ALTER TABLE enquiries ADD COLUMN updated_at TEXT"); } catch {}
  try { db.exec("ALTER TABLE testimonials ADD COLUMN consent_given INTEGER DEFAULT 1"); } catch {}
  try { db.exec("ALTER TABLE testimonials ADD COLUMN image TEXT DEFAULT ''"); } catch {}
  try { db.exec("ALTER TABLE testimonials ADD COLUMN order_num INTEGER DEFAULT 0"); } catch {}
  try { db.exec("ALTER TABLE blogs ADD COLUMN meta_title TEXT"); } catch {}
  try { db.exec("ALTER TABLE blogs ADD COLUMN meta_description TEXT"); } catch {}
  try { db.exec("ALTER TABLE blogs ADD COLUMN created_at TEXT"); } catch {}
  try { db.exec("ALTER TABLE blogs ADD COLUMN updated_at TEXT"); } catch {}
  try { db.exec("ALTER TABLE treatments ADD COLUMN created_at TEXT"); } catch {}
  try { db.exec("ALTER TABLE treatments ADD COLUMN updated_at TEXT"); } catch {}
  try { db.exec("ALTER TABLE specialties ADD COLUMN created_at TEXT"); } catch {}
  try { db.exec("ALTER TABLE specialties ADD COLUMN updated_at TEXT"); } catch {}

  seedInitialData();
  seedFaqsAndVideos();
  seedPages();
  indexExistingMedia();
}

function seedInitialData() {
  // Check if already seeded
  const check = db.prepare("SELECT COUNT(*) as count FROM site_settings").get() as { count: number };
  if (check && check.count > 0) {
    return;
  }

  console.log("Seeding initial verified database data for Dr. Rahul Sandhu...");

  // 1. Site Settings
  const defaultSettings: Record<string, string> = {
    topbar_location: "Shalby Hospital, Mohali & ClearMedi Healthcare, Kharar",
    topbar_phone: "+91 9888970519",
    topbar_email: "drsand.rahul@gmail.com",
    topbar_hours: "Mon – Sat: 9:00 AM – 5:00 PM",
    topbar_tagline: "Precision • Compassion • Cancer Care",
    site_logo: "/images/dr-rahul-sandhu-official-logo.png",

    hero_eyebrow: "SURGICAL ONCOLOGY • PATIENT-CENTRED CARE",
    hero_headline: "Precision Cancer Surgery. Compassionate Care.",
    hero_subheading: "Advanced surgical oncology care focused on personalized treatment, clinical expertise, and compassionate patient guidance.",
    hero_doctor_image: "/images/reassuring-oncology-clinic-care.png",
    hero_tag: "Lt Col (Dr) Rahul Sandhu",
    hero_subtag: "SURGICAL ONCOLOGIST & TRAUMA SPECIALIST",
    hero_trust_badge_1: "Specialized Surgical Oncology",
    hero_trust_badge_2: "Patient-Centered Care",
    hero_trust_badge_3: "Advanced Surgical Techniques",

    about_eyebrow: "MEET YOUR SURGICAL ONCOLOGIST",
    about_title: "Lt Col (Dr) Rahul Sandhu",
    about_subtitle: "Senior Consultant — Surgical Oncology | Former Indian Armed Forces Specialist",
    about_quote: "My goal is simple — to combine surgical precision with deep empathy, providing every patient and family with clarity, dignity, and real hope throughout their cancer journey.",
    about_bio_p1: "Lt Col (Dr) Rahul Sandhu is a dedicated and highly skilled Surgical Oncologist with over 15 years of experience in clinical surgery, emergency trauma care, and military medicine. He completed his specialized Fellowship in Surgical Oncology at the prestigious Homi Bhabha Cancer Hospital and Research Centre (HBCHRC), Punjab (Tata Memorial Centre).",
    about_bio_p2: "Prior to his full-time cancer practice, Dr. Sandhu served with distinction as a Graded Surgical Specialist in the Indian Armed Forces (2010–2024). He led the Department of General Surgery and Emergency Trauma Care at Military Hospital, Panagarh—one of the busiest zonal military hospitals under Eastern Command. His distinguished military tenures span high-stress operational deployments including the Siachen Glacier and international combined surgical exercises like the Indo-French Joint Exercise in 2015.",
    about_bio_p3: "Dr. Sandhu specializes in breast oncoplastic surgery, gastrointestinal and colorectal malignancies, head & neck resections, gynaecological oncology, and advanced minimally invasive laparoscopic procedures. His practice philosophy centers on compassionate communication, evidence-based multidisciplinary care, and surgical excellence.",
    about_doctor_photo: "/images/dr-rahul-sandhu-consultation.jpg",

    why_choose_heading: "A More Personal Approach to Your Health",
    why_choose_subheading: "Combining 15+ years of military surgical precision with compassionate oncology care tailored to you and your loved ones.",
    why_choose_item1_title: "Extensive Surgical Experience",
    why_choose_item1_desc: "Over 15 years handling complex surgical resections, high-stress emergency trauma, and advanced oncological procedures.",
    why_choose_item2_title: "Specialized Oncology Training",
    why_choose_item2_desc: "Fellowship trained at Homi Bhabha Cancer Hospital and Research Centre (HBCHRC) with minimal access surgical fellowships.",
    why_choose_item3_title: "Personalized Treatment Planning",
    why_choose_item3_desc: "Every case is evaluated comprehensively with tailored surgical plans aimed at optimal clearance and functional preservation.",
    why_choose_item4_title: "Compassionate Communication",
    why_choose_item4_desc: "Known for patient, empathetic listening—giving patients and families the time, clarity, and reassurance they deserve.",

    cta_banner_heading: "Expert Guidance at Every Step of Your Cancer Care Journey",
    cta_banner_subheading: "Speak directly with Lt Col (Dr) Rahul Sandhu to understand your diagnosis, surgical options, and next steps with complete clarity.",
    cta_banner_phone: "+91 9888970519",

    clinic1_name: "Shalby Hospital, Mohali",
    clinic1_address: "Mohali Stadium Rd, near PCA Stadium, Phase 9, Sector 63, Sahibzada Ajit Singh Nagar, Punjab 160062",
    clinic1_timings: "Mon – Sat: 9:00 AM – 5:00 PM",
    clinic1_map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.730248430634!2d76.73264637651034!3d30.697858088924043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee7bf568dc65%3A0x64e03507dcb0653c!2sShalby%20Hospital%20Mohali!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",

    clinic2_name: "ClearMedi Healthcare, Kharar",
    clinic2_address: "NH-21, Chandigarh-Ropar Road, Kharar, Punjab 140104",
    clinic2_timings: "Mon – Sat: By Prior Appointment",
    clinic2_map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.483120129038!2d76.64321287651307!3d30.74665488583489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fe53b015b63eb%3A0xc47e30d1767675f9!2sClearMedi%20Radiant%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",

    section_order: JSON.stringify([
      "hero",
      "highlights",
      "about",
      "specialties",
      "treatments",
      "why_choose",
      "timeline",
      "testimonials",
      "blogs",
      "cta",
      "contact"
    ]),
    section_visibility: JSON.stringify({
      topbar: true,
      hero: true,
      highlights: true,
      about: true,
      specialties: true,
      treatments: true,
      why_choose: true,
      timeline: true,
      testimonials: true,
      blogs: true,
      cta: true,
      contact: true,
      footer: true
    }),

    seo_meta_title: "Lt Col (Dr) Rahul Sandhu | Surgical Oncologist in Mohali & Chandigarh",
    seo_meta_description: "Lt Col (Dr) Rahul Sandhu is an expert Surgical Oncologist in Mohali & Chandigarh with over 15 years experience in clinical surgery, trauma care, and advanced oncological procedures.",
    seo_keywords: "Surgical Oncologist Mohali, Cancer Surgeon Chandigarh, Lt Col Dr Rahul Sandhu, Breast Cancer Surgery, GI Cancer Surgeon, Tumor Resection",
  };

  const insertSetting = db.prepare("INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)");
  for (const [k, v] of Object.entries(defaultSettings)) {
    insertSetting.run(k, v);
  }

  // 2. Cancer Specialities
  const specialties = [
    {
      id: "spec-1",
      slug: "breast-cancer",
      title: "Breast Cancer",
      subtitle: "Breast-Conserving Surgery & Oncoplastic Resection",
      excerpt: "Comprehensive surgical treatment for breast carcinomas, including lumpectomy, sentinel node biopsy, and oncoplastic reconstruction designed for complete clearance and natural aesthetics.",
      description: "Breast cancer surgical care requires a balance of absolute oncological clearance and cosmetic preservation. Dr. Rahul Sandhu provides advanced breast-conserving surgery (BCS), sentinel lymph node biopsy (SLNB) to spare healthy axillary nodes, and oncoplastic breast reconstruction.",
      symptoms: "Painless lump in the breast or armpit, skin dimpling or puckering, nipple inversion or discharge, redness or thickening of breast skin.",
      diagnosis: "Triple assessment: Clinical breast examination, bilateral digital mammography / ultrasound breast, and Core needle biopsy under image guidance.",
      surgical_approaches: "Breast-conserving lumpectomy, Modified Radical Mastectomy (MRM), Sentinel Lymph Node Biopsy with radio-tracer/dye, Oncoplastic flap reconstruction.",
      post_care: "Postoperative drain care instructions, early arm mobility exercises, lymphedema prevention guidance, and seamless handoff to multidisciplinary tumor board for systemic therapy.",
      image: "/images/specialties/breast-cancer.jpg",
      order_num: 1,
      is_published: 1
    },
    {
      id: "spec-2",
      slug: "colorectal-cancer",
      title: "Colorectal Cancer",
      subtitle: "Minimally Invasive Colon & Rectal Resection",
      excerpt: "State-of-the-art laparoscopic and open surgeries for colon and rectal malignancies, focused on sphincter preservation, low complications, and rapid postoperative recovery.",
      description: "Colorectal tumors require precise anatomical resection along embryological planes (Complete Mesocolic Excision / Total Mesorectal Excision) to ensure adequate lymph node yield while safeguarding pelvic nerves and sphincter function.",
      symptoms: "Unexplained alteration in bowel habits (chronic diarrhea or constipation), rectal bleeding or dark stools, persistent abdominal cramps or bloating, unexplained weight loss and fatigue.",
      diagnosis: "High-definition Colonoscopy with tissue biopsy, Contrast-Enhanced CT Abdomen-Pelvis, MRI Pelvis for rectal tumors, and serum CEA monitoring.",
      surgical_approaches: "Laparoscopic Right/Left Hemicolectomy, Anterior Resection, Low Anterior Resection (LAR) with sphincter preservation, Abdominoperineal Resection (APR) when indicated.",
      post_care: "Enhanced Recovery After Surgery (ERAS) protocol, early oral refeeding, stoma education and nursing support where temporary diversion is created.",
      image: "/images/specialties/colorectal-cancer.jpg",
      order_num: 2,
      is_published: 1
    },
    {
      id: "spec-3",
      slug: "head-neck-cancer",
      title: "Head & Neck Cancer",
      subtitle: "Oral Cavity, Larynx & Neck Dissections",
      excerpt: "Advanced oncologic resections for oral cavity, tongue, buccal mucosa, salivary gland, and throat cancers with functional microvascular reconstructive alignment.",
      description: "Head and neck oncologic surgery demands meticulous margin clearance coupled with careful preservation of facial aesthetics, speech, swallowing, and airway patency. Dr. Rahul Sandhu brings deep military surgical discipline and oncological fellowship training to these complex cases.",
      symptoms: "Non-healing mouth ulcers lasting over two weeks, persistent sore throat or difficulty swallowing, red or white patches inside the mouth, unilateral neck swelling or lump.",
      diagnosis: "Detailed clinical endoscopy, biopsy of the primary oral lesion, Contrast CT or MRI of head and neck, and Fine Needle Aspiration (FNAC) of cervical lymph nodes.",
      surgical_approaches: "Composite resection, wide local excision of tongue/buccal mucosa with margin control, Selective and Modified Radical Neck Dissection, reconstructive local and regional flaps.",
      post_care: "Airway monitoring, specialized nutritional support, speech and swallowing rehabilitation, oral hygiene management.",
      image: "/images/specialties/head-neck-cancer.jpg",
      order_num: 3,
      is_published: 1
    },
    {
      id: "spec-4",
      slug: "liver-pancreatic-tumors",
      title: "Liver & Pancreatic Tumors",
      subtitle: "Complex Hepato-Pancreato-Biliary (HPB) Surgery",
      excerpt: "Surgical management of liver masses, bile duct tumors, and pancreatic neoplasms with precision vascular control and multidisciplinary tumor board coordination.",
      description: "Tumors of the liver, gallbladder, bile ducts, and pancreas are among the most surgically demanding. Dr. Rahul Sandhu provides thorough preoperative staging, accurate margin planning, and personalized palliative or curative surgical resections.",
      symptoms: "Painless progressive jaundice (yellowing of eyes and skin), dark urine and pale stools, upper abdominal pain radiating to the back, unexplained appetite loss and weight loss.",
      diagnosis: "Triple-phase CT Abdomen, MRCP (Magnetic Resonance Cholangiopancreatography), Endoscopic Ultrasound (EUS) with biopsy, CA 19-9 and AFP tumor markers.",
      surgical_approaches: "Pancreaticoduodenectomy (Whipple Procedure), Distal Pancreatectomy with splenectomy, Non-anatomical and anatomical liver resections, Radical Cholecystectomy.",
      post_care: "Intensive care monitoring during initial 24-48 hours, enzyme supplementation guidance, strict glucose management, and tailored nutritional recovery.",
      image: "/images/specialties/liver-pancreatic-tumors.jpg",
      order_num: 4,
      is_published: 1
    },
    {
      id: "spec-5",
      slug: "stomach-cancer",
      title: "Stomach Cancer",
      subtitle: "Gastrectomy & D2 Lymphadenectomy",
      excerpt: "Radical subtotal and total gastrectomy with standardized D2 lymph node clearance for gastric carcinomas and gastrointestinal stromal tumors (GIST).",
      description: "Effective surgical care for stomach cancer centers on achieving microscopic negative margins (R0 resection) along with standardized D2 lymphadenectomy to accurately stage the disease and decrease recurrence rates.",
      symptoms: "Persistent indigestion, burning or epigastric discomfort, early satiety after small meals, nausea or vomiting, iron deficiency anemia or black tarry stools.",
      diagnosis: "Upper Gastrointestinal Endoscopy with multiple biopsies, Contrast CT Thorax-Abdomen-Pelvis for staging, and Endoscopic Ultrasound.",
      surgical_approaches: "Subtotal Gastrectomy with Roux-en-Y gastrojejunostomy, Total Gastrectomy with Roux-en-Y esophagojejunostomy, D2 lymph node dissection.",
      post_care: "Stepwise dietary progression from liquids to small frequent soft meals, vitamin B12 supplementation protocol, and post-gastrectomy dietary counseling.",
      image: "/images/specialties/stomach-cancer.jpg",
      order_num: 5,
      is_published: 1
    },
    {
      id: "spec-6",
      slug: "thyroid-parathyroid-tumors",
      title: "Thyroid & Parathyroid Tumors",
      subtitle: "Endocrine Surgery with Recurrent Laryngeal Nerve Monitoring",
      excerpt: "Meticulous thyroidectomy and parathyroidectomy preserving the recurrent laryngeal vocal nerves and parathyroid glands while removing malignant endocrine nodules.",
      description: "Surgical removal of thyroid and parathyroid lesions requires microscopic dissection along the trachea to preserve vocal cord nerve function and avoid hypocalcemia, while ensuring complete eradication of primary tumor and central neck nodes.",
      symptoms: "A palpable nodule or swelling in the lower front of the neck, hoarseness of voice, difficulty swallowing or feeling of fullness in the throat, swollen neck nodes.",
      diagnosis: "High-resolution neck ultrasound with TI-RADS scoring, Ultrasound-guided FNAC (Bethesda classification), Serum TSH, Free T3/T4, Calcium, and PTH levels.",
      surgical_approaches: "Hemithyroidectomy, Total Thyroidectomy with central compartment neck dissection, Selective lateral neck dissection for nodal metastasis, Minimally invasive parathyroidectomy.",
      post_care: "Serum calcium monitoring, vocal cord mobility assessment, thyroid hormone replacement calibration, and radioactive iodine (RAI) therapy coordination when indicated.",
      image: "/images/specialties/thyroid-parathyroid-tumors.jpg",
      order_num: 6,
      is_published: 1
    }
  ];

  const insertSpec = db.prepare(`
    INSERT OR REPLACE INTO specialties 
    (id, slug, title, subtitle, excerpt, description, symptoms, diagnosis, surgical_approaches, post_care, image, order_num, is_published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const s of specialties) {
    insertSpec.run(s.id, s.slug, s.title, s.subtitle, s.excerpt, s.description, s.symptoms, s.diagnosis, s.surgical_approaches, s.post_care, s.image, s.order_num, s.is_published);
  }

  // 3. Surgical Treatments
  const treatments = [
    {
      id: "treat-1",
      slug: "tumor-resection",
      title: "Tumor Resection",
      subtitle: "Precision Oncologic Excision with Margin Clearance",
      excerpt: "Removal of cancerous or complex benign tumors with surgical precision, aiming for complete R0 cancer clearance while preserving surrounding healthy tissue and critical organ function.",
      description: "Tumor Resection Surgery is a cornerstone procedure used to remove cancerous or benign tumors from the body. Performed with meticulous technique, the surgery focuses on complete microscopic margin clearance (R0) while safeguarding neighboring nerves, blood vessels, and healthy anatomy.",
      indications: "Primary solid tumors of the breast, gastrointestinal tract, soft tissues, head & neck, and pelvic organs where localized resection provides curative or significant disease-control intent.",
      procedure_steps: "Preoperative anatomical staging via high-resolution cross-sectional imaging; Careful intraoperative dissection along tissue planes; Frozen section margin evaluation when needed; Hemostasis and functional anatomical reconstruction.",
      benefits: "High rate of complete cancer clearance, reduction of local recurrence risk, preservation of critical bodily functions, and tissue preservation.",
      recovery_info: "Varies from 2 to 5 days in hospital depending on organ site, with structured ambulation, pain management, and wound healing protocols.",
      image: "/images/tumor-resection.jpg",
      order_num: 1,
      is_published: 1
    },
    {
      id: "treat-2",
      slug: "biopsy-cancer-diagnosis",
      title: "Biopsy & Cancer Diagnosis",
      subtitle: "Accurate Histopathological Sampling for Timely Treatment",
      excerpt: "Crucial diagnostic procedure used to determine whether a suspicious growth or lump is malignant, establishing the exact histological subtype and molecular markers to guide targeted care.",
      description: "Accurate biopsy and cancer diagnosis help detect cancer early, guiding timely and effective treatment decisions. Dr. Sandhu employs image-guided core needle biopsies, incisional biopsies, and excisional biopsies tailored to tumor depth and location.",
      indications: "Suspicious breast lumps, enlarged lymph nodes of unknown etiology, soft tissue masses, thyroid nodules, or unexplained abdominal lesions.",
      procedure_steps: "Evaluation of prior ultrasound or CT scans; Local anesthesia or mild sedation; Precise needle placement or small incision to acquire intact tissue cylinders; Rapid dispatch for histopathology and immunohistochemistry (IHC).",
      benefits: "Definitive microscopic confirmation, genetic and receptor analysis (HER2, ER/PR, MSI, PD-L1), avoiding unnecessary radical surgeries.",
      recovery_info: "Most biopsies are performed as day-care or outpatient procedures with immediate return to light daily activities within 24 hours.",
      image: "/images/Cancer-Diagnostic.jpg",
      order_num: 2,
      is_published: 1
    },
    {
      id: "treat-3",
      slug: "lymph-node-dissection",
      title: "Lymph Node Dissection",
      subtitle: "Vital Step in Cancer Staging & Regional Control",
      excerpt: "Assessment and removal of regional lymph node basins to determine cancer spread, prevent regional metastasis, and formulate exact adjuvant therapy regimens.",
      description: "Lymph node dissection, also known as lymphadenectomy, is a crucial surgical procedure in cancer care. It involves the targeted removal of one or more groups of lymph nodes to evaluate tumor spread, commonly performed in breast, GI, melanoma, and gynaecological cancers.",
      indications: "Confirmed nodal metastasis or high-risk primary solid malignancies (axillary nodes in breast cancer, cervical nodes in head & neck cancer, mesenteric nodes in colorectal cancer).",
      procedure_steps: "Identification of lymphatic drainage basin; Sentinel node mapping when indicated; Careful dissection preserving major neurovascular bundles; Complete en-bloc removal of regional nodes.",
      benefits: "Accurate pathological staging (N status), regional disease eradication, prevention of lymph node recurrence, guides chemotherapy and radiation necessity.",
      recovery_info: "Surgical drains are maintained for a few days to prevent seroma formation; gentle mobility guidance is provided to prevent lymphedema.",
      image: "/images/Lymp-node-disection.jpg",
      order_num: 3,
      is_published: 1
    },
    {
      id: "treat-4",
      slug: "minimally-invasive-surgery",
      title: "Minimally Invasive Surgery",
      subtitle: "Laparoscopic Oncology with Smaller Incisions & Faster Recovery",
      excerpt: "Advanced surgical techniques utilizing high-definition cameras and specialized instruments through tiny keyhole incisions, resulting in less pain, reduced blood loss, and rapid healing.",
      description: "Minimally Invasive Surgery (MIS) is a modern surgical approach that uses small incisions and high-definition laparoscopic visualization to achieve identical oncological radicality as open surgery with significantly lower patient trauma.",
      indications: "Early to intermediate colon and rectal cancers, gastric lesions, staging laparoscopy, select pelvic tumors, and diagnostic oncology interventions.",
      procedure_steps: "Insufflation of peritoneal cavity; Placement of 5mm to 10mm trocars; High-magnification 4K endoscopic dissection; Specimen retrieval through protected small incision.",
      benefits: "Minimal surgical scarring, drastically reduced post-op pain, lower wound infection rates, faster resumption of normal diet and return to family life.",
      recovery_info: "Patients frequently ambulate within 12-24 hours and are discharged in 2 to 3 days, resuming everyday routines much faster than traditional open laparotomy.",
      image: "/images/Minimal-Invassive-Surgery.jpg",
      order_num: 4,
      is_published: 1
    },
    {
      id: "treat-5",
      slug: "reconstructive-surgery",
      title: "Reconstructive Surgery",
      subtitle: "Restoring Form, Function & Quality of Life",
      excerpt: "Specialized surgical care aimed at repairing, restoring, and rebuilding tissue defects following major tumor removal, trauma, or oncological ablation.",
      description: "Reconstructive surgery is an integral branch of cancer care aimed at restoring the form and functional integrity of the body after aggressive cancer removal. Dr. Sandhu integrates reconstructive techniques directly into surgical planning.",
      indications: "Extensive tissue resection in breast cancer, head and neck oncological defects, complex abdominal wall reconstruction, and soft tissue defect closures.",
      procedure_steps: "Pre-excision planning of reconstructive margins; Mobilization of local or regional tissue flaps; Tension-free layered anatomical closure with cosmetic suturing.",
      benefits: "Restoration of appearance, preservation of bodily function (speech, swallowing, limb movement, body contours), and psychological well-being.",
      recovery_info: "Careful monitoring of flap vascularity and wound healing with gradual rehabilitation exercises under medical supervision.",
      image: "/images/Reconstructive-Surgery.jpg",
      order_num: 5,
      is_published: 1
    },
    {
      id: "treat-6",
      slug: "palliative-surgical-care",
      title: "Palliative Surgical Care",
      subtitle: "Enhancing Comfort, Relieving Pain & Restoring Dignity",
      excerpt: "Compassionate, purpose-driven surgical interventions focused on relieving distressing symptoms, managing bowel obstructions, controlling bleeding, and improving quality of life in advanced stages.",
      description: "Palliative surgery focuses on improving the quality of life for patients with advanced or metastatic cancers. The goal is not curative tumor clearance, but relieving acute distress, easing pain, and restoring physical comfort.",
      indications: "Intestinal obstruction, intractable tumor bleeding, debilitating fluid buildup (malignant ascites or pleural effusion), severe pain, or ulcerating tumors.",
      procedure_steps: "Goal-concordant discussion with patient and family; Minimally invasive bypass, stoma creation, decompression, or palliative tumor de-bulking; Immediate symptom relief focus.",
      benefits: "Quick relief from distressing nausea, vomiting, or pain; Restoration of enteral nutrition; Improved quality of remaining life and dignity.",
      recovery_info: "Rapid mobilization with close palliative care team coordination and focus on home comfort.",
      image: "/images/paliative-surgery-care1.jpg",
      order_num: 6,
      is_published: 1
    },
    {
      id: "treat-7",
      slug: "gynaecological-cancer-surgery",
      title: "Gynaecological Cancer Surgery",
      subtitle: "Expert Surgical Care for Ovarian, Uterine & Cervical Malignancies",
      excerpt: "Comprehensive open and laparoscopic surgical solutions for reproductive organ tumors, including cytoreductive staging, radical hysterectomy, and fertility-sparing considerations.",
      description: "Gynaecological oncology surgeries address tumors affecting the female reproductive system: ovaries, uterus, cervix, and fallopian tubes. Dr. Rahul Sandhu provides personalized care combining radical oncological clearance with empathetic patient support.",
      indications: "Endometrial carcinoma, ovarian malignancies, cervical cancer, complex adnexal masses.",
      procedure_steps: "Systematic pelvic and abdominal staging; Radical hysterectomy with bilateral salpingo-oophorectomy; Pelvic and para-aortic lymphadenectomy; Optimal debulking in ovarian cases.",
      benefits: "Thorough removal of pelvic disease, accurate staging, symptom resolution, improved long-term disease control.",
      recovery_info: "Patients receive tailored pelvic floor guidance, thrombosis prophylaxis, and supportive recovery protocols over 3-7 days in hospital.",
      image: "/images/Gynaecological-cancer.jpg",
      order_num: 7,
      is_published: 1
    },
    {
      id: "treat-8",
      slug: "urological-cancer-surgery",
      title: "Urological Cancer Surgery",
      subtitle: "Advanced Interventions for Kidney, Bladder, Prostate & Testicular Tumors",
      excerpt: "Comprehensive diagnosis and specialized surgical treatment for genitourinary cancers utilizing nephron-sparing partial nephrectomy, radical cystectomy, and pelvic lymphadenectomy.",
      description: "Urological oncology involves delicate procedures requiring preservation of renal function, urinary continence, and nerve pathways. Dr. Rahul Sandhu brings proven surgical dexterity to complex renal and pelvic tumors.",
      indications: "Renal cell carcinoma (kidney tumors), bladder urothelial cancer, prostate tumors, and testicular neoplasms.",
      procedure_steps: "Preoperative 3D vascular reconstruction review; Partial or radical nephrectomy; Transurethral resection or radical cystectomy with urinary diversion; Retroperitoneal lymph node dissection.",
      benefits: "Maximal preservation of functioning kidney tissue where feasible, oncologically sound margin clearance, reduced risk of urinary complications.",
      recovery_info: "Close monitoring of renal output, fluid balance, catheter management, and structured home care transition.",
      image: "/images/Urological-Cancers.jpg",
      order_num: 8,
      is_published: 1
    }
  ];

  const insertTreat = db.prepare(`
    INSERT OR REPLACE INTO treatments
    (id, slug, title, subtitle, excerpt, description, indications, procedure_steps, benefits, recovery_info, image, order_num, is_published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const t of treatments) {
    insertTreat.run(t.id, t.slug, t.title, t.subtitle, t.excerpt, t.description, t.indications, t.procedure_steps, t.benefits, t.recovery_info, t.image, t.order_num, t.is_published);
  }

  // 4. Testimonials (Genuine Google reviews from drrahulsandhu.com)
  const testimonials = [
    {
      id: "test-1",
      author_name: "Tavleen Kaur",
      author_location: "Chandigarh",
      condition: "Secondary Oncology Care & Guidance",
      content: "I was referred to Dr. Rahul Sandhu by a close friend when my mother's condition worsened after receiving cancer treatment at TMC. From the very first meeting, Dr. Sandhu's positivity and compassion gave us a sense of hope that we had been desperately looking for. He is not just a highly skilled Surgical Oncologist and Lieutenant Colonel, but also an incredibly down-to-earth, gentle, and sophisticated human being. What truly sets him apart is the time he gives to his patients. He explained every step of the treatment clearly, answered all our questions with patience, and made sure we never felt rushed or ignored. In moments of confusion and fear, he became a beacon of clarity and reassurance.",
      rating: 5,
      source: "Google Reviews (Verified)",
      is_featured: 1,
      is_approved: 1,
      created_at: "2025-08-14"
    },
    {
      id: "test-2",
      author_name: "Munish Rana",
      author_location: "Kharar, Punjab",
      condition: "Gallbladder & Complex Onco Evaluation",
      content: "My mother was suffering from severe pain and gallbladder swelling. We went to meet Dr Rahul Sandhu an Onco Specialist at ClearMedi Hospital. From the very first consultation, he made sure to explain the diagnosis clearly and guided us step-by-step through the entire process. Their expertise, compassionate approach, and attention to detail gave us great confidence and hope. Dr Rahul Sandhu always listened very patiently to our concerns and answered all our questions whether in person or over phone calls. The treatment was handled with utmost professionalism. I felt well-supported both medically and emotionally through this tough time.",
      rating: 5,
      source: "Google Reviews (Verified)",
      is_featured: 1,
      is_approved: 1,
      created_at: "2025-09-02"
    },
    {
      id: "test-3",
      author_name: "Anchal Pamma",
      author_location: "Mohali, Punjab",
      condition: "Kidney Surgery",
      content: "Would take a moment to appreciate Dr. Sandhu for being an amazing surgeon. We are extremely grateful for the excellent care given to my mother during her kidney surgery. He explained everything clearly, handled the surgery with great expertise, and ensured smooth recovery. Very humble, patient, and approachable. Highly recommended.",
      rating: 5,
      source: "Google Reviews (Verified)",
      is_featured: 1,
      is_approved: 1,
      created_at: "2025-07-19"
    },
    {
      id: "test-4",
      author_name: "Sukhmanpreet Kaur",
      author_location: "Canada (International Patient)",
      condition: "Specialized Clinical Care",
      content: "I traveled all the way from Canada to see Dr. Rahul Sandhu, and it was the best decision I could have made. Beyond his medical expertise, he is exceptionally nice, calm, and supportive. He took the time to listen to my concerns and made me feel completely at ease throughout the entire process. If you are looking for effective care from a doctor who truly cares about his patients, go for it. He is one of the best doctors I have ever met. Thank you so much Dr Rahul Sandhu!",
      rating: 5,
      source: "Google Reviews (Verified)",
      is_featured: 1,
      is_approved: 1,
      created_at: "2025-06-28"
    },
    {
      id: "test-5",
      author_name: "Devanshi Dhillon",
      author_location: "Punjab",
      condition: "Laparoscopic Surgery",
      content: "I had the first surgery of my life—laparoscopic surgery. I was really scared and anxious about what would happen. But after having an appointment with my surgeon Dr. Rahul Sandhu, he comforted me like a friend. He is empathetic, an active listener, and an excellent communicator who provides thorough explanations and a clear plan of action. Now I am completely fine. It did not even feel like I had surgery. Do consult with him for your health.",
      rating: 5,
      source: "Google Reviews (Verified)",
      is_featured: 1,
      is_approved: 1,
      created_at: "2025-05-15"
    },
    {
      id: "test-6",
      author_name: "Satveer Singh",
      author_location: "Punjab",
      condition: "Surgical Care & Recovery",
      content: "I am very satisfied with Dr. Rahul Sandhu's treatment. He is very nice and polite, and the nursing team is also very efficient. Highly professional doctor who gives true comfort to his patients.",
      rating: 5,
      source: "Google Reviews (Verified)",
      is_featured: 0,
      is_approved: 1,
      created_at: "2025-08-01"
    }
  ];

  const insertTest = db.prepare(`
    INSERT OR REPLACE INTO testimonials
    (id, author_name, author_location, condition, content, rating, source, is_featured, is_approved, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const t of testimonials) {
    insertTest.run(t.id, t.author_name, t.author_location, t.condition, t.content, t.rating, t.source, t.is_featured, t.is_approved, t.created_at);
  }

  // 5. Genuine Blog Articles from drrahulsandhu.com
  const blogs = [
    {
      id: "blog-1",
      slug: "cancer-surgery-what-to-expect-before-during-and-after",
      title: "Cancer Surgery: What to Expect Before, During, and After",
      excerpt: "A comprehensive guide by Lt Col (Dr) Rahul Sandhu on navigating cancer surgery—from diagnostic preparation and pre-anesthesia checks to the operating room and supportive post-op recovery.",
      content: `Cancer surgery is a vital part of treatment for many types of cancer. For patients and their families, the word "surgery" often brings a mix of hope, anxiety, and questions. Knowing what to expect at each stage can demystify the process and help you approach your surgery with confidence.

### 1. Before Surgery: Preparation & Trust
The weeks leading up to surgery are dedicated to thorough preparation. During your consultations with Lt Col (Dr) Rahul Sandhu, you will discuss:
- **Comprehensive Staging & Imaging:** High-resolution CT scans, MRI, or PET scans help define the exact boundaries of the tumor.
- **Pre-Anesthesia Checkup (PAC):** Blood tests, cardiac evaluation, and chest imaging ensure you are physically optimized for the procedure.
- **Informed Discussion:** You will receive clear explanations regarding the surgical approach (open vs. minimally invasive), expected hospital stay, and potential risks.
- **Nutrition & Physical Fitness:** Prehabilitation—including light walking, breathing exercises, and high-protein nutrition—significantly speeds up recovery.

### 2. During Surgery: Precision & Safety
In the operating room, modern oncology follows rigorous safety standards:
- **Dedicated Onco-Surgical Team:** Led by Dr. Rahul Sandhu alongside experienced anesthesiologists and specialized surgical nurses.
- **Targeted Clearance:** The primary tumor is excised with microscopic negative margins (R0 resection) to eliminate lingering malignant cells.
- **Lymph Node Staging:** Regional lymph nodes are sampled or systematically dissected to evaluate microscopic spread.
- **Advanced Monitoring:** Intraoperative nerve monitoring and high-definition visualization protect critical neurovascular structures.

### 3. After Surgery: The Path to Recovery
Recovery is a stepwise, patient-centered journey:
- **Enhanced Recovery After Surgery (ERAS):** We focus on early oral fluid intake, minimal drain usage, and gentle mobilization on day 1 to prevent complications.
- **Effective Pain Management:** Multimodal analgesia ensures you are comfortable and able to take deep breaths and walk comfortably.
- **Histopathology Review:** Around 7 to 10 days post-surgery, the final pathology report details tumor margins, grade, and nodal status, forming the basis for any subsequent adjuvant treatments (chemotherapy or radiation).

Remember: Every patient's body and cancer are unique. Having an approachable surgical oncologist who answers every question with patience transforms anxiety into strength.`,
      cover_image: "/images/Cancer-Surgery-300x225.png",
      category: "Cancer Surgery",
      author: "Lt Col (Dr) Rahul Sandhu",
      read_time: "5 min read",
      published_date: "June 11, 2025",
      is_published: 1
    },
    {
      id: "blog-2",
      slug: "common-fears-before-surgery-and-how-we-help-you-overcome-them",
      title: "Common Fears Before Surgery — And How We Help You Overcome Them",
      excerpt: "Facing surgery for cancer can feel daunting. Dr. Rahul Sandhu addresses common fears around pain, anesthesia, recovery time, and recurrence, replacing anxiety with clarity and hope.",
      content: `Facing surgery—especially for something as serious as cancer—can be one of the most stressful times in a person's life. Even with the best surgical oncologist and advanced medical technology, anxiety, uncertainty, and fear are entirely natural emotions.

In our practice, we believe that treating a patient means healing both the physical condition and calming the emotional storm. Here are the most frequent fears patients share with us and how we address them:

### Fear #1: "Will the surgery be very painful?"
**The Reality:** Modern pain management has evolved dramatically. Today, we utilize multimodal analgesia—combining regional nerve blocks, epidural techniques, and tailored intravenous medications. Most patients are surprised to find their discomfort is mild to moderate and easily managed. Our goal is to keep you pain-free so you can breathe deeply and walk early.

### Fear #2: "What if the cancer spreads because of surgery?"
**The Reality:** This is a widespread myth. Surgery does not cause cancer to spread. On the contrary, precise surgical resection is the single most effective way to eliminate solid tumors before they have the chance to spread. We follow strict oncological "no-touch" principles and anatomical planes to safeguard surrounding healthy tissue.

### Fear #3: "I'm terrified of anesthesia."
**The Reality:** Modern general anesthesia is safer than it has ever been. Before surgery, you will have a comprehensive evaluation with our senior anesthesiology team to tailor medications specifically to your medical history, heart, and lung function. You are continuously monitored with advanced life-support technology throughout every second of the operation.

### Fear #4: "How long will I be bedridden?"
**The Reality:** Bed rest after surgery is now minimized. Under our Enhanced Recovery protocols, most patients sit up, drink fluids, and take gentle steps within 12 to 24 hours of surgery. Early activity stimulates circulation, prevents blood clots, and accelerates intestinal recovery.

### The Antidote to Fear: Clear, Empathetic Communication
The most powerful cure for surgical fear is a doctor who listens. At our clinics in Shalby Hospital Mohali and ClearMedi Healthcare Kharar, we ensure no patient enters the operating theatre with unresolved doubts.`,
      cover_image: "/images/Fears-Before-Surgery-300x225.png",
      category: "Patient Guidance",
      author: "Lt Col (Dr) Rahul Sandhu",
      read_time: "4 min read",
      published_date: "June 11, 2025",
      is_published: 1
    },
    {
      id: "blog-3",
      slug: "minimally-invasive-cancer-surgery-benefits-and-techniques",
      title: "Minimally Invasive Cancer Surgery: Benefits and Techniques",
      excerpt: "Exploring how laparoscopic and keyhole surgical oncology techniques achieve oncological precision while minimizing trauma, hospital stays, and scarring for patients.",
      content: `Over the past two decades, surgical oncology has undergone a quiet revolution. Where massive abdominal incisions were once obligatory for cancer removal, minimally invasive surgery (MIS) now allows skilled surgeons to achieve identical or superior oncological clearance through small, precise keyhole incisions.

### What is Minimally Invasive Oncology?
Minimally invasive cancer surgery utilizes miniature high-resolution 4K cameras (laparoscopes) and specialized micro-instruments inserted through ports measuring just 5mm to 10mm. The surgeon operates with 10x magnified, crystal-clear 3D views of delicate anatomy, nerves, and blood vessels.

### Key Benefits for Cancer Patients
1. **Less Surgical Trauma & Blood Loss:** Small incisions significantly reduce muscle cutting and blood loss during tumor dissection.
2. **Reduced Postoperative Pain:** Patients require considerably fewer opioid painkillers, lowering side effects like nausea, constipation, and sedation.
3. **Faster Return of Bowel Function:** In colorectal and abdominal surgeries, keyhole surgery minimizes bowel manipulation, allowing patients to resume normal diet within 24 to 48 hours.
4. **Shorter Hospital Stay:** Patients are often ready to return home in 2 to 3 days instead of a week or more.
5. **Quicker Transition to Adjuvant Therapy:** Because wounds heal faster with fewer complications, patients who require postoperative chemotherapy or radiation can begin their treatments without debilitating delays.

### Is Every Cancer Patient a Candidate?
Not all tumors can or should be treated with minimally invasive methods. Very large tumors or extensive local invasions may still require traditional open surgery for safe oncological margins. Dr. Rahul Sandhu evaluates each case individually to choose the approach that guarantees maximum oncological safety first and foremost.`,
      cover_image: "/images/surgery-300x225.png",
      category: "Surgical Innovations",
      author: "Lt Col (Dr) Rahul Sandhu",
      read_time: "6 min read",
      published_date: "May 30, 2025",
      is_published: 1
    }
  ];

  const insertBlog = db.prepare(`
    INSERT OR REPLACE INTO blogs
    (id, slug, title, excerpt, content, cover_image, category, author, read_time, published_date, is_published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const b of blogs) {
    insertBlog.run(b.id, b.slug, b.title, b.excerpt, b.content, b.cover_image, b.category, b.author, b.read_time, b.published_date, b.is_published);
  }

  // 6. Admin User with secure PBKDF2 hash & salt
  const checkAdmin = db.prepare("SELECT * FROM admin_users WHERE username = 'admin'").get() as { id: string; password_hash: string; salt?: string } | undefined;
  if (!checkAdmin) {
    const salt = "77225e5535c8af2e7d42e39828ac7b29";
    // PBKDF2 100k rounds SHA512 hash of default admin password DrSandhu@2026!
    const passwordHash = "e531d662b0a92338d8b7a9d9047933ac457fa776ec1aa79d449d3a9932793c9a9cf5408a0f8111d5d874a9131c540741c847bcc528440109474b516b82a286f6";
    const insertAdmin = db.prepare("INSERT INTO admin_users (id, username, password_hash, salt, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
    insertAdmin.run("admin-1", "admin", passwordHash, salt, "SuperAdmin", new Date().toISOString(), new Date().toISOString());
  } else if (!checkAdmin.salt) {
    // Upgrade existing admin user to have salt and secure hash
    const salt = "77225e5535c8af2e7d42e39828ac7b29";
    const passwordHash = "e531d662b0a92338d8b7a9d9047933ac457fa776ec1aa79d449d3a9932793c9a9cf5408a0f8111d5d874a9131c540741c847bcc528440109474b516b82a286f6";
    db.prepare("UPDATE admin_users SET password_hash = ?, salt = ?, updated_at = ? WHERE id = ?").run(passwordHash, salt, new Date().toISOString(), checkAdmin.id);
  }

  console.log("Database successfully initialized and seeded!");
}

function seedFaqsAndVideos() {
  const faqCount = db.prepare("SELECT COUNT(*) as count FROM faqs").get() as { count: number };
  if (!faqCount || faqCount.count === 0) {
    const defaultFaqs = [
      {
        id: "faq-1",
        question: "What is the difference between a General Surgeon and a Surgical Oncologist?",
        answer: "A Surgical Oncologist is a specialized surgeon who has completed dedicated sub-specialty fellowship training exclusively in diagnosing, staging, and surgically treating complex benign and malignant tumors. They focus on microscopic margin clearance (R0 resection), systematic lymph node dissection, and multidisciplinary tumor board coordination with medical and radiation oncologists.",
        category: "Clinical Scope",
        order_num: 1,
        is_published: 1,
      },
      {
        id: "faq-2",
        question: "Does surgery cause cancer to spread?",
        answer: "No, this is an unfounded myth. Surgery does not cause cancer to spread. On the contrary, precise surgical resection is one of the most effective curative modalities for solid organ malignancies when diagnosed in operable stages. Surgical oncologists adhere to strict 'no-touch' isolation techniques and embryological anatomical dissection planes to eliminate the tumor safely.",
        category: "Safety & Myths",
        order_num: 2,
        is_published: 1,
      },
      {
        id: "faq-3",
        question: "Where does Lt Col (Dr) Rahul Sandhu conduct consultations and surgeries?",
        answer: "Dr. Rahul Sandhu conducts outpatient consultations and performs oncology surgeries primarily at Shalby Hospital, Mohali (Phase 9, Sector 63) and ClearMedi Healthcare, Kharar (NH-21). Prior appointment booking is recommended to avoid waiting.",
        category: "Hospital & Locations",
        order_num: 3,
        is_published: 1,
      },
      {
        id: "faq-4",
        question: "Can I seek a second opinion on my cancer surgery recommendation?",
        answer: "Yes, absolutely. Seeking a second opinion is encouraged in oncological care. Dr. Rahul Sandhu routinely reviews outside pathology slides, cross-sectional imaging (CT/MRI/PET), and treatment plans to provide an independent, evidence-based assessment of surgical feasibility and organ-preservation options.",
        category: "Second Opinions",
        order_num: 4,
        is_published: 1,
      },
      {
        id: "faq-5",
        question: "What is Minimally Invasive / Laparoscopic Cancer Surgery?",
        answer: "Minimally invasive cancer surgery utilizes 4K high-definition laparoscopes and miniature specialized instruments through tiny incisions (5–10 mm) rather than large abdominal cuts. It results in significantly less postoperative pain, reduced blood loss, shorter hospital stays (2–3 days), and faster recovery.",
        category: "Surgical Technology",
        order_num: 5,
        is_published: 1,
      },
      {
        id: "faq-6",
        question: "What should I bring to my initial consultation?",
        answer: "Please bring all existing diagnostic reports, including biopsy/histopathology slides and blocks, imaging CDs (CT, MRI, PET, Mammography, Ultrasound), recent blood work, previous discharge summaries, and a complete list of any current daily medications.",
        category: "Consultation Preparation",
        order_num: 6,
        is_published: 1,
      },
      {
        id: "faq-7",
        question: "Are cancer surgeries covered under health insurance and cashless empanelment?",
        answer: "Yes, both Shalby Hospital Mohali and ClearMedi Healthcare Kharar have dedicated TPA and insurance desks supporting all major private health insurers, corporate TPAs, CGHS, and ECHS panels.",
        category: "Insurance & Billing",
        order_num: 7,
        is_published: 1,
      },
      {
        id: "faq-8",
        question: "How soon after surgery can I resume normal daily activities?",
        answer: "Under modern Enhanced Recovery After Surgery (ERAS) protocols, patients are encouraged to ambulate and take light fluids within 12 to 24 hours. Full return to light sedentary work typically takes 1 to 2 weeks for keyhole procedures and 3 to 4 weeks for major open abdominal resections.",
        category: "Recovery & ERAS",
        order_num: 8,
        is_published: 1,
      },
    ];

    const insertFaq = db.prepare(`
      INSERT INTO faqs (id, question, answer, category, order_num, is_published, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const f of defaultFaqs) {
      insertFaq.run(f.id, f.question, f.answer, f.category, f.order_num, f.is_published, new Date().toISOString());
    }
  }

  const videoCount = db.prepare("SELECT COUNT(*) as count FROM videos").get() as { count: number };
  if (!videoCount || videoCount.count === 0) {
    const defaultVideos = [
      {
        id: "vid-1",
        title: "Understanding Post-Surgical Recovery & Staging",
        youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "/images/Cancer-Surgery-Rcovery-300x225.png",
        description: "Lt Col (Dr) Rahul Sandhu discusses what patients and families should expect during hospitalization and postoperative recovery.",
        order_num: 1,
        is_published: 1,
      },
      {
        id: "vid-2",
        title: "Minimally Invasive Techniques in Modern Cancer Care",
        youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "/images/Minimal-Invassive-Surgery.jpg",
        description: "Key advantages of high-definition keyhole techniques, minimal blood loss, and accelerated return to normal daily routines.",
        order_num: 2,
        is_published: 1,
      },
    ];

    const insertVideo = db.prepare(`
      INSERT INTO videos (id, title, youtube_url, thumbnail, description, order_num, is_published, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const v of defaultVideos) {
      insertVideo.run(v.id, v.title, v.youtube_url, v.thumbnail, v.description, v.order_num, v.is_published, new Date().toISOString());
    }
  }
}

function seedPages() {
  const pageCount = db.prepare("SELECT COUNT(*) as count FROM pages").get() as { count: number };
  if (!pageCount || pageCount.count === 0) {
    const pages = [
      { slug: "/", title: "Homepage", meta_title: "Lt Col (Dr) Rahul Sandhu | Surgical Oncologist in Mohali & Chandigarh", meta_description: "Premier surgical oncology practice combining 15+ years of military surgical precision with compassionate cancer care." },
      { slug: "/about", title: "About Dr. Rahul Sandhu", meta_title: "About Lt Col (Dr) Rahul Sandhu | Surgical Oncologist & Military Veteran", meta_description: "Learn about Lt Col (Dr) Rahul Sandhu's 15+ years career in clinical surgery and surgical oncology at HBCHRC Punjab." },
      { slug: "/specialities", title: "Cancer Specialities", meta_title: "Cancer Specialities | Surgical Oncology by Dr. Rahul Sandhu", meta_description: "Explore clinical specialities in breast cancer, GI, colorectal, head & neck, hepatobiliary, and endocrine cancers." },
      { slug: "/treatments", title: "Surgical Treatments", meta_title: "Surgical Oncology Treatments & Procedures | Dr. Rahul Sandhu", meta_description: "Comprehensive oncological procedures: tumor resections, laparoscopic surgery, biopsies, and reconstructive surgery." },
      { slug: "/resources", title: "Patient Resources", meta_title: "Patient Resources & Preparation Guides | Dr. Rahul Sandhu", meta_description: "Clinical guidelines on biopsy interpretation, pre-operative preparation, and enhanced recovery protocols." },
      { slug: "/testimonials", title: "Patient Stories & Videos", meta_title: "Patient Experiences & Reviews | Lt Col (Dr) Rahul Sandhu", meta_description: "Verified patient testimonials and clinical video discussions on cancer surgical care." },
      { slug: "/blog", title: "Health & Awareness Blog", meta_title: "Cancer Care Knowledge & Insights | Dr. Rahul Sandhu", meta_description: "Doctor-authored clinical guides on cancer surgery, staging, myths, and early symptom recognition." },
      { slug: "/faqs", title: "Frequently Asked Questions", meta_title: "Cancer Surgery FAQs | Lt Col (Dr) Rahul Sandhu", meta_description: "Clear answers to essential questions regarding surgical oncology, second opinions, and hospitalization." },
      { slug: "/contact", title: "Contact & Appointments", meta_title: "Schedule Consultation | Shalby Mohali & ClearMedi Kharar", meta_description: "Book an outpatient appointment or second surgical opinion with Lt Col (Dr) Rahul Sandhu." },
      { slug: "/privacy-policy", title: "Privacy Policy", meta_title: "Privacy Policy | Lt Col (Dr) Rahul Sandhu", meta_description: "Patient data confidentiality and clinical information privacy statement." },
      { slug: "/terms-of-use", title: "Terms of Use", meta_title: "Terms of Use | Lt Col (Dr) Rahul Sandhu", meta_description: "Medical disclaimer and website terms of use." },
    ];

    const insertPage = db.prepare("INSERT INTO pages (id, slug, title, meta_title, meta_description, is_published, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
    for (const p of pages) {
      insertPage.run("page-" + p.slug.replace(/\//g, "") || "page-home", p.slug, p.title, p.meta_title, p.meta_description, 1, new Date().toISOString());
    }
  }

  const sectionCount = db.prepare("SELECT COUNT(*) as count FROM page_sections").get() as { count: number };
  if (!sectionCount || sectionCount.count === 0) {
    const homeSections = [
      { key: "hero", title: "Hero Cinematic Banner", subtitle: "Top full-width landscape banner with doctor photo and CTAs", order: 1 },
      { key: "highlights", title: "Trust & Credentials Strip", subtitle: "Key clinical highlights and fellowship badges", order: 2 },
      { key: "about", title: "About Doctor Preview", subtitle: "Biography summary, military background, and direct link", order: 3 },
      { key: "specialties", title: "Cancer Specialities Grid", subtitle: "6 priority organ site malignancy cards", order: 4 },
      { key: "treatments", title: "Surgical Approach & Treatments", subtitle: "Treatment procedures, indications, and techniques", order: 5 },
      { key: "why_choose", title: "Why Choose Dr. Rahul Sandhu", subtitle: "Four cornerstone pillars of patient care", order: 6 },
      { key: "timeline", title: "Career & Training Timeline", subtitle: "Milestones across military service and oncology fellowship", order: 7 },
      { key: "testimonials", title: "Confidence & Patient Education", subtitle: "Verified Google reviews and educational articles", order: 8 },
      { key: "blogs", title: "Latest Health Insights", subtitle: "Recent cancer awareness articles and guides", order: 9 },
      { key: "cta", title: "Guidance Consultation Banner", subtitle: "Direct call-to-action banner with phone dialer", order: 10 },
      { key: "contact", title: "Practice Locations & Appointment Form", subtitle: "Interactive clinic switcher, map embeds, and direct form", order: 11 },
    ];

    const insertSec = db.prepare(`
      INSERT INTO page_sections (id, page_slug, section_key, title, subtitle, content, is_visible, order_num, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const s of homeSections) {
      insertSec.run("sec-" + s.key, "/", s.key, s.title, s.subtitle, "", 1, s.order, new Date().toISOString());
    }
  }
}

function indexExistingMedia() {
  const mediaCount = db.prepare("SELECT COUNT(*) as count FROM media_assets").get() as { count: number };
  if (mediaCount && mediaCount.count > 0) return;

  const publicImagesDir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(publicImagesDir)) return;

  const insertMedia = db.prepare(`
    INSERT OR REPLACE INTO media_assets (id, filename, file_path, original_name, mime_type, file_size, alt_text, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  function scanDir(dir: string, relativePrefix = "/images") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath, `${relativePrefix}/${entry.name}`);
      } else if (/\.(jpe?g|png|webp|svg|gif|ico)$/i.test(entry.name)) {
        const stats = fs.statSync(fullPath);
        const ext = path.extname(entry.name).toLowerCase();
        let mime = "image/jpeg";
        if (ext === ".png") mime = "image/png";
        else if (ext === ".webp") mime = "image/webp";
        else if (ext === ".svg") mime = "image/svg+xml";
        else if (ext === ".gif") mime = "image/gif";
        else if (ext === ".ico") mime = "image/x-icon";

        const id = "media-" + Math.random().toString(36).substring(2, 9);
        const webPath = `${relativePrefix}/${entry.name}`;
        const altText = entry.name.replace(/[-_.]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();

        try {
          insertMedia.run(id, entry.name, webPath, entry.name, mime, stats.size, altText, new Date().toISOString());
        } catch {}
      }
    }
  }

  try {
    scanDir(publicImagesDir);
  } catch (err) {
    console.warn("Media scanning warning:", err);
  }
}

// Auto-run schema & seed check
initDb();

export default db;

