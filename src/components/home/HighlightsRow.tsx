"use client";

import React from "react";
import { Clock, Award, Shield, Users } from "lucide-react";
import { StaggerContainer, StaggerItem, AnimatedCounter } from "@/components/ui/MotionReveal";

export default function HighlightsRow() {
  const highlights = [
    {
      icon: Clock,
      statNumber: 15,
      statSuffix: "+ Years",
      title: "Surgical Experience",
      desc: "Comprehensive expertise in complex tumor resections and high-stakes emergency trauma care.",
    },
    {
      icon: Award,
      statNumber: 5000,
      statSuffix: "+ Cases",
      title: "Operations Handled",
      desc: "Extensive operative volume spanning abdominal, breast, head & neck, and thoracic oncology.",
    },
    {
      icon: Shield,
      statText: "Armed Forces",
      title: "Former Military Specialist",
      desc: "Graded Surgical Specialist in the Armed Forces, including high-altitude Siachen deployment.",
    },
    {
      icon: Users,
      statText: "Tata Memorial",
      title: "Fellowship Network",
      desc: "Rigorous surgical oncology fellowship training at HBCHRC (Tata Memorial Centre network).",
    },
  ];

  return (
    <section id="experience-highlights" className="bg-[var(--surface)] py-14 lg:py-16 border-b border-[var(--border-light)] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={index}>
                <div className="group p-7 rounded-2xl bg-white border border-[var(--border-light)] hover:border-[var(--gold-500)] transition-all duration-400 hover:shadow-[0_12px_32px_rgba(203,168,92,0.15)] flex flex-col justify-between h-full relative overflow-hidden">
                  
                  {/* Subtle Top Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold-500)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[var(--gold-muted)] border border-[var(--gold-500)]/30 flex items-center justify-center text-[var(--gold-600)] mb-5 group-hover:bg-[var(--gold-500)] group-hover:text-[var(--navy-900)] transition-colors duration-400">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-ink)] mb-1.5 flex items-baseline gap-1">
                      {item.statNumber !== undefined ? (
                        <AnimatedCounter
                          value={item.statNumber}
                          suffix={item.statSuffix}
                          duration={1600}
                        />
                      ) : (
                        <span>{item.statText}</span>
                      )}
                    </div>

                    <h3 className="text-xs font-semibold text-[var(--navy-700)] uppercase tracking-wider mb-2.5">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[var(--text-body)] leading-relaxed pt-3 border-t border-[var(--border-light)]">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
