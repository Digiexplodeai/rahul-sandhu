"use client";

import React, { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Navigation,
  CheckCircle2,
  Loader2,
  Calendar,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface ClinicContactSectionProps {
  settings?: Record<string, string>;
}

export default function ClinicContactSection({ settings }: ClinicContactSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const luxuryEase = [0.22, 1, 0.36, 1] as const;

  const clinic1Name = settings?.clinic1_name || "Shalby Multi-Specialty Hospital";
  const clinic1Address = settings?.clinic1_address || "Sector 63, Phase 9, SAS Nagar, Mohali, Punjab 160062";
  const clinic1Timings = settings?.clinic1_timings || "Mon – Sat: 9:00 AM – 5:00 PM";
  const clinic1Map = settings?.clinic1_map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.2586712398453!2d76.73238697626297!3d30.682914088686127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef9302e1c4ef%3A0xc3cf8e87d84f9ffb!2sShalby%20Multi-Specialty%20Hospital%20Mohali!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin";

  const directPhone = settings?.topbar_phone || "+91 98889 70519";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [form, setForm] = useState({
    patient_name: "",
    phone: "",
    email: "",
    preferred_location: "Shalby Hospital, Mohali",
    cancer_type: "General Cancer Consultation",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setIsSent(true);
        setForm({
          patient_name: "",
          phone: "",
          email: "",
          preferred_location: "Shalby Hospital, Mohali",
          cancer_type: "General Cancer Consultation",
          message: "",
        });
      } else {
        alert("Submission error. Please call +91 98889 70519 directly.");
      }
    } catch {
      alert("Submission error. Please call +91 98889 70519 directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#142B3D] text-[#D5E4E9] border-b border-white/10 relative overflow-hidden dark-section">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 20%, rgba(23, 102, 95, 0.35) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(23, 102, 95, 0.25) 0%, transparent 45%)
          `,
        }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with reveal */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: luxuryEase }}
          className="max-w-2xl mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#45DDC8] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8]" />
            Consultation &amp; Practice Locations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFFF] tracking-tight">
            Schedule a Confidential Consultation
          </h2>
          <p className="text-sm text-[#D5E4E9] mt-2 font-sans leading-relaxed">
            Meet with Lt Col (Dr) Rahul Sandhu for clinical diagnosis, treatment planning, or an informed second surgical opinion at Shalby Hospital, Mohali.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Practice Locations & Details (5 Cols) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: luxuryEase }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Verified Practice Facility Card */}
            <div className="bg-[#1A3449] p-6 rounded-2xl border border-white/15 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#FFFFFF]">
                    {clinic1Name}
                  </h3>
                  <p className="text-xs text-[#45DDC8] font-medium mt-0.5">
                    Department of Surgical Oncology
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#17665F]/40 border border-[#45DDC8]/30 text-[#45DDC8] text-[10px] font-semibold uppercase tracking-wider">
                  Verified Facility
                </span>
              </div>

              <p className="text-xs text-[#D5E4E9] flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#45DDC8] shrink-0 mt-0.5" />
                <span>{clinic1Address}</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#D5E4E9] pt-1">
                <div className="flex items-center gap-2 bg-[#142B3D] p-3 rounded-lg border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#45DDC8] shrink-0" />
                  <span>{clinic1Timings}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#142B3D] p-3 rounded-lg border border-white/10">
                  <Phone className="w-3.5 h-3.5 text-[#45DDC8] shrink-0" />
                  <a href={`tel:${directPhone.replace(/\s+/g, "")}`} className="hover:text-[#FFFFFF] text-[#D5E4E9] font-medium transition-colors">
                    {directPhone}
                  </a>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="w-full h-44 rounded-xl overflow-hidden border border-white/15">
                <iframe
                  src={clinic1Map}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${clinic1Name} Location Map`}
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <a
                  href="https://maps.google.com/?q=Shalby+Hospital+Mohali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#45DDC8] hover:text-[#FFFFFF] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions &rarr;</span>
                </a>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="tel:+919888970519"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#17665F] hover:bg-[#124F4A] text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +91 98889 70519</span>
              </a>

              <a
                href="https://wa.me/919888970519?text=Hello%20Dr%20Rahul%20Sandhu,%20I%20would%20like%20to%20consult%20regarding%20an%20oncology%20case."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-[#FFFFFF] border border-white/20 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#45DDC8]" />
                <span>WhatsApp Consultation</span>
              </a>
            </div>

          </motion.div>

          {/* Right: Functional Appointment Request Form (7 Cols) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: luxuryEase }}
            className="lg:col-span-7 bg-[#1A3449] p-7 sm:p-8 rounded-2xl border border-white/15 shadow-xl"
          >
            <div className="mb-6">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#FFFFFF]">
                Request an Oncology Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#D5E4E9] mt-1 leading-relaxed">
                Fill out the details below. Our clinical coordinator will confirm your appointment within 2 working hours.
              </p>
            </div>

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-xl bg-[#142B3D] border border-[#17665F]/40 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-[#17665F] text-white mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#45DDC8]" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#FFFFFF]">
                  Consultation Request Received
                </h4>
                <p className="text-xs sm:text-sm text-[#D5E4E9] max-w-sm mx-auto leading-relaxed">
                  Thank you. Your enquiry has been registered in our clinical schedule. Our team will contact you shortly to confirm your consultation timing.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="mt-2 text-xs font-semibold text-[#45DDC8] hover:text-[#FFFFFF] underline cursor-pointer"
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] mb-1.5">
                    Patient Full Name <span className="text-[#45DDC8]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.patient_name}
                    onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-[#102E3D] text-sm text-[#FFFFFF] placeholder-[#AEC8CF]/60 focus:outline-none focus:border-[#45DDC8] focus:ring-2 focus:ring-[#45DDC8]/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] mb-1.5">
                      Phone Number <span className="text-[#45DDC8]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-[#102E3D] text-sm text-[#FFFFFF] placeholder-[#AEC8CF]/60 focus:outline-none focus:border-[#45DDC8] focus:ring-2 focus:ring-[#45DDC8]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="patient@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-[#102E3D] text-sm text-[#FFFFFF] placeholder-[#AEC8CF]/60 focus:outline-none focus:border-[#45DDC8] focus:ring-2 focus:ring-[#45DDC8]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] mb-1.5">
                      Preferred Location
                    </label>
                    <select
                      value={form.preferred_location}
                      onChange={(e) => setForm({ ...form, preferred_location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-[#102E3D] text-sm text-[#FFFFFF] focus:outline-none focus:border-[#45DDC8] transition-all cursor-pointer"
                    >
                      <option value="Shalby Hospital, Mohali" className="bg-[#102E3D] text-white">Shalby Hospital, Mohali</option>
                      <option value="Online / Video Consultation" className="bg-[#102E3D] text-white">Online / Video Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] mb-1.5">
                      Condition / Concern
                    </label>
                    <select
                      value={form.cancer_type}
                      onChange={(e) => setForm({ ...form, cancer_type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-[#102E3D] text-sm text-[#FFFFFF] focus:outline-none focus:border-[#45DDC8] transition-all cursor-pointer"
                    >
                      <option value="General Cancer Consultation" className="bg-[#102E3D] text-white">General Cancer Consultation</option>
                      <option value="Breast Cancer Surgery" className="bg-[#102E3D] text-white">Breast Cancer Surgery</option>
                      <option value="Colorectal & GI Surgery" className="bg-[#102E3D] text-white">Colorectal &amp; GI Surgery</option>
                      <option value="Head & Neck Oncology" className="bg-[#102E3D] text-white">Head &amp; Neck Oncology</option>
                      <option value="Liver or Pancreatic Tumor" className="bg-[#102E3D] text-white">Liver or Pancreatic Tumor</option>
                      <option value="Second Opinion / Reports Review" className="bg-[#102E3D] text-white">Second Opinion / Reports Review</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] mb-1.5">
                    Medical Summary or Query
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Briefly describe symptoms, stage, prior treatments, or specific questions..."
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-[#102E3D] text-sm text-[#FFFFFF] placeholder-[#AEC8CF]/60 focus:outline-none focus:border-[#45DDC8] focus:ring-2 focus:ring-[#45DDC8]/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#17665F] hover:bg-[#124F4A] text-[#FFFFFF] py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#45DDC8]" />
                      <span>Registering Consultation...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-[#45DDC8]" />
                      <span>Submit Appointment Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
