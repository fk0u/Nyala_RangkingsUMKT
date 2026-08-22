"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Globe, 
  Newspaper, 
  Megaphone, 
  CalendarCheck, 
  Buildings, 
  ArrowClockwise, 
  MagnifyingGlass,
  ArrowRight,
  ArrowSquareOut,
  MapPin,
  Clock,
  CheckCircle,
  GraduationCap,
  Sparkle,
  ShareNetwork,
  Copy,
  Info,
  CalendarPlus,
  Funnel,
  CaretLeft,
  CaretRight,
  ArrowsDownUp,
  Tag
} from "@phosphor-icons/react";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import FlutterBottomSheet from "@/components/flutter/FlutterBottomSheet";
import SDGBadge from "@/components/SDGBadge";
import { BeritaSkeletonGrid } from "@/components/SkeletonLoader";
import { 
  UMKTBerita, 
  UMKTPengumuman, 
  UMKTEvent, 
  cleanHTML, 
  formatDateIndo,
  generateSlug,
  extractImageFromHTML
} from "@/lib/umkt-api";
import { UMKT_10_FAKULTAS, FacultyDetail } from "@/lib/faculty-data";
import { useToast } from "@/context/ToastContext";

// Kategori Resmi Berita UMKT
const BERITA_CATEGORIES = [
  { id: "all", label: "Semua Kategori" },
  { id: "sdgs", label: "🌿 SDGs & Keberlanjutan" },
  { id: "kabar kampus", label: "Kabar Kampus" },
  { id: "feature", label: "Feature" },
  { id: "artikel & opini", label: "Artikel & Opini" },
  { id: "riset & pengabdian", label: "Riset & Pengabdian" },
  { id: "UMKT info", label: "UMKT Info" },
  { id: "english corner", label: "English Corner" },
];

// Lembaga / Fakultas yang Didukung Endpoint API
const BERITA_LEMBAGA = [
  { id: "all", label: "Semua Sumber Lembaga", code: "ALL" },
  { id: "lmbg1111", label: "Fakultas Sains dan Teknologi", code: "FST", badge: "lmbg1111" },
  { id: "lmbg1110", label: "Fakultas Ekonomi Bisnis dan Politik", code: "FEBP", badge: "lmbg1110" },
  { id: "lmbg1109", label: "Fakultas Kesehatan Masyarakat", code: "FKM", badge: "lmbg1109" },
];

