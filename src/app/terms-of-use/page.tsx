import React from "react";
import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | Lt Col (Dr) Rahul Sandhu",
  description: "Terms of use and medical disclaimers for the website of Lt Col (Dr) Rahul Sandhu.",
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <TopBar />
      <Navbar />

      <section className="bg-[#142B3D] text-[#FAFBF9] py-12 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAFBF9]">Terms of Use</h1>
          <p className="text-xs text-[#D6DFE4]/80 mt-1">Last updated: October 2026</p>
        </div>
      </section>

      <section className="py-14 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E2E7E4] shadow-xs space-y-5 text-sm text-[#283941] leading-relaxed">
          <h2 className="font-serif text-lg font-bold text-[#142B3D]">1. Informational &amp; Educational Scope Only</h2>
          <p>
            The content provided on this website—including articles, treatment descriptions, cancer condition overviews, and FAQs—is designed exclusively for patient education and informational purposes. It does not replace, supersede, or substitute for formal, in-person clinical diagnosis, medical advice, or personalized surgical treatment planning.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#142B3D]">2. No Doctor-Patient Relationship Established</h2>
          <p>
            Transmitting an online enquiry, contacting via WhatsApp, or reading website articles does not establish a formal doctor-patient relationship with Lt Col (Dr) Rahul Sandhu until an official clinical consultation (in-person or teleconsultation) takes place and medical history is formally documented.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#142B3D]">3. Medical Emergencies</h2>
          <p>
            If you or a loved one are experiencing acute symptoms, breathing distress, sudden severe bleeding, or a life-threatening medical emergency, please report immediately to the nearest hospital emergency department or call local emergency medical services.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
