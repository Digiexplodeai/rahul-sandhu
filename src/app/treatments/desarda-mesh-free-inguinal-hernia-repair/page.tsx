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
} from "lucide-react";
import { getTreatments } from "@/lib/queries";
import { FadeUp, ImageReveal, SectionEntrance } from "@/components/ui/motion";
import { BookConsultationModalButton, CallDoctorButton } from "@/components/treatment/ConsultationTriggers";

export const metadata: Metadata = {
  title: {
    absolute: "Desarda Mesh-Free Hernia Repair in Mohali | Dr Rahul Sandhu",
  },
  description:
    "Learn about Desarda mesh-free inguinal hernia repair in Mohali, including the procedure, suitability, risks and recovery. Explore treatment options.",
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
      "Learn about Desarda mesh-free inguinal hernia repair in Mohali, including the procedure, suitability, risks and recovery. Explore treatment options.",
    url: "https://drrahulsandhu.com/treatments/desarda-mesh-free-inguinal-hernia-repair",
    type: "article",
    images: [
      {
        url: "/images/surgery.png",
        width: 1200,
        height: 630,
        alt: "Desarda Mesh-Free Inguinal Hernia Repair in Mohali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarda Mesh-Free Hernia Repair in Mohali | Dr Rahul Sandhu",
    description:
      "Learn about Desarda mesh-free inguinal hernia repair in Mohali, including the procedure, suitability, risks and recovery. Explore treatment options.",
    images: ["/images/surgery.png"],
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
          "Learn about Desarda mesh-free inguinal hernia repair in Mohali, including the procedure, suitability, risks and recovery. Explore treatment options.",
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
        "description": "An open, tissue-based surgical repair that reconstructs the posterior wall of the inguinal canal using an undetached strip of external oblique aponeurosis without synthetic mesh implants.",
        "preparation": "Comprehensive clinical groin assessment, high-resolution ultrasound, and pre-anesthetic clearance.",
        "followup": "Early mobilization at 12-24 hours; clinical evaluation at 1-2 weeks; progressive recovery protocol over 4-6 weeks.",
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
                "Desarda mesh-free repair is an open, tissue-based surgical procedure that reconstructs the posterior wall of the inguinal canal using an undetached strip of the patient's own external oblique aponeurosis, completely avoiding synthetic prosthetic mesh.",
            },
          },
          {
            "@type": "Question",
            "name": "Does Desarda repair use surgical mesh?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "No. The Desarda technique is entirely mesh-free. It uses natural, vascularized host tissue (an aponeurotic strip of the external oblique muscle) to provide strong, physiological support.",
            },
          },
          {
            "@type": "Question",
            "name": "Is Desarda surgery suitable for every patient?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "No. Candidacy depends on tissue quality, hernia characteristics, and general health. Patients with severely thinned aponeurosis, multiple recurrent hernias, or massive abdominal wall defects are generally better suited for standard mesh repair.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the difference between Desarda and laparoscopic mesh repair?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Desarda is an open anterior procedure that uses the patient's natural tissue without any implant. Laparoscopic repair (TAPP/TEP) is a minimally invasive posterior approach that places a synthetic mesh inside the preperitoneal space using keyhole instruments.",
            },
          },
          {
            "@type": "Question",
            "name": "Can a hernia recur after Desarda repair?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. As with any surgical hernia repair, recurrence is possible if the tissue undergoes extreme early stress, tears, or exhibits poor collagen healing. Published clinical studies show recurrence rates of 1% to 2% when performed by experienced surgeons on appropriately selected patients.",
            },
          },
          {
            "@type": "Question",
            "name": "How long does recovery usually take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Most patients mobilize within 12–24 hours and resume light sedentary routines in 7–14 days. Heavy physical exertion, sports, and lifting over 5–10 kg are typically restricted for 4–6 weeks to allow solid aponeurotic remodeling.",
            },
          },
          {
            "@type": "Question",
            "name": "What are the potential complications?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Possible risks include wound seroma, hematoma, superficial surgical site infection, early groin pain or nerve irritation, temporary urinary retention, and hernia recurrence.",
            },
          },
          {
            "@type": "Question",
            "name": "How is the right hernia repair technique selected?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Technique selection is made through a comprehensive physical examination and ultrasound assessment, evaluating hernia size, direct vs. indirect origin, tissue thickness, physical activity levels, and personal treatment preferences.",
            },
          },
          {
            "@type": "Question",
            "name": "Where can I discuss inguinal hernia treatment in Mohali?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "In-person clinical consultations and surgical evaluations are conducted at Shalby Hospital, Phase 9, Sector 63, SAS Nagar, Mohali, Punjab.",
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
      <section className="bg-[#142B3D] text-[#FAFBF9] py-12 lg:py-16 border-b border-white/10 overflow-hidden">
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

          <FadeUp delay={0.05}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#EEF2F1] border border-white/15 text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8] animate-pulse" />
                <span>General Surgery &amp; Hernia Care • Non-Mesh Tissue Repair</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAFBF9] leading-tight">
                Desarda Mesh-Free Inguinal Hernia Repair in Mohali
              </h1>
              <p className="text-sm sm:text-base text-[#D6DFE4]/85 mt-3 font-sans leading-relaxed">
                An established physiological, tissue-based surgical repair for inguinal hernia that reconstructs the posterior inguinal wall using the patient&apos;s own external oblique aponeurosis—without synthetic foreign mesh implants.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-14 lg:py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Comprehensive Medical Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured Image */}
            <ImageReveal delay={0.1}>
              <div className="relative h-64 sm:h-84 w-full rounded-2xl overflow-hidden shadow-xs border border-[#E2E7E4] bg-[#EEF2F1]">
                <Image
                  src="/images/surgery.png"
                  alt="Desarda Mesh-Free Inguinal Hernia Repair in Mohali"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142B3D]/60 via-transparent to-transparent flex items-end p-6">
                  <span className="text-xs text-white/90 font-medium">
                    Clinical Guide: Open Physiological Tissue Hernioplasty
                  </span>
                </div>
              </div>
            </ImageReveal>

            {/* Clinical Verification Notice */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#EEF2F1]/80 border border-[#17665F]/20 flex items-start gap-3.5 text-xs text-[#283941]">
              <Info className="w-5 h-5 text-[#17665F] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-[#142B3D] block text-sm">
                  Clinical Information &amp; Procedure Consultation Note
                </span>
                <p className="leading-relaxed text-[#5C707A]">
                  This educational guide describes the physiological Desarda non-mesh hernia repair technique. Technique suitability and procedural planning require an in-person surgical evaluation and ultrasonographic confirmation. Final treatment selection is individualized based on patient anatomy, tissue strength, and clinical safety.
                </p>
              </div>
            </div>

            {/* Section 1: What Is an Inguinal Hernia? */}
            <FadeUp delay={0.15}>
              <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                  <Activity className="w-5 h-5 text-[#17665F]" />
                  <span>What Is an Inguinal Hernia?</span>
                </h2>
                <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
                  <p>
                    An <strong>inguinal hernia</strong> occurs when intra-abdominal contents—such as preperitoneal fat, omentum, or a loop of small intestine—protrude through an anatomical defect or structural weakness in the lower abdominal wall into the inguinal canal. The inguinal canal is a natural tunnel through the lower abdominal musculature through which the spermatic cord passes in men and the round ligament passes in women.
                  </p>
                  <p>
                    Inguinal hernias are broadly categorized into two anatomical varieties:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-[#283941]/90">
                    <li>
                      <strong>Indirect Inguinal Hernia:</strong> Typically arises from a congenital persistence or incomplete closure of the internal inguinal ring (patent processus vaginalis). The hernia sac follows the spermatic cord through the deep ring down into the inguinal canal, occasionally extending toward the scrotum.
                    </li>
                    <li>
                      <strong>Direct Inguinal Hernia:</strong> Primarily an acquired condition resulting from chronic wear, tissue thinning, and weakening of the transversalis fascia in Hesselbach&apos;s triangle (the posterior wall of the canal), often aggravated by chronic coughing, physical straining, or age-related collagen breakdown.
                    </li>
                  </ul>
                  <p>
                    Common symptoms include a visible or palpable bulge in the groin that becomes more pronounced during standing, lifting, or coughing, accompanied by a dull ache or dragging sensation. Because hernias do not heal spontaneously and may gradually enlarge over time, timely surgical assessment is recommended to prevent acute complications.
                  </p>
                </div>
              </article>
            </FadeUp>

            {/* Section 2: What Is Desarda Mesh-Free Hernia Repair? */}
            <FadeUp delay={0.2}>
              <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#17665F]" />
                  <span>What Is Desarda Mesh-Free Hernia Repair?</span>
                </h2>
                <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
                  <p>
                    Introduced in 2001 by Indian surgeon <strong>Dr. M. P. Desarda</strong>, the Desarda repair is an open, tissue-based (pure tissue) surgical technique developed as an alternative to prosthetic mesh repairs and conventional tension-laden tissue repairs (such as the Shouldice, Bassini, or McVay repairs).
                  </p>
                  <p>
                    Unlike traditional tissue repairs that approximate muscle edges under artificial tension, the Desarda method transposes an <em>undetached strip of the patient&apos;s own external oblique aponeurosis</em> across the posterior wall of the inguinal canal. Because the transposed aponeurotic strip remains connected to the host tissue at both its lateral and medial ends, it retains its natural blood supply, tissue vitality, and neurological innervation.
                  </p>
                  <p>
                    Crucially, the Desarda operation is completely <strong>mesh-free</strong>. It avoids the implantation of synthetic foreign materials such as polypropylene, polyester, or polytetrafluoroethylene (ePTFE), utilizing solely autologous (the patient&apos;s own) biological tissue to reinforce the weakened groin floor.
                  </p>
                </div>
              </article>
            </FadeUp>

            {/* Section 3: How Does the Desarda Technique Work? */}
            <FadeUp delay={0.25}>
              <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                  <Scissors className="w-5 h-5 text-[#17665F]" />
                  <span>How Does the Desarda Technique Work?</span>
                </h2>
                <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
                  <p>
                    The physiological rationale of the Desarda repair is to create a dynamic, contracting posterior wall rather than a rigid, static barrier. The procedure follows structured surgical stages:
                  </p>
                  <ol className="list-decimal pl-5 space-y-3 text-[#283941]/90">
                    <li>
                      <strong>Inguinal Incision &amp; Sac Management:</strong> A standard anterior inguinal incision (approximately 6–8 cm) is made parallel to the inguinal ligament. The hernia sac is identified, dissected free from the spermatic cord, and addressed appropriately (reduced or ligated at the internal ring).
                    </li>
                    <li>
                      <strong>Mobilization of the External Oblique Strip:</strong> The external oblique aponeurosis is divided along its fiber line. An undetached strip measuring approximately 1.5 cm to 2 cm in width is demarcated between the medial and lateral leaflets of the external oblique aponeurosis.
                    </li>
                    <li>
                      <strong>Transposition and Fixation:</strong> The upper border of this aponeurotic strip is sutured with non-absorbable or long-lasting monofilament sutures to the internal oblique muscle arch and the conjoined tendon. The lower border of the strip is sutured to the inguinal ligament.
                    </li>
                    <li>
                      <strong>Dynamic Physiological Function:</strong> Whenever the patient contracts their abdominal wall (during standing, walking, lifting, or coughing), the external oblique muscle contracts synchronously. This contraction pulls the transposed strip taut, actively shielding and strengthening the posterior wall precisely when intra-abdominal pressure rises.
                    </li>
                    <li>
                      <strong>Anatomical Closure:</strong> The spermatic cord is placed back in its anatomical position, and the remaining leaflets of the external oblique are closed over the cord without constriction, followed by layered subcutaneous and cosmetic skin closure.
                    </li>
                  </ol>
                </div>
              </article>
            </FadeUp>

            {/* Section 4: Possible Benefits of Mesh-Free Hernia Repair */}
            <FadeUp delay={0.3}>
              <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#17665F]" />
                  <span>Possible Benefits of Mesh-Free Hernia Repair</span>
                </h2>
                <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
                  <p>
                    When evaluated in peer-reviewed clinical studies and surgical literature, several potential advantages of non-mesh physiological repair have been identified:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] space-y-1.5">
                      <span className="font-semibold text-xs text-[#17665F] uppercase tracking-wider block">
                        No Foreign Material
                      </span>
                      <p className="text-xs text-[#5C707A] leading-relaxed">
                        Eliminates synthetic prosthetic mesh implants and associated foreign-body risks such as mesh infection, shrinkage, folding, or migration.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] space-y-1.5">
                      <span className="font-semibold text-xs text-[#17665F] uppercase tracking-wider block">
                        Dynamic Physiological Action
                      </span>
                      <p className="text-xs text-[#5C707A] leading-relaxed">
                        The reconstructed posterior wall contracts synchronously with the abdominal muscles, preserving natural groin elasticity and biomechanics.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] space-y-1.5">
                      <span className="font-semibold text-xs text-[#17665F] uppercase tracking-wider block">
                        Option for Mesh-Sensitive Patients
                      </span>
                      <p className="text-xs text-[#5C707A] leading-relaxed">
                        Provides a recognized tissue alternative for patients with known foreign-body sensitivities, autoimmune concerns, or an expressed preference to avoid synthetic implants.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] space-y-1.5">
                      <span className="font-semibold text-xs text-[#17665F] uppercase tracking-wider block">
                        Clean-Contaminated Scenarios
                      </span>
                      <p className="text-xs text-[#5C707A] leading-relaxed">
                        May be considered in emergency or potentially contaminated operative fields where the introduction of prosthetic mesh carries elevated infection hazards.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#5C707A] italic pt-1">
                    *Important note: These represent potential clinical benefits observed in published literature. Sensation, recovery duration, and individual healing vary; tissue repair is not universally superior for every patient or hernia type.
                  </p>
                </div>
              </article>
            </FadeUp>

            {/* Section 5: Desarda Repair vs Mesh-Based Hernia Repair */}
            <FadeUp delay={0.35}>
              <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-[#17665F]" />
                  <span>Desarda Repair vs. Mesh-Based Hernia Repair: Balanced Comparison</span>
                </h2>
                <div className="text-sm text-[#283941] leading-relaxed space-y-4 font-sans">
                  <p>
                    According to the <strong>International HerniaSurge Guidelines</strong>, tension-free mesh repairs (including the open Lichtenstein technique and laparoscopic repairs such as TAPP or TEP) remain the primary benchmark and global standard of care for most adult groin hernias. Synthetic mesh provides a standardized, tension-free scaffold with reliably low recurrence rates across diverse surgical practices.
                  </p>
                  <p>
                    However, the Desarda non-mesh technique serves as an established, evidence-supported physiological alternative when properly indicated. The following comparison highlights key differences:
                  </p>

                  {/* Responsive Comparison Table */}
                  <div className="overflow-x-auto rounded-xl border border-[#E2E7E4] shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#142B3D] text-[#FAFBF9]">
                          <th className="p-3.5 font-semibold border-b border-white/10">Feature</th>
                          <th className="p-3.5 font-semibold border-b border-white/10 bg-[#17665F]/40">
                            Desarda Non-Mesh Repair
                          </th>
                          <th className="p-3.5 font-semibold border-b border-white/10">
                            Mesh Repair (Lichtenstein / Laparoscopic)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E7E4]">
                        <tr className="hover:bg-[#EEF2F1]/30">
                          <td className="p-3.5 font-medium text-[#142B3D]">Implanted Material</td>
                          <td className="p-3.5 text-[#17665F] font-semibold bg-[#EEF2F1]/20">
                            None (Autologous aponeurotic tissue)
                          </td>
                          <td className="p-3.5 text-[#5C707A]">
                            Synthetic mesh (Polypropylene / Polyester)
                          </td>
                        </tr>
                        <tr className="hover:bg-[#EEF2F1]/30">
                          <td className="p-3.5 font-medium text-[#142B3D]">Posterior Wall Support</td>
                          <td className="p-3.5 bg-[#EEF2F1]/20 text-[#283941]">
                            Dynamic, contracting aponeurotic strip
                          </td>
                          <td className="p-3.5 text-[#5C707A]">
                            Static prosthetic mesh scaffold
                          </td>
                        </tr>
                        <tr className="hover:bg-[#EEF2F1]/30">
                          <td className="p-3.5 font-medium text-[#142B3D]">Foreign Body Sensation</td>
                          <td className="p-3.5 text-[#17665F] font-medium bg-[#EEF2F1]/20">
                            Absent (Natural host tissue)
                          </td>
                          <td className="p-3.5 text-[#5C707A]">
                            Occasional foreign body awareness or stiffness
                          </td>
                        </tr>
                        <tr className="hover:bg-[#EEF2F1]/30">
                          <td className="p-3.5 font-medium text-[#142B3D]">Recurrence Rates</td>
                          <td className="p-3.5 bg-[#EEF2F1]/20 text-[#283941]">
                            Low (1%–2%) in appropriately selected tissue
                          </td>
                          <td className="p-3.5 text-[#5C707A]">
                            Low (&lt;1%–2%) benchmarked across global trials
                          </td>
                        </tr>
                        <tr className="hover:bg-[#EEF2F1]/30">
                          <td className="p-3.5 font-medium text-[#142B3D]">Tissue Quality Dependence</td>
                          <td className="p-3.5 bg-[#EEF2F1]/20 text-[#283941]">
                            High (Requires healthy external oblique aponeurosis)
                          </td>
                          <td className="p-3.5 text-[#5C707A]">
                            Low (Mesh bridges defects regardless of local strength)
                          </td>
                        </tr>
                        <tr className="hover:bg-[#EEF2F1]/30">
                          <td className="p-3.5 font-medium text-[#142B3D]">Guideline Recommendation</td>
                          <td className="p-3.5 bg-[#EEF2F1]/20 text-[#283941]">
                            Recognized tissue-based alternative
                          </td>
                          <td className="p-3.5 text-[#5C707A]">
                            Primary global recommendation for adult inguinal hernia
                          </td>
                        </tr>
                        <tr className="hover:bg-[#EEF2F1]/30">
                          <td className="p-3.5 font-medium text-[#142B3D]">Operative Technique</td>
                          <td className="p-3.5 bg-[#EEF2F1]/20 text-[#283941]">
                            Open anterior approach
                          </td>
                          <td className="p-3.5 text-[#5C707A]">
                            Open anterior (Lichtenstein) or Keyhole (Laparoscopic/Robotic)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-[#5C707A]">
                    Neither method is suitable for every situation. Technique selection must be decided collaboratively between patient and surgeon based on anatomy, lifestyle, and clinical indications.
                  </p>
                </div>
              </article>
            </FadeUp>

            {/* Section 6: Who May Be Suitable for Desarda Repair? */}
            <FadeUp delay={0.4}>
              <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                  <Check className="w-5 h-5 text-[#17665F]" />
                  <span>Who May Be Suitable for Desarda Repair?</span>
                </h2>
                <div className="text-sm text-[#283941] leading-relaxed space-y-4 font-sans">
                  <p>
                    Because Desarda repair relies on the integrity of the external oblique aponeurosis, patient selection is essential for surgical success.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Suitable */}
                    <div className="p-4 rounded-xl bg-[#EEF2F1]/50 border border-[#17665F]/30 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#17665F] uppercase tracking-wider">
                        <Check className="w-4 h-4 text-[#17665F]" />
                        <span>Potentially Suitable Candidates</span>
                      </div>
                      <ul className="text-xs text-[#283941] space-y-1.5 list-disc pl-4 leading-relaxed">
                        <li>Primary uncomplicated indirect or direct inguinal hernias</li>
                        <li>Younger or physically active patients seeking to avoid permanent implants</li>
                        <li>Patients with strong, well-developed external oblique aponeurosis</li>
                        <li>Documented sensitivity or allergy to synthetic materials</li>
                        <li>Clean-contaminated operative scenarios where mesh is contraindicated</li>
                        <li>Informed patient preference after balanced surgical counseling</li>
                      </ul>
                    </div>

                    {/* Not Recommended */}
                    <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
                        <X className="w-4 h-4 text-red-600" />
                        <span>Relative Contraindications &amp; Limitations</span>
                      </div>
                      <ul className="text-xs text-[#283941] space-y-1.5 list-disc pl-4 leading-relaxed">
                        <li>Severely thinned, fatty, or split external oblique aponeurosis</li>
                        <li>Recurrent hernias with distorted local anatomy or scar tissue</li>
                        <li>Giant inguinoscrotal hernias with massive posterior wall loss</li>
                        <li>Systemic connective tissue disorders (e.g., severe collagen synthesis defects)</li>
                        <li>Patients requiring laparoscopic bilateral repair in a single session</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </FadeUp>

            {/* Section 7: Risks and Limitations */}
            <FadeUp delay={0.45}>
              <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-[#17665F]" />
                  <span>Risks and Potential Complications</span>
                </h2>
                <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
                  <p>
                    Every surgical intervention carries inherent clinical risks. While avoiding synthetic mesh eliminates implant-specific issues, non-mesh repairs involve standard surgical and tissue-related considerations:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-[#283941]/90">
                    <li>
                      <strong>Hernia Recurrence:</strong> If the aponeurotic strip suffers mechanical failure, tears under excessive early strain, or fails to incorporate properly, recurrence may occur (observed in approximately 1%–2% in clinical literature).
                    </li>
                    <li>
                      <strong>Postoperative Pain:</strong> Somatic pain around the incision is normal in early postoperative days and typically managed with oral analgesics. Persistent neuralgia is less common than with nerve entrapment by mesh, but can occur if sensory nerves (ilioinguinal or iliohypogastric) are irritated.
                    </li>
                    <li>
                      <strong>Wound Seroma or Hematoma:</strong> Fluid accumulation (seroma) or localized bruising (hematoma) within the subcutaneous dissection plane, usually self-limiting.
                    </li>
                    <li>
                      <strong>Superficial Surgical Site Infection (SSI):</strong> Minor skin infection at the incision, typically managed with standard wound dressings and antibiotics.
                    </li>
                    <li>
                      <strong>Temporary Urinary Retention:</strong> Related to spinal or general anesthesia, typically resolving within 24 hours.
                    </li>
                  </ul>
                  <p className="text-xs text-[#5C707A]">
                    Patients receive thorough preoperative safety briefings and standardized sterile operative protocols to minimize risk.
                  </p>
                </div>
              </article>
            </FadeUp>

            {/* Section 8: Recovery After Inguinal Hernia Surgery */}
            <FadeUp delay={0.5}>
              <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#17665F]" />
                  <span>Recovery and Aftercare Expectations</span>
                </h2>
                <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
                  <p>
                    Postoperative recovery depends on individual healing biology, body habitus, occupational demands, and adherence to surgical instructions. The general rehabilitation roadmap includes:
                  </p>

                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 rounded-lg bg-[#FAFBF9] border border-[#E2E7E4] flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#17665F]/10 text-[#17665F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-[#142B3D] block">
                          Day of Surgery (0–24 Hours)
                        </span>
                        <p className="text-xs text-[#5C707A] leading-relaxed mt-0.5">
                          Most procedures are performed as day-care or short 24-hour observation admissions. Gentle mobilization and walking are initiated within hours of surgery to stimulate circulation and prevent blood clots.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#FAFBF9] border border-[#E2E7E4] flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#17665F]/10 text-[#17665F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-[#142B3D] block">
                          Week 1–2 (Early Healing Phase)
                        </span>
                        <p className="text-xs text-[#5C707A] leading-relaxed mt-0.5">
                          Patients manage light self-care, brief walking, and sedentary desk-based work. Avoid driving until pain medication is discontinued and quick pedal reflexes are comfortable. Lifting is restricted to under 3–5 kg.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#FAFBF9] border border-[#E2E7E4] flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#17665F]/10 text-[#17665F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-[#142B3D] block">
                          Weeks 3–4 (Progressive Mobility)
                        </span>
                        <p className="text-xs text-[#5C707A] leading-relaxed mt-0.5">
                          Gradual resumption of light aerobic exercise (stationary cycling, treadmill walking). Incisional tightness softens as tissue collagen reorganizes.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#FAFBF9] border border-[#E2E7E4] flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#17665F]/10 text-[#17665F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        4
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-[#142B3D] block">
                          Weeks 4–6 (Full Remodeling &amp; Clearance)
                        </span>
                        <p className="text-xs text-[#5C707A] leading-relaxed mt-0.5">
                          Follow-up clinical assessment to verify wall stability. Full clearance for heavy lifting, contact sports, and intense gym workouts is granted once the aponeurosis has solidly matured.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </FadeUp>

            {/* Section 9: When to Seek Urgent Medical Attention */}
            <FadeUp delay={0.55}>
              <div className="bg-red-50/70 p-6 sm:p-7 rounded-xl border border-red-200/80 space-y-3">
                <div className="flex items-center gap-2.5 text-red-800">
                  <AlertTriangle className="w-5 h-5 text-red-700 shrink-0" />
                  <h2 className="font-serif text-xl font-bold">
                    When Should You Seek Urgent Medical Attention?
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-red-950/90 leading-relaxed font-sans">
                  An untreated inguinal hernia can occasionally develop acute, life-threatening complications such as <strong>incarceration</strong> (trapped bowel) or <strong>strangulation</strong> (interrupted blood supply to trapped tissue). Seek emergency medical attention immediately if you experience:
                </p>
                <ul className="text-xs sm:text-sm text-red-950/90 space-y-1.5 list-disc pl-5 leading-relaxed font-sans">
                  <li>
                    A suddenly painful, firm, or tender groin bulge that can no longer be gently pushed back into the abdomen while lying flat.
                  </li>
                  <li>
                    Severe, worsening abdominal pain accompanied by nausea, recurrent vomiting, or marked abdominal swelling.
                  </li>
                  <li>
                    Inability to pass stool or flatus (signs of acute bowel obstruction).
                  </li>
                  <li>
                    Skin overlying the hernia turning discolored (red, purple, or dark).
                  </li>
                  <li>
                    High fever, rapid pulse, or severe dizziness.
                  </li>
                </ul>
              </div>
            </FadeUp>

            {/* Section 10: Consultation and Preoperative Assessment */}
            <FadeUp delay={0.6}>
              <article className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#142B3D] flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-[#17665F]" />
                  <span>Consultation and Treatment Planning in Mohali</span>
                </h2>
                <div className="text-sm text-[#283941] leading-relaxed space-y-3 font-sans">
                  <p>
                    Comprehensive surgical consultation and treatment planning are conducted at <strong>Shalby Hospital, Mohali</strong> (Sector 63, SAS Nagar). Each patient undergoes a thorough clinical evaluation to verify anatomical suitability before any procedure is scheduled:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[#283941]/90">
                    <li>Physical examination in standing and supine positions with Valsalva cough maneuvers</li>
                    <li>High-resolution groin ultrasonography to assess defect size, tissue thickness, and sac content</li>
                    <li>Transparent discussion comparing mesh-free physiological repair and laparoscopic/open mesh options</li>
                    <li>Pre-anesthesia testing tailored to cardiovascular and general health status</li>
                  </ul>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <BookConsultationModalButton />
                    <CallDoctorButton />
                  </div>
                </div>
              </article>
            </FadeUp>

            {/* Section 11: Frequently Asked Questions */}
            <FadeUp delay={0.65}>
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
                      a: "Desarda mesh-free repair is an open, tissue-based surgical procedure that reconstructs the posterior wall of the inguinal canal using an undetached strip of the patient's own external oblique aponeurosis, completely avoiding synthetic prosthetic mesh.",
                    },
                    {
                      q: "Does Desarda repair use surgical mesh?",
                      a: "No. The Desarda technique is entirely mesh-free. It uses natural, vascularized host tissue (an aponeurotic strip of the external oblique muscle) to provide strong, physiological support.",
                    },
                    {
                      q: "Is Desarda surgery suitable for every patient?",
                      a: "No. Candidacy depends on tissue quality, hernia characteristics, and general health. Patients with severely thinned aponeurosis, multiple recurrent hernias, or massive abdominal wall defects are generally better suited for standard mesh repair.",
                    },
                    {
                      q: "What is the difference between Desarda and laparoscopic mesh repair?",
                      a: "Desarda is an open anterior procedure that uses the patient's natural tissue without any implant. Laparoscopic repair (TAPP/TEP) is a minimally invasive posterior approach that places a synthetic mesh inside the preperitoneal space using keyhole instruments.",
                    },
                    {
                      q: "Can a hernia recur after Desarda repair?",
                      a: "Yes. As with any surgical hernia repair, recurrence is possible if the tissue undergoes extreme early stress, tears, or exhibits poor collagen healing. Published clinical studies show recurrence rates of 1% to 2% when performed by experienced surgeons on appropriately selected patients.",
                    },
                    {
                      q: "How long does recovery usually take?",
                      a: "Most patients mobilize within 12–24 hours and resume light sedentary routines in 7–14 days. Heavy physical exertion, sports, and lifting over 5–10 kg are typically restricted for 4–6 weeks to allow solid aponeurotic remodeling.",
                    },
                    {
                      q: "What are the potential complications?",
                      a: "Possible risks include wound seroma, hematoma, superficial surgical site infection, early groin pain or nerve irritation, temporary urinary retention, and hernia recurrence.",
                    },
                    {
                      q: "How is the right hernia repair technique selected?",
                      a: "Technique selection is made through a comprehensive physical examination and ultrasound assessment, evaluating hernia size, direct vs. indirect origin, tissue thickness, physical activity levels, and personal treatment preferences.",
                    },
                    {
                      q: "Where can I discuss inguinal hernia treatment in Mohali?",
                      a: "In-person clinical consultations and surgical evaluations are conducted at Shalby Hospital, Phase 9, Sector 63, SAS Nagar, Mohali, Punjab.",
                    },
                  ].map((faq, idx) => (
                    <details
                      key={idx}
                      className="group rounded-xl border border-[#E2E7E4] bg-[#FAFBF9] p-4 transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-[#142B3D] group-hover:text-[#17665F]">
                        <span>{faq.q}</span>
                        <span className="ml-3 shrink-0 text-[#17665F] transition-transform duration-200 group-open:rotate-180">
                          ▾
                        </span>
                      </summary>
                      <p className="mt-3 text-xs sm:text-sm text-[#5C707A] leading-relaxed border-t border-[#E2E7E4] pt-3">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </article>
            </FadeUp>

            {/* Section 12: Clinical Evidence and References */}
            <FadeUp delay={0.7}>
              <article className="bg-[#FAFBF9] p-6 sm:p-7 rounded-xl border border-[#E2E7E4] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#17665F] uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Clinical References &amp; Peer-Reviewed Literature</span>
                </div>
                <ul className="text-xs text-[#5C707A] space-y-2 list-disc pl-4 leading-relaxed font-sans">
                  <li>
                    Desarda MP. <em>New method of inguinal hernia repair: a new physiological repair.</em> ANZ Journal of Surgery. 2001;71(4):241-244.
                  </li>
                  <li>
                    The HerniaSurge Group. <em>International guidelines for groin hernia management.</em> Hernia. 2018;22(1):1-165.
                  </li>
                  <li>
                    Manyilirah W, Kituuka O, Kiryabwire J. <em>A randomized clinical trial of Desarda versus Lichtenstein technique for inguinal hernia repair.</em> World Journal of Surgery. 2012;36(10):2362-2368.
                  </li>
                  <li>
                    Ge H, Liang C, Xu Y, Ren S, Ling K. <em>Desarda versus Lichtenstein technique for the treatment of inguinal hernia: a systematic review and meta-analysis.</em> The Surgeon. 2014;12(3):122-130.
                  </li>
                  <li>
                    Mitura K, Romańczuk M. <em>The Desarda technique in open inguinal hernia repair: Clinical evaluation.</em> Polski Przegląd Chirurgiczny. 2018;90(2):23-28.
                  </li>
                </ul>
              </article>
            </FadeUp>
          </div>

          {/* Right Column: Sticky Doctor Card & Other Treatments */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
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
                    Senior Consultant &amp; Surgeon
                  </p>
                  <p className="text-xs text-[#5C707A] mt-1">
                    M.S. General Surgery (AFMC Pune) • DNB General Surgery • Former Head of General Surgery &amp; Trauma (MH Panagarh).
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <BookConsultationModalButton className="bg-[#17665F] hover:bg-[#124F4A] text-white block w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer" />
                  <CallDoctorButton className="border border-[#142B3D]/30 hover:border-[#142B3D] text-[#142B3D] block w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200 hover:-translate-y-0.5" />
                </div>

                <div className="border-t border-[#E2E7E4] pt-3 text-left space-y-2 text-xs text-[#5C707A]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#17665F] shrink-0 mt-0.5" />
                    <span>Shalby Hospital, Phase 9, Sector 63, Mohali</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#17665F] shrink-0" />
                    <span>Mon – Sat: 9:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Other Treatments Navigation */}
            <FadeUp delay={0.3}>
              <div className="bg-white p-6 rounded-xl border border-[#E2E7E4] shadow-xs space-y-3">
                <h4 className="font-serif text-base font-bold text-[#142B3D] border-b border-[#E2E7E4] pb-2">
                  Other Surgical Treatments
                </h4>
                <ul className="space-y-2 text-xs">
                  {otherTreatments.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/treatments/${item.slug}`}
                        className="text-[#283941] hover:text-[#17665F] transition-colors flex items-center justify-between py-1.5 border-b border-[#E2E7E4] group/item"
                      >
                        <span className="group-hover/item:translate-x-1 transition-transform">
                          {item.title}
                        </span>
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

      {/* Bottom Consultation Callout Banner */}
      <section className="py-12 bg-[#142B3D] text-[#FAFBF9] overflow-hidden">
        <SectionEntrance>
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#FAFBF9]">
                Schedule Your Hernia Assessment in Mohali
              </h3>
              <p className="text-xs sm:text-sm text-[#D6DFE4]/80 mt-1">
                Direct discussions regarding tissue suitability, mesh vs. non-mesh options, risks, and recovery expectations.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <BookConsultationModalButton className="bg-[#17665F] hover:bg-[#124F4A] text-white px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#45DDC8]/30 cursor-pointer" />
            </div>
          </div>
        </SectionEntrance>
      </section>

      <Footer />
    </main>
  );
}
