"use client";

import React, { useState } from "react";
import { parseSDGString, OFFICIAL_SDGS, SDGInfo } from "@/lib/sdg-data";
import { Info, X, Globe, Sparkle } from "@phosphor-icons/react";

interface SDGBadgeProps {
  sdg: string | number | { id?: number; sdgs?: string; color?: string };
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  interactive?: boolean;
  className?: string;
}

export default function SDGBadge({
  sdg,
  size = "md",
  showLabel = true,
  interactive = true,
  className = "",
}: SDGBadgeProps) {
  const [modalOpen, setModalOpen] = useState(false);

  let rawString = "";
  if (typeof sdg === "number") {
    rawString = `SDG ${sdg}`;
  } else if (typeof sdg === "string") {
    rawString = sdg;
  } else if (sdg && typeof sdg === "object") {
    rawString = sdg.sdgs || `SDG ${sdg.id || 4}`;
  }

  const info: SDGInfo = parseSDGString(rawString) || {
    id: 12,
    code: rawString || "SDG 12",
    nameIndo: "Keberlanjutan Kampus",
    nameEng: "Sustainable Campus",
    color: "#3F7E44",
    icon: "🌱",
    description: "Inisiatif keberlanjutan dan digitalisasi ramah lingkungan UMKT.",
    umktImplementation: "Penerapan sistem paperless dan efisiensi energi orientasi MABA.",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3.5 py-1.5 text-sm gap-2",
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          if (interactive) {
            e.stopPropagation();
            setModalOpen(true);
          }
        }}
        style={{
          backgroundColor: info.color,
        }}
        className={`inline-flex items-center rounded-full font-bold text-white shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer select-none ${sizeClasses[size]} ${className}`}
        title={`${info.code}: ${info.nameIndo} (${info.nameEng})`}
      >
        <span className="text-xs">{info.icon}</span>
        <span className="font-black tracking-tight">{info.code}</span>
        {showLabel && (
          <span className="opacity-90 font-medium hidden sm:inline truncate max-w-[120px]">
            • {info.nameIndo}
          </span>
        )}
      </button>

      {/* Interactive Modal for SDG Impact Explanation */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white dark:bg-navy-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-navy-700 shadow-2xl space-y-4 text-left select-none relative overflow-hidden"
          >
            {/* Top Color Accent Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-2"
              style={{ backgroundColor: info.color }}
            />

            <div className="flex items-start justify-between gap-3 pt-1">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl text-white shadow-sm flex-shrink-0"
                  style={{ backgroundColor: info.color }}
                >
                  {info.icon}
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono">
                    UN Sustainable Development Goals
                  </div>
                  <h3 className="text-lg font-black text-navy-950 dark:text-white leading-tight">
                    {info.code}: {info.nameIndo}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {info.nameEng}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-500 hover:text-navy-950 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X weight="bold" className="w-4 h-4" />
              </button>
            </div>

            {/* Target Description */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-navy-950 dark:text-white block mb-1">🎯 Target Global PBB:</strong>
              {info.description}
            </div>

            {/* Nyala & UMKT Implementation */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-300/40 dark:border-emerald-800/40 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300">
                <Sparkle weight="fill" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Penerapan di Nyala & UMKT:</span>
              </div>
              <p className="text-emerald-950 dark:text-emerald-200 leading-relaxed">
                {info.umktImplementation}
              </p>
            </div>

            {/* Portal Link */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">
                Pemeringkatan UMKT 2026
              </span>
              <a
                href="https://rankings.umkt.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-nyala-600 dark:text-nyala-400 font-bold hover:underline"
              >
                <Globe weight="bold" className="w-3.5 h-3.5" />
                <span>rankings.umkt.ac.id</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
