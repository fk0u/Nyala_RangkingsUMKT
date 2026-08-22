"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Newspaper, 
  Megaphone, 
  CalendarCheck, 
  Buildings, 
  ArrowClockwise, 
  MagnifyingGlass, 
  ArrowSquareOut, 
  Sparkle, 
  Clock, 
  Tag, 
  SlidersHorizontal,
  BookmarkSimple,
  ShareNetwork,
  Eye,
  CheckCircle,
  WarningCircle,
  Funnel,
  ArrowRight,
  Student,
  MapPin,
  GraduationCap
} from "@phosphor-icons/react";
import { 
  fetchUMKTHub, 
  UMKTBerita, 
  UMKTPengumuman, 
  UMKTEvent, 
  UMKTFakultas, 
  UMKTInformasi,
  cleanHTML,
  formatDateIndo,
  extractImageFromHTML,
  generateSlug
} from "@/lib/umkt-api";
import { UMKT_10_FAKULTAS } from "@/lib/faculty-data";
import { useToast } from "@/context/ToastContext";
import MascotFlame from "@/components/MascotFlame";
import SDGBadge from "@/components/SDGBadge";
import { BeritaSkeletonGrid } from "@/components/SkeletonLoader";

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

const BERITA_LEMBAGA = [
  { id: "all", label: "Semua Sumber Lembaga", code: "ALL" },
  { id: "lmbg1111", label: "Fakultas Sains dan Teknologi", code: "FST", badge: "lmbg1111" },
  { id: "lmbg1110", label: "Fakultas Ekonomi Bisnis dan Politik", code: "FEBP", badge: "lmbg1110" },
  { id: "lmbg1109", label: "Fakultas Kesehatan Masyarakat", code: "FKM", badge: "lmbg1109" },
];

