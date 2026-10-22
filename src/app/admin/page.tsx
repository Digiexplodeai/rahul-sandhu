"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  Settings,
  Layers,
  FileText,
  Scissors,
  Users,
  MessageSquare,
  Search,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  ArrowUpDown,
  Lock,
} from "lucide-react";
import type { Specialty, Treatment, Blog, Testimonial, Enquiry } from "@/lib/queries";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "enquiries" | "settings" | "sections" | "specialties" | "treatments" | "blogs" | "testimonials" | "seo"
  >("enquiries");

  // State data
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Editing state for modals
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const loadAllData = async () => {
    try {
      const [resEnq, resSet, resSpec, resTreat, resBlog, resTest] = await Promise.all([
        fetch("/api/admin/enquiries").then((r) => r.json()),
        fetch("/api/admin/settings").then((r) => r.json()),
        fetch("/api/admin/specialties").then((r) => r.json()),
        fetch("/api/admin/treatments").then((r) => r.json()),
        fetch("/api/admin/blogs").then((r) => r.json()),
        fetch("/api/admin/testimonials").then((r) => r.json()),
      ]);

      if (resEnq.data) setEnquiries(resEnq.data);
      if (resSet.settings) setSettings(resSet.settings);
      if (resSpec.data) setSpecialties(resSpec.data);
      if (resTreat.data) setTreatments(resTreat.data);
      if (resBlog.data) setBlogs(resBlog.data);
      if (resTest.data) setTestimonials(resTest.data);
    } catch (err) {
      console.error("Error loading admin data:", err);
    }
  };

  // Check auth on mount
  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch("/api/admin/check-auth");
        if (ignore) return;
        if (res.ok) {
          setIsAuthenticated(true);
          loadAllData();
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        if (!ignore) {
          setIsAuthenticated(false);
        }
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        loadAllData();
      } else {
        setLoginError("Invalid username or password. Default is admin / admin123");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        showNotify("Site settings saved & persisted to database!");
      }
    } catch {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const updateEnquiryStatus = async (id: string, status: string) => {
    await fetch("/api/admin/enquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    showNotify(`Enquiry marked as ${status}`);
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    await fetch(`/api/admin/enquiries?id=${id}`, { method: "DELETE" });
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    showNotify("Enquiry deleted");
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#A78248] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-[#E4DCD3] shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#EDE5D9] border border-[#A78248]/40 flex items-center justify-center text-[#A78248] shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#242424]">
              Doctor Admin Portal
            </h1>
            <p className="text-xs text-[#766352]">
              Lt Col (Dr) Rahul Sandhu — Surgical Oncology
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#766352] mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-sm focus:outline-none focus:border-[#A78248]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#766352] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-sm focus:outline-none focus:border-[#A78248]"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-gold py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-center shadow-md"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="text-center text-[11px] text-[#766352] pt-2 border-t border-[#E4DCD3]">
            Default credentials: <code className="bg-[#F8F5F0] px-1 py-0.5 rounded">admin</code> / <code className="bg-[#F8F5F0] px-1 py-0.5 rounded">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  // Parse Section visibility and order
  const visibility = settings.section_visibility
    ? JSON.parse(settings.section_visibility)
    : {};

  const toggleSection = (key: string) => {
    const updated = { ...visibility, [key]: !visibility[key] };
    setSettings((prev) => ({
      ...prev,
      section_visibility: JSON.stringify(updated),
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col font-sans text-[#242424]">
      {/* Top Navbar */}
      <header className="bg-[#242424] text-white px-6 py-4 flex items-center justify-between border-b border-[#A78248]/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#333333] border border-[#A78248] flex items-center justify-center text-[#C49F60]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold leading-tight">
              Lt Col (Dr) Rahul Sandhu
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#C49F60]">
              Administration & CMS Control Center
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-[#EDE5D9]/80 hover:text-white transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <span className="text-white/20">|</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-[#242424] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#A78248] text-xs flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-[#C49F60]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Admin Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white p-4 rounded-2xl border border-[#E4DCD3] shadow-sm space-y-1">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "enquiries"
                ? "bg-[#EDE5D9] text-[#876632]"
                : "text-[#766352] hover:bg-[#F8F5F0]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-[#A78248]" />
              <span>Patient Enquiries</span>
            </span>
            <span className="bg-[#A78248] text-white px-2 py-0.5 rounded-full text-[10px]">
              {enquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "settings"
                ? "bg-[#EDE5D9] text-[#876632]"
                : "text-[#766352] hover:bg-[#F8F5F0]"
            }`}
          >
            <Settings className="w-4 h-4 text-[#A78248]" />
            <span>Hero & General Text</span>
          </button>

          <button
            onClick={() => setActiveTab("sections")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "sections"
                ? "bg-[#EDE5D9] text-[#876632]"
                : "text-[#766352] hover:bg-[#F8F5F0]"
            }`}
          >
            <Layers className="w-4 h-4 text-[#A78248]" />
            <span>Section Show/Hide</span>
          </button>

          <button
            onClick={() => setActiveTab("specialties")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "specialties"
                ? "bg-[#EDE5D9] text-[#876632]"
                : "text-[#766352] hover:bg-[#F8F5F0]"
            }`}
          >
            <Shield className="w-4 h-4 text-[#A78248]" />
            <span>Cancer Specialities ({specialties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("treatments")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "treatments"
                ? "bg-[#EDE5D9] text-[#876632]"
                : "text-[#766352] hover:bg-[#F8F5F0]"
            }`}
          >
            <Scissors className="w-4 h-4 text-[#A78248]" />
            <span>Surgical Treatments ({treatments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "blogs"
                ? "bg-[#EDE5D9] text-[#876632]"
                : "text-[#766352] hover:bg-[#F8F5F0]"
            }`}
          >
            <FileText className="w-4 h-4 text-[#A78248]" />
            <span>Health Blogs ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "testimonials"
                ? "bg-[#EDE5D9] text-[#876632]"
                : "text-[#766352] hover:bg-[#F8F5F0]"
            }`}
          >
            <Users className="w-4 h-4 text-[#A78248]" />
            <span>Testimonials ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("seo")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "seo"
                ? "bg-[#EDE5D9] text-[#876632]"
                : "text-[#766352] hover:bg-[#F8F5F0]"
            }`}
          >
            <Search className="w-4 h-4 text-[#A78248]" />
            <span>SEO & Meta Tags</span>
          </button>
        </aside>

        {/* Right Active Workspace Panel */}
        <main className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-2xl border border-[#E4DCD3] shadow-sm">
          
          {/* TAB 1: ENQUIRIES */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DCD3] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#242424]">
                    Patient Consultation Enquiries
                  </h2>
                  <p className="text-xs text-[#766352]">
                    Online booking requests and appointment forms submitted by patients.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EDE5D9] text-[#876632]">
                  Total: {enquiries.length}
                </span>
              </div>

              {enquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#766352]">
                  No consultation enquiries submitted yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 rounded-2xl border border-[#E4DCD3] bg-[#F8F5F0] flex flex-col justify-between space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif text-lg font-bold text-[#242424]">
                              {enq.patient_name}
                            </h3>
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                enq.status === "new"
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : enq.status === "contacted"
                                  ? "bg-blue-100 text-blue-800 border border-blue-300"
                                  : enq.status === "scheduled"
                                  ? "bg-green-100 text-green-800 border border-green-300"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {enq.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#766352] mt-1.5">
                            <span className="flex items-center gap-1 font-semibold text-[#242424]">
                              <Phone className="w-3.5 h-3.5 text-[#A78248]" />
                              <a href={`tel:${enq.phone}`}>{enq.phone}</a>
                            </span>
                            {enq.email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 text-[#A78248]" />
                                <a href={`mailto:${enq.email}`}>{enq.email}</a>
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#A78248]" />
                              <span>{enq.preferred_location}</span>
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] text-[#766352]">
                          {enq.created_at ? new Date(enq.created_at).toLocaleString() : ""}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-[#E4DCD3]/60 text-xs text-[#242424] space-y-1">
                        <div className="font-semibold text-[#876632]">
                          Condition: {enq.cancer_type}
                        </div>
                        {enq.preferred_date && (
                          <div className="text-[#766352]">Preferred Date: {enq.preferred_date}</div>
                        )}
                        {enq.message && <p className="pt-1 italic text-[#555]">{enq.message}</p>}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E4DCD3]">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-[#766352]">Update Status:</span>
                          <button
                            onClick={() => updateEnquiryStatus(enq.id, "contacted")}
                            className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                          >
                            Contacted
                          </button>
                          <button
                            onClick={() => updateEnquiryStatus(enq.id, "scheduled")}
                            className="px-2.5 py-1 rounded-md bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                          >
                            Scheduled
                          </button>
                          <button
                            onClick={() => updateEnquiryStatus(enq.id, "closed")}
                            className="px-2.5 py-1 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                          >
                            Closed
                          </button>
                        </div>

                        <button
                          onClick={() => deleteEnquiry(enq.id)}
                          className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GENERAL SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DCD3] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#242424]">
                    Hero & General Content
                  </h2>
                  <p className="text-xs text-[#766352]">
                    Edit headlines, subtitles, contact numbers, doctor portrait URL, and clinic information.
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="btn-gold px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#766352] mb-1">
                      Top Bar Contact Phone
                    </label>
                    <input
                      type="text"
                      value={settings.topbar_phone || ""}
                      onChange={(e) => setSettings({ ...settings, topbar_phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#766352] mb-1">
                      Top Bar Contact Email
                    </label>
                    <input
                      type="text"
                      value={settings.topbar_email || ""}
                      onChange={(e) => setSettings({ ...settings, topbar_email: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#766352] mb-1">
                    Hero Eyebrow (Gold Tag)
                  </label>
                  <input
                    type="text"
                    value={settings.hero_eyebrow || ""}
                    onChange={(e) => setSettings({ ...settings, hero_eyebrow: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#766352] mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={settings.hero_headline || ""}
                    onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#766352] mb-1">
                    Hero Subheading
                  </label>
                  <textarea
                    rows={3}
                    value={settings.hero_subheading || ""}
                    onChange={(e) => setSettings({ ...settings, hero_subheading: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#766352] mb-1">
                    Doctor Portrait Image Path / URL
                  </label>
                  <input
                    type="text"
                    value={settings.hero_doctor_image || ""}
                    onChange={(e) => setSettings({ ...settings, hero_doctor_image: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                  />
                  <span className="text-[10px] text-[#766352]">
                    Default: /images/reassuring-oncology-clinic-care.png
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#766352] mb-1">
                    Official Website Logo Path / URL
                  </label>
                  <input
                    type="text"
                    value={settings.site_logo || "/images/dr-rahul-sandhu-official-logo.png"}
                    onChange={(e) => setSettings({ ...settings, site_logo: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                  />
                  <span className="text-[10px] text-[#766352]">
                    Default: /images/dr-rahul-sandhu-official-logo.png
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4DCD3]">
                  <h3 className="font-serif text-lg font-bold text-[#242424] mb-3">
                    About Section Biography
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#766352] mb-1">
                        Doctor Quote
                      </label>
                      <textarea
                        rows={2}
                        value={settings.about_quote || ""}
                        onChange={(e) => setSettings({ ...settings, about_quote: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#766352] mb-1">
                        Bio Paragraph 1
                      </label>
                      <textarea
                        rows={3}
                        value={settings.about_bio_p1 || ""}
                        onChange={(e) => setSettings({ ...settings, about_bio_p1: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#766352] mb-1">
                        Military Experience Narrative
                      </label>
                      <textarea
                        rows={3}
                        value={settings.about_bio_p2 || ""}
                        onChange={(e) => setSettings({ ...settings, about_bio_p2: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E4DCD3]">
                  <h3 className="font-serif text-lg font-bold text-[#242424] mb-3">
                    Hospital Clinic Locations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#766352] mb-1">
                        Hospital 1 Name
                      </label>
                      <input
                        type="text"
                        value={settings.clinic1_name || ""}
                        onChange={(e) => setSettings({ ...settings, clinic1_name: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#766352] mb-1">
                        Hospital 2 Name
                      </label>
                      <input
                        type="text"
                        value={settings.clinic2_name || ""}
                        onChange={(e) => setSettings({ ...settings, clinic2_name: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSaveSettings}
                    disabled={saving}
                    className="btn-gold px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? "Saving..." : "Save All Settings"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECTION VISIBILITY */}
          {activeTab === "sections" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DCD3] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#242424]">
                    Homepage Section Manager
                  </h2>
                  <p className="text-xs text-[#766352]">
                    Toggle visibility for individual sections across the homepage.
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="btn-gold px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save Toggles"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "topbar", label: "Top Utility Contact Bar" },
                  { key: "hero", label: "Editorial Split-Screen Hero" },
                  { key: "highlights", label: "4 Horizontal Expertise Highlights" },
                  { key: "about", label: "About Doctor & Qualifications" },
                  { key: "specialties", label: "Cancer Specialities (6 Cards)" },
                  { key: "treatments", label: "Surgical Treatments (8 Cards)" },
                  { key: "why_choose", label: "Why Choose Dr. Rahul Sandhu" },
                  { key: "timeline", label: "Professional Career Timeline" },
                  { key: "testimonials", label: "Patient Testimonials & Reviews" },
                  { key: "blogs", label: "Health Insights & Latest Blogs" },
                  { key: "cta", label: "Dark Charcoal Consultation Banner" },
                  { key: "contact", label: "Hospital Locations & Contact Form" },
                ].map((sec) => {
                  const isVisible = visibility[sec.key] !== false;
                  return (
                    <div
                      key={sec.key}
                      className="p-4 rounded-xl border border-[#E4DCD3] bg-[#F8F5F0] flex items-center justify-between"
                    >
                      <span className="text-xs font-semibold text-[#242424]">{sec.label}</span>
                      <button
                        onClick={() => toggleSection(sec.key)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          isVisible
                            ? "bg-green-100 text-green-800 border border-green-300"
                            : "bg-red-100 text-red-800 border border-red-300"
                        }`}
                      >
                        {isVisible ? "Active / Shown" : "Hidden"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: CANCER SPECIALTIES */}
          {activeTab === "specialties" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DCD3] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#242424]">
                    Cancer Specialities
                  </h2>
                  <p className="text-xs text-[#766352]">
                    Manage cancer condition detail pages, clinical staging, and descriptions.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {specialties.map((spec) => (
                  <div
                    key={spec.id}
                    className="p-4 rounded-xl border border-[#E4DCD3] bg-[#F8F5F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#242424]">
                        {spec.title}
                      </h3>
                      <p className="text-xs text-[#876632]">{spec.subtitle}</p>
                      <p className="text-xs text-[#766352] line-clamp-1 mt-1">{spec.excerpt}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href={`/specialities/${spec.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-white border border-[#E4DCD3] text-[#766352] hover:text-[#A78248]"
                        title="View Live Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SURGICAL TREATMENTS */}
          {activeTab === "treatments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DCD3] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#242424]">
                    Surgical Treatments
                  </h2>
                  <p className="text-xs text-[#766352]">
                    Manage surgical procedures, step-by-step guides, and recovery indications.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {treatments.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl border border-[#E4DCD3] bg-[#F8F5F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#242424]">{t.title}</h3>
                      <p className="text-xs text-[#876632]">{t.subtitle}</p>
                      <p className="text-xs text-[#766352] line-clamp-1 mt-1">{t.excerpt}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href={`/treatments/${t.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-white border border-[#E4DCD3] text-[#766352] hover:text-[#A78248]"
                        title="View Live Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BLOG ARTICLES */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DCD3] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#242424]">
                    Health Blogs & Awareness Articles
                  </h2>
                  <p className="text-xs text-[#766352]">
                    Publish and edit informative clinical articles.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {blogs.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-xl border border-[#E4DCD3] bg-[#F8F5F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#876632]">
                        {b.category} • {b.published_date}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#242424] mt-0.5">{b.title}</h3>
                      <p className="text-xs text-[#766352] line-clamp-1 mt-1">{b.excerpt}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href={`/blog/${b.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-white border border-[#E4DCD3] text-[#766352] hover:text-[#A78248]"
                        title="View Live Article"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DCD3] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#242424]">
                    Patient Testimonials
                  </h2>
                  <p className="text-xs text-[#766352]">
                    Manage patient reviews and Google verification tags.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {testimonials.map((test) => (
                  <div
                    key={test.id}
                    className="p-4 rounded-xl border border-[#E4DCD3] bg-[#F8F5F0] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-base font-bold text-[#242424]">
                        {test.author_name} ({test.author_location})
                      </h3>
                      <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                        {test.source}
                      </span>
                    </div>
                    <p className="text-xs text-[#766352] italic">“{test.content}”</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SEO & META */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DCD3] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#242424]">
                    SEO & Meta Information
                  </h2>
                  <p className="text-xs text-[#766352]">
                    Update global meta titles, description, and search keywords.
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="btn-gold px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save SEO"}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#766352] mb-1">
                    Global Page Title
                  </label>
                  <input
                    type="text"
                    value={settings.seo_meta_title || ""}
                    onChange={(e) => setSettings({ ...settings, seo_meta_title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#766352] mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={settings.seo_meta_description || ""}
                    onChange={(e) =>
                      setSettings({ ...settings, seo_meta_description: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#766352] mb-1">
                    SEO Keywords (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={settings.seo_keywords || ""}
                    onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E4DCD3] text-xs"
                  />
                </div>
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
