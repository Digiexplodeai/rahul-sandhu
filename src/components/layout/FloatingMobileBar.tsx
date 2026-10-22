"use client";

import React from "react";
import { Phone, MessageCircle, Calendar, MapPin } from "lucide-react";

export default function FloatingMobileBar() {
  const openAppointmentModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-appointment-modal"));
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#142B3D]/98 backdrop-blur-md border-t border-white/10 px-3 py-2 shadow-2xl safe-area-inset-bottom">
      <div className="grid grid-cols-4 gap-2 text-center">
        {/* Call */}
        <a
          href="tel:+919888970519"
          id="mobile-action-call"
          className="flex flex-col items-center justify-center py-1 text-[#D6DFE4] hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FAFBF9] mb-1">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium tracking-wide">Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/919888970519?text=Hello%20Dr.%20Rahul%20Sandhu,%20I%20would%20like%20to%20enquire%20about%20a%20cancer%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-action-whatsapp"
          className="flex flex-col items-center justify-center py-1 text-[#D6DFE4] hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] mb-1">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium tracking-wide">WhatsApp</span>
        </a>

        {/* Appointment */}
        <button
          onClick={openAppointmentModal}
          id="mobile-action-appointment"
          className="flex flex-col items-center justify-center py-1 text-[#FAFBF9] hover:text-white transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#17665F] flex items-center justify-center text-white mb-1 shadow-xs">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold text-[#EEF2F1] tracking-wide">Book</span>
        </button>

        {/* Location */}
        <a
          href="https://maps.google.com/?q=Shalby+Hospital+Mohali"
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-action-location"
          className="flex flex-col items-center justify-center py-1 text-[#D6DFE4] hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FAFBF9] mb-1">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium tracking-wide">Location</span>
        </a>
      </div>
    </div>
  );
}
