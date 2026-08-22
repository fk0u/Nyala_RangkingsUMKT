"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CalendarCheck, 
  Laptop, 
  Sparkle, 
  Code, 
  Globe, 
  CheckSquare, 
  Heartbeat, 
  BookOpenText, 
  Compass, 
  ArrowRight,
  CaretRight,
  Headset,
  MapPin,
  Clock,
  User,
  ShieldCheck,
  CheckCircle,
  Bell
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood } from "@/components/MascotFlame";
import CountdownTimer from "@/components/CountdownTimer";
import FlutterCard from "@/components/flutter/FlutterCard";
import FlutterListTile from "@/components/flutter/FlutterListTile";
import FlutterChip from "@/components/flutter/FlutterChip";

export default function MobileAppHomePage() {
  const [checklistProgress, setChecklistProgress] = useState(0);
  const [todayMood, setTodayMood] = useState<string | null>(null);
  const [userName, setUserName] = useState("Mahasiswa Baru");
  const [userProdi, setUserProdi] = useState("S1 Teknik Informatika");
  const [heroMood, setHeroMood] = useState<MascotMood>("excited");

  useEffect(() => {
    const profile = localStorage.getItem("nyala_user_profile_v1");
    if (profile) {
      try {
        const p = JSON.parse(profile);
        if (p.name) setUserName(p.name);
        if (p.prodi) setUserProdi(p.prodi);
        if (p.mascotMood) setHeroMood(p.mascotMood);
      } catch (e) {
        console.error(e);
      }
    } else {
      const prodi = localStorage.getItem("nyala_user_prodi");
      if (prodi) setUserProdi(prodi);
    }

    const savedChecklist = localStorage.getItem("nyala_checklist");
    if (savedChecklist) {
      try {
        const parsed = JSON.parse(savedChecklist);
        const checkedCount = Object.values(parsed).filter(Boolean).length;
        setChecklistProgress(Math.round((checkedCount / 11) * 100));
      } catch (e) {
        console.error(e);
      }
    }

    const savedMoods = localStorage.getItem("nyala_mood_history");
    if (savedMoods) {
      try {
        const parsed = JSON.parse(savedMoods);
        if (parsed.length > 0) setTodayMood(parsed[0].label || "Semangat");
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const QUICK_ACTION_CHIPS = [
    { label: "Jadwal MASTA", href: "/mobile/jadwal", icon: CalendarCheck },
    { label: "KRS SIKAD", href: "/mobile/panduan-sikad", icon: Laptop },
    { label: "Kurikulum TI", href: "/mobile/panduan-ti", icon: Code },
    { label: "Checklist", href: "/mobile/checklist", icon: CheckSquare },
    { label: "Health Check", href: "/mobile/health-check", icon: Heartbeat },
    { label: "Warta Kampus", href: "/mobile/hub-umkt", icon: Globe },
  ];

  const CORE_WIDGET_APPS = [
    {
      title: "Jadwal & Rundown MASTA",
      subtitle: "3 Gelombang IMM, Zoom Daring & Puncak Milad",
      badge: "Wajib MABA",
      badgeColor: "orange" as const,
      icon: CalendarCheck,
      href: "/mobile/jadwal",
      color: "bg-nyala-50 dark:bg-nyala-950/60 text-nyala-500",
    },
    {
      title: "Simulator & Panduan SIKAD",
      subtitle: "Alur KRS Online, Presensi 75% & Etika Chat Dosen PA",
      badge: "Akademik",
      badgeColor: "blue" as const,
      icon: Laptop,
      href: "/mobile/panduan-sikad",
      color: "bg-sky-50 dark:bg-sky-950/60 text-sky-500",
    },
    {
      title: "Kurikulum S1 Teknologi Informasi",
      subtitle: "Paket 20 SKS Semester 1-4 & Direktori 11 Dosen",
      badge: "Prodi FST",
      badgeColor: "emerald" as const,
      icon: Code,
      href: "/mobile/panduan-ti",
      color: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500",
    },
    {
      title: "Checklist Persiapan & Berkas",
      subtitle: "11 Item wajib: Identitas, Pakaian & Tata Tertib",
      badge: `${checklistProgress}% Siap`,
      badgeColor: checklistProgress === 100 ? ("emerald" as const) : ("slate" as const),
      icon: CheckSquare,
      href: "/mobile/checklist",
      color: "bg-amber-50 dark:bg-amber-950/60 text-amber-500",
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      
      {/* ── 1. USER GREETING & MASCOT STATUS WIDGET (Flutter Style Hero Card) ── */}
      <FlutterCard variant="elevated" className="relative overflow-hidden bg-gradient-to-br from-white via-white to-nyala-50/40 dark:from-[#0F172A] dark:via-[#0F172A] dark:to-nyala-950/20 border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-nyala-100 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-nyala-500 animate-pulse" />
              <span>Sahabat MABA UMKT 2026</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight leading-tight">
              Hai, {userName}! 👋
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium truncate">
              {userProdi} • Siap menyambut orientasi kampus?
            </p>

            {/* Quick Readiness Metrics */}
            <div className="pt-2 flex items-center gap-2 sm:gap-3 flex-wrap">
              <Link
                href="/mobile/checklist"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 active:scale-95 transition-transform"
              >
                <CheckCircle weight="fill" className="w-3.5 h-3.5 text-emerald-500" />
                <span>Checklist: {checklistProgress}%</span>
              </Link>

              <Link
                href="/mobile/health-check"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 active:scale-95 transition-transform"
              >
                <Heartbeat weight="fill" className="w-3.5 h-3.5 text-rose-500" />
                <span>Mood: {todayMood || "Prima"}</span>
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center">
            <MascotFlame size="md" mood={heroMood} className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
        </div>
      </FlutterCard>

      {/* ── 2. QUICK ACTION CATEGORY CHIPS (Thumb-Reachable 1-Tap Scroll) ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Akses Pintas Cepat
          </span>
          <Link href="/mobile/companion" className="text-xs font-bold text-nyala-500 hover:text-nyala-600 flex items-center gap-1">
            <span>Tanya AI</span>
            <CaretRight weight="bold" className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {QUICK_ACTION_CHIPS.map((chip) => (
            <Link key={chip.href} href={chip.href}>
              <FlutterChip
                label={chip.label}
                icon={chip.icon}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* ── 3. LIVE COUNTDOWN & NOTIFICATION WIDGET ── */}
      <CountdownTimer />

      {/* ── 4. FEATURE WIDGET LIST (Flutter ListTile System) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm sm:text-base font-bold text-navy-950 dark:text-white">
            Modul Utama Pembinaan
          </h2>
          <span className="text-xs text-slate-400 font-medium">4 Modul Inti</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
          {CORE_WIDGET_APPS.map((widget) => {
            const Icon = widget.icon;
            return (
              <Link key={widget.href} href={widget.href}>
                <FlutterListTile
                  leading={
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold ${widget.color}`}>
                      <Icon weight="bold" className="w-5 h-5" />
                    </div>
                  }
                  title={widget.title}
                  subtitle={widget.subtitle}
                  badge={widget.badge}
                  badgeColor={widget.badgeColor}
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── 5. ASISTEN DIGITAL NYALA CTA BANNER ── */}
      <Link href="/mobile/companion" className="block active:scale-[0.98] transition-transform">
        <div className="rounded-2xl sm:rounded-3xl p-5 bg-gradient-to-tr from-navy-950 via-[#0E1635] to-nyala-950 text-white border border-nyala-500/30 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="space-y-1 max-w-sm">
              <div className="flex items-center gap-1.5 text-nyala-400 text-xs font-bold">
                <Sparkle weight="fill" className="w-4 h-4 animate-spin" />
                <span>Zpi AI Companion Terintegrasi</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Punya Pertanyaan Seputar Kampus?
              </h3>
              <p className="text-xs text-slate-300">
                Tanyakan teknis Zoom On-Cam, seragam, jadwal atau dosen ke Nyala 24/7.
              </p>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-nyala-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-nyala-500/40">
              <ArrowRight weight="bold" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>

    </div>
  );
}
