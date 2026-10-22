import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, Quote, CheckCircle, Play } from "lucide-react";
import { getTestimonials, getVideos, getSiteSettings } from "@/lib/queries";
import { FadeUp, StaggerContainer, StaggerItem, SectionEntrance } from "@/components/ui/motion";



export const metadata: Metadata = {
  title: "Patient Experiences & Reviews | Lt Col (Dr) Rahul Sandhu",
  description:
    "Read genuine reviews and experiences from patients treated by Lt Col (Dr) Rahul Sandhu for cancer surgery, gallbladder, and general surgical care.",
};

export default function TestimonialsPage() {
  const testimonials = getTestimonials();
  const videos = getVideos();
  const settings = getSiteSettings();

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <TopBar
        location={settings.topbar_location}
        phone={settings.topbar_phone}
        hours={settings.topbar_hours}
      />
      <Navbar logoUrl={settings.site_logo} />

      {/* Hero Banner */}
      <section className="bg-[#142B3D] text-[#FAFBF9] py-12 lg:py-16 border-b border-white/10 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#EEF2F1] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8] animate-pulse"></span>
              <span>Real Patient Experiences</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAFBF9]">
              Patient Stories &amp; Reviews
            </h1>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="text-sm sm:text-base text-[#D6DFE4]/85 mt-3 max-w-2xl font-sans leading-relaxed">
              Genuine words of gratitude from patients and families who entrusted their surgical cancer care to Lt Col (Dr) Rahul Sandhu.
            </p>
          </FadeUp>
          <FadeUp delay={0.35}>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#FAFBF9]">
              <span className="flex text-[#17665F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </span>
              <span className="font-semibold text-white">5.0 Star Rating</span>
              <span className="text-[#D6DFE4]/70">• Verified on Google Reviews</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-14 lg:py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <StaggerContainer staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <StaggerItem key={item.id}>
              <div
                className="p-6 sm:p-7 rounded-xl flex flex-col justify-between bg-white border border-[#E2E7E4] hover:border-[#17665F]/60 shadow-xs hover:shadow-[0_16px_32px_rgba(20,43,61,0.08)] -translate-y-0 hover:-translate-y-1.5 transition-all duration-300 relative h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#17665F]/30 group-hover:text-[#17665F]/60 group-hover:scale-110 transition-all duration-300" />
                  </div>

                  <p className="text-xs sm:text-sm text-[#283941] leading-relaxed italic">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#E2E7E4] flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#142B3D] group-hover:text-[#17665F] transition-colors">
                      {item.author_name}
                    </h3>
                    <p className="text-[11px] text-[#5C707A]">
                      {item.author_location}
                    </p>
                    {item.condition && (
                      <span className="inline-block text-[10px] text-[#17665F] font-medium mt-0.5">
                        {item.condition}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-[#142B3D] bg-[#EEF2F1] border border-[#E2E7E4] px-2.5 py-1 rounded-full font-medium">
                    <CheckCircle className="w-3 h-3 text-[#17665F]" />
                    <span>{item.source.includes("Google") ? "Google" : "Verified"}</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Video Experiences Section */}
        {videos.length > 0 && (
          <div id="videos" className="mt-16 pt-12 border-t border-[#E2E7E4]">
            <FadeUp delay={0.1}>
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17665F] block mb-1">
                  Visual Case Insights
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142B3D]">
                  Clinical Discussions &amp; Recovery Insights
                </h2>
              </div>
            </FadeUp>

            <StaggerContainer staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((vid) => (
                <StaggerItem key={vid.id}>
                  <div className="rounded-xl overflow-hidden bg-white border border-[#E2E7E4] hover:border-[#17665F]/40 shadow-xs hover:shadow-md transition-all duration-300 p-6 space-y-3">
                    <a
                      href={vid.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-video rounded-lg bg-[#142B3D] flex items-center justify-center text-white overflow-hidden group block"
                    >
                      {vid.thumbnail ? (
                        <Image
                          src={vid.thumbnail}
                          alt={vid.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 550px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                      <div className="relative z-10 w-12 h-12 rounded-full bg-[#17665F] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 text-[11px] bg-black/60 px-2.5 py-0.5 rounded text-white z-10">
                        Watch Discussion
                      </div>
                    </a>
                    <h3 className="font-serif text-lg font-bold text-[#142B3D]">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-[#5C707A] leading-relaxed">
                      {vid.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

      </section>

      {/* Consultation Banner */}
      <section className="py-12 bg-[#142B3D] text-[#FAFBF9] overflow-hidden">
        <SectionEntrance>
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#FAFBF9]">
                Begin Your Healing Journey
              </h3>
              <p className="text-xs sm:text-sm text-[#D6DFE4]/80 mt-1">
                Personalized, empathetic surgical oncology care in Mohali and Kharar.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-[#17665F] hover:bg-[#124F4A] text-white px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#45DDC8]/30"
            >
              Book Consultation
            </Link>
          </div>
        </SectionEntrance>
      </section>

      <Footer />
    </main>
  );
}
