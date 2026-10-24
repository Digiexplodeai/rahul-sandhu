"use client";

import React, { useRef } from "react";
import { GraduationCap, Shield, Award, Stethoscope, Building2 } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FadeUp, LUXURY_EASE } from "@/components/ui/MotionReveal";

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 50%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const milestones = [
    {
      year: "2003 – 2009",
      icon: GraduationCap,
      title: "MBBS & Clinical Internship",
      institution: "Indira Gandhi Medical College & Hospital (IGMC), Shimla",
      description: "Rigorous undergraduate medical education, foundational clinical rotations, and intensive internship across surgery, trauma, and inpatient wards.",
    },
    {
      year: "2010 – 2024",
      icon: Shield,
      title: "Indian Armed Forces Surgical Service",
      institution: "Indian Army Medical Corps (Commissioned Officer — Lt Col)",
      description: "Served as Graded Surgical Specialist. Led the Dept of General Surgery & Emergency Trauma Care at Military Hospital Panagarh (Eastern Command). Commanded surgical care during frontline deployments including the Siachen Glacier and Indo-French Joint Exercise (2015).",
    },
    {
      year: "2018 – 2021",
      icon: Stethoscope,
      title: "MS General Surgery & National Board DNB",
      institution: "Armed Forces Medical College (AFMC), Pune & NBE New Delhi",
      description: "Comprehensive postgraduate surgical training with extensive exposure to major open oncological, GI, trauma, and endocrine operations.",
    },
    {
      year: "2022",
      icon: Award,
      title: "Minimal Access Surgery & Infection Control",
      institution: "IAGES, Medicity Gurgaon & NHCA Singapore",
      description: "Conferred FIAGES and Fellowship in Minimal Access Surgery (FMAS). Completed advanced international diplomas in Hospital Infection Control & Antimicrobial Stewardship.",
    },
    {
      year: "2024 – 2025",
      icon: Award,
      title: "Fellowship in Surgical Oncology",
      institution: "Homi Bhabha Cancer Hospital & Research Centre (HBCHRC, TMC Network)",
      description: "Specialized fellowship under the prestigious Tata Memorial Centre network in Punjab, mastering advanced organ-preserving resections in breast, GI, and head & neck cancers.",
    },
    {
      year: "2024 – Present",
      icon: Building2,
      title: "Senior Consultant — Surgical Oncology",
      institution: "Shalby Hospital, Mohali",
      description: "Active clinical and surgical oncology practice offering personalized cancer surgery, multidisciplinary tumor board coordination, and comprehensive patient care.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[var(--surface)] border-b border-[var(--border-light)] relative overflow-hidden">
      
      {/* Ambient background blur */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[var(--gold-500)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--navy-700)] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-500)]" />
              Verified Milestones
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-ink)] tracking-tight">
              A Career Defined by Service, Precision & Healing
            </h2>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-sm sm:text-base text-[var(--text-body)] mt-4 leading-relaxed font-sans">
              From military trauma leadership in Siachen to specialized Tata Memorial Centre cancer fellowships, every chapter has refined an uncompromising surgical discipline.
            </p>
          </FadeUp>
        </div>

        {/* Animated Vertical Timeline Container */}
        <div ref={containerRef} className="relative ml-4 sm:ml-36">
          
          {/* Base Neutral Track Line */}
          <div className="absolute left-0 sm:left-0 top-0 bottom-0 w-[2px] bg-[var(--border-light)]" />

          {/* Animated Gold Fill Line that fills as user scrolls */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-0 sm:left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--gold-500)] via-[var(--gold-600)] to-[var(--gold-700)]"
          />

          {/* Milestones */}
          <div className="space-y-12 sm:space-y-14">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: LUXURY_EASE }}
                  className="relative pl-8 sm:pl-12 group"
                >
                  {/* Left Year Marker (Desktop) */}
                  <div className="hidden sm:block absolute -left-36 top-1 text-right w-28">
                    <span className="font-serif text-base font-bold text-[var(--navy-700)]">
                      {item.year}
                    </span>
                  </div>

                  {/* Timeline Bullet Node with Gold Border and Pulse on Active */}
                  <div className="absolute -left-[15px] top-0.5 w-8 h-8 rounded-full bg-white border-2 border-[var(--gold-500)] flex items-center justify-center text-[var(--gold-600)] shadow-md group-hover:bg-[var(--gold-500)] group-hover:text-[var(--navy-900)] transition-colors duration-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  {/* Editorial Card */}
                  <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[var(--border-light)] shadow-sm group-hover:border-[var(--gold-500)]/60 group-hover:shadow-md transition-all duration-300">
                    <div className="sm:hidden text-xs font-bold uppercase tracking-wider text-[var(--navy-700)] mb-1">
                      {item.year}
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-ink)]">
                      {item.title}
                    </h3>

                    <h4 className="text-xs font-semibold text-[var(--navy-700)] uppercase tracking-wider mt-1 mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-500)]" />
                      <span>{item.institution}</span>
                    </h4>

                    <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
