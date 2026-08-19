"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, GraduationCap, ShieldCheck, Globe } from "lucide-react";
import { OFFICIAL_LINKS } from "@/lib/masta-data";

export default function BacklinkBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-navy-50 dark:bg-navy-800/60 border border-navy-200/60 dark:border-navy-700/60 text-xs">
        <div className="flex items-center gap-2 text-navy-700 dark:text-navy-300">
          <GraduationCap className="w-4 h-4 text-nyala-500" />
          <span className="font-medium">Portal Resmi Terverifikasi:</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={OFFICIAL_LINKS.umktMain}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-nyala-600 dark:text-nyala-400 hover:underline"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>umkt.ac.id</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-navy-300 dark:text-navy-600">•</span>
          <a
            href={OFFICIAL_LINKS.mastaOdoo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-nyala-600 dark:text-nyala-400 hover:underline"
          >
            <span>masta-maba.odoo.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 text-white p-6 sm:p-8 border border-navy-700/60 shadow-xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-nyala-500/15 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl -z-0" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nyala-500/20 text-nyala-300 text-xs font-semibold border border-nyala-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Situs Resmi & Terpercaya</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Terhubung Langsung dengan Ekosistem Kampus UMKT
          </h3>
          <p className="text-sm text-navy-300 leading-relaxed">
            Aplikasi Nyala dirancang selaras dengan kurikulum dan pedoman resmi Masa Ta’aruf Mahasiswa Baru (MASTA) Universitas Muhammadiyah Kalimantan Timur.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href={OFFICIAL_LINKS.umktMain}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-nyala-500 hover:bg-nyala-600 text-white font-semibold text-sm transition-all shadow-fire hover:scale-[1.02]"
          >
            <Globe className="w-4 h-4" />
            <span>Website UMKT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={OFFICIAL_LINKS.umktKemahasiswaan}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all border border-white/15 hover:scale-[1.02]"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Kemahasiswaan</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={OFFICIAL_LINKS.mastaOdoo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all border border-white/15 hover:scale-[1.02]"
          >
            <span>Portal MASTA</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
