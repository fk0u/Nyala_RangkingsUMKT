"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CalendarCheck, 
  Laptop, 
  Code, 
  CheckSquare, 
  Sparkle, 
  ArrowRight,
  Flame,
  Lightning,
  Trophy,
  CheckCircle,
  Star,
  ChatCircleDots,
  ShieldCheck,
  Globe,
  InstagramLogo,
  ArrowSquareOut
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import CountdownTimer from "@/components/CountdownTimer";
import ProgressBar from "@/components/ProgressBar";
import { calculateRealStreak, calculateRealXp, dispatchGamificationUpdate } from "@/lib/gamification";

export default function MobileDashboardPage() {
  const [userName, setUserName] = useState("Mahasiswa Baru");
  const [userProdi, setUserProdi] = useState("S1 Teknik Informatika");
  const [checklistPercent, setChecklistPercent] = useState(0);
  const [checklistCount, setChecklistCount] = useState(0);
  const [totalXp, setTotalXp] = useState(50);
  const [levelTitle, setLevelTitle] = useState("Level 1 • MABA Pejuang");
  const [streakDays, setStreakDays] = useState(1);

  const [dailyQuests, setDailyQuests] = useState([
    { id: "q1", title: "Cek Jadwal Kegiatan MABA", xp: 30, completed: true, href: "/mobile/jadwal" },
    { id: "q2", title: "Lengkapi 3 Berkas Checklist", xp: 50, completed: false, href: "/mobile/checklist" },
    { id: "q3", title: "Catat Kesiapan Fisik & Mood", xp: 40, completed: false, href: "/mobile/health-check" },
    { id: "q4", title: "Tanya AI Seputar SIKAD & KRS", xp: 20, completed: true, href: "/mobile/companion" },
  ]);

  const loadData = () => {
    // Profile
    const savedProfile = localStorage.getItem("nyala_user_profile_v1");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) setUserName(parsed.name.split(" ")[0]);
        if (parsed.prodi) setUserProdi(parsed.prodi);
      } catch (e) {
        console.error(e);
      }
    } else {
      const savedProdi = localStorage.getItem("nyala_user_prodi");
      if (savedProdi) setUserProdi(savedProdi);
    }

    // Real Gamification State
    const streak = calculateRealStreak();
    const xpData = calculateRealXp();
    setStreakDays(streak);
    setTotalXp(xpData.totalXp);
    setLevelTitle(xpData.levelTitle);
    setChecklistCount(xpData.checklistCount);
    setChecklistPercent(Math.round((xpData.checklistCount / 11) * 100));

    if (xpData.checklistCount >= 3) {
      setDailyQuests((prev) =>
        prev.map((q) => (q.id === "q2" ? { ...q, completed: true } : q))
      );
    }

    const savedHealth = localStorage.getItem("nyala_health_logs");
    if (savedHealth) {
      try {
        const parsed = JSON.parse(savedHealth);
        if (parsed.length > 0) {
          setDailyQuests((prev) =>
            prev.map((q) => (q.id === "q3" ? { ...q, completed: true } : q))
          );
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener("nyala-gamification-update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("nyala-gamification-update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const completedQuestsCount = dailyQuests.filter((q) => q.completed).length;
  const questProgressPercent = Math.round((completedQuestsCount / dailyQuests.length) * 100);

  return (
    <div className="space-y-4">
      
      {/* ── 1. DUOLINGO 3D HERO GREETING WITH MASCOT FLAME COMPANION ── */}
      <div className="duo-card p-4 sm:p-5 space-y-3.5 select-none">
        
        {/* Top Mascot & Speech Bubble Interaction */}
        <div className="flex items-center gap-3">
          
          {/* Mascot Flame Character in Action */}
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border-2 border-b-4 border-amber-300/40 dark:border-amber-800/40 border-b-amber-400/50 flex items-center justify-center p-1 flex-shrink-0 shadow-sm">
            <MascotFlame size="sm" mood="cheering" className="w-12 h-12" />
          </div>

          {/* Duolingo Character Speech Bubble */}
          <div className="duo-speech-bubble p-3 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100/80 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 uppercase border border-amber-200 dark:border-amber-900/50">
                {levelTitle}
              </span>
              <span className="text-[10px] font-black font-mono text-nyala-600 dark:text-nyala-400">
                {totalXp} XP
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-black text-navy-950 dark:text-white mt-1 leading-snug">
              Semangat, {userName}!
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
              {userProdi}
            </p>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-[10px] font-black text-slate-400">
            <span>Progress Misi Harian ({completedQuestsCount}/{dailyQuests.length})</span>
            <span className="font-mono text-nyala-600 dark:text-nyala-400 font-black">{questProgressPercent}%</span>
          </div>
          <ProgressBar
            progress={questProgressPercent}
            showPercentage={false}
            size="sm"
          />
        </div>
      </div>

      {/* ── 2. UNIFIED 3D COUNTDOWN TIMER (ZERO CARD NESTING) ── */}
      <CountdownTimer variant="duolingo-mobile" />

      {/* ── 3. MISI HARIAN MABA (DUOLINGO 3D DAILY QUESTS) ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-navy-950 dark:text-white uppercase tracking-wider">
            <Trophy weight="fill" className="w-4 h-4 text-amber-500" />
            <span>Misi Harian MABA</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400">
            Reset Tiap 24 Jam
          </span>
        </div>

        <div className="space-y-2">
          {dailyQuests.map((quest) => (
            <Link
              key={quest.id}
              href={quest.href}
              className={`p-3.5 rounded-2xl border-2 border-b-4 flex items-center justify-between gap-3 select-none active:border-b-2 active:translate-y-0.5 transition-all shadow-sm ${
                quest.completed
                  ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900 border-b-emerald-400 dark:border-b-emerald-950"
                  : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 border-b-slate-300 dark:border-b-slate-900"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold flex-shrink-0 shadow-xs ${
                    quest.completed
                      ? "duo-btn-emerald"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {quest.completed ? (
                    <CheckCircle weight="fill" className="w-5 h-5 text-white" />
                  ) : (
                    <Star weight="bold" className="w-4 h-4 text-amber-500" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className={`text-xs font-black truncate ${
                    quest.completed
                      ? "text-emerald-900 dark:text-emerald-300 line-through opacity-80"
                      : "text-navy-950 dark:text-white"
                  }`}>
                    {quest.title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold">
                    Hadiah: +{quest.xp} XP
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl shadow-xs ${
                  quest.completed
                    ? "duo-btn-emerald"
                    : "duo-btn-primary"
                }`}>
                  {quest.completed ? "Selesai" : "Mulai"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── 4. 4 MODUL UTAMA AKADEMIK & KAMPUS (DUOLINGO 3D TACTILE CARDS) ── */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-navy-950 dark:text-white uppercase tracking-wider">
            Modul Utama Nyala
          </span>
          <span className="text-[10px] text-slate-400 font-bold">4 Panduan Inti</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Jadwal Card */}
          <Link
            href="/mobile/jadwal"
            className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-5 border-b-slate-300 dark:border-b-slate-900 active:border-b-2 active:translate-y-0.5 transition-all flex flex-col justify-between h-32 select-none shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <CalendarCheck weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-navy-950 dark:text-white">Jadwal MASTA</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">3 Gelombang IMM</p>
            </div>
          </Link>

          {/* SIKAD Card */}
          <Link
            href="/mobile/panduan-sikad"
            className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-5 border-b-slate-300 dark:border-b-slate-900 active:border-b-2 active:translate-y-0.5 transition-all flex flex-col justify-between h-32 select-none shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-700 dark:text-sky-400 flex items-center justify-center border border-sky-500/20">
              <Laptop weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-navy-950 dark:text-white">SIKAD & KRS</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">NIM 13 & Pasw 12xx</p>
            </div>
          </Link>

          {/* Kurikulum TI Card */}
          <Link
            href="/mobile/panduan-ti"
            className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-5 border-b-slate-300 dark:border-b-slate-900 active:border-b-2 active:translate-y-0.5 transition-all flex flex-col justify-between h-32 select-none shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Code weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-navy-950 dark:text-white">Kurikulum TI</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">20 SKS & 11 Dosen</p>
            </div>
          </Link>

          {/* Checklist Card */}
          <Link
            href="/mobile/checklist"
            className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-5 border-b-slate-300 dark:border-b-slate-900 active:border-b-2 active:translate-y-0.5 transition-all flex flex-col justify-between h-32 select-none shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-700 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
              <CheckSquare weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-navy-950 dark:text-white">Checklist</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{checklistCount}/11 Berkas Siap</p>
            </div>
          </Link>

        </div>
      </div>

      {/* ── 5. REDESIGNED AI COMPANION EDITORIAL 3D CARD (ANTI-SLOP) ── */}
      <div className="duo-card p-4 sm:p-5 space-y-3.5 select-none">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300/40 dark:border-amber-800/40 flex items-center justify-center flex-shrink-0">
            <MascotFlame size="sm" mood="thinking" className="w-9 h-9" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 uppercase">
                Asisten Akademik MABA
              </span>
            </div>
            <h3 className="text-sm font-black text-navy-950 dark:text-white">
              Butuh Bantuan SIKAD, KRS, atau MASTA?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tanyakan rincian perkuliahan, cara bayar SPP, atau syarat kelulusan ke asisten cerdas Nyala.
            </p>
          </div>
        </div>

        {/* Sample Prompt Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Link
            href="/mobile/companion"
            className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold border border-slate-200 dark:border-slate-700 active:scale-95 transition-all"
          >
            🔑 Format NIM 13 Digit & Password?
          </Link>
          <Link
            href="/mobile/companion"
            className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold border border-slate-200 dark:border-slate-700 active:scale-95 transition-all"
          >
            💳 Cara Bayar SPP BRIVA?
          </Link>
          <Link
            href="/mobile/companion"
            className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold border border-slate-200 dark:border-slate-700 active:scale-95 transition-all"
          >
            👔 Dresscode Resmi MASTA 2026?
          </Link>
        </div>

        {/* Action Button */}
        <Link
          href="/mobile/companion"
          className="duo-btn-primary w-full py-3 text-xs flex items-center justify-center gap-2 block text-center"
        >
          <ChatCircleDots weight="bold" className="w-4 h-4" />
          <span>Buka Chat Nyala AI Companion</span>
        </Link>
      </div>

      {/* ── 6. CREATOR ATTRIBUTION & TRANSPARENCY DISCLAIMER CARD ── */}
      <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-[#0A1024]/80 border border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 space-y-2 select-none">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <span className="font-bold text-navy-950 dark:text-white flex items-center gap-1.5">
            <ShieldCheck weight="fill" className="w-4 h-4 text-nyala-600" />
            Karya Inovasi Keberlanjutan (Sustainability)
          </span>
          <span className="font-mono text-[10px] text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300/40">
            Pemeringkatan UMKT • SDGs
          </span>
        </div>

        <p className="leading-relaxed">
          Aplikasi ini dikembangkan oleh Mahasiswa Baru UMKT: <strong className="text-navy-900 dark:text-white">Al-Ghani Desta Setyawan</strong> bertemakan <strong className="text-emerald-600 dark:text-emerald-400">Keberlanjutan Kampus (Sustainability & 100% Paperless Orientation)</strong> sebagai karya *submission* resmi untuk <strong className="text-nyala-600 dark:text-nyala-400">Lomba Pengembangan Web yang diselenggarakan oleh Pemeringkatan UMKT (rankings.umkt.ac.id)</strong> yang mendukung capaian <strong>SDGs Goal 4 (Pendidikan Berkualitas), 9 (Inovasi), 12 (Konsumsi Bertanggung Jawab), & 13 (Aksi Iklim)</strong>.
        </p>

        <div className="flex items-center gap-3 pt-1 border-t border-slate-200/60 dark:border-slate-800/60 font-bold text-[10px]">
          <a
            href="https://instagram.com/kou.sozo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-nyala-600 dark:text-nyala-400 hover:underline"
          >
            <InstagramLogo weight="bold" className="w-3.5 h-3.5" />
            <span>@kou.sozo</span>
          </a>
          <span>•</span>
          <a
            href="https://kou.bio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-navy-700 dark:text-slate-300 hover:underline"
          >
            <Globe weight="bold" className="w-3.5 h-3.5" />
            <span>kou.bio</span>
            <ArrowSquareOut weight="bold" className="w-2.5 h-2.5" />
          </a>
          <span>•</span>
          <a
            href="https://rankings.umkt.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-500 hover:text-navy-900 dark:hover:text-white hover:underline"
          >
            <span>rankings.umkt.ac.id</span>
            <ArrowSquareOut weight="bold" className="w-2.5 h-2.5" />
          </a>
        </div>

        <p className="text-[10px] text-slate-400 italic pt-0.5">
          *Catatan: Seluruh data dirangkum dari edaran resmi kampus untuk keperluan perlombaan & panduan MABA, namun belum sepenuhnya divalidasi resmi oleh panitia pusat. Konfirmasi resmi tetap merujuk ke BAAK / Biro Kemahasiswaan.
        </p>
      </div>

    </div>
  );
}
