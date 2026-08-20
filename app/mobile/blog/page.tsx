"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpenText, 
  Clock, 
  Tag, 
  ArrowRight,
  MagnifyingGlass
} from "@phosphor-icons/react";
import { BLOG_POSTS } from "@/lib/masta-data";

export default function MobileBlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [search, setSearch] = useState("");

  const categories = ["Semua", "Akademik", "Tips MABA", "Kampus", "Beasiswa"];

  const filteredPosts = BLOG_POSTS.filter((p) => {
    const matchCat = activeCategory === "Semua" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-black text-white">Majalah Panduan MABA</h1>
        <p className="text-xs text-navy-300">Artikel esensial adaptasi perkuliahan, kos, beasiswa, dan KRS.</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <MagnifyingGlass weight="bold" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari artikel tips..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[#0E1635] border border-navy-800 text-xs text-white placeholder:text-navy-400 outline-none"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-nyala-600 text-white shadow-sm"
                : "bg-[#0E1635] border border-navy-800 text-navy-300 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Cards Stream */}
      <div className="space-y-3.5">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 rounded-3xl bg-[#0E1635] border border-navy-800 space-y-3 active:scale-98 transition-transform group"
          >
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-navy-950">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-navy-400">
                <span className="text-nyala-400 font-bold">{post.category}</span>
                <div className="flex items-center gap-1">
                  <Clock weight="bold" className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-nyala-400 transition-colors">
                {post.title}
              </h3>

              <p className="text-xs text-navy-300 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
