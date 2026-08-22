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
  Buildings,
  Eye,
  CheckCircle,
  SpeakerHigh,
  SpeakerSlash
} from "@phosphor-icons/react";
import { 
  UMKTBerita, 
  formatDateIndo, 
  cleanHTML, 
  sanitizeArticleHTML,
  generateSlug,
  fetchUMKTArticleBySlug 
} from "@/lib/umkt-api";
import { useToast } from "@/context/ToastContext";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import DuolingoButton from "@/components/flutter/DuolingoButton";

export default function MobileHubArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
  const toast = useToast();

  const [article, setArticle] = useState<UMKTBerita | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<UMKTBerita[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      try {
        const result = await fetchUMKTArticleBySlug(rawSlug);
        setArticle(result.article);
        setRelatedArticles(result.relatedArticles);
      } catch (err) {
        console.error("Gagal memuat warta mobile:", err);
      } finally {
        setLoading(false);
      }
    }

    if (rawSlug) {
      loadArticle();
    }
  }, [rawSlug]);

  const handleShare = (platform: "wa" | "copy") => {
    if (typeof window === "undefined" || !article) return;
    const url = window.location.href;
    const text = `${article.judul} - Portal Warta Resmi UMKT`;

    if (platform === "wa") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      toast.showToast("Link warta tersalin!", "success");
    }
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !article) return;
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const plainText = `${article.judul}. ${cleanHTML(article.isi)}`;
        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.lang = "id-ID";
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      toast.showToast("Browser tidak mendukung suara narasi", "warning");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-nyala-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-slate-400 font-medium">Memuat warta resmi kampus...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-12 text-center space-y-4">
        <h2 className="text-lg font-black text-navy-950 dark:text-white">Warta Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500">Artikel yang Anda cari tidak tersedia.</p>
        <Link href="/mobile/hub-umkt" className="inline-block px-4 py-2 rounded-xl bg-nyala-600 text-white font-bold text-xs">
          Kembali ke Hub Warta
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* ── 1. TOP NAVIGATION & CONTROLS ── */}
      <div className="flex items-center justify-between">
        <Link
          href="/mobile/hub-umkt"
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
            title="Dengarkan Narasi Warta"
          >
            {isSpeaking ? <SpeakerSlash weight="bold" className="w-3.5 h-3.5" /> : <SpeakerHigh weight="bold" className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ── 2. ARTICLE HERO CARD ── */}
      <div className="duo-card p-4 sm:p-5 space-y-3">
        
        {/* Meta Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold uppercase border border-amber-200 dark:border-amber-900/50">
            Warta Resmi UMKT
          </span>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <CalendarCheck weight="bold" className="w-3.5 h-3.5" />
            <span>{formatDateIndo(article.created || article.tanggal || undefined)}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-base sm:text-lg font-black text-navy-950 dark:text-white leading-snug">
          {article.judul}
        </h1>

        {/* Author / Source */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="w-6 h-6 rounded-full bg-nyala-500 text-white flex items-center justify-center font-bold text-[10px]">
            U
          </div>
          <span>Humas Universitas Muhammadiyah Kalimantan Timur</span>
        </div>
      </div>

      {/* ── 3. ARTICLE CONTENT BODY ── */}
      <div className="duo-card p-4 sm:p-5 space-y-4">
        <div 
          className={`prose prose-sm dark:prose-invert max-w-none text-navy-900 dark:text-slate-200 leading-relaxed font-sans ${
            fontSize === "large" ? "text-sm sm:text-base leading-loose" : "text-xs sm:text-sm"
          }`}
          dangerouslySetInnerHTML={{ __html: sanitizeArticleHTML(article.isi) }}
        />

        {/* Share Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
            Bagikan Warta Ini:
          </span>
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

      {/* ── 4. RELATED ARTICLES ── */}
      {relatedArticles.length > 0 && (
        <div className="space-y-2.5 pt-2">
          <h3 className="text-xs font-black text-navy-950 dark:text-white uppercase tracking-wider px-1">
            Warta Terkait Lainnya
          </h3>

          <div className="space-y-2">
            {relatedArticles.map((rel, idx) => (
              <Link
                key={`rel-art-${rel.id || rel.slug || idx}-${idx}`}
                href={`/mobile/hub-umkt/${rel.slug || generateSlug(rel.judul, rel.id)}`}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 block space-y-1 active:border-b-2 active:translate-y-0.5 transition-all select-none"
              >
                <span className="text-[10px] text-nyala-600 dark:text-nyala-400 font-mono font-bold">
                  {formatDateIndo(rel.created || rel.tanggal || undefined)}
                </span>
                <h4 className="text-xs font-bold text-navy-950 dark:text-white line-clamp-2 leading-snug">
                  {rel.judul}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
