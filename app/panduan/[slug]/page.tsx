"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Clock, 
  Tag, 
  ShareNetwork, 
  BookOpenText, 
  Sparkle, 
  CheckCircle, 
  ArrowUpRight, 
  House, 
  BookmarkSimple,
  Globe,
  ChatCircleText
} from "@phosphor-icons/react";
import { BlogPost, BLOG_POSTS } from "@/lib/masta-data";
import { getBlogPostBySlug } from "@/lib/blog-store";
import { useToast } from "@/context/ToastContext";
import BacklinkBanner from "@/components/BacklinkBanner";

export default function PanduanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;

    // 1. Check local / pre-configured blog store
    const found = getBlogPostBySlug(slug);
    if (found) {
      setPost(found);
      setLoading(false);
      return;
    }

    // 2. Check live API fallback if slug belongs to official UMKT warta
    const fetchLiveFallback = async () => {
      try {
        const res = await fetch(`/api/umkt-portal?type=berita&search=${slug}`);
        const data = await res.json();
        if (data.success && data.results && data.results.length > 0) {
          const match = data.results.find((b: any) => b.slug === slug) || data.results[0];
          setPost({
            slug: match.slug,
            title: match.judul,
            excerpt: match.ringkasan || "",
            category: "Berita Kampus",
            readTime: "4 menit baca",
            date: match.tanggal,
            author: match.penulis || "Humas UMKT",
            authorRole: "Humas & Protokoler Kampus",
            coverImage: match.gambar_cover || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
            tags: ["Warta UMKT", "Resmi Kampus"],
            content: match.isi,
            keyTakeaways: [
              "Informasi terverifikasi dari portal resmi web.umkt.ac.id.",
              "Rujukan terpercaya untuk sivitas akademika UMKT 2026."
            ]
          });
        }
      } catch (err) {
        console.error("Live fallback fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveFallback();
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast.success("Tautan artikel berhasil disalin ke clipboard!", "Tautan Tersalin");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-nyala-500/20 border-t-nyala-500 animate-spin" />
        <p className="text-xs font-mono text-navy-400">Memuat naskah panduan...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 px-4 text-center">
        <div className="p-4 rounded-full bg-nyala-500/10 text-nyala-600">
          <BookOpenText weight="bold" className="w-12 h-12" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-black text-navy-900 dark:text-white">
            Artikel Tidak Ditemukan
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400">
            Naskah panduan edukasi yang kamu cari belum terbit atau tautannya telah diperbarui.
          </p>
        </div>
        <Link
          href="/panduan"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-nyala-500 text-white font-bold text-xs"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
          <span>Kembali ke Majalah Panduan</span>
        </Link>
      </div>
    );
  }

  // Related Guides
  const relatedGuides = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/panduan"
          className="inline-flex items-center gap-2 text-xs font-bold text-navy-600 dark:text-navy-400 hover:text-nyala-500 transition-colors"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
          <span>Kembali ke Majalah Panduan</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy-100 dark:bg-navy-800 hover:bg-nyala-500 hover:text-white text-xs font-bold text-navy-800 dark:text-navy-200 transition-all active:scale-95 shadow-sm"
        >
          <ShareNetwork weight="bold" className="w-4 h-4" />
          <span>{isCopied ? "Tersalin!" : "Bagikan"}</span>
        </button>
      </div>

      {/* ── Article Header ── */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-navy-400 font-mono">
          <span className="px-3 py-1 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 font-extrabold uppercase tracking-wider">
            {post.category}
          </span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock weight="bold" className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed max-w-3xl">
          {post.excerpt}
        </p>

        {/* Author Card */}
        <div className="flex items-center gap-3.5 pt-2">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-nyala-500 to-amber-400 text-white font-black text-sm flex items-center justify-center shadow-md">
            {post.author.charAt(0)}
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-navy-900 dark:text-white">
              {post.author}
            </h4>
            <p className="text-[10px] text-navy-500 dark:text-navy-400">
              {post.authorRole || "Biro Kemahasiswaan & Redaksi Nyala UMKT"}
            </p>
          </div>
        </div>
      </header>

      {/* ── Hero Cover Image ── */}
      <div className="relative rounded-3xl overflow-hidden max-h-[460px] w-full bg-navy-950 shadow-2xl border border-navy-200/50 dark:border-navy-800">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Key Takeaways Callout ── */}
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-nyala-500/10 border border-nyala-500/30 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-nyala-600 dark:text-nyala-400 text-xs font-black uppercase tracking-wider">
            <Sparkle weight="fill" className="w-4 h-4" />
            <span>Poin Inti & Kesimpulan Penting</span>
          </div>

          <ul className="space-y-2">
            {post.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-800 dark:text-navy-200 leading-relaxed font-medium">
                <CheckCircle weight="fill" className="w-4 h-4 text-nyala-500 flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Main Article Body (Prose Format) ── */}
      <div className="prose prose-navy dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-navy-800 dark:text-navy-200">
        {post.content.startsWith("<") ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          post.content.split("\n\n").map((para, i) => {
            if (para.startsWith("### ")) {
              return (
                <h3 key={i} className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white mt-8 mb-3">
                  {para.replace("### ", "")}
                </h3>
              );
            }
            if (para.startsWith("#### ")) {
              return (
                <h4 key={i} className="text-lg font-extrabold text-navy-900 dark:text-white mt-6 mb-2">
                  {para.replace("#### ", "")}
                </h4>
              );
            }
            if (para.startsWith("> ")) {
              return (
                <blockquote key={i} className="p-4 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-xs sm:text-sm text-amber-900 dark:text-amber-200 my-4 italic">
                  {para.replace("> ", "")}
                </blockquote>
              );
            }
            if (para.startsWith("- ")) {
              const items = para.split("\n- ");
              return (
                <ul key={i} className="list-disc pl-5 space-y-1.5 my-3 text-xs sm:text-sm">
                  {items.map((item, j) => (
                    <li key={j}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            );
          })
        )}
      </div>

      {/* ── Tags ── */}
      {post.tags && post.tags.length > 0 && (
        <div className="pt-6 border-t border-navy-200/60 dark:border-navy-800 flex flex-wrap items-center gap-2">
          <Tag weight="bold" className="w-4 h-4 text-navy-400" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-navy-100 dark:bg-navy-800 text-[11px] font-bold text-navy-700 dark:text-navy-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ── Official Active Backlinks Banner ── */}
      <BacklinkBanner />

      {/* ── Related Guides ── */}
      <div className="space-y-5 pt-6 border-t border-navy-200/60 dark:border-navy-800">
        <h3 className="text-sm font-black uppercase tracking-wider text-navy-500 font-mono">
          Panduan Edukasi Terkait
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedGuides.map((rel) => (
            <Link
              key={rel.slug}
              href={`/panduan/${rel.slug}`}
              className="glass-card p-6 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-3 hover:border-nyala-500/50 transition-all hover:scale-[1.01] block shadow-lg group"
            >
              <span className="text-[10px] font-bold text-nyala-500 uppercase font-mono">
                {rel.category}
              </span>
              <h4 className="text-base font-extrabold text-navy-900 dark:text-white group-hover:text-nyala-500 transition-colors line-clamp-2">
                {rel.title}
              </h4>
              <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2">
                {rel.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>

    </article>
  );
}
