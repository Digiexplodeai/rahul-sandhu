"use client";

import React from "react";
import { Phone, ArrowRight, ShieldCheck, Clock, Users, Calendar } from "lucide-react";
import { FadeUp } from "@/components/ui/MotionReveal";

export default function CtaBanner() {
  const openAppointmentModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-appointment-modal"));
    }
  };

  return (
    <section className="bg-[var(--navy-900)] text-[var(--text-ivory)] py-20 lg:py-28 relative overflow-hidden border-t border-[var(--gold-500)]/30">
      
      {/* Cinematic Deep Ambience & Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--gold-500)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[var(--navy-700)]/40 rounded-full blur-2xl pointer-events-none" />
      
      {/* Decorative Gold Border Line at Top */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--gold-500)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Headline & Actions */}
          <div className="lg:col-span-8 space-y-7">
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gold-muted)] border border-[var(--gold-500)]/30 text-[var(--gold-500)] text-xs font-semibold uppercase tracking-[0.25em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-500)]" />
                Direct Surgical Consultation
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-ivory)] tracking-tight leading-[1.12]">
                Your Next Step Toward Informed Cancer Care.
              </h2>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-base sm:text-lg text-[var(--text-slate)] max-w-2xl leading-relaxed font-sans">
                Connect with Lt Col (Dr) Rahul Sandhu to discuss your diagnosis, evaluate biopsy results, and understand all surgical options with total clarity, transparency, and empathy.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={openAppointmentModal}
                  id="cta-book-consultation-btn"
                  className="btn-gold inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-xl group cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="tel:+919888970519"
                  className="btn-outline-gold inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 text-[var(--gold-500)]" />
                  <span>Call: +91 98889 70519</span>
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right: Hospital Availability Indicators */}
          <div className="lg:col-span-4">
            <FadeUp delay={0.35}>
              <div className="bg-[var(--navy-800)]/90 backdrop-blur-md p-8 rounded-3xl border border-[var(--gold-500)]/15 space-y-5 shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--navy-700)] border border-[var(--gold-500)]/30 flex items-center justify-center text-[var(--gold-500)] shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--text-ivory)]">In-Person & Online Consults</h4>
                    <p className="text-xs text-[var(--text-slate)] mt-1">Available at Shalby Hospital Mohali & ClearMedi Kharar, plus pan-India virtual opinions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-[var(--navy-700)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--navy-700)] border border-[var(--gold-500)]/30 flex items-center justify-center text-[var(--gold-500)] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--text-ivory)]">Dedicated Slot Allocation</h4>
                    <p className="text-xs text-[var(--text-slate)] mt-1">Unrushed appointment times to review imaging, pathology reports, and questions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-[var(--navy-700)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--navy-700)] border border-[var(--gold-500)]/30 flex items-center justify-center text-[var(--gold-500)] shrink-0 mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--text-ivory)]">Compassionate Care Team</h4>
                    <p className="text-xs text-[var(--text-slate)] mt-1">Assistance with admission paperwork, insurance claims, and surgery preparation.</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
