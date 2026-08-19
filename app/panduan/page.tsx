"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BookOpenText, 
  MagnifyingGlass, 
  Clock, 
  Tag, 
  User, 
  ArrowRight, 
  Sparkle, 
  GraduationCap, 
  Laptop, 
  CalendarCheck,
  HouseLine,
  Coins,
  Buildings
} from "@phosphor-icons/react";
import { BlogPost, BLOG_POSTS } from "@/lib/masta-data";
import { getAllBlogPosts } from "@/lib/blog-store";
import BacklinkBanner from "@/components/BacklinkBanner";

const CATEGORIES = [
  "Semua Kategori",
  "Akademik & SIKAD",
  "Teknis MASTA",
  "Adaptasi & Rantau",
  "Beasiswa",
  "Organisasi & UKM",
  "Fasilitas Kampus",
  "Berita Kampus"
];

export default function PanduanIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua Kategori");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const custom = getAllBlogPosts();
    if (custom && custom.length > 0) {
      setPosts(custom);
    }
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "Semua Kategori" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0];
  const regularPosts = filteredPosts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* ── Editorial Header ── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-black uppercase tracking-wider border border-nyala-500/20">
          <BookOpenText weight="bold" className="w-4 h-4" />
          <span>Majalah Digital & Panduan Edukasi MABA 2026</span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
            Panduan & Wawasan <br />
            <span className="fire-text-gradient">Perjalanan Mahasiswa Baru</span>
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400 leading-relaxed">
            Kumpulan artikel edukatif, panduan teknis orientasi MASTA, strategi KRS SIKAD, tips adaptasi hidup di Samarinda, serta informasi beasiswa resmi UMKT yang disusun oleh tim redaksi dan biro kemahasiswaan.
          </p>
        </div>
      </div>

      <BacklinkBanner />

      {/* ── Search & Filter Tabs ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Category Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                    isSelected
                      ? "bg-nyala-500 text-white shadow-md shadow-nyala-500/25 font-extrabold"
                      : "bg-white dark:bg-navy-900 border border-navy-200/60 dark:border-navy-800 text-navy-600 dark:text-navy-400 hover:border-navy-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative sm:w-72">
            <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel / topik..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200/60 dark:border-navy-800 text-xs focus:ring-2 focus:ring-nyala-500 outline-none text-navy-900 dark:text-white"
            />
          </div>

        </div>
      </div>

      {/* ── Featured Editorial Cover ── */}
      {selectedCategory === "Semua Kategori" && !searchQuery && featuredPost && (
        <Link
          href={`/panduan/${featuredPost.slug}`}
          className="block group relative rounded-3xl overflow-hidden glass-card border border-navy-200/60 dark:border-navy-800 shadow-2xl hover:border-nyala-500/50 transition-all hover:scale-[1.005]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Banner */}
            <div className="lg:col-span-7 relative h-72 lg:h-[420px] bg-navy-950 overflow-hidden">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-nyala-500 text-white text-xs font-black uppercase tracking-wider shadow-lg">
                Pilihan Utama Redaksi
              </div>
            </div>

            {/* Narrative Box */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-xs text-navy-400 font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 font-bold">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock weight="bold" className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white leading-tight group-hover:text-nyala-500 transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400 leading-relaxed line-clamp-4">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-navy-100 dark:border-navy-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-nyala-500 to-amber-400 flex items-center justify-center text-white font-black text-xs">
                    N
                  </div>
                  <div>
                    <span className="text-xs font-bold text-navy-900 dark:text-white block">
                      {featuredPost.author}
                    </span>
                    <span className="text-[10px] text-navy-500 font-mono">
                      {featuredPost.date}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-black text-nyala-600 dark:text-nyala-400 group-hover:translate-x-1 transition-transform">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </div>
              </div>

            </div>
          </div>
        </Link>
      )}

      {/* ── Regular Editorial Grid ── */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-wider text-navy-500 font-mono">
          Semua Artikel Panduan ({filteredPosts.length})
        </h3>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 space-y-3 glass-card rounded-3xl border border-navy-200/60 dark:border-navy-800">
            <BookOpenText weight="bold" className="w-12 h-12 text-navy-300 mx-auto" />
            <p className="text-sm font-bold text-navy-600 dark:text-navy-400">
              Tidak ada artikel yang cocok dengan pencarianmu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {(selectedCategory === "Semua Kategori" && !searchQuery ? regularPosts : filteredPosts).map((post) => (
              <Link
                key={post.slug}
                href={`/panduan/${post.slug}`}
                className="glass-card rounded-3xl border border-navy-200/60 dark:border-navy-800 overflow-hidden flex flex-col justify-between hover:border-nyala-500/50 transition-all hover:scale-[1.01] active:scale-[0.99] group shadow-lg"
              >
                <div className="space-y-4">
                  {/* Thumbnail Cover */}
                  <div className="relative h-48 w-full bg-navy-950 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-[10px] font-bold text-nyala-400 border border-white/10">
                      {post.category}
                    </div>
                  </div>

                  <div className="px-6 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-navy-400 font-mono">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-navy-900 dark:text-white leading-snug group-hover:text-nyala-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 flex items-center justify-between text-xs font-bold text-nyala-600 dark:text-nyala-400 border-t border-navy-100 dark:border-navy-800/80 mt-4">
                  <span>Baca Naskah Lengkap</span>
                  <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
