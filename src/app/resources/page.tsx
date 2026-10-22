import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem, SectionEntrance } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Patient Resources & Surgery Guide | Lt Col (Dr) Rahul Sandhu",
  description:
    "Essential resources for cancer surgery patients: preoperative instructions, hospital checklists, pathology guides, and post-surgery care instructions.",
};

export default function PatientResourcesPage() {
  const guides = [
    {
      title: "Pre-Operative Preparation Checklist",
      desc: "Step-by-step instructions on pre-anesthetic checkups (PAC), fasting schedules, medication adjustments, and mental preparation before surgery.",
      points: [
        "Complete PAC evaluations (CBC, PT/INR, Renal & Liver function, ECG)",
        "Fasting guidelines: strictly nothing by mouth 6 to 8 hours prior to scheduled anesthesia",
        "Clear instructions regarding blood thinners (Aspirin, Clopidogrel) per Dr. Sandhu's advice",
        "Bathe with antiseptic body wash the evening and morning before surgery",
      ],
    },
    {
      title: "Understanding Your Pathology & Biopsy Report",
      desc: "Demystifying surgical margin terms, lymph node staging, histological grades, and immunohistochemistry (ER/PR, HER2, Ki-67).",
      points: [
        "Margin status (R0 = negative margins, indicating complete macroscopic and microscopic clearance)",
        "Lymph node ratio (number of positive nodes examined vs. total resected nodes)",
        "Tumor differentiation (Grade 1 well-differentiated to Grade 3 poorly differentiated)",
        "Molecular biomarkers guiding targeted therapy and systemic treatment",
      ],
    },
    {
      title: "Enhanced Recovery After Surgery (ERAS)",
      desc: "Modern evidence-based protocol designed to minimize surgical stress and accelerate return to daily life.",
      points: [
        "Early mobilization: gentle sitting and walking within 12 to 24 hours of operation",
        "Early oral nutrition: sipping clear liquids as soon as bowel sounds and alertness return",
        "Multimodal pain control avoiding excessive sedative narcotics",
        "Deep breathing exercises and spirometry to keep lungs clear and oxygenated",
      ],
    },
    {
      title: "Post-Operative Wound & Surgical Drain Care",
      desc: "Clear guidelines on keeping surgical sites clean, measuring drain output, and recognizing signs that require medical attention.",
      points: [
        "Keep dressings clean, dry, and undisturbed until scheduled change",
        "Empty and record drain bulb volume in the morning and evening",
        "Avoid heavy lifting (over 5kg) for 4 to 6 weeks after major abdominal surgery",
        "Promptly notify clinic in case of high fever (>101°F), sudden redness, or foul drain fluid",
      ],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <TopBar />
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-[#142B3D] text-[#FAFBF9] py-12 lg:py-16 border-b border-white/10 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#EEF2F1] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8] animate-pulse"></span>
              <span>Empowering Patients &amp; Families</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAFBF9]">
              Patient Resources &amp; Guides
            </h1>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="text-sm sm:text-base text-[#D6DFE4]/85 mt-3 max-w-2xl font-sans leading-relaxed">
              Reliable clinical information to help you navigate hospital admission, surgery day, and recovery with clarity.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-14 lg:py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <StaggerContainer staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((g, idx) => (
            <StaggerItem key={idx}>
              <div
                className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] hover:border-[#17665F]/60 shadow-xs hover:shadow-[0_16px_32px_rgba(20,43,61,0.08)] -translate-y-0 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#EEF2F1] border border-[#E2E7E4] group-hover:border-[#17665F]/30 group-hover:bg-[#17665F] group-hover:text-white flex items-center justify-center text-[#17665F] mb-4 transition-colors duration-300">
                    <FileText className="w-5 h-5 transition-colors" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#142B3D] group-hover:text-[#17665F] transition-colors mb-1.5">
                    {g.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C707A] leading-relaxed mb-5">
                    {g.desc}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#E2E7E4]">
                    {g.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#283941]">
                        <CheckCircle2 className="w-4 h-4 text-[#17665F] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[#E2E7E4] flex items-center justify-between">
                  <span className="text-[11px] text-[#17665F] font-semibold uppercase tracking-wider">
                    Medically Verified
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#142B3D] hover:text-[#17665F] transition-colors group/link"
                  >
                    <span>Ask a Question</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Specific Questions Callout */}
        <FadeUp delay={0.25}>
          <div className="mt-12 p-6 sm:p-8 rounded-xl bg-white border border-[#E2E7E4] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#EEF2F1] flex items-center justify-center text-[#17665F] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#142B3D]">
                  Have Specific Questions Before Your Surgery?
                </h3>
                <p className="text-xs text-[#5C707A] mt-0.5">
                  Our care coordinators are available to walk you through preoperative instructions.
                </p>
              </div>
            </div>
            <a
              href="tel:+919888970519"
              className="bg-[#17665F] hover:bg-[#124F4A] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Call +91 98889 70519
            </a>
          </div>
        </FadeUp>
      </section>

      {/* Consultation Banner */}
      <section className="py-12 bg-[#142B3D] text-[#FAFBF9] overflow-hidden">
        <SectionEntrance>
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#FAFBF9]">
                Schedule Your Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#D6DFE4]/80 mt-1">
                Personalized evaluation with Lt Col (Dr) Rahul Sandhu in Mohali &amp; Kharar.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-[#17665F] hover:bg-[#124F4A] text-white px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#45DDC8]/30"
            >
              Book Appointment
            </Link>
          </div>
        </SectionEntrance>
      </section>


      <Footer />
    </main>
  );
}
