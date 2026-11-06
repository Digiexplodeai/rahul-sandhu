import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShieldCheck,
  Activity,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText,
  Clock,
  ArrowRight,
  Info,
  MapPin,
  Scissors,
  Check,
  X,
  BookOpen,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { getTreatments } from "@/lib/queries";
import { BookConsultationModalButton, CallDoctorButton } from "@/components/treatment/ConsultationTriggers";

export const metadata: Metadata = {
  title: {
    absolute: "Desarda Mesh-Free Hernia Repair in Mohali | Dr Rahul Sandhu",
  },
  description:
    "Learn about Desarda mesh-free inguinal hernia repair in Mohali, including treatment suitability, benefits, risks and recovery options.",
  alternates: {
    canonical: "/treatments/desarda-mesh-free-inguinal-hernia-repair",
  },
  keywords: [
    "Desarda Mesh Free Inguinal Hernia Repair",
    "Desarda Hernia Repair Mohali",
    "Mesh Free Hernia Surgery Mohali",
    "Desarda Hernia Surgery Chandigarh",
    "Non Mesh Inguinal Hernia Repair",
    "Desarda Technique",
    "Inguinal Hernia Treatment Chandigarh",
    "Mesh Free Hernia Repair Tricity",
    "Tissue Based Hernia Repair",
    "Desarda Repair Punjab",
  ],
  openGraph: {
    title: "Desarda Mesh-Free Hernia Repair in Mohali | Dr Rahul Sandhu",
    description:
      "Learn about Desarda mesh-free inguinal hernia repair in Mohali, including treatment suitability, benefits, risks and recovery options.",
    url: "https://drrahulsandhu.com/treatments/desarda-mesh-free-inguinal-hernia-repair",
    type: "article",
    images: [
      {
        url: "/images/inguinal-hernia-anatomy.webp",
        width: 1376,
        height: 768,
        alt: "Clinically accurate medical illustration of inguinal hernia anatomy showing the inguinal canal and abdominal wall musculature",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarda Mesh-Free Hernia Repair in Mohali | Dr Rahul Sandhu",
    description:
      "Learn about Desarda mesh-free inguinal hernia repair in Mohali, including treatment suitability, benefits, risks and recovery options.",
    images: ["/images/inguinal-hernia-anatomy.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DesardaTreatmentPage() {
  const allTreatments = getTreatments();
  const otherTreatments = allTreatments.filter(
    (t) => t.slug !== "desarda-mesh-free-inguinal-hernia-repair"
  );

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": "https://drrahulsandhu.com/treatments/desarda-mesh-free-inguinal-hernia-repair/#webpage",
        "url": "https://drrahulsandhu.com/treatments/desarda-mesh-free-inguinal-hernia-repair",
        "name": "Desarda Mesh-Free Inguinal Hernia Repair in Mohali | Dr Rahul Sandhu",
        "description":
          "Learn about Desarda mesh-free inguinal hernia repair in Mohali, including treatment suitability, benefits, risks and recovery options.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://drrahulsandhu.com/#website",
          "name": "Lt Col (Dr) Rahul Sandhu",
          "url": "https://drrahulsandhu.com",
        },
        "about": {
          "@type": "MedicalCondition",
          "name": "Inguinal Hernia",
          "possibleTreatment": {
            "@id": "https://drrahulsandhu.com/treatments/desarda-mesh-free-inguinal-hernia-repair/#procedure",
          },
        },
      },
      {
        "@type": "MedicalProcedure",
        "@id": "https://drrahulsandhu.com/treatments/desarda-mesh-free-inguinal-hernia-repair/#procedure",
        "name": "Desarda Mesh-Free Inguinal Hernia Repair",
        "procedureType": "SurgicalProcedure",
        "bodyLocation": "Inguinal Canal",
        "description":
          "An open, tissue-based surgical repair that reconstructs the posterior wall of the inguinal canal using an undetached strip of external oblique aponeurosis without synthetic mesh implants.",
        "preparation":
          "Comprehensive clinical physical examination, diagnostic imaging when clinically indicated, and routine pre-anesthesia evaluation.",
        "followup":
          "Early mobilization within 12–24 hours; individualized postoperative review with progressive activity resumption over 4–6 weeks as directed by the treating surgeon.",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://drrahulsandhu.com/treatments/desarda-mesh-free-inguinal-hernia-repair/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://drrahulsandhu.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Treatments",
            "item": "https://drrahulsandhu.com/treatments",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Desarda Mesh-Free Hernia Repair",
            "item": "https://drrahulsandhu.com/treatments/desarda-mesh-free-inguinal-hernia-repair",
          },
        ],
      },
      {
        "@type": "Physician",
        "@id": "https://drrahulsandhu.com/#physician",
        "name": "Lt Col (Dr) Rahul Sandhu",
        "url": "https://drrahulsandhu.com",
        "telephone": "+919888970519",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mohali Stadium Rd, near PCA Stadium, Phase 9, Sector 63",
          "addressLocality": "SAS Nagar, Mohali",
          "addressRegion": "Punjab",
          "postalCode": "160062",
          "addressCountry": "IN",
        },
        "hospitalAffiliation": {
          "@type": "Hospital",
          "name": "Shalby Hospital, Mohali",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://drrahulsandhu.com/treatments/desarda-mesh-free-inguinal-hernia-repair/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Desarda mesh-free inguinal hernia repair?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Desarda repair is an open, tissue-based surgical procedure that reinforces the posterior wall of the inguinal canal using an undetached strip of the patient's own external oblique aponeurosis, without implanting synthetic prosthetic mesh.",
            },
          },
          {
            "@type": "Question",
            "name": "Does Desarda repair use surgical mesh?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "No. The Desarda technique is entirely mesh-free. It uses the patient's own living aponeurotic tissue to reconstruct the floor of the inguinal canal.",
            },
          },
          {
            "@type": "Question",
            "name": "Is Desarda surgery suitable for every patient?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "No. Candidacy depends on tissue quality, hernia type, body habitus, and overall health. Patients with thinned aponeurotic tissue, multiple recurrent hernias, or large defects are generally better candidates for standard mesh-based repair.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the difference between Desarda and laparoscopic mesh repair?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Desarda is an open anterior procedure utilizing the patient's natural tissue without any foreign implant. Laparoscopic repair (TAPP or TEP) is a minimally invasive keyhole approach that positions a synthetic mesh behind the abdominal wall in the preperitoneal space.",
            },
          },
          {
            "@type": "Question",
            "name": "Can a hernia recur after Desarda repair?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. Hernia recurrence is a recognized risk of any hernia repair technique, including non-mesh tissue repairs. Recurrence risk depends on tissue strength, surgical technique, and patient healing factors.",
            },
          },
          {
            "@type": "Question",
            "name": "How long does recovery take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Recovery timelines vary by individual. Most patients begin gentle walking within 12–24 hours and resume light sedentary routines within 1–2 weeks. Strenuous exercise and heavy lifting are usually restricted for 4–6 weeks as advised by the surgeon.",
            },
          },
          {
            "@type": "Question",
            "name": "What are the potential complications?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Potential surgical complications include wound bruising (hematoma), fluid collection (seroma), superficial wound infection, postoperative discomfort or temporary nerve irritation, urinary retention, and hernia recurrence.",
            },
          },
          {
            "@type": "Question",
            "name": "How is the appropriate hernia repair technique selected?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "The surgical approach is determined through a clinical physical examination, assessment of tissue quality, imaging when indicated, and shared decision-making discussing both mesh and non-mesh alternatives.",
            },
          },
          {
            "@type": "Question",
            "name": "Where can I discuss inguinal hernia treatment in Mohali?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Clinical consultations and surgical assessments are conducted at Shalby Hospital, Phase 9, Sector 63, SAS Nagar, Mohali, Punjab.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <TopBar />
      <Navbar />

      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Header Banner & Breadcrumbs */}
      <section className="bg-[#142B3D] text-[#FAFBF9] py-12 lg:py-16 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-[#D6DFE4]/70 mb-3"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/treatments" className="hover:text-white transition-colors">
              Treatments
            </Link>
            <span>/</span>
            <span className="text-[#EEF2F1] font-medium">
              Desarda Mesh-Free Hernia Repair
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#EEF2F1] border border-white/15 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8] animate-pulse" />
              <span>General Surgery &amp; Hernia Care • Non-Mesh Tissue Repair</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAFBF9] leading-tight">
              Desarda Mesh-Free Inguinal Hernia Repair in Mohali
            </h1>
            <p className="text-sm sm:text-base text-[#D6DFE4]/90 mt-3 font-sans leading-relaxed">
              Desarda repair is an open, mesh-free technique used to repair selected inguinal hernias using the patient&apos;s own tissue. Learn how the procedure works, who may be suitable, and how it compares with other hernia repair options.
            </p>

            {/* Hero CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <BookConsultationModalButton className="bg-[#17665F] hover:bg-[#124F4A] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center gap-2" />
              <CallDoctorButton className="border border-white/30 hover:border-white text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-12 lg:py-16 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Upper Two-Column Section: Overview & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Image, Clinical Notice & Foundations */}
          <div className="lg:col-span-8 space-y-8">
            {/* Medically Accurate Anatomical Illustration */}
            <div className="rounded-2xl overflow-hidden shadow-xs border border-[#E2E7E4] bg-white">
              <div className="relative h-64 sm:h-80 md:h-96 w-full bg-[#EEF2F1]">
                <Image
                  src="/images/inguinal-hernia-anatomy.webp"
                  alt="Clinically accurate medical illustration of inguinal hernia anatomy showing the inguinal canal, external oblique aponeurosis, and groin structures"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 820px"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-3.5 sm:p-4 bg-[#FAFBF9] border-t border-[#E2E7E4] flex items-center justify-between text-xs text-[#5C707A]">
                <span className="font-medium text-[#142B3D]">
                  Medical Illustration: Inguinal Canal &amp; Abdominal Wall Anatomy
                </span>
                <span className="hidden sm:inline text-[11px] text-[#5C707A]">
                  Tissue layers involved in pure tissue hernia repair
                </span>
              </div>
            </div>

            {/* Clinical Verification Notice */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#EEF2F1]/80 border border-[#17665F]/25 flex items-start gap-3.5 text-xs text-[#283941]">
              <Info className="w-5 h-5 text-[#17665F] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-[#142B3D] block text-sm">
                  Clinical Assessment &amp; Service Verification Notice
                </span>
                <p className="leading-relaxed text-[#5C707A]">
                  This educational guide is provided to explain the anatomical and physiological principles of Desarda mesh-free hernia repair. Clinical indications, surgical technique selection, and procedural availability depend on an in-person surgical assessment and individual clinical evaluation.
                </p>
              </div>
            </div>

            {/* Section 1: What Is an Inguinal Hernia? */}
            <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-[#17665F]" />
                <span>What Is an Inguinal Hernia?</span>
              </h2>
              <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
                <p>
                  An <strong>inguinal hernia</strong> occurs when internal tissue—such as intra-abdominal fat or a portion of the intestine—pushes through a localized area of weakness in the lower abdominal muscles into the inguinal canal. The inguinal canal is a natural passage in the groin area.
                </p>
                <p>
                  Inguinal hernias generally fall into two anatomical categories:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[#283941]/90">
                  <li>
                    <strong>Indirect Inguinal Hernia:</strong> Often related to a congenital opening at the internal inguinal ring that did not fully close before birth, allowing abdominal contents to follow the path of the spermatic cord.
                  </li>
                  <li>
                    <strong>Direct Inguinal Hernia:</strong> Typically develops over time as abdominal wall muscles weaken through age, persistent physical strain, chronic coughing, or heavy lifting, creating a bulge directly through the floor of the inguinal canal.
                  </li>
                </ul>
                <p>
                  Patients typically notice a soft bulge in the groin that may become more noticeable when standing, coughing, or exercising. A clinical physical examination by a surgeon is the primary method for diagnosing an inguinal hernia. Imaging, such as an ultrasound, is used when clinically indicated to evaluate ambiguous cases or confirm anatomical details.
                </p>
              </div>
            </article>

            {/* Section 2: What Is Desarda Mesh-Free Hernia Repair? */}
            <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#17665F]" />
                <span>What Is Desarda Mesh-Free Hernia Repair?</span>
              </h2>
              <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
                <p>
                  The Desarda repair is an open, tissue-based surgical technique described by Indian surgeon Dr. M. P. Desarda in 2001. It was developed to repair inguinal hernias without relying on synthetic prosthetic mesh implants or generating excessive tension across the repair.
                </p>
                <p>
                  In this technique, the surgeon mobilizes an <em>undetached strip of the patient&apos;s own external oblique aponeurosis</em> (a fibrous layer of the abdominal wall). Because the strip remains attached to surrounding tissue, it retains its natural vascularity and biological viability. The strip is positioned across the floor of the inguinal canal to reinforce the weakened posterior wall.
                </p>
                <p>
                  Because the repair uses solely the patient&apos;s natural tissue, it is completely <strong>mesh-free</strong>, avoiding the placement of permanent synthetic biomaterials (such as polypropylene mesh).
                </p>
              </div>
            </article>

            {/* Section 3: How Does the Desarda Technique Work? */}
            <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                <Scissors className="w-5 h-5 text-[#17665F]" />
                <span>How Does the Desarda Technique Work?</span>
              </h2>
              <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
                <p>
                  The core concept of the Desarda technique is physiological reinforcement. Rather than introducing a static artificial screen, the surgery repositions living muscle fascia to shield the hernia opening:
                </p>
                <ol className="list-decimal pl-5 space-y-2.5 text-[#283941]/90">
                  <li>
                    <strong>Surgical Access &amp; Hernia Sac Reduction:</strong> Through a standard open incision in the groin, the hernia sac is isolated and returned to its proper intra-abdominal position.
                  </li>
                  <li>
                    <strong>Aponeurotic Strip Mobilization:</strong> A strip of the external oblique aponeurosis (typically 1.5–2 cm wide) is demarcated while keeping its medial and lateral attachments intact to preserve blood flow.
                  </li>
                  <li>
                    <strong>Reconstruction of the Canal Floor:</strong> The strip is sutured to the inguinal ligament below and to the conjoined muscle arch above, creating a tension-free tissue barrier over the canal floor.
                  </li>
                  <li>
                    <strong>Physiological Function:</strong> When the patient contracts the abdominal muscles (for instance, during walking or coughing), the external oblique muscle contracts synchronously, tightening the strip to support the canal when abdominal pressure rises.
                  </li>
                  <li>
                    <strong>Anatomical Closure:</strong> The spermatic cord is repositioned, and the remaining tissue layers and skin are closed.
                  </li>
                </ol>
              </div>
            </article>
          </div>

          {/* Right Column: Sticky Doctor & Quick Action Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Doctor Profile Card */}
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
                  Senior Consultant &amp; Surgeon
                </p>
                <p className="text-xs text-[#5C707A] mt-1.5 leading-relaxed">
                  M.S. General Surgery (AFMC Pune) • DNB General Surgery • Former Head of General Surgery &amp; Emergency Trauma (MH Panagarh).
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <BookConsultationModalButton className="bg-[#17665F] hover:bg-[#124F4A] text-white block w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer" />
                <CallDoctorButton className="border border-[#142B3D]/30 hover:border-[#142B3D] text-[#142B3D] block w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200 hover:-translate-y-0.5" />
              </div>

              <div className="border-t border-[#E2E7E4] pt-3 text-left space-y-2 text-xs text-[#5C707A]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#17665F] shrink-0 mt-0.5" />
                  <span>Shalby Hospital, Phase 9, Sector 63, SAS Nagar, Mohali</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#17665F] shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Information Panel */}
            <div className="bg-[#FAFBF9] p-5 rounded-xl border border-[#E2E7E4] shadow-2xs space-y-3 text-xs text-[#283941]">
              <span className="font-semibold text-xs text-[#142B3D] uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#17665F]" />
                <span>Hernia Assessment Checklist</span>
              </span>
              <ul className="space-y-2 text-[#5C707A] pl-1 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#17665F] shrink-0 mt-0.5" />
                  <span>Physical clinical examination in standing and supine positions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#17665F] shrink-0 mt-0.5" />
                  <span>Ultrasound imaging requested only when clinically necessary</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#17665F] shrink-0 mt-0.5" />
                  <span>Individual discussion of mesh vs. non-mesh suitability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Full-Width Clinical Section: Balanced, Centered Layout */}
        <div className="max-w-4xl mx-auto space-y-10 pt-4">
          {/* Section 4: Possible Benefits of Mesh-Free Hernia Repair */}
          <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#17665F]" />
              <span>Possible Benefits of Mesh-Free Hernia Repair</span>
            </h2>
            <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
              <p>
                In selected clinical scenarios, pure tissue non-mesh repair provides important clinical considerations:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] space-y-1.5">
                  <span className="font-semibold text-xs text-[#17665F] uppercase tracking-wider block">
                    No Foreign Body Implantation
                  </span>
                  <p className="text-xs text-[#5C707A] leading-relaxed">
                    Completely avoids synthetic prosthetic mesh, eliminating implant-specific concerns such as mesh contraction, migration, or foreign-material reaction.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] space-y-1.5">
                  <span className="font-semibold text-xs text-[#17665F] uppercase tracking-wider block">
                    Living Autologous Tissue
                  </span>
                  <p className="text-xs text-[#5C707A] leading-relaxed">
                    Utilizes living tissue that maintains its blood supply, allowing natural integration and biological remodeling.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] space-y-1.5">
                  <span className="font-semibold text-xs text-[#17665F] uppercase tracking-wider block">
                    Patient-Specific Indication
                  </span>
                  <p className="text-xs text-[#5C707A] leading-relaxed">
                    Provides an option for patients with documented sensitivity to synthetic polymers or an informed preference to avoid artificial implants.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] space-y-1.5">
                  <span className="font-semibold text-xs text-[#17665F] uppercase tracking-wider block">
                    Potentially Contaminated Fields
                  </span>
                  <p className="text-xs text-[#5C707A] leading-relaxed">
                    May be considered in emergency or clean-contaminated operative situations where implanting permanent synthetic mesh poses higher infection risks.
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#5C707A] italic pt-1">
                *Note: These potential benefits depend on appropriate patient selection and tissue quality. Non-mesh repair is not universally superior for every patient or every hernia presentation.
              </p>
            </div>
          </article>

          {/* Section 5: Desarda Repair vs. Mesh-Based Hernia Repair: Balanced Comparison */}
          <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-5">
            <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[#17665F]" />
              <span>Desarda Repair vs. Mesh-Based Hernia Repair: Evidence-Based Comparison</span>
            </h2>
            <div className="text-sm text-[#283941] leading-relaxed space-y-4 font-sans">
              <p>
                When choosing a surgical approach, it is essential to review current evidence and international clinical guidelines. According to the <strong>2023 Update of the International HerniaSurge Guidelines for Groin Hernia Management</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#283941]/90">
                <li>
                  <strong>Mesh-based repair</strong> (including open Lichtenstein and minimally invasive laparo-endoscopic TAPP/TEP) remains the primary recommended standard of care for most adult inguinal hernias worldwide because of reproducible, benchmarked low recurrence rates.
                </li>
                <li>
                  <strong>Non-mesh tissue repair</strong> may be considered in carefully selected patients following shared clinical decision-making, particularly when patients wish to avoid foreign material or have contraindications to mesh.
                </li>
                <li>
                  Among non-mesh methods, the <strong>Shouldice technique</strong> remains the guideline-preferred non-mesh repair with the strongest comparative evidence.
                </li>
                <li>
                  The <strong>Desarda technique</strong> has demonstrated promising short-term results in specialized centers, but international consensus notes that high-quality, long-term multicenter data remain insufficient to recommend generalized global adoption over standard mesh repairs.
                </li>
              </ul>

              {/* Responsive Comparison Table */}
              <div className="overflow-x-auto rounded-xl border border-[#E2E7E4] shadow-2xs mt-4">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#142B3D] text-[#FAFBF9]">
                      <th className="p-3.5 font-semibold border-b border-white/10 w-1/4">Clinical Factor</th>
                      <th className="p-3.5 font-semibold border-b border-white/10 bg-[#17665F]/40 w-3/8">
                        Desarda Non-Mesh Repair
                      </th>
                      <th className="p-3.5 font-semibold border-b border-white/10 w-3/8">
                        Standard Mesh Repair (Lichtenstein / Laparoscopic)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E7E4]">
                    <tr className="hover:bg-[#EEF2F1]/30">
                      <td className="p-3.5 font-medium text-[#142B3D]">Repair Approach</td>
                      <td className="p-3.5 bg-[#EEF2F1]/20 text-[#283941]">
                        Open anterior groin incision
                      </td>
                      <td className="p-3.5 text-[#5C707A]">
                        Open anterior (Lichtenstein) or Keyhole (Laparoscopic TAPP/TEP)
                      </td>
                    </tr>
                    <tr className="hover:bg-[#EEF2F1]/30">
                      <td className="p-3.5 font-medium text-[#142B3D]">Use of Prosthetic Mesh</td>
                      <td className="p-3.5 text-[#17665F] font-semibold bg-[#EEF2F1]/20">
                        None (Uses patient&apos;s own aponeurosis)
                      </td>
                      <td className="p-3.5 text-[#5C707A]">
                        Synthetic mesh implant (typically polypropylene)
                      </td>
                    </tr>
                    <tr className="hover:bg-[#EEF2F1]/30">
                      <td className="p-3.5 font-medium text-[#142B3D]">Patient Selection</td>
                      <td className="p-3.5 bg-[#EEF2F1]/20 text-[#283941]">
                        Strict selection: requires strong, healthy external oblique aponeurosis
                      </td>
                      <td className="p-3.5 text-[#5C707A]">
                        Broad eligibility: bridges defect regardless of local tissue strength
                      </td>
                    </tr>
                    <tr className="hover:bg-[#EEF2F1]/30">
                      <td className="p-3.5 font-medium text-[#142B3D]">Foreign Body Awareness</td>
                      <td className="p-3.5 text-[#17665F] font-medium bg-[#EEF2F1]/20">
                        No synthetic implant; no mesh-specific foreign body reaction
                      </td>
                      <td className="p-3.5 text-[#5C707A]">
                        Permanent synthetic material; minor risk of foreign-body sensation in some patients
                      </td>
                    </tr>
                    <tr className="hover:bg-[#EEF2F1]/30">
                      <td className="p-3.5 font-medium text-[#142B3D]">Evidence Base</td>
                      <td className="p-3.5 bg-[#EEF2F1]/20 text-[#283941]">
                        Promising randomized and cohort trials; limited long-term multicenter registry data
                      </td>
                      <td className="p-3.5 text-[#5C707A]">
                        Extensively documented worldwide in population registries and randomized trials
                      </td>
                    </tr>
                    <tr className="hover:bg-[#EEF2F1]/30">
                      <td className="p-3.5 font-medium text-[#142B3D]">Surgeon Expertise</td>
                      <td className="p-3.5 bg-[#EEF2F1]/20 text-[#283941]">
                        Requires specific familiarity with aponeurotic transposition technique
                      </td>
                      <td className="p-3.5 text-[#5C707A]">
                        Standard surgical training worldwide with high reproducibility
                      </td>
                    </tr>
                    <tr className="hover:bg-[#EEF2F1]/30">
                      <td className="p-3.5 font-medium text-[#142B3D]">Guideline Position (HerniaSurge 2023)</td>
                      <td className="p-3.5 bg-[#EEF2F1]/20 text-[#283941]">
                        Recognized tissue option; Shouldice is the guideline-preferred non-mesh repair
                      </td>
                      <td className="p-3.5 text-[#5C707A]">
                        Primary recommended standard of care for most adult groin hernias
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>

          {/* Section 6: Who May Be Suitable for Desarda Repair? */}
          <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
              <Check className="w-5 h-5 text-[#17665F]" />
              <span>Who May Be Suitable for Desarda Repair?</span>
            </h2>
            <div className="text-sm text-[#283941] leading-relaxed space-y-4 font-sans">
              <p>
                Patient selection is fundamental to achieving good surgical outcomes with any pure tissue repair:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Suitable */}
                <div className="p-4 rounded-xl bg-[#EEF2F1]/50 border border-[#17665F]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#17665F] uppercase tracking-wider">
                    <Check className="w-4 h-4 text-[#17665F]" />
                    <span>Patients Who May Be Considered</span>
                  </div>
                  <ul className="text-xs text-[#283941] space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>Primary, uncomplicated unilateral inguinal hernias</li>
                    <li>Patients with robust, healthy external oblique aponeurotic tissue</li>
                    <li>Younger or active individuals seeking to avoid synthetic implants</li>
                    <li>Patients with verified hypersensitivity or aversion to foreign prosthetic mesh</li>
                    <li>Clean-contaminated operative settings where mesh introduction is contraindicated</li>
                  </ul>
                </div>

                {/* Limitations */}
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                    <X className="w-4 h-4 text-amber-700" />
                    <span>Clinical Limitations &amp; Relative Contraindications</span>
                  </div>
                  <ul className="text-xs text-[#283941] space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>Thinned, split, or weakened aponeurotic tissue that cannot provide structural support</li>
                    <li>Recurrent hernias with significant scarring from prior interventions</li>
                    <li>Very large or complex inguinoscrotal hernias with severe floor destruction</li>
                    <li>Systemic connective tissue disorders predisposing to poor tissue healing</li>
                    <li>Cases where bilateral laparoscopic repair is clinically favored</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* Section 7: Risks and Limitations */}
          <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#17665F]" />
              <span>Risks and Potential Complications</span>
            </h2>
            <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
              <p>
                All surgical procedures carry known risks. While a mesh-free repair avoids mesh-specific foreign body complications, patients should be informed about general surgical and tissue-repair risks:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#283941]/90">
                <li>
                  <strong>Hernia Recurrence:</strong> Recurrence can occur after any hernia surgery if tissue healing is compromised or excessive early abdominal pressure strains the repair.
                </li>
                <li>
                  <strong>Postoperative Pain:</strong> Localized incisional discomfort is normal in early recovery and managed with standard analgesics. Sensory nerve irritation in the groin may occasionally cause temporary numbness or burning sensation.
                </li>
                <li>
                  <strong>Seroma and Hematoma:</strong> Minor fluid accumulation or localized bruising in the subcutaneous space, which typically resolves on its own.
                </li>
                <li>
                  <strong>Superficial Wound Infection:</strong> Minor surgical site infection, addressed with standard wound hygiene and antibiotics if needed.
                </li>
                <li>
                  <strong>Urinary Retention:</strong> Transient difficulty passing urine following spinal or general anesthesia, usually resolving within 24 hours.
                </li>
              </ul>
            </div>
          </article>

          {/* Section 8: Recovery After Inguinal Hernia Surgery */}
          <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#17665F]" />
              <span>Recovery and Aftercare Expectations</span>
            </h2>
            <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
              <p>
                Recovery after inguinal hernia surgery is individualized. While general milestones provide a helpful guideline, specific advice and restrictions should always be guided by the operating surgeon:
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-3.5 rounded-lg bg-[#FAFBF9] border border-[#E2E7E4] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#17665F]/10 text-[#17665F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-[#142B3D] block">
                      Immediate Postoperative Period (Day 1)
                    </span>
                    <p className="text-xs text-[#5C707A] leading-relaxed mt-0.5">
                      Most patients are managed as day-case or short overnight admissions. Gentle walking is encouraged within hours of surgery to promote circulation.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#FAFBF9] border border-[#E2E7E4] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#17665F]/10 text-[#17665F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-[#142B3D] block">
                      Early Weeks (Weeks 1–2)
                    </span>
                    <p className="text-xs text-[#5C707A] leading-relaxed mt-0.5">
                      Light household activities and desk work can typically be resumed as comfort allows. Straining and lifting heavy weights should be avoided.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#FAFBF9] border border-[#E2E7E4] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#17665F]/10 text-[#17665F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-[#142B3D] block">
                      Intermediate Phase (Weeks 3–4)
                    </span>
                    <p className="text-xs text-[#5C707A] leading-relaxed mt-0.5">
                      Gradual increase in physical activity and walking distance. Incisional firmness gradually softens as biological remodeling progresses.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#FAFBF9] border border-[#E2E7E4] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#17665F]/10 text-[#17665F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-[#142B3D] block">
                      Full Activity Resumption (Weeks 4–6)
                    </span>
                    <p className="text-xs text-[#5C707A] leading-relaxed mt-0.5">
                      Return to vigorous sports, gym workouts, or heavy lifting should be guided by follow-up clinical examination confirming solid wall stability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Section 9: When to Seek Urgent Medical Attention */}
          <div className="bg-red-50/70 p-6 sm:p-7 rounded-xl border border-red-200/80 space-y-3">
            <div className="flex items-center gap-2.5 text-red-800">
              <AlertTriangle className="w-5 h-5 text-red-700 shrink-0" />
              <h2 className="font-serif text-xl font-bold">
                When Should You Seek Urgent Medical Attention?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-red-950/90 leading-relaxed font-sans">
              An untreated inguinal hernia can occasionally become <strong>incarcerated</strong> (irreducible) or <strong>strangulated</strong> (blood supply compromised). Seek immediate emergency medical attention if you experience:
            </p>
            <ul className="text-xs sm:text-sm text-red-950/90 space-y-1.5 list-disc pl-5 leading-relaxed font-sans">
              <li>
                A sudden, painful, firm groin swelling that cannot be pushed back in while lying flat.
              </li>
              <li>
                Severe abdominal pain accompanied by nausea, vomiting, or abdominal distension.
              </li>
              <li>
                Inability to pass stool or flatus (signs of acute bowel obstruction).
              </li>
              <li>
                Skin over the swelling turning red, purple, or dark.
              </li>
              <li>
                High fever or systemic chills.
              </li>
            </ul>
          </div>

          {/* Section 10: Consultation and Preoperative Assessment */}
          <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-[#17665F]" />
              <span>Consultation and Treatment Planning in Mohali</span>
            </h2>
            <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
              <p>
                Comprehensive clinical assessment and hernia evaluation are conducted at <strong>Shalby Hospital, Mohali</strong> (Sector 63, SAS Nagar). During an evaluation:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#283941]/90">
                <li>A thorough physical examination is performed to assess the hernia type, size, and reducibility</li>
                <li>An ultrasound or diagnostic imaging is ordered if anatomical confirmation is needed</li>
                <li>Both mesh and non-mesh surgical options are discussed openly with the patient</li>
                <li>General health status and pre-anesthetic requirements are reviewed</li>
              </ul>
              <div className="pt-3 flex flex-wrap gap-3">
                <BookConsultationModalButton />
                <CallDoctorButton />
              </div>
            </div>
          </article>

          {/* Section 11: Frequently Asked Questions */}
          <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-5">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-[#17665F]" />
              <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  q: "What is Desarda mesh-free inguinal hernia repair?",
                  a: "Desarda repair is an open, tissue-based surgical procedure that reinforces the posterior wall of the inguinal canal using an undetached strip of the patient's own external oblique aponeurosis, without implanting synthetic prosthetic mesh.",
                },
                {
                  q: "Does Desarda repair use surgical mesh?",
                  a: "No. The Desarda technique is entirely mesh-free. It uses the patient's own living aponeurotic tissue to reconstruct the floor of the inguinal canal.",
                },
                {
                  q: "Is Desarda surgery suitable for every patient?",
                  a: "No. Candidacy depends on tissue quality, hernia type, body habitus, and overall health. Patients with thinned aponeurotic tissue, multiple recurrent hernias, or large defects are generally better candidates for standard mesh-based repair.",
                },
                {
                  q: "What is the difference between Desarda and laparoscopic mesh repair?",
                  a: "Desarda is an open anterior procedure utilizing the patient's natural tissue without any foreign implant. Laparoscopic repair (TAPP or TEP) is a minimally invasive keyhole approach that positions a synthetic mesh behind the abdominal wall in the preperitoneal space.",
                },
                {
                  q: "Can a hernia recur after Desarda repair?",
                  a: "Yes. Hernia recurrence is a recognized risk of any hernia repair technique, including non-mesh tissue repairs. Recurrence risk depends on tissue strength, surgical technique, and patient healing factors.",
                },
                {
                  q: "How long does recovery take?",
                  a: "Recovery timelines vary by individual. Most patients begin gentle walking within 12–24 hours and resume light sedentary routines within 1–2 weeks. Strenuous exercise and heavy lifting are usually restricted for 4–6 weeks as advised by the surgeon.",
                },
                {
                  q: "What are the potential complications?",
                  a: "Potential surgical complications include wound bruising (hematoma), fluid collection (seroma), superficial wound infection, postoperative discomfort or temporary nerve irritation, urinary retention, and hernia recurrence.",
                },
                {
                  q: "How is the appropriate hernia repair technique selected?",
                  a: "The surgical approach is determined through a clinical physical examination, assessment of tissue quality, imaging when indicated, and shared decision-making discussing both mesh and non-mesh alternatives.",
                },
                {
                  q: "Where can I discuss inguinal hernia treatment in Mohali?",
                  a: "Clinical consultations and surgical assessments are conducted at Shalby Hospital, Phase 9, Sector 63, SAS Nagar, Mohali, Punjab.",
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border border-[#E2E7E4] bg-[#FAFBF9] p-4 transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-[#142B3D] group-hover:text-[#17665F]">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-[#17665F] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-[#5C707A] leading-relaxed border-t border-[#E2E7E4] pt-3 font-sans">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </article>

          {/* Section 12: Clinical Evidence and References */}
          <article className="bg-[#FAFBF9] p-6 sm:p-7 rounded-xl border border-[#E2E7E4] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#17665F] uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Medical References &amp; Clinical Evidence</span>
            </div>
            <ul className="text-xs text-[#5C707A] space-y-2.5 list-disc pl-4 leading-relaxed font-sans">
              <li>
                van Veenendaal N, Simons M, Hope R, et al.{" "}
                <strong>
                  Update of the international HerniaSurge guidelines for groin hernia management.
                </strong>{" "}
                <em>Hernia</em>. 2023;27(6):1429–1446.{" "}
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10588975/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#17665F] hover:underline font-medium"
                >
                  <span>PubMed Central Article</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                The HerniaSurge Group.{" "}
                <strong>International guidelines for groin hernia management.</strong>{" "}
                <em>Hernia</em>. 2018;22(1):1–165.{" "}
                <a
                  href="https://doi.org/10.1007/s10029-017-1668-x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#17665F] hover:underline font-medium"
                >
                  <span>Journal Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                Desarda MP.{" "}
                <strong>New method of inguinal hernia repair: a new physiological repair.</strong>{" "}
                <em>ANZ Journal of Surgery</em>. 2001;71(4):241–244.
              </li>
              <li>
                Ge H, Liang C, Xu Y, Ren S, Ling K.{" "}
                <strong>
                  Desarda versus Lichtenstein technique for the treatment of inguinal hernia: a systematic review and meta-analysis.
                </strong>{" "}
                <em>The Surgeon</em>. 2014;12(3):122–130.
              </li>
              <li>
                Manyilirah W, Kituuka O, Kiryabwire J.{" "}
                <strong>
                  A randomized clinical trial of Desarda versus Lichtenstein technique for inguinal hernia repair.
                </strong>{" "}
                <em>World Journal of Surgery</em>. 2012;36(10):2362–2368.
              </li>
            </ul>
          </article>
        </div>

        {/* Other Surgical Treatments Section (Balanced Grid) */}
        <section className="pt-8 border-t border-[#E2E7E4]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#17665F]">
                Explore Clinical Procedures
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#142B3D] mt-0.5">
                Other Surgical Treatments
              </h3>
            </div>
            <Link
              href="/treatments"
              className="text-xs font-semibold text-[#17665F] hover:text-[#124F4A] flex items-center gap-1 uppercase tracking-wider"
            >
              <span>View All Treatments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherTreatments.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href={`/treatments/${item.slug}`}
                className="group p-4 rounded-xl bg-white border border-[#E2E7E4] hover:border-[#17665F]/50 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-semibold text-[#17665F] uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#142B3D] group-hover:text-[#17665F] transition-colors mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#5C707A] line-clamp-2 mt-1 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#E2E7E4] flex items-center justify-between text-xs font-semibold text-[#142B3D] group-hover:text-[#17665F]">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Consultation Callout Banner */}
      <section className="py-12 bg-[#142B3D] text-[#FAFBF9] border-t border-white/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#FAFBF9]">
              Schedule Your Inguinal Hernia Consultation in Mohali
            </h3>
            <p className="text-xs sm:text-sm text-[#D6DFE4]/85 mt-1 max-w-2xl">
              Discuss your symptoms, clinical examination findings, and personalized repair options with Lt Col (Dr) Rahul Sandhu at Shalby Hospital, Mohali.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <BookConsultationModalButton className="bg-[#17665F] hover:bg-[#124F4A] text-white px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#45DDC8]/30 cursor-pointer" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
