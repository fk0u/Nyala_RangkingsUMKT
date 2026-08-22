"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CaretDown, 
  User, 
  Trophy, 
  DeviceMobile, 
  CheckCircle, 
  Flame, 
  Lightning, 
  X,
  IdentificationCard,
  PencilSimple,
  GraduationCap,
  ShieldCheck,
  CheckSquare
} from "@phosphor-icons/react";
import { calculateRealStreak, calculateRealXp } from "@/lib/gamification";

export default function NyalaUserDropdownTitle() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("Mahasiswa Baru UMKT");
  const [userNim, setUserNim] = useState("2611102441001");
  const [userProdi, setUserProdi] = useState("S1 Teknik Informatika");
  const [streakDays, setStreakDays] = useState(1);
  const [totalXp, setTotalXp] = useState(50);
  const [levelTitle, setLevelTitle] = useState("Level 1 • MABA Pejuang");
  const [checklistCount, setChecklistCount] = useState(0);

  const loadUserData = () => {
    // 1. Load Student Identity from LocalStorage
    const savedProfile = localStorage.getItem("nyala_user_profile_v1");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) setUserName(parsed.name);
        if (parsed.nim) setUserNim(parsed.nim);
        if (parsed.prodi) setUserProdi(parsed.prodi);
      } catch (e) {
        console.error(e);
      }
    } else {
      const savedProdi = localStorage.getItem("nyala_user_prodi");
      if (savedProdi) setUserProdi(savedProdi);
    }

    // 2. Calculate Real Streak & XP
    const realStreak = calculateRealStreak();
    const realXpData = calculateRealXp();
    setStreakDays(realStreak);
    setTotalXp(realXpData.totalXp);
    setLevelTitle(realXpData.levelTitle);
    setChecklistCount(realXpData.checklistCount);
  };

  useEffect(() => {
    loadUserData();

    const handleUpdate = () => {
      loadUserData();
    };

    window.addEventListener("nyala-gamification-update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("nyala-gamification-update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Brand Trigger with Subtle Caret ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 active:scale-95 transition-all select-none cursor-pointer group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
        title="Lihat Status & Data Mahasiswa"
      >
        <span className="font-sans font-black text-lg tracking-tight text-navy-950 dark:text-white">
          Nyala
        </span>
        <CaretDown 
          weight="bold" 
          className="w-3.5 h-3.5 text-nyala-600 dark:text-nyala-400 group-hover:translate-y-0.5 transition-transform" 
        />
      </button>

      {/* ── Student Data & Status Sheet Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
            />

            {/* Floating 3D Student Card */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-sm bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-6 border-b-slate-300 dark:border-b-slate-950 rounded-3xl p-5 shadow-2xl space-y-4 z-10 select-none"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400 uppercase">
                    Status Mahasiswa Aktif
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-navy-950 dark:hover:text-white"
                >
                  <X weight="bold" className="w-4 h-4" />
                </button>
              </div>

              {/* Student Identity Card */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-nyala-600 to-amber-500 text-white flex items-center justify-center font-black text-lg shadow-sm flex-shrink-0">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-black text-navy-950 dark:text-white truncate">
                    {userName}
                  </h4>
                  <p className="text-[11px] text-nyala-600 dark:text-nyala-400 font-bold truncate">
                    {userProdi}
                  </p>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    NIM: {userNim}
                  </div>
                </div>
              </div>

              {/* Real Student Metrics */}
              <div className="space-y-2 text-xs">
                
                {/* Level Title */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1E293B]/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Trophy weight="fill" className="w-4 h-4 text-amber-500" />
                    <span>Status Level:</span>
                  </div>
                  <span className="font-bold text-navy-950 dark:text-white">
                    {levelTitle}
                  </span>
                </div>

                {/* Checklist Real Progress */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1E293B]/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <CheckSquare weight="fill" className="w-4 h-4 text-emerald-500" />
                    <span>Checklist MASTA:</span>
                  </div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {checklistCount}/11 Berkas Siap
                  </span>
                </div>

                {/* Device Status */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1E293B]/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <DeviceMobile weight="fill" className="w-4 h-4 text-purple-500" />
                    <span>Mode Tampilan:</span>
                  </div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <ShieldCheck weight="fill" className="w-3.5 h-3.5" />
                    Mobile Locked
                  </span>
                </div>

                {/* Real Gamification Badges */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center gap-2 text-amber-700 dark:text-amber-300">
                    <Flame weight="fill" className="w-4 h-4 text-nyala-500" />
                    <div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Streak Riil</div>
                      <div className="font-black font-mono">{streakDays} Hari Aktif</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                    <Lightning weight="fill" className="w-4 h-4 text-emerald-500" />
                    <div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">XP Terkumpul</div>
                      <div className="font-black font-mono">{totalXp} XP</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Button: Edit Profil */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/mobile/profile"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-navy-950 dark:text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <PencilSimple weight="bold" className="w-3.5 h-3.5 text-nyala-600" />
                  <span>Ubah Data & Profil Mahasiswa</span>
                </Link>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
