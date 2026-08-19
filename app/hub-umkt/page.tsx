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
  ArrowUpRight, 
  MagnifyingGlass, 
  ArrowClockwise, 
  Sparkle, 
  BookOpenText, 
  Laptop, 
  Headset, 
  ShieldCheck,
  CheckCircle,
  Clock,
  Tag,
  ShareNetwork,
  X
} from "@phosphor-icons/react";
import { OFFICIAL_LINKS } from "@/lib/masta-data";
import { 
  UMKTBeritaItem, 
  UMKTEventItem, 
  UMKTPengumumanItem, 
  UMKTFakultasItem, 
  UMKTInformasiItem 
} from "@/lib/umkt-api";
import { useToast } from "@/context/ToastContext";
import BacklinkBanner from "@/components/BacklinkBanner";

const CAMPUS_SYSTEMS = [
  {
    name: "SIKAD UMKT",
    desc: "Sistem Informasi Akademik terpadu untuk pengisian KRS, jadwal kuliah, presensi, dan rekap KHS.",
    url: "https://mahasiswa.umkt.ac.id/",
    badge: "Akademik",
  },
  {
    name: "Odoo MASTA 2026",
    desc: "Portal resmi orientasi dan registrasi kegiatan Masa Ta'aruf Mahasiswa Baru UMKT 2026.",
    url: "https://masta-maba.odoo.com/",
    badge: "MASTA Resmi",
  },
  {
    name: "PMB UMKT",
    desc: "Portal Penerimaan Mahasiswa Baru, registrasi ulang NIM, dan verifikasi berkas.",
    url: "https://pmb.umkt.ac.id/",
    badge: "PMB",
  },
  {
    name: "Biro Kemahasiswaan (BIMA)",
    desc: "Layanan pembinaan kemahasiswaan, beasiswa, ormawa, dan layanan karir alumni.",
    url: "https://kemahasiswaan.umkt.ac.id/",
    badge: "Kemahasiswaan",
  },
  {
    name: "Perpustakaan UMKT",
    desc: "Akses e-library, repositori tugas akhir, jurnal internasional, dan peminjaman buku.",
    url: "https://library.umkt.ac.id/",
    badge: "E-Library",
  },
  {
    name: "Prodi Teknologi Informasi",
    desc: "Laman resmi Program Studi Teknologi Informasi Fakultas Sains dan Teknologi UMKT.",
    url: "https://ti.umkt.ac.id/",
    badge: "Prodi TI",
  },
];

type HubTab = "berita" | "pengumuman" | "event" | "fakultas" | "sistem";

