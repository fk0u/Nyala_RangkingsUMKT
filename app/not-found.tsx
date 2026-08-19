"use client";

import React from "react";
import Link from "next/link";
import { House, Sparkle, BookOpenText } from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center space-y-6 px-4 text-center select-none">
      <div className="p-4 rounded-full bg-nyala-500/10 border border-nyala-500/20 shadow-xl">
        <MascotFlame size="xl" mood="confused" />
      </div>

      <div className="max-w-md space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-nyala-500 font-mono">
          ERROR 404 • NOT FOUND
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
          Sepertinya tautan yang kamu cari sudah berpindah atau belum tersedia. Jangan khawatir, kamu bisa kembali ke panduan resmi.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-nyala-500 hover:bg-nyala-600 text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-nyala-500/25"
        >
          <House weight="bold" className="w-4 h-4" />
          <span>Ke Beranda</span>
        </Link>

        <Link
          href="/panduan"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 dark:hover:bg-navy-700 text-navy-800 dark:text-navy-200 text-xs font-bold transition-all"
        >
          <BookOpenText weight="bold" className="w-4 h-4" />
          <span>Buka Panduan Edukasi</span>
        </Link>

        <Link
          href="/companion"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold transition-all hover:bg-amber-500/20"
        >
          <Sparkle weight="fill" className="w-4 h-4" />
          <span>Tanya AI Nyala</span>
        </Link>
      </div>
    </div>
  );
}
