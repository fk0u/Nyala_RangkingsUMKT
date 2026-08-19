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
  Student
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
import { useToast } from "@/context/ToastContext";
import MascotFlame from "@/components/MascotFlame";

export default function HubUMKTPage() {
  const [activeTab, setActiveTab] = useState<"all" | "berita" | "pengumuman" | "event" | "fakultas" | "unit">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSDG, setSelectedSDG] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const toast = useToast();

  // Data Stores
  const [beritaList, setBeritaList] = useState<UMKTBerita[]>([]);
  const [pengumumanList, setPengumumanList] = useState<UMKTPengumuman[]>([]);
  const [eventList, setEventList] = useState<UMKTEvent[]>([]);
  const [fakultasList, setFakultasList] = useState<UMKTFakultas[]>([]);
  const [informasiList, setInformasiList] = useState<UMKTInformasi[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/umkt-portal?type=all-hub");
      const data = await res.json();
      const payload = data.data || data.hub || {};

      if (payload) {
        setBeritaList(payload.berita || []);
        setPengumumanList(payload.pengumuman || []);
        setEventList(payload.event || []);
        setFakultasList(payload.fakultas || []);
        setInformasiList(payload.informasi || []);
        setLastUpdate(payload.lastUpdate?.[0]?.tanggal_formatted || new Date().toISOString());
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

  // Filter Berita
  const filteredBerita = beritaList.filter((b) => {
    const matchesSearch =
      b.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isi.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSDG =
      selectedSDG === "all" ||
      (Array.isArray(b.sdgs) && b.sdgs.some((s) => s.sdgs.toLowerCase().includes(selectedSDG.toLowerCase())));

    return matchesSearch && matchesSDG;
  });

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

  // Filter Fakultas
  const filteredFakultas = fakultasList.filter((f) => {
    const name = (f.nama || f.nama_lembaga || "").toLowerCase();
    const shortName = (f.singkatan || f.kode_lembaga || "").toLowerCase();
    return name.includes(searchQuery.toLowerCase()) || shortName.includes(searchQuery.toLowerCase());
  });

  // Filter Unit
  const filteredUnit = informasiList.filter((u) => {
    const name = (u.nama || u.nama_lembaga || "").toLowerCase();
    const desc = (u.keterangan || u.deskripsi || "").toLowerCase();
    return name.includes(searchQuery.toLowerCase()) || desc.includes(searchQuery.toLowerCase());
  });

  const spotlightArticle = beritaList[0];

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
                        <span
                          key={sdg.id}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                          style={{ backgroundColor: sdg.color || "#FF5A1F" }}
                        >
                          {sdg.sdgs}
                        </span>
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
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
          {[
            { id: "all", label: "Semua Warta", count: beritaList.length + pengumumanList.length + eventList.length, icon: Globe },
            { id: "berita", label: "Berita Kampus", count: beritaList.length, icon: Newspaper },
            { id: "pengumuman", label: "Pengumuman Resmi", count: pengumumanList.length, icon: Megaphone },
            { id: "event", label: "Agenda & Event", count: eventList.length, icon: CalendarCheck },
            { id: "fakultas", label: "10 Fakultas Resmi", count: fakultasList.length, icon: Buildings },
            { id: "unit", label: "Biro & Layanan", count: informasiList.length, icon: Student },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all active:scale-95 ${
                  isActive
                    ? "bg-nyala-500 text-white shadow-md shadow-nyala-500/25"
                    : "bg-navy-100 dark:bg-navy-800/80 text-navy-600 dark:text-navy-300 hover:bg-navy-200"
                }`}
              >
                <Icon weight={isActive ? "fill" : "bold"} className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? "bg-white/20 text-white" : "bg-navy-200 dark:bg-navy-700 text-navy-600 dark:text-navy-400"
                }`}>
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
          {(activeTab === "all" || activeTab === "berita") && filteredBerita.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Newspaper weight="bold" className="w-5 h-5 text-nyala-500" />
                  <h3 className="text-xl font-black text-navy-900 dark:text-white tracking-tight">
                    Warta Berita Kampus ({filteredBerita.length})
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBerita.map((item) => {
                  const slug = generateSlug(item.judul, item.id);
                  const cover = item.foto || extractImageFromHTML(item.isi) || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80";

                  return (
                    <article
                      key={`berita-${item.id}`}
                      className="group flex flex-col justify-between rounded-3xl overflow-hidden glass-card border border-navy-200/60 dark:border-navy-800 hover:border-nyala-500/50 hover:shadow-xl transition-all"
                    >
                      {/* Image Thumbnail */}
                      <Link href={`/hub-umkt/${slug}`} className="block relative aspect-video overflow-hidden bg-navy-950">
                        <img
                          src={cover}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          {Array.isArray(item.sdgs) && item.sdgs.slice(0, 1).map((s) => (
                            <span
                              key={s.id}
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                              style={{ backgroundColor: s.color || "#FF5A1F" }}
                            >
                              {s.sdgs}
                            </span>
                          ))}
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-navy-400">
                            <span className="font-semibold text-nyala-600 dark:text-nyala-400">
                              {item.tags || "Warta Kampus"}
                            </span>
                            <span>{formatDateIndo(item.tgl_upload)}</span>
                          </div>

                          <Link href={`/hub-umkt/${slug}`}>
                            <h4 className="text-base font-bold text-navy-900 dark:text-white leading-snug group-hover:text-nyala-500 transition-colors line-clamp-2">
                              {item.judul}
                            </h4>
                          </Link>

                          <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2 leading-relaxed">
                            {cleanHTML(item.isi)}
                          </p>
                        </div>

                        {/* Read CTA */}
                        <div className="pt-2 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
                          <span className="text-[11px] text-navy-400 flex items-center gap-1">
                            <Clock weight="bold" className="w-3.5 h-3.5" />
                            <span>3 menit baca</span>
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
          {(activeTab === "all" || activeTab === "fakultas") && filteredFakultas.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Buildings weight="bold" className="w-5 h-5 text-purple-500" />
                <h3 className="text-xl font-black text-navy-900 dark:text-white tracking-tight">
                  10 Fakultas Resmi Universitas Muhammadiyah Kalimantan Timur
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredFakultas.map((item) => (
                  <div
                    key={`fakultas-${item.id}`}
                    className="p-5 rounded-3xl glass-card border border-navy-200/60 dark:border-navy-800 hover:border-purple-500/50 hover:shadow-lg transition-all flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                      <Buildings weight="bold" className="w-6 h-6" />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-400 font-bold">
                          {item.singkatan || `FAK #${item.id}`}
                        </span>
                        {item.link && (
                          <a
                            href={item.link.startsWith("http") ? item.link : `https://${item.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-navy-400 hover:text-purple-500"
                          >
                            <ArrowSquareOut weight="bold" className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-navy-900 dark:text-white leading-snug">
                        {item.nama}
                      </h4>

                      {item.keterangan && (
                        <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2">
                          {item.keterangan}
                        </p>
                      )}
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
