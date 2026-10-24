import React from "react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CredentialsStrip from "@/components/home/CredentialsStrip";
import AboutSection from "@/components/home/AboutSection";
import SpecialtiesSection from "@/components/home/SpecialtiesSection";
import ExpertiseApproachSection from "@/components/home/ExpertiseApproachSection";
import ConfidenceEducationSection from "@/components/home/ConfidenceEducationSection";
import ClinicContactSection from "@/components/home/ClinicContactSection";
import DoctorSchema from "@/components/seo/DoctorSchema";
import {
  getSiteSettings,
  getSpecialties,
  getTreatments,
  getBlogs,
  getTestimonials,
} from "@/lib/queries";



export default async function HomePage() {
  const settings = getSiteSettings();
  const specialties = getSpecialties();
  const treatments = getTreatments();
  const blogs = getBlogs();
  const testimonials = getTestimonials();

  // Dynamic Section Visibility
  let visibility: Record<string, boolean> = {
    topbar: true,
    hero: true,
    highlights: true,
    about: true,
    specialties: true,
    treatments: true,
    testimonials: true,
    blogs: true,
    contact: true,
    footer: true,
  };
  try {
    if (settings.section_visibility) {
      visibility = { ...visibility, ...JSON.parse(settings.section_visibility) };
    }
  } catch {}

  // Parse hero headline lines dynamically
  let h1 = "Precision Cancer Surgery.";
  let h2 = "Compassionate Care.";
  if (settings.hero_headline) {
    if (settings.hero_headline.includes(".")) {
      const parts = settings.hero_headline.split(".");
      h1 = parts[0].trim() + ".";
      h2 = parts.slice(1).join(".").trim() || h2;
    } else {
      h1 = settings.hero_headline;
      h2 = settings.hero_subtag || "";
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <DoctorSchema />

      {/* Top Contact Strip */}
      {visibility.topbar !== false && (
        <TopBar
          location={settings.topbar_location}
          phone={settings.topbar_phone}
          hours={settings.topbar_hours}
        />
      )}

      {/* Quiet Luxury Navigation with Official Logo */}
      <Navbar logoUrl={settings.site_logo} />

      {/* SECTION 1 — Full-Width Cinematic Landscape Hero Banner */}
      {visibility.hero !== false && (
        <HeroSection
          eyebrow={settings.hero_eyebrow || "SURGICAL ONCOLOGY • PATIENT-CENTRED CARE"}
          headlineLine1={h1}
          headlineLine2={h2}
          subheading={settings.hero_subheading || "Advanced surgical oncology care focused on personalized treatment, clinical expertise, and compassionate patient guidance."}
          heroImage={settings.hero_doctor_image || "/images/reassuring-oncology-clinic-care.png"}
          ctaPrimaryLabel={settings.hero_cta_primary_label || "BOOK A CONSULTATION"}
          ctaPrimaryLink={settings.hero_cta_primary_link || ""}
          ctaSecondaryLabel={settings.hero_cta_secondary_label || "MEET DR. RAHUL SANDHU"}
          ctaSecondaryLink={settings.hero_cta_secondary_link || "/about"}
        />
      )}

      {/* SECTION 2 — Slim Trust & Credentials Bar */}
      {visibility.highlights !== false && <CredentialsStrip />}

      {/* SECTION 3 — Meet Dr. Rahul Sandhu (Concise Bio & Direct About Link) */}
      {visibility.about !== false && (
        <AboutSection
          doctorPhoto={settings.about_doctor_photo}
          eyebrow={settings.about_eyebrow || "MEET YOUR SURGICAL ONCOLOGIST"}
          title={settings.about_title || "Lt Col (Dr) Rahul Sandhu"}
          designation={settings.about_subtitle || "Senior Consultant — Surgical Oncology | Former Indian Armed Forces Specialist"}
          bio={settings.about_bio_p1}
        />
      )}

      {/* SECTION 4 — Cancer Specialities (6 Priority Specialities in Consistent Grid) */}
      {visibility.specialties !== false && (
        <SpecialtiesSection specialties={specialties} />
      )}

      {/* SECTION 5 — Surgical Expertise & Treatment Approach (Single High-Impact Navy Section) */}
      {visibility.treatments !== false && (
        <ExpertiseApproachSection treatments={treatments} />
      )}

      {/* SECTION 6 — Patient Confidence & Education (Verified Testimonial + Educational Articles) */}
      {visibility.testimonials !== false && (
        <ConfidenceEducationSection
          testimonials={testimonials}
          blogs={blogs}
        />
      )}

      {/* SECTION 7 — Consultation & Practice Locations (Shalby Hospital + Appointment Form) */}
      {visibility.contact !== false && (
        <ClinicContactSection settings={settings} />
      )}

      {/* Compact Premium Footer */}
      {visibility.footer !== false && <Footer />}
    </main>
  );
}
