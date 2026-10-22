"use client";

import React from "react";
import { Award, ShieldCheck, Stethoscope, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function CredentialsStrip() {
  const shouldReduceMotion = useReducedMotion();

  const credentials = [
    {
      icon: Clock,
      label: "15+ Years Clinical Experience",
      subtext: "Expertise in Complex Cancer Surgery",
    },
    {
      icon: Award,
      label: "Fellowship in Surgical Oncology",
      subtext: "Advanced Training. Global Standards.",
    },
    {
      icon: ShieldCheck,
      label: "Comprehensive Cancer Care",
      subtext: "Evidence-Based. Patient-Centred.",
    },
    {
      icon: Stethoscope,
      label: "Minimal Access & Advanced Techniques",
      subtext: "Better Outcomes. Faster Recovery.",
    },
  ];

  const luxuryEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="bg-white border-y border-[#E2E8F0] py-5 sm:py-6 font-sans overflow-hidden shadow-2xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#E2E8F0]">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + idx * 0.08,
                  ease: luxuryEase,
                }}
                className={`flex items-center gap-3.5 ${
                  idx > 0 ? "pt-3 sm:pt-0 lg:pl-6 xl:pl-8" : "lg:pr-4"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#F0F7FB] border border-[#CBD5E1]/70 flex items-center justify-center text-[#0369A1] shrink-0 shadow-2xs hover:bg-[#0369A1] hover:text-white hover:scale-105 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xs sm:text-[13.5px] text-[#0B2538] leading-tight">
                    {cred.label}
                  </span>
                  <span className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                    {cred.subtext}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
