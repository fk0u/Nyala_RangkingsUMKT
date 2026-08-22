import React from "react";
import MascotFlame from "@/components/MascotFlame";

export default function MobileLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 select-none max-w-lg mx-auto">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-nyala-500/30 to-amber-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative animate-bounce">
            <MascotFlame size="md" mood="excited" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-navy-900 dark:text-white">
            Memuat Modul Nyala...
          </p>
          <div className="w-36 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-nyala-500 via-amber-400 to-nyala-500 rounded-full animate-[shimmer_1.2s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
