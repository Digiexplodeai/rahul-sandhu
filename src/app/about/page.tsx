import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ShieldCheck, Award, Calendar } from "lucide-react";
import { getSiteSettings } from "@/lib/queries";
import { FadeUp, StaggerContainer, StaggerItem, ImageReveal, SectionEntrance, AnimatedCounter } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "About Lt Col (Dr) Rahul Sandhu | Surgical Oncologist & Military Veteran",
  description:
    "Learn about Lt Col (Dr) Rahul Sandhu's 15+ years career in clinical surgery, Armed Forces trauma care, and fellowship in surgical oncology at HBCHRC Punjab.",
};

export default function AboutPage() {
  const milestones = [
    {
      title: "M.B.B.S & Rotary Internship",
      institution: "Indira Gandhi Medical College & Hospital (IGMC), Shimla",
      period: "2003 – 2009",
      desc: "Comprehensive undergraduate clinical training and basic surgical education.",
    },
    {
      title: "Armed Forces Medical Service",
      institution: "Indian Army Medical Corps (Lt Col)",
      period: "2010 – 2024",
      desc: "Graded Surgical Specialist. Department Head of General Surgery & Emergency Trauma Care at Military Hospital Panagarh (Eastern Command). Operational tenures in high-altitude terrain including Siachen Glacier, and Indo-French Joint Military Exercise (2015).",
    },
    {
      title: "M.S. General Surgery",
      institution: "Armed Forces Medical College (AFMC), Pune",
      period: "2018 – 2021",
      desc: "Advanced post-graduate residency in complex abdominal procedures, trauma stabilization, and surgical critical care.",
    },
    {
      title: "D.N.B. General Surgery",
      institution: "National Board of Examinations (NBE), New Delhi",
      period: "2021",
      desc: "Diplomate of National Board credential certifying national surgical competence.",
    },
    {
      title: "Minimal Access Surgery Fellowship",
      institution: "Medicity Gurgaon & IAGES (FIAGES)",
      period: "2022",
      desc: "Specialized fellowship in advanced laparoscopic oncology and keyhole procedures.",
    },
    {
      title: "Infection Control & Antimicrobial Stewardship",
      institution: "NHCA, Singapore",
      period: "2022",
      desc: "Accredited international diplomas in hospital epidemiology, surgical site infection control, and antibiotic protocols.",
    },
    {
      title: "Fellowship in Surgical Oncology",
      institution: "Homi Bhabha Cancer Hospital & Research Centre (HBCHRC), Punjab",
      period: "2024 – 2025",
      desc: "Intensive cancer surgery fellowship under Tata Memorial Centre network across breast, head & neck, GI, and thoracic oncology.",
    },
    {
      title: "MBA in Hospital Care Services",
      institution: "Sikkim Manipal University",
      period: "2013",
      desc: "Healthcare administration, patient-centered clinical workflow, and quality leadership.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <TopBar />
      <Navbar />

      {/* Compact Elegant Page Hero */}
      <section className="bg-[#142B3D] text-[#FAFBF9] py-12 lg:py-16 border-b border-white/10 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#EEF2F1] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8] animate-pulse" />
              <span>Surgical Oncologist &amp; Armed Forces Veteran</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAFBF9]">
              Lt Col (Dr) Rahul Sandhu
            </h1>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="text-sm sm:text-base text-[#D6DFE4]/85 max-w-2xl mt-3 font-sans leading-relaxed">
              Combining 15+ years of surgical discipline forged in military trauma with specialized fellowship training in surgical oncology at Tata Memorial Centre (HBCHRC).
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Detailed Biography & Military Career Section */}
      <section className="py-14 lg:py-20 bg-white border-b border-[#E2E7E4] overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Doctor Portrait & Quote */}
            <div className="lg:col-span-5 space-y-6">
              <ImageReveal delay={0.1}>
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E2E7E4] bg-[#EEF2F1] aspect-[3/4] group">
                  <Image
                    src="/images/Dr-Rahul-Sandhu-original.jpeg"
                    alt="Lt Col (Dr) Rahul Sandhu"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover object-top group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142B3D]/30 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </ImageReveal>

              <FadeUp delay={0.2}>
                <div className="bg-[#FAFBF9] p-6 rounded-xl border border-[#E2E7E4] space-y-2.5">
                  <p className="font-serif italic text-sm sm:text-base text-[#142B3D] leading-relaxed">
                    &ldquo;Cancer surgery is not merely about excising tissue; it is about restoring hope, preserving organ function, and walking alongside the patient and their family through every step of healing.&rdquo;
                  </p>
                  <p className="text-xs font-semibold text-[#17665F] pt-2 border-t border-[#E2E7E4] uppercase tracking-wider">
                    — Lt Col (Dr) Rahul Sandhu
                  </p>
                </div>
              </FadeUp>

              {/* Quick Credentials Summary with Animated Counter */}
              <FadeUp delay={0.3}>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#EEF2F1] border border-[#E2E7E4] hover:border-[#17665F]/40 transition-colors">
                    <span className="block font-serif text-xl font-bold text-[#142B3D]">
                      <AnimatedCounter value={15} suffix="+ Yrs" />
                    </span>
                    <span className="text-[#5C707A] text-[11px]">Surgical Experience</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#EEF2F1] border border-[#E2E7E4] hover:border-[#17665F]/40 transition-colors">
                    <span className="block font-serif text-xl font-bold text-[#142B3D]">HBCHRC</span>
                    <span className="text-[#5C707A] text-[11px]">Tata Memorial Centre</span>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right Column: In-Depth Narrative with FadeUp */}
            <div className="lg:col-span-7 space-y-6 text-[#283941]">
              <FadeUp delay={0.15}>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17665F] block mb-1">
                    Distinguished Background &amp; Service
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142B3D] tracking-tight">
                    From Frontline Military Medicine to Precision Cancer Surgery
                  </h2>
                </div>
              </FadeUp>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#283941]/90">
                <FadeUp delay={0.2}>
                  <p>
                    <strong className="text-[#142B3D]">Lt Col (Dr) Rahul Sandhu</strong> is a seasoned Surgical Oncologist whose operative instincts were forged through rigorous surgical practice across India. Beginning his medical education at the renowned <strong>Indira Gandhi Medical College (IGMC) Shimla</strong>, he earned his MBBS before dedicating 14 years of honorable service to the Indian Armed Forces Medical Corps.
                  </p>
                </FadeUp>

                <FadeUp delay={0.25}>
                  <h3 className="font-serif text-xl font-bold text-[#142B3D] pt-2">
                    Military Leadership &amp; Operational Trauma
                  </h3>
                  <p className="mt-2">
                    During his military career (2010–2024), Dr. Sandhu served as a <strong>Graded Surgical Specialist</strong>, rising to the rank of Lieutenant Colonel. He directed the Department of General Surgery and Emergency Trauma Care at <strong>Military Hospital, Panagarh</strong>—a critical zonal military hospital under Eastern Command. His tenures encompassed operational deployments to the extreme high-altitude terrain of the <strong>Siachen Glacier</strong>, where surgical decision-making requires absolute composure and rapid stabilization.
                  </p>
                  <p className="mt-2">
                    In 2015, Dr. Sandhu represented the Indian Armed Forces in the <strong>Indo-French Joint Military Exercise</strong>, integrating surgical doctrine and operational casualty stabilization with international defense medical teams.
                  </p>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <h3 className="font-serif text-xl font-bold text-[#142B3D] pt-2">
                    Advanced Surgical Oncology Training
                  </h3>
                  <p className="mt-2">
                    To deliver specialized cancer care, Dr. Sandhu completed an intensive <strong>Fellowship in Surgical Oncology at Homi Bhabha Cancer Hospital and Research Centre (HBCHRC), Punjab</strong>—a leading institution of the Tata Memorial Centre network under the Department of Atomic Energy, Government of India.
                  </p>
                  <p className="mt-2">
                    His oncological focus spans breast oncoplastic surgery, gastrointestinal malignancies, colorectal tumors, head and neck resections, and minimally invasive laparoscopic oncology.
                  </p>
                </FadeUp>

                <FadeUp delay={0.35}>
                  <h3 className="font-serif text-xl font-bold text-[#142B3D] pt-2">
                    Philosophy of Patient Care
                  </h3>
                  <p className="mt-2">
                    Dr. Sandhu believes in unrushed, transparent communication. Every patient is guided through their staging, biopsy results, surgical approach, and postoperative recovery plan with utmost clarity and genuine empathy.
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.4}>
                <div className="pt-4 border-t border-[#E2E7E4] flex flex-wrap gap-4">
                  <a
                    href="#credentials"
                    className="bg-[#17665F] hover:bg-[#124F4A] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    View Educational Milestones
                  </a>
                  <Link
                    href="/contact"
                    className="border border-[#142B3D]/30 hover:border-[#142B3D] text-[#142B3D] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Consultation Timings
                  </Link>
                </div>
              </FadeUp>

            </div>
          </div>
        </div>
      </section>

      {/* Qualifications Timeline Grid */}
      <section id="credentials" className="py-14 lg:py-20 bg-[#FAFBF9] border-b border-[#E2E7E4] overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={0.1}>
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17665F] block mb-1">
                Credentials &amp; Accreditations
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#142B3D]">
                Educational &amp; Professional Milestones
              </h2>
            </div>
          </FadeUp>

          <StaggerContainer staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {milestones.map((m, i) => (
              <StaggerItem key={i}>
                <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E2E7E4] hover:border-[#17665F]/40 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#17665F]">
                        {m.period}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-[#17665F] group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#142B3D] leading-snug group-hover:text-[#17665F] transition-colors">
                      {m.title}
                    </h3>
                    <h4 className="text-xs font-semibold text-[#5C707A] uppercase tracking-wider mt-1 mb-2">
                      {m.institution}
                    </h4>
                    <p className="text-xs text-[#283941]/85 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Reassuring Consultation Callout */}
      <section className="py-12 bg-[#142B3D] text-[#FAFBF9] overflow-hidden">
        <SectionEntrance>
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#FAFBF9]">
                Schedule a Consultation with Dr. Rahul Sandhu
              </h3>
              <p className="text-xs sm:text-sm text-[#D6DFE4]/80 mt-1">
                Available for outpatient consultations at Shalby Hospital Mohali and ClearMedi Healthcare Kharar.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-[#17665F] hover:bg-[#124F4A] text-white px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#45DDC8]/30"
            >
              Book Appointment
            </Link>
          </div>
        </SectionEntrance>
      </section>


      <Footer />
    </main>
  );
}
