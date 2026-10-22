import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Scissors } from "lucide-react";
import { getTreatments } from "@/lib/queries";
import { FadeUp, StaggerContainer, StaggerItem, SectionEntrance } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Advanced Surgical Treatments | Lt Col (Dr) Rahul Sandhu",
  description:
    "Explore advanced surgical oncology procedures including Tumor Resection, Biopsy, Lymph Node Dissection, Minimally Invasive Laparoscopic Surgery, Reconstructive and Palliative Cancer Surgery.",
};

export default function TreatmentsPage() {
  const treatments = getTreatments();

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
              <span>State-of-the-Art Surgical Oncology</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAFBF9]">
              Surgical Treatments
            </h1>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="text-sm sm:text-base text-[#D6DFE4]/85 mt-3 max-w-2xl font-sans leading-relaxed">
              Precision oncological procedures designed for maximal tumor clearance, organ preservation, and enhanced postoperative recovery.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Treatments List */}
      <section className="py-14 lg:py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <StaggerContainer staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t) => (
            <StaggerItem key={t.id}>
              <div
                className="rounded-xl overflow-hidden flex flex-col group bg-white border border-[#E2E7E4] hover:border-[#17665F]/60 shadow-xs hover:shadow-[0_16px_32px_rgba(20,43,61,0.1)] -translate-y-0 hover:-translate-y-1.5 transition-all duration-300 h-full justify-between"
              >
                <div className="relative h-48 sm:h-52 w-full bg-[#EEF2F1] overflow-hidden">
                  <Image
                    src={t.image || "/images/tumor-resection.jpg"}
                    alt={t.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142B3D]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#17665F]">
                      {t.subtitle}
                    </span>
                    <h2 className="font-serif text-xl font-bold text-[#142B3D] group-hover:text-[#17665F] transition-colors duration-200 mt-1">
                      {t.title}
                    </h2>
                    <p className="text-xs text-[#5C707A] line-clamp-3 leading-relaxed mt-2">
                      {t.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E7E4] flex items-center justify-between">
                    <Link
                      href={`/treatments/${t.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#142B3D] hover:text-[#17665F] transition-colors group/link"
                    >
                      <span>Read Full Procedure</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform duration-200" />
                    </Link>

                    <Scissors className="w-4 h-4 text-[#17665F]" />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Consultation Banner */}
      <section className="py-12 bg-[#142B3D] text-[#FAFBF9] overflow-hidden">
        <SectionEntrance>
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#FAFBF9]">
                Considering Surgery or Need a Second Opinion?
              </h3>
              <p className="text-xs sm:text-sm text-[#D6DFE4]/80 mt-1">
                Discuss your biopsy reports and surgical plan directly with Lt Col (Dr) Rahul Sandhu.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-[#17665F] hover:bg-[#124F4A] text-white px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#45DDC8]/30"
            >
              Book Consultation
            </Link>
          </div>
        </SectionEntrance>
      </section>


      <Footer />
    </main>
  );
}
