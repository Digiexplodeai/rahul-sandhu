"use client";

import React, { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem, SectionEntrance, LUXURY_EASE } from "@/components/ui/motion";

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      q: "What is the difference between a General Surgeon and a Surgical Oncologist?",
      a: "A Surgical Oncologist is a specialized surgeon who has completed dedicated sub-specialty fellowship training exclusively in diagnosing, staging, and surgically treating complex benign and malignant tumors. They focus on microscopic margin clearance (R0 resection), systematic lymph node dissection, and multidisciplinary tumor board coordination with medical and radiation oncologists.",
    },
    {
      q: "Does surgery cause cancer to spread?",
      a: "No, this is an unfounded myth. Surgery does not cause cancer to spread. On the contrary, precise surgical resection is one of the most effective curative modalities for solid organ malignancies when diagnosed in operable stages. Surgical oncologists adhere to strict 'no-touch' isolation techniques and embryological anatomical dissection planes to eliminate the tumor safely.",
    },
    {
      q: "Where does Lt Col (Dr) Rahul Sandhu conduct consultations and surgeries?",
      a: "Dr. Rahul Sandhu conducts outpatient consultations and performs oncology surgeries primarily at Shalby Hospital, Mohali (Phase 9, Sector 63) and ClearMedi Healthcare, Kharar (NH-21). Prior appointment booking is recommended to avoid waiting.",
    },
    {
      q: "Can I seek a second opinion on my cancer surgery recommendation?",
      a: "Yes, absolutely. Seeking a second opinion is encouraged in oncological care. Dr. Rahul Sandhu routinely reviews outside pathology slides, cross-sectional imaging (CT/MRI/PET), and treatment plans to provide an independent, evidence-based assessment of surgical feasibility and organ-preservation options.",
    },
    {
      q: "What is Minimally Invasive / Laparoscopic Cancer Surgery?",
      a: "Minimally invasive cancer surgery utilizes 4K high-definition laparoscopes and miniature specialized instruments through tiny incisions (5–10 mm) rather than large abdominal cuts. It results in significantly less postoperative pain, reduced blood loss, shorter hospital stays (2–3 days), and faster recovery.",
    },
    {
      q: "What should I bring to my initial consultation?",
      a: "Please bring all existing diagnostic reports, including biopsy/histopathology slides and blocks, imaging CDs (CT, MRI, PET, Mammography, Ultrasound), recent blood work, previous discharge summaries, and a complete list of any current daily medications.",
    },
    {
      q: "Are cancer surgeries covered under health insurance and cashless empanelment?",
      a: "Yes, both Shalby Hospital Mohali and ClearMedi Healthcare Kharar have dedicated TPA and insurance desks supporting all major private health insurers, corporate TPAs, CGHS, and ECHS panels.",
    },
    {
      q: "How soon after surgery can I resume normal daily activities?",
      a: "Under modern Enhanced Recovery After Surgery (ERAS) protocols, patients are encouraged to ambulate and take light fluids within 12 to 24 hours. Full return to light sedentary work typically takes 1 to 2 weeks for keyhole procedures and 3 to 4 weeks for major open abdominal resections.",
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
              <span>Clear Answers &amp; Patient Guidance</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAFBF9]">
              Frequently Asked Questions
            </h1>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="text-sm sm:text-base text-[#D6DFE4]/85 mt-3 max-w-2xl font-sans leading-relaxed">
              Practical answers to common inquiries regarding cancer surgery, staging, preparation, and postoperative recovery.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-14 lg:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="space-y-3.5">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <FadeUp key={index} delay={index * 0.05}>
                <div
                  className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#17665F]/60 shadow-md ring-1 ring-[#17665F]/20"
                      : "border-[#E2E7E4] shadow-xs hover:border-[#17665F]/30"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className={`font-serif text-base sm:text-lg font-bold leading-snug transition-colors ${isOpen ? "text-[#17665F]" : "text-[#142B3D]"}`}>
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "bg-[#17665F] text-white rotate-180"
                          : "bg-[#EEF2F1] text-[#5C707A]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: LUXURY_EASE }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#283941]/90 leading-relaxed border-t border-[#E2E7E4]/70">
                          <p>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <FadeUp delay={0.3}>
          <div className="mt-12 p-6 sm:p-8 rounded-xl bg-white border border-[#E2E7E4] shadow-xs text-center space-y-3">
            <HelpCircle className="w-9 h-9 text-[#17665F] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#142B3D]">
              Have a Specific Medical Question?
            </h3>
            <p className="text-xs text-[#5C707A] max-w-md mx-auto">
              Every case is unique. Contact Dr. Rahul Sandhu&apos;s clinic team for individualized clinical guidance.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="bg-[#17665F] hover:bg-[#124F4A] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Contact Our Clinic
              </Link>
              <a
                href="tel:+919888970519"
                className="border border-[#142B3D]/30 hover:border-[#142B3D] text-[#142B3D] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
              >
                Call +91 98889 70519
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Consultation Banner */}
      <section className="py-12 bg-[#142B3D] text-[#FAFBF9] overflow-hidden">
        <SectionEntrance>
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#FAFBF9]">
                Schedule Your In-Person Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#D6DFE4]/80 mt-1">
                Clinics located at Shalby Hospital Mohali &amp; ClearMedi Healthcare Kharar.
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
