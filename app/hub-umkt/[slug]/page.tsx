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
  TextAa
} from "@phosphor-icons/react";
import { 
  UMKTBerita, 
  formatDateIndo, 
  cleanHTML, 
  sanitizeArticleHTML,
  extractImageFromHTML,
  generateSlug 
} from "@/lib/umkt-api";
import { useToast } from "@/context/ToastContext";
import MascotFlame from "@/components/MascotFlame";

export default function HubArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
  const toast = useToast();

  const [article, setArticle] = useState<UMKTBerita | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<UMKTBerita[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xl">("normal");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Top Reading Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      try {
        const res = await fetch("/api/umkt-portal?type=berita");
        const data = await res.json();
        const list: UMKTBerita[] = data.data?.results || (Array.isArray(data.data) ? data.data : []) || data.berita || [];

        if (list.length > 0) {
          // Match by id at end of slug (e.g., "judul-berita-2199" -> 2199) or slug match
          const idMatch = rawSlug.match(/-(\d+)$/);
          const targetId = idMatch ? parseInt(idMatch[1], 10) : null;

          let found = targetId ? list.find(b => b.id === targetId) : null;
          
          if (!found) {
            found = list.find(b => generateSlug(b.judul, b.id) === rawSlug);
          }

          if (!found && list.length > 0) {
            // Fallback to first article if not found
            found = list[0];
          }

          setArticle(found || null);
          setRelatedArticles(list.filter(b => b.id !== (found?.id || 0)).slice(0, 3));
        }
      } catch (err) {
        console.error("Gagal memuat detail warta:", err);
      } finally {
        setLoading(false);
      }
    }

    if (rawSlug) {
      loadArticle();
    }
  }, [rawSlug]);

  const handleShare = (platform: "wa" | "twitter" | "copy") => {
    if (typeof window === "undefined" || !article) return;
    const url = window.location.href;
    const text = `${article.judul} - Portal Warta Resmi UMKT`;

    if (platform === "wa") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Tautan warta berhasil disalin ke clipboard!", "Tautan Disalin");
    }
  };

  const handleToggleTTS = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !article) {
      toast.info("Fitur suara tidak didukung di browser ini.", "Informasi");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const plainText = `${article.judul}. ${cleanHTML(article.isi).slice(0, 500)}`;
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.lang = "id-ID";
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      toast.info("Memutar pembacaan naskah warta...", "Audio Nyala Aktif");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <MascotFlame size="xl" mood="studying" className="animate-pulse" />
        <p className="text-sm font-bold text-navy-600 dark:text-navy-300 font-mono">
          Memuat naskah warta resmi UMKT...
        </p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
        <MascotFlame size="2xl" mood="confused" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
            Warta Tidak Ditemukan
          </h2>
          <p className="text-sm text-navy-500 max-w-md">
            Artikel yang kamu cari mungkin telah diperbarui atau dipindahkan di server web.umkt.ac.id.
          </p>
        </div>
        <Link
          href="/hub-umkt"
          className="px-6 py-3 rounded-2xl bg-nyala-500 text-white text-xs font-bold shadow-lg shadow-nyala-500/30"
        >
          Kembali ke Hub Warta UMKT
        </Link>
      </div>
    );
  }

  const coverImage = article.foto || extractImageFromHTML(article.isi) || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80";

  return (
    <>
      {/* ── TOP READING PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-nyala-600 to-amber-500 z-50 origin-left"
        style={{ scaleX }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Navigation Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/hub-umkt"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:text-nyala-600 text-xs font-bold transition-colors"
          >
            <ArrowLeft weight="bold" className="w-4 h-4" />
            <span>Kembali ke Hub Warta UMKT</span>
          </Link>

          <span className="text-xs font-mono text-navy-400">
            ID Rilis: #{article.id}
          </span>
        </div>

        {/* ── HEADER EDITORIAL ── */}
        <header className="space-y-6">
          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 dark:text-white tracking-tight leading-tight">
            {article.judul}
          </h1>

          {/* Byline & Read Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-navy-200 dark:border-navy-800 text-xs text-navy-500 dark:text-navy-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 flex items-center justify-center font-black text-sm border border-nyala-500/20">
                UMKT
              </div>
              <div>
                <p className="font-bold text-navy-950 dark:text-white">
                  Humas & Biro Kemahasiswaan
                </p>
                <p className="text-[11px] text-navy-400">
                  {formatDateIndo(article.tgl_upload)} • 4 menit baca
                </p>
              </div>
            </div>

            {/* Quick Actions */}
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
                {isSpeaking ? <SpeakerHigh weight="fill" className="w-4 h-4" /> : <SpeakerHigh weight="bold" className="w-4 h-4" />}
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

        {/* ── HIGH-RES HERO IMAGE ── */}
        <div className="relative rounded-3xl overflow-hidden aspect-video bg-navy-950 shadow-xl border border-navy-200 dark:border-navy-800">
          <img
            src={coverImage}
            alt={article.judul}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 text-[10px] font-mono text-white/90">
            Dokumentasi Humas UMKT
          </div>
        </div>

        {/* ── ARTICLE PROSE CONTENT ── */}
        <div
          className={`space-y-6 leading-relaxed font-sans text-navy-800 dark:text-navy-100 ${
            fontSize === "large" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base"
          }`}
        >
          {/* Render raw HTML safely with enhanced styling */}
          <div
            className="prose prose-navy dark:prose-invert max-w-none prose-img:rounded-3xl prose-img:shadow-md prose-a:text-nyala-600 prose-headings:font-black prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizeArticleHTML(article.isi) }}
          />
        </div>

        {/* ── OFFICIAL VERIFICATION BADGE & SOURCE ── */}
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle weight="fill" className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-navy-950 dark:text-white">
                Rilis Resmi Terverifikasi Universitas Muhammadiyah Kalimantan Timur
              </h4>
              <p className="text-xs text-navy-500 dark:text-navy-400">
                Data bersumber langsung dari Django REST Framework web.umkt.ac.id.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-navy-100 dark:border-navy-800">
            <span className="text-xs font-mono text-navy-400">
              URL Sumber Asli: web.umkt.ac.id/berita/{article.id}/
            </span>

            <a
              href="https://web.umkt.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-nyala-600 hover:text-white text-xs font-bold transition-all text-navy-700 dark:text-navy-300"
            >
              <span>Kunjungi Portal Resmi UMKT</span>
              <ArrowSquareOut weight="bold" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ── RELATED ARTICLES CAROUSEL ── */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-navy-200 dark:border-navy-800">
            <div className="flex items-center gap-2">
              <Sparkle weight="fill" className="w-5 h-5 text-nyala-500" />
              <h3 className="text-lg font-black text-navy-950 dark:text-white tracking-tight">
                Warta Terkait Lainnya
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => {
                const relSlug = generateSlug(rel.judul, rel.id);
                const relCover = rel.foto || extractImageFromHTML(rel.isi) || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80";

                return (
                  <Link
                    key={`rel-${rel.id}`}
                    href={`/hub-umkt/${relSlug}`}
                    className="group rounded-2xl overflow-hidden bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 hover:border-nyala-500 transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div className="aspect-video overflow-hidden bg-navy-950">
                      <img src={relCover} alt={rel.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold text-nyala-600 dark:text-nyala-400">
                        {formatDateIndo(rel.tgl_upload)}
                      </span>
                      <h4 className="text-xs font-bold text-navy-950 dark:text-white line-clamp-2 group-hover:text-nyala-600 transition-colors">
                        {rel.judul}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </article>
    </>
  );
}
