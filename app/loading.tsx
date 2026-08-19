"use client";

import React from "react";
import MascotFlame from "@/components/MascotFlame";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 select-none">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-nyala-500/20 animate-ping absolute inset-0 pointer-events-none" />
        <div className="p-3 rounded-full bg-white dark:bg-navy-900 border border-navy-200/60 dark:border-navy-800 shadow-xl relative z-10">
          <MascotFlame size="lg" mood="cheering" className="w-12 h-12" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-extrabold text-navy-900 dark:text-white tracking-tight">
          Memuat Ekosistem Nyala...
        </p>
        <p className="text-xs text-navy-500 dark:text-navy-400 font-mono">
          Sinkronisasi data resmi UMKT 2026
        </p>
      </div>
    </div>
  );
}
