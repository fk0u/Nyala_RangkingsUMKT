"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
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
  SignOut
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
  { label: "Kampus UMKT", url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80" },
  { label: "Belajar & Diskusi", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" },
  { label: "Wisuda & Beasiswa", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" },
  { label: "Perpustakaan & Buku", url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80" },
  { label: "Rantau & Kota", url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80" },
  { label: "Teknologi & Lab", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80" },
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
  const toast = useToast();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // CMS State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

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
    // Check existing session token
    const token = sessionStorage.getItem("nyala_admin_session");
    if (token) {
      setIsAuthenticated(true);
      refreshPosts();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    setIsAuthenticating(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (data.success && data.sessionToken) {
        sessionStorage.setItem("nyala_admin_session", data.sessionToken);
        setIsAuthenticated(true);
        refreshPosts();
        toast.success("Autentikasi admin berhasil!", "Selamat Datang");
      } else {
        setAuthError(data.message || "Kata sandi salah.");
      }
    } catch (err) {
      setAuthError("Gagal menghubungi server autentikasi.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nyala_admin_session");
    setIsAuthenticated(false);
    setPasswordInput("");
    toast.info("Sesi admin telah berakhir.", "Logout");
  };

  const handleSyncScraper = async () => {
    setIsSyncing(true);
    toast.info("Menghubungi portal resmi web.umkt.ac.id/api/berita...", "Sinkronisasi");

    try {
      const res = await fetch("/api/scrape-umkt");
      const data = await res.json();

      if (data.success && Array.isArray(data.articles)) {
        const imported = importScrapedPosts(data.articles);
        refreshPosts();
        if (imported > 0) {
          toast.success(`Berhasil menarik ${imported} artikel resmi terbaru dari UMKT!`, "Sinkron Selesai");
        } else {
          toast.info("Semua artikel warta resmi UMKT sudah tersinkronisasi.", "Up-to-Date");
        }
      } else {
        toast.error("Gagal memproses data scraper UMKT.", "Kendala API");
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal terhubung ke endpoint scraper.", "Koneksi Bermasalah");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleOpenNew = () => {
    setCurrentPost({
      title: "",
      slug: `panduan-baru-${Date.now()}`,
      excerpt: "",
      category: "Berita Kampus",
      readTime: "4 menit baca",
      author: "Admin Biro Kemahasiswaan",
      authorRole: "Biro Kemahasiswaan UMKT",
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      coverImage: PRESET_IMAGES[0].url,
      tags: ["MABA 2026", "UMKT Samarinda"],
      content: "### Sub Judul Panduan\n\nTuliskan narasi panduan lengkap di sini dengan format Markdown yang rapi.\n\n- Poin pertama\n- Poin kedua\n\n> Catatan penting untuk mahasiswa baru angkatan 2026.",
      keyTakeaways: ["Poin inti kesimpulan panduan.", "Pedoman resmi bagi mahasiswa."]
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
      toast.success(`Artikel "${title.slice(0, 20)}..." telah dihapus.`, "Dihapus");
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Kembalikan seluruh artikel ke daftar bawaan awal?")) {
      resetBlogPostsToDefault();
      refreshPosts();
      toast.info("Artikel telah dikembalikan ke daftar bawaan awal.", "Reset");
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPost.title?.trim() || !currentPost.content?.trim()) {
      toast.error("Judul dan isi konten artikel wajib diisi!", "Data Belum Lengkap");
      return;
    }

    const finalSlug = currentPost.slug?.trim() || `panduan-${Date.now()}`;
    const newOrUpdated: BlogPost = {
      slug: finalSlug,
      title: currentPost.title.trim(),
      excerpt: currentPost.excerpt?.trim() || currentPost.content.slice(0, 140) + "...",
      category: (currentPost.category as BlogPost["category"]) || "Berita Kampus",
      readTime: currentPost.readTime || "4 menit baca",
      date: currentPost.date || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      author: currentPost.author || "Tim Redaksi Nyala UMKT",
      authorRole: currentPost.authorRole || "Humas & Kemahasiswaan",
      coverImage: currentPost.coverImage || PRESET_IMAGES[0].url,
      tags: currentPost.tags && currentPost.tags.length > 0 ? currentPost.tags : ["MABA UMKT 2026"],
      content: currentPost.content.trim(),
      keyTakeaways: currentPost.keyTakeaways && currentPost.keyTakeaways.length > 0
        ? currentPost.keyTakeaways
        : ["Informasi terverifikasi untuk mahasiswa baru 2026."]
    };

    saveBlogPost(newOrUpdated);
    refreshPosts();
    setIsEditing(false);
    toast.success(`Artikel "${newOrUpdated.title.slice(0, 25)}..." berhasil disimpan!`, "Tersimpan");
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const existing = currentPost.tags || [];
    if (!existing.includes(tagInput.trim())) {
      setCurrentPost({ ...currentPost, tags: [...existing, tagInput.trim()] });
    }
    setTagInput("");
  };

  const handleRemoveTag = (t: string) => {
    setCurrentPost({ ...currentPost, tags: (currentPost.tags || []).filter((item) => item !== t) });
  };

  const handleAddTakeaway = () => {
    if (!takeawayInput.trim()) return;
    const existing = currentPost.keyTakeaways || [];
    setCurrentPost({ ...currentPost, keyTakeaways: [...existing, takeawayInput.trim()] });
    setTakeawayInput("");
  };

  const handleRemoveTakeaway = (idx: number) => {
    setCurrentPost({
      ...currentPost,
      keyTakeaways: (currentPost.keyTakeaways || []).filter((_, i) => i !== idx)
    });
  };

  // ── 1. LOGIN SCREEN (If not authenticated) ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-card p-8 sm:p-10 rounded-3xl border border-navy-200/60 dark:border-navy-800 max-w-md w-full space-y-6 shadow-2xl text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 flex items-center justify-center mx-auto border border-nyala-500/20">
            <Lock weight="bold" className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-nyala-500 font-mono">
              RESTRICTED ACCESS • /ADMINUSE
            </span>
            <h1 className="text-2xl font-black text-navy-900 dark:text-white">
              Panel Pengelola Konten Nyala
            </h1>
            <p className="text-xs text-navy-500 dark:text-navy-400 leading-relaxed">
              Halaman ini terproteksi. Masukkan kata sandi admin yang tersimpan di konfigurasi lokal (<code className="font-mono text-nyala-500">.admin.config.local</code>).
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-700 dark:text-navy-300">
                Kata Sandi Admin
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200/60 dark:border-navy-800 text-xs focus:ring-2 focus:ring-nyala-500 outline-none text-navy-900 dark:text-white font-mono"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <WarningCircle weight="fill" className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-nyala-500 to-amber-500 hover:from-nyala-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-nyala-500/25 transition-all active:scale-95 disabled:opacity-50"
            >
              {isAuthenticating ? "Memverifikasi..." : "Masuk ke Panel Admin"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── 2. AUTHENTICATED CMS DASHBOARD ──
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-200/60 dark:border-navy-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Admin Mode Aktif • .admin.config.local Terhubung</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white">
            CMS Pengelola Panduan & Warta
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSyncScraper}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            <CloudArrowDown weight="bold" className={`w-4 h-4 ${isSyncing ? "animate-bounce" : ""}`} />
            <span>{isSyncing ? "Menyinkronkan..." : "Tarik Berita Resmi API"}</span>
          </button>

          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-nyala-500 hover:bg-nyala-600 text-white text-xs font-bold shadow-md shadow-nyala-500/25 transition-all active:scale-95"
          >
            <Plus weight="bold" className="w-4 h-4" />
            <span>Tulis Panduan Baru</span>
          </button>

          <button
            onClick={handleLogout}
            title="Keluar dari sesi admin"
            className="p-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 transition-all active:scale-95"
          >
            <SignOut weight="bold" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Modal Drawer */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-navy-900 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-navy-200 dark:border-navy-800 shadow-2xl p-6 sm:p-8 space-y-6 relative"
            >
              <div className="flex items-center justify-between border-b border-navy-100 dark:border-navy-800 pb-4">
                <h3 className="text-lg font-black text-navy-900 dark:text-white">
                  {currentPost.slug?.startsWith("panduan-baru") ? "Tulis Naskah Panduan Baru" : "Edit Naskah Panduan"}
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300"
                >
                  <X weight="bold" className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSavePost} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-navy-700 dark:text-navy-300">Judul Artikel</label>
                    <input
                      type="text"
                      value={currentPost.title || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                      placeholder="Judul panduan..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-navy-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-navy-700 dark:text-navy-300">URL Slug</label>
                    <input
                      type="text"
                      value={currentPost.slug || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                      placeholder="slug-artikel..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 font-mono text-navy-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-navy-700 dark:text-navy-300">Kategori</label>
                    <select
                      value={currentPost.category}
                      onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-navy-900 dark:text-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-navy-700 dark:text-navy-300">Waktu Baca</label>
                    <input
                      type="text"
                      value={currentPost.readTime || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, readTime: e.target.value })}
                      placeholder="4 menit baca"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-navy-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-navy-700 dark:text-navy-300">Penulis</label>
                    <input
                      type="text"
                      value={currentPost.author || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                      placeholder="Nama Penulis"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-navy-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-navy-700 dark:text-navy-300">Ringkasan (Excerpt)</label>
                  <textarea
                    rows={2}
                    value={currentPost.excerpt || ""}
                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    placeholder="Ringkasan singkat naskah panduan..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-navy-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-navy-700 dark:text-navy-300">Isi Naskah (Markdown Format)</label>
                  <textarea
                    rows={10}
                    value={currentPost.content || ""}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                    placeholder="Tulis artikel dengan Markdown (### Subjudul, - Poin, > Kutipan)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 font-mono text-navy-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-navy-100 dark:border-navy-800">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-nyala-500 hover:bg-nyala-600 text-white font-bold shadow-md"
                  >
                    Simpan Perubahan
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Article List Table */}
      <div className="glass-card rounded-3xl border border-navy-200/60 dark:border-navy-800 overflow-hidden shadow-xl">
        <div className="p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-navy-100 dark:border-navy-800">
          <h3 className="text-base font-extrabold text-navy-900 dark:text-white">
            Daftar Seluruh Naskah Panduan ({posts.length})
          </h3>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="text-xs font-bold text-navy-500 hover:text-navy-800 dark:hover:text-white"
            >
              Reset ke Default
            </button>
          </div>
        </div>

        <div className="divide-y divide-navy-100 dark:divide-navy-800">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-navy-50/50 dark:hover:bg-navy-950/50 transition-colors"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-[10px] font-mono text-navy-400">
                  <span className="px-2 py-0.5 rounded bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 font-bold">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h4 className="text-sm font-bold text-navy-900 dark:text-white">
                  {post.title}
                </h4>
                <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-1">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/panduan/${post.slug}`}
                  target="_blank"
                  className="p-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:bg-nyala-500 hover:text-white transition-all"
                  title="Lihat Pratinjau Publik"
                >
                  <Eye weight="bold" className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => handleOpenEdit(post)}
                  className="p-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:bg-blue-500 hover:text-white transition-all"
                  title="Edit Naskah"
                >
                  <PencilSimple weight="bold" className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(post.slug, post.title)}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all"
                  title="Hapus Naskah"
                >
                  <Trash weight="bold" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
