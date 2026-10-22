"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Star, ArrowRight, Quote, CheckCircle, ChevronLeft, ChevronRight, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, LUXURY_EASE } from "@/components/ui/MotionReveal";
import type { Testimonial } from "@/lib/queries";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Subtle auto-advance every 7 seconds when not paused
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, total]);

  const activeReview = testimonials[currentIndex] || testimonials[0];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="py-20 lg:py-28 bg-white border-b border-[var(--color-border)] relative overflow-hidden"
    >
      {/* Decorative ambient shape */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[var(--gold-500)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--navy-700)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-500)]" />
                Patient Voices & Google Reviews
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-ink)] tracking-tight">
                Kind Words from Those We Have Cared For
              </h2>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="flex items-center gap-2 mt-2 text-xs text-[var(--text-muted)]">
                <div className="flex text-[var(--gold-500)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span>5.0 Rating • Verified Google Reviews</span>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.3}>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--navy-700)] hover:text-[var(--gold-700)] transition-colors group self-start md:self-auto"
            >
              <span>View All Verified Reviews</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>
        </div>

        {/* Accessible Animated Carousel */}
        <div className="relative max-w-4xl mx-auto">
          
          <div className="min-h-[320px] sm:min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              {activeReview && (
                <motion.div
                  key={activeReview.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: LUXURY_EASE }}
                  className="w-full bg-white p-8 sm:p-12 rounded-3xl border border-[var(--border-light)] shadow-xl relative"
                >
                  <Quote className="w-12 h-12 text-[var(--surface-alt)] absolute top-8 right-8 pointer-events-none" />

                  {/* Stars */}
                  <div className="flex text-[var(--gold-500)] mb-5">
                    {[...Array(activeReview.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="font-serif italic text-base sm:text-xl text-[var(--text-ink)] leading-relaxed mb-8">
                    “{activeReview.content}”
                  </p>

                  {/* Reviewer Details */}
                  <div className="pt-6 border-t border-[var(--border-light)] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[var(--text-ink)]">
                        {activeReview.author_name}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)]">
                        {activeReview.author_location}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[var(--navy-700)] bg-[var(--surface)] px-3 py-1.5 rounded-full border border-[var(--border-light)] font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--gold-500)]" />
                      <span>Verified Patient Review</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Carousel Controls (Previous, Next & Dots) */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? "w-8 bg-[var(--gold-500)]" : "w-2 bg-[var(--border-light)] hover:bg-[var(--gold-500)]/50"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                aria-label="Previous Testimonial"
                className="w-11 h-11 rounded-full border border-[var(--border-light)] bg-white hover:border-[var(--gold-500)] hover:text-[var(--gold-700)] transition-colors flex items-center justify-center text-[var(--text-ink)] cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Testimonial"
                className="w-11 h-11 rounded-full border border-[var(--border-light)] bg-white hover:border-[var(--gold-500)] hover:text-[var(--gold-700)] transition-colors flex items-center justify-center text-[var(--text-ink)] cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Real Patient Video & Guidance Consultation Callout */}
        <FadeUp delay={0.3} className="mt-16 p-8 sm:p-10 rounded-3xl bg-white border border-[var(--border-light)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[var(--gold-muted)] border border-[var(--gold-500)]/40 flex items-center justify-center text-[var(--gold-600)] shrink-0">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-ink)]">
                Patient Recovery Discussions & Cancer Education
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-body)] mt-1 max-w-xl">
                Explore authentic case discussions, post-operative drain care guides, and expert video explanations on recovering safely from complex cancer surgery.
              </p>
            </div>
          </div>

          <Link
            href="/resources"
            className="btn-outline-gold inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0"
          >
            <span>Explore Patient Care Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </FadeUp>

      </div>
    </section>
  );
}
