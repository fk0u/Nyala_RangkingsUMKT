"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Sparkle, 
  CalendarCheck, 
  CaretRight, 
  CheckCircle, 
  Fire, 
  Broadcast, 
  Hourglass,
  ArrowRight,
  ArrowsClockwise
} from "@phosphor-icons/react";

export interface CountdownMilestone {
  id: string;
  name: string;
  shortName: string;
  category: "Masta IMM" | "Universitas Daring" | "Akademik SIKAD" | "Puncak Luring" | "Kuliah";
  locationType: "Luring (Kampus UMKT)" | "Daring (Zoom)" | "Portal SIKAD" | "Ruang Kuliah";
  targetISO: string; // Start ISO
  endISO: string;    // End ISO
  badge: string;
  timeWITA: string;
  description: string;
}

export const COUNTDOWN_MILESTONES: CountdownMilestone[] = [
  {
    id: "imm-fst",
    name: "MASTA IMM - FST Teknik & Informatika (Luring Kampus)",
    shortName: "20 Agt (MASTA FST)",
    category: "Masta IMM",
    locationType: "Luring (Kampus UMKT)",
    targetISO: "2026-08-20T06:00:00+08:00",
    endISO: "2026-08-20T12:00:00+08:00",
    badge: "20 Agustus 2026",
    timeWITA: "06.00 - 12.00 WITA",
    description: "Kegiatan luring Gelombang 3 di Kampus UMKT untuk Mahasiswa Baru Saintek (TI, Sipil, Mesin, Geologi)."
  },
  {
    id: "daring-univ-1",
    name: "Pembukaan & Materi Universitas Hari 1 (Daring Zoom)",
    shortName: "24 Agt (Daring Hari 1)",
    category: "Universitas Daring",
    locationType: "Daring (Zoom)",
    targetISO: "2026-08-24T08:00:00+08:00",
    endISO: "2026-08-24T17:00:00+08:00",
    badge: "24 Agustus 2026",
    timeWITA: "08.00 - 17.00 WITA",
    description: "Pembukaan resmi MASTA Universitas untuk 3.755 mahasiswa baru via Zoom Meeting. Wajib On-Cam!"
  },
  {
    id: "daring-univ-2",
    name: "Materi Universitas Hari 2 & Kemahasiswaan (Daring Zoom)",
    shortName: "26 Agt (Daring Hari 2)",
    category: "Universitas Daring",
    locationType: "Daring (Zoom)",
    targetISO: "2026-08-26T08:00:00+08:00",
    endISO: "2026-08-26T17:00:00+08:00",
    badge: "26 Agustus 2026",
    timeWITA: "08.00 - 17.00 WITA",
    description: "Pemaparan materi kemahasiswaan, beasiswa, dan pengenalan organisasi kampus via Zoom Meeting."
  },
  {
    id: "krs-closing",
    name: "Batas Akhir Validasi KRS SIKAD bersama Dosen PA",
    shortName: "27 Agt (Batas KRS)",
    category: "Akademik SIKAD",
    locationType: "Portal SIKAD",
    targetISO: "2026-08-27T23:59:00+08:00",
    endISO: "2026-08-27T23:59:59+08:00",
    badge: "27 Agustus 2026",
    timeWITA: "Batas 23.59 WITA",
    description: "Batas akhir persetujuan dan penguncian Kartu Rencana Studi (KRS) online di portal mahasiswa.umkt.ac.id."
  },
  {
    id: "ukm-expo",
    name: "UKM Expo Sesi 1 (Luring di Kampus UMKT)",
    shortName: "28 Agt (UKM Expo)",
    category: "Puncak Luring",
    locationType: "Luring (Kampus UMKT)",
    targetISO: "2026-08-28T06:30:00+08:00",
    endISO: "2026-08-28T11:30:00+08:00",
    badge: "28 Agustus 2026 (Pagi)",
    timeWITA: "06.30 - 11.30 WITA",
    description: "Parade dan pendaftaran seluruh UKM & organisasi kampus. Dresscode: Kaos UMKT / Olahraga & celana training."
  },
  {
    id: "puncak-milad",
    name: "Puncak Milad UMKT & Penutupan Resmi MASTA 2026",
    shortName: "28 Agt (Puncak Milad)",
    category: "Puncak Luring",
    locationType: "Luring (Kampus UMKT)",
    targetISO: "2026-08-28T17:00:00+08:00",
    endISO: "2026-08-28T22:00:00+08:00",
    badge: "28 Agustus 2026 (Malam)",
    timeWITA: "17.00 - 22.00 WITA",
    description: "Malam inaugurasi, penutupan resmi MASTA 2026, dan penerbitan e-Sertifikat. Dresscode: Formal hitam-putih + Jas Almamater."
  },
  {
    id: "kuliah-perdana",
    name: "Hari Pertama Perkuliahan Semester Ganjil 2026/2027",
    shortName: "31 Agt (Kuliah Perdana)",
    category: "Kuliah",
    locationType: "Ruang Kuliah",
    targetISO: "2026-08-31T07:30:00+08:00",
    endISO: "2026-08-31T17:00:00+08:00",
    badge: "31 Agustus 2026",
    timeWITA: "07.30 WITA",
    description: "Awal resmi perkuliahan tatap muka dan praktikum laboratorium semester ganjil tahun akademik 2026/2027."
  }
];

