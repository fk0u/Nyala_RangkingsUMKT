"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ExternalLink, Laptop, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { OFFICIAL_LINKS } from "@/lib/masta-data";

export default function TopNotificationBar({
  onOpenSearch,
}: {
  onOpenSearch: () => void;
}) {
  const [witaTime, setWitaTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // WITA is UTC+8
      const formatted = now.toLocaleTimeString("id-ID", {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setWitaTime(`${formatted} WITA`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-50 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white text-xs border-b border-navy-800/80 px-4 sm:px-6 lg:px-8 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Live Status Pill & Announcement */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nyala-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-nyala-500" />
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-extrabold text-[10px] uppercase tracking-wider">
            MASTA 2026
          </span>
          <span className="text-navy-200 text-xs hidden sm:inline">
            Selamat datang Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur!
          </span>
          <Link
            href="/jadwal"
            className="hidden md:inline-flex items-center gap-1 font-bold text-nyala-400 hover:text-nyala-300 transition-colors"
          >
            <span>Lihat Alur 5 Tahap</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Right: Quick Portal Link, Live WITA Clock & Search Trigger */}
        <div className="flex items-center gap-3 text-xs">
          
          {/* SIKAD Portal Quick Link */}
          <a
            href={OFFICIAL_LINKS.sikadMahasiswa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 hover:text-white transition-all font-semibold text-[11px]"
          >
            <Laptop className="w-3 h-3" />
            <span>mahasiswa.umkt.ac.id</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          {/* Quick Search Shortcut Trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-navy-200 hover:text-white transition-all text-[11px] font-medium"
          >
            <span>Cari</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono font-bold text-white border border-white/20">
              Ctrl+K
            </kbd>
          </button>

          {/* WITA Live Clock */}
          {witaTime && (
            <div className="hidden lg:flex items-center gap-1.5 text-navy-400 font-mono text-[11px]">
              <Clock className="w-3 h-3 text-nyala-400" />
              <span>{witaTime}</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
