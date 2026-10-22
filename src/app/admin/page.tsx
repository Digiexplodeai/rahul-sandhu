"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  Home,
  FileText,
  Layers,
  Scissors,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Video,
  HelpCircle,
  Users,
  MapPin,
  Compass,
  Search,
  Globe,
  Lock,
  History,
  Database as DatabaseIcon,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Download,
  Upload,
  RefreshCw,
  Copy,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import type {
  Specialty,
  Treatment,
  Blog,
  Testimonial,
  Video as VideoItem,
  FAQ,
  Enquiry,
  MediaAsset,
  PageItem,
  ActivityLog,
  AdminUser,
} from "@/lib/queries";

type AdminTab =
  | "overview"
  | "homepage"
  | "pages"
  | "specialties"
  | "treatments"
  | "blogs"
  | "media"
  | "testimonials"
  | "videos"
  | "faqs"
  | "enquiries"
  | "clinics"
  | "navigation"
  | "seo"
  | "users"
  | "logs"
  | "backup";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id?: string; username: string; role: string } | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Data states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [mediaAssets, setMediaAssets] = useState<(MediaAsset & { usages?: string[] })[]>([]);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  // Modals & form states
  const [editingSpecialty, setEditingSpecialty] = useState<Partial<Specialty> | null>(null);
  const [editingTreatment, setEditingTreatment] = useState<Partial<Treatment> | null>(null);
  const [editingBlog, setEditingBlog] = useState<Partial<Blog> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingVideo, setEditingVideo] = useState<Partial<VideoItem> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ> | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [enquiryNotesInput, setEnquiryNotesInput] = useState("");

  // Password change state
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");

  // New admin user state
  const [newAdminUser, setNewAdminUser] = useState("");
  const [newAdminPass, setNewAdminPass] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("Admin");

  // Media upload input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const loadAllData = async () => {
    try {
      const [
        resEnq,
        resSet,
        resSpec,
        resTreat,
        resBlog,
        resTest,
        resVid,
        resFaq,
        resMedia,
        resPages,
        resLogs,
        resUsers,
      ] = await Promise.all([
        fetch("/api/admin/enquiries").then((r) => r.json()),
        fetch("/api/admin/settings").then((r) => r.json()),
        fetch("/api/admin/specialties").then((r) => r.json()),
        fetch("/api/admin/treatments").then((r) => r.json()),
        fetch("/api/admin/blogs").then((r) => r.json()),
        fetch("/api/admin/testimonials").then((r) => r.json()),
        fetch("/api/admin/videos").then((r) => r.json()),
        fetch("/api/admin/faqs").then((r) => r.json()),
        fetch("/api/admin/media").then((r) => r.json()),
        fetch("/api/admin/pages").then((r) => r.json()),
        fetch("/api/admin/logs?limit=40").then((r) => r.json()),
        fetch("/api/admin/users").then((r) => r.json()),
      ]);

      if (resEnq?.data) setEnquiries(resEnq.data);
      if (resSet?.settings) setSettings(resSet.settings);
      if (resSpec?.data) setSpecialties(resSpec.data);
      if (resTreat?.data) setTreatments(resTreat.data);
      if (resBlog?.data) setBlogs(resBlog.data);
      if (resTest?.data) setTestimonials(resTest.data);
      if (resVid?.data) setVideos(resVid.data);
      if (resFaq?.data) setFaqs(resFaq.data);
      if (resMedia?.data) setMediaAssets(resMedia.data);
      if (resPages?.data) setPages(resPages.data);
      if (resLogs?.data) setActivityLogs(resLogs.data);
      if (resUsers?.data) setAdminUsers(resUsers.data);
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
          const data = await res.json();
          setIsAuthenticated(true);
          if (data.user) setCurrentUser(data.user);
          loadAllData();
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        if (!ignore) setIsAuthenticated(false);
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
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        if (data.user) setCurrentUser(data.user);
        loadAllData();
        showNotify("Signed in securely to Dr. Rahul Sandhu Administration.");
      } else {
        setLoginError(data.error || "Invalid username or password.");
      }
    } catch {
      setLoginError("Network connection error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setCurrentUser(null);
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
        showNotify("Website settings saved and updated across live public site!");
      } else {
        alert("Failed to save settings.");
      }
    } catch {
      alert("Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  // Status updates for enquiries
  const updateEnquiryStatus = async (id: string, status: string, notes?: string) => {
    await fetch("/api/admin/enquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, notes }),
    });
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status, notes: notes !== undefined ? notes : e.notes } : e)));
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status, notes: notes !== undefined ? notes : prev.notes } : null));
    }
    showNotify(`Lead status updated to ${status}`);
  };

  const deleteEnquiryItem = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this patient enquiry?")) return;
    await fetch(`/api/admin/enquiries?id=${id}`, { method: "DELETE" });
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    showNotify("Enquiry permanently deleted.");
  };

  // Media upload handler
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingMedia(true);
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        showNotify("Media uploaded to persistent media storage!");
        // Refresh media library
        const updated = await fetch("/api/admin/media").then((r) => r.json());
        if (updated.data) setMediaAssets(updated.data);
      } else {
        alert(data.error || "Media upload failed");
      }
    } catch {
      alert("Upload network error");
    } finally {
      setIsUploadingMedia(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const deleteMediaItem = async (id: string) => {
    if (!confirm("Permanently delete this media asset?")) return;
    const res = await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      setMediaAssets((prev) => prev.filter((m) => m.id !== id));
      showNotify("Media asset deleted.");
    } else {
      if (data.usages && confirm(`${data.error}\n\nDo you want to FORCE delete anyway?`)) {
        await fetch(`/api/admin/media?id=${id}&force=true`, { method: "DELETE" });
        setMediaAssets((prev) => prev.filter((m) => m.id !== id));
        showNotify("Media asset force deleted.");
      } else {
        alert(data.error);
      }
    }
  };

  // Password change handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    if (newPass !== confirmPass) {
      setPassError("New password and confirm password do not match.");
      return;
    }
    if (newPass.length < 8) {
      setPassError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currPass, newPassword: newPass }),
      });
      const data = await res.json();
      if (res.ok) {
        showNotify("Password changed and secured with PBKDF2 hashing!");
        setCurrPass("");
        setNewPass("");
        setConfirmPass("");
      } else {
        setPassError(data.error || "Error changing password");
      }
    } catch {
      setPassError("Connection error. Try again.");
    }
  };

  // Create admin user
  const handleCreateAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newAdminUser,
          password: newAdminPass,
          role: newAdminRole,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showNotify("New admin account created successfully!");
        setNewAdminUser("");
        setNewAdminPass("");
        const resUsers = await fetch("/api/admin/users").then((r) => r.json());
        if (resUsers.data) setAdminUsers(resUsers.data);
      } else {
        alert(data.error || "Error creating user");
      }
    } catch {
      alert("Error creating user");
    }
  };

  // Toggle homepage sections
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

  // LOADING STATE
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FAFBF9] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#17665F] border-t-transparent rounded-full animate-spin" />
        <p className="font-serif text-sm text-[#142B3D] tracking-wide">
          Verifying Surgical Oncology Security Session...
        </p>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#102D3D] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#142B3D] border border-[#45DDC8]/40 flex items-center justify-center text-[#45DDC8] shadow-md">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#142B3D]">
              Medical Administration
            </h1>
            <p className="text-xs text-[#5C707A]">
              Lt Col (Dr) Rahul Sandhu — Surgical Oncology CMS
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#142B3D] mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter administrator username"
                className="w-full px-4 py-3 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] text-sm text-[#142B3D] focus:outline-none focus:border-[#17665F] focus:ring-1 focus:ring-[#17665F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#142B3D] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secure password"
                className="w-full px-4 py-3 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] text-sm text-[#142B3D] focus:outline-none focus:border-[#17665F] focus:ring-1 focus:ring-[#17665F]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#142B3D] hover:bg-[#17665F] text-white py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate &amp; Access CMS</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center text-[11px] text-[#5C707A] pt-3 border-t border-[#E2E7E4]">
            Protected Medical System • PBKDF2 Encrypted • Rate Limited
          </div>
        </div>
      </div>
    );
  }

  // Calculations for Overview Dashboard metrics
  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;
  const scheduledCount = enquiries.filter((e) => e.status === "scheduled" || e.status === "Appointment Scheduled").length;
  const publishedSpecialtiesCount = specialties.filter((s) => s.is_published).length;
  const publishedTreatmentsCount = treatments.filter((t) => t.is_published).length;
  const publishedBlogsCount = blogs.filter((b) => b.is_published).length;

  return (
    <div className="min-h-screen bg-[#F4F6F4] flex flex-col font-sans text-[#142B3D]">
      {/* Top Header */}
      <header className="bg-[#102D3D] text-white px-5 sm:px-8 py-3.5 flex items-center justify-between border-b border-white/10 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#142B3D] border border-[#45DDC8]/60 flex items-center justify-center text-[#45DDC8]">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-serif text-base sm:text-lg font-bold leading-tight">
              Lt Col (Dr) Rahul Sandhu
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#45DDC8]">
              Centralized Clinical CMS &amp; Practice Operations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-white/80 hover:text-[#45DDC8] transition-colors"
          >
            <span>Live Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <span className="hidden sm:inline text-white/20">|</span>
          <div className="flex items-center gap-2 text-white/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden md:inline font-medium text-[11px]">{currentUser?.username || "Admin"}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-rose-300 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace (Sidebar + Dynamic Workspace) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-[#142B3D] text-[#D6DFE4] shrink-0 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#D6DFE4]/50" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#45DDC8]"
              />
            </div>
          </div>

          <nav className="p-3 space-y-1 flex-1 overflow-y-auto max-h-[calc(100vh-140px)] text-xs">
            {/* Core Section */}
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#45DDC8]/70 px-3 py-1">
              Main Dashboard
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "overview" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview Metrics</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("enquiries")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "enquiries" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Patient Enquiries</span>
              </div>
              {newEnquiriesCount > 0 && (
                <span className="bg-amber-400 text-black font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                  {newEnquiriesCount}
                </span>
              )}
            </button>

            {/* Content & Clinical CMS Section */}
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#45DDC8]/70 px-3 pt-3 py-1">
              Content &amp; Clinical CMS
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("homepage")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "homepage" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Homepage Manager</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pages")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "pages" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Pages &amp; SEO</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("specialties")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "specialties" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>Cancer Specialities</span>
              </div>
              <span className="text-[10px] text-white/50">{specialties.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("treatments")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "treatments" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Scissors className="w-4 h-4" />
                <span>Surgical Treatments</span>
              </div>
              <span className="text-[10px] text-white/50">{treatments.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "blogs" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Blogs &amp; Articles</span>
              </div>
              <span className="text-[10px] text-white/50">{blogs.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("media")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "media" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4" />
                <span>Media Library</span>
              </div>
              <span className="text-[10px] text-white/50">{mediaAssets.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "testimonials" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Testimonials &amp; Reviews</span>
              </div>
              <span className="text-[10px] text-white/50">{testimonials.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("videos")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "videos" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4" />
                <span>Clinical Videos</span>
              </div>
              <span className="text-[10px] text-white/50">{videos.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("faqs")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "faqs" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4" />
                <span>FAQs Manager</span>
              </div>
              <span className="text-[10px] text-white/50">{faqs.length}</span>
            </button>

            {/* Practice Configuration */}
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#45DDC8]/70 px-3 pt-3 py-1">
              Configuration &amp; System
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("clinics")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "clinics" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Clinics &amp; Maps</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("navigation")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "navigation" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Navigation &amp; Footer</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("seo")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "seo" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>SEO &amp; Metadata</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "users" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Security &amp; Password</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("logs")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "logs" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <History className="w-4 h-4" />
              <span>Activity Audit Logs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("backup")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "backup" ? "bg-[#17665F] text-white shadow-xs" : "hover:bg-white/5 text-[#D6DFE4]"
              }`}
            >
              <DatabaseIcon className="w-4 h-4" />
              <span>Backup &amp; Database</span>
            </button>
          </nav>
        </aside>

        {/* Dynamic Workspace Container */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 max-h-[calc(100vh-60px)]">
          {/* Toast Notification */}
          {notification && (
            <div className="fixed top-18 right-8 z-50 bg-[#142B3D] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#45DDC8]/60 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
              <CheckCircle className="w-4 h-4 text-[#45DDC8]" />
              <span>{notification}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW METRICS                                   */}
          {/* ========================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Welcome, Lt Col (Dr) Rahul Sandhu
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Centralized management for medical specialities, patient appointments, and public website content.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("enquiries")}
                    className="bg-[#17665F] hover:bg-[#124F4A] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>View Patient Leads</span>
                  </button>
                  <Link
                    href="/"
                    target="_blank"
                    className="bg-white border border-[#E2E7E4] hover:border-[#17665F] text-[#142B3D] px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#17665F]" />
                    <span>Open Live Website</span>
                  </Link>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E2E7E4] shadow-xs">
                  <div className="flex items-center justify-between text-[#5C707A] mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Total Enquiries</span>
                    <Users className="w-4 h-4 text-[#17665F]" />
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#142B3D]">{enquiries.length}</div>
                  <p className="text-[11px] text-amber-600 mt-1 font-medium">
                    {newEnquiriesCount} new • {scheduledCount} scheduled
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E2E7E4] shadow-xs">
                  <div className="flex items-center justify-between text-[#5C707A] mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Cancer Specialities</span>
                    <Layers className="w-4 h-4 text-[#17665F]" />
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#142B3D]">{specialties.length}</div>
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">
                    {publishedSpecialtiesCount} active on website
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E2E7E4] shadow-xs">
                  <div className="flex items-center justify-between text-[#5C707A] mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Surgical Procedures</span>
                    <Scissors className="w-4 h-4 text-[#17665F]" />
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#142B3D]">{treatments.length}</div>
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">
                    {publishedTreatmentsCount} procedures live
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E2E7E4] shadow-xs">
                  <div className="flex items-center justify-between text-[#5C707A] mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Articles &amp; Guides</span>
                    <BookOpen className="w-4 h-4 text-[#17665F]" />
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#142B3D]">{blogs.length}</div>
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">
                    {publishedBlogsCount} published articles
                  </p>
                </div>
              </div>

              {/* Recent Patient Leads preview */}
              <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-[#142B3D]">
                    Recent Patient Consultation Enquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab("enquiries")}
                    className="text-xs text-[#17665F] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>View All {enquiries.length} Leads</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <p className="text-xs text-[#5C707A] py-6 text-center">No patient enquiries submitted yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E2E7E4] text-[#5C707A]">
                          <th className="pb-2.5 font-semibold">Patient Name</th>
                          <th className="pb-2.5 font-semibold">Contact Phone</th>
                          <th className="pb-2.5 font-semibold">Location</th>
                          <th className="pb-2.5 font-semibold">Cancer Type</th>
                          <th className="pb-2.5 font-semibold">Date Submitted</th>
                          <th className="pb-2.5 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E7E4]/50">
                        {enquiries.slice(0, 5).map((enq) => (
                          <tr key={enq.id} className="hover:bg-[#FAFBF9]">
                            <td className="py-3 font-semibold text-[#142B3D]">{enq.patient_name}</td>
                            <td className="py-3 text-[#17665F] font-mono">{enq.phone}</td>
                            <td className="py-3 text-[#5C707A]">{enq.preferred_location}</td>
                            <td className="py-3 text-[#142B3D]">{enq.cancer_type}</td>
                            <td className="py-3 text-[#5C707A]">
                              {new Date(enq.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                  enq.status === "new"
                                    ? "bg-amber-100 text-amber-800"
                                    : enq.status === "scheduled" || enq.status === "Appointment Scheduled"
                                    ? "bg-blue-100 text-blue-800"
                                    : enq.status === "completed"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {enq.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quick Actions & Recent Activity stream */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs p-6 space-y-3">
                  <h3 className="font-serif text-base font-bold text-[#142B3D]">
                    Quick Content Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => {
                        setEditingSpecialty({
                          title: "",
                          slug: "",
                          subtitle: "",
                          excerpt: "",
                          description: "",
                          symptoms: "",
                          diagnosis: "",
                          surgical_approaches: "",
                          post_care: "",
                          image: "/images/tumor-resection.jpg",
                          order_num: specialties.length + 1,
                          is_published: 1,
                        });
                        setActiveTab("specialties");
                      }}
                      className="p-3 rounded-xl border border-[#E2E7E4] hover:border-[#17665F] text-left hover:bg-[#FAFBF9] transition-colors"
                    >
                      <Plus className="w-4 h-4 text-[#17665F] mb-1" />
                      <div className="font-semibold text-[#142B3D]">Add Speciality</div>
                      <div className="text-[11px] text-[#5C707A]">Create new cancer organ card</div>
                    </button>

                    <button
                      onClick={() => {
                        setEditingTreatment({
                          title: "",
                          slug: "",
                          subtitle: "",
                          excerpt: "",
                          description: "",
                          indications: "",
                          procedure_steps: "",
                          benefits: "",
                          recovery_info: "",
                          image: "/images/tumor-resection.jpg",
                          order_num: treatments.length + 1,
                          is_published: 1,
                        });
                        setActiveTab("treatments");
                      }}
                      className="p-3 rounded-xl border border-[#E2E7E4] hover:border-[#17665F] text-left hover:bg-[#FAFBF9] transition-colors"
                    >
                      <Plus className="w-4 h-4 text-[#17665F] mb-1" />
                      <div className="font-semibold text-[#142B3D]">Add Treatment</div>
                      <div className="text-[11px] text-[#5C707A]">Add surgical procedure</div>
                    </button>

                    <button
                      onClick={() => {
                        setEditingBlog({
                          title: "",
                          slug: "",
                          category: "Cancer Surgery",
                          author: "Lt Col (Dr) Rahul Sandhu",
                          read_time: "5 min read",
                          excerpt: "",
                          content: "",
                          cover_image: "/images/Cancer-Surgery-300x225.png",
                          is_published: 1,
                        });
                        setActiveTab("blogs");
                      }}
                      className="p-3 rounded-xl border border-[#E2E7E4] hover:border-[#17665F] text-left hover:bg-[#FAFBF9] transition-colors"
                    >
                      <Plus className="w-4 h-4 text-[#17665F] mb-1" />
                      <div className="font-semibold text-[#142B3D]">Write Blog Post</div>
                      <div className="text-[11px] text-[#5C707A]">Publish clinical article</div>
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 rounded-xl border border-[#E2E7E4] hover:border-[#17665F] text-left hover:bg-[#FAFBF9] transition-colors"
                    >
                      <Upload className="w-4 h-4 text-[#17665F] mb-1" />
                      <div className="font-semibold text-[#142B3D]">Upload Images</div>
                      <div className="text-[11px] text-[#5C707A]">Add to Media Library</div>
                    </button>
                  </div>
                </div>

                {/* Audit stream */}
                <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base font-bold text-[#142B3D]">
                      Recent Administrative Activity
                    </h3>
                    <button
                      onClick={() => setActiveTab("logs")}
                      className="text-xs text-[#17665F] hover:underline font-semibold"
                    >
                      View All Logs
                    </button>
                  </div>
                  {activityLogs.length === 0 ? (
                    <p className="text-xs text-[#5C707A] py-6 text-center">No logged activity yet.</p>
                  ) : (
                    <div className="space-y-2.5 max-h-56 overflow-y-auto text-xs">
                      {activityLogs.slice(0, 5).map((log) => (
                        <div key={log.id} className="p-2.5 rounded-lg bg-[#FAFBF9] border border-[#E2E7E4] flex items-start gap-2">
                          <History className="w-3.5 h-3.5 text-[#17665F] shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-[#142B3D] truncate">{log.action}</span>
                              <span className="text-[10px] text-[#5C707A]">
                                {new Date(log.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#5C707A] truncate mt-0.5">{log.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: HOMEPAGE MANAGER                                   */}
          {/* ========================================================= */}
          {activeTab === "homepage" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Homepage Section &amp; Content Manager
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Modify headlines, doctor photos, about bio, and toggle live visibility for each homepage section.
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="bg-[#17665F] hover:bg-[#124F4A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? "Saving Changes..." : "Save & Publish"}</span>
                </button>
              </div>

              {/* Section Visibility Toggles */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h3 className="font-serif text-base font-bold text-[#142B3D]">
                  Homepage Section Visibility Controls
                </h3>
                <p className="text-xs text-[#5C707A]">
                  Enable or hide sections from the public homepage with a single click.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                  {[
                    { key: "hero", label: "Hero Banner" },
                    { key: "highlights", label: "Credentials Strip" },
                    { key: "about", label: "About Doctor" },
                    { key: "specialties", label: "Specialities Grid" },
                    { key: "treatments", label: "Treatment Approach" },
                    { key: "testimonials", label: "Patient Reviews" },
                    { key: "blogs", label: "Health Insights" },
                    { key: "contact", label: "Clinic Locations & Form" },
                  ].map((s) => {
                    const isVisible = visibility[s.key] !== false;
                    return (
                      <button
                        type="button"
                        key={s.key}
                        onClick={() => toggleSection(s.key)}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                          isVisible
                            ? "bg-emerald-50/60 border-emerald-300 text-emerald-900"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                        }`}
                      >
                        <span className="font-semibold">{s.label}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isVisible ? "bg-emerald-600 text-white" : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {isVisible ? "VISIBLE" : "HIDDEN"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hero Banner Editor */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#142B3D]">
                      Hero Section Visual Content
                    </h3>
                    <p className="text-xs text-[#5C707A]">
                      Manage the cinematic landing hero image, badge, headlines, and call-to-action buttons.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSettings((prev) => ({
                        ...prev,
                        hero_eyebrow: "SURGICAL ONCOLOGY • PATIENT-CENTRED CARE",
                        hero_headline: "Precision Cancer Surgery. Compassionate Care.",
                        hero_subheading: "Advanced surgical oncology care focused on personalized treatment, clinical expertise, and compassionate patient guidance.",
                        hero_doctor_image: "/images/reassuring-oncology-clinic-care.png",
                        hero_cta_primary_label: "BOOK A CONSULTATION",
                        hero_cta_primary_link: "",
                        hero_cta_secondary_label: "MEET DR. RAHUL SANDHU",
                        hero_cta_secondary_link: "/about",
                      }));
                      showNotify("Reset to original hero content from clinical reference.");
                    }}
                    className="text-xs text-[#17665F] hover:underline font-semibold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Original Design</span>
                  </button>
                </div>

                {/* Hero Live Preview Card */}
                <div className="p-5 rounded-2xl bg-[#102D3D] text-white space-y-3 border border-white/10 shadow-inner relative overflow-hidden">
                  <div className="text-[10px] uppercase tracking-widest text-[#45DDC8] font-semibold">
                    Live Section Preview
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17665F]/45 border border-[#45DDC8]/35 text-[#EEF2F1] text-[10px] font-semibold uppercase tracking-[0.18em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#45DDC8]" />
                    <span>{settings.hero_eyebrow || "SURGICAL ONCOLOGY • PATIENT-CENTRED CARE"}</span>
                  </div>
                  <div className="font-serif text-2xl font-bold leading-tight">
                    <span className="block text-white">
                      {settings.hero_headline?.split(".")?.[0]?.trim() || "Precision Cancer Surgery"}.
                    </span>
                    <span className="block text-[#45DDC8]">
                      {settings.hero_headline?.split(".")?.slice(1)?.join(".")?.trim() || "Compassionate Care."}
                    </span>
                  </div>
                  <p className="text-xs text-[#FAFBF9]/85 max-w-lg leading-relaxed">
                    {settings.hero_subheading || "Advanced surgical oncology care focused on personalized treatment, clinical expertise, and compassionate patient guidance."}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs">
                    <span className="bg-[#17665F] text-white px-4 py-2 rounded-full font-semibold">
                      {settings.hero_cta_primary_label || "BOOK A CONSULTATION"}
                    </span>
                    <span className="border border-white/40 text-white px-4 py-2 rounded-full font-semibold">
                      {settings.hero_cta_secondary_label || "MEET DR. RAHUL SANDHU"} →
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Badge / Eyebrow Text</label>
                    <input
                      type="text"
                      value={settings.hero_eyebrow || ""}
                      onChange={(e) => setSettings({ ...settings, hero_eyebrow: e.target.value })}
                      placeholder="SURGICAL ONCOLOGY • PATIENT-CENTRED CARE"
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">
                      Main Headline (Line 1 &amp; Highlighted Line 2)
                    </label>
                    <input
                      type="text"
                      value={settings.hero_headline || ""}
                      onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
                      placeholder="Precision Cancer Surgery. Compassionate Care."
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                    <span className="text-[10px] text-[#5C707A] mt-1 block">
                      Tip: Separate lines with a period &quot;.&quot; (First part renders white, second part renders turquoise).
                    </span>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1 text-[#142B3D]">Hero Description</label>
                    <textarea
                      rows={2}
                      value={settings.hero_subheading || ""}
                      onChange={(e) => setSettings({ ...settings, hero_subheading: e.target.value })}
                      placeholder="Advanced surgical oncology care focused on personalized treatment, clinical expertise, and compassionate patient guidance."
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>

                  {/* Buttons Editor */}
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Primary Button Label</label>
                    <input
                      type="text"
                      value={settings.hero_cta_primary_label || ""}
                      onChange={(e) => setSettings({ ...settings, hero_cta_primary_label: e.target.value })}
                      placeholder="BOOK A CONSULTATION"
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">
                      Primary Button Link (leave empty for consultation modal)
                    </label>
                    <input
                      type="text"
                      value={settings.hero_cta_primary_link || ""}
                      onChange={(e) => setSettings({ ...settings, hero_cta_primary_link: e.target.value })}
                      placeholder="#book-consultation (opens modal)"
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Secondary Button Label</label>
                    <input
                      type="text"
                      value={settings.hero_cta_secondary_label || ""}
                      onChange={(e) => setSettings({ ...settings, hero_cta_secondary_label: e.target.value })}
                      placeholder="MEET DR. RAHUL SANDHU"
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Secondary Button Destination</label>
                    <input
                      type="text"
                      value={settings.hero_cta_secondary_link || ""}
                      onChange={(e) => setSettings({ ...settings, hero_cta_secondary_link: e.target.value })}
                      placeholder="/about"
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>

                  {/* Hero Background Image with thumbnail & direct upload */}
                  <div className="md:col-span-2 pt-2 border-t border-[#E2E7E4]">
                    <label className="block font-semibold mb-1.5 text-[#142B3D]">Hero Doctor Background Image</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="w-40 h-24 rounded-xl border border-[#E2E7E4] overflow-hidden bg-[#102D3D] shrink-0 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={settings.hero_doctor_image || "/images/reassuring-oncology-clinic-care.png"}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/reassuring-oncology-clinic-care.png";
                          }}
                        />
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={settings.hero_doctor_image || ""}
                            onChange={(e) => setSettings({ ...settings, hero_doctor_image: e.target.value })}
                            placeholder="/images/reassuring-oncology-clinic-care.png"
                            className="flex-1 p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => setActiveTab("media")}
                            className="bg-[#142B3D] hover:bg-[#17665F] text-white px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap"
                          >
                            Browse Media
                          </button>
                        </div>
                        <p className="text-[11px] text-[#5C707A]">
                          Default verified asset: <code className="bg-[#EEF2F1] px-1 py-0.5 rounded text-[#17665F]">/images/reassuring-oncology-clinic-care.png</code> (includes high-res Dr. Sandhu, patient consultation, and turquoise wave graphics).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section Editor */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h3 className="font-serif text-base font-bold text-[#142B3D]">
                  About Doctor Section
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Doctor Name &amp; Title</label>
                    <input
                      type="text"
                      value={settings.about_title || ""}
                      onChange={(e) => setSettings({ ...settings, about_title: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Designation Subtitle</label>
                    <input
                      type="text"
                      value={settings.about_subtitle || ""}
                      onChange={(e) => setSettings({ ...settings, about_subtitle: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1 text-[#142B3D]">Doctor Philosophy Quote</label>
                    <textarea
                      rows={2}
                      value={settings.about_quote || ""}
                      onChange={(e) => setSettings({ ...settings, about_quote: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1 text-[#142B3D]">Concise Biography</label>
                    <textarea
                      rows={4}
                      value={settings.about_bio_p1 || ""}
                      onChange={(e) => setSettings({ ...settings, about_bio_p1: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1 text-[#142B3D]">Doctor Portrait Image Path</label>
                    <input
                      type="text"
                      value={settings.about_doctor_photo || ""}
                      onChange={(e) => setSettings({ ...settings, about_doctor_photo: e.target.value })}
                      placeholder="/images/dr-sandhu-consultation-clean.png"
                      className="w-full p-2.5 bg-[#FAFBF9] border border-[#E2E7E4] rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PAGES & SEO MANAGER                                */}
          {/* ========================================================= */}
          {activeTab === "pages" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                  Pages &amp; Route SEO Management
                </h2>
                <p className="text-xs text-[#5C707A] mt-0.5">
                  Configure meta titles, descriptions, and publishing status for all public routes.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs overflow-hidden">
                <div className="divide-y divide-[#E2E7E4]">
                  {pages.map((p) => (
                    <div key={p.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-[#142B3D] text-sm">{p.title}</span>
                          <span className="font-mono text-xs text-[#17665F] bg-[#EEF2F1] px-2 py-0.5 rounded">
                            {p.slug}
                          </span>
                        </div>
                        <p className="text-xs text-[#5C707A] line-clamp-1">{p.meta_title}</p>
                        <p className="text-[11px] text-[#5C707A]/80 line-clamp-1">{p.meta_description}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Link
                          href={p.slug}
                          target="_blank"
                          className="text-xs text-[#17665F] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Live</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: CANCER SPECIALITIES                                */}
          {/* ========================================================= */}
          {activeTab === "specialties" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Cancer Specialities Management
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Manage oncological organ specialities, symptoms, staging, and surgical clearances.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingSpecialty({
                      title: "",
                      slug: "",
                      subtitle: "",
                      excerpt: "",
                      description: "",
                      symptoms: "",
                      diagnosis: "",
                      surgical_approaches: "",
                      post_care: "",
                      image: "/images/tumor-resection.jpg",
                      order_num: specialties.length + 1,
                      is_published: 1,
                    })
                  }
                  className="bg-[#17665F] hover:bg-[#124F4A] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Cancer Speciality</span>
                </button>
              </div>

              {/* Specialities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {specialties.map((spec) => (
                  <div
                    key={spec.id}
                    className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-[#EEF2F1]">
                      {spec.image && (
                        <Image
                          src={spec.image}
                          alt={spec.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover"
                        />
                      )}
                      <div className="absolute top-2.5 right-2.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            spec.is_published ? "bg-emerald-600 text-white" : "bg-gray-400 text-white"
                          }`}
                        >
                          {spec.is_published ? "PUBLISHED" : "DRAFT"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-base text-[#142B3D]">{spec.title}</h3>
                        <span className="text-[11px] font-mono text-[#5C707A]">#{spec.order_num}</span>
                      </div>
                      <p className="text-xs text-[#17665F] font-semibold">{spec.subtitle}</p>
                      <p className="text-xs text-[#5C707A] line-clamp-2">{spec.excerpt}</p>
                    </div>

                    <div className="p-4 bg-[#FAFBF9] border-t border-[#E2E7E4] flex items-center justify-between text-xs">
                      <Link
                        href={`/specialities/${spec.slug}`}
                        target="_blank"
                        className="text-[#17665F] hover:underline font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Page</span>
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingSpecialty(spec)}
                          className="p-1.5 rounded-lg border border-[#E2E7E4] hover:bg-white text-[#142B3D]"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete ${spec.title}?`)) return;
                            await fetch(`/api/admin/specialties?id=${spec.id}`, { method: "DELETE" });
                            setSpecialties((prev) => prev.filter((s) => s.id !== spec.id));
                            showNotify("Speciality deleted.");
                          }}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Speciality Edit Modal */}
              {editingSpecialty && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b pb-3 border-[#E2E7E4]">
                      <h3 className="font-serif font-bold text-lg text-[#142B3D]">
                        {editingSpecialty.id ? "Edit Speciality" : "Create New Speciality"}
                      </h3>
                      <button
                        onClick={() => setEditingSpecialty(null)}
                        className="text-[#5C707A] hover:text-[#142B3D]"
                      >
                        ✕
                      </button>
                    </div>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const isUpdate = Boolean(editingSpecialty.id);
                        const res = await fetch("/api/admin/specialties", {
                          method: isUpdate ? "PUT" : "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(editingSpecialty),
                        });
                        if (res.ok) {
                          showNotify("Speciality saved successfully!");
                          setEditingSpecialty(null);
                          const updated = await fetch("/api/admin/specialties").then((r) => r.json());
                          if (updated.data) setSpecialties(updated.data);
                        } else {
                          alert("Error saving speciality");
                        }
                      }}
                      className="space-y-4 text-xs"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">Title</label>
                          <input
                            type="text"
                            required
                            value={editingSpecialty.title || ""}
                            onChange={(e) => setEditingSpecialty({ ...editingSpecialty, title: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">URL Slug</label>
                          <input
                            type="text"
                            value={editingSpecialty.slug || ""}
                            onChange={(e) => setEditingSpecialty({ ...editingSpecialty, slug: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#142B3D]">Subtitle</label>
                        <input
                          type="text"
                          value={editingSpecialty.subtitle || ""}
                          onChange={(e) => setEditingSpecialty({ ...editingSpecialty, subtitle: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#142B3D]">Short Excerpt</label>
                        <textarea
                          rows={2}
                          value={editingSpecialty.excerpt || ""}
                          onChange={(e) => setEditingSpecialty({ ...editingSpecialty, excerpt: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#142B3D]">Full Clinical Description</label>
                        <textarea
                          rows={4}
                          value={editingSpecialty.description || ""}
                          onChange={(e) => setEditingSpecialty({ ...editingSpecialty, description: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">Image Path</label>
                          <input
                            type="text"
                            value={editingSpecialty.image || ""}
                            onChange={(e) => setEditingSpecialty({ ...editingSpecialty, image: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">Display Order</label>
                          <input
                            type="number"
                            value={editingSpecialty.order_num ?? 0}
                            onChange={(e) => setEditingSpecialty({ ...editingSpecialty, order_num: Number(e.target.value) })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="specPub"
                          checked={editingSpecialty.is_published === 1}
                          onChange={(e) => setEditingSpecialty({ ...editingSpecialty, is_published: e.target.checked ? 1 : 0 })}
                        />
                        <label htmlFor="specPub" className="font-semibold text-[#142B3D]">
                          Publish on Public Website
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-[#E2E7E4]">
                        <button
                          type="button"
                          onClick={() => setEditingSpecialty(null)}
                          className="px-4 py-2 rounded-lg border border-[#E2E7E4] text-[#5C707A]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-[#17665F] text-white font-semibold shadow-xs"
                        >
                          Save Speciality
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: SURGICAL TREATMENTS                                */}
          {/* ========================================================= */}
          {activeTab === "treatments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Surgical Treatments &amp; Procedures
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Manage clinical procedures, indications, step-by-step approaches, and recovery guidance.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingTreatment({
                      title: "",
                      slug: "",
                      subtitle: "",
                      excerpt: "",
                      description: "",
                      indications: "",
                      procedure_steps: "",
                      benefits: "",
                      recovery_info: "",
                      image: "/images/tumor-resection.jpg",
                      order_num: treatments.length + 1,
                      is_published: 1,
                    })
                  }
                  className="bg-[#17665F] hover:bg-[#124F4A] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Surgical Treatment</span>
                </button>
              </div>

              {/* Treatments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {treatments.map((treat) => (
                  <div
                    key={treat.id}
                    className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-[#EEF2F1]">
                      {treat.image && (
                        <Image
                          src={treat.image}
                          alt={treat.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover"
                        />
                      )}
                      <div className="absolute top-2.5 right-2.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            treat.is_published ? "bg-emerald-600 text-white" : "bg-gray-400 text-white"
                          }`}
                        >
                          {treat.is_published ? "PUBLISHED" : "DRAFT"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-base text-[#142B3D]">{treat.title}</h3>
                        <span className="text-[11px] font-mono text-[#5C707A]">#{treat.order_num}</span>
                      </div>
                      <p className="text-xs text-[#17665F] font-semibold">{treat.subtitle}</p>
                      <p className="text-xs text-[#5C707A] line-clamp-2">{treat.excerpt}</p>
                    </div>

                    <div className="p-4 bg-[#FAFBF9] border-t border-[#E2E7E4] flex items-center justify-between text-xs">
                      <Link
                        href={`/treatments/${treat.slug}`}
                        target="_blank"
                        className="text-[#17665F] hover:underline font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Page</span>
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingTreatment(treat)}
                          className="p-1.5 rounded-lg border border-[#E2E7E4] hover:bg-white text-[#142B3D]"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete treatment "${treat.title}"?`)) return;
                            await fetch(`/api/admin/treatments?id=${treat.id}`, { method: "DELETE" });
                            setTreatments((prev) => prev.filter((t) => t.id !== treat.id));
                            showNotify("Treatment deleted.");
                          }}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Treatment Modal */}
              {editingTreatment && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b pb-3 border-[#E2E7E4]">
                      <h3 className="font-serif font-bold text-lg text-[#142B3D]">
                        {editingTreatment.id ? "Edit Treatment" : "Create New Treatment"}
                      </h3>
                      <button
                        onClick={() => setEditingTreatment(null)}
                        className="text-[#5C707A] hover:text-[#142B3D]"
                      >
                        ✕
                      </button>
                    </div>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const isUpdate = Boolean(editingTreatment.id);
                        const res = await fetch("/api/admin/treatments", {
                          method: isUpdate ? "PUT" : "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(editingTreatment),
                        });
                        if (res.ok) {
                          showNotify("Treatment saved successfully!");
                          setEditingTreatment(null);
                          const updated = await fetch("/api/admin/treatments").then((r) => r.json());
                          if (updated.data) setTreatments(updated.data);
                        } else {
                          alert("Error saving treatment");
                        }
                      }}
                      className="space-y-4 text-xs"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">Title</label>
                          <input
                            type="text"
                            required
                            value={editingTreatment.title || ""}
                            onChange={(e) => setEditingTreatment({ ...editingTreatment, title: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">URL Slug</label>
                          <input
                            type="text"
                            value={editingTreatment.slug || ""}
                            onChange={(e) => setEditingTreatment({ ...editingTreatment, slug: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#142B3D]">Subtitle</label>
                        <input
                          type="text"
                          value={editingTreatment.subtitle || ""}
                          onChange={(e) => setEditingTreatment({ ...editingTreatment, subtitle: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#142B3D]">Excerpt</label>
                        <textarea
                          rows={2}
                          value={editingTreatment.excerpt || ""}
                          onChange={(e) => setEditingTreatment({ ...editingTreatment, excerpt: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#142B3D]">Description</label>
                        <textarea
                          rows={4}
                          value={editingTreatment.description || ""}
                          onChange={(e) => setEditingTreatment({ ...editingTreatment, description: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">Image Path</label>
                          <input
                            type="text"
                            value={editingTreatment.image || ""}
                            onChange={(e) => setEditingTreatment({ ...editingTreatment, image: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">Display Order</label>
                          <input
                            type="number"
                            value={editingTreatment.order_num ?? 0}
                            onChange={(e) => setEditingTreatment({ ...editingTreatment, order_num: Number(e.target.value) })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="treatPub"
                          checked={editingTreatment.is_published === 1}
                          onChange={(e) => setEditingTreatment({ ...editingTreatment, is_published: e.target.checked ? 1 : 0 })}
                        />
                        <label htmlFor="treatPub" className="font-semibold text-[#142B3D]">
                          Publish on Public Website
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-[#E2E7E4]">
                        <button
                          type="button"
                          onClick={() => setEditingTreatment(null)}
                          className="px-4 py-2 rounded-lg border border-[#E2E7E4] text-[#5C707A]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-[#17665F] text-white font-semibold shadow-xs"
                        >
                          Save Treatment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: BLOGS & ARTICLES                                   */}
          {/* ========================================================= */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Health &amp; Awareness Articles
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Write, edit, and publish clinical cancer awareness guides authored by Dr. Rahul Sandhu.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingBlog({
                      title: "",
                      slug: "",
                      category: "Cancer Surgery",
                      author: "Lt Col (Dr) Rahul Sandhu",
                      read_time: "5 min read",
                      published_date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                      excerpt: "",
                      content: "",
                      cover_image: "/images/Cancer-Surgery-300x225.png",
                      is_published: 1,
                    })
                  }
                  className="bg-[#17665F] hover:bg-[#124F4A] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Article</span>
                </button>
              </div>

              {/* Blogs list */}
              <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs divide-y divide-[#E2E7E4] overflow-hidden">
                {blogs.map((b) => (
                  <div key={b.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {b.cover_image && (
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-[#EEF2F1]">
                          <Image src={b.cover_image} alt={b.title} fill className="object-cover" />
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#17665F] bg-[#EEF2F1] px-2 py-0.5 rounded">
                            {b.category}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              b.is_published ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {b.is_published ? "PUBLISHED" : "DRAFT"}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-[#142B3D]">{b.title}</h4>
                        <p className="text-xs text-[#5C707A] line-clamp-1">{b.excerpt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-xs">
                      <Link
                        href={`/blog/${b.slug}`}
                        target="_blank"
                        className="text-[#17665F] hover:underline font-semibold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                      <button
                        onClick={() => setEditingBlog(b)}
                        className="p-1.5 rounded-lg border border-[#E2E7E4] hover:bg-[#FAFBF9]"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete blog "${b.title}"?`)) return;
                          await fetch(`/api/admin/blogs?id=${b.id}`, { method: "DELETE" });
                          setBlogs((prev) => prev.filter((item) => item.id !== b.id));
                          showNotify("Blog article deleted.");
                        }}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Blog Modal */}
              {editingBlog && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b pb-3 border-[#E2E7E4]">
                      <h3 className="font-serif font-bold text-lg text-[#142B3D]">
                        {editingBlog.id ? "Edit Article" : "Create Article"}
                      </h3>
                      <button
                        onClick={() => setEditingBlog(null)}
                        className="text-[#5C707A] hover:text-[#142B3D]"
                      >
                        ✕
                      </button>
                    </div>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const isUpdate = Boolean(editingBlog.id);
                        const res = await fetch("/api/admin/blogs", {
                          method: isUpdate ? "PUT" : "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(editingBlog),
                        });
                        if (res.ok) {
                          showNotify("Blog post saved!");
                          setEditingBlog(null);
                          const updated = await fetch("/api/admin/blogs").then((r) => r.json());
                          if (updated.data) setBlogs(updated.data);
                        } else {
                          alert("Error saving blog");
                        }
                      }}
                      className="space-y-4 text-xs"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">Article Title</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.title || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">URL Slug</label>
                          <input
                            type="text"
                            value={editingBlog.slug || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">Category</label>
                          <input
                            type="text"
                            value={editingBlog.category || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">Read Time</label>
                          <input
                            type="text"
                            value={editingBlog.read_time || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, read_time: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1 text-[#142B3D]">Author</label>
                          <input
                            type="text"
                            value={editingBlog.author || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                            className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#142B3D]">Excerpt Summary</label>
                        <textarea
                          rows={2}
                          value={editingBlog.excerpt || ""}
                          onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#142B3D]">Markdown / Formatted Content</label>
                        <textarea
                          rows={8}
                          value={editingBlog.content || ""}
                          onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E2E7E4] font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#142B3D]">Cover Image</label>
                        <input
                          type="text"
                          value={editingBlog.cover_image || ""}
                          onChange={(e) => setEditingBlog({ ...editingBlog, cover_image: e.target.value })}
                          className="w-full p-2.5 rounded-lg border border-[#E2E7E4] text-sm"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="checkbox"
                          id="blogPub"
                          checked={editingBlog.is_published === 1}
                          onChange={(e) => setEditingBlog({ ...editingBlog, is_published: e.target.checked ? 1 : 0 })}
                        />
                        <label htmlFor="blogPub" className="font-semibold text-[#142B3D]">
                          Publish Article to Website
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-4 border-t border-[#E2E7E4]">
                        <button
                          type="button"
                          onClick={() => setEditingBlog(null)}
                          className="px-4 py-2 rounded-lg border border-[#E2E7E4] text-[#5C707A]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-[#17665F] text-white font-semibold shadow-xs"
                        >
                          Save Article
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: MEDIA LIBRARY                                      */}
          {/* ========================================================= */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Centralized Media Library
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Upload, organize, preview, and track usage of doctor photos, surgical diagrams, and logos.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingMedia}
                    className="bg-[#17665F] hover:bg-[#124F4A] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isUploadingMedia ? "Uploading..." : "Upload New Image(s)"}</span>
                  </button>
                </div>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {mediaAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-white rounded-xl border border-[#E2E7E4] shadow-xs overflow-hidden flex flex-col justify-between group"
                  >
                    <div className="relative aspect-square bg-[#EEF2F1] overflow-hidden">
                      <Image
                        src={asset.file_path}
                        alt={asset.alt_text || asset.filename}
                        fill
                        sizes="(max-width: 768px) 50vw, 200px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-2.5 space-y-1">
                      <p className="font-mono text-[11px] text-[#142B3D] truncate font-medium">
                        {asset.filename}
                      </p>
                      <p className="text-[10px] text-[#5C707A]">
                        {(asset.file_size / 1024).toFixed(0)} KB • {asset.mime_type.split("/")[1]?.toUpperCase()}
                      </p>
                      {asset.usages && asset.usages.length > 0 && (
                        <span className="inline-block text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded font-semibold truncate max-w-full">
                          Used in {asset.usages.length} section(s)
                        </span>
                      )}
                    </div>

                    <div className="p-2 bg-[#FAFBF9] border-t border-[#E2E7E4] flex items-center justify-between text-xs">
                      <button
                        title="Copy file path"
                        onClick={() => {
                          navigator.clipboard.writeText(asset.file_path);
                          showNotify(`Copied: ${asset.file_path}`);
                        }}
                        className="p-1 text-[#17665F] hover:bg-emerald-50 rounded"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        title="Delete image"
                        onClick={() => deleteMediaItem(asset.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: TESTIMONIALS & REVIEWS                             */}
          {/* ========================================================= */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Testimonials &amp; Verified Reviews
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Approve, feature, and edit patient feedback and recovery experiences.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingTestimonial({
                      author_name: "",
                      author_location: "Chandigarh",
                      condition: "Surgical Care",
                      content: "",
                      rating: 5,
                      source: "Google Reviews (Verified)",
                      is_featured: 0,
                      is_approved: 1,
                      consent_given: 1,
                    })
                  }
                  className="bg-[#17665F] hover:bg-[#124F4A] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-500 text-sm">★ {t.rating}.0</span>
                        <div className="flex gap-1.5">
                          {t.is_featured === 1 && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                              FEATURED
                            </span>
                          )}
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                              t.is_approved ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {t.is_approved ? "APPROVED" : "PENDING"}
                          </span>
                        </div>
                      </div>
                      <p className="font-serif italic text-xs text-[#283941] leading-relaxed line-clamp-4">
                        &ldquo;{t.content}&rdquo;
                      </p>
                      <div className="pt-2 border-t border-[#E2E7E4]/60">
                        <h4 className="font-serif font-bold text-xs text-[#142B3D]">{t.author_name}</h4>
                        <p className="text-[11px] text-[#5C707A]">
                          {t.author_location} — {t.condition}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 text-xs pt-2">
                      <button
                        onClick={() => setEditingTestimonial(t)}
                        className="p-1.5 rounded-lg border border-[#E2E7E4] hover:bg-[#FAFBF9]"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete review from ${t.author_name}?`)) return;
                          await fetch(`/api/admin/testimonials?id=${t.id}`, { method: "DELETE" });
                          setTestimonials((prev) => prev.filter((item) => item.id !== t.id));
                          showNotify("Testimonial removed.");
                        }}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Modal */}
              {editingTestimonial && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4">
                    <h3 className="font-serif font-bold text-lg text-[#142B3D]">
                      {editingTestimonial.id ? "Edit Testimonial" : "Add Testimonial"}
                    </h3>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const isUpdate = Boolean(editingTestimonial.id);
                        const res = await fetch("/api/admin/testimonials", {
                          method: isUpdate ? "PUT" : "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(editingTestimonial),
                        });
                        if (res.ok) {
                          showNotify("Testimonial saved!");
                          setEditingTestimonial(null);
                          const updated = await fetch("/api/admin/testimonials").then((r) => r.json());
                          if (updated.data) setTestimonials(updated.data);
                        }
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">Patient Name</label>
                          <input
                            type="text"
                            required
                            value={editingTestimonial.author_name || ""}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author_name: e.target.value })}
                            className="w-full p-2 rounded-lg border border-[#E2E7E4]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">City / Region</label>
                          <input
                            type="text"
                            value={editingTestimonial.author_location || ""}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author_location: e.target.value })}
                            className="w-full p-2 rounded-lg border border-[#E2E7E4]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Treated Condition</label>
                        <input
                          type="text"
                          value={editingTestimonial.condition || ""}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, condition: e.target.value })}
                          className="w-full p-2 rounded-lg border border-[#E2E7E4]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1">Review Content</label>
                        <textarea
                          rows={4}
                          required
                          value={editingTestimonial.content || ""}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                          className="w-full p-2 rounded-lg border border-[#E2E7E4]"
                        />
                      </div>

                      <div className="flex gap-4 pt-2">
                        <label className="flex items-center gap-1.5 font-semibold">
                          <input
                            type="checkbox"
                            checked={editingTestimonial.is_featured === 1}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, is_featured: e.target.checked ? 1 : 0 })}
                          />
                          <span>Feature on Homepage</span>
                        </label>
                        <label className="flex items-center gap-1.5 font-semibold">
                          <input
                            type="checkbox"
                            checked={editingTestimonial.is_approved === 1}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, is_approved: e.target.checked ? 1 : 0 })}
                          />
                          <span>Approved for Display</span>
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t">
                        <button
                          type="button"
                          onClick={() => setEditingTestimonial(null)}
                          className="px-3 py-1.5 border rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-[#17665F] text-white rounded-lg font-semibold"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 9: CLINICAL VIDEOS                                    */}
          {/* ========================================================= */}
          {activeTab === "videos" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Clinical Discussions &amp; Video Insights
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Embed patient video guides, surgical explanations, and YouTube clinical discussions.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingVideo({
                      title: "",
                      youtube_url: "",
                      thumbnail: "/images/Minimal-Invassive-Surgery.jpg",
                      description: "",
                      order_num: videos.length + 1,
                      is_published: 1,
                    })
                  }
                  className="bg-[#17665F] hover:bg-[#124F4A] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Video</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {videos.map((vid) => (
                  <div key={vid.id} className="bg-white p-5 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-3">
                    <div className="relative aspect-video rounded-xl bg-black overflow-hidden">
                      {vid.thumbnail && <Image src={vid.thumbnail} alt={vid.title} fill className="object-cover" />}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#142B3D]">{vid.title}</h4>
                      <p className="text-xs text-[#5C707A] mt-1">{vid.description}</p>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t text-xs">
                      <button
                        onClick={() => setEditingVideo(vid)}
                        className="p-1.5 border rounded-lg hover:bg-gray-50"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete video "${vid.title}"?`)) return;
                          await fetch(`/api/admin/videos?id=${vid.id}`, { method: "DELETE" });
                          setVideos((prev) => prev.filter((v) => v.id !== vid.id));
                          showNotify("Video removed.");
                        }}
                        className="p-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Video Modal */}
              {editingVideo && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-3 text-xs">
                    <h3 className="font-serif font-bold text-lg text-[#142B3D]">
                      {editingVideo.id ? "Edit Video" : "Add Video"}
                    </h3>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const isUpdate = Boolean(editingVideo.id);
                        const res = await fetch("/api/admin/videos", {
                          method: isUpdate ? "PUT" : "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(editingVideo),
                        });
                        if (res.ok) {
                          showNotify("Video saved!");
                          setEditingVideo(null);
                          const updated = await fetch("/api/admin/videos").then((r) => r.json());
                          if (updated.data) setVideos(updated.data);
                        }
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block font-semibold mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={editingVideo.title || ""}
                          onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">YouTube URL</label>
                        <input
                          type="text"
                          required
                          value={editingVideo.youtube_url || ""}
                          onChange={(e) => setEditingVideo({ ...editingVideo, youtube_url: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Thumbnail Image Path</label>
                        <input
                          type="text"
                          value={editingVideo.thumbnail || ""}
                          onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingVideo.description || ""}
                          onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2 border-t">
                        <button type="button" onClick={() => setEditingVideo(null)} className="px-3 py-1.5 border rounded-lg">
                          Cancel
                        </button>
                        <button type="submit" className="px-4 py-1.5 bg-[#17665F] text-white rounded-lg font-semibold">
                          Save Video
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 10: FAQS MANAGER                                      */}
          {/* ========================================================= */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Frequently Asked Questions (FAQs)
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Manage patient questions, categories, display order, and publishing states.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditingFaq({
                      question: "",
                      answer: "",
                      category: "General",
                      order_num: faqs.length + 1,
                      is_published: 1,
                    })
                  }
                  className="bg-[#17665F] hover:bg-[#124F4A] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs divide-y divide-[#E2E7E4] overflow-hidden">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#17665F] bg-[#EEF2F1] px-2 py-0.5 rounded">
                          {faq.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#5C707A]">#{faq.order_num}</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#142B3D]">{faq.question}</h4>
                      <p className="text-xs text-[#5C707A] leading-relaxed">{faq.answer}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-xs">
                      <button
                        onClick={() => setEditingFaq(faq)}
                        className="p-1.5 rounded-lg border border-[#E2E7E4] hover:bg-gray-50"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete this FAQ?`)) return;
                          await fetch(`/api/admin/faqs?id=${faq.id}`, { method: "DELETE" });
                          setFaqs((prev) => prev.filter((f) => f.id !== faq.id));
                          showNotify("FAQ removed.");
                        }}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Modal */}
              {editingFaq && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-3 text-xs">
                    <h3 className="font-serif font-bold text-lg text-[#142B3D]">
                      {editingFaq.id ? "Edit FAQ" : "Add FAQ"}
                    </h3>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const isUpdate = Boolean(editingFaq.id);
                        const res = await fetch("/api/admin/faqs", {
                          method: isUpdate ? "PUT" : "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(editingFaq),
                        });
                        if (res.ok) {
                          showNotify("FAQ saved!");
                          setEditingFaq(null);
                          const updated = await fetch("/api/admin/faqs").then((r) => r.json());
                          if (updated.data) setFaqs(updated.data);
                        }
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block font-semibold mb-1">Question</label>
                        <input
                          type="text"
                          required
                          value={editingFaq.question || ""}
                          onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Answer</label>
                        <textarea
                          rows={4}
                          required
                          value={editingFaq.answer || ""}
                          onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold mb-1">Category</label>
                          <input
                            type="text"
                            value={editingFaq.category || ""}
                            onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                            className="w-full p-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Order</label>
                          <input
                            type="number"
                            value={editingFaq.order_num ?? 0}
                            onChange={(e) => setEditingFaq({ ...editingFaq, order_num: Number(e.target.value) })}
                            className="w-full p-2 border rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2 border-t">
                        <button type="button" onClick={() => setEditingFaq(null)} className="px-3 py-1.5 border rounded-lg">
                          Cancel
                        </button>
                        <button type="submit" className="px-4 py-1.5 bg-[#17665F] text-white rounded-lg font-semibold">
                          Save FAQ
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 11: PATIENT ENQUIRIES / LEADS                         */}
          {/* ========================================================= */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Patient Consultation Enquiries &amp; Leads
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Direct patient submissions from Contact page, Appointment Modal, and Clinic forms.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/api/admin/enquiries?format=csv"
                    download
                    className="bg-white border border-[#E2E7E4] hover:border-[#17665F] text-[#142B3D] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#17665F]" />
                    <span>Export to CSV</span>
                  </a>
                </div>
              </div>

              {/* Enquiries Table */}
              <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs overflow-hidden">
                {enquiries.length === 0 ? (
                  <p className="p-12 text-center text-xs text-[#5C707A]">
                    No patient consultation requests submitted yet.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAFBF9] border-b border-[#E2E7E4] text-[#5C707A]">
                        <tr>
                          <th className="py-3 px-4 font-semibold">Patient</th>
                          <th className="py-3 px-4 font-semibold">Phone &amp; Email</th>
                          <th className="py-3 px-4 font-semibold">Preferred Location</th>
                          <th className="py-3 px-4 font-semibold">Cancer Type / Reason</th>
                          <th className="py-3 px-4 font-semibold">Submitted</th>
                          <th className="py-3 px-4 font-semibold">Status</th>
                          <th className="py-3 px-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E7E4]/60">
                        {enquiries.map((enq) => (
                          <tr key={enq.id} className="hover:bg-[#FAFBF9] transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-semibold text-[#142B3D] text-sm">{enq.patient_name}</div>
                              {enq.notes && (
                                <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                  Notes: {enq.notes}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-mono text-[#17665F]">
                              <div>{enq.phone}</div>
                              {enq.email && <div className="text-[11px] text-[#5C707A]">{enq.email}</div>}
                            </td>
                            <td className="py-3 px-4 text-[#5C707A]">{enq.preferred_location}</td>
                            <td className="py-3 px-4 text-[#142B3D]">{enq.cancer_type}</td>
                            <td className="py-3 px-4 text-[#5C707A]">
                              {new Date(enq.created_at).toLocaleString([], {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={enq.status}
                                onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                                className="text-xs p-1 rounded-lg border border-[#E2E7E4] bg-white font-medium"
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="scheduled">Appointment Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setSelectedEnquiry(enq);
                                    setEnquiryNotesInput(enq.notes || "");
                                  }}
                                  className="p-1.5 rounded-lg border border-[#E2E7E4] hover:bg-white text-[#17665F]"
                                  title="View full enquiry & notes"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteEnquiryItem(enq.id)}
                                  className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                                  title="Delete enquiry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Enquiry Detail Modal */}
              {selectedEnquiry && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between border-b pb-3 border-[#E2E7E4]">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-[#142B3D]">
                          Patient Enquiry Details
                        </h3>
                        <p className="text-[11px] text-[#5C707A]">ID: {selectedEnquiry.id}</p>
                      </div>
                      <button onClick={() => setSelectedEnquiry(null)} className="text-[#5C707A]">
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3 bg-[#FAFBF9] p-3 rounded-xl border border-[#E2E7E4]">
                        <div>
                          <span className="text-[#5C707A]">Patient:</span>
                          <p className="font-bold text-[#142B3D] text-sm">{selectedEnquiry.patient_name}</p>
                        </div>
                        <div>
                          <span className="text-[#5C707A]">Phone:</span>
                          <p className="font-mono font-bold text-[#17665F]">{selectedEnquiry.phone}</p>
                        </div>
                        {selectedEnquiry.email && (
                          <div className="col-span-2">
                            <span className="text-[#5C707A]">Email:</span>
                            <p className="text-[#142B3D]">{selectedEnquiry.email}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-[#5C707A]">Location:</span>
                          <p className="text-[#142B3D]">{selectedEnquiry.preferred_location}</p>
                        </div>
                        <div>
                          <span className="text-[#5C707A]">Condition / Category:</span>
                          <p className="text-[#142B3D]">{selectedEnquiry.cancer_type}</p>
                        </div>
                      </div>

                      {selectedEnquiry.message && (
                        <div>
                          <span className="block font-semibold mb-1 text-[#142B3D]">Patient Message:</span>
                          <div className="p-3 rounded-xl bg-[#FAFBF9] border border-[#E2E7E4] leading-relaxed">
                            {selectedEnquiry.message}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block font-semibold mb-1 text-[#142B3D]">Internal Clinical Follow-up Notes:</label>
                        <textarea
                          rows={3}
                          value={enquiryNotesInput}
                          onChange={(e) => setEnquiryNotesInput(e.target.value)}
                          placeholder="e.g., Called patient on Oct 22, scheduled for Shalby OPD Tuesday 11 AM"
                          className="w-full p-2.5 rounded-xl border border-[#E2E7E4] text-xs"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <button
                          type="button"
                          onClick={() => deleteEnquiryItem(selectedEnquiry.id)}
                          className="text-red-600 hover:underline font-semibold"
                        >
                          Delete Lead
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await updateEnquiryStatus(selectedEnquiry.id, selectedEnquiry.status, enquiryNotesInput);
                            setSelectedEnquiry(null);
                          }}
                          className="px-4 py-2 bg-[#17665F] text-white rounded-xl font-semibold shadow-xs"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 12: CLINICS & CONTACT                                 */}
          {/* ========================================================= */}
          {activeTab === "clinics" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Clinic Locations, Hours &amp; Google Maps
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Manage Shalby Hospital Mohali and ClearMedi Healthcare Kharar practice settings.
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="bg-[#17665F] hover:bg-[#124F4A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? "Saving..." : "Save Locations"}</span>
                </button>
              </div>

              {/* Clinic 1: Shalby */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h3 className="font-serif text-base font-bold text-[#142B3D]">
                  Location 1: Shalby Multi-Specialty Hospital, Mohali
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Hospital Name</label>
                    <input
                      type="text"
                      value={settings.clinic1_name || ""}
                      onChange={(e) => setSettings({ ...settings, clinic1_name: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Visiting Hours</label>
                    <input
                      type="text"
                      value={settings.clinic1_timings || ""}
                      onChange={(e) => setSettings({ ...settings, clinic1_timings: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1 text-[#142B3D]">Full Address</label>
                    <input
                      type="text"
                      value={settings.clinic1_address || ""}
                      onChange={(e) => setSettings({ ...settings, clinic1_address: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1 text-[#142B3D]">Google Maps Embed URL</label>
                    <input
                      type="text"
                      value={settings.clinic1_map_url || ""}
                      onChange={(e) => setSettings({ ...settings, clinic1_map_url: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Clinic 2: ClearMedi */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h3 className="font-serif text-base font-bold text-[#142B3D]">
                  Location 2: ClearMedi Healthcare, Kharar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Hospital Name</label>
                    <input
                      type="text"
                      value={settings.clinic2_name || ""}
                      onChange={(e) => setSettings({ ...settings, clinic2_name: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Visiting Hours</label>
                    <input
                      type="text"
                      value={settings.clinic2_timings || ""}
                      onChange={(e) => setSettings({ ...settings, clinic2_timings: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1 text-[#142B3D]">Full Address</label>
                    <input
                      type="text"
                      value={settings.clinic2_address || ""}
                      onChange={(e) => setSettings({ ...settings, clinic2_address: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1 text-[#142B3D]">Google Maps Embed URL</label>
                    <input
                      type="text"
                      value={settings.clinic2_map_url || ""}
                      onChange={(e) => setSettings({ ...settings, clinic2_map_url: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 13: NAVIGATION & FOOTER                               */}
          {/* ========================================================= */}
          {activeTab === "navigation" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Navigation, Brand &amp; Mobile Floating Bar
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Configure official logo, contact phones, email addresses, and mobile quick actions.
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="bg-[#17665F] hover:bg-[#124F4A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? "Saving..." : "Save Navigation"}</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-4">
                <h3 className="font-serif text-base font-bold text-[#142B3D]">
                  Top Bar &amp; Direct Contact Numbers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Official Phone Number</label>
                    <input
                      type="text"
                      value={settings.topbar_phone || ""}
                      onChange={(e) => setSettings({ ...settings, topbar_phone: e.target.value })}
                      placeholder="+91 9888970519"
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Email Address</label>
                    <input
                      type="email"
                      value={settings.topbar_email || ""}
                      onChange={(e) => setSettings({ ...settings, topbar_email: e.target.value })}
                      placeholder="drsand.rahul@gmail.com"
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Top Bar Location String</label>
                    <input
                      type="text"
                      value={settings.topbar_location || ""}
                      onChange={(e) => setSettings({ ...settings, topbar_location: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Top Bar Hours</label>
                    <input
                      type="text"
                      value={settings.topbar_hours || ""}
                      onChange={(e) => setSettings({ ...settings, topbar_hours: e.target.value })}
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1 text-[#142B3D]">Site Logo Path</label>
                    <input
                      type="text"
                      value={settings.site_logo || ""}
                      onChange={(e) => setSettings({ ...settings, site_logo: e.target.value })}
                      placeholder="/images/dr-rahul-sandhu-official-logo.png"
                      className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 14: SEO SETTINGS                                      */}
          {/* ========================================================= */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Search Engine Optimization (SEO)
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Configure meta tags, search rankings keywords, and social sharing Open Graph defaults.
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="bg-[#17665F] hover:bg-[#124F4A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? "Saving..." : "Save SEO"}</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-[#142B3D]">Default Page Title Template</label>
                  <input
                    type="text"
                    value={settings.seo_meta_title || ""}
                    onChange={(e) => setSettings({ ...settings, seo_meta_title: e.target.value })}
                    className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#142B3D]">Default Meta Description</label>
                  <textarea
                    rows={3}
                    value={settings.seo_meta_description || ""}
                    onChange={(e) => setSettings({ ...settings, seo_meta_description: e.target.value })}
                    className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#142B3D]">SEO Search Keywords</label>
                  <textarea
                    rows={2}
                    value={settings.seo_keywords || ""}
                    onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })}
                    className="w-full p-2.5 bg-[#FAFBF9] border rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 15: USERS & SECURITY                                  */}
          {/* ========================================================= */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                  Administrator Security &amp; Password Management
                </h2>
                <p className="text-xs text-[#5C707A] mt-0.5">
                  Change admin password with PBKDF2 hashing, manage team credentials, and review security status.
                </p>
              </div>

              {/* Change Password Card */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-4 max-w-xl">
                <h3 className="font-serif text-base font-bold text-[#142B3D] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#17665F]" />
                  <span>Update Administrator Password</span>
                </h3>

                {passError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-lg">
                    {passError}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Current Password</label>
                    <input
                      type="password"
                      required
                      value={currPass}
                      onChange={(e) => setCurrPass(e.target.value)}
                      className="w-full p-2.5 border rounded-lg bg-[#FAFBF9]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">New Password (min 8 characters)</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full p-2.5 border rounded-lg bg-[#FAFBF9]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#142B3D]">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      className="w-full p-2.5 border rounded-lg bg-[#FAFBF9]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#17665F] hover:bg-[#124F4A] text-white px-5 py-2.5 rounded-xl font-semibold cursor-pointer shadow-xs"
                  >
                    Change Password
                  </button>
                </form>
              </div>

              {/* Team Members List */}
              <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-4 max-w-xl">
                <h3 className="font-serif text-base font-bold text-[#142B3D]">
                  Authorized Admin Accounts
                </h3>
                <div className="divide-y divide-[#E2E7E4] text-xs">
                  {adminUsers.map((u) => (
                    <div key={u.id} className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#142B3D] text-sm">{u.username}</span>
                        <span className="ml-2 text-[10px] bg-[#EEF2F1] text-[#17665F] px-2 py-0.5 rounded font-semibold">
                          {u.role}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#5C707A]">
                        Created: {new Date(u.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add new user form */}
                <form onSubmit={handleCreateAdminUser} className="pt-3 border-t border-[#E2E7E4] space-y-3 text-xs">
                  <h4 className="font-semibold text-[#142B3D]">Add New Team Member</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Username"
                      value={newAdminUser}
                      onChange={(e) => setNewAdminUser(e.target.value)}
                      className="p-2 border rounded-lg bg-[#FAFBF9]"
                    />
                    <input
                      type="password"
                      required
                      placeholder="Password (min 8 chars)"
                      value={newAdminPass}
                      onChange={(e) => setNewAdminPass(e.target.value)}
                      className="p-2 border rounded-lg bg-[#FAFBF9]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#5C707A] font-semibold uppercase mb-1">
                      Account Role &amp; Permissions
                    </label>
                    <select
                      value={newAdminRole}
                      onChange={(e) => setNewAdminRole(e.target.value)}
                      className="w-full p-2 border rounded-lg bg-[#FAFBF9] text-xs font-medium"
                    >
                      <option value="Admin">Admin (Full Content &amp; Enquiry Management)</option>
                      <option value="SuperAdmin">SuperAdmin (Includes System Reset &amp; Admin Management)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#142B3D] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"
                  >
                    Create User Account
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 16: ACTIVITY AUDIT LOGS                               */}
          {/* ========================================================= */}
          {activeTab === "logs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                    Activity &amp; Security Audit Trail
                  </h2>
                  <p className="text-xs text-[#5C707A] mt-0.5">
                    Immutable history of all logins, content edits, and administrative operations.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    const res = await fetch("/api/admin/logs?limit=100").then((r) => r.json());
                    if (res.data) setActivityLogs(res.data);
                    showNotify("Audit logs refreshed.");
                  }}
                  className="bg-white border border-[#E2E7E4] hover:border-[#17665F] text-[#142B3D] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#17665F]" />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#E2E7E4] shadow-xs divide-y divide-[#E2E7E4] overflow-hidden text-xs">
                {activityLogs.map((log) => (
                  <div key={log.id} className="p-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#142B3D]">{log.action}</span>
                        <span className="text-[10px] bg-[#EEF2F1] text-[#17665F] px-1.5 py-0.5 rounded font-mono">
                          {log.entity_type}
                        </span>
                        <span className="text-[10px] text-[#5C707A]">by {log.username}</span>
                      </div>
                      <p className="text-[#5C707A]">{log.details}</p>
                    </div>
                    <span className="text-[11px] text-[#5C707A] shrink-0">
                      {new Date(log.created_at).toLocaleString([], { dateStyle: "short", timeStyle: "medium" })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 17: BACKUP & DATABASE                                 */}
          {/* ========================================================= */}
          {activeTab === "backup" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#142B3D]">
                  Backup, Recovery &amp; Database Persistence
                </h2>
                <p className="text-xs text-[#5C707A] mt-0.5">
                  Download database backups, export JSON snapshots, and inspect production database connectivity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5">
                    <DatabaseIcon className="w-5 h-5 text-[#17665F]" />
                    <h3 className="font-serif text-base font-bold text-[#142B3D]">
                      Download Database Backups
                    </h3>
                  </div>
                  <p className="text-xs text-[#5C707A] leading-relaxed">
                    Download an exact copy of the persistent database file for off-site disaster recovery or staging testing.
                  </p>
                  <div className="pt-2 flex flex-col gap-2.5">
                    <a
                      href="/api/admin/backup?type=sqlite"
                      download
                      className="bg-[#17665F] hover:bg-[#124F4A] text-white p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download SQLite Database (.db)</span>
                    </a>

                    <a
                      href="/api/admin/backup?type=json"
                      download
                      className="bg-white border border-[#E2E7E4] hover:border-[#17665F] text-[#142B3D] p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <Download className="w-4 h-4 text-[#17665F]" />
                      <span>Export Full CMS JSON Snapshot</span>
                    </a>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#17665F]" />
                    <h3 className="font-serif text-base font-bold text-[#142B3D]">
                      Production Supabase PostgreSQL Migration
                    </h3>
                  </div>
                  <p className="text-xs text-[#5C707A] leading-relaxed">
                    For zero-downtime serverless hosting, the project includes ready-to-run schema and seed migration scripts:
                  </p>
                  <div className="bg-[#102D3D] text-[#45DDC8] p-3 rounded-xl text-xs font-mono space-y-1">
                    <div>1. scripts/supabase_schema.sql</div>
                    <div>2. node scripts/migrate-to-supabase.js</div>
                  </div>
                  <p className="text-[11px] text-[#5C707A]">
                    Run in your terminal to export all records into clean PostgreSQL statements for Supabase SQL Editor.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