export default function CountdownTimer({ compact = false }: { compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<string>("auto");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isAutoMode, setIsAutoMode] = useState<boolean>(true);

  // Initialize clock on client side
  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine automatically the next upcoming or currently active event
  const autoNextMilestone = useMemo(() => {
    const now = currentTime ? currentTime.getTime() : Date.now();

    // 1. Check if any event is currently active (now between start and end)
    const active = COUNTDOWN_MILESTONES.find((m) => {
      const start = new Date(m.targetISO).getTime();
      const end = new Date(m.endISO).getTime();
      return now >= start && now <= end;
    });
    if (active) return active;

    // 2. Otherwise find the earliest upcoming event
    const upcoming = COUNTDOWN_MILESTONES.filter((m) => {
      const start = new Date(m.targetISO).getTime();
      return start > now;
    });

    if (upcoming.length > 0) {
      return upcoming[0];
    }

    // Fallback to the last milestone
    return COUNTDOWN_MILESTONES[COUNTDOWN_MILESTONES.length - 1];
  }, [currentTime]);

  // Active milestone to display
  const activeMilestone = useMemo(() => {
    if (isAutoMode || selectedId === "auto") {
      return autoNextMilestone;
    }
    const found = COUNTDOWN_MILESTONES.find((m) => m.id === selectedId);
    return found || autoNextMilestone;
  }, [isAutoMode, selectedId, autoNextMilestone]);

  // Real-time status calculation for the active milestone
  const eventStatus = useMemo(() => {
    const now = currentTime ? currentTime.getTime() : Date.now();
    const start = new Date(activeMilestone.targetISO).getTime();
    const end = new Date(activeMilestone.endISO).getTime();

    if (now > end) {
      return "completed";
    } else if (now >= start && now <= end) {
      return "live";
    } else {
      return "upcoming";
    }
  }, [currentTime, activeMilestone]);

  // Real-time countdown values
  const timeLeft = useMemo(() => {
    const now = currentTime ? currentTime.getTime() : Date.now();
    const target = new Date(activeMilestone.targetISO).getTime();
    const end = new Date(activeMilestone.endISO).getTime();

    // If live, countdown to end time; if upcoming, countdown to start time
    const diff = eventStatus === "live" ? end - now : target - now;

    if (diff > 0 && eventStatus !== "completed") {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [currentTime, activeMilestone, eventStatus]);

  // Format current WITA time string
  const currentWitaString = useMemo(() => {
    if (!currentTime) return "Memuat waktu...";
    return currentTime.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Makassar",
    }) + " WITA";
  }, [currentTime]);

  const handleSelectMilestone = (id: string) => {
    if (id === "auto") {
      setIsAutoMode(true);
      setSelectedId("auto");
    } else {
      setIsAutoMode(false);
      setSelectedId(id);
    }
  };

  const handleJumpToNext = () => {
    setIsAutoMode(true);
    setSelectedId("auto");
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-nyala-600/10 dark:from-navy-900/90 dark:via-navy-950/95 dark:to-nyala-950/40 border border-nyala-500/30 rounded-3xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
      
      {/* Top Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-nyala-500/15 dark:bg-nyala-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5">

        {/* ── 1. Top Header Row: Status Bar & Clock ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-nyala-500/15 dark:border-navy-800 pb-3">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nyala-500/20 dark:bg-nyala-500/25 text-nyala-700 dark:text-nyala-300 text-xs font-black uppercase tracking-wider">
              <Sparkle weight="fill" className="w-3.5 h-3.5 text-nyala-500" />
              <span>Hitung Mundur Resmi MASTA 2026</span>
            </span>

            {isAutoMode ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Otomatis: Agenda Terdekat</span>
              </span>
            ) : (
              <button
                onClick={handleJumpToNext}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-navy-200/60 dark:bg-navy-800 hover:bg-nyala-500/20 text-navy-700 dark:text-navy-300 hover:text-nyala-600 text-[11px] font-bold transition-colors cursor-pointer"
                title="Kembali ke mode deteksi otomatis agenda terdekat"
              >
                <ArrowsClockwise weight="bold" className="w-3 h-3" />
                <span>Kembali ke Otomatis</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-navy-600 dark:text-navy-400 bg-white/70 dark:bg-navy-800/80 px-3 py-1 rounded-full border border-navy-200/50 dark:border-navy-700/60 shadow-xs">
            <Clock weight="fill" className="w-3.5 h-3.5 text-nyala-500" />
            <span>Waktu Kampus:</span>
            <span className="text-navy-950 dark:text-white font-black">{currentWitaString}</span>
          </div>

        </div>

        {/* ── 2. Middle Row: Active Event Card & Digit Clocks ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left Hero info of current target */}
          <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
            <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg ${
              eventStatus === "live"
                ? "bg-gradient-to-br from-rose-500 to-red-600 shadow-red-500/40 animate-pulse"
                : eventStatus === "completed"
                ? "bg-gradient-to-br from-slate-600 to-navy-800 shadow-slate-500/30"
                : "bg-gradient-to-br from-nyala-500 to-amber-500 shadow-nyala-500/40"
            }`}>
              {eventStatus === "live" ? (
                <Broadcast weight="fill" className="w-7 h-7 animate-spin" />
              ) : eventStatus === "completed" ? (
                <CheckCircle weight="fill" className="w-7 h-7 text-emerald-300" />
              ) : (
                <Hourglass weight="duotone" className="w-7 h-7" />
              )}
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider font-mono ${
                  eventStatus === "live"
                    ? "bg-rose-500 text-white animate-pulse"
                    : eventStatus === "completed"
                    ? "bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300"
                    : "bg-nyala-500/20 text-nyala-800 dark:text-nyala-300 font-extrabold"
                }`}>
                  {eventStatus === "live" ? "🔴 SEDANG BERLANGSUNG" : eventStatus === "completed" ? "✅ AGENDA SELESAI" : "⏳ SEGERA DIMULAI"}
                </span>

                <span className="px-2.5 py-0.5 rounded-md bg-white/80 dark:bg-navy-800 text-navy-800 dark:text-navy-200 text-[11px] font-mono font-bold border border-navy-200 dark:border-navy-700">
                  {activeMilestone.badge} ({activeMilestone.timeWITA})
                </span>

                <span className="text-[11px] text-navy-500 dark:text-navy-400 font-medium hidden sm:inline">
                  • {activeMilestone.locationType}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-navy-950 dark:text-white leading-tight">
                {activeMilestone.name}
              </h3>

              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-snug">
                {activeMilestone.description}
              </p>
            </div>
          </div>

          {/* Right: Realtime Digits or Completion Banner */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-end gap-3 flex-shrink-0">
            
            {eventStatus === "completed" ? (
              <div className="w-full sm:w-auto p-4 rounded-2xl bg-emerald-500/15 dark:bg-emerald-500/10 border border-emerald-500/30 text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-sm">
                  <CheckCircle weight="fill" className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Agenda ini telah rampung terlaksana.</span>
                </div>
                <button
                  onClick={handleJumpToNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-nyala-600 hover:bg-nyala-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Lihat Hitung Mundur Agenda Berikutnya</span>
                  <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 text-center w-full sm:w-auto">
                {[
                  { label: "Hari", value: timeLeft.days },
                  { label: "Jam", value: timeLeft.hours },
                  { label: "Menit", value: timeLeft.minutes },
                  { label: "Detik", value: timeLeft.seconds },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/95 dark:bg-navy-900/95 backdrop-blur-md px-3 sm:px-4 py-2.5 rounded-2xl border border-nyala-500/25 dark:border-navy-700 shadow-md min-w-[65px] sm:min-w-[72px]"
                  >
                    <span className="block text-2xl sm:text-3xl font-black text-nyala-600 dark:text-nyala-400 leading-none font-mono tracking-tight">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-navy-500 dark:text-navy-400 mt-1 block">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* ── 3. Bottom Row: Interactive Milestone Selector Pills ── */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-[11px] font-bold text-navy-500 dark:text-navy-400 mr-1 flex-shrink-0">
              Pilih Agenda:
            </span>

            <button
              onClick={() => handleSelectMilestone("auto")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex-shrink-0 flex items-center gap-1 ${
                isAutoMode
                  ? "bg-gradient-to-r from-nyala-600 to-amber-500 text-white shadow-sm scale-105"
                  : "bg-white/80 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-700 border border-navy-200 dark:border-navy-700"
              }`}
            >
              <Sparkle weight="fill" className="w-3 h-3" />
              <span>⚡ Terdekat (Auto)</span>
            </button>

            {COUNTDOWN_MILESTONES.map((m) => {
              const isSelected = !isAutoMode && selectedId === m.id;
              const now = currentTime ? currentTime.getTime() : Date.now();
              const start = new Date(m.targetISO).getTime();
              const end = new Date(m.endISO).getTime();
              const isPassed = now > end;
              const isLive = now >= start && now <= end;

              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectMilestone(m.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all flex-shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-navy-950 text-white dark:bg-white dark:text-navy-950 shadow-md scale-105"
                      : isPassed
                      ? "bg-navy-100/70 dark:bg-navy-800/60 text-navy-400 dark:text-navy-500 hover:text-navy-800"
                      : isLive
                      ? "bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30"
                      : "bg-white/80 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-700 border border-navy-200 dark:border-navy-700"
                  }`}
                >
                  {isLive && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
                  {isPassed && <span className="text-[10px] text-emerald-500 font-bold">✓</span>}
                  <span>{m.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
