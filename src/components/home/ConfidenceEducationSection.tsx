"use client";

import React from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Testimonial, Blog } from "@/lib/queries";

interface ConfidenceEducationProps {
  testimonials: Testimonial[];
  blogs: Blog[];
}

export default function ConfidenceEducationSection({
  testimonials,
  blogs,
}: ConfidenceEducationProps) {
  const shouldReduceMotion = useReducedMotion();
  const luxuryEase = [0.22, 1, 0.36, 1] as const;

  // Use first approved featured testimonial
  const featuredReview = testimonials[0] || {
    author_name: "Tavleen Kaur",
    author_location: "Chandigarh",
    condition: "Oncology Care & Guidance",
    content:
      "From the very first meeting, Dr. Sandhu's positivity and compassion gave us hope. He explained every step of the treatment clearly, answered all our questions with patience, and made sure we never felt rushed. In moments of fear, he became a beacon of clarity.",
    source: "Verified Google Review",
  };

  const latestBlogs = blogs.slice(0, 2);

  return (
    <section className="py-16 lg:py-24 bg-[#FAFBF9] border-b border-[#E2E7E4] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: luxuryEase }}
          className="max-w-2xl mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#17665F] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17665F]" />
            Patient Voices &amp; Insights
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#142B3D] tracking-tight">
            Confidence &amp; Patient Education
          </h2>
          <p className="text-sm text-[#5C707A] mt-2 font-sans">
            Verified patient experiences alongside doctor-authored guides for complete peace of mind.
          </p>
        </motion.div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Genuine Patient Testimonial */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: luxuryEase }}
            className="lg:col-span-6 bg-white p-7 sm:p-8 rounded-2xl border border-[#E2E7E4] shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#17665F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-[#5C707A] uppercase tracking-wider">
                  {featuredReview.source || "Verified Review"}
                </span>
              </div>

              <p className="font-serif italic text-base sm:text-lg text-[#142B3D] leading-relaxed">
                &ldquo;{featuredReview.content}&rdquo;
              </p>

              <div className="pt-2 border-t border-[#E2E7E4]">
                <h4 className="font-serif font-bold text-sm text-[#142B3D]">
                  {featuredReview.author_name}
                </h4>
                <p className="text-xs text-[#5C707A]">
                  {featuredReview.author_location} — {featuredReview.condition}
                </p>
              </div>
            </div>

            <Link
              href="/testimonials"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#17665F] hover:text-[#124F4A] transition-colors group pt-2"
            >
              <span>Read All Verified Patient Reviews</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Right Column: Two Educational Article Previews with Stagger */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {latestBlogs.map((b, idx) => (
                <motion.div
                  key={b.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: luxuryEase }}
                >
                  <Link
                    href={`/blog/${b.slug}`}
                    className="group block bg-white p-6 rounded-2xl border border-[#E2E7E4] hover:border-[#17665F]/40 shadow-xs hover:shadow-md -translate-y-0 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#5C707A] mb-2 font-medium">
                      <span className="text-[#17665F] font-semibold uppercase tracking-wider">
                        {b.category}
                      </span>
                      <span>{b.read_time}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#142B3D] group-hover:text-[#17665F] transition-colors duration-200">
                      {b.title}
                    </h3>

                    <p className="text-xs text-[#5C707A] line-clamp-2 mt-1 leading-relaxed">
                      {b.excerpt}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#17665F] group-hover:text-[#124F4A]">
                      <span>Read Patient Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2 flex items-center justify-between"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#142B3D] hover:text-[#17665F] transition-colors group"
              >
                <span>Browse Full Clinical Knowledge Library</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
