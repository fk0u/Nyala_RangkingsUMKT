"use client";

import React, { useState } from "react";
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
  Laptop
} from "@phosphor-icons/react";
import { BLOG_POSTS, BlogPost, OFFICIAL_CONTACTS } from "@/lib/masta-data";
import BacklinkBanner from "@/components/BacklinkBanner";
import AdminContactCard from "@/components/AdminContactCard";
import MascotFlame from "@/components/MascotFlame";

const CATEGORIES = [
  "Semua",
  "Adaptasi & Rantau",
  "Akademik & SIKAD",
  "Beasiswa",
  "Organisasi & UKM",
  "Teknis MASTA",
  "Fasilitas Kampus"
];

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchCat = selectedCategory === "Semua" || post.category === selectedCategory;
    const matchSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* 1. Header Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-bold uppercase tracking-wider">
          <Newspaper weight="bold" className="w-4 h-4" />
          <span>Wawasan & Panduan Resmi MABA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 dark:text-white tracking-tight leading-tight">
          Blog & Artikel Informasi <br />
          <span className="fire-text-gradient">Mahasiswa Baru UMKT 2026</span>
        </h1>
        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed">
          Kumpulan tips praktis, panduan adaptasi kota Samarinda, strategi KRS & IPK 4.0, info beasiswa, serta tata tertib resmi Masa Ta’aruf (MASTA).
        </p>
      </div>

      {/* 2. Featured Article Banner */}
      {selectedCategory === "Semua" && !searchQuery && featuredPost && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-white p-6 sm:p-10 lg:p-12 border border-navy-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-nyala-500/20 rounded-full blur-3xl -z-0" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
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

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
                <Link href={`/blog/${featuredPost.slug}`} className="hover:text-nyala-400 transition-colors">
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-navy-200 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-navy-300">
                  <User weight="bold" className="w-4 h-4 text-nyala-400" />
                  <span>Oleh <strong>{featuredPost.author}</strong> ({featuredPost.authorRole})</span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-nyala-500 hover:bg-nyala-600 text-white text-xs font-bold flex items-center gap-2 shadow-fire transition-transform active:scale-95"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <MascotFlame size="xl" mood="excited" />
            </div>
          </div>
        </div>
      )}

      {/* 3. Filter & Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass weight="bold" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel, topik beasiswa, tips kost..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 text-xs sm:text-sm text-navy-900 dark:text-white placeholder-navy-400 dark:placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-nyala-500 transition-all"
            />
          </div>

          <div className="text-xs text-navy-500 dark:text-navy-400 self-end md:self-center">
            Menampilkan <strong>{filteredPosts.length}</strong> artikel panduan
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-navy-900 dark:bg-nyala-600 text-white shadow-md scale-105"
                  : "bg-white dark:bg-navy-800 text-navy-600 dark:text-navy-300 border border-navy-200/70 dark:border-navy-700 hover:border-nyala-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-3xl p-6 border border-navy-200/70 dark:border-navy-800 flex flex-col justify-between space-y-4 hover:border-nyala-500/50 shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="space-y-3">
                {/* Meta & Category */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 font-extrabold text-[11px]">
                    {post.category}
                  </span>
                  <span className="text-[11px] font-mono text-navy-400 flex items-center gap-1">
                    <Clock weight="bold" className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-navy-900 dark:text-white group-hover:text-nyala-500 dark:group-hover:text-nyala-400 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-navy-100 dark:bg-navy-800 text-[10px] text-navy-500 dark:text-navy-400 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between gap-2 text-xs">
                <div className="text-[11px] text-navy-500 dark:text-navy-400">
                  <span>{post.date}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-nyala-600 dark:text-nyala-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Baca</span>
                  <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Zero State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 glass-card rounded-3xl p-8 border border-navy-200 dark:border-navy-800 space-y-3">
          <BookOpen weight="duotone" className="w-12 h-12 text-navy-400 mx-auto" />
          <h3 className="text-base font-bold text-navy-900 dark:text-white">Tidak ada artikel yang cocok</h3>
          <p className="text-xs text-navy-500 dark:text-navy-400 max-w-sm mx-auto">
            Coba ubah kata kunci pencarianmu atau pilih kategori &quot;Semua&quot; untuk melihat seluruh artikel.
          </p>
        </div>
      )}

      {/* 5. Contact Official Helpdesk Section */}
      <div className="space-y-6 pt-8 border-t border-navy-200/60 dark:border-navy-800">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Layanan Langsung
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
            Punya Pertanyaan Spesifik yang Belum Terjawab?
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400">
            Hubungi langsung tim administrasi PMB atau Biro Kemahasiswaan & Alumni UMKT (Gedung C Lantai 1).
          </p>
        </div>

        <AdminContactCard />
      </div>

      {/* Backlink Banner */}
      <BacklinkBanner />

    </div>
  );
}
