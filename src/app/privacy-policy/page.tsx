import React from "react";
import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Lt Col (Dr) Rahul Sandhu",
  description: "Privacy policy and patient medical data confidentiality guidelines for Dr. Rahul Sandhu's practice.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <TopBar />
      <Navbar />

      <section className="bg-[#142B3D] text-[#FAFBF9] py-12 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAFBF9]">Privacy Policy</h1>
          <p className="text-xs text-[#D6DFE4]/80 mt-1">Last updated: October 2026</p>
        </div>
      </section>

      <section className="py-14 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E2E7E4] shadow-xs space-y-5 text-sm text-[#283941] leading-relaxed">
          <h2 className="font-serif text-lg font-bold text-[#142B3D]">1. Patient Confidentiality &amp; Information Collection</h2>
          <p>
            Lt Col (Dr) Rahul Sandhu and his clinical team are committed to protecting the privacy and confidentiality of all patients. When you use this website to book an appointment or send an enquiry, we collect only necessary personal data such as your name, phone number, email, and voluntary clinical notes to facilitate your appointment.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#142B3D]">2. Use of Information</h2>
          <p>
            Your details are used exclusively for scheduling clinical consultations, communicating appointment status, providing relevant pre-surgical instructions, and maintaining medical records in accordance with Indian medical ethics and legal standards. We never sell, rent, or share your contact or health information with third-party advertisers.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#142B3D]">3. Security of Data</h2>
          <p>
            We implement administrative and technical safeguards to ensure your personal health data remains protected against unauthorized access or disclosure.
          </p>

          <h2 className="font-serif text-lg font-bold text-[#142B3D]">4. Contact Us</h2>
          <p>
            For any queries regarding this policy, contact our clinic at drsand.rahul@gmail.com or +91 98889 70519.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
