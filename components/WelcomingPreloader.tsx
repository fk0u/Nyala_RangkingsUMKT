"use client";

import React, { useState, useEffect } from "react";
import MascotFlame from "./MascotFlame";
import { Sparkle, ShieldCheck } from "@phosphor-icons/react";

interface WelcomingPreloaderProps {
  children: React.ReactNode;
}

export default function WelcomingPreloader({ children }: WelcomingPreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasShown = sessionStorage.getItem("nyala_splash_shown_v4");
    
    // Duration: 2200ms for initial launch, or skip if already visited in session
    const duration = hasShown ? 600 : 2200;

    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("nyala_splash_shown_v4", "true");
      }, 400); // Transition fade out
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFadingOut(true);
    setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("nyala_splash_shown_v4", "true");
    }, 200);
  };

  return (
    <>
      {mounted && showSplash && (
        <div
          onClick={handleDismiss}
          style={{ zIndex: 99999 }}
          className={`fixed inset-0 w-screen h-screen bg-white dark:bg-[#070D1E] flex flex-col items-center justify-between p-6 sm:p-8 select-none cursor-pointer transition-opacity duration-400 ease-out overflow-hidden ${
            fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          role="dialog"
          aria-label="Memuat aplikasi Nyala UMKT"
        >
          {/* Top Info Bar */}
          <div className="w-full max-w-md flex items-center justify-between opacity-80 pt-2">
            <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
              UMKT 2026 • Live Portal
            </span>
            <button
              onClick={handleDismiss}
              className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-2.5 py-1 rounded-full transition-colors"
            >
              Ketuk untuk lewati ✕
            </button>
          </div>

          {/* Center Mascot & Brand Header */}
          <div className="flex flex-col items-center text-center space-y-5 max-w-sm my-auto">
            {/* Glowing Mascot */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-nyala-500/40 via-amber-400/30 to-nyala-600/30 rounded-full blur-3xl animate-pulse" />
              <div className="relative transform hover:scale-105 transition-transform duration-300">
                <MascotFlame size="xl" mood="excited" className="drop-shadow-2xl" />
              </div>
            </div>

            {/* Brand Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white tracking-tight">
                  Nyala
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-nyala-500/15 text-nyala-600 dark:text-nyala-400 text-[10px] font-black font-mono border border-nyala-500/30">
                  UMKT '26
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
                “Nyala. Teman perjalanan MABA-mu.”
              </p>
            </div>

            {/* Shimmering Progress Bar */}
            <div className="w-52 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative border border-slate-200/80 dark:border-slate-700/80">
              <div className="absolute inset-0 bg-gradient-to-r from-nyala-600 via-amber-400 to-nyala-500 rounded-full animate-[shimmer_1.4s_infinite]" />
            </div>

            {/* Sustainability Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-300/40 dark:border-emerald-800/40 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
              <span>🌱</span>
              <span>Inisiatif Kampus Paperless • SDGs 4, 9, 12, 13</span>
            </div>
          </div>

          {/* Bottom Attribution Credits */}
          <div className="text-center space-y-1 pb-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <ShieldCheck weight="fill" className="w-3.5 h-3.5 text-nyala-600" />
              <span>Submission Lomba Pemeringkatan UMKT (umkt.ac.id/pemeringkatan)</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Karya Al-Ghani Desta Setyawan (@kou.sozo)
            </p>
          </div>
        </div>
      )}

      {children}
    </>
  );
}
