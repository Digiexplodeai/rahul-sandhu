"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { FadeUp } from "@/components/ui/MotionReveal";
import type { Blog } from "@/lib/queries";

interface HealthInsightsSectionProps {
  blogs: Blog[];
}

export default function HealthInsightsSection({ blogs }: HealthInsightsSectionProps) {
  const featured = blogs[0];
  const secondary = blogs.slice(1, 3);

  return (
    <section id="blogs" className="py-20 lg:py-28 bg-[var(--surface)] border-b border-[var(--border-light)] relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--gold-500)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--navy-700)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-500)]" />
                Evidence-Based Guidance
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-ink)] tracking-tight">
                Cancer Insights & Patient Education
              </h2>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p className="text-sm sm:text-base text-[var(--text-body)] mt-3 max-w-2xl font-sans">
                Clear, medically reviewed explanations about tumor staging, surgical prep, and recovering with confidence.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.3}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--navy-700)] hover:text-[var(--gold-700)] transition-colors group self-start md:self-auto"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </FadeUp>
        </div>

        {/* Modern Magazine Layout: 1 Featured Large Card + 2 Adjacent Stacked Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Featured Article (Left 7 Cols) */}
          {featured && (
            <div className="lg:col-span-7">
              <FadeUp delay={0.2} className="h-full">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block card-luxury rounded-3xl overflow-hidden h-full flex flex-col justify-between"
                >
                  {/* Large Featured Image with Zoom */}
                  <div className="relative h-64 sm:h-80 w-full bg-[var(--surface-alt)] overflow-hidden">
                    <Image
                      src={featured.cover_image || "/images/surgery-300x225.png"}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-900)]/70 via-transparent to-transparent" />

                    <div className="absolute top-5 left-5">
                      <span className="px-3.5 py-1.5 rounded-full bg-[var(--navy-900)]/90 backdrop-blur-md text-[var(--gold-500)] border border-[var(--gold-500)]/30 text-[11px] font-bold uppercase tracking-wider shadow-md">
                        {featured.category || "Clinical Guide"}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[var(--gold-500)]" />
                          <span>{featured.published_date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[var(--gold-500)]" />
                          <span>{featured.read_time || "5 min read"}</span>
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-ink)] group-hover:text-[var(--gold-700)] transition-colors leading-snug">
                        {featured.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--text-body)] line-clamp-3 mt-3 leading-relaxed">
                        {featured.excerpt}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-[var(--border-light)] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--navy-700)] group-hover:text-[var(--gold-700)]">
                      <span className="flex items-center gap-2">
                        <span>Read Full Clinical Insight</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-normal normal-case">
                        By Lt Col (Dr) Rahul Sandhu
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            </div>
          )}

          {/* Adjacent Secondary Articles (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {secondary.map((article, idx) => (
              <FadeUp key={article.id} delay={0.3 + idx * 0.1} className="flex-1">
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block card-luxury rounded-3xl p-6 sm:p-7 h-full flex flex-col justify-between hover:border-[var(--gold-500)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-[var(--text-muted)]">
                      <span className="px-2.5 py-1 rounded-full bg-[var(--gold-muted)] text-[var(--navy-700)] border border-[var(--gold-500)]/30 text-[10px] font-bold uppercase tracking-wider">
                        {article.category || "Patient Guide"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[var(--gold-500)]" />
                        <span>{article.read_time || "4 min read"}</span>
                      </span>
                    </div>

                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-ink)] group-hover:text-[var(--gold-700)] transition-colors leading-snug mb-2.5">
                      {article.title}
                    </h4>

                    <p className="text-xs text-[var(--text-body)] line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--border-light)] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--navy-700)] group-hover:text-[var(--gold-700)]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
