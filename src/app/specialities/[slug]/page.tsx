import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Stethoscope, AlertCircle, FileText, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { getSpecialties, getSpecialtyBySlug } from "@/lib/queries";
import { FadeUp, ImageReveal, SectionEntrance } from "@/components/ui/motion";



interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const specialties = getSpecialties();
  return specialties.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const specialty = getSpecialtyBySlug(slug);
  if (!specialty) return { title: "Speciality Not Found" };

  return {
    title: `${specialty.title} | Surgical Oncology by Dr. Rahul Sandhu`,
    description: specialty.excerpt,
  };
}

export default async function SpecialtyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const specialty = getSpecialtyBySlug(slug);

  if (!specialty) notFound();

  const allSpecialties = getSpecialties();
  const otherSpecialties = allSpecialties.filter((s) => s.slug !== specialty.slug);

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <TopBar />
      <Navbar />

      {/* Header Banner & Breadcrumbs */}
      <section className="bg-[#142B3D] text-[#FAFBF9] py-12 lg:py-16 border-b border-white/10 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#D6DFE4]/70 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/specialities" className="hover:text-white transition-colors">Specialities</Link>
            <span>/</span>
            <span className="text-[#EEF2F1] font-medium">{specialty.title}</span>
          </nav>

          <FadeUp delay={0.05}>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#EEF2F1] border border-white/15 text-xs font-semibold uppercase tracking-wider mb-2">
                {specialty.subtitle}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAFBF9]">
                {specialty.title}
              </h1>
              <p className="text-sm sm:text-base text-[#D6DFE4]/85 mt-2 font-sans leading-relaxed">
                {specialty.excerpt}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Detailed Clinical Content & Sidebar */}
      <section className="py-14 lg:py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Featured Image */}
            <ImageReveal delay={0.1}>
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-xs border border-[#E2E7E4] bg-[#EEF2F1]">
                <Image
                  src={specialty.image || "/images/tumor-resection.jpg"}
                  alt={specialty.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
            </ImageReveal>

            {/* Overview / Clinical Narrative */}
            <FadeUp delay={0.15}>
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-3.5">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142B3D] flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-[#17665F]" />
                  <span>Overview &amp; Surgical Philosophy</span>
                </h2>
                <p className="text-sm text-[#283941]/90 leading-relaxed">
                  {specialty.description}
                </p>
                <div className="p-4 rounded-lg bg-[#EEF2F1] border-l-4 border-[#17665F] text-xs sm:text-sm text-[#142B3D] italic">
                  &ldquo;In treating {specialty.title.toLowerCase()}, our primary commitment is obtaining complete microscopic margin clearance while protecting bodily integrity, nerves, and quality of life.&rdquo;
                  <span className="block not-italic font-semibold text-[#17665F] mt-1">— Lt Col (Dr) Rahul Sandhu</span>
                </div>
              </div>
            </FadeUp>

            {/* Symptoms & Early Signs */}
            <FadeUp delay={0.2}>
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142B3D] flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#17665F]" />
                  <span>Common Symptoms &amp; Clinical Signs</span>
                </h2>
                <p className="text-sm text-[#283941]/90 leading-relaxed">
                  {specialty.symptoms}
                </p>
                <p className="text-xs text-[#5C707A] italic">
                  Early presentation significantly increases the likelihood of conservative, organ-sparing surgical interventions.
                </p>
              </div>
            </FadeUp>

            {/* Diagnostic Evaluation */}
            <FadeUp delay={0.25}>
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142B3D] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#17665F]" />
                  <span>Diagnostic Workup &amp; Staging</span>
                </h2>
                <p className="text-sm text-[#283941]/90 leading-relaxed">
                  {specialty.diagnosis}
                </p>
              </div>
            </FadeUp>

            {/* Surgical Approaches */}
            <FadeUp delay={0.3}>
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142B3D] flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#17665F]" />
                  <span>Surgical Approaches &amp; Techniques</span>
                </h2>
                <p className="text-sm text-[#283941]/90 leading-relaxed">
                  {specialty.surgical_approaches}
                </p>
              </div>
            </FadeUp>

            {/* Post-Care & Enhanced Recovery */}
            <FadeUp delay={0.35}>
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142B3D] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#17665F]" />
                  <span>Post-Operative Care &amp; Follow-Up</span>
                </h2>
                <p className="text-sm text-[#283941]/90 leading-relaxed">
                  {specialty.post_care}
                </p>
              </div>
            </FadeUp>

          </div>

          {/* Right Sidebar: Doctor Card & Other Specialties */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Consultation Card */}
            <FadeUp delay={0.2}>
              <div className="bg-white p-6 rounded-xl border border-[#E2E7E4] shadow-xs text-center space-y-4">
                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border border-[#E2E7E4] shadow-xs">
                  <Image
                    src="/images/Dr-Rahul-Sandhu-original.jpeg"
                    alt="Lt Col (Dr) Rahul Sandhu"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#142B3D]">
                    Lt Col (Dr) Rahul Sandhu
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#17665F] font-semibold">
                    Surgical Oncologist
                  </p>
                  <p className="text-xs text-[#5C707A] mt-1">
                    15+ years experience in clinical cancer surgery &amp; military trauma care.
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    href="/contact"
                    className="bg-[#17665F] hover:bg-[#124F4A] text-white block w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    Book Consultation
                  </Link>
                  <a
                    href="tel:+919888970519"
                    className="border border-[#142B3D]/30 hover:border-[#142B3D] text-[#142B3D] block w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Call +91 98889 70519
                  </a>
                </div>
              </div>
            </FadeUp>

            {/* Other Cancer Specialties Navigation */}
            <FadeUp delay={0.3}>
              <div className="bg-white p-6 rounded-xl border border-[#E2E7E4] shadow-xs space-y-3">
                <h4 className="font-serif text-base font-bold text-[#142B3D] border-b border-[#E2E7E4] pb-2">
                  Other Cancer Specialities
                </h4>
                <ul className="space-y-2 text-xs">
                  {otherSpecialties.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/specialities/${item.slug}`}
                        className="text-[#283941] hover:text-[#17665F] transition-colors flex items-center justify-between py-1.5 border-b border-[#E2E7E4] group/item"
                      >
                        <span className="group-hover/item:translate-x-1 transition-transform">{item.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/item:translate-x-1 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

          </div>

        </div>
      </section>

      {/* Reassuring Consultation Callout */}
      <section className="py-12 bg-[#142B3D] text-[#FAFBF9] overflow-hidden">
        <SectionEntrance>
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#FAFBF9]">
                Discuss Your Case Directly with Dr. Rahul Sandhu
              </h3>
              <p className="text-xs sm:text-sm text-[#D6DFE4]/80 mt-1">
                Personalized oncological assessment and second opinions in Mohali &amp; Kharar.
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
