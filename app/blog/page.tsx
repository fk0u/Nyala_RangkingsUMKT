"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Newspaper, 
  MagnifyingGlass, 
  Clock, 
  Tag, 
  User, 
  ArrowRight, 
  Sparkle, 
  Fire, 
  BookOpen, 
  Headset, 
  GraduationCap,
  Buildings,
  Laptop,
  Globe,
  Gear,
  Image as ImageIcon
} from "@phosphor-icons/react";
import { BlogPost, OFFICIAL_CONTACTS } from "@/lib/masta-data";
import { getAllBlogPosts } from "@/lib/blog-store";
import BacklinkBanner from "@/components/BacklinkBanner";
import AdminContactCard from "@/components/AdminContactCard";
import MascotFlame from "@/components/MascotFlame";
import UMKTLiveFeed from "@/components/UMKTLiveFeed";

const CATEGORIES = [
  "Semua",
  "Berita Kampus",
  "Adaptasi & Rantau",
  "Akademik & SIKAD",
  "Beasiswa",
  "Organisasi & UKM",
  "Teknis MASTA",
  "Fasilitas Kampus"
];

export default function BlogIndexPage() {
  const [mainView, setMainView] = useState<"live_portal" | "panduan_maba">("live_portal");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPosts(getAllBlogPosts());
    setIsLoaded(true);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchCat = selectedCategory === "Semua" || post.category === selectedCategory;
    const matchSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchCat && matchSearch;
  });

  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* 1. Header Hero with Admin CMS Trigger */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl mx-auto">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-bold uppercase tracking-wider">
            <Newspaper weight="bold" className="w-4 h-4" />
            <span>Wawasan & Berita Resmi MABA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 dark:text-white tracking-tight leading-tight">
            Blog & Warta Kampus <br />
            <span className="fire-text-gradient">Mahasiswa Baru UMKT 2026</span>
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed max-w-2xl">
            Kumpulan tips praktis, panduan adaptasi Samarinda, strategi KRS & IPK 4.0, info beasiswa, serta integrasi warta resmi langsung dari portal Universitas Muhammadiyah Kalimantan Timur.
          </p>
        </div>

        {/* CMS Admin Link Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-navy-900 hover:bg-navy-800 dark:bg-navy-800 dark:hover:bg-navy-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all border border-navy-700 whitespace-nowrap"
          >
            <Gear weight="bold" className="w-4 h-4 text-nyala-400" />
            <span>Admin CMS & Scraper UMKT</span>
          </Link>
        </div>
      </div>

      {/* 2. Main View Mode Segmented Switcher */}
      <div className="flex items-center justify-center">
        <div className="p-1.5 rounded-2xl bg-navy-100 dark:bg-navy-900 border border-navy-200/60 dark:border-navy-800 flex items-center gap-2 max-w-xl w-full shadow-xs">
          <button
            onClick={() => setMainView("live_portal")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              mainView === "live_portal"
                ? "bg-white dark:bg-navy-800 text-nyala-600 dark:text-nyala-400 shadow-sm"
                : "text-navy-500 hover:text-navy-900 dark:hover:text-white"
            }`}
          >
            <Newspaper weight="bold" className="w-4 h-4 text-nyala-500" />
            <span>Warta & Hub Portal API UMKT</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
              Live
            </span>
          </button>

          <button
            onClick={() => setMainView("panduan_maba")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              mainView === "panduan_maba"
                ? "bg-white dark:bg-navy-800 text-nyala-600 dark:text-nyala-400 shadow-sm"
                : "text-navy-500 hover:text-navy-900 dark:hover:text-white"
            }`}
          >
            <BookOpen weight="bold" className="w-4 h-4 text-nyala-500" />
            <span>Panduan Edukasi MABA</span>
          </button>
        </div>
      </div>

      {/* 3. LIVE REST API FEED MODE */}
      {mainView === "live_portal" && (
        <div className="space-y-8">
          <UMKTLiveFeed />
        </div>
      )}

      {/* 4. CURATED GUIDES & TIPS MODE */}
      {mainView === "panduan_maba" && (
        <div className="space-y-16">
          {/* Featured Article Banner */}
          {selectedCategory === "Semua" && !searchQuery && featuredPost && (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-white p-6 sm:p-8 lg:p-10 border border-navy-800 shadow-2xl">
              <div className="absolute top-0 right-0 w-72 h-72 bg-nyala-500/20 rounded-full blur-3xl -z-0" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Cover Image for Featured */}
                {featuredPost.coverImage && (
                  <div className="lg:col-span-5 overflow-hidden rounded-2xl border border-navy-700/60 shadow-lg group">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className={featuredPost.coverImage ? "lg:col-span-7 space-y-4" : "lg:col-span-12 space-y-4"}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-nyala-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1">
                      <Sparkle weight="fill" className="w-3.5 h-3.5" />
                      <span>Artikel Unggulan</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-navy-200 text-xs font-semibold">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-navy-300 flex items-center gap-1 font-mono">
                      <Clock weight="bold" className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-nyala-400 transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-navy-200 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 text-xs text-navy-300">
                      <div className="w-7 h-7 rounded-full bg-nyala-500/20 text-nyala-400 flex items-center justify-center font-bold">
                        <User weight="bold" className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{featuredPost.author}</span>
                        <span className="text-[11px] text-navy-400">{featuredPost.authorRole}</span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-nyala-500 hover:bg-nyala-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-nyala-500/25 transition-all"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight weight="bold" className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Search & Category Filters */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                        active
                          ? "bg-nyala-600 text-white shadow-md shadow-nyala-600/20"
                          : "bg-navy-100 dark:bg-navy-900 text-navy-600 dark:text-navy-300 hover:bg-navy-200 dark:hover:bg-navy-800"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-72 flex-shrink-0">
                <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="text"
                  placeholder="Cari topik atau kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 text-navy-900 dark:text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-nyala-500 shadow-sm"
                />
              </div>

            </div>
          </div>

      {/* 4. Articles Grid */}
      <div className="space-y-8">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="glass-card rounded-3xl overflow-hidden border border-navy-200/70 dark:border-navy-800 flex flex-col hover:border-nyala-500/50 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Article Cover Thumbnail */}
                {post.coverImage ? (
                  <div className="relative h-48 w-full overflow-hidden bg-navy-100 dark:bg-navy-900">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-white text-[11px] font-bold shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-28 w-full bg-gradient-to-br from-navy-100 to-navy-200 dark:from-navy-900 dark:to-navy-800 flex items-center justify-center text-navy-400">
                    <ImageIcon weight="bold" className="w-8 h-8 opacity-40" />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1 space-y-4">
                  
                  {/* Category & Read Time Meta (if no cover image) */}
                  {!post.coverImage && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 font-bold text-[11px]">
                        {post.category}
                      </span>
                      <span className="text-navy-500 dark:text-navy-400 flex items-center gap-1 font-mono text-[11px]">
                        <Clock weight="bold" className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-navy-900 dark:text-white group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors leading-snug line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400 line-clamp-3 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-navy-50 dark:bg-navy-900 text-navy-500 dark:text-navy-400 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer Meta & Action */}
                  <div className="pt-4 border-t border-navy-100 dark:border-navy-800/80 flex items-center justify-between text-xs">
                    <div className="text-[11px] text-navy-500 dark:text-navy-400">
                      <span className="font-semibold text-navy-700 dark:text-navy-300 block truncate max-w-[140px]">{post.author}</span>
                      <span>{post.date}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-nyala-600 dark:text-nyala-400 font-bold hover:underline"
                    >
                      <span>Baca</span>
                      <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center space-y-4 border border-navy-200 dark:border-navy-800 max-w-md mx-auto">
            <MascotFlame size="md" mood="thinking" />
            <h3 className="text-lg font-bold text-navy-900 dark:text-white">
              Tidak Ada Artikel yang Cocok
            </h3>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
              Tidak ditemukan artikel untuk kata kunci "{searchQuery}" atau kategori "{selectedCategory}".
            </p>
            <button
              onClick={() => { setSelectedCategory("Semua"); setSearchQuery(""); }}
              className="px-4 py-2 rounded-xl bg-nyala-600 text-white font-bold text-xs"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
      </div>
      )}

      {/* 5. Direct Official Admin Support Section */}
      <div className="space-y-6 pt-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Headset weight="bold" className="w-4 h-4" />
            <span>Pusat Informasi Terverifikasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white">
            Butuh Bantuan & Informasi Lebih Lanjut?
          </h2>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
            Hubungi langsung admin resmi Penerimaan Mahasiswa Baru (PMB) atau Biro Kemahasiswaan (Gedung C Lantai 1) jika ada pertanyaan yang belum tercakup di artikel blog.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AdminContactCard />
        </div>
      </div>

      {/* 6. Backlinks Banner */}
      <BacklinkBanner />

    </div>
  );
}
