"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Calendar,
  Phone,
  Star,
  FileText,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  logoUrl?: string;
}

export default function Navbar({
  logoUrl = "/images/dr-rahul-sandhu-official-logo.png",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPatientCareOpen, setIsPatientCareOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsPatientCareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const openAppointmentModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-appointment-modal"));
    }
  };

  const patientCareItems = [
    {
      name: "Patient Reviews",
      href: "/testimonials",
      icon: Star,
      desc: "Verified patient experiences and recovery stories",
    },
    {
      name: "Patient Resources",
      href: "/resources",
      icon: FileText,
      desc: "Surgery prep guidelines, diet & care instructions",
    },
    {
      name: "Frequently Asked Questions",
      href: "/faqs",
      icon: HelpCircle,
      desc: "Common inquiries about cancer surgery & recovery",
    },
  ];

  const isPatientCareActive =
    pathname === "/testimonials" ||
    pathname === "/resources" ||
    pathname === "/faqs";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Specialities", href: "/specialities" },
    { name: "Treatments", href: "/treatments" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#142B3D]/98 backdrop-blur-md shadow-[0_4px_24px_rgba(20,43,61,0.28)] border-b border-white/10 py-0"
            : "bg-[#142B3D] border-b border-white/10 py-1"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Official Glowing Brand Logo — Transparent directly on dark navy navbar */}
            <Link
              href="/"
              className="brand-logo-link shrink-0 py-1 transition-transform duration-200 hover:opacity-95"
              aria-label="Dr. Rahul Sandhu — Surgical Oncology"
            >
              <Image
                src={logoUrl || "/images/dr-rahul-sandhu-official-logo.png"}
                alt="Dr. Rahul Sandhu — Surgical Oncology"
                width={250}
                height={84}
                priority
                loading="eager"
                style={{ width: "auto" }}
                className="w-[160px] sm:w-[190px] md:w-[220px] lg:w-[240px] xl:w-[250px] max-h-[72px] h-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors rounded-lg group ${
                      isActive
                        ? "text-[#FAFBF9] font-semibold bg-white/10"
                        : "text-[#D6DFE4] hover:text-[#FAFBF9] hover:bg-white/5"
                    }`}
                  >
                    <span>{link.name}</span>
                    {/* Animated Underline */}
                    <span
                      className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#45DDC8] rounded-full transition-transform duration-250 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* Patient Care Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsPatientCareOpen(true)}
                onMouseLeave={() => setIsPatientCareOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsPatientCareOpen(!isPatientCareOpen)}
                  className={`group relative flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors rounded-lg cursor-pointer ${
                    isPatientCareActive
                      ? "text-[#FAFBF9] font-semibold bg-white/10"
                      : "text-[#D6DFE4] hover:text-[#FAFBF9] hover:bg-white/5"
                  }`}
                  aria-expanded={isPatientCareOpen}
                >
                  <span>Patient Care</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-250 ${
                      isPatientCareOpen ? "rotate-180 text-[#FAFBF9]" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#45DDC8] rounded-full transition-transform duration-250 origin-left ${
                      isPatientCareActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isPatientCareOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 mt-1.5 w-76 bg-[#1A3449] border border-white/15 rounded-xl shadow-2xl p-2 z-50 overflow-hidden backdrop-blur-md"
                    >
                      {patientCareItems.map((item) => {
                        const Icon = item.icon;
                        const isSubActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsPatientCareOpen(false)}
                            className={`flex items-start gap-3 p-2.5 rounded-lg transition-all duration-150 ${
                              isSubActive
                                ? "bg-white/15 text-[#FAFBF9]"
                                : "text-[#D6DFE4] hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#FAFBF9]">
                              <Icon className="w-4 h-4 text-[#EEF2F1]" />
                            </div>
                            <div>
                              <span className="block text-xs font-semibold text-[#FAFBF9]">
                                {item.name}
                              </span>
                              <span className="block text-[11px] text-[#D6DFE4]/75 leading-snug mt-0.5">
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/blog"
                className={`relative px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors rounded-lg group ${
                  pathname.startsWith("/blog")
                    ? "text-[#FAFBF9] font-semibold bg-white/10"
                    : "text-[#D6DFE4] hover:text-[#FAFBF9] hover:bg-white/5"
                }`}
              >
                <span>Blog</span>
                <span
                  className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#45DDC8] rounded-full transition-transform duration-250 origin-left ${
                    pathname.startsWith("/blog") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              <Link
                href="/contact"
                className={`relative px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors rounded-lg group ${
                  pathname === "/contact"
                    ? "text-[#FAFBF9] font-semibold bg-white/10"
                    : "text-[#D6DFE4] hover:text-[#FAFBF9] hover:bg-white/5"
                }`}
              >
                <span>Contact</span>
                <span
                  className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#45DDC8] rounded-full transition-transform duration-250 origin-left ${
                    pathname === "/contact" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            </nav>

            {/* Right Action CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={openAppointmentModal}
                className="group relative hidden sm:inline-flex items-center gap-2 bg-[#17665F] hover:bg-[#124F4A] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg active:scale-98 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/15 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <Calendar className="relative z-10 w-3.5 h-3.5" />
                <span className="relative z-10">Book Consultation</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#D6DFE4] hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer with Spring Physics */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden"
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#142B3D] z-50 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto border-l border-white/10 lg:hidden"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="brand-logo-link"
                    aria-label="Dr. Rahul Sandhu — Surgical Oncology"
                  >
                    <Image
                      src={logoUrl || "/images/dr-rahul-sandhu-official-logo.png"}
                      alt="Dr. Rahul Sandhu — Surgical Oncology"
                      width={180}
                      height={60}
                      style={{ width: "auto" }}
                      className="w-[160px] max-h-[54px] h-auto object-contain"
                    />
                  </Link>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#D6DFE4] hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Links with Stagger */}
                <nav className="py-5 space-y-1">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About Doctor", href: "/about" },
                    { name: "Cancer Specialities", href: "/specialities" },
                    { name: "Surgical Treatments", href: "/treatments" },
                    { name: "Patient Reviews", href: "/testimonials" },
                    { name: "Health Blog", href: "/blog" },
                    { name: "Patient Resources", href: "/resources" },
                    { name: "FAQs", href: "/faqs" },
                    { name: "Hospital Locations & Contact", href: "/contact" },
                  ].map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + idx * 0.03 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-white/15 text-[#FAFBF9] font-semibold"
                              : "text-[#D6DFE4] hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-white/50" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Actions at bottom */}
              <div className="pt-5 border-t border-white/10 space-y-2.5">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openAppointmentModal();
                  }}
                  className="w-full bg-[#17665F] hover:bg-[#124F4A] text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>

                <a
                  href="tel:+919888970519"
                  className="w-full border border-white/20 hover:bg-white/10 text-[#FAFBF9] py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: +91 98889 70519</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
