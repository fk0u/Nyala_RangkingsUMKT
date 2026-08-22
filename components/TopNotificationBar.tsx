"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CaretRight, 
  Clock, 
  ArrowSquareOut, 
  Laptop, 
  Newspaper 
} from "@phosphor-icons/react";
import { OFFICIAL_LINKS } from "@/lib/masta-data";

export default function TopNotificationBar({
  onOpenSearch,
}: {
  onOpenSearch: () => void;
}) {
  const [witaTime, setWitaTime] = useState("");

  useEffect(() => {
    const update = () => {
      setWitaTime(
        new Date().toLocaleTimeString("id-ID", {
          timeZone: "Asia/Makassar",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="z-50 w-full bg-navy-950 text-white/90 text-[11px] border-b border-navy-800/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between gap-4">

        {/* Left: Broadcast Announcement */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold text-white/70 uppercase tracking-wider text-[10px] flex-shrink-0 font-mono">
            MASTA 2026
          </span>
          <span className="text-white/40 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-white/70 truncate">
            Selamat datang Mahasiswa Baru UMKT!
          </span>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-nyala-400 hover:text-nyala-300 font-semibold transition-colors flex-shrink-0 text-[10px]"
          >
            <Newspaper weight="bold" className="w-3 h-3" />
            <span>Blog MABA</span>
            <CaretRight weight="bold" className="w-2.5 h-2.5" />
          </Link>
        </div>

        {/* Right: Portal SIKAD & WITA Time */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <a
            href={OFFICIAL_LINKS.sikadMahasiswa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-300 hover:text-blue-200 font-bold transition-colors"
          >
            <Laptop weight="bold" className="w-3.5 h-3.5" />
            <span>Portal SIKAD</span>
            <ArrowSquareOut weight="bold" className="w-2.5 h-2.5 opacity-60" />
          </a>

          {witaTime && (
            <span className="hidden sm:inline-flex items-center gap-1 text-white/50 font-mono tabular-nums text-[10px] pl-3 border-l border-white/10">
              <Clock weight="bold" className="w-3 h-3 text-white/40" />
              <span>{witaTime} WITA</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
