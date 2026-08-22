"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  CalendarCheck, 
  CheckCircle, 
  Broadcast, 
  Hourglass,
  ArrowRight,
  ArrowsClockwise,
  MapPin
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
    name: "MASTA IMM - Fakultas Sains & Teknologi",
    shortName: "20 Agt • FST",
    category: "Masta IMM",
    locationType: "Luring (Kampus UMKT)",
    targetISO: "2026-08-20T06:00:00+08:00",
    endISO: "2026-08-20T12:00:00+08:00",
    badge: "20 Agustus 2026",
    timeWITA: "06.00 - 12.00 WITA",
    description: "Orientasi luring Gelombang 3 di Kampus UMKT untuk Mahasiswa Baru Teknik Informatika, Sipil, Mesin, dan Geologi."
  },
  {
    id: "daring-univ-1",
    name: "Pembukaan & Materi Universitas Hari 1",
    shortName: "24 Agt • Daring 1",
    category: "Universitas Daring",
    locationType: "Daring (Zoom)",
    targetISO: "2026-08-24T08:00:00+08:00",
    endISO: "2026-08-24T17:00:00+08:00",
    badge: "24 Agustus 2026",
    timeWITA: "08.00 - 17.00 WITA",
    description: "Pembukaan resmi MASTA Universitas untuk 3.755 mahasiswa baru via Zoom Meeting. Wajib berpakaian sopan dan on-camera."
  },
  {
    id: "daring-univ-2",
    name: "Materi Universitas Hari 2 & Kemahasiswaan",
    shortName: "26 Agt • Daring 2",
    category: "Universitas Daring",
    locationType: "Daring (Zoom)",
    targetISO: "2026-08-26T08:00:00+08:00",
    endISO: "2026-08-26T17:00:00+08:00",
    badge: "26 Agustus 2026",
    timeWITA: "08.00 - 17.00 WITA",
    description: "Pemaparan materi beasiswa, etika kemahasiswaan, dan pengenalan organisasi kampus secara interaktif."
  },
  {
    id: "krs-closing",
    name: "Batas Akhir Validasi KRS SIKAD Dosen PA",
    shortName: "27 Agt • Batas KRS",
    category: "Akademik SIKAD",
    locationType: "Portal SIKAD",
    targetISO: "2026-08-27T23:59:00+08:00",
    endISO: "2026-08-27T23:59:59+08:00",
    badge: "27 Agustus 2026",
    timeWITA: "Batas 23.59 WITA",
    description: "Batas persetujuan dan penguncian Kartu Rencana Studi (KRS) online pada portal mahasiswa.umkt.ac.id."
  },
  {
    id: "ukm-expo",
    name: "UKM Expo Sesi 1 di Kampus UMKT",
    shortName: "28 Agt • UKM Expo 1",
    category: "Puncak Luring",
    locationType: "Luring (Kampus UMKT)",
    targetISO: "2026-08-28T07:30:00+08:00",
    endISO: "2026-08-28T17:00:00+08:00",
    badge: "28 Agustus 2026",
    timeWITA: "07.30 - 17.00 WITA",
    description: "Parade expo UKM dan display booth organisasi kemahasiswaan di lapangan utama Kampus UMKT."
  },
  {
    id: "inaugurasi",
    name: "Inaugurasi & Malam Puncak MASTA 2026",
    shortName: "29 Agt • Puncak",
    category: "Puncak Luring",
    locationType: "Luring (Kampus UMKT)",
    targetISO: "2026-08-29T18:30:00+08:00",
    endISO: "2026-08-29T22:30:00+08:00",
    badge: "29 Agustus 2026",
    timeWITA: "18.30 - 22.30 WITA",
    description: "Malam keakraban, inaugurasi penyematan almamater resmi, konser musik dan apresiasi mahasiswa berprestasi."
  },
  {
    id: "kuliah-perdana",
    name: "Hari Pertama Perkuliahan Semester Ganjil 2026/2027",
    shortName: "07 Sep • Kuliah",
    category: "Kuliah",
    locationType: "Ruang Kuliah",
    targetISO: "2026-09-07T07:30:00+08:00",
    endISO: "2026-09-07T17:00:00+08:00",
    badge: "07 September 2026",
    timeWITA: "07.30 WITA Mulai",
    description: "Awal resmi perkuliahan aktif Semester 1 tahun akademik 2026/2027 di seluruh fakultas UMKT."
  }
];

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

