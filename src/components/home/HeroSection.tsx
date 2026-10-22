"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Stethoscope } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface HeroSectionProps {
  eyebrow?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subheading?: string;
  heroImage?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
}

const DEFAULT_HERO_IMAGE = "/images/reassuring-oncology-clinic-care.png";
const DEFAULT_HERO_WEBP = "/images/reassuring-oncology-clinic-care.webp";

export default function HeroSection({
  eyebrow = "SURGICAL ONCOLOGY • PATIENT-CENTRED CARE",
  headlineLine1 = "Precision Cancer Surgery.",
  headlineLine2 = "Compassionate Care.",
  subheading = "Advanced surgical oncology care focused on personalized treatment, clinical expertise, and compassionate patient guidance.",
  heroImage = DEFAULT_HERO_IMAGE,
  ctaPrimaryLabel = "BOOK A CONSULTATION",
  ctaPrimaryLink = "",
  ctaSecondaryLabel = "MEET DR. RAHUL SANDHU",
  ctaSecondaryLink = "/about",
}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const [failedImg, setFailedImg] = React.useState<string | null>(null);
  const imgSrc = failedImg === heroImage ? DEFAULT_HERO_IMAGE : (heroImage || DEFAULT_HERO_IMAGE);

  const openAppointmentModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-appointment-modal"));
    }
  };

  // Coordinated luxury easing
  const luxuryEase = [0.22, 1, 0.36, 1] as const;

  // Determine if using custom admin image or default reassuring care asset
  const isDefaultAsset =
    !imgSrc ||
    imgSrc.includes("reassuring-oncology-clinic-care") ||
    imgSrc.includes("dr-rahul-sandhu-new-hero") ||
    imgSrc.includes("dr-rahul-sandhu-hero");

  const webpSrc = isDefaultAsset ? DEFAULT_HERO_WEBP : null;

  const handleImageError = () => {
    if (heroImage && failedImg !== heroImage) {
      setFailedImg(heroImage);
    }
  };

  return (
    <section
      id="hero"
      aria-label="Welcome to Dr. Rahul Sandhu Surgical Oncology"
      className="relative w-full overflow-hidden bg-[#102D3D] border-b border-white/10 isolate"
    >
      
      {/* ═════════════════════════════════════════════════════════════
          DESKTOP & LAPTOP CINEMATIC FULL-WIDTH HERO (lg and up)
          - Single continuous full-width section
          - Natural scale right-anchored image: preserves doctor's
            headroom, full head, hair, shoulders, patient & teal waves
          - Organic left-to-right gradient blend (no hard vertical lines)
          - Left-aligned text container (~42% width) with WCAG AAA legibility
          ═════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative w-full min-h-[clamp(600px,76vh,750px)] bg-[#102D3D] overflow-hidden isolate">
        
        {/* Layer 1: Right-Anchored Natural Proportion Image with Soft Left Feather Mask */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, ease: luxuryEase }}
          className="absolute top-0 right-0 h-full w-auto max-w-none pointer-events-none select-none z-0"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 1.5%, rgba(0, 0, 0, 0.35) 6%, rgba(0, 0, 0, 0.85) 12%, black 20%, black 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, transparent 1.5%, rgba(0, 0, 0, 0.35) 6%, rgba(0, 0, 0, 0.85) 12%, black 20%, black 100%)",
          }}
        >
          <picture className="h-full w-auto max-w-none block">
            {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
            <img
              src={imgSrc}
              onError={handleImageError}
              alt="Lt Col (Dr) Rahul Sandhu - Surgical Oncology clinical care consultation with patient"
              className="h-full w-auto max-w-none object-contain object-right block"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </motion.div>

        {/* Layer 2: Seamless Continuous Horizontal Gradient Blend (No Hard Edges) */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `
              linear-gradient(
                90deg,
                #102D3D 0%,
                #102D3D 33%,
                rgba(16, 45, 61, 0.98) 42%,
                rgba(16, 45, 61, 0.84) 52%,
                rgba(16, 45, 61, 0.50) 65%,
                rgba(16, 45, 61, 0.15) 78%,
                rgba(16, 45, 61, 0.02) 88%,
                transparent 100%
              ),
              linear-gradient(
                to bottom,
                rgba(16, 45, 61, 0.35) 0%,
                transparent 16%,
                transparent 84%,
                rgba(16, 45, 61, 0.45) 100%
              )
            `,
          }}
          aria-hidden="true"
        />

        {/* Layer 3: Foreground Content (Overlaid on left text-safe zone) */}
        <div className="relative z-10 w-full max-w-[1360px] mx-auto min-h-[clamp(600px,76vh,750px)] px-6 lg:px-10 xl:px-14 flex items-center">
          <div className="w-full max-w-[490px] xl:max-w-[530px] space-y-5 py-10 lg:py-14">
            
            {/* Eyebrow Label */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: luxuryEase }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#17665F]/45 border border-[#45DDC8]/35 backdrop-blur-md text-[#EEF2F1] text-[11px] font-semibold uppercase tracking-[0.18em] shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8] animate-pulse" />
              <span>{eyebrow}</span>
            </motion.div>

            {/* Headline Line-by-Line Reveal */}
            <h1 className="font-serif text-4xl lg:text-[44px] xl:text-[50px] font-bold text-[#FAFBF9] tracking-tight leading-[1.16]">
              <motion.span
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12, ease: luxuryEase }}
                className="block text-white drop-shadow-[0_2px_12px_rgba(16,42,59,0.85)]"
              >
                {headlineLine1}
              </motion.span>
              <motion.span
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: luxuryEase }}
                className="block text-[#45DDC8] mt-1 drop-shadow-[0_2px_14px_rgba(23,102,95,0.7)]"
              >
                {headlineLine2}
              </motion.span>
            </h1>

            {/* Supporting Description */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: luxuryEase }}
              className="text-base xl:text-[17px] text-[#FAFBF9]/92 leading-relaxed font-sans max-w-[480px] drop-shadow-[0_1px_4px_rgba(16,42,59,0.7)]"
            >
              {subheading}
            </motion.p>

            {/* CTA Buttons (Desktop: 1 row) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: luxuryEase }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary Consultation Button */}
              {ctaPrimaryLink && ctaPrimaryLink !== "#book-consultation" ? (
                <Link
                  href={ctaPrimaryLink}
                  id="hero-book-consultation-btn"
                  className="group relative bg-[#17665F] hover:bg-[#124F4A] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(23,102,95,0.4)] hover:shadow-[0_8px_28px_rgba(23,102,95,0.55)] flex items-center gap-2.5 cursor-pointer overflow-hidden border border-[#45DDC8]/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45DDC8]"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/15 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <Calendar className="relative z-10 w-4 h-4 text-[#EEF2F1] group-hover:scale-110 transition-transform duration-200" />
                  <span className="relative z-10">{ctaPrimaryLabel || "BOOK A CONSULTATION"}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={openAppointmentModal}
                  id="hero-book-consultation-btn"
                  className="group relative bg-[#17665F] hover:bg-[#124F4A] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(23,102,95,0.4)] hover:shadow-[0_8px_28px_rgba(23,102,95,0.55)] flex items-center gap-2.5 cursor-pointer overflow-hidden border border-[#45DDC8]/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45DDC8]"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/15 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <Calendar className="relative z-10 w-4 h-4 text-[#EEF2F1] group-hover:scale-110 transition-transform duration-200" />
                  <span className="relative z-10">{ctaPrimaryLabel || "BOOK A CONSULTATION"}</span>
                </button>
              )}

              {/* Secondary Doctor Profile Button */}
              <Link
                href={ctaSecondaryLink || "/about"}
                className="group inline-flex items-center gap-2 border border-white/35 hover:border-white bg-[#102A3B]/60 hover:bg-[#102A3B]/90 backdrop-blur-md text-[#FAFBF9] px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{ctaSecondaryLabel || "MEET DR. RAHUL SANDHU"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>

            {/* Professional Credentials & Practice Locations Line */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42, ease: luxuryEase }}
              className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#D6DFE4]/90"
            >
              <div className="flex items-center gap-2">
                <Stethoscope className="w-3.5 h-3.5 text-[#45DDC8]" />
                <span className="font-semibold text-white">Lt Col (Dr) Rahul Sandhu</span>
                <span className="text-[#D6DFE4]/70">• Senior Consultant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8]" />
                <span>Shalby Mohali &amp; ClearMedi Kharar</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          MOBILE & TABLET SEAMLESS ART-DIRECTED HERO (< lg)
          Order of composition (Single continuous section):
          1. Doctor-patient photograph across the top (h-[260px] to h-[310px])
             anchored at natural scale: full head visible, comfortable
             headroom, natural shoulders/coat, no oversized face.
          2. Smooth organic navy gradient transition feathering the bottom
             of the photo into the continuous navy background.
          3. Headline, description, and vertically stacked full-width CTAs
             positioned cleanly beneath the photo focal area with zero overlap.
          ═════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative w-full bg-[#102A3B] flex flex-col">
        
        {/* Step 1: Top Image Region (Art-directed framing, natural doctor proportions, full head & headroom) */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          className="relative w-full h-[280px] sm:h-[360px] md:h-[400px] overflow-hidden select-none"
        >
          <picture className="w-full h-full block">
            {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
            <img
              src={imgSrc}
              onError={handleImageError}
              alt="Lt Col (Dr) Rahul Sandhu - Surgical Oncology clinical care consultation with patient"
              className="w-full h-full object-cover object-[78%_top] sm:object-[78%_top] block"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          {/* Top Subtle Feather */}
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#102A3B]/40 to-transparent pointer-events-none" />

          {/* Step 2: Smooth Navy Gradient Transition from bottom of photo into navy background */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-[#102A3B] via-[#102A3B]/80 to-transparent pointer-events-none" />
        </motion.div>

        {/* Step 3: Seamless Content Flow Below the Photo Focal Area */}
        <div className="relative z-10 px-5 sm:px-8 -mt-6 sm:-mt-8 pb-9 sm:pb-12 space-y-5 text-[#FAFBF9]">
          
          {/* Eyebrow Label */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: luxuryEase }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17665F]/45 border border-[#45DDC8]/35 backdrop-blur-md text-[#EEF2F1] text-[10px] font-semibold uppercase tracking-[0.16em] shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8] animate-pulse" />
            <span>{eyebrow}</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.18]">
            <span className="block drop-shadow-[0_2px_10px_rgba(16,42,59,0.85)]">{headlineLine1}</span>
            <span className="block text-[#45DDC8] mt-0.5 drop-shadow-[0_2px_12px_rgba(23,102,95,0.7)]">{headlineLine2}</span>
          </h1>

          {/* Doctor Title Line */}
          <div className="flex items-center gap-2 text-xs text-[#D6DFE4]/95 font-medium">
            <Stethoscope className="w-3.5 h-3.5 text-[#45DDC8] shrink-0" />
            <span>Lt Col (Dr) Rahul Sandhu • Senior Surgical Oncologist</span>
          </div>

          {/* Supporting Description */}
          <p className="text-sm sm:text-base text-[#D6DFE4]/90 leading-relaxed font-sans">
            {subheading}
          </p>

          {/* Mobile CTA Buttons: Vertically Stacked Full-Width Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            {ctaPrimaryLink && ctaPrimaryLink !== "#book-consultation" ? (
              <Link
                href={ctaPrimaryLink}
                className="w-full sm:w-auto bg-[#17665F] hover:bg-[#124F4A] text-white px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 border border-[#45DDC8]/35"
              >
                <Calendar className="w-4 h-4 text-[#EEF2F1]" />
                <span>{ctaPrimaryLabel || "BOOK A CONSULTATION"}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={openAppointmentModal}
                className="w-full sm:w-auto bg-[#17665F] hover:bg-[#124F4A] text-white px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 border border-[#45DDC8]/35"
              >
                <Calendar className="w-4 h-4 text-[#EEF2F1]" />
                <span>{ctaPrimaryLabel || "BOOK A CONSULTATION"}</span>
              </button>
            )}

            <Link
              href={ctaSecondaryLink || "/about"}
              className="w-full sm:w-auto border border-white/25 hover:border-white bg-[#102A3B]/60 text-white px-5 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 text-center active:scale-98"
            >
              <span>{ctaSecondaryLabel || "MEET DR. RAHUL SANDHU"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Practice Affiliations */}
          <div className="pt-3 border-t border-white/15 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#D6DFE4]/85">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8]" />
              <span>Shalby Hospital, Mohali</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8]" />
              <span>ClearMedi Healthcare, Kharar</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
