"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Activity, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, LUXURY_EASE } from "@/components/ui/MotionReveal";
import type { Treatment } from "@/lib/queries";

interface TreatmentsSectionProps {
  treatments: Treatment[];
}

export default function TreatmentsSection({ treatments }: TreatmentsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(0);

  const activeTreatment = treatments[activeIndex] || treatments[0];

  // Specific high-res imagery for treatments
  const treatmentImages: Record<string, string> = {
    "tumor-resection": "/images/tumor-resection.jpg",
    "biopsy-cancer-diagnosis": "/images/Cancer-Diagnostic.jpg",
    "lymph-node-dissection": "/images/Lymp-node-disection.jpg",
    "minimally-invasive-surgery": "/images/Minimal-Invassive-Surgery.jpg",
    "reconstructive-surgery": "/images/Reconstructive-Surgery.jpg",
    "palliative-surgical-care": "/images/paliative-surgery-care1.jpg",
    "gynaecological-cancers": "/images/Gynaecological-cancer.jpg",
    "urological-cancers": "/images/Urological-Cancers.jpg",
  };

  return (
    <section id="treatments" className="py-20 lg:py-28 bg-white border-b border-[var(--color-border)] relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[var(--gold-500)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--navy-700)] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-500)]" />
              Surgical Capabilities
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-ink)] tracking-tight">
              Advanced Surgical Treatments & Procedures
            </h2>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-sm sm:text-base text-[var(--text-body)] mt-4 leading-relaxed font-sans">
              Every procedure is calibrated to optimize complete microscopic margin clearance while prioritizing functional preservation, organ salvage, and accelerated patient recovery.
            </p>
          </FadeUp>
        </div>

        {/* Desktop Interactive Showcase (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Category Tabs */}
          <div className="col-span-5 bg-white rounded-3xl p-3 border border-[var(--border-light)] shadow-sm flex flex-col justify-between space-y-1">
            {treatments.map((treatment, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={treatment.id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                    isActive
                      ? "bg-[var(--surface-alt)] text-[var(--text-ink)] shadow-sm border border-[var(--gold-500)]/30"
                      : "hover:bg-[var(--surface)] text-[var(--text-body)] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? "bg-[var(--gold-500)] scale-125" : "bg-[var(--border-light)] group-hover:bg-[var(--gold-500)]/60"
                      }`}
                    />
                    <span className={`text-sm tracking-wide ${isActive ? "font-bold text-[var(--text-ink)]" : "font-medium"}`}>
                      {treatment.title}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? "text-[var(--gold-500)] translate-x-1" : "text-[var(--text-muted)] group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Treatment Visual & Editorial Details */}
          <div className="col-span-7">
            <AnimatePresence mode="wait">
              {activeTreatment && (
                <motion.div
                  key={activeTreatment.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASE }}
                  className="bg-white rounded-3xl border border-[var(--border-light)] shadow-xl overflow-hidden h-full flex flex-col justify-between"
                >
                  {/* Hero Medical Imagery */}
                  <div className="relative h-72 w-full bg-[var(--surface-alt)] overflow-hidden">
                    <Image
                      src={
                        treatmentImages[activeTreatment.slug] ||
                        activeTreatment.image ||
                        "/images/tumor-resection.jpg"
                      }
                      alt={activeTreatment.title}
                      fill
                      sizes="600px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-900)]/80 via-[var(--navy-900)]/25 to-transparent" />

                    <div className="absolute top-5 left-5">
                      <span className="px-3.5 py-1.5 rounded-full bg-[var(--navy-900)]/95 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[var(--gold-500)] border border-[var(--gold-500)]/30 shadow-sm flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-[var(--gold-500)]" />
                        <span>Surgical Protocol</span>
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-6 right-6">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-ivory)] leading-tight">
                        {activeTreatment.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <p className="text-sm text-[var(--text-body)] leading-relaxed">
                        {activeTreatment.description || activeTreatment.excerpt}
                      </p>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                          <CheckCircle2 className="w-4 h-4 text-[var(--gold-500)] shrink-0" />
                          <span>Strict Oncologic Margins</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                          <CheckCircle2 className="w-4 h-4 text-[var(--gold-500)] shrink-0" />
                          <span>Pre-Op Staging Review</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                          <CheckCircle2 className="w-4 h-4 text-[var(--gold-500)] shrink-0" />
                          <span>Organ Salvage Focus</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[var(--text-body)]">
                          <CheckCircle2 className="w-4 h-4 text-[var(--gold-500)] shrink-0" />
                          <span>ERAS Protocol Recovery</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-6 border-t border-[var(--border-light)] flex items-center justify-between">
                      <Link
                        href={`/treatments/${activeTreatment.slug}`}
                        className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider group"
                      >
                        <span>Explore Procedure Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href="/treatments"
                        className="text-xs font-semibold text-[var(--navy-700)] hover:text-[var(--gold-700)] transition-colors uppercase tracking-wider"
                      >
                        All 8 Procedures →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Mobile Accordion (Visible on Mobile / Tablet) */}
        <div className="lg:hidden space-y-3">
          {treatments.map((treatment, idx) => {
            const isExpanded = mobileExpandedIndex === idx;
            const imgSrc =
              treatmentImages[treatment.slug] || treatment.image || "/images/tumor-resection.jpg";
            return (
              <div
                key={treatment.id}
                className="bg-white rounded-2xl border border-[var(--border-light)] overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setMobileExpandedIndex(isExpanded ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-serif font-bold text-base text-[var(--text-ink)]">
                    {treatment.title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--gold-500)] transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: LUXURY_EASE }}
                      className="overflow-hidden border-t border-[var(--border-light)]"
                    >
                      <div className="relative h-44 w-full bg-[var(--surface-alt)]">
                        <Image
                          src={imgSrc}
                          alt={treatment.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5 space-y-3">
                        <p className="text-xs text-[var(--text-body)] leading-relaxed">
                          {treatment.excerpt}
                        </p>
                        <Link
                          href={`/treatments/${treatment.slug}`}
                          className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                        >
                          <span>Read Full Procedure</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Clinical Note */}
        <div className="mt-12 text-center text-xs text-[var(--text-muted)] max-w-2xl mx-auto italic">
          Note: Surgical intervention is planned in consensus with institutional tumor boards, tailored to individual staging, histology, and clinical health.
        </div>

      </div>
    </section>
  );
}
