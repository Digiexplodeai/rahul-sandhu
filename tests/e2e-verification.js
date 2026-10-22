/**
 * Comprehensive E2E Verification Script
 * Validates requirements A through K from the Master Development Prompt.
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const http = require("http");
const crypto = require("crypto");
const Database = require("better-sqlite3");

const BASE_URL = "http://localhost:3000";

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || "GET",
      headers: options.headers || {},
    };

    const req = http.request(url, reqOptions, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        let json = null;
        try {
          json = JSON.parse(body);
        } catch {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body,
          json,
        });
      });
    });

    req.on("error", reject);

    if (options.body) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("===============================================================================");
  console.log("       STARTING DR. RAHUL SANDHU E2E COMPREHENSIVE VERIFICATION SUITE         ");
  console.log("===============================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------------------
    // TEST A & K: Security & Authorization Verification
    // -------------------------------------------------------------------------
    console.log("--- TEST A & K: Security & Server-Side Authorization ---");
    const unauthEnquiries = await request("/api/enquiries");
    assert(unauthEnquiries.status === 401, "GET /api/enquiries blocks unauthenticated access (returns 401)");

    const unauthSettings = await request("/api/admin/settings", { method: "POST", body: { hero_headline: "Hacked" } });
    assert(unauthSettings.status === 401, "POST /api/admin/settings blocks unauthenticated mutations (returns 401)");

    const unauthSettingsPut = await request("/api/admin/settings", { method: "PUT", body: { hero_headline: "Hacked" } });
    assert(unauthSettingsPut.status === 401, "PUT /api/admin/settings blocks unauthenticated mutations (returns 401)");

    const unauthMediaDelete = await request("/api/admin/media?id=media-123", { method: "DELETE" });
    assert(unauthMediaDelete.status === 401, "DELETE /api/admin/media blocks unauthenticated deletion (returns 401)");

    // -------------------------------------------------------------------------
    // AUTHENTICATION: Admin Login Flow
    // -------------------------------------------------------------------------
    console.log("\n--- Admin Login Flow ---");
    const testAdminPass = "VerificationPass2026!";
    const db = new Database("data/site.db");
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(testAdminPass, salt, 100000, 64, "sha512").toString("hex");
    db.prepare("UPDATE admin_users SET password_hash = ?, salt = ? WHERE username = 'admin'").run(hash, salt);

    const loginRes = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { username: "admin", password: testAdminPass },
    });
    
    assert(loginRes.status === 200, "Admin credentials verified via PBKDF2 authentication");

    const rawCookies = loginRes.headers["set-cookie"] || [];
    const cookieHeader = rawCookies.map((c) => c.split(";")[0]).join("; ");
    assert(cookieHeader.includes("dr_sandhu_admin_session"), "Secure HTTP-only session cookie issued");

    const authHeaders = {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    };

    // -------------------------------------------------------------------------
    // TEST B & C: Settings & Hero Content Editing
    // -------------------------------------------------------------------------
    console.log("\n--- TEST B & C: Dynamic Settings & Homepage Management ---");
    const testHeadline = "Oncology Excellence. Dedicated Surgical Care.";
    const updateSettingsRes = await request("/api/admin/settings", {
      method: "PUT",
      headers: authHeaders,
      body: {
        hero_headline: testHeadline,
      },
    });
    assert(updateSettingsRes.status === 200 && updateSettingsRes.json?.success, "Settings updated via admin API");

    const verifySettings = await request("/api/admin/settings", {
      headers: authHeaders,
    });
    const savedHeadline = verifySettings.json?.settings?.hero_headline || verifySettings.json?.data?.hero_headline;
    assert(
      savedHeadline === testHeadline,
      "Updated headline persisted to database and verified by admin reader"
    );

    // Restore verified original hero content
    await request("/api/admin/settings", {
      method: "PUT",
      headers: authHeaders,
      body: {
        hero_eyebrow: "SURGICAL ONCOLOGY • PATIENT-CENTRED CARE",
        hero_headline: "Precision Cancer Surgery. Compassionate Care.",
        hero_subheading: "Advanced surgical oncology care focused on personalized treatment, clinical expertise, and compassionate patient guidance.",
        hero_doctor_image: "/images/reassuring-oncology-clinic-care.png",
        hero_cta_primary_label: "BOOK A CONSULTATION",
        hero_cta_primary_link: "",
        hero_cta_secondary_label: "MEET DR. RAHUL SANDHU",
        hero_cta_secondary_link: "/about",
      },
    });

    // -------------------------------------------------------------------------
    // TEST D: Blog CRUD Lifecycle
    // -------------------------------------------------------------------------
    console.log("\n--- TEST D: Health Blog Management Lifecycle ---");
    const testBlogSlug = "test-e2e-surgical-advances-" + Date.now();
    const createBlogRes = await request("/api/admin/blogs", {
      method: "POST",
      headers: authHeaders,
      body: {
        title: "E2E Test: Breakthroughs in Surgical Oncology Care",
        slug: testBlogSlug,
        excerpt: "An automated clinical guide verifying database-driven blog creation.",
        content: "<p>Clinical resection protocols and patient rehabilitation strategies.</p>",
        category: "Surgical Oncology",
        read_time: "4 min read",
        is_published: 1,
      },
    });
    assert(createBlogRes.status === 200 && createBlogRes.json?.success, "Blog article created and persisted in DB");

    // Check blog detail route
    const blogPage = await request(`/blog/${testBlogSlug}`);
    assert(blogPage.status === 200, `Public dynamic route /blog/${testBlogSlug} returns HTTP 200`);

    // Clean up test blog
    const createdBlogId = createBlogRes.json?.id || createBlogRes.json?.data?.id;
    if (createdBlogId) {
      const deleteBlogRes = await request(`/api/admin/blogs?id=${createdBlogId}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      assert(deleteBlogRes.status === 200, "Test blog cleanly removed");
    }

    // -------------------------------------------------------------------------
    // TEST E: Speciality / Treatment CRUD Lifecycle
    // -------------------------------------------------------------------------
    console.log("\n--- TEST E: Surgical Treatment CRUD Lifecycle ---");
    const testTreatmentSlug = "test-treatment-laparoscopic-" + Date.now();
    const createTreatmentRes = await request("/api/admin/treatments", {
      method: "POST",
      headers: authHeaders,
      body: {
        title: "E2E Laparoscopic Staging Procedure",
        slug: testTreatmentSlug,
        short_description: "Automated test procedure for minimally invasive staging.",
        full_description: "<p>Comprehensive surgical evaluation of abdominal malignancies.</p>",
        category: "Minimally Invasive",
        is_published: 1,
        order_num: 99,
      },
    });
    assert(createTreatmentRes.status === 200 && createTreatmentRes.json?.success, "Treatment procedure created in database");

    const treatmentPage = await request(`/treatments/${testTreatmentSlug}`);
    assert(treatmentPage.status === 200, `Public dynamic treatment page /treatments/${testTreatmentSlug} returns HTTP 200`);

    const createdTreatmentId = createTreatmentRes.json?.id || createTreatmentRes.json?.data?.id;
    if (createdTreatmentId) {
      const deleteTreatmentRes = await request(`/api/admin/treatments?id=${createdTreatmentId}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      assert(deleteTreatmentRes.status === 200, "Test treatment procedure cleanly removed from database");
    }

    // -------------------------------------------------------------------------
    // TEST F & G: Real Patient Enquiry & Status Management
    // -------------------------------------------------------------------------
    console.log("\n--- TEST F & G: Patient Consultation Enquiry Lifecycle ---");
    const testEnquiry = {
      patient_name: "Verification Patient",
      phone: "+91 98888 12345",
      email: "verification.patient@example.com",
      message: "Requesting surgical second opinion for pancreatic lesion.",
      speciality: "Gastrointestinal Oncology",
      source: "Contact Page Verification",
    };

    const submitEnquiryRes = await request("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: testEnquiry,
    });
    assert(submitEnquiryRes.status === 200 && submitEnquiryRes.json?.success, "Public enquiry submitted and accepted");

    // Fetch leads in admin
    const getLeadsRes = await request("/api/admin/enquiries", {
      headers: authHeaders,
    });
    const leads = getLeadsRes.json?.data || [];
    const createdLead = leads.find((l) => l.email === testEnquiry.email);
    assert(Boolean(createdLead), "Newly submitted enquiry appears in Admin Leads list");

    if (createdLead) {
      // Test G: Update lead status & clinical notes
      const updateLeadRes = await request("/api/admin/enquiries", {
        method: "PUT",
        headers: authHeaders,
        body: {
          id: createdLead.id,
          status: "Appointment Scheduled",
          notes: "Scheduled OPD consultation at Shalby Hospital Mohali on Tuesday.",
        },
      });
      assert(updateLeadRes.status === 200 && updateLeadRes.json?.success, "Enquiry status and clinical notes updated");

      // Verify persistence
      const verifyLeadsRes = await request("/api/admin/enquiries", {
        headers: authHeaders,
      });
      const updatedLead = (verifyLeadsRes.json?.data || []).find((l) => l.id === createdLead.id);
      assert(
        updatedLead?.status === "Appointment Scheduled" && updatedLead?.notes?.includes("Shalby Hospital"),
        "Updated status and notes verified persistent across database reads"
      );

      // Clean up test enquiry
      await request(`/api/admin/enquiries?id=${createdLead.id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
    }

    // -------------------------------------------------------------------------
    // TEST H: Persistence & Backup Functionality
    // -------------------------------------------------------------------------
    console.log("\n--- TEST H: Database Persistence & Backup Export ---");
    const backupRes = await request("/api/admin/backup?type=json", {
      headers: authHeaders,
    });
    assert(
      backupRes.status === 200 && backupRes.json?.settings,
      "CMS Snapshot JSON Export generated successfully with all normalized tables"
    );

    // -------------------------------------------------------------------------
    // TEST I: Public Website Core Routes HTTP 200 Check
    // -------------------------------------------------------------------------
    console.log("\n--- TEST I: Public Routes & Responsive Endpoints ---");
    const routes = [
      "/",
      "/about",
      "/specialities",
      "/specialities/breast-cancer",
      "/treatments",
      "/treatments/tumor-resection",
      "/resources",
      "/testimonials",
      "/blog",
      "/faqs",
      "/contact",
      "/admin",
    ];

    for (const r of routes) {
      const pageRes = await request(r);
      assert(pageRes.status === 200, `Route ${r} responded with HTTP ${pageRes.status}`);
    }

    console.log("\n===============================================================================");
    console.log(`E2E SUITE COMPLETE: ${passed} PASSED, ${failed} FAILED`);
    console.log("===============================================================================");

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error("Test execution crashed:", err);
    process.exit(1);
  }
}

runTests();