export default function HubUMKTPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<HubTab>("berita");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Data states
  const [beritaList, setBeritaList] = useState<UMKTBeritaItem[]>([]);
  const [pengumumanList, setPengumumanList] = useState<UMKTPengumumanItem[]>([]);
  const [eventList, setEventList] = useState<UMKTEventItem[]>([]);
  const [fakultasList, setFakultasList] = useState<UMKTFakultasItem[]>([]);
  const [unitList, setUnitList] = useState<UMKTInformasiItem[]>([]);

  // Reader Modal State
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    date: string;
    category: string;
    coverImage?: string;
    content: string;
    author?: string;
    tags?: string[];
    officialUrl?: string;
  } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/umkt-portal?type=all-hub");
      const data = await res.json();

      if (data.success) {
        setBeritaList(data.berita?.results || []);
        setPengumumanList(data.pengumuman?.results || []);
        setEventList(data.event?.results || []);
        setFakultasList(data.fakultas?.results || []);
        setUnitList(data.informasi?.results || []);
        if (data.lastUpdate?.last_update) {
          setLastUpdate(data.lastUpdate.last_update);
        }
      }
    } catch (err) {
      console.error("Error fetching UMKT Portal data:", err);
      toast.error("Gagal terhubung ke API portal UMKT.", "Koneksi Bermasalah");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered queries
  const filteredBerita = beritaList.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredPengumuman = pengumumanList.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredEvent = eventList.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* ── Editorial Header ── */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-black uppercase tracking-wider border border-nyala-500/20">
            <Globe weight="bold" className="w-4 h-4" />
            <span>Portal Resmi & Direktori Terpadu UMKT</span>
          </div>

          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Live API: web.umkt.ac.id</span>
            {lastUpdate && <span className="text-[10px] opacity-75">• {lastUpdate}</span>}
          </div>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
            Hub Informasi & <br />
            <span className="fire-text-gradient">Ekosistem Kampus UMKT</span>
          </h1>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400 leading-relaxed">
            Akses langsung ke seluruh kanal informasi resmi Universitas Muhammadiyah Kalimantan Timur. Terhubung dengan 2.100+ artikel berita, rilis pengumuman, agenda universitas, 10 fakultas resmi, dan sistem layanan terpadu.
          </p>
        </div>
      </div>

      {/* ── Backlink Banner to Official UMKT ── */}
      <BacklinkBanner />

      {/* ── Search & Navigation Tabs ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-navy-100/70 dark:bg-navy-900/70 rounded-2xl overflow-x-auto no-scrollbar border border-navy-200/50 dark:border-navy-800">
          <button
            onClick={() => setActiveTab("berita")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "berita"
                ? "bg-white dark:bg-navy-800 text-nyala-600 dark:text-nyala-400 shadow-sm"
                : "text-navy-600 dark:text-navy-400 hover:text-navy-900"
            }`}
          >
            <Newspaper weight="bold" className="w-4 h-4" />
            <span>Berita Kampus ({beritaList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("pengumuman")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "pengumuman"
                ? "bg-white dark:bg-navy-800 text-nyala-600 dark:text-nyala-400 shadow-sm"
                : "text-navy-600 dark:text-navy-400 hover:text-navy-900"
            }`}
          >
            <Megaphone weight="bold" className="w-4 h-4" />
            <span>Pengumuman ({pengumumanList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("event")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "event"
                ? "bg-white dark:bg-navy-800 text-nyala-600 dark:text-nyala-400 shadow-sm"
                : "text-navy-600 dark:text-navy-400 hover:text-navy-900"
            }`}
          >
            <CalendarCheck weight="bold" className="w-4 h-4" />
            <span>Agenda & Event ({eventList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("fakultas")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "fakultas"
                ? "bg-white dark:bg-navy-800 text-nyala-600 dark:text-nyala-400 shadow-sm"
                : "text-navy-600 dark:text-navy-400 hover:text-navy-900"
            }`}
          >
            <Buildings weight="bold" className="w-4 h-4" />
            <span>10 Fakultas Resmi</span>
          </button>

          <button
            onClick={() => setActiveTab("sistem")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "sistem"
                ? "bg-white dark:bg-navy-800 text-nyala-600 dark:text-nyala-400 shadow-sm"
                : "text-navy-600 dark:text-navy-400 hover:text-navy-900"
            }`}
          >
            <Laptop weight="bold" className="w-4 h-4" />
            <span>Portal Layanan</span>
          </button>
        </div>

        {/* Search Bar & Refresh */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari rilis / info..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200/60 dark:border-navy-800 text-xs focus:ring-2 focus:ring-nyala-500 outline-none text-navy-900 dark:text-white"
            />
          </div>

          <button
            onClick={fetchData}
            title="Segarkan Data"
            className="p-2.5 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200/60 dark:border-navy-800 hover:border-nyala-500 text-navy-600 dark:text-navy-300 transition-all active:scale-95 shadow-sm"
          >
            <ArrowClockwise weight="bold" className={`w-4 h-4 ${loading ? "animate-spin text-nyala-500" : ""}`} />
          </button>
        </div>

      </div>

      {/* ── Content Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 rounded-3xl bg-navy-100/50 dark:bg-navy-900/50 animate-pulse border border-navy-200/40 dark:border-navy-800" />
          ))}
        </div>
      ) : (
        <>
          {/* 1. TAB: BERITA KAMPUS */}
          {activeTab === "berita" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBerita.map((item, idx) => (
                <div
                  key={item.slug || idx}
                  onClick={() =>
                    setSelectedArticle({
                      title: item.judul,
                      date: item.tanggal,
                      category: "Warta Kampus",
                      coverImage: item.thumbnail || undefined,
                      content: item.isi,
                      author: "Humas UMKT",
                      tags: item.tags ? (typeof item.tags === "string" ? JSON.parse(item.tags) : item.tags) : undefined,
                      officialUrl: `https://web.umkt.ac.id/berita/${item.slug}`,
                    })
                  }
                  className="glass-card rounded-3xl border border-navy-200/60 dark:border-navy-800 overflow-hidden space-y-4 hover:border-nyala-500/50 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-3">
                    {/* Cover Thumbnail */}
                    <div className="relative h-48 w-full bg-navy-900 overflow-hidden">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-nyala-600 to-amber-500 text-white font-black text-xl">
                          Warta UMKT
                        </div>
                      )}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-[10px] font-bold text-nyala-400 border border-white/10">
                        {item.tanggal}
                      </div>
                    </div>

                    <div className="px-5 space-y-2">
                      <h3 className="text-base font-extrabold text-navy-900 dark:text-white line-clamp-2 group-hover:text-nyala-500 transition-colors">
                        {item.judul}
                      </h3>
                      <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2">
                        {item.isi?.replace(/<[^>]*>?/gm, "").slice(0, 110) + "..."}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-nyala-600 dark:text-nyala-400 border-t border-navy-100 dark:border-navy-800/60">
                    <span>Baca Artikel Lengkap</span>
                    <ArrowUpRight weight="bold" className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. TAB: PENGUMUMAN */}
          {activeTab === "pengumuman" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPengumuman.map((item, idx) => (
                <div
                  key={item.slug || idx}
                  onClick={() =>
                    setSelectedArticle({
                      title: item.judul,
                      date: item.tanggal,
                      category: "Pengumuman Resmi",
                      coverImage: item.thumbnail || undefined,
                      content: item.isi,
                      officialUrl: `https://web.umkt.ac.id/pengumuman/${item.slug}`,
                    })
                  }
                  className="glass-card p-6 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 hover:border-nyala-500/50 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase">
                        Edaran Resmi
                      </span>
                      <span className="text-[10px] text-navy-400 font-mono">
                        {item.tanggal}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-navy-900 dark:text-white line-clamp-3 group-hover:text-nyala-500 transition-colors">
                      {item.judul}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 pt-3 border-t border-navy-100 dark:border-navy-800">
                    <span>Buka Flyer & Naskah</span>
                    <ArrowUpRight weight="bold" className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. TAB: EVENT */}
          {activeTab === "event" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvent.map((item, idx) => (
                <div
                  key={item.slug || idx}
                  onClick={() =>
                    setSelectedArticle({
                      title: item.judul,
                      date: item.tanggal,
                      category: "Agenda & Kegiatan",
                      coverImage: item.thumbnail || undefined,
                      content: item.isi,
                      officialUrl: `https://web.umkt.ac.id/event/${item.slug}`,
                    })
                  }
                  className="glass-card p-6 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 hover:border-nyala-500/50 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase">
                        Agenda Kampus
                      </span>
                      <span className="text-[10px] text-navy-400 font-mono">
                        {item.tanggal}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-navy-900 dark:text-white line-clamp-3 group-hover:text-cyan-500 transition-colors">
                      {item.judul}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400 pt-3 border-t border-navy-100 dark:border-navy-800">
                    <span>Rincian Agenda</span>
                    <ArrowUpRight weight="bold" className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. TAB: 10 FAKULTAS RESMI */}
          {activeTab === "fakultas" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fakultasList.map((fak, idx) => (
                <div
                  key={fak.kode_lembaga || idx}
                  className="glass-card p-6 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {fak.logo ? (
                        <img src={fak.logo} alt={fak.nama_lembaga} className="w-10 h-10 object-contain rounded-xl" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-nyala-500/10 text-nyala-600 flex items-center justify-center font-bold">
                          🏛️
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] font-black text-nyala-500 uppercase tracking-wider">
                          Fakultas Resmi UMKT
                        </span>
                        <h3 className="text-base font-extrabold text-navy-900 dark:text-white leading-tight">
                          {fak.nama_lembaga}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {fak.url && (
                    <a
                      href={fak.url.startsWith("http") ? fak.url : `https://${fak.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-nyala-500 hover:text-white text-xs font-bold text-navy-800 dark:text-navy-200 transition-all"
                    >
                      <span>Kunjungi Website Fakultas</span>
                      <ArrowUpRight weight="bold" className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 5. TAB: PORTAL LAYANAN & SISTEM TERPADU */}
          {activeTab === "sistem" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAMPUS_SYSTEMS.map((sys) => (
                <div
                  key={sys.name}
                  className="glass-card p-6 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 flex items-center justify-center font-black">
                        <Laptop weight="bold" className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black">
                        {sys.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-navy-900 dark:text-white">
                        {sys.name}
                      </h3>
                      <p className="text-xs text-navy-500 dark:text-navy-400 mt-1 leading-relaxed">
                        {sys.desc}
                      </p>
                    </div>
                  </div>

                  <a
                    href={sys.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-nyala-500 to-amber-500 hover:from-nyala-600 hover:to-amber-600 text-white text-xs font-bold shadow-md transition-all active:scale-95"
                  >
                    <span>Buka Portal Resmi</span>
                    <ArrowUpRight weight="bold" className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Article Reader Modal Drawer ── */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-navy-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-navy-200 dark:border-navy-800 shadow-2xl space-y-6 p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300 hover:scale-110 active:scale-95 transition-all"
              >
                <X weight="bold" className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-navy-400 font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 font-bold">
                    {selectedArticle.category}
                  </span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>

              {selectedArticle.coverImage && (
                <div className="rounded-2xl overflow-hidden max-h-80 w-full bg-navy-950">
                  <img
                    src={selectedArticle.coverImage}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* HTML Content Body */}
              <div
                className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-navy-700 dark:text-navy-300 leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Action Buttons */}
              <div className="pt-4 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
                {selectedArticle.officialUrl && (
                  <a
                    href={selectedArticle.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-nyala-600 dark:text-nyala-400 hover:underline"
                  >
                    <span>Buka di Laman Resmi UMKT</span>
                    <ArrowUpRight weight="bold" className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 text-xs font-bold"
                >
                  Tutup
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
