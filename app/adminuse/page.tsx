"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Article, 
  Plus, 
  Trash, 
  PencilSimple, 
  ArrowClockwise, 
  Eye, 
  CloudArrowDown, 
  CheckCircle, 
  ArrowLeft, 
  MagnifyingGlass, 
  FloppyDisk, 
  X, 
  Image as ImageIcon,
  Tag,
  User,
  Clock,
  Sparkle,
  Globe,
  WarningCircle,
  LockKey,
  Key,
  ShieldCheck,
  SignOut,
  SlidersHorizontal,
  FolderOpen
} from "@phosphor-icons/react";
import { BlogPost, BLOG_POSTS } from "@/lib/masta-data";
import { 
  getAllBlogPosts, 
  saveBlogPost, 
  deleteBlogPost, 
  importScrapedPosts, 
  resetBlogPostsToDefault 
} from "@/lib/blog-store";
import { useToast } from "@/context/ToastContext";
import MascotFlame from "@/components/MascotFlame";

const PRESET_IMAGES = [
  { label: "Kampus UMKT Utama", url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80" },
  { label: "Belajar & Diskusi IT", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" },
  { label: "Wisuda & Beasiswa", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" },
  { label: "Perpustakaan & Riset", url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80" },
  { label: "Kota Samarinda & Mahakam", url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80" },
  { label: "Laboratorium Komputer", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80" },
];

const CATEGORIES: BlogPost["category"][] = [
  "Adaptasi & Rantau",
  "Akademik & SIKAD",
  "Beasiswa",
  "Organisasi & UKM",
  "Teknis MASTA",
  "Fasilitas Kampus",
  "Berita Kampus"
];

export default function AdminUsePage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passphraseInput, setPassphraseInput] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // CMS State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const toast = useToast();

  // Form State
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    category: "Berita Kampus",
    readTime: "4 menit baca",
    author: "Tim Redaksi Nyala UMKT",
    authorRole: "Humas & Kemahasiswaan",
    coverImage: PRESET_IMAGES[0].url,
    tags: ["MABA UMKT 2026", "Informasi Kampus"],
    content: "",
    keyTakeaways: ["Informasi terverifikasi untuk mahasiswa baru 2026.", "Dikelola oleh tim redaksi kampus."]
  });

  const [tagInput, setTagInput] = useState("");
  const [takeawayInput, setTakeawayInput] = useState("");

  const refreshPosts = () => {
    const data = getAllBlogPosts();
    setPosts(data);
  };

  useEffect(() => {
    setIsClient(true);
    // Check if session token exists in sessionStorage or cookie
    const savedToken = sessionStorage.getItem("nyala_admin_token");
    if (savedToken) {
      setIsAuthenticated(true);
      refreshPosts();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphraseInput.trim()) {
      setAuthError("Masukkan kunci sandi administrator.");
      return;
    }

    setIsVerifying(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: passphraseInput }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        sessionStorage.setItem("nyala_admin_token", data.token);
        setIsAuthenticated(true);
        refreshPosts();
        toast.success("Otorisasi Administrator Berhasil!", "Akses Diberikan");
      } else {
        setAuthError(data.message || "Kunci sandi tidak valid.");
      }
    } catch (err) {
      setAuthError("Gagal menghubungi server autentikasi.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nyala_admin_token");
    setIsAuthenticated(false);
    setPassphraseInput("");
    toast.info("Anda telah keluar dari panel administrator.", "Logged Out");
  };

  const handleSyncScraper = async () => {
    setIsSyncing(true);
    toast.info("Menghubungi endpoint resmi web.umkt.ac.id...", "Sinkronisasi Live API");

    try {
      const res = await fetch("/api/scrape-umkt");
      const data = await res.json();

      if (data.success && Array.isArray(data.articles)) {
        const imported = importScrapedPosts(data.articles);
        refreshPosts();
        if (imported > 0) {
          toast.success(`Berhasil menarik & mempublikasikan ${imported} berita resmi terbaru dari UMKT!`, "Sinkronisasi Selesai");
        } else {
          toast.info("Semua berita resmi UMKT terbaru sudah tersimpan di database lokal.", "Up-to-Date");
        }
      } else {
        toast.error("Gagal memproses data dari API UMKT.", "Kendala API");
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal terhubung ke server API UMKT.", "Koneksi Bermasalah");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleOpenNew = () => {
    setCurrentPost({
      title: "",
      slug: `panduan-baru-${Date.now()}`,
      excerpt: "",
      category: "Akademik & SIKAD",
      readTime: "4 menit baca",
      author: "Admin Biro Kemahasiswaan",
      authorRole: "Biro Kemahasiswaan & Alumni",
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      coverImage: PRESET_IMAGES[0].url,
      tags: ["MABA 2026", "Teknologi Informasi"],
      content: `### Panduan Esensial MABA UMKT 2026

Tuliskan naskah panduan lengkap di sini dengan format Markdown yang rapi.

- **Poin Pertama:** Pastikan akun SIKAD sudah aktif.
- **Poin Kedua:** Pahami sistem presensi minimum 75%.

> [!IMPORTANT]
> Seluruh mahasiswa baru wajib mengikuti tahapan orientasi MASTA 2026.`,
      keyTakeaways: ["Informasi terverifikasi untuk mahasiswa baru angkatan 2026.", "Dikelola oleh Biro Kemahasiswaan UMKT."]
    });
    setTagInput("");
    setTakeawayInput("");
    setIsEditing(true);
    setActiveTab("write");
  };

  const handleOpenEdit = (post: BlogPost) => {
    setCurrentPost({ ...post });
    setTagInput("");
    setTakeawayInput("");
    setIsEditing(true);
    setActiveTab("write");
  };

  const handleDelete = (slug: string, title: string) => {
    if (confirm(`Yakin ingin menghapus artikel: "${title}"?`)) {
      deleteBlogPost(slug);
      refreshPosts();
      toast.success(`Artikel "${title.slice(0, 25)}..." telah dihapus.`, "Dihapus");
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Kembalikan seluruh panduan artikel ke daftar bawaan awal?")) {
      resetBlogPostsToDefault();
      refreshPosts();
      toast.info("Artikel telah dikembalikan ke daftar bawaan awal.", "Reset Selesai");
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPost.title?.trim() || !currentPost.content?.trim()) {
      toast.error("Judul dan isi konten artikel wajib diisi!", "Data Belum Lengkap");
      return;
    }

    const finalSlug = currentPost.slug?.trim() || `post-${Date.now()}`;
    const newOrUpdated: BlogPost = {
      slug: finalSlug,
      title: currentPost.title.trim(),
      excerpt: currentPost.excerpt?.trim() || currentPost.content.slice(0, 140) + "...",
      category: (currentPost.category as BlogPost["category"]) || "Akademik & SIKAD",
      readTime: currentPost.readTime || "4 menit baca",
      author: currentPost.author || "Tim Redaksi Nyala",
      authorRole: currentPost.authorRole || "Biro Kemahasiswaan",
      date: currentPost.date || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      coverImage: currentPost.coverImage || PRESET_IMAGES[0].url,
      tags: currentPost.tags && currentPost.tags.length > 0 ? currentPost.tags : ["MABA 2026"],
      content: currentPost.content,
      keyTakeaways: currentPost.keyTakeaways && currentPost.keyTakeaways.length > 0 ? currentPost.keyTakeaways : ["Pedoman resmi MABA 2026."]
    };

    saveBlogPost(newOrUpdated);
    refreshPosts();
    setIsEditing(false);
    toast.success(`Artikel "${newOrUpdated.title.slice(0, 25)}..." berhasil disimpan!`, "Artikel Tersimpan");
  };

  const handleAddTag = () => {
    if (tagInput.trim() && currentPost.tags) {
      if (!currentPost.tags.includes(tagInput.trim())) {
        setCurrentPost({ ...currentPost, tags: [...currentPost.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (currentPost.tags) {
      setCurrentPost({ ...currentPost, tags: currentPost.tags.filter(t => t !== tagToRemove) });
    }
  };

  const handleAddTakeaway = () => {
    if (takeawayInput.trim() && currentPost.keyTakeaways) {
      setCurrentPost({ ...currentPost, keyTakeaways: [...currentPost.keyTakeaways, takeawayInput.trim()] });
      setTakeawayInput("");
    }
  };

  const handleRemoveTakeaway = (index: number) => {
    if (currentPost.keyTakeaways) {
      setCurrentPost({ ...currentPost, keyTakeaways: currentPost.keyTakeaways.filter((_, i) => i !== index) });
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCat = selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  if (!isClient) return null;

  // ── 1. SECURITY LOCK SCREEN GATE ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 select-none">
        {/* Ambient Glows */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-nyala-500/15 blur-[120px] pointer-events-none -top-20 -left-20" />
        <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none -bottom-20 -right-20" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 max-w-md w-full glass-card rounded-3xl p-8 sm:p-10 border border-navy-200/60 dark:border-navy-800 shadow-2xl space-y-8 text-center"
        >
          {/* Lock Icon Stage */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-nyala-600 via-nyala-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-nyala-500/30">
              <LockKey weight="bold" className="w-8 h-8" />
            </div>
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck weight="fill" className="w-4 h-4" />
                <span>Restricted Access</span>
              </div>
              <h2 className="text-2xl font-black text-navy-900 dark:text-white tracking-tight">
                Panel CMS Nyala UMKT
              </h2>
              <p className="text-xs text-navy-500 dark:text-navy-400">
                Sistem pengelolaan konten panduan dan sinkronisasi REST API resmi.
              </p>
            </div>
          </div>

          {/* Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-navy-700 dark:text-navy-300 flex items-center gap-1.5">
                <Key weight="bold" className="w-3.5 h-3.5 text-nyala-500" />
                <span>Kunci Sandi Administrator</span>
              </label>
              <input
                type="password"
                value={passphraseInput}
                onChange={(e) => setPassphraseInput(e.target.value)}
                placeholder="Masukkan Passphrase Keamanan..."
                className="w-full px-4 py-3 rounded-xl bg-navy-50 dark:bg-navy-900/80 border border-navy-200 dark:border-navy-700 text-sm font-mono text-navy-900 dark:text-white placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-nyala-500 transition-all"
                autoFocus
              />
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 text-left"
              >
                <WarningCircle weight="fill" className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-nyala-600 to-amber-500 hover:from-nyala-500 hover:to-amber-400 text-white font-extrabold text-sm transition-all shadow-lg shadow-nyala-500/25 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <ArrowClockwise weight="bold" className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Otorisasi...</span>
                </>
              ) : (
                <>
                  <LockKey weight="bold" className="w-4 h-4" />
                  <span>Buka Akses Panel CMS</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Backlink */}
          <div className="pt-2 border-t border-navy-100 dark:border-navy-800">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-400 hover:text-nyala-500 transition-colors"
            >
              <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda Utama</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── 2. FULL AUTHORIZED CMS DASHBOARD ──
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* CMS Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-card rounded-3xl border border-navy-200/60 dark:border-navy-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-nyala-600 to-amber-400 text-white flex items-center justify-center shadow-md shadow-nyala-500/30 flex-shrink-0">
            <Article weight="fill" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white tracking-tight">
                Panel CMS Nyala UMKT 2026
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase border border-emerald-500/20">
                Authorized
              </span>
            </div>
            <p className="text-xs text-navy-500 dark:text-navy-400">
              Kelola artikel panduan MABA & sinkronisasi live data resmi web.umkt.ac.id
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSyncScraper}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-nyala-500/10 hover:bg-nyala-500/20 text-nyala-600 dark:text-nyala-400 border border-nyala-500/20 text-xs font-bold transition-all disabled:opacity-50"
          >
            <CloudArrowDown weight="bold" className={`w-4 h-4 ${isSyncing ? "animate-bounce" : ""}`} />
            <span>{isSyncing ? "Menarik Data API..." : "Tarik Berita Live API"}</span>
          </button>

          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-nyala-500 hover:bg-nyala-600 text-white text-xs font-extrabold transition-all shadow-md shadow-nyala-500/25 active:scale-95"
          >
            <Plus weight="bold" className="w-4 h-4" />
            <span>Tulis Panduan Baru</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all border border-rose-500/20"
            title="Kunci / Keluar Admin"
          >
            <SignOut weight="bold" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Modal Drawer */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl bg-white dark:bg-navy-900 rounded-3xl border border-navy-200 dark:border-navy-800 shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-navy-100 dark:border-navy-800 flex items-center justify-between bg-navy-50/50 dark:bg-navy-950/50">
                <div className="flex items-center gap-2">
                  <PencilSimple weight="bold" className="w-5 h-5 text-nyala-500" />
                  <h3 className="text-base font-black text-navy-900 dark:text-white">
                    {currentPost.slug?.startsWith("panduan-baru") ? "Buat Panduan Baru" : "Edit Panduan Artikel"}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-xl bg-navy-200/60 dark:bg-navy-800 p-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab("write")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activeTab === "write" ? "bg-white dark:bg-navy-700 text-navy-900 dark:text-white shadow-sm" : "text-navy-500"
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activeTab === "preview" ? "bg-white dark:bg-navy-700 text-navy-900 dark:text-white shadow-sm" : "text-navy-500"
                      }`}
                    >
                      Preview
                    </button>
                  </div>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-1.5 rounded-full hover:bg-navy-200 dark:hover:bg-navy-800 text-navy-500 transition-colors"
                  >
                    <X weight="bold" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSavePost} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {activeTab === "write" ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Judul */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-navy-700 dark:text-navy-300">
                          Judul Panduan / Artikel <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={currentPost.title}
                          onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                          placeholder="Contoh: Strategi Efektif Pengisian KRS di SIKAD UMKT"
                          className="w-full px-4 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-sm font-semibold text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nyala-500"
                        />
                      </div>

                      {/* Slug */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy-700 dark:text-navy-300">
                          Slug URL
                        </label>
                        <input
                          type="text"
                          value={currentPost.slug}
                          onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                          placeholder="panduan-krs-sikad"
                          className="w-full px-4 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs font-mono text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nyala-500"
                        />
                      </div>

                      {/* Kategori */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy-700 dark:text-navy-300">
                          Kategori
                        </label>
                        <select
                          value={currentPost.category}
                          onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value as BlogPost["category"] })}
                          className="w-full px-4 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs font-semibold text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nyala-500"
                        >
                          {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Penulis */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy-700 dark:text-navy-300">
                          Nama Penulis
                        </label>
                        <input
                          type="text"
                          value={currentPost.author}
                          onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs text-navy-900 dark:text-white"
                        />
                      </div>

                      {/* Peran Penulis */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy-700 dark:text-navy-300">
                          Peran / Jabatan Penulis
                        </label>
                        <input
                          type="text"
                          value={currentPost.authorRole}
                          onChange={(e) => setCurrentPost({ ...currentPost, authorRole: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs text-navy-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Ringkasan Singkat (Excerpt) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-700 dark:text-navy-300">
                        Ringkasan Singkat (Excerpt)
                      </label>
                      <textarea
                        rows={2}
                        value={currentPost.excerpt}
                        onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                        placeholder="Rangkuman singkat inti bahasan panduan..."
                        className="w-full px-4 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nyala-500"
                      />
                    </div>

                    {/* Cover Image Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-navy-700 dark:text-navy-300 flex items-center gap-1.5">
                        <ImageIcon weight="bold" className="w-4 h-4 text-nyala-500" />
                        <span>Pilihan Gambar Cover</span>
                      </label>
                      
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {PRESET_IMAGES.map((img, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setCurrentPost({ ...currentPost, coverImage: img.url })}
                            className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                              currentPost.coverImage === img.url ? "border-nyala-500 ring-2 ring-nyala-500/30" : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>

                      <input
                        type="url"
                        value={currentPost.coverImage}
                        onChange={(e) => setCurrentPost({ ...currentPost, coverImage: e.target.value })}
                        placeholder="Atau tempel URL gambar custom (https://...)"
                        className="w-full px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs text-navy-900 dark:text-white"
                      />
                    </div>

                    {/* Tags Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-700 dark:text-navy-300">
                        Tag / Label
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); } }}
                          placeholder="Ketik tag lalu tekan Enter / Tambah..."
                          className="flex-1 px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs text-navy-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="px-4 py-2 bg-navy-200 dark:bg-navy-800 hover:bg-nyala-500 hover:text-white text-xs font-bold rounded-xl transition-colors"
                        >
                          Tambah Tag
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {currentPost.tags?.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 text-xs font-semibold">
                            #{tag}
                            <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-rose-500">
                              <X weight="bold" className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content Markdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-700 dark:text-navy-300">
                        Konten Lengkap (Markdown) <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={10}
                        required
                        value={currentPost.content}
                        onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs font-mono text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nyala-500"
                      />
                    </div>
                  </>
                ) : (
                  /* Preview Tab */
                  <div className="space-y-4 prose dark:prose-invert max-w-none text-xs">
                    <h1>{currentPost.title || "Tanpa Judul"}</h1>
                    <p className="lead italic text-navy-500">{currentPost.excerpt}</p>
                    {currentPost.coverImage && (
                      <img src={currentPost.coverImage} alt="Cover Preview" className="w-full rounded-2xl aspect-video object-cover" />
                    )}
                    <div className="p-4 rounded-xl bg-nyala-500/10 border border-nyala-500/20">
                      <strong>Key Takeaways:</strong>
                      <ul className="mt-1 list-disc list-inside">
                        {currentPost.keyTakeaways?.map((kt, i) => (
                          <li key={i}>{kt}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="whitespace-pre-wrap font-sans">{currentPost.content}</div>
                  </div>
                )}

                {/* Footer Submit */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-navy-100 dark:border-navy-800">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 text-xs font-bold hover:bg-navy-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-nyala-500 hover:bg-nyala-600 text-white text-xs font-extrabold shadow-md shadow-nyala-500/30 transition-all flex items-center gap-2"
                  >
                    <FloppyDisk weight="bold" className="w-4 h-4" />
                    <span>Simpan & Publikasikan</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 glass-card rounded-2xl border border-navy-200/60 dark:border-navy-800">
        <div className="relative w-full sm:w-80">
          <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari naskah panduan / tag..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nyala-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-nyala-500 text-white shadow-sm"
                : "bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-400 hover:bg-navy-200"
            }`}
          >
            Semua ({posts.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = posts.filter(p => p.category === cat).length;
            if (count === 0) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-nyala-500 text-white shadow-sm"
                    : "bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-400 hover:bg-navy-200"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts Table List */}
      <div className="glass-card rounded-3xl border border-navy-200/60 dark:border-navy-800 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-6 border-b border-navy-100 dark:border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen weight="bold" className="w-5 h-5 text-nyala-500" />
            <h2 className="text-base font-black text-navy-900 dark:text-white">
              Daftar Naskah Panduan MABA ({filteredPosts.length})
            </h2>
          </div>

          <button
            onClick={handleResetDefaults}
            className="text-xs font-bold text-navy-400 hover:text-rose-500 transition-colors"
          >
            Reset Default
          </button>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <MascotFlame size="lg" mood="confused" className="mx-auto" />
            <p className="text-sm font-bold text-navy-700 dark:text-navy-300">
              Tidak ada artikel yang cocok dengan kriteria pencarian.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-navy-100 dark:divide-navy-800">
            {filteredPosts.map((post) => (
              <div
                key={post.slug}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-navy-50/50 dark:hover:bg-navy-900/50 transition-colors"
              >
                <div className="flex items-start gap-4 max-w-2xl">
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover flex-shrink-0 border border-navy-200/60 dark:border-navy-800"
                    />
                  )}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-[10px] font-extrabold uppercase">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-navy-400">
                        {post.date}
                      </span>
                      <span className="text-[11px] text-navy-400">• {post.readTime}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-navy-900 dark:text-white line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Row Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2.5 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300 hover:text-nyala-500 transition-colors"
                    title="Lihat Pratinjau Publik"
                  >
                    <Eye weight="bold" className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
                    title="Edit Artikel"
                  >
                    <PencilSimple weight="bold" className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(post.slug, post.title)}
                    className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors"
                    title="Hapus Artikel"
                  >
                    <Trash weight="bold" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
