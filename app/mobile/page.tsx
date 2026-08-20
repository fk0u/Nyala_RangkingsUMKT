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
  User
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood, MASCOT_MOOD_DESCRIPTIONS } from "@/components/MascotFlame";
import CountdownTimer from "@/components/CountdownTimer";
import ProgressBar from "@/components/ProgressBar";
import { BLOG_POSTS } from "@/lib/masta-data";

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

  const STORIES = [
    { label: "MASTA IMM", icon: CalendarCheck, href: "/mobile/jadwal", color: "from-emerald-500 to-teal-700" },
    { label: "KRS SIKAD", icon: Laptop, href: "/mobile/panduan-sikad", color: "from-sky-500 to-blue-700" },
    { label: "Kurikulum TI", icon: Code, href: "/mobile/panduan-ti", color: "from-nyala-500 to-red-600" },
    { label: "Checklist", icon: CheckSquare, href: "/mobile/checklist", color: "from-amber-500 to-orange-600" },
    { label: "Health Mood", icon: Heartbeat, href: "/mobile/health-check", color: "from-rose-500 to-pink-700" },
    { label: "Profil Saya", icon: User, href: "/mobile/profile", color: "from-indigo-500 to-purple-700" },
  ];

  const QUICK_GRID_APPS = [
    { label: "Jadwal MASTA", desc: "3 Gelombang & Zoom", icon: CalendarCheck, href: "/mobile/jadwal", bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    { label: "Simulator SIKAD", desc: "KRS & Presensi 75%", icon: Laptop, href: "/mobile/panduan-sikad", bg: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
    { label: "Kurikulum TI", desc: "Paket 20 SKS & Nilai", icon: Code, href: "/mobile/panduan-ti", bg: "bg-red-500/10 text-red-600 dark:text-red-400" },
    { label: "Tanya Nyala AI", desc: "Asisten Cerdas 24/7", icon: Sparkle, href: "/mobile/companion", bg: "bg-nyala-500/10 text-nyala-600 dark:text-nyala-400" },
    { label: "Checklist Berkas", desc: "Seragam & Berkas", icon: CheckSquare, href: "/mobile/checklist", bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    { label: "Profil & Tema", desc: "Data MABA & Setelan", icon: User, href: "/mobile/profile", bg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  ];

  return (
    <div className="space-y-6">
      
      {/* ── 1. NATIVE STORIES / HIGHLIGHT BUBBLES ── */}
      <div className="overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
        <div className="flex items-center gap-3.5 min-w-max">
          {STORIES.map((story, i) => {
            const Icon = story.icon;
            return (
              <Link
                key={i}
                href={story.href}
                className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform group"
              >
                <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-nyala-500 via-amber-400 to-nyala-600 shadow-md">
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#0A0F24] p-1 flex items-center justify-center">
                    <div className={`w-full h-full rounded-full bg-gradient-to-tr ${story.color} flex items-center justify-center text-white`}>
                      <Icon weight="bold" className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-navy-700 dark:text-navy-300 group-hover:text-nyala-600 dark:group-hover:text-white tracking-tight">
                  {story.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── 2. WELCOME BANNER CARD WITH MASCOT ── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-nyala-600 dark:text-nyala-400 uppercase tracking-wider block">
              {userProdi}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-navy-950 dark:text-white leading-tight">
              Halo, {userName}!
            </h2>
            <p className="text-xs text-navy-600 dark:text-navy-300 leading-snug">
              {MASCOT_MOOD_DESCRIPTIONS[heroMood]?.quote || "Nyala siap memandumu menuntaskan seluruh tahapan orientasi kampus."}
            </p>
          </div>

          <Link
            href="/mobile/profile"
            className="w-14 h-14 flex-shrink-0 cursor-pointer active:scale-90 transition-transform"
            title="Buka Profil"
          >
            <MascotFlame size="md" mood={heroMood} />
          </Link>
        </div>

        {/* Mini Status Row */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-navy-100 dark:border-navy-800/80">
          <Link
            href="/mobile/checklist"
            className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 flex items-center justify-between text-xs hover:border-nyala-500 transition-colors"
          >
            <div>
              <span className="text-[10px] text-navy-500 dark:text-navy-400 block">Checklist Berkas</span>
              <span className="font-bold font-mono text-nyala-600 dark:text-nyala-400">{checklistProgress}% Selesai</span>
            </div>
            <CaretRight weight="bold" className="w-3.5 h-3.5 text-navy-400" />
          </Link>

          <Link
            href="/mobile/health-check"
            className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 flex items-center justify-between text-xs hover:border-nyala-500 transition-colors"
          >
            <div>
              <span className="text-[10px] text-navy-500 dark:text-navy-400 block">Kondisi Mental</span>
              <span className="font-bold text-navy-900 dark:text-white block truncate">{todayMood || "Cek Hari Ini"}</span>
            </div>
            <CaretRight weight="bold" className="w-3.5 h-3.5 text-navy-400" />
          </Link>
        </div>
      </div>

      {/* ── 3. REALTIME COUNTDOWN TIMER WIDGET ── */}
      <CountdownTimer />

      {/* ── 4. NATIVE SERVICES 2x3 APP GRID ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-wider">
            Layanan & Panduan Cepat
          </h3>
          <span className="text-[11px] font-mono text-navy-500 dark:text-navy-400">6 Modul</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {QUICK_GRID_APPS.map((app, i) => {
            const Icon = app.icon;
            return (
              <Link
                key={i}
                href={app.href}
                className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800/80 space-y-2 active:scale-95 transition-transform hover:border-nyala-500/50 shadow-sm flex flex-col justify-between"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${app.bg}`}>
                  <Icon weight="bold" className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-navy-950 dark:text-white leading-tight">
                    {app.label}
                  </h4>
                  <p className="text-[10px] text-navy-500 dark:text-navy-400 line-clamp-1 mt-0.5">
                    {app.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── 5. DIRECT TANYA NYALA AI ACTION BAR ── */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-nyala-500/10 to-amber-500/10 dark:from-nyala-600/20 dark:to-amber-500/20 border border-nyala-500/30 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-nyala-600 text-white flex items-center justify-center font-bold shadow-md flex-shrink-0">
            <Sparkle weight="fill" className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-navy-950 dark:text-white">Ada Pertanyaan Seputar MASTA?</h4>
            <p className="text-[10px] text-navy-600 dark:text-navy-300">Tanya Nyala AI aktif 24 jam untuk membantumu.</p>
          </div>
        </div>

        <Link
          href="/mobile/companion"
          className="px-3.5 py-2 rounded-xl bg-nyala-600 hover:bg-nyala-500 text-white text-xs font-bold whitespace-nowrap active:scale-95 transition-transform shadow-sm"
        >
          Chat Sekarang
        </Link>
      </div>

      {/* ── 6. LATEST NEWS STREAM ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-wider">
            Warta & Panduan Terbaru
          </h3>
          <Link href="/mobile/blog" className="text-xs font-bold text-nyala-600 dark:text-nyala-400 hover:underline">
            Lihat Semua →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800/80 flex sm:flex-col items-center sm:items-start gap-3 active:scale-98 transition-transform group shadow-sm"
            >
              <div className="w-16 h-16 sm:w-full sm:aspect-[16/9] rounded-xl overflow-hidden bg-navy-100 dark:bg-navy-950 flex-shrink-0">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold text-nyala-600 dark:text-nyala-400 block">{post.category}</span>
                <h4 className="text-xs font-bold text-navy-950 dark:text-white truncate leading-snug group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors">{post.title}</h4>
                <p className="text-[10px] text-navy-500 dark:text-navy-400 line-clamp-1 mt-0.5">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
