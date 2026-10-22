"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Specialty } from "@/lib/queries";

interface SpecialtiesSectionProps {
  specialties: Specialty[];
}

export default function SpecialtiesSection({ specialties }: SpecialtiesSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const luxuryEase = [0.22, 1, 0.36, 1] as const;

  // Curated clinical photography fallbacks
  const fallbackImages: Record<string, string> = {
    "breast-cancer": "/images/specialties/breast-cancer.jpg",
    "colorectal-cancer": "/images/specialties/colorectal-cancer.jpg",
    "head-neck-cancer": "/images/specialties/head-neck-cancer.jpg",
    "liver-pancreatic-tumors": "/images/specialties/liver-pancreatic-tumors.jpg",
    "stomach-cancer": "/images/specialties/stomach-cancer.jpg",
    "thyroid-parathyroid-tumors": "/images/specialties/thyroid-parathyroid-tumors.jpg",
  };

  // Distinct editorial layout: Row 1 = 2 Featured (Breast & Colorectal), Row 2 = 4 Compact Cards
  // Default to first 2 for featured and next 4 for secondary, respecting admin ordering
  const featuredSpecialties = specialties.slice(0, 2);
  const secondarySpecialties = specialties.slice(2, 6);

  return (
    <section
      id="specialities"
      aria-label="Cancer Specialities and Surgical Focus"
      className="relative py-20 lg:py-28 bg-[#F4F8F7] border-b border-[#D5E4DF] overflow-hidden"
    >
      {/* Background Ambient Depth: Soft radial teal wash behind header */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-[radial-gradient(ellipse_at_top,rgba(23,110,114,0.08)_0%,transparent_70%)] pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle_at_bottom_right,rgba(69,221,200,0.06)_0%,transparent_70%)] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* ========================================================================= */}
        {/* EDITORIAL SECTION HEADER                                                  */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: luxuryEase }}
            className="space-y-2.5 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#176E72]/10 border border-[#176E72]/20 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#176E72]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#176E72] animate-pulse" />
              <span>Surgical Expertise</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#102E3D] tracking-tight leading-[1.12]">
              Cancer Specialities
            </h2>
            
            <p className="text-base sm:text-[17px] text-[#3D5C63] leading-relaxed font-sans">
              Specialised surgical approaches across a comprehensive range of cancer conditions.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.15, ease: luxuryEase }}
            className="shrink-0"
          >
            <Link
              href="/specialities"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#102E3D] hover:text-[#176E72] transition-colors py-1 relative"
            >
              <span>View All Specialities</span>
              <ArrowRight className="w-4 h-4 text-[#176E72] transition-transform duration-300 group-hover:translate-x-1.5" />
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#176E72] transition-all duration-300 group-hover:w-full" />
            </Link>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 1: TWO LARGE FEATURED SPECIALITIES (Breast & Colorectal Cancer)        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {featuredSpecialties.map((spec, idx) => {
            const imgSrc = spec.image || fallbackImages[spec.slug] || "/images/specialties/breast-cancer.jpg";
            return (
              <motion.div
                key={spec.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.12,
                  ease: luxuryEase,
                }}
              >
                <Link
                  href={`/specialities/${spec.slug}`}
                  className="group relative block w-full h-[320px] sm:h-[350px] lg:h-[370px] rounded-3xl overflow-hidden shadow-md hover:shadow-[0_24px_50px_-15px_rgba(16,46,61,0.38)] -translate-y-0 hover:-translate-y-1.5 transition-all duration-500 ring-1 ring-black/5"
                >
                  {/* Background Medical Photography with Smooth Zoom */}
                  <Image
                    src={imgSrc}
                    alt={`${spec.title} - Surgical Oncology Speciality`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Cinematic Midnight Navy Gradient Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#102E3D] via-[#102E3D]/65 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  {/* Subtle Top-down Dark Vignette for contrast */}
                  <div
                    className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#102E3D]/40 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Subtle Inner Border for Depth */}
                  <div
                    className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-3xl pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Top Featured Pill Accent */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102E3D]/80 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-[0.16em] text-[#45DDC8]">
                      <Sparkles className="w-3 h-3 text-[#45DDC8]" />
                      <span>Priority Speciality</span>
                    </span>
                  </div>

                  {/* Bottom Text Content & Action */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 space-y-3">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-[#45DDC8] transition-colors duration-300">
                        {spec.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#DDF0EB]/90 line-clamp-2 mt-1.5 font-sans leading-relaxed max-w-lg">
                        {spec.subtitle || spec.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#45DDC8] group-hover:text-white transition-colors">
                      <span>Explore Speciality</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: FOUR COMPACT PREMIUM SPECIALITIES IN ONE ROW                       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondarySpecialties.map((spec, idx) => {
            const imgSrc = spec.image || fallbackImages[spec.slug] || "/images/specialties/head-neck-cancer.jpg";
            return (
              <motion.div
                key={spec.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.22 + idx * 0.08,
                  ease: luxuryEase,
                }}
              >
                <Link
                  href={`/specialities/${spec.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#D5E4DF] hover:border-[#176E72]/45 shadow-[0_2px_12px_rgba(16,46,61,0.04)] hover:shadow-[0_14px_30px_rgba(23,110,114,0.14)] -translate-y-0 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  {/* Clean Specialty Image Crop */}
                  <div className="relative h-44 sm:h-48 w-full bg-[#E6EFEA] overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={`${spec.title} - Surgical Care`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-600 ease-out group-hover:scale-106"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#102E3D]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Card Content & Text Hierarchy */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#102E3D] group-hover:text-[#176E72] transition-colors duration-200 leading-snug">
                        {spec.title}
                      </h3>
                      <p className="text-xs text-[#3D5C63] line-clamp-2 mt-1.5 leading-relaxed font-sans">
                        {spec.subtitle || spec.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E8F0EC] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#176E72] group-hover:text-[#102E3D] transition-colors">
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4 text-[#176E72] transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
