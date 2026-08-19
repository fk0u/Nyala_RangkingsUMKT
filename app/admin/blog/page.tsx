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
  WarningCircle
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

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
    refreshPosts();
  }, []);

  const handleSyncScraper = async () => {
    setIsSyncing(true);
    toast.info("Menghubungi portal berita resmi UMKT...", "Sinkronisasi Scraper");

    try {
      const res = await fetch("/api/scrape-umkt");
      const data = await res.json();

      if (data.success && Array.isArray(data.articles)) {
        const imported = importScrapedPosts(data.articles);
        refreshPosts();
        if (imported > 0) {
          toast.success(`Berhasil menarik ${imported} berita resmi terbaru dari UMKT!`, "Scraper Selesai");
        } else {
          toast.info("Semua berita resmi UMKT terbaru sudah ada di dalam blog.", "Up-to-Date");
        }
      } else {
        toast.error("Gagal memproses data dari scraper UMKT.", "Kendala API");
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
      slug: `artikel-baru-${Date.now()}`,
      excerpt: "",
      category: "Berita Kampus",
      readTime: "4 menit baca",
      author: "Admin Biro Kemahasiswaan",
      authorRole: "Biro Kemahasiswaan",
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      coverImage: PRESET_IMAGES[0].url,
      tags: ["MABA 2026", "UMKT Samarinda"],
      content: "### Sub Judul Artikel\n\nTuliskan narasi artikel lengkap di sini dengan format Markdown yang rapi.\n\n- Poin pertama\n- Poin kedua\n\n> Catatan penting untuk mahasiswa baru angkatan 2026.",
      keyTakeaways: ["Poin inti kesimpulan artikel.", "Pedoman resmi bagi mahasiswa."]
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

    const finalSlug = currentPost.slug?.trim() || `post-${Date.now()}`;
    const newOrUpdated: BlogPost = {
      slug: finalSlug,
      title: currentPost.title.trim(),
      excerpt: currentPost.excerpt?.trim() || currentPost.content.slice(0, 140) + "...",
      category: (currentPost.category as BlogPost["category"]) || "Berita Kampus",
      readTime: currentPost.readTime || "4 menit baca",
      author: currentPost.author || "Admin UMKT",
      authorRole: currentPost.authorRole || "Biro Kemahasiswaan",
      date: currentPost.date || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      coverImage: currentPost.coverImage || PRESET_IMAGES[0].url,
      tags: currentPost.tags && currentPost.tags.length > 0 ? currentPost.tags : ["MABA 2026"],
      content: currentPost.content,
      keyTakeaways: currentPost.keyTakeaways && currentPost.keyTakeaways.length > 0 ? currentPost.keyTakeaways : ["Informasi resmi kampus."],
      sourceUrl: currentPost.sourceUrl
    };

    saveBlogPost(newOrUpdated);
    refreshPosts();
    setIsEditing(false);
    toast.success(`Artikel "${newOrUpdated.title.slice(0, 25)}..." berhasil disimpan!`, "Tersimpan");
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const updatedTags = [...(currentPost.tags || []), tagInput.trim()];
    setCurrentPost({ ...currentPost, tags: updatedTags });
    setTagInput("");
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = (currentPost.tags || []).filter((_, i) => i !== index);
    setCurrentPost({ ...currentPost, tags: updatedTags });
  };

  const handleAddTakeaway = () => {
    if (!takeawayInput.trim()) return;
    const updated = [...(currentPost.keyTakeaways || []), takeawayInput.trim()];
    setCurrentPost({ ...currentPost, keyTakeaways: updated });
    setTakeawayInput("");
  };

  const handleRemoveTakeaway = (index: number) => {
    const updated = (currentPost.keyTakeaways || []).filter((_, i) => i !== index);
    setCurrentPost({ ...currentPost, keyTakeaways: updated });
  };

  const filteredPosts = posts.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-200/80 dark:border-navy-800">
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy-500 hover:text-nyala-600 dark:text-navy-400 dark:hover:text-nyala-400 transition-colors mb-2"
          >
            <ArrowLeft weight="bold" className="w-4 h-4" />
            <span>Kembali ke Blog MABA</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white tracking-tight">
              Dashboard Admin & Scraper Blog UMKT
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-bold">
              CMS Panel
            </span>
          </div>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400 mt-1">
            Kelola publikasi wawasan, edit artikel, dan sinkronkan berita resmi dari portal website UMKT.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSyncScraper}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <CloudArrowDown weight="bold" className={`w-4 h-4 ${isSyncing ? "animate-bounce" : ""}`} />
            <span>{isSyncing ? "Menarik Berita UMKT..." : "Tarik Berita Resmi UMKT"}</span>
          </button>

          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-nyala-600 hover:bg-nyala-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg shadow-nyala-600/20 transition-all"
          >
            <Plus weight="bold" className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-navy-200/60 dark:border-navy-800">
          <div className="flex items-center justify-between text-navy-500 dark:text-navy-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Total Artikel</span>
            <Article weight="duotone" className="w-5 h-5 text-nyala-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white">
            {posts.length}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-navy-200/60 dark:border-navy-800">
          <div className="flex items-center justify-between text-navy-500 dark:text-navy-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Berita Kampus</span>
            <Globe weight="duotone" className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white">
            {posts.filter(p => p.category === "Berita Kampus").length}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-navy-200/60 dark:border-navy-800">
          <div className="flex items-center justify-between text-navy-500 dark:text-navy-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Panduan MABA</span>
            <Sparkle weight="duotone" className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white">
            {posts.filter(p => p.category !== "Berita Kampus").length}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-navy-200/60 dark:border-navy-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400 block mb-1">
              Reset Data
            </span>
            <button
              onClick={handleResetDefaults}
              className="text-xs font-bold text-red-600 hover:text-red-700 dark:text-red-400 underline"
            >
              Reset Bawaan
            </button>
          </div>
          <MascotFlame size="sm" mood="withClipboard" />
        </div>
      </div>

      {/* Search & List Table */}
      <div className="glass-card rounded-3xl p-6 border border-navy-200/60 dark:border-navy-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              placeholder="Cari judul atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-nyala-500 dark:text-white"
            />
          </div>

          <span className="text-xs text-navy-500 dark:text-navy-400 font-medium">
            Menampilkan {filteredPosts.length} dari {posts.length} artikel
          </span>
        </div>

        {/* Table List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-navy-200 dark:border-navy-800 text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wider">
                <th className="py-3 px-4">Artikel & Cover</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Penulis & Tanggal</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 dark:divide-navy-800/60 text-xs sm:text-sm">
              {filteredPosts.map((post) => (
                <tr key={post.slug} className="hover:bg-navy-50/50 dark:hover:bg-navy-900/40 transition-colors">
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="flex items-center gap-3">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-navy-200 dark:border-navy-700 shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-nyala-500/10 flex items-center justify-center text-nyala-600 flex-shrink-0">
                          <ImageIcon weight="bold" className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="font-bold text-navy-900 dark:text-white hover:text-nyala-600 dark:hover:text-nyala-400 line-clamp-1"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-1 mt-0.5">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 font-semibold text-xs">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-semibold text-navy-800 dark:text-navy-200">{post.author}</p>
                    <p className="text-xs text-navy-500 dark:text-navy-400">{post.date}</p>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 dark:hover:bg-navy-700 text-navy-700 dark:text-navy-300 transition-colors"
                        title="Lihat Halaman Artikel"
                      >
                        <Eye weight="bold" className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors"
                        title="Edit Artikel"
                      >
                        <PencilSimple weight="bold" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug, post.title)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
                        title="Hapus Artikel"
                      >
                        <Trash weight="bold" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal Drawer */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-navy-900 rounded-3xl border border-navy-200 dark:border-navy-800 shadow-2xl overflow-hidden flex flex-col my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-navy-200 dark:border-navy-800">
                <div className="flex items-center gap-2">
                  <Article weight="duotone" className="w-5 h-5 text-nyala-500" />
                  <h3 className="text-base sm:text-lg font-bold text-navy-900 dark:text-white">
                    {currentPost.slug ? "Edit Artikel Blog" : "Tulis Artikel Baru"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1.5 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-800 text-navy-500 dark:text-navy-400 transition-colors"
                >
                  <X weight="bold" className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form Content */}
              <form onSubmit={handleSavePost} className="p-6 overflow-y-auto space-y-6 flex-1">
                
                {/* Title & Slug */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 mb-1.5">
                      Judul Artikel *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentPost.title || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                        setCurrentPost({
                          ...currentPost,
                          title: val,
                          slug: currentPost.slug?.startsWith("artikel-baru-") ? autoSlug : currentPost.slug
                        });
                      }}
                      placeholder="Contoh: Panduan Mengakses SIKAD & Registrasi KRS 2026..."
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-sm font-semibold text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 mb-1.5">
                        URL Slug (Path Identitas) *
                      </label>
                      <input
                        type="text"
                        required
                        value={currentPost.slug || ""}
                        onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-xs font-mono text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 mb-1.5">
                        Kategori Artikel
                      </label>
                      <select
                        value={currentPost.category}
                        onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value as BlogPost["category"] })}
                        className="w-full px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-xs font-semibold text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Excerpt Summary */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 mb-1.5">
                    Ringkasan Singkat (Excerpt)
                  </label>
                  <textarea
                    rows={2}
                    value={currentPost.excerpt || ""}
                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    placeholder="Ringkasan 1-2 kalimat pengantar artikel..."
                    className="w-full px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-xs text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                  />
                </div>

                {/* Author & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 mb-1.5">
                      Nama Penulis
                    </label>
                    <input
                      type="text"
                      value={currentPost.author || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-xs text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 mb-1.5">
                      Divisi / Peran Penulis
                    </label>
                    <input
                      type="text"
                      value={currentPost.authorRole || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, authorRole: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-xs text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 mb-1.5">
                      Estimasi Waktu Baca
                    </label>
                    <input
                      type="text"
                      value={currentPost.readTime || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, readTime: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-xs text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Cover Image & Presets */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300">
                    URL Cover Image
                  </label>
                  <input
                    type="url"
                    value={currentPost.coverImage || ""}
                    onChange={(e) => setCurrentPost({ ...currentPost, coverImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-xs text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                  />
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    <span className="text-xs text-navy-400 whitespace-nowrap">Pilihan Preset:</span>
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img.label}
                        type="button"
                        onClick={() => setCurrentPost({ ...currentPost, coverImage: img.url })}
                        className={`text-xs px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors ${
                          currentPost.coverImage === img.url
                            ? "border-nyala-500 bg-nyala-500/10 text-nyala-600 font-bold"
                            : "border-navy-200 dark:border-navy-800 text-navy-600 dark:text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-800"
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Markdown Content Editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300">
                      Isi Naskah Artikel (Markdown Format) *
                    </label>
                    <div className="flex items-center gap-1 p-1 bg-navy-100 dark:bg-navy-800 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setActiveTab("write")}
                        className={`px-3 py-1 rounded-md font-bold transition-all ${
                          activeTab === "write" ? "bg-white dark:bg-navy-900 text-navy-900 dark:text-white shadow-sm" : "text-navy-500"
                        }`}
                      >
                        Editor
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("preview")}
                        className={`px-3 py-1 rounded-md font-bold transition-all ${
                          activeTab === "preview" ? "bg-white dark:bg-navy-900 text-navy-900 dark:text-white shadow-sm" : "text-navy-500"
                        }`}
                      >
                        Pratinjau
                      </button>
                    </div>
                  </div>

                  {activeTab === "write" ? (
                    <textarea
                      rows={10}
                      required
                      value={currentPost.content || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                      placeholder="Gunakan format Markdown: # Judul, ## Sub, - Poin, **Tebal**, dll..."
                      className="w-full px-4 py-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-xs sm:text-sm font-mono text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                    />
                  ) : (
                    <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 prose dark:prose-invert max-w-none text-xs sm:text-sm min-h-[200px] whitespace-pre-wrap">
                      {currentPost.content || "*Belum ada konten.*"}
                    </div>
                  )}
                </div>

                {/* Key Takeaways */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300">
                    Poin Ringkasan Utama (Key Takeaways)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={takeawayInput}
                      onChange={(e) => setTakeawayInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTakeaway(); } }}
                      placeholder="Ketik poin penting lalu tekan Enter atau tombol Tambah..."
                      className="flex-1 px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-xs text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTakeaway}
                      className="px-4 py-2 rounded-xl bg-navy-800 text-white font-bold text-xs hover:bg-navy-700"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {(currentPost.keyTakeaways || []).map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs">
                        <span className="flex items-center gap-2">
                          <CheckCircle weight="bold" className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          {t}
                        </span>
                        <button type="button" onClick={() => handleRemoveTakeaway(idx)} className="text-red-500 hover:text-red-700">
                          <X weight="bold" className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300">
                    Tag Artikel
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); } }}
                      placeholder="Contoh: SIKAD, KRS, Beasiswa..."
                      className="flex-1 px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-700 text-xs text-navy-900 dark:text-white focus:ring-2 focus:ring-nyala-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 rounded-xl bg-navy-800 text-white font-bold text-xs hover:bg-navy-700"
                    >
                      Tambah Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(currentPost.tags || []).map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-100 dark:bg-navy-800 text-xs font-semibold text-navy-700 dark:text-navy-300">
                        #{tag}
                        <button type="button" onClick={() => handleRemoveTag(idx)} className="text-navy-400 hover:text-red-500">
                          <X weight="bold" className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submit & Cancel */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-navy-200 dark:border-navy-800">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 text-xs sm:text-sm font-bold hover:bg-navy-200 dark:hover:bg-navy-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-nyala-600 hover:bg-nyala-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-nyala-600/25 transition-all"
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

    </div>
  );
}
