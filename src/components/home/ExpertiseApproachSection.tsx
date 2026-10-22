"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Target,
  HeartHandshake,
  CheckCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Treatment } from "@/lib/queries";

interface ExpertiseApproachSectionProps {
  treatments: Treatment[];
}

export default function ExpertiseApproachSection({
  treatments,
}: ExpertiseApproachSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const luxuryEase = [0.22, 1, 0.36, 1] as const;

  const activeTreatments = treatments.slice(0, 6);
  const [selectedSlug, setSelectedSlug] = useState<string>(
    activeTreatments[0]?.slug || "tumor-resection"
  );

  const selected =
    activeTreatments.find((t) => t.slug === selectedSlug) || activeTreatments[0];

  const fallbackTreatmentImages: Record<string, string> = {
    "tumor-resection": "/images/tumor-resection.jpg",
    "biopsy-cancer-diagnosis": "/images/Cancer-Diagnostic.jpg",
    "lymph-node-dissection": "/images/Lymp-node-disection.jpg",
    "minimally-invasive-surgery": "/images/Minimal-Invassive-Surgery.jpg",
    "reconstructive-surgery": "/images/Reconstructive-Surgery.jpg",
    "palliative-surgical-care": "/images/paliative-surgery-care1.jpg",
    "gynaecological-cancer-surgery": "/images/Gynaecological-cancer.jpg",
    "urological-cancer-surgery": "/images/Urological-Cancers.jpg",
  };

  const differentiators = [
    {
      icon: ShieldCheck,
      title: "Military Surgical Discipline",
      desc: "14 years of Armed Forces surgical leadership brings exceptional composure, sterile precision, and anatomical rigor to complex tumor resections.",
    },
    {
      icon: Target,
      title: "Organ-Preserving Margin Control",
      desc: "Fellowship training at Tata Memorial Centre (HBCHRC) ensures complete microscopic clearance (R0) while safeguarding vital nerves and healthy anatomy.",
    },
    {
      icon: HeartHandshake,
      title: "Empathetic, Transparent Guidance",
      desc: "Unrushed consultations where patients and families receive honest explanations, staging clarity, and compassionate answers at every stage.",
    },
  ];

  return (
    <section id="treatments-approach" className="py-16 lg:py-24 bg-[#142B3D] text-[#D5E4E9] border-b border-white/10 relative overflow-hidden dark-section">
      {/* Subtle ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 12% 18%, rgba(23, 102, 95, 0.28) 0%, transparent 45%),
            radial-gradient(circle at 88% 82%, rgba(23, 102, 95, 0.18) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with reveal */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: luxuryEase }}
          className="max-w-2xl mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#45DDC8] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8]" />
            Clinical Excellence &amp; Procedures
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFFF] tracking-tight">
            Advanced Surgical Expertise
          </h2>
          <p className="text-sm text-[#D5E4E9] mt-2 font-sans leading-relaxed">
            State-of-the-art oncology procedures combining military precision with specialized fellowship expertise for optimal margin clearance and organ preservation.
          </p>
        </motion.div>

        {/* SECTION 5 SPLIT-LAYOUT:
            SIDE 1: Clean, relevant medical visual with animated crossfade
            SIDE 2: Interactive treatment accordion list with height transitions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
          
          {/* SIDE 1: Relevant Medical Visual Display (5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="sticky top-28 bg-[#1A3449] rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
              {/* Visual Container with Crossfade */}
              <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden bg-[#142B3D]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.slug}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: luxuryEase }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={selected.image || fallbackTreatmentImages[selected.slug] || "/images/tumor-resection.jpg"}
                      alt={selected.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142B3D] via-[#142B3D]/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#142B3D]/90 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-[#45DDC8] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#45DDC8]" />
                  <span>Oncological Surgery</span>
                </div>
              </div>

              {/* Visual Caption Box */}
              <div className="p-5 sm:p-6 space-y-3 bg-[#1A3449]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.slug + "-details"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: luxuryEase }}
                    className="space-y-2.5"
                  >
                    <h3 className="font-serif text-xl font-bold text-[#FFFFFF]">
                      {selected.title}
                    </h3>
                    <p className="text-xs text-[#AEC8CF] font-medium">
                      {selected.subtitle}
                    </p>
                    <p className="text-xs text-[#D5E4E9] leading-relaxed">
                      {selected.excerpt || selected.description.slice(0, 160) + "..."}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        href={`/treatments/${selected.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#45DDC8] hover:text-[#FFFFFF] transition-colors group"
                      >
                        <span>View Full Clinical Protocol</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* SIDE 2: Interactive Treatment Accordion List (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            {activeTreatments.map((treatment, idx) => {
              const isOpen = treatment.slug === selectedSlug;

              return (
                <motion.div
                  key={treatment.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.45, delay: idx * 0.06, ease: luxuryEase }}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#1A3449] border-[#17665F]/80 shadow-lg"
                      : "bg-[#142B3D]/80 hover:bg-[#1A3449]/80 border-white/10"
                  }`}
                >
                  {/* Accordion Header / Toggle */}
                  <button
                    type="button"
                    onClick={() => setSelectedSlug(treatment.slug)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          isOpen
                            ? "bg-[#17665F] text-[#FFFFFF]"
                            : "bg-white/10 text-[#D5E4E9]"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <h4
                          className={`font-serif text-base sm:text-lg font-bold truncate transition-colors ${
                            isOpen ? "text-[#FFFFFF]" : "text-[#D5E4E9]"
                          }`}
                        >
                          {treatment.title}
                        </h4>
                        <p className="text-[11px] text-[#AEC8CF] truncate mt-0.5">
                          {treatment.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isOpen && (
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#17665F]/40 text-[#45DDC8] text-[10px] uppercase font-semibold tracking-wider border border-[#45DDC8]/30">
                          Active
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 text-[#AEC8CF] transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#45DDC8]" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Animated Accordion Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.35, ease: luxuryEase }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-white/10 space-y-3.5">
                          <p className="text-xs sm:text-sm text-[#D5E4E9] leading-relaxed font-sans">
                            {treatment.description}
                          </p>

                          {/* Quick Indications / Clinical Highlights */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div className="bg-[#142B3D] p-3 rounded-lg border border-white/10 space-y-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFFFFF] flex items-center gap-1.5">
                                <CheckCircle className="w-3 h-3 text-[#45DDC8]" />
                                Indications
                              </span>
                              <p className="text-[11px] text-[#D5E4E9] line-clamp-2">
                                {treatment.indications || "Precise surgical resection following multidimensional staging and tumor board planning."}
                              </p>
                            </div>

                            <div className="bg-[#142B3D] p-3 rounded-lg border border-white/10 space-y-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFFFFF] flex items-center gap-1.5">
                                <CheckCircle className="w-3 h-3 text-[#45DDC8]" />
                                Recovery
                              </span>
                              <p className="text-[11px] text-[#D5E4E9] line-clamp-2">
                                {treatment.recovery_info || "Enhanced Recovery (ERAS), tissue-sparing technique, and supportive post-op care."}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <Link
                              href={`/treatments/${treatment.slug}`}
                              className="text-xs font-semibold text-[#45DDC8] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5"
                            >
                              <span>Explore procedure in detail</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>

                            <Link
                              href="/treatments"
                              className="text-[11px] text-[#AEC8CF] hover:text-[#FFFFFF] transition-colors"
                            >
                              View all treatments &rarr;
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* 3 Core Clinical Differentiators (Clean Bottom Anchor) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: luxuryEase }}
                className="bg-[#1A3449]/70 hover:bg-[#1A3449] border border-white/15 hover:border-white/25 p-5 rounded-xl transition-all duration-300 space-y-2.5 group shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[#45DDC8] group-hover:scale-105 group-hover:bg-[#17665F] transition-all duration-300">
                  <Icon className="w-4 h-4 text-[#45DDC8] group-hover:text-[#FFFFFF]" />
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#FFFFFF] tracking-tight">
                  {diff.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#D5E4E9] leading-relaxed font-sans">
                  {diff.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