export default function HubUMKTPage() {
  const [activeTab, setActiveTab] = useState<"all" | "berita" | "pengumuman" | "event" | "fakultas" | "unit">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSDG, setSelectedSDG] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const toast = useToast();

  // News Specific States (Pagination, Category & Faculty Source)
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLembaga, setSelectedLembaga] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "title_asc" | "title_desc">("newest");
  const [beritaPage, setBeritaPage] = useState(1);
  const [beritaTotalCount, setBeritaTotalCount] = useState(0);
  const [beritaLoading, setBeritaLoading] = useState(false);

  // Data Stores
  const [beritaList, setBeritaList] = useState<UMKTBerita[]>([]);
  const [pengumumanList, setPengumumanList] = useState<UMKTPengumuman[]>([]);
  const [eventList, setEventList] = useState<UMKTEvent[]>([]);
  const [fakultasList, setFakultasList] = useState<UMKTFakultas[]>([]);
  const [informasiList, setInformasiList] = useState<UMKTInformasi[]>([]);

  const PAGE_SIZE = 9;

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/umkt-portal?type=all-hub");
      const data = await res.json();
      const payload = data.data || data.hub || {};

      if (payload) {
        setPengumumanList(payload.pengumuman || []);
        setEventList(payload.event || []);
        setFakultasList(payload.fakultas || []);
        setInformasiList(payload.informasi || []);
        setLastUpdate(payload.lastUpdate?.[0]?.tanggal_formatted || new Date().toISOString());
        if (selectedCategory === "all" && selectedLembaga === "all") {
          setBeritaList(payload.berita || []);
          setBeritaTotalCount(payload.beritaTotal || payload.berita?.length || 0);
        }
      }
    } catch (err) {
      console.error("Gagal memuat data API UMKT:", err);
      toast.error("Gagal terhubung ke REST API web.umkt.ac.id", "Koneksi Bermasalah");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Dynamic Berita Fetcher
  const fetchBeritaDynamic = async () => {
    setBeritaLoading(true);
    try {
      let url = `/api/umkt-portal?page=${beritaPage}&page_size=${PAGE_SIZE}`;

      if (selectedLembaga !== "all") {
        url += `&type=berita-lembaga&kode_lembaga=${selectedLembaga}`;
        if (searchQuery.trim()) url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      } else {
        url += `&type=berita`;
        const queryTerm = selectedCategory !== "all"
          ? (searchQuery.trim() ? `${selectedCategory} ${searchQuery.trim()}` : selectedCategory)
          : searchQuery.trim();
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
      console.error("Gagal memuat berita dinamis:", err);
    } finally {
      setBeritaLoading(false);
    }
  };

  useEffect(() => {
    fetchBeritaDynamic();
  }, [selectedCategory, selectedLembaga, beritaPage]);

  // Client-side sorting on active page
  const sortedBerita = React.useMemo(() => {
    const list = [...beritaList];
    if (sortOrder === "title_asc") {
      return list.sort((a, b) => a.judul.localeCompare(b.judul));
    }
    if (sortOrder === "title_desc") {
      return list.sort((a, b) => b.judul.localeCompare(a.judul));
    }
    if (sortOrder === "oldest") {
      return list.sort((a, b) => {
        const dateA = new Date(a.created || a.tanggal || a.tgl_upload || 0).getTime();
        const dateB = new Date(b.created || b.tanggal || b.tgl_upload || 0).getTime();
        return dateA - dateB;
      });
    }
    // newest (default)
    return list.sort((a, b) => {
      const dateA = new Date(a.created || a.tanggal || a.tgl_upload || 0).getTime();
      const dateB = new Date(b.created || b.tanggal || b.tgl_upload || 0).getTime();
      return dateB - dateA;
    });
  }, [beritaList, sortOrder]);

  const totalPages = Math.ceil(beritaTotalCount / PAGE_SIZE) || 1;

  // Filter Pengumuman
  const filteredPengumuman = pengumumanList.filter((p) => {
    return (
      p.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.isi.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Filter Event
  const filteredEvent = eventList.filter((e) => {
    return (
      e.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.isi.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Filter Unit
  const filteredUnit = informasiList.filter((u) => {
    const name = (u.nama || u.nama_lembaga || "").toLowerCase();
    const desc = (u.keterangan || u.deskripsi || "").toLowerCase();
    return name.includes(searchQuery.toLowerCase()) || desc.includes(searchQuery.toLowerCase());
  });

  const spotlightArticle = sortedBerita[0];

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      
      {/* ── 1. EDITORIAL HERO HEADER ── */}
      <section className="relative p-8 sm:p-12 rounded-[36px] bg-navy-950 text-white overflow-hidden shadow-xl border border-navy-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Hub Warta, Pengumuman & <br />
            <span className="fire-text-gradient">Direktori Resmi Kampus</span>
          </h1>

          <p className="text-sm sm:text-base text-navy-200 leading-relaxed max-w-2xl">
            Pusat informasi terpadu Universitas Muhammadiyah Kalimantan Timur. Terhubung langsung ke 2.100+ artikel berita, rilis kegiatan IKN & FEBP, edaran beasiswa MABA, serta 10 fakultas resmi.
          </p>

          {/* Quick Refresh & Last Sync Button */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-nyala-500 hover:bg-nyala-600 text-white text-xs font-bold transition-all shadow-md shadow-nyala-500/30 active:scale-95 disabled:opacity-50"
            >
              <ArrowClockwise weight="bold" className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Menyinkronkan..." : "Segarkan Data Portal"}</span>
            </button>

            {lastUpdate && (
              <span className="text-xs font-mono text-navy-300">
                Terakhir disinkronkan: {new Date(lastUpdate).toLocaleTimeString("id-ID")} WITA
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. SPOTLIGHT BREAKING NEWS CARD ── */}
      {spotlightArticle && !searchQuery && activeTab === "all" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkle weight="fill" className="w-5 h-5 text-nyala-500" />
            <h2 className="text-lg font-black text-navy-900 dark:text-white tracking-tight uppercase">
              Sorotan Warta Utama
            </h2>
          </div>

          <div className="group relative rounded-3xl overflow-hidden glass-card border border-navy-200/60 dark:border-navy-800 shadow-xl hover:border-nyala-500/40 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Cover Image */}
              <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden bg-navy-950 min-h-[280px]">
                <img
                  src={spotlightArticle.foto || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"}
                  alt={spotlightArticle.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Copy & CTA */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-extrabold uppercase">
                      Kabar Kampus Resmi
                    </span>
                    <span className="text-xs text-navy-400">
                      {formatDateIndo(spotlightArticle.tgl_upload)}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white leading-snug group-hover:text-nyala-500 transition-colors">
                    {spotlightArticle.judul}
                  </h3>

                  <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 line-clamp-3 leading-relaxed">
                    {cleanHTML(spotlightArticle.isi)}
                  </p>

                  {/* SDGs badges */}
                  {Array.isArray(spotlightArticle.sdgs) && spotlightArticle.sdgs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {spotlightArticle.sdgs.map((sdg) => (
                        <SDGBadge key={sdg.id} sdg={sdg} size="sm" />
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href={`/hub-umkt/${generateSlug(spotlightArticle.judul, spotlightArticle.id)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-nyala-600 to-amber-500 hover:from-nyala-500 hover:to-amber-400 text-white text-xs font-extrabold shadow-lg shadow-nyala-500/25 transition-all active:scale-95 w-full sm:w-auto"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ── 3. SEARCH & CATEGORY SELECTOR ── */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <MagnifyingGlass weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berita riset, pengumuman lomba, agenda IKN, atau nama fakultas..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 text-sm text-navy-900 dark:text-white placeholder:text-navy-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-nyala-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-navy-400 hover:text-navy-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Tab Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label: "Semua Warta", count: beritaList.length + pengumumanList.length + eventList.length, icon: Globe },
            { id: "berita", label: "Berita Kampus", count: beritaList.length, icon: Newspaper },
            { id: "pengumuman", label: "Pengumuman", count: pengumumanList.length, icon: Megaphone },
            { id: "event", label: "Agenda Event", count: eventList.length, icon: CalendarCheck },
            { id: "fakultas", label: "10 Fakultas", count: fakultasList.length, icon: Buildings },
            { id: "unit", label: "Biro & Layanan", count: informasiList.length, icon: Student },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-navy-950 text-white dark:bg-white dark:text-navy-950 shadow-sm"
                    : "bg-navy-50 dark:bg-navy-900 text-navy-600 dark:text-navy-300 hover:text-navy-950 dark:hover:text-white"
                }`}
              >
                <Icon weight={isActive ? "fill" : "bold"} className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className="font-mono text-[10px] opacity-70">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── 4. CONTENT GRID LAYOUT ── */}
      {loading ? (
        <div className="py-20 text-center space-y-4">
          <MascotFlame size="lg" mood="cheering" className="mx-auto animate-bounce" />
          <p className="text-sm font-bold text-navy-700 dark:text-navy-300 font-mono">
            Menghubungkan & memuat berkas API resmi UMKT...
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* A. BERITA SECTION */}
          {(activeTab === "all" || activeTab === "berita") && (
            <div className="space-y-6">
              
              {/* Berita Header & Toolbar */}
              <div className="p-6 rounded-3xl glass-card border border-navy-200/80 dark:border-navy-800 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Newspaper weight="bold" className="w-6 h-6 text-nyala-500" />
                      <h3 className="text-2xl font-black text-navy-950 dark:text-white tracking-tight">
                        Warta Berita Kampus UMKT
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Menampilkan <strong className="text-navy-950 dark:text-white font-bold">{beritaTotalCount}</strong> berita resmi terpublikasi (Halaman {beritaPage} dari {totalPages})
                    </p>
                  </div>

                  {/* Sort Controls & Reset */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-navy-50 dark:bg-navy-900 border border-navy-200 dark:border-navy-700 px-3 py-1.5 rounded-xl text-xs font-bold text-navy-900 dark:text-white">
                      <span className="text-slate-400">Urutkan:</span>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as any)}
                        className="bg-transparent outline-none cursor-pointer font-bold"
                      >
                        <option value="newest">Tanggal Terbaru</option>
                        <option value="oldest">Tanggal Terlama</option>
                        <option value="title_asc">Judul (A - Z)</option>
                        <option value="title_desc">Judul (Z - A)</option>
                      </select>
                    </div>

                    {(selectedCategory !== "all" || selectedLembaga !== "all" || searchQuery.trim()) && (
                      <button
                        onClick={() => {
                          setSelectedCategory("all");
                          setSelectedLembaga("all");
                          setSearchQuery("");
                          setBeritaPage(1);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ArrowClockwise weight="bold" className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Row 1: Kategori Topik */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Topik:
                  </span>
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
                        className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer border ${
                          isCatActive
                            ? "bg-nyala-600 text-white border-nyala-700 shadow-xs"
                            : "bg-white dark:bg-navy-900 text-navy-700 dark:text-slate-300 border-navy-200 dark:border-navy-700 hover:bg-navy-50"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Filter Row 2: Sumber Fakultas / Lembaga */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none pt-1 border-t border-navy-100 dark:border-navy-800">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    Sumber Fakultas:
                  </span>
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
                        className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer border ${
                          isLemActive
                            ? "bg-blue-600 text-white border-blue-700 shadow-xs"
                            : "bg-white dark:bg-navy-900 text-navy-700 dark:text-slate-300 border-navy-200 dark:border-navy-700 hover:bg-navy-50"
                        }`}
                      >
                        {lem.code === "ALL" ? "Universitas (Semua Lembaga)" : `${lem.code} — ${lem.label}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* News Cards Grid */}
              {beritaLoading ? (
                <div className="py-6">
                  <BeritaSkeletonGrid count={6} />
                </div>
              ) : sortedBerita.length === 0 ? (
                <div className="py-16 text-center glass-card rounded-3xl border border-navy-200 dark:border-navy-800 p-8 space-y-3">
                  <p className="text-sm text-slate-400">Tidak ada artikel yang cocok dengan filter atau kata kunci saat ini.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedLembaga("all");
                      setSearchQuery("");
                      setBeritaPage(1);
                    }}
                    className="px-4 py-2 rounded-xl bg-nyala-600 text-white font-bold text-xs hover:bg-nyala-700 transition-colors cursor-pointer"
                  >
                    Tampilkan Semua Berita
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedBerita.map((item) => {
                    const slug = item.slug || generateSlug(item.judul, item.id);
                    const cover = item.thumbnail || item.foto || extractImageFromHTML(item.isi) || "https://media.umkt.ac.id/web/thumbnail/lmbg1001/ra727/d57ad51df8464ec18e2f81a4dcc6b7c2.webp";

                    return (
                      <article
                        key={`berita-${item.id || slug}`}
                        className="group flex flex-col justify-between rounded-3xl overflow-hidden glass-card border border-navy-200/60 dark:border-navy-800 hover:border-nyala-500/50 hover:shadow-xl transition-all"
                      >
                        {/* Image Thumbnail */}
                        <Link href={`/hub-umkt/${slug}`} className="block relative aspect-video overflow-hidden bg-navy-950">
                          <img
                            src={cover}
                            alt={item.judul}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                          <div className="absolute top-3 right-3 flex flex-wrap gap-1">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm bg-black/60 backdrop-blur-sm">
                              {item.kode_lembaga ? item.kode_lembaga.toUpperCase() : "Humas UMKT"}
                            </span>
                          </div>
                        </Link>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-navy-400">
                              <span className="font-semibold text-nyala-600 dark:text-nyala-400 font-mono">
                                {formatDateIndo(item.created || item.tanggal || item.tgl_upload)}
                              </span>
                              <span>Liputan Resmi</span>
                            </div>

                            <Link href={`/hub-umkt/${slug}`}>
                              <h4 className="text-base font-bold text-navy-900 dark:text-white leading-snug group-hover:text-nyala-500 transition-colors line-clamp-2">
                                {item.judul}
                              </h4>
                            </Link>

                            <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2 leading-relaxed">
                              {cleanHTML(item.isi)}
                            </p>

                            {/* SDG Badges placed below summary text */}
                            {Array.isArray(item.sdgs) && item.sdgs.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {item.sdgs.slice(0, 2).map((sdg) => (
                                  <SDGBadge key={sdg.id} sdg={sdg} size="sm" />
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Read CTA */}
                          <div className="pt-2 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
                            <span className="text-[11px] text-navy-400 flex items-center gap-1 font-mono">
                              <Clock weight="bold" className="w-3.5 h-3.5" />
                              <span>Warta Kampus</span>
                            </span>

                            <Link
                              href={`/hub-umkt/${slug}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-nyala-600 dark:text-nyala-400 hover:gap-2 transition-all"
                            >
                              <span>Baca Lengkap</span>
                              <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Desktop Pagination Bar */}
              {totalPages > 1 && (
                <div className="p-4 rounded-3xl glass-card border border-navy-200/80 dark:border-navy-800 flex items-center justify-between shadow-sm">
                  <button
                    disabled={beritaPage <= 1 || beritaLoading}
                    onClick={() => {
                      setBeritaPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    className="px-4 py-2 rounded-xl bg-navy-50 dark:bg-navy-900 disabled:opacity-40 text-navy-900 dark:text-white font-bold text-xs flex items-center gap-1.5 hover:bg-navy-100 dark:hover:bg-navy-800 transition-all cursor-pointer"
                  >
                    <span>← Halaman Sebelumnya</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 font-mono text-xs">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pNum = i + 1;
                      const isCurrent = beritaPage === pNum;
                      return (
                        <button
                          key={pNum}
                          onClick={() => {
                            setBeritaPage(pNum);
                            window.scrollTo({ top: 400, behavior: "smooth" });
                          }}
                          className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                            isCurrent
                              ? "bg-nyala-600 text-white shadow-xs"
                              : "bg-white dark:bg-navy-900 text-navy-700 dark:text-slate-300 border border-navy-200 dark:border-navy-800 hover:bg-navy-50"
                          }`}
                        >
                          {pNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <span className="text-slate-400 px-1">... {totalPages}</span>
                    )}
                  </div>

                  <button
                    disabled={beritaPage >= totalPages || beritaLoading}
                    onClick={() => {
                      setBeritaPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    className="px-4 py-2 rounded-xl bg-nyala-600 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-nyala-700 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Halaman Selanjutnya →</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* B. PENGUMUMAN SECTION */}
          {(activeTab === "all" || activeTab === "pengumuman") && filteredPengumuman.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Megaphone weight="bold" className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-black text-navy-900 dark:text-white tracking-tight">
                  Pengumuman Resmi & Lomba ({filteredPengumuman.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPengumuman.map((item) => {
                  const cover = item.foto || extractImageFromHTML(item.isi) || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80";

                  return (
                    <div
                      key={`pengumuman-${item.id}`}
                      className="rounded-3xl p-5 glass-card border border-navy-200/60 dark:border-navy-800 space-y-4 hover:border-amber-500/50 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {item.foto && (
                          <div className="rounded-2xl overflow-hidden aspect-video bg-navy-950">
                            <img src={cover} alt={item.judul} className="w-full h-full object-cover" />
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-navy-400">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] uppercase">
                            Edaran Resmi
                          </span>
                          <span>{formatDateIndo(item.tgl_upload)}</span>
                        </div>

                        <h4 className="text-base font-bold text-navy-900 dark:text-white line-clamp-2">
                          {item.judul}
                        </h4>

                        <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-3">
                          {cleanHTML(item.isi)}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
                        <span className="text-[11px] text-navy-400 font-mono">
                          ID: #{item.id}
                        </span>

                        <a
                          href={`https://web.umkt.ac.id/pengumuman/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                        >
                          <span>Portal UMKT</span>
                          <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* C. AGENDA & EVENT SECTION */}
          {(activeTab === "all" || activeTab === "event") && filteredEvent.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <CalendarCheck weight="bold" className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-black text-navy-900 dark:text-white tracking-tight">
                  Agenda & Kegiatan Universitas ({filteredEvent.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvent.map((item) => (
                  <div
                    key={`event-${item.id}`}
                    className="rounded-3xl p-5 glass-card border border-navy-200/60 dark:border-navy-800 space-y-4 hover:border-blue-500/50 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold text-[10px] uppercase">
                          Event Kampus
                        </span>
                        <span className="text-navy-400">{item.tgl_event || formatDateIndo(item.tgl_upload)}</span>
                      </div>

                      <h4 className="text-base font-bold text-navy-900 dark:text-white line-clamp-2">
                        {item.judul}
                      </h4>

                      <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-3">
                        {cleanHTML(item.isi)}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
                      <span className="text-[11px] text-navy-400">
                        📍 Kampus UMKT Samarinda
                      </span>

                      <a
                        href={`https://web.umkt.ac.id/event/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Jadwal Lengkap</span>
                        <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* D. 10 FAKULTAS RESMI */}
          {(activeTab === "all" || activeTab === "fakultas") && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Buildings weight="bold" className="w-5 h-5 text-purple-500" />
                  <h3 className="text-xl font-black text-navy-900 dark:text-white tracking-tight">
                    Direktori 10 Fakultas Resmi Universitas Muhammadiyah Kalimantan Timur
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">10 Fakultas • 30+ Program Studi</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {UMKT_10_FAKULTAS.filter((fak) =>
                  fak.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  fak.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  fak.programs.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                ).map((fak) => (
                  <div
                    key={`fakultas-${fak.id}`}
                    className="rounded-3xl glass-card border border-navy-200/60 dark:border-navy-800 hover:border-nyala-500/50 hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    {fak.imageUrl && (
                      <div className="relative w-full h-40 overflow-hidden bg-slate-100 dark:bg-navy-900">
                        <img
                          src={fak.imageUrl}
                          alt={fak.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${fak.badgeBg} ${fak.badgeText} backdrop-blur-sm`}>
                            {fak.code}
                          </span>
                          <span className="text-[11px] font-mono drop-shadow-md">
                            {fak.programs.length} Prodi
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${fak.colorClass} text-white flex items-center justify-center font-black text-sm shadow-md`}>
                            {fak.code}
                          </div>
                          <div>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${fak.badgeBg} ${fak.badgeText}`}>
                              {fak.code}
                            </span>
                            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                              {fak.programs.length} Program Studi
                            </div>
                          </div>
                        </div>

                        <a
                          href={fak.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-500 hover:text-nyala-600 flex items-center justify-center hover:scale-105 transition-all"
                          title={`Kunjungi Website ${fak.code}`}
                        >
                          <ArrowSquareOut weight="bold" className="w-4 h-4" />
                        </a>
                      </div>

                      <h4 className="text-base font-black text-navy-900 dark:text-white leading-tight group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors">
                        {fak.name}
                      </h4>

                      <p className="text-xs text-navy-600 dark:text-navy-300 line-clamp-2 leading-relaxed">
                        {fak.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-navy-50/70 dark:bg-navy-900/80 p-2 rounded-xl border border-navy-100 dark:border-navy-800">
                        <MapPin weight="bold" className="w-3.5 h-3.5 text-nyala-600 flex-shrink-0" />
                        <span className="truncate">{fak.buildingLocation}</span>
                      </div>

                      <div className="space-y-1 pt-1">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Program Studi:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {fak.programs.map((prog, pIdx) => (
                            <span
                              key={pIdx}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-navy-900 text-navy-800 dark:text-slate-200 border border-navy-200/80 dark:border-navy-700"
                            >
                              {prog.name} ({prog.degree})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-navy-100 dark:border-navy-800/80 flex items-center justify-between">
                      <a
                        href={fak.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-nyala-600 dark:text-nyala-400 hover:underline"
                      >
                        <span>Portal Web Fakultas</span>
                        <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          )}

          {/* E. BIRO & UNIT LAYANAN */}
          {(activeTab === "all" || activeTab === "unit") && filteredUnit.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Student weight="bold" className="w-5 h-5 text-emerald-500" />
                <h3 className="text-xl font-black text-navy-900 dark:text-white tracking-tight">
                  Direktori Biro, Lembaga & Unit Kampus ({filteredUnit.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredUnit.map((item) => (
                  <div
                    key={`unit-${item.id}`}
                    className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200/60 dark:border-navy-800 space-y-2 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                        Unit Pendukung
                      </span>
                      <h4 className="text-xs font-bold text-navy-900 dark:text-white mt-1.5">
                        {item.nama}
                      </h4>
                    </div>

                    {item.link && (
                      <a
                        href={item.link.startsWith("http") ? item.link : `https://${item.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2"
                      >
                        <span>Kunjungi Web</span>
                        <ArrowSquareOut weight="bold" className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