interface CountdownTimerProps {
  variant?: "default" | "duolingo-mobile";
}

export default function CountdownTimer({ variant = "default" }: CountdownTimerProps) {
  const [selectedId, setSelectedId] = useState<string>("auto");
  const [isAutoMode, setIsAutoMode] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const autoNextMilestone = useMemo(() => {
    if (!currentTime) return COUNTDOWN_MILESTONES[0];
    const nowMs = currentTime.getTime();

    for (const m of COUNTDOWN_MILESTONES) {
      const endMs = new Date(m.endISO).getTime();
      if (nowMs <= endMs) {
        return m;
      }
    }

    return COUNTDOWN_MILESTONES[COUNTDOWN_MILESTONES.length - 1];
  }, [currentTime]);

  const activeMilestone = useMemo(() => {
    if (isAutoMode || selectedId === "auto") {
      return autoNextMilestone;
    }
    return COUNTDOWN_MILESTONES.find((m) => m.id === selectedId) || autoNextMilestone;
  }, [isAutoMode, selectedId, autoNextMilestone]);

  const eventStatus = useMemo<"upcoming" | "live" | "completed">(() => {
    if (!currentTime || !activeMilestone) return "upcoming";
    const nowMs = currentTime.getTime();
    const startMs = new Date(activeMilestone.targetISO).getTime();
    const endMs = new Date(activeMilestone.endISO).getTime();

    if (nowMs >= startMs && nowMs <= endMs) {
      return "live";
    } else if (nowMs > endMs) {
      return "completed";
    }
    return "upcoming";
  }, [currentTime, activeMilestone]);

  const timeLeft = useMemo<TimeRemaining>(() => {
    if (!currentTime || !activeMilestone) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
    }

    const nowMs = currentTime.getTime();
    const startMs = new Date(activeMilestone.targetISO).getTime();
    const diff = startMs - nowMs;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, totalMs: diff };
  }, [currentTime, activeMilestone]);

  const currentWitaString = useMemo(() => {
    if (!currentTime) return "--:--:-- WITA";
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

  // ── DUOLINGO MOBILE 3D LAYOUT (SINGLE-LAYER, ZERO REDUNDANCY) ──
  if (variant === "duolingo-mobile") {
    return (
      <div className="duo-card p-4 sm:p-5 space-y-3.5 select-none">
        
        {/* Header Strip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              eventStatus === "live" ? "bg-rose-500 animate-ping" : "bg-nyala-500"
            }`} />
            <h2 className="text-xs font-black uppercase tracking-wider text-navy-950 dark:text-white">
              Hitung Mundur Kegiatan MABA
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-nyala-50 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400">
            {activeMilestone.badge}
          </span>
        </div>

        {/* Milestone Title & Location */}
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-black text-navy-950 dark:text-white leading-snug">
            {activeMilestone.name}
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>{activeMilestone.timeWITA}</span>
            <span>•</span>
            <span>{activeMilestone.locationType}</span>
          </div>
        </div>

        {/* 4 Chunky Digital Clock Boxes */}
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: "HARI", value: timeLeft.days },
            { label: "JAM", value: timeLeft.hours },
            { label: "MENIT", value: timeLeft.minutes },
            { label: "DETIK", value: timeLeft.seconds },
          ].map((item, i) => (
            <div
              key={i}
              className="py-2.5 px-1 rounded-2xl bg-slate-100/80 dark:bg-[#1E293B] border-2 border-slate-200/80 dark:border-slate-700/80 border-b-4 border-b-slate-300 dark:border-b-slate-900 text-center"
            >
              <span className="block text-xl sm:text-2xl font-black font-mono tracking-tight text-navy-950 dark:text-white">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Filter / Milestone Horizontal Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => handleSelectMilestone("auto")}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border-2 border-b-4 whitespace-nowrap transition-all active:border-b-2 active:translate-y-0.5 ${
              isAutoMode
                ? "bg-navy-950 dark:bg-white text-white dark:text-navy-950 border-navy-950 dark:border-white border-b-black dark:border-b-slate-300"
                : "bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 border-b-slate-300 dark:border-b-slate-900"
            }`}
          >
            Otomatis
          </button>
          {COUNTDOWN_MILESTONES.slice(0, 4).map((m) => {
            const isSelected = !isAutoMode && selectedId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMilestone(m.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border-2 border-b-4 whitespace-nowrap transition-all active:border-b-2 active:translate-y-0.5 ${
                  isSelected
                    ? "bg-nyala-500 text-white border-nyala-600 border-b-nyala-800"
                    : "bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 border-b-slate-300 dark:border-b-slate-900"
                }`}
              >
                {m.shortName}
              </button>
            );
          })}
        </div>

      </div>
    );
  }

  // ── DEFAULT DESKTOP LAYOUT ──
  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-navy-900/90 border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-6">
      
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-100 dark:border-navy-800/80 pb-4">
        
        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              eventStatus === "live" 
                ? "bg-rose-500 animate-ping" 
                : eventStatus === "completed" 
                ? "bg-slate-400" 
                : "bg-nyala-500 animate-pulse"
            }`} />
            <span className="text-xs font-black uppercase tracking-wider text-navy-950 dark:text-white">
              {eventStatus === "live" 
                ? "Sedang Berlangsung" 
                : eventStatus === "completed" 
                ? "Agenda Selesai" 
                : "Hitung Mundur Agenda"}
            </span>
          </div>

          {!isAutoMode && (
            <button
              onClick={() => handleSelectMilestone("auto")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-nyala-600 dark:text-nyala-400 hover:underline cursor-pointer"
            >
              <ArrowsClockwise weight="bold" className="w-3.5 h-3.5" />
              <span>Reset ke Agenda Terdekat</span>
            </button>
          )}
        </div>

        {/* Campus Clock */}
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-navy-500 dark:text-navy-400">
          <Clock weight="bold" className="w-4 h-4 text-navy-400" />
          <span>Kampus UMKT:</span>
          <span className="font-bold text-navy-900 dark:text-white">{currentWitaString}</span>
        </div>

      </div>

      {/* Main Countdown Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Target Details */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-medium text-navy-500 dark:text-navy-400">
            <span>{activeMilestone.badge}</span>
            <span>•</span>
            <span>{activeMilestone.timeWITA}</span>
            <span>•</span>
            <div className="flex items-center gap-1 text-navy-600 dark:text-navy-300">
              <MapPin weight="bold" className="w-3.5 h-3.5" />
              <span>{activeMilestone.locationType}</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight leading-snug">
            {activeMilestone.name}
          </h3>

          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed max-w-xl">
            {activeMilestone.description}
          </p>
        </div>

        {/* Right Digital Clock Tiles */}
        <div className="lg:col-span-5 flex justify-start lg:justify-end">
          {eventStatus === "completed" ? (
            <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-left space-y-2 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs font-bold text-navy-700 dark:text-navy-300">
                <CheckCircle weight="bold" className="w-4 h-4 text-emerald-500" />
                <span>Pelaksanaan agenda ini telah usai.</span>
              </div>
              <button
                onClick={() => handleSelectMilestone("auto")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-nyala-600 hover:bg-nyala-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Lihat Agenda Berikutnya</span>
                <ArrowRight weight="bold" className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2.5 text-center w-full sm:w-auto">
              {[
                { label: "Hari", value: timeLeft.days },
                { label: "Jam", value: timeLeft.hours },
                { label: "Menit", value: timeLeft.minutes },
                { label: "Detik", value: timeLeft.seconds },
              ].map((item, i) => (
                <div
                  key={i}
                  className="px-3.5 py-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200/80 dark:border-navy-800 min-w-[64px] sm:min-w-[72px]"
                >
                  <span className="block text-2xl sm:text-3xl font-black font-mono tracking-tight text-navy-950 dark:text-white">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-navy-400 mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Interactive Milestone Selector Strip */}
      <div className="pt-2 border-t border-navy-100 dark:border-navy-800/80">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => handleSelectMilestone("auto")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              isAutoMode
                ? "bg-navy-950 dark:bg-white text-white dark:text-navy-950 shadow-sm"
                : "bg-navy-50 dark:bg-navy-950 text-navy-600 dark:text-navy-400 hover:text-navy-950 dark:hover:text-white"
            }`}
          >
            Deteksi Otomatis
          </button>

          {COUNTDOWN_MILESTONES.map((m) => {
            const isSelected = !isAutoMode && selectedId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMilestone(m.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-nyala-600 text-white shadow-sm"
                    : "bg-navy-50 dark:bg-navy-950 text-navy-600 dark:text-navy-400 hover:text-navy-950 dark:hover:text-white"
                }`}
              >
                {m.shortName}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
