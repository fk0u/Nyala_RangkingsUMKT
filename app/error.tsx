"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowClockwise, 
  House, 
  WhatsappLogo, 
  WarningCircle, 
  ShieldWarning,
  Sparkle
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import { OFFICIAL_CONTACTS } from "@/lib/masta-data";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring if needed
    console.error("Runtime error caught in app/error.tsx:", error);
  }, [error]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute w-96 h-96 rounded-full bg-red-500/10 blur-[120px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none -bottom-20 -right-20" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        
        {/* Animated Mascot in Nervous Mood */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="relative">
            {/* Warning Ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-500/20 via-amber-500/20 to-orange-500/20 blur-xl animate-pulse" />
            
            {/* Mascot */}
            <motion.div
              animate={{
                y: [0, -6, 0, -4, 0],
                rotate: [0, -2, 2, -1, 0]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center"
            >
              <MascotFlame size="xl" mood="nervous" />
            </motion.div>
          </div>

          {/* 500 Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest border border-red-500/20 shadow-sm">
            <WarningCircle weight="bold" className="w-4 h-4 text-red-500" />
            <span>Galat Sistem • Terjadi Kesalahan Teknis</span>
          </div>
        </motion.div>

        {/* Heading & Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 dark:text-white tracking-tight leading-tight">
            Oops, Api Nyala Sedang <br />
            <span className="fire-text-gradient">Kepanasan Sebentar!</span>
          </h1>

          <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 max-w-lg mx-auto leading-relaxed">
            Terjadi kendala tak terduga saat memproses data halaman ini. Jangan khawatir, kamu bisa mencoba memuat ulang atau kembali ke beranda.
          </p>

          {error.digest && (
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-lg bg-navy-100 dark:bg-navy-900 text-navy-600 dark:text-navy-400 text-[11px] font-mono border border-navy-200 dark:border-navy-800">
                Kode Identifikasi: {error.digest}
              </span>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          {/* Retry Button */}
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-nyala-500 to-amber-500 text-white font-extrabold text-sm shadow-xl shadow-nyala-500/25 hover:shadow-nyala-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <ArrowClockwise weight="bold" className="w-4 h-4" />
            <span>Coba Muat Ulang Halaman</span>
          </button>

          {/* Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-navy-900 text-navy-800 dark:text-navy-200 border border-navy-200 dark:border-navy-800 font-bold text-sm hover:bg-navy-50 dark:hover:bg-navy-800 transition-all"
          >
            <House weight="bold" className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          {/* Admin Helpdesk WA */}
          <a
            href={OFFICIAL_CONTACTS[1]?.whatsappUrl || "https://wa.me/6282250878843"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold text-sm hover:bg-emerald-500/20 transition-all"
          >
            <WhatsappLogo weight="fill" className="w-4 h-4" />
            <span>Lapor ke Admin</span>
          </a>
        </motion.div>

      </div>
    </div>
  );
}
