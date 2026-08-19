"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowLeft, 
  CalendarCheck, 
  Clock, 
  ShareNetwork, 
  BookmarkSimple, 
  Tag, 
  Sparkle, 
  WhatsappLogo, 
  TwitterLogo, 
  Link as LinkIcon,
  SpeakerHigh,
  SpeakerSlash,
  ArrowSquareOut,
  Newspaper,
  Eye,
  CheckCircle,
  TextAa,
  User,
  ThumbsUp,
  Heart,
  ChatCircleText
} from "@phosphor-icons/react";
import { BlogPost, BLOG_POSTS } from "@/lib/masta-data";
import { getAllBlogPosts } from "@/lib/blog-store";
import { useToast } from "@/context/ToastContext";
import MascotFlame from "@/components/MascotFlame";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogGuideDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
  const toast = useToast();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xl">("normal");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  // Top Reading Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const list = getAllBlogPosts();
    let found = list.find((p) => p.slug === rawSlug) || BLOG_POSTS.find((p) => p.slug === rawSlug) || null;

    if (!found && list.length > 0) {
      found = list[0];
    }

    setPost(found);
    setRelatedPosts(list.filter(p => p.slug !== (found?.slug || "")).slice(0, 3));
    setLoading(false);
  }, [rawSlug]);

  const handleShare = (platform: "wa" | "twitter" | "copy") => {
    if (typeof window === "undefined" || !post) return;
    const url = window.location.href;
    const text = `${post.title} - Panduan Resmi MABA UMKT 2026`;

    if (platform === "wa") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Tautan artikel berhasil disalin ke clipboard!", "Tautan Disalin");
    }
  };

  const handleToggleTTS = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !post) {
      toast.info("Fitur suara tidak didukung di browser ini.", "Informasi");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const plainText = `${post.title}. ${post.excerpt}. ${post.content.slice(0, 600)}`;
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.lang = "id-ID";
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      toast.info("Memutar narasi panduan MABA...", "Audio Nyala Aktif");
    }
  };

  const handleLike = () => {
    setHasLiked(!hasLiked);
    if (!hasLiked) {
      toast.success("Terima kasih atas apresiasimu!", "Membantu MABA");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <MascotFlame size="xl" mood="studying" className="animate-pulse" />
        <p className="text-sm font-bold text-navy-600 dark:text-navy-300 font-mono">
          Memuat artikel panduan MABA...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
        <MascotFlame size="2xl" mood="confused" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
            Panduan Tidak Ditemukan
          </h2>
          <p className="text-sm text-navy-500 max-w-md">
            Artikel yang kamu cari tidak tersedia di repositori panduan.
          </p>
        </div>
        <Link
          href="/blog"
          className="px-6 py-3 rounded-2xl bg-nyala-500 text-white text-xs font-bold shadow-lg shadow-nyala-500/30"
        >
          Kembali ke Daftar Panduan MABA
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-nyala-600 to-amber-500 z-50 origin-left"
        style={{ scaleX }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Navigation Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:text-nyala-600 text-xs font-bold transition-colors"
          >
            <ArrowLeft weight="bold" className="w-4 h-4" />
            <span>Kembali ke Majalah Panduan MABA</span>
          </Link>

          <span className="text-xs font-mono text-navy-400">
            Kategori: {post.category}
          </span>
        </div>

        {/* ── HEADER EDITORIAL ── */}
        <header className="space-y-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-navy-200 dark:border-navy-800 text-xs text-navy-500 dark:text-navy-400">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-nyala-600 text-white flex items-center justify-center font-black text-base shadow-sm">
                {post.author[0]}
              </div>
              <div>
                <p className="font-bold text-navy-950 dark:text-white">
                  {post.author}
                </p>
                <p className="text-[11px] text-navy-400">
                  {post.authorRole} • {post.readTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleTTS}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isSpeaking
                    ? "bg-nyala-600 text-white border-nyala-600 shadow-md animate-pulse"
                    : "bg-navy-50 dark:bg-navy-900 border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-300 hover:border-nyala-500"
                }`}
                title="Dengarkan pembacaan naskah"
              >
                <SpeakerHigh weight={isSpeaking ? "fill" : "bold"} className="w-4 h-4" />
                <span>{isSpeaking ? "Mendengarkan..." : "Dengarkan"}</span>
              </button>

              <button
                onClick={() => setFontSize(fontSize === "normal" ? "large" : fontSize === "large" ? "xl" : "normal")}
                className="p-2 rounded-xl bg-navy-50 dark:bg-navy-900 border border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-300 hover:text-nyala-600"
                title="Ubah Ukuran Teks"
              >
                <TextAa weight="bold" className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleShare("wa")}
                className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                title="Bagikan ke WhatsApp"
              >
                <WhatsappLogo weight="bold" className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleShare("copy")}
                className="p-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300 hover:text-nyala-600"
                title="Salin Tautan"
              >
                <LinkIcon weight="bold" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* ── KEY TAKEAWAYS BOX ── */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="p-6 rounded-3xl bg-amber-500/10 dark:bg-navy-900 border border-amber-500/20 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-nyala-600 dark:text-nyala-400">
              <Sparkle weight="fill" className="w-5 h-5 text-nyala-500" />
              <h3 className="text-sm font-black uppercase tracking-wider">
                Poin Inti / Key Takeaways untuk MABA 2026:
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-navy-800 dark:text-navy-200">
              {post.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <CheckCircle weight="fill" className="w-4 h-4 text-nyala-500 flex-shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── HIGH-RES COVER IMAGE ── */}
        <div className="relative rounded-3xl overflow-hidden aspect-video bg-navy-950 shadow-xl border border-navy-200 dark:border-navy-800">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── ARTICLE PROSE CONTENT (RICH MARKDOWN ENGINE) ── */}
        <div
          className={`leading-relaxed font-sans text-navy-800 dark:text-navy-100 ${
            fontSize === "large" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base"
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white mt-8 mb-4 tracking-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white mt-7 mb-3.5 tracking-tight border-b border-navy-100 dark:border-navy-800 pb-2">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg sm:text-xl font-bold text-navy-950 dark:text-white mt-6 mb-2.5">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-base sm:text-lg leading-relaxed text-navy-800 dark:text-navy-200 mb-5">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-5 list-disc list-inside text-navy-800 dark:text-navy-200">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-5 list-decimal list-inside text-navy-800 dark:text-navy-200">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed text-navy-800 dark:text-navy-200">
                  {children}
                </li>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-6 rounded-2xl border border-navy-200 dark:border-navy-800 shadow-sm">
                  <table className="w-full text-sm text-left border-collapse bg-white dark:bg-navy-900">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-navy-50 dark:bg-navy-950 text-navy-950 dark:text-white font-extrabold border-b border-navy-200 dark:border-navy-800">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 font-extrabold text-xs uppercase tracking-wider">{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 border-b border-navy-100 dark:border-navy-800/60 text-navy-800 dark:text-navy-200">{children}</td>
              ),
              code: ({ children }) => (
                <code className="px-2 py-0.5 rounded-lg bg-navy-100 dark:bg-navy-800 font-mono text-xs text-nyala-600 dark:text-nyala-400 font-bold">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="p-4 rounded-2xl bg-navy-950 text-white font-mono text-xs overflow-x-auto my-5 border border-navy-800">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-nyala-500 pl-4 py-2 my-5 text-base italic text-navy-700 dark:text-navy-300 bg-nyala-500/5 dark:bg-navy-900/50 rounded-r-2xl">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nyala-600 dark:text-nyala-400 font-bold underline hover:text-nyala-700 transition-colors"
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="my-8 border-navy-200 dark:border-navy-800" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* ── TAGS CHIPS ── */}
        {post.tags && post.tags.length > 0 && (
          <div className="space-y-2 pt-4">
            <span className="text-xs font-bold text-navy-400">Topik Terkait:</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl bg-navy-100 dark:bg-navy-800 text-xs font-semibold text-navy-700 dark:text-navy-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── FEEDBACK & HELPFUL RATING ── */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-navy-950 dark:text-white">
              Apakah panduan ini bermanfaat untuk masa orientasimu?
            </h4>
            <p className="text-xs text-navy-500">
              Umpan balikmu membantu tim redaksi meningkatkan panduan MABA UMKT 2026.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                hasLiked
                  ? "bg-nyala-600 text-white shadow-md"
                  : "bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:bg-navy-200"
              }`}
            >
              <ThumbsUp weight={hasLiked ? "fill" : "bold"} className="w-4 h-4" />
              <span>{hasLiked ? "Sangat Membantu!" : "Membantu"}</span>
            </button>

            <Link
              href="/companion"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-bold hover:bg-nyala-500/20 transition-colors"
            >
              <ChatCircleText weight="bold" className="w-4 h-4" />
              <span>Tanya Nyala AI</span>
            </Link>
          </div>
        </div>

        {/* ── RELATED GUIDES CAROUSEL ── */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-navy-200 dark:border-navy-800">
            <div className="flex items-center gap-2">
              <Sparkle weight="fill" className="w-5 h-5 text-nyala-500" />
              <h3 className="text-lg font-black text-navy-950 dark:text-white tracking-tight">
                Panduan Edukasi Lainnya
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 hover:border-nyala-500 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div className="aspect-video overflow-hidden bg-navy-950">
                    <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-nyala-600 dark:text-nyala-400">
                      {rel.category}
                    </span>
                    <h4 className="text-xs font-bold text-navy-950 dark:text-white line-clamp-2 group-hover:text-nyala-600 transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </>
  );
}
