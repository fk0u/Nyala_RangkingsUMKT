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
  Clock,
  Heartbeat,
  Globe,
  Star
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood } from "@/components/MascotFlame";
import CountdownTimer from "@/components/CountdownTimer";
import ProgressBar from "@/components/ProgressBar";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import DuolingoButton from "@/components/flutter/DuolingoButton";

export default function MobileDashboardPage() {
  const [userName, setUserName] = useState("Mahasiswa Baru");
  const [userProdi, setUserProdi] = useState("S1 Teknik Informatika");
  const [checklistPercent, setChecklistPercent] = useState(0);
  const [healthScore, setHealthScore] = useState(85);
  const [xpEarned, setXpEarned] = useState(140);
  const [dailyQuests, setDailyQuests] = useState([
    { id: "q1", title: "Cek Jadwal Gelombang IMM", xp: 30, completed: true, href: "/mobile/jadwal" },
    { id: "q2", title: "Lengkapi 3 Berkas Checklist", xp: 50, completed: false, href: "/mobile/checklist" },
    { id: "q3", title: "Catat Kesiapan Fisik & Mood", xp: 40, completed: false, href: "/mobile/health-check" },
    { id: "q4", title: "Tanya AI Seputar SIKAD & KRS", xp: 20, completed: true, href: "/mobile/companion" },
  ]);

  useEffect(() => {
    const savedProfile = localStorage.getItem("nyala_user_profile_v1");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) setUserName(parsed.name.split(" ")[0]);
        if (parsed.prodi) setUserProdi(parsed.prodi);
      } catch (e) {
        console.error(e);
      }
    }

    const savedChecklist = localStorage.getItem("nyala_checklist");
    if (savedChecklist) {
      try {
        const parsed = JSON.parse(savedChecklist);
        const count = Object.values(parsed).filter(Boolean).length;
        const pct = Math.round((count / 11) * 100);
        setChecklistPercent(pct);
        if (count >= 3) {
          setDailyQuests((prev) =>
            prev.map((q) => (q.id === "q2" ? { ...q, completed: true } : q))
          );
        }
      } catch (e) {
        console.error(e);
      }
    }

    const savedHealth = localStorage.getItem("nyala_health_logs");
    if (savedHealth) {
      try {
        const parsed = JSON.parse(savedHealth);
        if (parsed.length > 0 && parsed[0].score) {
          setHealthScore(parsed[0].score);
          setDailyQuests((prev) =>
            prev.map((q) => (q.id === "q3" ? { ...q, completed: true } : q))
          );
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const completedQuestsCount = dailyQuests.filter((q) => q.completed).length;

  return (
    <div className="space-y-5">
      
      {/* ── 1. GAMIFIED GREETING & LEVEL BAR ── */}
      <DuolingoCard variant="surface" padding="md" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-nyala-500/15 border-2 border-nyala-500/30 flex items-center justify-center p-1">
              <MascotFlame size="sm" mood="cheering" className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 uppercase">
                  Level 1 • MABA Pejuang
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-navy-950 dark:text-white">
                Hai, {userName}! 🔥
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {userProdi}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-black font-mono text-nyala-500">
              {completedQuestsCount}/{dailyQuests.length} Misi Selesai
            </div>
            <div className="text-[10px] text-slate-400">
              +140 XP Terkumpul
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
            <span>Progress Menuju Level 2</span>
            <span>{Math.round((completedQuestsCount / dailyQuests.length) * 100)}%</span>
          </div>
          <ProgressBar
            progress={Math.round((completedQuestsCount / dailyQuests.length) * 100)}
            size="sm"
          />
        </div>
      </DuolingoCard>

      {/* ── 2. COUNTDOWN TIMER GAMIFIED CARD ── */}
      <DuolingoCard variant="surface" padding="md" className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock weight="bold" className="w-4 h-4 text-nyala-500" />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Hitung Mundur MASTA IMM
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-nyala-50 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400">
            18–20 Agt 2026
          </span>
        </div>

        <CountdownTimer />
      </DuolingoCard>

      {/* ── 3. MISI HARIAN MABA (DUOLINGO DAILY QUESTS) ── */}
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
              className={`p-3.5 rounded-2xl border-2 border-b-4 flex items-center justify-between gap-3 select-none active:border-b-2 active:translate-y-0.5 transition-all ${
                quest.completed
                  ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900 border-b-emerald-400 dark:border-b-emerald-950"
                  : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 border-b-slate-300 dark:border-b-slate-900"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${
                    quest.completed
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  }`}
                >
                  {quest.completed ? (
                    <CheckCircle weight="fill" className="w-5 h-5" />
                  ) : (
                    <Star weight="bold" className="w-4 h-4 text-amber-500" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className={`text-xs font-bold truncate ${
                    quest.completed
                      ? "text-emerald-900 dark:text-emerald-300 line-through opacity-80"
                      : "text-navy-950 dark:text-white"
                  }`}>
                    {quest.title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    Hadiah: +{quest.xp} XP
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                  quest.completed
                    ? "bg-emerald-500 text-white"
                    : "bg-nyala-500 text-white"
                }`}>
                  {quest.completed ? "Selesai" : "Mulai"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── 4. 4 MODUL UTAMA AKADEMIK & KAMPUS (DUOLINGO 3D CARDS) ── */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-navy-950 dark:text-white uppercase tracking-wider">
            Modul Utama Nyala
          </span>
          <span className="text-[10px] text-slate-400">4 Panduan Inti</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Jadwal Card */}
          <Link
            href="/mobile/jadwal"
            className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 active:border-b-2 active:translate-y-0.5 transition-all flex flex-col justify-between h-32 select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <CalendarCheck weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-navy-950 dark:text-white">Jadwal MASTA</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">3 Gelombang IMM</p>
            </div>
          </Link>

          {/* SIKAD Card */}
          <Link
            href="/mobile/panduan-sikad"
            className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 active:border-b-2 active:translate-y-0.5 transition-all flex flex-col justify-between h-32 select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Laptop weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-navy-950 dark:text-white">SIKAD & KRS</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Chat Dosen PA</p>
            </div>
          </Link>

          {/* Kurikulum TI Card */}
          <Link
            href="/mobile/panduan-ti"
            className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 active:border-b-2 active:translate-y-0.5 transition-all flex flex-col justify-between h-32 select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Code weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-navy-950 dark:text-white">Kurikulum TI</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">20 SKS & 11 Dosen</p>
            </div>
          </Link>

          {/* Checklist Card */}
          <Link
            href="/mobile/checklist"
            className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 active:border-b-2 active:translate-y-0.5 transition-all flex flex-col justify-between h-32 select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <CheckSquare weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-navy-950 dark:text-white">Checklist</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{checklistPercent}% Berkas Siap</p>
            </div>
          </Link>

        </div>
      </div>

      {/* ── 5. AI COMPANION 3D CTA BANNER ── */}
      <DuolingoCard variant="primary" padding="md" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/20 text-white uppercase inline-block">
              AI Companion 24/7
            </span>
            <h3 className="text-base font-black text-white">
              Punya Pertanyaan Seputar Kampus?
            </h3>
            <p className="text-xs text-white/90 leading-snug">
              Tanya jadwal gugus, dresscode, hingga cara bayar SPP ke Nyala AI.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
            <Sparkle weight="fill" className="w-6 h-6 text-white animate-spin" />
          </div>
        </div>

        <Link
          href="/mobile/companion"
          className="w-full py-3 rounded-xl bg-white hover:bg-slate-50 text-nyala-600 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md border-b-4 border-slate-300 active:border-b-2 active:translate-y-0.5 transition-all block text-center"
        >
          <span>Mulai Chat dengan Nyala AI</span>
          <ArrowRight weight="bold" className="w-4 h-4" />
        </Link>
      </DuolingoCard>

    </div>
  );
}
