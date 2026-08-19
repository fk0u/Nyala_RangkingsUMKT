"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  ArrowSquareOut,
  Tag,
  Globe
} from "@phosphor-icons/react";
import { BlogPost, OFFICIAL_CONTACTS, BLOG_POSTS } from "@/lib/masta-data";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog-store";
import BacklinkBanner from "@/components/BacklinkBanner";
import AdminContactCard from "@/components/AdminContactCard";
import { useToast } from "@/context/ToastContext";
import MascotFlame from "@/components/MascotFlame";

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const list = getAllBlogPosts();
    setAllPosts(list);
    const found = list.find((p) => p.slug === slug) || BLOG_POSTS.find((p) => p.slug === slug) || null;
    setPost(found);
    setIsLoading(false);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <MascotFlame size="md" mood="thinking" />
        <p className="text-sm text-navy-500 font-semibold">Memuat naskah artikel...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <MascotFlame size="md" mood="thinking" />
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Artikel Tidak Ditemukan</h1>
        <p className="text-sm text-navy-500">Artikel yang kamu cari tidak tersedia atau telah dipindahkan.</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-nyala-500 text-white text-xs font-bold shadow-md"
        >
          <CaretLeft weight="bold" className="w-4 h-4" />
          <span>Kembali ke Direktori Blog</span>
        </Link>
      </div>
    );
  }

  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

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
          {post.sourceUrl && (
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              <Globe weight="bold" className="w-3.5 h-3.5" />
              <span>Sumber Resmi UMKT</span>
              <ArrowSquareOut weight="bold" className="w-3 h-3" />
            </a>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed font-medium">
          {post.excerpt}
        </p>

        {/* Author Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-navy-100 dark:border-navy-800 text-xs text-navy-600 dark:text-navy-400">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-nyala-500/20 text-nyala-600 dark:text-nyala-400 flex items-center justify-center font-bold">
              <User weight="bold" className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-navy-900 dark:text-white text-xs sm:text-sm">{post.author}</p>
              <p className="text-[11px] text-navy-500">{post.authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <Calendar weight="bold" className="w-3.5 h-3.5 text-navy-400" />
            <span>{post.date}</span>
          </div>
        </div>
      </header>

      {/* 3. Hero Cover Image */}
      {post.coverImage && (
        <div className="relative overflow-hidden rounded-3xl border border-navy-200/60 dark:border-navy-800 shadow-xl max-h-[420px] bg-navy-100 dark:bg-navy-900">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* 4. Key Takeaways Box */}
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-l-4 border-l-nyala-500 border-navy-200/70 dark:border-navy-800 bg-nyala-500/5 space-y-3">
          <div className="flex items-center gap-2 text-nyala-600 dark:text-nyala-400 font-extrabold text-sm uppercase tracking-wider">
            <Sparkle weight="fill" className="w-4 h-4" />
            <span>Poin Inti Ringkasan (Key Takeaways)</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-navy-800 dark:text-navy-200">
            {post.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle weight="bold" className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Article Content */}
      <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-navy-800 dark:text-navy-200 leading-relaxed font-normal space-y-6">
        <div className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed">
          {post.content}
        </div>
      </article>

      {/* 6. Tags Strip */}
      {post.tags && post.tags.length > 0 && (
        <div className="pt-6 border-t border-navy-100 dark:border-navy-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-navy-500 dark:text-navy-400 font-bold flex items-center gap-1 mr-1">
            <Tag weight="bold" className="w-3.5 h-3.5" />
            <span>Topik:</span>
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-navy-100 dark:bg-navy-800 text-xs font-semibold text-navy-700 dark:text-navy-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 7. Official Admin Consultation Callout */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-navy-200 dark:border-navy-800 bg-gradient-to-br from-navy-50 to-orange-50/40 dark:from-navy-900/60 dark:to-navy-950 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
              Punya Pertanyaan Spesifik Terkait Artikel Ini?
            </span>
            <h3 className="text-lg sm:text-xl font-black text-navy-900 dark:text-white">
              Konsultasikan Langsung ke Layanan Resmi Kampus
            </h3>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 max-w-xl">
              Biro Kemahasiswaan (Gedung C Lantai 1) dan Admin PMB siap melayani pertanyaan seputar jadwal orientasi, beasiswa, dan pendaftaran.
            </p>
          </div>

          <a
            href={OFFICIAL_CONTACTS[1].whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all whitespace-nowrap"
          >
            <WhatsappLogo weight="fill" className="w-5 h-5" />
            <span>Chat WhatsApp BIMA</span>
          </a>
        </div>
      </div>

      {/* 8. Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-lg sm:text-xl font-bold text-navy-900 dark:text-white flex items-center gap-2">
            <BookOpen weight="bold" className="w-5 h-5 text-nyala-500" />
            <span>Artikel Panduan Lainnya</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="glass-card rounded-2xl p-4 border border-navy-200/70 dark:border-navy-800 hover:border-nyala-500 transition-all block group"
              >
                <span className="text-[11px] font-bold text-nyala-600 dark:text-nyala-400 block mb-1">
                  {rel.category}
                </span>
                <h4 className="text-sm font-bold text-navy-900 dark:text-white group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2 mt-1">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 9. Backlinks Banner */}
      <BacklinkBanner />

    </div>
  );
}
