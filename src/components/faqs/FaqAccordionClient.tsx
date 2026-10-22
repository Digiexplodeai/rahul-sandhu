"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";
import type { FAQ } from "@/lib/queries";

interface FaqAccordionClientProps {
  faqs: FAQ[];
}

export default function FaqAccordionClient({ faqs }: FaqAccordionClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3.5">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <FadeUp key={faq.id} delay={index * 0.04}>
            <div
              className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-[#17665F]/60 shadow-md ring-1 ring-[#17665F]/20"
                  : "border-[#E2E7E4] shadow-xs hover:border-[#17665F]/30"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <span className={`font-serif text-base sm:text-lg font-bold leading-snug transition-colors ${isOpen ? "text-[#17665F]" : "text-[#142B3D]"}`}>
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? "bg-[#17665F] text-white rotate-180"
                      : "bg-[#EEF2F1] text-[#142B3D] hover:bg-[#17665F]/10"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#283941] leading-relaxed border-t border-[#E2E7E4]/50 pt-3.5">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        );
      })}
    </div>
  );
}
