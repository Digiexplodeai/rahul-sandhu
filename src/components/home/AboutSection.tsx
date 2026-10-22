"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Stethoscope,
  Users,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface AboutSectionProps {
  doctorPhoto?: string;
  eyebrow?: string;
  title?: string;
  designation?: string;
  bio?: string;
}

export default function AboutSection({
  doctorPhoto = "/images/dr-sandhu-consultation-clean.png",
  eyebrow = "SURGICAL ONCOLOGIST",
  title = "Lt Col (Dr) Rahul Sandhu",
  designation = "CANCER SURGERY | SURGICAL ONCOLOGY | COMPREHENSIVE CANCER CARE",
  bio,
}: AboutSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const luxuryEase = [0.22, 1, 0.36, 1] as const;

  const editorialBio =
    bio ||
    "Lt Col (Dr) Rahul Sandhu is an experienced Surgical Oncologist dedicated to providing advanced, evidence-based cancer care. With a strong focus on precision surgery, comprehensive treatment and patient well-being, he helps patients and their families navigate the cancer journey with confidence and support.";

  // Four premium expertise cards matching the approved visual design reference
  const expertiseCards = [
    {
      id: "specialised-surgery",
      title: "Specialised Cancer Surgery",
      subtitle: "Surgery tailored for cancer patients",
      icon: (
        // Custom refined scalpel line icon matching the exact reference icon
        <svg
          className="w-5 h-5 text-[#155E75] group-hover:text-white transition-colors duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m19 5-3-3L3.5 14.5a2.121 2.121 0 0 0 3 3L19 5Z" />
          <path d="m14 8 2 2" />
          <path d="M7 21h10" />
        </svg>
      ),
    },
    {
      id: "patient-centred",
      title: "Patient-Centred Approach",
      subtitle: "Compassionate care at every step",
      icon: (
        <Users className="w-5 h-5 text-[#155E75] group-hover:text-white transition-colors duration-300" />
      ),
    },
    {
      id: "advanced-options",
      title: "Advanced Treatment Options",
      subtitle: "Latest techniques for better outcomes",
      icon: (
        <Sparkles className="w-5 h-5 text-[#155E75] group-hover:text-white transition-colors duration-300" />
      ),
    },
    {
      id: "comprehensive-care",
      title: "Comprehensive Care",
      subtitle: "Support for patients and families",
      icon: (
        <ShieldCheck className="w-5 h-5 text-[#155E75] group-hover:text-white transition-colors duration-300" />
      ),
    },
  ];

  const handleOpenConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-appointment-modal"));
    }
  };

  return (
    <section
      id="about-doctor"
      aria-label="About Lt Col (Dr) Rahul Sandhu - Surgical Oncologist"
      className="relative overflow-hidden bg-gradient-to-br from-[#FAFBF9] via-[#F3F8FA] to-[#EAF3F7] border-b border-[#E2E8F0] py-14 sm:py-18 lg:py-22 font-sans select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          Ambient Medical Gradient Waves & Curves
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft cyan/blue radial ambient lights */}
        <div className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full bg-[#E0F2FE]/50 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[650px] h-[650px] rounded-full bg-[#DDF1FA]/60 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-[450px] h-[450px] rounded-full bg-[#F0F9FF]/70 blur-3xl" />

        {/* Delicate curved line flourish in background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          viewBox="0 0 1440 900"
          fill="none"
        >
          <path
            d="M-100,200 C300,320 600,100 1100,250 C1350,320 1500,200 1600,150"
            stroke="url(#ambient-curve-grad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M-50,650 C400,550 800,750 1200,600 C1400,520 1550,680 1650,620"
            stroke="url(#ambient-curve-grad-2)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="ambient-curve-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#0F766E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#B98E3A" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="ambient-curve-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C59B4E" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#0284C7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0F766E" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTAINER: Wide Editorial Composition (Desktop ~1440-1920)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center">
          
          {/* ═════════════════════════════════════════════════════════
              LEFT AREA: EDITORIAL MEDICAL INFORMATION & CARDS
              (lg:col-span-7)
              ═════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-7 z-20">
            
            {/* 1. EYEBROW BADGE */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: luxuryEase }}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#E0F2FE]/80 border border-[#BAE6FD] text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#0369A1] shadow-2xs backdrop-blur-xs"
            >
              <svg
                className="w-3.5 h-3.5 text-[#0284C7]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              <span>{eyebrow}</span>
            </motion.div>

            {/* DOCTOR NAME */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.08, ease: luxuryEase }}
              className="overflow-hidden"
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-bold text-[#0B2538] tracking-tight leading-[1.12]">
                {title}
              </h2>
            </motion.div>

            {/* PROFESSIONAL SPECIALIZATION DESCRIPTOR */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.16, ease: luxuryEase }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#B98E3A]"
            >
              <span>CANCER SURGERY</span>
              <span className="text-[#C59B4E]/50 font-normal">|</span>
              <span>SURGICAL ONCOLOGY</span>
              <span className="text-[#C59B4E]/50 font-normal">|</span>
              <span>COMPREHENSIVE CANCER CARE</span>
            </motion.div>

            {/* SHORT EDITORIAL BIOGRAPHY */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.22, ease: luxuryEase }}
              className="text-sm sm:text-[15.5px] text-[#334155] leading-relaxed font-sans max-w-2xl font-normal"
            >
              {editorialBio}
            </motion.p>

            {/* DUAL CTA BUTTONS */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.3, ease: luxuryEase }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              {/* Primary Consultation Button */}
              <button
                type="button"
                onClick={handleOpenConsultation}
                id="about-consultation-primary-cta"
                className="group inline-flex items-center gap-3 bg-[#0D2738] hover:bg-[#153D57] text-white px-6 sm:px-7 py-3.5 rounded-xl text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_18px_rgba(13,39,56,0.25)] hover:shadow-[0_8px_26px_rgba(21,61,87,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer border border-[#176184]/40"
              >
                <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-white/90 group-hover:text-white transition-colors">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>BOOK A CONSULTATION</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary Doctor Profile Button */}
              <Link
                href="/about"
                id="about-explore-profile-cta"
                className="group inline-flex items-center gap-2.5 bg-white hover:bg-[#F0F7FB] text-[#0D2738] hover:text-[#0369A1] px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-[13px] font-bold tracking-normal transition-all duration-300 border border-[#CBD5E1] shadow-2xs hover:shadow-xs hover:border-[#93C5FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              >
                <span className="w-7 h-7 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center text-[#0369A1] group-hover:bg-[#0369A1] group-hover:text-white group-hover:scale-105 transition-all">
                  <Stethoscope className="w-3.5 h-3.5" />
                </span>
                <span>Explore Doctor Profile</span>
              </Link>
            </motion.div>

            {/* FOUR EXPERTISE CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 pt-3">
              {expertiseCards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.38 + idx * 0.08,
                    ease: luxuryEase,
                  }}
                  className="p-4 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#E2E8F0] shadow-[0_2px_12px_rgba(11,37,56,0.04)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.12)] hover:-translate-y-1 hover:border-[#93C5FD] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Soft Blue Circular Icon Container */}
                    <div className="w-11 h-11 rounded-full bg-[#E0F2FE] border border-[#BAE6FD]/60 flex items-center justify-center text-[#0369A1] mb-3 group-hover:bg-[#0369A1] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-2xs">
                      {card.icon}
                    </div>

                    {/* Card Title */}
                    <h3 className="font-sans font-bold text-[13px] sm:text-[13.5px] text-[#0B2538] leading-snug group-hover:text-[#0369A1] transition-colors mb-1">
                      {card.title}
                    </h3>

                    {/* Card Subtitle */}
                    <p className="text-[11px] sm:text-[11.5px] text-[#64748B] leading-relaxed">
                      {card.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FLOATING BADGE: 15+ Years Helping Patients Win Stronger */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.72, ease: luxuryEase }}
              className="self-start inline-flex items-center gap-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_18px_rgba(11,37,56,0.06)] hover:shadow-[0_8px_24px_rgba(11,37,56,0.12)] transition-shadow duration-300 mt-1 select-none"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#E0F2FE] shadow-2xs shrink-0 bg-[#E0F2FE]">
                <Image
                  src="/images/dr-sandhu-badge-avatar.png"
                  alt="Lt Col (Dr) Rahul Sandhu Portrait"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-sm text-[#0B2538] leading-tight">
                  15+ Years
                </span>
                <span className="text-[11px] font-medium text-[#64748B] leading-tight mt-0.5">
                  Helping Patients Win Stronger
                </span>
              </div>
            </motion.div>

          </div>

          {/* ═════════════════════════════════════════════════════════
              RIGHT AREA: CLEAN FULL DOCTOR CONSULTATION SCENE
              (lg:col-span-5)
              - Doctor Consultation Photograph (Head & Hands fully visible, NO cropping)
              - Modern Clinic Setting with Patient
              - Integrated Navy Curved Surgical Element & Quote at Bottom-Right
              - ABSOLUTELY NO HANDWRITTEN TEXT OVER FACE OR IMAGE
              ═════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* DOCTOR PHOTOGRAPH CONTAINER: Proper natural 4:5 vertical proportions, zero cropping */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 24, scale: 0.98 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, ease: luxuryEase }}
              className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[540px] xl:max-w-[560px] mx-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(11,37,56,0.16)] border border-white/80 group bg-[#102E3D]"
            >
              {/* Doctor Consultation Photographic Stage: 4:5 vertical aspect ratio matching natural photo */}
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={doctorPhoto || "/images/dr-sandhu-consultation-clean.png"}
                  alt="Lt Col (Dr) Rahul Sandhu consulting with a patient in oncology clinic"
                  fill
                  priority={false}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover object-[center_top] transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                />

                {/* Subtle vignette for depth & luxury integration */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Luxury inner bezel ring */}
              <div
                className="absolute inset-0 ring-1 ring-inset ring-white/40 rounded-3xl pointer-events-none"
                aria-hidden="true"
              />
            </motion.div>

          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM DECORATIVE MEDICAL WAVE DIVIDER
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-8 sm:h-12 lg:h-14 text-[#FAFBF9]"
          viewBox="0 0 1440 60"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,24 C320,54 720,2 1120,38 C1280,50 1380,26 1440,30 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
