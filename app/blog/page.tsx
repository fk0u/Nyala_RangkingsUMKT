"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpenText, 
  Sparkle, 
  Clock, 
  Tag, 
  MagnifyingGlass, 
  ArrowRight, 
  CheckCircle, 
  GraduationCap, 
  Heartbeat, 
  Laptop, 
  Code,
  SlidersHorizontal,
  FolderOpen
} from "@phosphor-icons/react";
import { BlogPost } from "@/lib/masta-data";
import { getAllBlogPosts } from "@/lib/blog-store";
import MascotFlame from "@/components/MascotFlame";

const CATEGORIES = [
  "Semua Kategori",
  "Akademik & SIKAD",
  "Adaptasi & Rantau",
  "Beasiswa",
  "Organisasi & UKM",
  "Teknis MASTA",
  "Fasilitas Kampus",
  "Berita Kampus"
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const data = getAllBlogPosts();
    setPosts(data);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === "Semua Kategori" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts[0];

  if (!isClient) return null;

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      
      {/* ── 1. EDITORIAL HEADER ── */}
      <section className="relative p-8 sm:p-12 rounded-[36px] bg-navy-950 text-white overflow-hidden shadow-xl border border-navy-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Majalah Panduan & <br />
            <span className="fire-text-gradient">Edukasi Akademik MABA</span>
          </h1>

          <p className="text-sm sm:text-base text-navy-200 leading-relaxed max-w-2xl">
            Rangkuman wawasan praktis, tips adaptasi anak rantau di Samarinda, strategi KRS SIKAD nilai A, etika dosen, hingga panduan karir Prodi Teknologi Informasi UMKT.
          </p>
        </div>
      </section>

      {/* ── 2. FEATURED SPOTLIGHT GUIDE ── */}
      {featuredPost && !searchQuery && selectedCategory === "Semua Kategori" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-navy-950 dark:text-white tracking-tight uppercase">
              Panduan Unggulan Minggu Ini
            </h2>
          </div>

          <div className="group relative rounded-3xl overflow-hidden bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 shadow-sm hover:border-nyala-500 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden bg-navy-950 min-h-[300px]">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden" />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-extrabold uppercase">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-navy-400">{featuredPost.readTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white leading-snug group-hover:text-nyala-500 transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-md bg-navy-100 dark:bg-navy-800 text-[10px] font-bold text-navy-600 dark:text-navy-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-nyala-600 to-amber-500 hover:from-nyala-500 hover:to-amber-400 text-white text-xs font-extrabold shadow-lg shadow-nyala-500/25 transition-all active:scale-95 w-full sm:w-auto"
                >
                  <span>Baca Panduan Lengkap</span>
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ── 3. SEARCH & CATEGORY SELECTOR ── */}
      <section className="space-y-4">
        <div className="relative max-w-2xl mx-auto">
          <MagnifyingGlass weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tips KRS, beasiswa, kost Samarinda, dosen TI, atau etika email..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 text-sm text-navy-900 dark:text-white placeholder:text-navy-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-nyala-500 transition-all"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const count = category === "Semua Kategori" 
              ? posts.length 
              : posts.filter(p => p.category === category).length;

            if (category !== "Semua Kategori" && count === 0) return null;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all active:scale-95 ${
                  isActive
                    ? "bg-nyala-500 text-white shadow-md shadow-nyala-500/25"
                    : "bg-navy-100 dark:bg-navy-800/80 text-navy-600 dark:text-navy-300 hover:bg-navy-200"
                }`}
              >
                <span>{category}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? "bg-white/20 text-white" : "bg-navy-200 dark:bg-navy-700 text-navy-600 dark:text-navy-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── 4. ARTICLES GRID ── */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 text-center space-y-3 glass-card rounded-3xl border border-navy-200/60 dark:border-navy-800">
          <MascotFlame size="lg" mood="confused" className="mx-auto" />
          <p className="text-sm font-bold text-navy-700 dark:text-navy-300">
            Tidak ada artikel panduan yang cocok dengan pencarianmu.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-3xl overflow-hidden glass-card border border-navy-200/60 dark:border-navy-800 hover:border-nyala-500/50 hover:shadow-xl transition-all"
            >
              <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-navy-950">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase border border-white/15 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-navy-400">
                    <span>{post.date}</span>
                    <span>• {post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-base font-bold text-navy-900 dark:text-white leading-snug group-hover:text-nyala-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-nyala-500/10 text-nyala-600 flex items-center justify-center font-bold text-[10px]">
                      {post.author[0]}
                    </div>
                    <span className="text-[11px] font-semibold text-navy-600 dark:text-navy-300 truncate max-w-[120px]">
                      {post.author}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-nyala-600 dark:text-nyala-400 hover:gap-2 transition-all"
                  >
                    <span>Baca</span>
                    <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
