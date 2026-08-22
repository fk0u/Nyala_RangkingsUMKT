import React from "react";
import MascotFlame from "@/components/MascotFlame";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 select-none">
      <div className="flex flex-col items-center space-y-4 text-center">
        {/* Glowing Mascot */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-nyala-500/30 to-amber-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative animate-bounce">
            <MascotFlame size="md" mood="excited" />
          </div>
        </div>

        {/* Text and Shimmer */}
        <div className="space-y-2">
          <p className="text-sm font-bold text-navy-900 dark:text-white">
            Memuat Data Kampus...
          </p>
          <div className="w-40 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-nyala-500 via-amber-400 to-nyala-500 rounded-full animate-[shimmer_1.2s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
