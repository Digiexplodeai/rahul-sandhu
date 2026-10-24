"use client";

import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";

interface TopBarProps {
  location?: string;
  phone?: string;
  hours?: string;
}

export default function TopBar({
  location = "Shalby Hospital, Mohali",
  phone = "+91 98889 70519",
  hours = "Mon – Sat: 9:00 AM – 5:00 PM",
}: TopBarProps) {
  return (
    <div className="bg-[#142B3D] text-[#D6DFE4] text-[11px] sm:text-xs py-2 px-4 border-b border-white/10 font-sans tracking-wide">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Location & Direct Call */}
        <div className="flex items-center gap-4 sm:gap-6 truncate">
          <div className="flex items-center gap-1.5 text-[#D6DFE4]/90 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#17665F] shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="hidden sm:flex items-center gap-1.5 text-[#D6DFE4]/90 hover:text-white transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#17665F] shrink-0" />
            <span className="font-medium">{phone}</span>
          </a>
        </div>

        {/* Right: Clinic Hours */}
        <div className="hidden md:flex items-center gap-1.5 text-[#D6DFE4]/80 text-[11px] shrink-0">
          <Clock className="w-3.5 h-3.5 text-[#17665F] shrink-0" />
          <span>{hours}</span>
        </div>
      </div>
    </div>
  );
}