export default function MobileHubUMKTPage() {
  const [activeTab, setActiveTab] = useState<string>("berita");
  const [search, setSearch] = useState("");
  
  // Berita State
  const [beritaList, setBeritaList] = useState<UMKTBerita[]>([]);
  const [beritaLoading, setBeritaLoading] = useState(false);
  const [beritaPage, setBeritaPage] = useState(1);
  const [beritaTotalCount, setBeritaTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLembaga, setSelectedLembaga] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "title_asc" | "title_desc">("newest");
  
  // Pengumuman & Event
  const [pengumumanList, setPengumumanList] = useState<UMKTPengumuman[]>([]);
  const [eventList, setEventList] = useState<UMKTEvent[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  // Modals & Bottom Sheets
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<UMKTPengumuman | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<UMKTEvent | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyDetail | null>(null);
  const toast = useToast();

  const PAGE_SIZE = 8;

  // 1. Initial Load for All-Hub Data
  useEffect(() => {
    const loadInitialHub = async () => {
      setInitialLoading(true);
      try {
        const res = await fetch("/api/umkt-portal?type=all-hub");
        const data = await res.json();
        const payload = data.data || data.hub || {};
        if (payload) {
          setPengumumanList(payload.pengumuman || []);
          setEventList(payload.event || []);
          if (selectedCategory === "all" && selectedLembaga === "all") {
            setBeritaList(payload.berita || []);
            setBeritaTotalCount(payload.beritaTotal || payload.berita?.length || 0);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialHub();
  }, []);

  // 2. Dynamic Fetch for Berita based on Category, Lembaga, Page, and Search
  const fetchBeritaDynamic = async () => {
    setBeritaLoading(true);
    try {
      let url = `/api/umkt-portal?page=${beritaPage}&page_size=${PAGE_SIZE}`;

      if (selectedLembaga !== "all") {
        url += `&type=berita-lembaga&kode_lembaga=${selectedLembaga}`;
        if (search.trim()) url += `&search=${encodeURIComponent(search.trim())}`;
      } else {
        url += `&type=berita`;
        const queryTerm = selectedCategory !== "all" 
          ? (search.trim() ? `${selectedCategory} ${search.trim()}` : selectedCategory)
          : search.trim();
        if (queryTerm) url += `&search=${encodeURIComponent(queryTerm)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "success" && data.data) {
        setBeritaList(data.data.results || []);
        setBeritaTotalCount(data.data.count || 0);
      } else {
        setBeritaList([]);
        setBeritaTotalCount(0);
      }
    } catch (err) {
      console.error("Gagal memuat berita:", err);
      toast.error("Gagal memuat data berita dari portal resmi", "Koneksi Bermasalah");
    } finally {
      setBeritaLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "berita") {
      fetchBeritaDynamic();
    }
  }, [selectedCategory, selectedLembaga, beritaPage, activeTab]);

  // Handle Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBeritaPage(1);
    fetchBeritaDynamic();
  };

  // Client-side sorting for current page
  const sortedBerita = useMemo(() => {
    const list = [...beritaList];
    if (sortOrder === "title_asc") {
      return list.sort((a, b) => a.judul.localeCompare(b.judul));
    }
    if (sortOrder === "title_desc") {
      return list.sort((a, b) => b.judul.localeCompare(a.judul));
    }
    if (sortOrder === "oldest") {
      return list.sort((a, b) => {
        const dateA = new Date(a.created || a.tanggal || 0).getTime();
        const dateB = new Date(b.created || b.tanggal || 0).getTime();
        return dateA - dateB;
      });
    }
    // newest (default)
    return list.sort((a, b) => {
      const dateA = new Date(a.created || a.tanggal || 0).getTime();
      const dateB = new Date(b.created || b.tanggal || 0).getTime();
      return dateB - dateA;
    });
  }, [beritaList, sortOrder]);

  const totalPages = Math.ceil(beritaTotalCount / PAGE_SIZE) || 1;

  const HUB_TABS = [
    { id: "berita", label: "Berita Kampus", count: beritaTotalCount, icon: Newspaper },
    { id: "pengumuman", label: "Pengumuman", count: pengumumanList.length, icon: Megaphone },
    { id: "event", label: "Agenda Event", count: eventList.length, icon: CalendarCheck },
    { id: "fakultas", label: "10 Fakultas", count: UMKT_10_FAKULTAS.length, icon: Buildings },
  ];

  const filteredPengumuman = pengumumanList.filter((p) =>
    p.judul.toLowerCase().includes(search.toLowerCase()) || cleanHTML(p.isi).toLowerCase().includes(search.toLowerCase())
  );

  const filteredEvents = eventList.filter((ev) =>
    ev.judul.toLowerCase().includes(search.toLowerCase()) || cleanHTML(ev.isi).toLowerCase().includes(search.toLowerCase())
  );

  const filteredFakultas = UMKT_10_FAKULTAS.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.code.toLowerCase().includes(search.toLowerCase()) ||
    f.programs.some((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin ke clipboard!`, "Tersalin");
  };

  const getValidImageUrl = (item: { thumbnail?: string | null; foto?: string | null; isi?: string }) => {
    if (item.thumbnail && item.thumbnail.startsWith("http")) return item.thumbnail;
    if (item.foto && item.foto.startsWith("http")) return item.foto;
    const extracted = extractImageFromHTML(item.isi);
    if (extracted && extracted.startsWith("http")) return extracted;
    return null;
  };

  return (
    <div className="space-y-4">
      
      {/* ── 1. HEADER ── */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
          Hub Warta & 10 Fakultas
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Feed visual berita real-time, pengumuman resmi, agenda kampus, dan direktori fakultas UMKT.
        </p>
      </div>

      {/* ── 2. SEARCH BAR ── */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <MagnifyingGlass weight="bold" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Cari berita atau tekan enter...`}
          className="w-full pl-9 pr-20 py-2.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 text-xs text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-nyala-500 shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-nyala-600 hover:bg-nyala-700 text-white font-bold text-[10px] shadow-xs active:scale-95 transition-all"
        >
          Cari
        </button>
      </form>

      {/* ── 3. DUOLINGO 3D TABS (CLEAN NON-TRUNCATED HORIZONTAL CARDS) ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
        {HUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap flex items-center gap-2 border-2 border-b-4 transition-all cursor-pointer ${
                isActive
                  ? "bg-nyala-600 text-white border-nyala-700 border-b-nyala-900 shadow-sm"
                  : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 border-b-slate-300 dark:border-b-slate-900 text-navy-950 dark:text-white hover:border-slate-300"
              }`}
            >
              <Icon weight={isActive ? "fill" : "bold"} className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── 4. TAB 1: BERITA KAMPUS (WITH ADVANCED CATEGORY, FACULTY, SORT & PAGINATION) ── */}
      {activeTab === "berita" && (
        <div className="space-y-3.5">
          
          {/* A. Category Filter Chips (Horizontal Scroll) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <Tag weight="bold" className="w-3 h-3 text-nyala-600" />
                Kategori Topik:
              </span>
              <span className="font-mono text-[10px] text-nyala-600 dark:text-nyala-400">
                {selectedCategory === "all" ? "Semua Topik" : selectedCategory}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 select-none">
              {BERITA_CATEGORIES.map((cat) => {
                const isCatActive = selectedCategory === cat.id && selectedLembaga === "all";
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedLembaga("all");
                      setSelectedCategory(cat.id);
                      setBeritaPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer border ${
                      isCatActive
                        ? "bg-nyala-600 text-white border-nyala-700 shadow-xs"
                        : "bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. Faculty / Lembaga Source Filter & Sort Dropdown */}
          <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-[#0C1222]/80 border border-slate-200 dark:border-slate-800 space-y-2 select-none">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <Buildings weight="bold" className="w-3.5 h-3.5 text-blue-600" />
                Filter Sumber Berita:
              </span>
              
              {/* Sort Control */}
              <div className="flex items-center gap-1 text-[10px]">
                <ArrowsDownUp weight="bold" className="w-3 h-3 text-slate-400" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 font-bold text-navy-950 dark:text-white outline-none cursor-pointer"
                >
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="title_asc">Judul A - Z</option>
                  <option value="title_desc">Judul Z - A</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {BERITA_LEMBAGA.map((lem) => {
                const isLemActive = selectedLembaga === lem.id;
                return (
                  <button
                    key={lem.id}
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedLembaga(lem.id);
                      setBeritaPage(1);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer border ${
                      isLemActive
                        ? "bg-blue-600 text-white border-blue-700 shadow-xs"
                        : "bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {lem.code === "ALL" ? "Universitas (Semua)" : `${lem.code} (${lem.label.replace("Fakultas ", "")})`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* C. News Counter & Reset Filter Indicator */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
            <span>
              Total: <strong className="text-navy-950 dark:text-white font-bold">{beritaTotalCount}</strong> berita (Hal {beritaPage} / {totalPages})
            </span>
            {(selectedCategory !== "all" || selectedLembaga !== "all" || search.trim()) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLembaga("all");
                  setSearch("");
                  setBeritaPage(1);
                }}
                className="text-[10px] font-bold text-rose-500 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <ArrowClockwise weight="bold" className="w-3 h-3" />
                Reset Filter
              </button>
            )}
          </div>

          {/* D. News Cards List */}
          <div className="space-y-3">
            {beritaLoading ? (
              <BeritaSkeletonGrid count={3} />
            ) : sortedBerita.length === 0 ? (
              <DuolingoCard variant="surface" padding="md" className="text-center text-xs text-slate-400 space-y-2 py-8">
                <p>Tidak ada artikel yang cocok dengan filter atau kata kunci saat ini.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedLembaga("all");
                    setSearch("");
                    setBeritaPage(1);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-nyala-600 text-white font-bold text-xs"
                >
                  Lihat Semua Berita
                </button>
              </DuolingoCard>
            ) : (
              sortedBerita.map((item, idx) => {
                const articleSlug = item.slug || generateSlug(item.judul, item.id);
                const imgUrl = getValidImageUrl(item);

                return (
                  <Link
                    key={`berita-${item.id || idx}`}
                    href={`/mobile/hub-umkt/${articleSlug}`}
                    className="rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 overflow-hidden select-none active:border-b-2 active:translate-y-0.5 transition-all block group shadow-xs"
                  >
                    {/* Real Image Header */}
                    {imgUrl && (
                      <div className="relative w-full h-40 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <img
                          src={imgUrl}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[9px] font-mono font-bold">
                          {item.kode_lembaga ? item.kode_lembaga.toUpperCase() : "Humas UMKT"}
                        </div>
                      </div>
                    )}

                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors leading-snug">
                          {item.judul}
                        </h3>
                        <div className="w-7 h-7 rounded-xl bg-nyala-500/10 dark:bg-nyala-500/20 text-nyala-600 dark:text-nyala-400 flex items-center justify-center flex-shrink-0 group-hover:bg-nyala-600 group-hover:text-white transition-colors">
                          <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {cleanHTML(item.isi)}
                      </p>

                      {/* SDG Badges placed below summary text */}
                      {Array.isArray(item.sdgs) && item.sdgs.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {item.sdgs.slice(0, 2).map((sdg) => (
                            <SDGBadge key={sdg.id} sdg={sdg} size="sm" />
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-mono">
                        <span className="text-nyala-600 dark:text-nyala-400 font-bold">
                          {formatDateIndo(item.created || item.tanggal || undefined)}
                        </span>
                        <span className="text-slate-400">Liputan Resmi</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* E. Pagination Control Bar */}
          {totalPages > 1 && (
            <div className="p-3 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-center justify-between select-none shadow-xs">
              <button
                disabled={beritaPage <= 1 || beritaLoading}
                onClick={() => {
                  setBeritaPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-navy-950 dark:text-white font-bold text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
              >
                <CaretLeft weight="bold" className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <div className="text-xs font-mono font-bold text-navy-950 dark:text-white">
                Hal {beritaPage} / {totalPages}
              </div>

              <button
                disabled={beritaPage >= totalPages || beritaLoading}
                onClick={() => {
                  setBeritaPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3 py-1.5 rounded-xl bg-nyala-600 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <span>Selanjutnya</span>
                <CaretRight weight="bold" className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* ── 5. TAB 2: PENGUMUMAN RESMI SISTEMATIS (WITH REAL POSTER IMAGES) ── */}
      {activeTab === "pengumuman" && (
        <div className="space-y-3">
          {filteredPengumuman.length === 0 ? (
            <DuolingoCard variant="surface" padding="md" className="text-center text-xs text-slate-400">
              Tidak ada pengumuman yang sesuai.
            </DuolingoCard>
          ) : (
            filteredPengumuman.map((item, idx) => {
              const imgUrl = getValidImageUrl(item);
              return (
                <div
                  key={`pengumuman-${item.id || idx}`}
                  onClick={() => setSelectedAnnouncement(item)}
                  className="rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 overflow-hidden select-none active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer group shadow-xs"
                >
                  {imgUrl && (
                    <div className="relative w-full h-36 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <img
                        src={imgUrl}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 uppercase border border-blue-200 dark:border-blue-900/60 flex items-center gap-1">
                        <Megaphone weight="bold" className="w-3 h-3" />
                        Edaran Resmi
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formatDateIndo(item.created || item.tanggal || undefined)}
                      </span>
                    </div>

                    <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm leading-snug group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors">
                      {item.judul}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {cleanHTML(item.isi)}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] font-bold text-nyala-600 dark:text-nyala-400">
                      <span>Ketuk untuk baca edaran penuh</span>
                      <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── 6. TAB 3: AGENDA EVENT TIMELINE SISTEMATIS (WITH EVENT POSTERS) ── */}
      {activeTab === "event" && (
        <div className="space-y-3">
          {filteredEvents.length === 0 ? (
            <DuolingoCard variant="surface" padding="md" className="text-center text-xs text-slate-400">
              Tidak ada agenda event yang sesuai.
            </DuolingoCard>
          ) : (
            filteredEvents.map((ev, idx) => {
              const formattedDate = formatDateIndo(ev.created || ev.tanggal || undefined);
              const imgUrl = getValidImageUrl(ev);

              return (
                <div
                  key={`event-${ev.id || idx}`}
                  onClick={() => setSelectedEvent(ev)}
                  className="rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 overflow-hidden select-none active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer group shadow-xs"
                >
                  {imgUrl && (
                    <div className="relative w-full h-36 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <img
                        src={imgUrl}
                        alt={ev.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="p-4 flex items-start gap-3">
                    {/* Date Chip Column */}
                    <div className="w-12 h-14 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300/40 dark:border-amber-800/40 flex flex-col items-center justify-center flex-shrink-0 text-amber-800 dark:text-amber-300">
                      <CalendarCheck weight="fill" className="w-4 h-4 text-amber-500 mb-0.5" />
                      <span className="text-[10px] font-black font-mono">EVENT</span>
                    </div>

                    {/* Content Column */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {formattedDate}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          Kampus UMKT
                        </span>
                      </div>

                      <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm leading-snug group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors">
                        {ev.judul}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {cleanHTML(ev.isi)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── 7. TAB 4: DIREKTORI 10 FAKULTAS (WITH REAL CAMPUS BUILDING IMAGES) ── */}
      {activeTab === "fakultas" && (
        <div className="space-y-3">
          {filteredFakultas.map((fak) => (
            <div
              key={fak.id}
              onClick={() => setSelectedFaculty(fak)}
              className="rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 overflow-hidden select-none active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer group shadow-xs"
            >
              {/* Real Campus Photo Header */}
              {fak.imageUrl && (
                <div className="relative w-full h-36 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={fak.imageUrl}
                    alt={fak.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                    <span className="font-black text-xs drop-shadow-md">
                      {fak.name}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${fak.badgeBg} ${fak.badgeText} backdrop-blur-sm`}>
                      {fak.code}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-4 space-y-3">
                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {fak.description}
                </p>

                {/* Location Pill */}
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#1E293B] p-2 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  <MapPin weight="bold" className="w-3.5 h-3.5 text-nyala-600 flex-shrink-0" />
                  <span className="truncate">{fak.buildingLocation}</span>
                </div>

                {/* Program Chips Preview */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {fak.programs.slice(0, 3).map((p, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-navy-800 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {p.name} ({p.degree})
                    </span>
                  ))}
                  {fak.programs.length > 3 && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-nyala-50 dark:bg-nyala-950 text-nyala-600 dark:text-nyala-400 font-mono">
                      +{fak.programs.length - 3} lainnya
                    </span>
                  )}
                </div>

                {/* Bottom Action */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] font-bold text-nyala-600 dark:text-nyala-400">
                  <span>Rincian Prodi & Akreditasi</span>
                  <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── BOTTOM SHEET 1: PENGUMUMAN DETAIL ── */}
      <FlutterBottomSheet
        isOpen={!!selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        title="Edaran Pengumuman Resmi"
        subtitle={selectedAnnouncement ? formatDateIndo(selectedAnnouncement.created || selectedAnnouncement.tanggal || undefined) : undefined}
      >
        {selectedAnnouncement && (
          <div className="space-y-4 text-xs sm:text-sm pb-4">
            {getValidImageUrl(selectedAnnouncement) && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-56 bg-slate-100">
                <img
                  src={getValidImageUrl(selectedAnnouncement)!}
                  alt={selectedAnnouncement.judul}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h2 className="text-sm sm:text-base font-black text-navy-950 dark:text-white leading-snug">
              {selectedAnnouncement.judul}
            </h2>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {cleanHTML(selectedAnnouncement.isi)}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => handleCopyText(cleanHTML(selectedAnnouncement.isi), "Isi Pengumuman")}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-navy-950 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Copy weight="bold" className="w-4 h-4" />
                <span>Salin Pengumuman</span>
              </button>

              <a
                href="https://web.umkt.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-nyala-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform text-center"
              >
                <span>Portal Resmi</span>
                <ArrowSquareOut weight="bold" className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </FlutterBottomSheet>

      {/* ── BOTTOM SHEET 2: EVENT DETAIL ── */}
      <FlutterBottomSheet
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title="Rincian Agenda Event"
        subtitle={selectedEvent ? formatDateIndo(selectedEvent.created || selectedEvent.tanggal || undefined) : undefined}
      >
        {selectedEvent && (
          <div className="space-y-4 text-xs sm:text-sm pb-4">
            {getValidImageUrl(selectedEvent) && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-56 bg-slate-100">
                <img
                  src={getValidImageUrl(selectedEvent)!}
                  alt={selectedEvent.judul}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h2 className="text-sm sm:text-base font-black text-navy-950 dark:text-white leading-snug">
              {selectedEvent.judul}
            </h2>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {cleanHTML(selectedEvent.isi)}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => handleCopyText(selectedEvent.judul, "Agenda Event")}
                className="w-full py-2.5 rounded-xl bg-nyala-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <CalendarPlus weight="bold" className="w-4 h-4" />
                <span>Simpan Catatan Agenda</span>
              </button>
            </div>
          </div>
        )}
      </FlutterBottomSheet>

      {/* ── BOTTOM SHEET 3: FAKULTAS DETAIL & PROGRAM STUDI ── */}
      <FlutterBottomSheet
        isOpen={!!selectedFaculty}
        onClose={() => setSelectedFaculty(null)}
        title={selectedFaculty?.shortName || "Rincian Fakultas"}
      >
        {selectedFaculty && (
          <div className="space-y-4 text-xs sm:text-sm pb-4">
            {selectedFaculty.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-48 bg-slate-100">
                <img
                  src={selectedFaculty.imageUrl}
                  alt={selectedFaculty.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Faculty Header Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-navy-900 dark:to-[#0F172A] border border-amber-200/80 dark:border-navy-800 space-y-2">
              <h2 className="text-sm font-black text-navy-950 dark:text-white leading-snug">
                {selectedFaculty.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedFaculty.description}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-navy-950 dark:text-white pt-1">
                <MapPin weight="fill" className="w-4 h-4 text-nyala-600 flex-shrink-0" />
                <span>{selectedFaculty.buildingLocation}</span>
              </div>
            </div>

            {/* Program Studi List */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-navy-950 dark:text-white uppercase tracking-wider px-1">
                Program Studi & Jenjang Kelulusan:
              </h4>

              <div className="space-y-2">
                {selectedFaculty.programs.map((prog, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-black text-xs text-navy-950 dark:text-white">
                        {prog.name}
                      </div>
                      {prog.accreditation && (
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                          Akreditasi: {prog.accreditation}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-nyala-50 dark:bg-nyala-950 text-nyala-600 dark:text-nyala-400 border border-nyala-200 dark:border-nyala-900">
                      {prog.degree}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visit Official Website Button */}
            <a
              href={selectedFaculty.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-nyala-600 hover:bg-nyala-700 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform text-center shadow-sm block"
            >
              <span>Kunjungi Website Resmi {selectedFaculty.code}</span>
              <ArrowSquareOut weight="bold" className="w-4 h-4" />
            </a>

          </div>
        )}
      </FlutterBottomSheet>

    </div>
  );
}
