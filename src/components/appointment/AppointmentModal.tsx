"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Phone, User, Mail, MapPin, CheckCircle, Clock, ShieldCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppointmentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: "",
    phone: "",
    email: "",
    preferred_date: "",
    preferred_location: "Shalby Hospital, Mohali",
    cancer_type: "General Cancer Consultation",
    message: "",
  });

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSuccess(false);
    };
    window.addEventListener("open-appointment-modal", handleOpen);
    return () => window.removeEventListener("open-appointment-modal", handleOpen);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData({
          patient_name: "",
          phone: "",
          email: "",
          preferred_date: "",
          preferred_location: "Shalby Hospital, Mohali",
          cancer_type: "General Cancer Consultation",
          message: "",
        });
      } else {
        alert("There was an issue submitting your consultation request. Please call directly at +91 9888970519.");
      }
    } catch {
      alert("Network error. Please call directly at +91 9888970519.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E2E7E4] overflow-hidden text-[#283941] z-10"
          >
            {/* Header Banner */}
            <div className="bg-[#142B3D] px-6 py-5 text-[#FAFBF9] border-b border-white/10 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#EEF2F1] text-xs uppercase tracking-wider font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#17665F]" />
                  <span>Direct Doctor Consultation</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#FAFBF9] tracking-tight">
                  Request a Consultation
                </h3>
                <p className="text-xs text-[#D6DFE4]/80 mt-1">
                  With Lt Col (Dr) Rahul Sandhu — Surgical Oncologist
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#EEF2F1] flex items-center justify-center text-[#17665F]">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Consultation Request Received
                  </h4>
                  <p className="text-sm text-[#5C707A] max-w-md mx-auto leading-relaxed">
                    Thank you. Your consultation request has been submitted directly to Dr. Rahul Sandhu&apos;s team. We will call you shortly to confirm your consultation schedule.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-[#17665F] hover:bg-[#124F4A] text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#142B3D] mb-1.5">
                        Patient Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#17665F] absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          name="patient_name"
                          value={formData.patient_name}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Singh"
                          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-white text-[#283941] border border-[#E2E7E4] focus:border-[#17665F] focus:outline-hidden focus:ring-1 focus:ring-[#17665F]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#142B3D] mb-1.5">
                        Contact Phone *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#17665F] absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-white text-[#283941] border border-[#E2E7E4] focus:border-[#17665F] focus:outline-hidden focus:ring-1 focus:ring-[#17665F]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#142B3D] mb-1.5">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#17665F] absolute left-3 top-3" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="patient@email.com"
                          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-white text-[#283941] border border-[#E2E7E4] focus:border-[#17665F] focus:outline-hidden focus:ring-1 focus:ring-[#17665F]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#142B3D] mb-1.5">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#17665F] absolute left-3 top-3" />
                        <input
                          type="date"
                          name="preferred_date"
                          value={formData.preferred_date}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-white text-[#283941] border border-[#E2E7E4] focus:border-[#17665F] focus:outline-hidden focus:ring-1 focus:ring-[#17665F]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#142B3D] mb-1.5">
                        Consultation Location *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#17665F] absolute left-3 top-3" />
                        <select
                          name="preferred_location"
                          value={formData.preferred_location}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-white text-[#283941] border border-[#E2E7E4] focus:border-[#17665F] focus:outline-hidden focus:ring-1 focus:ring-[#17665F]"
                        >
                          <option value="Shalby Hospital, Mohali">Shalby Hospital, Mohali (Phase 9)</option>
                          <option value="Online / Video Consultation">Online / Video Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#142B3D] mb-1.5">
                        Condition / Speciality
                      </label>
                      <select
                        name="cancer_type"
                        value={formData.cancer_type}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-sm rounded-xl bg-white text-[#283941] border border-[#E2E7E4] focus:border-[#17665F] focus:outline-hidden focus:ring-1 focus:ring-[#17665F]"
                      >
                        <option value="Breast Cancer">Breast Cancer / Lumps</option>
                        <option value="Colorectal Cancer">Colon / Rectal Cancer</option>
                        <option value="Head & Neck Cancer">Head, Neck &amp; Oral Cancer</option>
                        <option value="Liver & Pancreas">Liver / Gallbladder / Pancreas</option>
                        <option value="Stomach Cancer">Stomach / Gastric Cancer</option>
                        <option value="Thyroid & Parathyroid">Thyroid &amp; Parathyroid</option>
                        <option value="Gynaecological Cancer">Uterine / Ovarian Cancer</option>
                        <option value="Urological Cancer">Kidney / Bladder / Prostate</option>
                        <option value="Second Opinion">Second Opinion on Surgery</option>
                        <option value="General Consultation">General Cancer Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142B3D] mb-1.5">
                      Brief Medical Summary or Notes
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share any prior biopsy results, symptoms, or surgery questions..."
                      className="w-full p-3 text-sm rounded-xl bg-white text-[#283941] border border-[#E2E7E4] focus:border-[#17665F] focus:outline-hidden focus:ring-1 focus:ring-[#17665F] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#17665F] hover:bg-[#124F4A] text-white py-3.5 rounded-xl text-center text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md disabled:opacity-70 cursor-pointer transition-all duration-200 active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        "Confirm Consultation Booking"
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-center text-[11px] text-[#5C707A] pt-1">
                    <Clock className="w-3.5 h-3.5 text-[#17665F]" />
                    <span>Our clinic team responds promptly during hospital consultation hours</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
