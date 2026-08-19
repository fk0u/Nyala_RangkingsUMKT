"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowClockwise, House, WarningCircle } from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App boundary error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center space-y-6 px-4 text-center select-none">
      <div className="p-4 rounded-full bg-nyala-500/10 border border-nyala-500/20 shadow-xl">
        <MascotFlame size="xl" mood="confused" />
      </div>

      <div className="max-w-md space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold">
          <WarningCircle weight="fill" className="w-4 h-4" />
          <span>Terjadi Kendala Teknis</span>
        </div>
        <h1 className="text-2xl font-black text-navy-900 dark:text-white">
          Waduh, Sambungan Sedang Terganggu
        </h1>
        <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
          Nyala sedang berusaha memulihkan data. Coba muat ulang halaman ini atau kembali ke Beranda utama.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-nyala-500 hover:bg-nyala-600 text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-nyala-500/25"
        >
          <ArrowClockwise weight="bold" className="w-4 h-4" />
          <span>Muat Ulang</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 dark:hover:bg-navy-700 text-navy-800 dark:text-navy-200 text-xs font-bold transition-all"
        >
          <House weight="bold" className="w-4 h-4" />
          <span>Ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
