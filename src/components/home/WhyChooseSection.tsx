"use client";

import React from "react";
import { Award, ShieldCheck, HeartHandshake, FileCheck, CheckCircle2 } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/MotionReveal";

export default function WhyChooseSection() {
  const points = [
    {
      number: "01",
      icon: Award,
      title: "Extensive Surgical Experience",
      subtitle: "15+ Years in High-Stakes Operating Rooms",
      desc: "Proven track record managing intricate oncological resections and critical emergency surgical trauma across military hospitals and top civilian centers.",
      highlight: "Over 5,000 surgical procedures performed",
    },
    {
      number: "02",
      icon: ShieldCheck,
      title: "Specialized Oncology Fellowship",
      subtitle: "Tata Memorial Centre Network Trained",
      desc: "Formal fellowship in surgical oncology at Homi Bhabha Cancer Hospital & Research Centre (HBCHRC, TMC), complemented by minimal access surgery credentials (FMAS, FIAGES).",
      highlight: "Subspecialty precision margin clearance",
    },
    {
      number: "03",
      icon: FileCheck,
      title: "Personalized Treatment Planning",
      subtitle: "Tumor Board Consensus & Organ Preservation",
      desc: "Every cancer case is individually staged and planned with a multidisciplinary tumor board, choosing operative approaches that maximize cure while preserving quality of life.",
      highlight: "Tailored to tumor biology & staging",
    },
    {
      number: "04",
      icon: HeartHandshake,
      title: "Compassionate Communication",
      subtitle: "Unrushed Patient & Family Counseling",
      desc: "A calm, empathetic listener who takes the time to explain biopsy reports, surgical risks, recovery timelines, and answers every question without medical jargon.",
      highlight: "Direct physician accessibility",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[var(--surface)] border-b border-[var(--border-light)] relative overflow-hidden">
      
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[var(--gold-500)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--navy-700)] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-500)]" />
              The Standard of Care
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-ink)] tracking-tight">
              Why Patients Trust Dr. Rahul Sandhu
            </h2>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-sm sm:text-base text-[var(--text-body)] mt-4 leading-relaxed font-sans">
              Combining the discipline and composure of an Armed Forces surgeon with modern fellowship training from India’s premier cancer institute.
            </p>
          </FadeUp>
        </div>

        {/* Varied Editorial Layout (Asymmetric 2x2 Bento Cards) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            const isFeatured = idx === 0 || idx === 3;
            return (
              <StaggerItem key={idx}>
                <div
                  className={`p-8 sm:p-10 rounded-3xl border transition-all duration-400 group h-full flex flex-col justify-between relative overflow-hidden ${
                    isFeatured
                      ? "bg-white border-[var(--gold-500)]/30 shadow-md hover:shadow-xl hover:border-[var(--gold-500)]"
                      : "bg-[var(--surface-alt)]/80 border-[var(--border-light)] hover:bg-white hover:border-[var(--gold-500)]/50 hover:shadow-lg"
                  }`}
                >
                  {/* Subtle Background Number */}
                  <span className="absolute -top-3 -right-2 font-serif text-7xl sm:text-8xl font-bold text-[var(--surface-alt)] pointer-events-none select-none">
                    {pt.number}
                  </span>

                  <div>
                    {/* Top Row: Icon + Number label */}
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-[var(--gold-muted)] border border-[var(--gold-500)]/30 flex items-center justify-center text-[var(--gold-600)] group-hover:bg-[var(--gold-500)] group-hover:text-[var(--navy-900)] transition-colors duration-400 shadow-sm">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs uppercase tracking-widest font-bold text-[var(--navy-700)] bg-white/80 px-3 py-1 rounded-full border border-[var(--border-light)]">
                        Pillar {pt.number}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-2xl font-bold text-[var(--text-ink)] mb-1 group-hover:text-[var(--gold-700)] transition-colors leading-snug">
                      {pt.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider font-semibold text-[var(--navy-700)] mb-4">
                      {pt.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>

                  {/* Bottom Highlight */}
                  <div className="mt-8 pt-4 border-t border-[var(--border-light)] flex items-center gap-2 text-xs font-semibold text-[var(--navy-700)] relative z-10">
                    <CheckCircle2 className="w-4 h-4 text-[var(--gold-500)]" />
                    <span>{pt.highlight}</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
