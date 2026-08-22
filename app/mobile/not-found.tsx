"use client";

import React from "react";
import Link from "next/link";
import { House, CalendarCheck, Sparkle, Newspaper, ArrowLeft } from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import DuolingoButton from "@/components/flutter/DuolingoButton";

export default function MobileNotFound() {
  return (
    <div className="p-4 sm:p-5 max-w-lg mx-auto space-y-5 pb-24">
      
      {/* 404 Main Card */}
      <DuolingoCard variant="surface" className="text-center p-6 space-y-4">
        <div className="w-24 h-24 mx-auto flex items-center justify-center">
          <MascotFlame size="lg" mood="confused" />
        </div>

        <div className="space-y-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-[10px] font-mono font-bold">
            ERROR 404 • NOT FOUND
          </span>
          <h1 className="text-xl font-black text-navy-950 dark:text-white">
            Waduh, Kamu Tersesat!
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Halaman atau fitur yang kamu cari tidak ditemukan atau telah dipindahkan ke modul lain.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <Link href="/mobile" className="block w-full">
            <DuolingoButton variant="primary" fullWidth size="md">
              <House weight="bold" className="w-4 h-4 mr-1.5" />
              <span>Kembali ke Beranda</span>
            </DuolingoButton>
          </Link>

          <Link href="/mobile/jadwal" className="block w-full">
            <DuolingoButton variant="surface" fullWidth size="md">
              <CalendarCheck weight="bold" className="w-4 h-4 mr-1.5 text-emerald-500" />
              <span>Lihat Jadwal MASTA</span>
            </DuolingoButton>
          </Link>
        </div>
      </DuolingoCard>

      {/* Quick Shortcuts */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-1">
          Menu Alternatif Cepat:
        </span>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/mobile/hub-umkt"
            className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-navy-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-bold text-navy-950 dark:text-white active:scale-95 transition-transform"
          >
            <Newspaper weight="bold" className="w-4 h-4 text-nyala-500" />
            <span>Hub Warta</span>
          </Link>

          <Link
            href="/mobile/companion"
            className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-navy-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-bold text-navy-950 dark:text-white active:scale-95 transition-transform"
          >
            <Sparkle weight="bold" className="w-4 h-4 text-amber-500" />
            <span>Tanya Nyala AI</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
