"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Users, ArrowRight, HeartHandshake, Compass } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";

export default function DarkBrandSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      tag: "MILITARY DISCIPLINE",
      title: "Former Indian Armed Forces Specialist",
      desc: "Commissioned officer and Graded Surgical Specialist in the Army Medical Corps. Trained under high-stakes frontline environments, including the Siachen Glacier and emergency trauma command.",
    },
    {
      icon: Award,
      tag: "ONCOLOGIC MASTERY",
      title: "Tata Memorial Centre Fellowship",
      desc: "Advanced surgical oncology fellowship at Homi Bhabha Cancer Hospital and Research Centre (HBCHRC, TMC), specializing in precise margin resection and complex cancer cases.",
    },
    {
      icon: Users,
      tag: "HOLISTIC CONSENSUS",
      title: "Multidisciplinary Tumor Board Planning",
      desc: "Every surgical procedure is coordinated with medical oncologists, radiation therapists, and histopathologists to ensure clear, evidence-based, stage-appropriate care.",
    },
  ];

  return (
    <section className="bg-[var(--navy-900)] text-[var(--text-ivory)] py-24 lg:py-32 relative overflow-hidden border-y border-[var(--gold-500)]/20">
      
      {/* Background Ambience & Fine Architectural Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(203,168,92,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-[var(--gold-500)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[var(--navy-700)]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Gold Accent Lines in Background */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-500)] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gold-muted)] border border-[var(--gold-500)]/30 text-[var(--gold-500)] text-xs font-semibold uppercase tracking-[0.22em] mb-4">
              <Compass className="w-3.5 h-3.5 text-[var(--gold-500)]" />
              <span>Ethos & Surgical Philosophy</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-ivory)] tracking-tight leading-[1.12]">
              Expertise Forged Through Service. Dedicated to Cancer Care.
            </h2>
          </FadeUp>

          {/* Subtly Animated Gold Divider */}
          <FadeUp delay={0.3}>
            <div className="w-24 h-[2px] bg-gradient-to-r from-[var(--gold-500)] to-transparent my-6" />
          </FadeUp>

          <FadeUp delay={0.35}>
            <p className="text-base sm:text-lg text-[var(--text-slate)] leading-relaxed font-sans">
              Decisions in cancer surgery require unwavering composure, absolute anatomical precision, and a patient-first conscience. Years of military medical leadership have forged a disciplined approach where every detail matters.
            </p>
          </FadeUp>
        </div>

        {/* 3 Pillars Bento / Editorial Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={index}>
                <div className="bg-[var(--navy-800)]/90 backdrop-blur-sm p-8 rounded-3xl border border-[var(--gold-500)]/15 hover:border-[var(--gold-500)]/50 transition-all duration-400 group h-full flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(14,27,51,0.6)]">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-13 h-13 rounded-2xl bg-[var(--navy-700)] border border-[var(--gold-500)]/30 flex items-center justify-center text-[var(--gold-500)] group-hover:bg-[var(--gold-500)] group-hover:text-[var(--navy-900)] transition-colors duration-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--gold-500)] bg-[var(--navy-900)] px-3 py-1 rounded-full border border-[var(--hairline)]">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[var(--text-ivory)] mb-3 group-hover:text-white transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-slate)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[var(--navy-700)] flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold-500)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-500)]" />
                    <span>Verified Armed Forces & TMC Credentials</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom Editorial Callout */}
        <FadeUp delay={0.4} className="mt-16 pt-10 border-t border-[var(--navy-700)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[var(--gold-500)]/40 bg-[var(--navy-800)] flex items-center justify-center text-[var(--gold-500)] shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold text-[var(--text-ivory)]">
                Second Opinions & Clinical Consultations
              </p>
              <p className="text-xs text-[var(--text-slate)]">
                Offering clear staging reviews and surgical options for patients across India and overseas.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 group"
          >
            <span>Consult Dr. Rahul Sandhu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeUp>

      </div>
    </section>
  );
}
