"use client";

import React, { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  MessageCircle,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Send,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, SectionEntrance, LUXURY_EASE } from "@/components/ui/motion";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"shalby" | "clearmedi">("shalby");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    patient_name: "",
    phone: "",
    email: "",
    preferred_location: "Shalby Hospital, Mohali",
    preferred_date: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: form.patient_name,
          phone: form.phone,
          email: form.email,
          preferred_location: form.preferred_location,
          cancer_type: form.preferred_date
            ? `Preferred Date: ${form.preferred_date}`
            : "General Cancer Consultation",
          message: form.message,
        }),
      });

      if (res.ok) {
        setIsSent(true);
        setForm({
          patient_name: "",
          phone: "",
          email: "",
          preferred_location: "Shalby Hospital, Mohali",
          preferred_date: "",
          message: "",
        });
      } else {
        setErrorMessage("Unable to submit online request. Please call +91 98889 70519 directly.");
      }
    } catch {
      setErrorMessage("Network issue occurred. Please call +91 98889 70519 directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <TopBar />
      <Navbar />

      {/* Compact Page Hero */}
      <section className="bg-[#142B3D] text-[#FAFBF9] py-12 lg:py-16 border-b border-white/10 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#EEF2F1] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8] animate-pulse" />
              <span>Consultation &amp; Practice Locations</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAFBF9]">
              Hospital Locations &amp; Contact
            </h1>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="text-sm sm:text-base text-[#D6DFE4]/85 max-w-2xl mt-3 font-sans leading-relaxed">
              Consult with Lt Col (Dr) Rahul Sandhu across verified surgical hospital facilities in Mohali and Kharar.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Hospital Locations & Map */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Location Switcher Tabs */}
              <div className="flex border-b border-[#E2E7E4]">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("shalby");
                    setForm((prev) => ({ ...prev, preferred_location: "Shalby Hospital, Mohali" }));
                  }}
                  className={`flex-1 pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center relative ${
                    activeTab === "shalby"
                      ? "text-[#142B3D]"
                      : "text-[#5C707A] hover:text-[#142B3D]"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Building2 className={`w-4 h-4 ${activeTab === "shalby" ? "text-[#17665F]" : "text-[#5C707A]"}`} />
                    <span>Shalby Hospital, Mohali</span>
                  </span>
                  {activeTab === "shalby" && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#17665F] rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("clearmedi");
                    setForm((prev) => ({ ...prev, preferred_location: "ClearMedi Healthcare, Kharar" }));
                  }}
                  className={`flex-1 pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center relative ${
                    activeTab === "clearmedi"
                      ? "text-[#142B3D]"
                      : "text-[#5C707A] hover:text-[#142B3D]"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Building2 className={`w-4 h-4 ${activeTab === "clearmedi" ? "text-[#17665F]" : "text-[#5C707A]"}`} />
                    <span>ClearMedi Healthcare, Kharar</span>
                  </span>
                  {activeTab === "clearmedi" && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#17665F] rounded-full" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              {activeTab === "shalby" ? (
                <div className="bg-white rounded-2xl border border-[#E2E7E4] p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#E2E7E4]">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142B3D]">
                        Shalby Hospital, Mohali
                      </h2>
                      <p className="text-xs text-[#17665F] font-semibold mt-0.5">
                        Department of Surgical Oncology
                      </p>
                    </div>

                    <a
                      href="https://maps.google.com/?q=Shalby+Hospital+Mohali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#142B3D]/30 hover:border-[#142B3D] text-[#142B3D] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 self-start sm:self-auto transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-[#283941]">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#17665F] shrink-0 mt-0.5" />
                      <span>Mohali Stadium Road, Near PCA Stadium, Phase 9, Sector 63, SAS Nagar, Punjab 160062</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#17665F] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#142B3D]">Consultation Hours:</p>
                        <p className="text-xs text-[#5C707A]">Monday to Saturday: 9:00 AM – 5:00 PM (OPD &amp; Inpatient Admissions)</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#17665F] shrink-0" />
                      <span>Direct: </span>
                      <a href="tel:+919888970519" className="font-semibold text-[#142B3D] hover:text-[#17665F]">
                        +91 98889 70519
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#17665F] shrink-0" />
                      <span>Email: </span>
                      <a href="mailto:drsand.rahul@gmail.com" className="text-[#142B3D] hover:text-[#17665F]">
                        drsand.rahul@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#E2E7E4] flex flex-wrap gap-3">
                    <a
                      href="tel:+919888970519"
                      className="bg-[#17665F] hover:bg-[#124F4A] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Hospital OPD</span>
                    </a>

                    <a
                      href="https://wa.me/919888970519?text=Hello%20Dr.%20Rahul%20Sandhu,%20I%20would%20like%20to%20enquire%20about%20a%20cancer%20consultation%20at%20Shalby%20Hospital."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Assistant</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#E2E7E4] p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#E2E7E4]">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#142B3D]">
                        ClearMedi Healthcare, Kharar
                      </h2>
                      <p className="text-xs text-[#17665F] font-semibold mt-0.5">
                        Oncology &amp; Surgical Super-Speciality
                      </p>
                    </div>

                    <a
                      href="https://maps.google.com/?q=ClearMedi+Radiant+Hospital+Kharar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#142B3D]/30 hover:border-[#142B3D] text-[#142B3D] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 self-start sm:self-auto transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-[#283941]">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#17665F] shrink-0 mt-0.5" />
                      <span>NH-21, Chandigarh-Ropar Road, Near Kharar Bus Stand, Kharar, Punjab 140104</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#17665F] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#142B3D]">Consultation Hours:</p>
                        <p className="text-xs text-[#5C707A]">Monday to Saturday: By Prior Appointment</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#17665F] shrink-0" />
                      <span>Direct: </span>
                      <a href="tel:+919888970519" className="font-semibold text-[#142B3D] hover:text-[#17665F]">
                        +91 98889 70519
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#17665F] shrink-0" />
                      <span>Email: </span>
                      <a href="mailto:drsand.rahul@gmail.com" className="text-[#142B3D] hover:text-[#17665F]">
                        drsand.rahul@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#E2E7E4] flex flex-wrap gap-3">
                    <a
                      href="tel:+919888970519"
                      className="bg-[#17665F] hover:bg-[#124F4A] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Hospital OPD</span>
                    </a>

                    <a
                      href="https://wa.me/919888970519?text=Hello%20Dr.%20Rahul%20Sandhu,%20I%20would%20like%20to%20enquire%20about%20a%20cancer%20consultation%20at%20ClearMedi%20Hospital."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Assistant</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Map Embed */}
              <div className="rounded-2xl overflow-hidden border border-[#E2E7E4] h-64 bg-[#EEF2F1]">
                <iframe
                  title="Hospital Map Location"
                  src={
                    activeTab === "shalby"
                      ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.730248430634!2d76.73264637651034!3d30.697858088924043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee7bf568dc65%3A0x64e03507dcb0653c!2sShalby%20Hospital%20Mohali!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.483120129038!2d76.64321287651307!3d30.74665488583489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fe53b015b63eb%3A0xc47e30d1767675f9!2sClearMedi%20Radiant%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>

            {/* Right Column: Consultation Request Form */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E7E4] p-6 sm:p-8 shadow-xs">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                  Request an Appointment
                </h2>
                <p className="text-xs sm:text-sm text-[#5C707A] mt-1">
                  Submit your details and our team will get in touch to confirm your consultation slot.
                </p>
              </div>

              {isSent ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#17665F] mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-[#142B3D]">
                    Enquiry Submitted
                  </h3>
                  <p className="text-xs text-[#5C707A] max-w-sm mx-auto">
                    Thank you. Your consultation request has been routed directly to our clinic coordinator. We will call you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="border border-[#142B3D]/30 hover:border-[#142B3D] text-[#142B3D] px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mt-2 cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label htmlFor="patient_name" className="block text-xs font-semibold text-[#142B3D] mb-1">
                      Patient Full Name <span className="text-[#17665F]">*</span>
                    </label>
                    <input
                      id="patient_name"
                      type="text"
                      required
                      value={form.patient_name}
                      onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
                      placeholder="e.g. Jaswinder Singh"
                      className="form-input-luxury"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-[#142B3D] mb-1">
                        Phone Number <span className="text-[#17665F]">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98889 70519"
                        className="form-input-luxury"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#142B3D] mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="patient@gmail.com"
                        className="form-input-luxury"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferred_location" className="block text-xs font-semibold text-[#142B3D] mb-1">
                      Preferred Location <span className="text-[#17665F]">*</span>
                    </label>
                    <select
                      id="preferred_location"
                      value={form.preferred_location}
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm({ ...form, preferred_location: val });
                        if (val.includes("Shalby")) setActiveTab("shalby");
                        if (val.includes("ClearMedi")) setActiveTab("clearmedi");
                      }}
                      className="form-input-luxury bg-white"
                    >
                      <option value="Shalby Hospital, Mohali">Shalby Hospital, Mohali (9 AM – 5 PM)</option>
                      <option value="ClearMedi Healthcare, Kharar">ClearMedi Healthcare, Kharar (By Appt)</option>
                      <option value="Online / Video Consultation">Online / Video Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferred_date" className="block text-xs font-semibold text-[#142B3D] mb-1">
                      Preferred Date (Optional)
                    </label>
                    <input
                      id="preferred_date"
                      type="date"
                      value={form.preferred_date}
                      onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                      className="form-input-luxury"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#142B3D] mb-1">
                      Clinical Concern or Symptoms
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Briefly describe your biopsy status, symptoms, or surgery questions..."
                      className="form-input-luxury"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#17665F] hover:bg-[#124F4A] text-white h-12 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2 transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Request Consultation</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#5C707A] text-center pt-1">
                    Need immediate scheduling? Call{" "}
                    <a href="tel:+919888970519" className="font-bold text-[#142B3D] hover:text-[#17665F] underline">
                      +91 98889 70519
                    </a>
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Confidentiality Notice */}
      <div className="py-6 bg-white border-t border-[#E2E7E4] text-center text-xs text-[#5C707A] px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#17665F] shrink-0" />
          <span>
            Your medical records and personal information are strictly protected under doctor-patient confidentiality.
          </span>
        </div>
      </div>

      <Footer />
    </main>
  );
}
