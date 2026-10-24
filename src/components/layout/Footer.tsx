"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const luxuryEase = [0.22, 1, 0.36, 1] as const;

  return (
    <footer className="bg-[#142B3D] text-[#D6DFE4] pt-14 pb-10 border-t border-white/10 font-sans overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Identity & Credentials */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: luxuryEase }}
            className="space-y-3.5"
          >
            <Link
              href="/"
              className="brand-logo-link transition-transform duration-200 hover:opacity-95"
              aria-label="Dr. Rahul Sandhu — Surgical Oncology"
            >
              <Image
                src="/images/dr-rahul-sandhu-official-logo.png"
                alt="Dr. Rahul Sandhu — Surgical Oncology"
                width={250}
                height={84}
                style={{ width: "auto" }}
                className="w-[200px] sm:w-[230px] md:w-[250px] max-h-[84px] h-auto object-contain"
              />
            </Link>

            <p className="text-xs text-[#D6DFE4]/80 leading-relaxed">
              Senior Consultant in Surgical Oncology with over 15 years of surgical excellence in military trauma and oncology care. Former Indian Armed Forces Surgical Specialist &amp; Fellowship trained at HBCHRC (Tata Memorial Centre network).
            </p>

            <div className="pt-1 text-[11px] text-[#D6DFE4]/70 space-y-1">
              <p>• MS (AFMC Pune), DNB, FIAGES</p>
              <p>• Fellowship in Surgical Oncology (HBCHRC, TMC)</p>
            </div>
          </motion.div>

          {/* Column 2: Cancer Specialities */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: luxuryEase }}
          >
            <h4 className="font-serif text-sm font-bold text-[#FAFBF9] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17665F]"></span>
              Cancer Specialities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/specialities/breast-cancer" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Breast Cancer Surgery
                </Link>
              </li>
              <li>
                <Link href="/specialities/colorectal-cancer" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Colorectal &amp; Rectal Resection
                </Link>
              </li>
              <li>
                <Link href="/specialities/head-neck-cancer" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Head &amp; Neck Cancer Surgery
                </Link>
              </li>
              <li>
                <Link href="/specialities/liver-pancreatic-tumors" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Liver &amp; Pancreatic Tumors
                </Link>
              </li>
              <li>
                <Link href="/specialities/stomach-cancer" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Stomach &amp; Gastric Oncology
                </Link>
              </li>
              <li>
                <Link href="/specialities/thyroid-parathyroid-tumors" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Thyroid &amp; Parathyroid Tumors
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Quick Navigation */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.16, ease: luxuryEase }}
          >
            <h4 className="font-serif text-sm font-bold text-[#FAFBF9] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17665F]"></span>
              Patient Care &amp; Info
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  About Dr. Rahul Sandhu
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Surgical Treatments
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Patient Reviews &amp; Stories
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Patient Resources &amp; Prep
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#D6DFE4]/80 hover:text-white transition-colors">
                  Health Blog &amp; Insights
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Practice Locations & Contact */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.24, ease: luxuryEase }}
            className="space-y-3"
          >
            <h4 className="font-serif text-sm font-bold text-[#FAFBF9] uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17665F]"></span>
              Practice Locations
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-[#FAFBF9]">Shalby Hospital, Mohali</p>
                <p className="text-[11px] text-[#D6DFE4]/70 mt-0.5">Phase 9, Sector 63, SAS Nagar</p>
                <p className="text-[11px] text-[#EEF2F1] mt-1 font-medium">Mon – Sat: 9:00 AM – 5:00 PM</p>
              </div>
            </div>

            <div className="pt-2 space-y-1.5 text-xs">
              <a
                href="tel:+919888970519"
                className="flex items-center gap-2 text-[#FAFBF9] hover:text-[#EEF2F1] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#17665F]" />
                <span className="font-semibold">+91 98889 70519</span>
              </a>
              <a
                href="mailto:drsand.rahul@gmail.com"
                className="flex items-center gap-2 text-[#D6DFE4]/80 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#17665F]" />
                <span>drsand.rahul@gmail.com</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Medical Disclaimer */}
        <div className="py-5 text-[11px] text-[#D6DFE4]/60 border-b border-white/10 leading-relaxed">
          <p>
            <strong className="text-[#FAFBF9]">Medical Disclaimer:</strong> The information provided on this website is intended solely for educational awareness and does not replace in-person medical evaluation, diagnosis, or clinical consultation. Always consult Lt Col (Dr) Rahul Sandhu or a certified oncologist regarding individualized medical conditions, clinical staging, or treatment recommendations.
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#D6DFE4]/60">
          <div>
            © 2026 Lt Col (Dr) Rahul Sandhu. All Rights Reserved.
          </div>

          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/admin" className="text-[#D6DFE4]/70 hover:text-white transition-colors font-medium">
              Admin Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
