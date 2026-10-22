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

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <DoctorSchema />

      {/* Simplified Top Contact Strip */}
      <TopBar
        location={settings.topbar_location}
        phone={settings.topbar_phone}
        hours={settings.topbar_hours}
      />

      {/* Redesigned Quiet Luxury Navigation with Official Logo */}
      <Navbar logoUrl={settings.site_logo} />

      {/* SECTION 1 — Full-Width Cinematic Landscape Hero Banner */}
      <HeroSection
        eyebrow="SURGICAL ONCOLOGY • PATIENT-CENTRED CARE"
        headlineLine1="Precision Cancer Surgery."
        headlineLine2="Compassionate Care."
        subheading="Advanced surgical oncology care focused on personalized treatment, clinical expertise, and compassionate patient guidance."
        heroImage={settings.hero_doctor_image || "/images/reassuring-oncology-clinic-care.png"}
      />

      {/* SECTION 2 — Slim Trust & Credentials Bar */}
      <CredentialsStrip />

      {/* SECTION 3 — Meet Dr. Rahul Sandhu (Concise Bio & Direct About Link) */}
      <AboutSection
        doctorPhoto={settings.about_doctor_photo}
        eyebrow={settings.about_eyebrow}
        title={settings.about_title}
        designation={settings.about_subtitle}
      />

      {/* SECTION 4 — Cancer Specialities (6 Priority Specialities in Consistent Grid) */}
      <SpecialtiesSection specialties={specialties} />

      {/* SECTION 5 — Surgical Expertise & Treatment Approach (Single High-Impact Navy Section) */}
      <ExpertiseApproachSection treatments={treatments} />

      {/* SECTION 6 — Patient Confidence & Education (1 Verified Testimonial + 2 Articles) */}
      <ConfidenceEducationSection
        testimonials={testimonials}
        blogs={blogs}
      />

      {/* SECTION 7 — Consultation & Practice Locations (Shalby & ClearMedi + Appointment Form) */}
      <ClinicContactSection />

      {/* Compact Premium Footer */}
      <Footer />
    </main>
  );
}
