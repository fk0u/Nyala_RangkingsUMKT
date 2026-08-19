"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CaretLeft, 
  Clock, 
  Calendar, 
  User, 
  ShareNetwork, 
  Check, 
  Sparkle, 
  CheckCircle, 
  Headset, 
  WhatsappLogo, 
  ArrowRight,
  BookOpen,
  ArrowSquareOut
} from "@phosphor-icons/react";
import { BLOG_POSTS, BlogPost, OFFICIAL_CONTACTS } from "@/lib/masta-data";
import BacklinkBanner from "@/components/BacklinkBanner";
import AdminContactCard from "@/components/AdminContactCard";
import { useToast } from "@/context/ToastContext";

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Artikel Tidak Ditemukan</h1>
        <p className="text-sm text-navy-500">Artikel yang kamu cari tidak tersedia atau telah dipindahkan.</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-nyala-500 text-white text-xs font-bold"
        >
          <CaretLeft weight="bold" className="w-4 h-4" />
          <span>Kembali ke Direktori Blog</span>
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Tautan artikel berhasil disalin!", "Berbagi Artikel");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* 1. Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-600 dark:text-navy-400 hover:text-nyala-600 dark:hover:text-nyala-400 transition-colors"
        >
          <CaretLeft weight="bold" className="w-4 h-4" />
          <span>Semua Artikel Blog</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 text-xs font-bold text-navy-700 dark:text-navy-300 hover:border-nyala-500 transition-all shadow-xs"
        >
          {copied ? (
            <>
              <Check weight="bold" className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Tersalin</span>
            </>
          ) : (
            <>
              <ShareNetwork weight="bold" className="w-3.5 h-3.5" />
              <span>Bagikan</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-nyala-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xs">
            {post.category}
          </span>
          <span className="text-xs text-navy-500 dark:text-navy-400 flex items-center gap-1 font-mono">
            <Clock weight="bold" className="w-3.5 h-3.5 text-nyala-500" />
            {post.readTime}
          </span>
          <span className="text-xs text-navy-500 dark:text-navy-400 flex items-center gap-1 font-mono">
            <Calendar weight="bold" className="w-3.5 h-3.5 text-nyala-500" />
            {post.date}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Author Card */}
        <div className="p-4 rounded-2xl bg-white/70 dark:bg-navy-900/60 border border-navy-200/60 dark:border-navy-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-nyala-500/15 text-nyala-600 dark:text-nyala-400 flex items-center justify-center font-bold text-sm">
            <User weight="bold" className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-navy-900 dark:text-white block">
              {post.author}
            </span>
            <span className="text-[11px] text-navy-500 dark:text-navy-400">
              {post.authorRole} • Universitas Muhammadiyah Kalimantan Timur
            </span>
          </div>
        </div>
      </header>

      {/* 3. Key Takeaways Box */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 space-y-3">
        <h3 className="text-xs sm:text-sm font-extrabold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-2">
          <Sparkle weight="fill" className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Poin Inti Ringkasan (Key Takeaways):</span>
        </h3>
        <ul className="space-y-2">
          {post.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
              <CheckCircle weight="fill" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Article Body Content */}
      <article className="glass-card rounded-3xl p-6 sm:p-10 border border-navy-200/70 dark:border-navy-800 shadow-xl space-y-6 text-sm sm:text-base leading-relaxed text-navy-800 dark:text-navy-200">
        <div className="prose prose-navy dark:prose-invert max-w-none space-y-6">
          {post.content.trim().split("\n\n").map((block, idx) => {
            if (block.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-lg sm:text-xl font-bold text-navy-900 dark:text-white pt-3 border-t border-navy-100 dark:border-navy-800/80">
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("```")) {
              const codeClean = block.replace(/```[a-z]*/g, "").trim();
              return (
                <pre key={idx} className="p-4 rounded-2xl bg-navy-950 text-nyala-400 font-mono text-xs overflow-x-auto border border-navy-800">
                  {codeClean}
                </pre>
              );
            }
            if (block.startsWith("- ")) {
              const listItems = block.split("\n").filter(Boolean);
              return (
                <ul key={idx} className="space-y-1.5 list-disc list-inside text-xs sm:text-sm">
                  {listItems.map((li, i) => (
                    <li key={i} className="leading-relaxed">
                      {li.replace(/^- /, "")}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.startsWith("1. ") || block.startsWith("2. ")) {
              const listItems = block.split("\n").filter(Boolean);
              return (
                <ol key={idx} className="space-y-1.5 list-decimal list-inside text-xs sm:text-sm">
                  {listItems.map((li, i) => (
                    <li key={i} className="leading-relaxed">
                      {li.replace(/^[0-9]+\. /, "")}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={idx} className="text-xs sm:text-sm text-navy-700 dark:text-navy-300 leading-relaxed">
                {block}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-navy-100 dark:border-navy-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-navy-500">Topik Terkait:</span>
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-navy-100 dark:bg-navy-800 text-xs font-medium text-navy-700 dark:text-navy-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* 5. Direct Help Desk Escalation Card */}
      <div className="rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-white p-6 sm:p-8 border border-navy-800 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Headset weight="bold" className="w-4 h-4" />
              <span>Bantuan & Konsultasi Resmi</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Perlu Konfirmasi Langsung dari Pihak Kampus?
            </h3>
            <p className="text-xs sm:text-sm text-navy-300">
              Tim Biro Kemahasiswaan (Gedung C Lantai 1) dan Admin PMB siap membantu setiap pertanyaanmu.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href="https://wa.me/6281230017008?text=Halo%20Admin%20PMB%20UMKT%2C%20saya%20membaca%20artikel%20panduan%20MABA%20dan%20ingin%20bertanya%20seputar%20registrasi."
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-between gap-3 text-xs font-bold transition-all"
          >
            <div className="flex items-center gap-2.5">
              <WhatsappLogo weight="fill" className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="text-white block">Admin PMB UMKT</span>
                <span className="text-[10px] text-navy-300 font-mono">+62 812-3001-7008</span>
              </div>
            </div>
            <ArrowSquareOut weight="bold" className="w-4 h-4 opacity-70" />
          </a>

          <a
            href="https://wa.me/6282250878843?text=Halo%20Biro%20Kemahasiswaan%20UMKT%20(Gedung%20C%20Lt.%201)%2C%20saya%20membaca%20artikel%20panduan%20MABA%20dan%20ingin%20konsultasi."
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-between gap-3 text-xs font-bold transition-all"
          >
            <div className="flex items-center gap-2.5">
              <WhatsappLogo weight="fill" className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="text-white block">Biro Kemahasiswaan & BIMA</span>
                <span className="text-[10px] text-navy-300 font-mono">0822-5087-8843 (Gd. C Lt. 1)</span>
              </div>
            </div>
            <ArrowSquareOut weight="bold" className="w-4 h-4 opacity-70" />
          </a>
        </div>
      </div>

      {/* 6. Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-navy-900 dark:text-white">
            Artikel Terkait Lainnya
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPosts.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="p-5 rounded-3xl glass-card border border-navy-200/60 dark:border-navy-800 space-y-2 hover:border-nyala-500/50 transition-all block group"
              >
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400">
                  {r.category}
                </span>
                <h4 className="text-sm font-bold text-navy-900 dark:text-white group-hover:text-nyala-500 transition-colors">
                  {r.title}
                </h4>
                <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2">
                  {r.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Backlink Banner */}
      <BacklinkBanner />

    </div>
  );
}
