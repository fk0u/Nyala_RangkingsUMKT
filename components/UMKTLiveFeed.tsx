"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  Calendar,
  Megaphone,
  Buildings,
  ArrowSquareOut,
  ArrowsClockwise,
  MagnifyingGlass,
  Clock,
  User,
  Sparkle,
  CheckCircle,
  Tag,
  ShareNetwork,
  X,
  CaretRight
} from "@phosphor-icons/react";
import { 
  UMKTBeritaItem, 
  UMKTEventItem, 
  UMKTPengumumanItem, 
  UMKTFakultasItem, 
  UMKTInformasiItem,
  formatIndonesianDate, 
  stripHtml 
} from "@/lib/umkt-api";
import MascotFlame from "./MascotFlame";

type FeedTab = "berita" | "pengumuman" | "event" | "fakultas" | "unit";

export default function UMKTLiveFeed() {
  const [activeTab, setActiveTab] = useState<FeedTab>("berita");
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Data States
  const [beritaList, setBeritaList] = useState<UMKTBeritaItem[]>([]);
  const [eventList, setEventList] = useState<UMKTEventItem[]>([]);
  const [pengumumanList, setPengumumanList] = useState<UMKTPengumumanItem[]>([]);
  const [fakultasList, setFakultasList] = useState<UMKTFakultasItem[]>([]);
  const [unitList, setUnitList] = useState<UMKTInformasiItem[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Active Detail Modal
  const [selectedItem, setSelectedItem] = useState<{
    type: "berita" | "event" | "pengumuman" | "fakultas" | "unit";
    data: any;
  } | null>(null);

  const fetchAllData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/umkt-portal?type=all-hub");
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setBeritaList(json.data.berita || []);
          setEventList(json.data.event || []);
          setPengumumanList(json.data.pengumuman || []);
          setFakultasList(json.data.fakultas || []);
          if (json.data.lastUpdate && json.data.lastUpdate[0]) {
            setLastUpdate(json.data.lastUpdate[0].tanggal_formatted || "");
          }
        }
      }

      // Also fetch unit/lembaga
      const resUnit = await fetch("/api/umkt-portal?type=informasi");
      if (resUnit.ok) {
        const jsonUnit = await resUnit.json();
        setUnitList(jsonUnit.data?.results || jsonUnit.data || []);
      }
    } catch (err) {
      console.error("Error fetching live feeds:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* ── Header & Status Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-white/70 dark:bg-navy-900/80 border border-navy-200/60 dark:border-navy-800 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Live Data REST API web.umkt.ac.id
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                Aktif & Terverifikasi
              </span>
            </div>
            <p className="text-xs text-navy-600 dark:text-navy-400">
              {lastUpdate ? `Update Terakhir: ${lastUpdate}` : "Sinkronisasi otomatis berita, event, pengumuman, dan data 10 fakultas resmi UMKT."}
            </p>
          </div>
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchAllData}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 dark:hover:bg-navy-700 text-navy-700 dark:text-navy-300 text-xs font-bold transition-all self-start md:self-auto disabled:opacity-50"
        >
          <ArrowsClockwise weight="bold" className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-nyala-500" : ""}`} />
          <span>{refreshing ? "Menyinkronkan..." : "Segarkan Data"}</span>
        </button>
      </div>

      {/* ── Navigation Tabs & Search ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-navy-200/60 dark:border-navy-800 pb-4">
        
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("berita")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "berita"
                ? "bg-nyala-500 text-white shadow-md shadow-nyala-500/20"
                : "bg-navy-100/70 dark:bg-navy-900/70 text-navy-600 dark:text-navy-400 hover:bg-navy-200 dark:hover:bg-navy-800"
            }`}
          >
            <Newspaper weight="bold" className="w-4 h-4" />
            <span>Berita Kampus</span>
            <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-mono">
              {beritaList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("pengumuman")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "pengumuman"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-navy-100/70 dark:bg-navy-900/70 text-navy-600 dark:text-navy-400 hover:bg-navy-200 dark:hover:bg-navy-800"
            }`}
          >
            <Megaphone weight="bold" className="w-4 h-4" />
            <span>Pengumuman Resmi</span>
            <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-mono">
              {pengumumanList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("event")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "event"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                : "bg-navy-100/70 dark:bg-navy-900/70 text-navy-600 dark:text-navy-400 hover:bg-navy-200 dark:hover:bg-navy-800"
            }`}
          >
            <Calendar weight="bold" className="w-4 h-4" />
            <span>Agenda & Event</span>
            <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-mono">
              {eventList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("fakultas")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "fakultas"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-navy-100/70 dark:bg-navy-900/70 text-navy-600 dark:text-navy-400 hover:bg-navy-200 dark:hover:bg-navy-800"
            }`}
          >
            <Buildings weight="bold" className="w-4 h-4" />
            <span>10 Fakultas</span>
            <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-mono">
              {fakultasList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("unit")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "unit"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                : "bg-navy-100/70 dark:bg-navy-900/70 text-navy-600 dark:text-navy-400 hover:bg-navy-200 dark:hover:bg-navy-800"
            }`}
          >
            <Sparkle weight="bold" className="w-4 h-4" />
            <span>Biro & Unit Layanan</span>
            <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-mono">
              {unitList.length}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <MagnifyingGlass weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berita, event, atau prodi..."
            className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 text-xs text-navy-900 dark:text-white placeholder:text-navy-400 focus:outline-none focus:border-nyala-500 transition-colors shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 dark:hover:text-navy-200"
            >
              <X weight="bold" className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Content Grids by Tab ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="rounded-3xl p-6 bg-navy-100/50 dark:bg-navy-900/50 animate-pulse space-y-4 h-72 border border-navy-200/50 dark:border-navy-800" />
          ))}
        </div>
      ) : (
        <div>
          {/* 1. TAB: BERITA */}
          {activeTab === "berita" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beritaList
                .filter((b) => 
                  !searchQuery || 
                  b.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  stripHtml(b.isi).toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item, idx) => (
                  <motion.div
                    key={item.slug || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="glass-card rounded-3xl overflow-hidden border border-navy-200/70 dark:border-navy-800 flex flex-col hover:border-nyala-500/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => setSelectedItem({ type: "berita", data: item })}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-navy-100 dark:bg-navy-950">
                      <img
                        src={item.thumbnail || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-white text-[10px] font-extrabold shadow-sm flex items-center gap-1">
                          <Newspaper weight="bold" className="w-3 h-3 text-nyala-400" />
                          <span>Berita Resmi</span>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-navy-500 dark:text-navy-400">
                        <span className="flex items-center gap-1">
                          <Clock weight="bold" className="w-3 h-3 text-nyala-500" />
                          {formatIndonesianDate(item.tanggal)}
                        </span>
                        <span className="font-mono">{item.created || "Humas UMKT"}</span>
                      </div>

                      <h3 className="text-base font-bold text-navy-900 dark:text-white group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors line-clamp-2 leading-snug">
                        {item.judul}
                      </h3>

                      <p className="text-xs text-navy-600 dark:text-navy-400 line-clamp-3 leading-relaxed flex-1">
                        {stripHtml(item.isi)}
                      </p>

                      {/* SDGs Tags */}
                      {item.sdgs && item.sdgs.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.sdgs.slice(0, 2).map((sdg) => (
                            <span 
                              key={sdg.id} 
                              className="text-[9px] px-2 py-0.5 rounded-md font-bold text-white shadow-xs truncate max-w-[150px]"
                              style={{ backgroundColor: sdg.color || "#FF5A1F" }}
                            >
                              {sdg.sdgs}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-3 border-t border-navy-100 dark:border-navy-800/80 flex items-center justify-between text-xs font-bold text-nyala-600 dark:text-nyala-400">
                        <span>Baca Selengkapnya</span>
                        <CaretRight weight="bold" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}

          {/* 2. TAB: PENGUMUMAN */}
          {activeTab === "pengumuman" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pengumumanList
                .filter((p) => 
                  !searchQuery || 
                  p.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  stripHtml(p.isi).toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item, idx) => (
                  <motion.div
                    key={item.slug || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="glass-card rounded-3xl p-6 border border-navy-200/70 dark:border-navy-800 flex flex-col sm:flex-row gap-5 hover:border-blue-500/50 hover:shadow-xl transition-all group cursor-pointer"
                    onClick={() => setSelectedItem({ type: "pengumuman", data: item })}
                  >
                    {/* Thumbnail Flyer */}
                    {item.thumbnail && (
                      <div className="w-full sm:w-36 h-40 rounded-2xl overflow-hidden bg-navy-100 dark:bg-navy-950 flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}

                    <div className="flex flex-col justify-between flex-1 space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase">
                            Pengumuman
                          </span>
                          <span className="text-[11px] text-navy-400 font-mono">
                            {formatIndonesianDate(item.tanggal)}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-navy-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                          {item.judul}
                        </h3>

                        <p className="text-xs text-navy-600 dark:text-navy-400 line-clamp-3 leading-relaxed">
                          {stripHtml(item.isi)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 pt-2 border-t border-navy-100 dark:border-navy-800">
                        <span>Lihat Rincian Pengumuman</span>
                        <CaretRight weight="bold" className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}

          {/* 3. TAB: EVENT */}
          {activeTab === "event" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventList
                .filter((e) => 
                  !searchQuery || 
                  e.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  stripHtml(e.isi).toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item, idx) => (
                  <motion.div
                    key={item.slug || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="glass-card rounded-3xl overflow-hidden border border-navy-200/70 dark:border-navy-800 flex flex-col hover:border-purple-500/50 hover:shadow-xl transition-all group cursor-pointer"
                    onClick={() => setSelectedItem({ type: "event", data: item })}
                  >
                    {item.thumbnail && (
                      <div className="h-44 w-full overflow-hidden bg-navy-100 dark:bg-navy-950">
                        <img
                          src={item.thumbnail}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-3 flex flex-col flex-1 justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-extrabold uppercase">
                            Agenda Kampus
                          </span>
                          <span className="text-[11px] text-navy-400 font-mono">
                            {formatIndonesianDate(item.tanggal)}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-navy-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                          {item.judul}
                        </h3>

                        <p className="text-xs text-navy-600 dark:text-navy-400 line-clamp-3 leading-relaxed">
                          {stripHtml(item.isi)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400 pt-3 border-t border-navy-100 dark:border-navy-800">
                        <span>Lihat Detail Agenda</span>
                        <CaretRight weight="bold" className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}

          {/* 4. TAB: FAKULTAS */}
          {activeTab === "fakultas" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fakultasList
                .filter((f) => !searchQuery || (f.nama_lembaga || f.nama || "").toLowerCase().includes(searchQuery.toLowerCase()))
                .map((f, idx) => (
                  <motion.div
                    key={f.kode_lembaga || idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    className="glass-card rounded-3xl p-6 border border-navy-200/70 dark:border-navy-800 space-y-4 hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {f.logo ? (
                          <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-navy-200 shadow-sm flex items-center justify-center flex-shrink-0">
                            <img src={f.logo} alt={f.nama_lembaga || f.nama || "Fakultas"} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                            <Buildings weight="bold" className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                            {f.jenis || "Fakultas"}
                          </span>
                          <h4 className="text-sm font-bold text-navy-900 dark:text-white leading-snug">
                            {f.nama_lembaga || f.nama}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-navy-600 dark:text-navy-400 line-clamp-3 leading-relaxed">
                        {f.deskripsi || f.keterangan || "Fakultas resmi di Universitas Muhammadiyah Kalimantan Timur."}
                      </p>
                    </div>

                    <a
                      href={f.url || f.link || "https://web.umkt.ac.id"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-3 border-t border-navy-100 dark:border-navy-800 hover:underline"
                    >
                      <span>Kunjungi Website Fakultas</span>
                      <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                ))}
            </div>
          )}

          {/* 5. TAB: UNIT / LEMBAGA */}
          {activeTab === "unit" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {unitList
                .filter((u) => !searchQuery || (u.nama_lembaga || u.nama || "").toLowerCase().includes(searchQuery.toLowerCase()))
                .map((u, idx) => (
                  <motion.div
                    key={u.kode_lembaga || idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="glass-card rounded-3xl p-5 border border-navy-200/70 dark:border-navy-800 space-y-3 hover:border-amber-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        {u.logo ? (
                          <div className="w-10 h-10 rounded-xl bg-white p-1 border border-navy-200 shadow-sm flex items-center justify-center flex-shrink-0">
                            <img src={u.logo} alt={u.nama_lembaga} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">
                            <Sparkle weight="bold" className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                            {u.jenis || "Lembaga / Prodi"}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-navy-900 dark:text-white leading-snug">
                            {u.nama_lembaga}
                          </h4>
                        </div>
                      </div>

                      <p className="text-[11px] text-navy-600 dark:text-navy-400 line-clamp-2 leading-relaxed">
                        {u.deskripsi || "Unit resmi pendukung akademik dan kemahasiswaan UMKT."}
                      </p>
                    </div>

                    <a
                      href={u.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 pt-2 border-t border-navy-100 dark:border-navy-800 hover:underline"
                    >
                      <span>Buka Laman Resmi</span>
                      <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                ))}
            </div>
          )}

        </div>
      )}

      {/* ── DETAIL MODAL DRAWER ── */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card bg-white dark:bg-navy-900 rounded-3xl max-w-3xl w-full max-h-[88vh] overflow-y-auto border border-navy-200 dark:border-navy-800 shadow-2xl p-6 sm:p-8 space-y-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300 hover:bg-navy-200 dark:hover:bg-navy-700 transition-colors"
              >
                <X weight="bold" className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-3 pr-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-black uppercase tracking-wider">
                    {selectedItem.type.toUpperCase()} RESMI UMKT
                  </span>
                  {selectedItem.data.tanggal && (
                    <span className="text-xs text-navy-500 dark:text-navy-400 font-mono">
                      {formatIndonesianDate(selectedItem.data.tanggal)}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white leading-snug">
                  {selectedItem.data.judul || selectedItem.data.nama_lembaga}
                </h2>
              </div>

              {/* Cover Image in Modal */}
              {selectedItem.data.thumbnail && (
                <div className="rounded-2xl overflow-hidden border border-navy-200 dark:border-navy-800 max-h-80 w-full bg-navy-950">
                  <img
                    src={selectedItem.data.thumbnail}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article / Announcement HTML Content */}
              {selectedItem.data.isi && (
                <div 
                  className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-navy-800 dark:text-navy-200 leading-relaxed space-y-4 border-t border-navy-100 dark:border-navy-800 pt-4"
                  dangerouslySetInnerHTML={{ __html: selectedItem.data.isi }}
                />
              )}

              {/* Direct Link Action */}
              <div className="pt-4 border-t border-navy-100 dark:border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-navy-500">
                  Sumber Resmi: <span className="font-mono">web.umkt.ac.id/api/</span>
                </div>

                {selectedItem.data.url && (
                  <a
                    href={selectedItem.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-nyala-600 hover:bg-nyala-700 text-white font-bold text-xs shadow-md transition-all w-full sm:w-auto justify-center"
                  >
                    <span>Buka Dokumen Asli di Laman UMKT</span>
                    <ArrowSquareOut weight="bold" className="w-4 h-4" />
                  </a>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
