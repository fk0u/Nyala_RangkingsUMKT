"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  ShieldCheck, 
  VideoCamera, 
  Sparkle, 
  Trophy, 
  CalendarCheck, 
  CheckCircle, 
  WarningOctagon,
  Clock,
  MapPin,
  TShirt,
  Scissors,
  Prohibit,
  Users,
  Building,
  GraduationCap,
  Calendar,
  CaretRight,
  Stamp,
  MegaphoneSimple
} from "@phosphor-icons/react";
import CountdownTimer from "@/components/CountdownTimer";
import BacklinkBanner from "@/components/BacklinkBanner";
import MascotFlame from "@/components/MascotFlame";
import { 
  MASTA_STAGES, 
  OFFICIAL_MASTA_SCHEDULE_2026, 
  MASTA_OFFICIAL_RULES, 
  MastaStage,
  MastaScheduleItem 
} from "@/lib/masta-data";

export default function JadwalPage() {
  const [activeTab, setActiveTab] = useState<"jadwal" | "agenda-utama" | "tata-tertib" | "sanksi">("jadwal");
  const [scheduleFilter, setScheduleFilter] = useState<string>("Semua");

  const filterOptions = ["Semua", "Universitas Daring", "Puncak Luring", "Fakultas", "Pembekalan"];

  const filteredSchedule = OFFICIAL_MASTA_SCHEDULE_2026.filter((item) => {
    if (scheduleFilter === "Semua") return true;
    return item.category === scheduleFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* 1. Header Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <CalendarCheck weight="bold" className="w-4 h-4 text-blue-500" />
          <span>Agenda & Ketetapan Resmi MASTA UMKT 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
          Jadwal Lengkap & Tata Tertib <br className="hidden sm:inline" />
          <span className="fire-text-gradient">Masa Ta’aruf Mahasiswa Baru 2026</span>
        </h1>

        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed">
          Berdasarkan ketetapan resmi Panitia Pelaksana MASTA MABA UMKT (Sekretaris Panitia: Suhardiansyah, NIDN 1129058501 / 12 Shafar 1447 H).
        </p>
      </div>

      {/* Countdown Banner */}
      <CountdownTimer />

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 border-b border-navy-200/80 dark:border-navy-800 pb-4">
        {[
          { id: "jadwal", label: "Tabel Jadwal Rangkaian", icon: Calendar },
          { id: "agenda-utama", label: "Daring vs Luring", icon: VideoCamera },
          { id: "tata-tertib", label: "Dresscode & Aturan Luring", icon: TShirt },
          { id: "sanksi", label: "Peringatan Sanksi", icon: WarningOctagon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? "bg-navy-900 text-white dark:bg-white dark:text-navy-950 shadow-md scale-105"
                  : "bg-white/70 dark:bg-navy-900 text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800 border border-navy-200/60 dark:border-navy-800"
              }`}
            >
              <Icon weight={isActive ? "fill" : "bold"} className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TABEL JADWAL RANGKAIAN LENGKAP MASTA 2026 */}
      {/* ========================================================================= */}
      {activeTab === "jadwal" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 dark:text-white">
                Rangkaian Kegiatan Masta 2026
              </h2>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
                Jadwal umum seluruh fakultas, IMM, dan universitas dari pembekalan hingga malam puncak.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-1.5">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setScheduleFilter(opt)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    scheduleFilter === opt
                      ? "bg-nyala-600 text-white"
                      : "bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:bg-navy-200"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-3xl border border-navy-200/80 dark:border-navy-800 glass-card shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-950 text-white text-xs sm:text-sm uppercase tracking-wider">
                  <th className="py-4 px-4 sm:px-6 font-bold w-16 text-center">No</th>
                  <th className="py-4 px-4 sm:px-6 font-bold min-w-[200px]">Hari, Tanggal</th>
                  <th className="py-4 px-4 sm:px-6 font-bold min-w-[280px]">Kegiatan</th>
                  <th className="py-4 px-4 sm:px-6 font-bold min-w-[150px]">Kategori / Media</th>
                  <th className="py-4 px-4 sm:px-6 font-bold min-w-[120px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100 dark:divide-navy-800/80 text-xs sm:text-sm text-navy-800 dark:text-navy-200">
                {filteredSchedule.map((row) => {
                  const isTeknik = row.activity.includes("Teknik");
                  const isMainUniv = row.category === "Universitas Daring" || row.category === "Puncak Luring";

                  return (
                    <tr 
                      key={row.no}
                      className={`hover:bg-navy-50/60 dark:hover:bg-navy-800/40 transition-colors ${
                        isMainUniv ? "bg-amber-500/5 dark:bg-amber-500/10 font-medium" : ""
                      } ${isTeknik ? "bg-nyala-500/5 border-l-4 border-l-nyala-500" : ""}`}
                    >
                      <td className="py-4 px-4 sm:px-6 text-center font-bold text-navy-500">
                        {row.no}
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-semibold">
                        <span className="block text-navy-900 dark:text-white font-bold">{row.dayDate}</span>
                        {row.time && (
                          <span className="text-[11px] text-nyala-600 dark:text-nyala-400 font-mono flex items-center gap-1 mt-0.5">
                            <Clock weight="bold" className="w-3 h-3" />
                            {row.time}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <div className="space-y-1">
                          <span className="font-extrabold text-navy-900 dark:text-white block text-sm sm:text-base">
                            {row.activity}
                          </span>
                          {row.description && (
                            <span className="text-xs text-navy-600 dark:text-navy-400 block leading-relaxed">
                              {row.description}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex flex-col gap-1 items-start">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            row.category === "Universitas Daring"
                              ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                              : row.category === "Puncak Luring"
                              ? "bg-nyala-500/15 text-nyala-600 dark:text-nyala-400"
                              : row.category === "Fakultas"
                              ? "bg-purple-500/15 text-purple-600 dark:text-purple-400"
                              : "bg-slate-500/15 text-slate-600 dark:text-slate-400"
                          }`}>
                            {row.category}
                          </span>
                          <span className="text-[11px] text-navy-500 dark:text-navy-400">
                            {row.locationType}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        {row.no === 7 || row.no === 8 || row.no === 9 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Mendatang</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400 text-xs font-bold">
                            <CheckCircle weight="fill" className="w-3.5 h-3.5 text-slate-400" />
                            <span>Selesai</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: AGENDA UTAMA UNIVERSITAS (DARING VS LURING) */}
      {/* ========================================================================= */}
      {activeTab === "agenda-utama" && (
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
              Agenda Utama: Kegiatan MASTA Universitas 2026
            </h2>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
              Perbedaan format pelaksanaan materi online (Daring) dan kegiatan tatap muka di kampus (Luring).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Kegiatan Daring */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-blue-500/40 bg-gradient-to-br from-navy-900 via-navy-950 to-blue-950 text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-extrabold uppercase">
                  <VideoCamera weight="bold" className="w-4 h-4" />
                  <span>Sesi Daring (Zoom Meeting)</span>
                </div>
                <Calendar weight="duotone" className="w-8 h-8 text-blue-400" />
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black">
                  Kegiatan Daring
                </h3>
                <p className="text-lg font-bold text-amber-400 font-mono">
                  24 dan 26 Agustus 2026
                </p>
                <p className="text-sm font-mono text-navy-200">
                  Pukul 08.00 – 17.00 WITA
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-3 relative z-10 text-xs sm:text-sm text-navy-200">
                <p className="font-semibold text-white">
                  Media: Melalui Aplikasi Zoom Meeting
                </p>
                <p className="leading-relaxed">
                  Wajib diikuti oleh seluruh mahasiswa baru 2026 dan mahasiswa yang belum mengikuti Masta Maba tahun sebelumnya.
                </p>
                <div className="pt-2 border-t border-white/10 text-[11px] text-amber-300 font-mono">
                  Format Penamaan Akun: [Nomor Gugus]_[Nama Lengkap]
                </div>
              </div>
            </div>

            {/* Card 2: Puncak Milad & Penutupan (Luring) */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-nyala-500/40 bg-gradient-to-br from-navy-50 via-white to-orange-50/50 dark:from-navy-950 dark:via-navy-900 dark:to-orange-950/40 text-navy-900 dark:text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-nyala-500/15 rounded-full blur-2xl" />

              <div className="flex items-center justify-between relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 text-white dark:bg-white dark:text-navy-950 text-xs font-extrabold uppercase">
                  <MapPin weight="bold" className="w-4 h-4" />
                  <span>Sesi Luring (Tatap Muka)</span>
                </div>
                <Calendar weight="duotone" className="w-8 h-8 text-nyala-500" />
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black">
                  Puncak Milad & Penutupan
                </h3>
                <p className="text-lg font-bold text-nyala-600 dark:text-nyala-400 font-mono">
                  28 Agustus 2026
                </p>
                <p className="text-sm text-navy-600 dark:text-navy-400">
                  Lokasi: Lingkungan Kampus UMKT Samarinda
                </p>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm">
                  <span className="font-extrabold text-amber-700 dark:text-amber-300 block mb-1">
                    Sesi 1: UKM EXPO
                  </span>
                  <span className="font-mono text-navy-700 dark:text-navy-300">
                    Pukul 06.30 – 11.30 WITA
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-nyala-500/10 border border-nyala-500/20 text-xs sm:text-sm">
                  <span className="font-extrabold text-nyala-700 dark:text-nyala-300 block mb-1">
                    Sesi 2: PUNCAK MILAD DAN PENUTUPAN
                  </span>
                  <span className="font-mono text-navy-700 dark:text-navy-300">
                    Pukul 17.00 – 22.00 WITA
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TATA TERTIB & DRESSCODE LURING (28 AGUSTUS 2026) */}
      {/* ========================================================================= */}
      {activeTab === "tata-tertib" && (
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-bold uppercase tracking-wider">
              Ketentuan Pelaksanaan Luring
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
              Aturan Puncak Milad & Penutupan Masta
            </h2>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
              Jumat, 28 Agustus 2026 • 06.30 - 11.30 & 17.00 - 22.00 WITA di Lingkungan Kampus UMKT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Rule 1: Rambut Rapi */}
            <div className="glass-card rounded-3xl p-6 border border-navy-200/70 dark:border-navy-800 space-y-4 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Scissors weight="duotone" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Rambut Rapi
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Rambut tidak gondrong, dipotong rapi, dan berwarna hitam alami (khusus mahasiswa laki-laki).
              </p>
            </div>

            {/* Rule 2: Barang Terlarang */}
            <div className="glass-card rounded-3xl p-6 border border-rose-500/30 dark:border-rose-900/40 space-y-4 shadow-md bg-rose-50/20 dark:bg-rose-950/20">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Prohibit weight="duotone" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400">
                Barang Terlarang
              </h3>
              <p className="text-xs sm:text-sm text-rose-800 dark:text-rose-200 leading-relaxed">
                Dilarang membawa benda tajam (sajam), narkoba, minuman keras, rokok, maupun rokok elektrik (vape).
              </p>
            </div>

            {/* Rule 3: Pengesahan Panitia */}
            <div className="glass-card rounded-3xl p-6 border border-navy-200/70 dark:border-navy-800 space-y-4 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Stamp weight="duotone" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Pengesahan Resmi
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Samarinda, 12 Shafar 1447 H / 06 Agustus 2026.<br />
                Sekretaris Panitia: <span className="font-bold text-navy-900 dark:text-white">SUHARDIANSYAH, NIDN 1129058501</span>.
              </p>
            </div>

          </div>

          {/* Detailed Dresscode Section */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-navy-200/80 dark:border-navy-800 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nyala-500 text-white flex items-center justify-center">
                <TShirt weight="bold" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-900 dark:text-white">
                  Ketentuan Pakaian (Dresscode)
                </h3>
                <span className="text-xs text-navy-500 dark:text-navy-400">
                  Panduan seragam wajib untuk sesi pagi dan sesi malam pada 28 Agustus 2026
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Sesi Pagi */}
              <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-navy-900/60 border border-amber-200 dark:border-navy-700 space-y-3">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-navy-950 text-xs font-extrabold uppercase inline-block">
                  Sesi Pagi (06.30 - 11.30 WITA) - UKM EXPO
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-navy-800 dark:text-navy-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle weight="fill" className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Atasan:</strong> Kaos UMKT (bila tidak ada, gunakan kaos olahraga).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle weight="fill" className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Bawahan:</strong> Celana training dan sepatu olahraga.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle weight="fill" className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Mahasiswi:</strong> Perempuan mengenakan jilbab warna hitam.</span>
                  </li>
                </ul>
              </div>

              {/* Sesi Malam */}
              <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-navy-900/60 border border-blue-200 dark:border-navy-700 space-y-3">
                <span className="px-3 py-1 rounded-full bg-navy-900 text-white dark:bg-blue-600 text-xs font-extrabold uppercase inline-block">
                  Sesi Malam (17.00 - 22.00 WITA) - PUNCAK MILAD & PENUTUPAN
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-navy-800 dark:text-navy-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle weight="fill" className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Pria:</strong> Kemeja putih, celana panjang hitam, songkok/peci hitam, dan jas almamater.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle weight="fill" className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Wanita:</strong> Kemeja putih, rok panjang hitam, jilbab hitam, dan jas almamater.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PERINGATAN SANKSI PELANGGARAN */}
      {/* ========================================================================= */}
      {activeTab === "sanksi" && (
        <div className="space-y-8">
          
          <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-navy-950 via-rose-950 to-navy-950 text-white border border-rose-500/50 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-extrabold uppercase tracking-wider">
                  <WarningOctagon weight="bold" className="w-4 h-4" />
                  <span>Peringatan Resmi Panitia</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-rose-400">
                  Sanksi Pelanggaran MASTA 2026
                </h2>

                <p className="text-sm sm:text-base text-rose-100 leading-relaxed font-medium">
                  {MASTA_OFFICIAL_RULES.sanctions.warning}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-rose-500/30 space-y-2">
                    <h4 className="text-sm font-bold text-amber-300">Kegiatan Daring</h4>
                    <p className="text-xs text-rose-200">
                      Peserta yang tidak mengikuti aturan dapat dikenakan sanksi dan mengulang Masa Ta'aruf Maba pada tahun depan.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-rose-500/30 space-y-2">
                    <h4 className="text-sm font-bold text-amber-300">Kegiatan Luring</h4>
                    <p className="text-xs text-rose-200">
                      Sanksi dapat berupa dikeluarkan sebagai peserta Masa Ta'aruf dan wajib mengulang pada tahun depan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-3">
                <MascotFlame size="xl" mood="nervous" />
                <span className="text-xs text-rose-300 font-mono">
                  Tetap patuhi aturan agar proses MASTA berjalan lancar!
                </span>
              </div>

            </div>
          </div>

          {/* Informasi Lanjutan & Kontak */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl glass-card border border-navy-200/70 dark:border-navy-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900 dark:text-white">
                <Building weight="bold" className="w-5 h-5 text-blue-500" />
                <span>Fakultas, Prodi & Himpunan</span>
              </div>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                {MASTA_OFFICIAL_RULES.nextInfo.fakultasProdi}
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-card border border-navy-200/70 dark:border-navy-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-navy-900 dark:text-white">
                <Users weight="bold" className="w-5 h-5 text-purple-500" />
                <span>Kegiatan MASTA IMM</span>
              </div>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                {MASTA_OFFICIAL_RULES.nextInfo.mastaImm}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Backlink Banner */}
      <BacklinkBanner />

    </div>
  );
}
