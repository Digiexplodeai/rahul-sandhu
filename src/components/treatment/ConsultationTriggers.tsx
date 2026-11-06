"use client";

import React from "react";
import { Calendar, Phone } from "lucide-react";

export function BookConsultationModalButton({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-appointment-modal"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ||
        "inline-flex items-center justify-center gap-2 bg-[#17665F] hover:bg-[#124F4A] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      }
    >
      <Calendar className="w-4 h-4 text-[#45DDC8]" />
      <span>{children || "Book Consultation"}</span>
    </button>
  );
}

export function CallDoctorButton({
  className = "",
  phoneNumber = "+919888970519",
  label = "Call +91 98889 70519",
}: {
  className?: string;
  phoneNumber?: string;
  label?: string;
}) {
  return (
    <a
      href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
      className={
        className ||
        "inline-flex items-center justify-center gap-2 border border-[#142B3D]/30 hover:border-[#142B3D] text-[#142B3D] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
      }
    >
      <Phone className="w-4 h-4 text-[#17665F]" />
      <span>{label}</span>
    </a>
  );
}

