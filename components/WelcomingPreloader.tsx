"use client";

import React, { useState, useEffect } from "react";
import MascotFlame from "./MascotFlame";
import { Sparkle, ShieldCheck } from "@phosphor-icons/react";

interface WelcomingPreloaderProps {
  children: React.ReactNode;
}

export default function WelcomingPreloader({ children }: WelcomingPreloaderProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Check if splash was already shown in this session
    const hasShown = sessionStorage.getItem("nyala_splash_shown_v2");
    
    // Duration: 900ms for first view, or 400ms for immediate re-views
    const duration = hasShown ? 400 : 1000;

    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("nyala_splash_shown_v2", "true");
      }, 350); // Fade out transition duration
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setFadingOut(true);
    setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("nyala_splash_shown_v2", "true");
    }, 200);
  };

  return (
    <>
      {showSplash && (
        <div
          onClick={handleDismiss}
          className={`fixed inset-0 z-9999 bg-white dark:bg-[#070D1E] flex flex-col items-center justify-between p-8 select-none cursor-pointer transition-opacity duration-350 ease-out ${
            fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          role="dialog"
          aria-label="Memuat aplikasi Nyala"
        >
          {/* Top spacer */}
          <div className="w-full flex items-center justify-between opacity-70">
            <span className="text-[11px] font-mono font-bold text-slate-400">
              UMKT 2026 • Live Portal
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Sentuh untuk lewati
            </span>
          </div>

          {/* Center Mascot & Brand */}
          <div className="flex flex-col items-center text-center space-y-5 max-w-sm">
            {/* Mascot with glowing ember aura */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-nyala-500/30 to-amber-400/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative transform hover:scale-105 transition-transform">
                <MascotFlame size="xl" mood="excited" className="drop-shadow-xl" />
              </div>
            </div>

            {/* Brand Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white tracking-tight">
                  Nyala
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-nyala-500/15 text-nyala-600 dark:text-nyala-400 text-[10px] font-black font-mono border border-nyala-500/30">
                  2026
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
                “Nyala. Teman perjalanan MABA-mu.”
              </p>
            </div>

            {/* Shimmering Progress Bar */}
            <div className="w-48 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-nyala-600 via-amber-400 to-nyala-500 rounded-full animate-[shimmer_1.2s_infinite]" />
            </div>

            {/* Sustainability Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-300/40 dark:border-emerald-800/40 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
              <span>🌱</span>
              <span>Inisiatif Kampus Paperless • SDGs 4, 9, 12, 13</span>
            </div>
          </div>

          {/* Bottom Attribution */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <ShieldCheck weight="fill" className="w-3.5 h-3.5 text-nyala-600" />
              <span>Submission Lomba Pemeringkatan UMKT (rankings.umkt.ac.id)</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Karya Al-Ghani Desta Setyawan (@kou.sozo)
            </p>
          </div>
        </div>
      )}

      {children}
    </>
  );
}
