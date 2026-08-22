"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CalendarCheck, 
  Clock, 
  ShareNetwork, 
  Tag, 
  WhatsappLogo, 
  Link as LinkIcon,
  User,
  Heart,
  SpeakerHigh,
  SpeakerSlash
} from "@phosphor-icons/react";
import { BlogPost, BLOG_POSTS } from "@/lib/masta-data";
import { getAllBlogPosts } from "@/lib/blog-store";
import { useToast } from "@/context/ToastContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MobileBlogArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
  const toast = useToast();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const list = getAllBlogPosts();
    let found = list.find((p) => p.slug === rawSlug) || BLOG_POSTS.find((p) => p.slug === rawSlug) || null;

    if (!found && list.length > 0) {
      found = list[0];
    }

    setPost(found);
    if (found) {
      setRelatedPosts(list.filter((p) => p.slug !== found?.slug && p.category === found?.category).slice(0, 3));
    }
    setLoading(false);
  }, [rawSlug]);

  const handleShare = (platform: "wa" | "copy") => {
    if (typeof window === "undefined" || !post) return;
    const url = window.location.href;
    const text = `${post.title} - Majalah Panduan MABA UMKT`;

    if (platform === "wa") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      toast.showToast("Link panduan tersalin!", "success");
    }
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !post) return;
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const plainText = `${post.title}. ${post.content.replace(/[#*`_\[\]]/g, "")}`;
        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.lang = "id-ID";
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      toast.showToast("Browser tidak mendukung audio narasi", "warning");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-nyala-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-slate-400 font-medium">Memuat artikel panduan...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-12 text-center space-y-4">
        <h2 className="text-lg font-black text-navy-950 dark:text-white">Panduan Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500">Artikel yang Anda cari tidak tersedia.</p>
        <Link href="/mobile/blog" className="inline-block px-4 py-2 rounded-xl bg-nyala-600 text-white font-bold text-xs">
          Kembali ke Majalah MABA
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* ── 1. TOP NAVIGATION & CONTROLS ── */}
      <div className="flex items-center justify-between">
        <Link
          href="/mobile/blog"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 text-xs font-bold text-navy-950 dark:text-white active:scale-95 transition-transform"
        >
          <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFontSize(prev => prev === "normal" ? "large" : "normal")}
            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 text-xs font-bold text-navy-950 dark:text-white"
            title="Ubah Ukuran Teks"
          >
            {fontSize === "normal" ? "A+" : "A-"}
          </button>

          <button
            onClick={handleSpeak}
            className={`p-2 rounded-xl border-2 transition-all ${
              isSpeaking
                ? "bg-nyala-500 text-white border-nyala-600"
                : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 text-navy-950 dark:text-white"
            }`}
            title="Dengarkan Narasi Panduan"
          >
            {isSpeaking ? <SpeakerSlash weight="bold" className="w-3.5 h-3.5" /> : <SpeakerHigh weight="bold" className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── 2. POST HERO CARD ── */}
      <div className="duo-card p-4 sm:p-5 space-y-3">
        {/* Cover Image */}
        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Category & Date */}
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold uppercase border border-amber-200 dark:border-amber-900/50">
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Clock weight="bold" className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-base sm:text-lg font-black text-navy-950 dark:text-white leading-snug">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="w-6 h-6 rounded-full bg-nyala-500 text-white flex items-center justify-center font-bold text-[10px]">
            {post.author.charAt(0)}
          </div>
          <span>{post.author}</span>
        </div>
      </div>

      {/* ── 3. POST CONTENT BODY ── */}
      <div className="duo-card p-4 sm:p-5 space-y-4">
        <div 
          className={`prose prose-sm dark:prose-invert max-w-none text-navy-900 dark:text-slate-200 leading-relaxed font-sans ${
            fontSize === "large" ? "text-sm sm:text-base leading-loose" : "text-xs sm:text-sm"
          }`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Interactive Like & Share */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setHasLiked(!hasLiked);
                toast.showToast(hasLiked ? "Batal menyukai" : "Terima kasih atas apresiasinya! ❤️", "success");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 font-bold text-xs transition-all ${
                hasLiked
                  ? "bg-rose-500 text-white border-rose-600"
                  : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 text-navy-950 dark:text-white"
              }`}
            >
              <Heart weight={hasLiked ? "fill" : "bold"} className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              <span>{hasLiked ? "Tersimpan" : "Bermanfaat"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleShare("wa")}
              className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
            >
              <WhatsappLogo weight="fill" className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => handleShare("copy")}
              className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-navy-950 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
            >
              <LinkIcon weight="bold" className="w-4 h-4" />
              <span>Salin Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 4. RELATED POSTS ── */}
      {relatedPosts.length > 0 && (
        <div className="space-y-2.5 pt-2">
          <h3 className="text-xs font-black text-navy-950 dark:text-white uppercase tracking-wider px-1">
            Panduan Terkait
          </h3>

          <div className="space-y-2">
            {relatedPosts.map((rel, idx) => (
              <Link
                key={`rel-post-${rel.slug || idx}-${idx}`}
                href={`/mobile/blog/${rel.slug}`}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 block space-y-1 active:border-b-2 active:translate-y-0.5 transition-all select-none"
              >
                <span className="text-[10px] text-nyala-600 dark:text-nyala-400 font-mono font-bold">
                  {rel.readTime}
                </span>
                <h4 className="text-xs font-bold text-navy-950 dark:text-white line-clamp-2 leading-snug">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
