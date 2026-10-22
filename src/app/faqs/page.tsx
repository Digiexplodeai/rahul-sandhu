import React from "react";
import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeUp } from "@/components/ui/motion";
import FaqAccordionClient from "@/components/faqs/FaqAccordionClient";
import { getFaqs, getSiteSettings } from "@/lib/queries";



export const metadata: Metadata = {
  title: "Frequently Asked Questions | Lt Col (Dr) Rahul Sandhu",
  description:
    "Clear answers to common questions about cancer surgery, staging, preparation, and postoperative recovery by Surgical Oncologist Dr. Rahul Sandhu.",
};

export default function FaqsPage() {
  const faqs = getFaqs();
  const settings = getSiteSettings();

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <TopBar
        location={settings.topbar_location}
        phone={settings.topbar_phone}
        hours={settings.topbar_hours}
      />
      <Navbar logoUrl={settings.site_logo} />

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
        <FaqAccordionClient faqs={faqs} />
      </section>

      <Footer />
    </main>
  );
}
