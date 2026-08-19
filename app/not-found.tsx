"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  House, 
  Sparkle, 
  Calendar, 
  Globe, 
  BookOpenText, 
  MagnifyingGlass, 
  ArrowLeft,
  Headset,
  Compass
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        
        {/* Animated Mascot in Confused Mood */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <motion.div
            animate={{
              y: [0, -8, 0, -5, 0],
              rotate: [0, -3, 3, -2, 0]
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
            className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center"
          >
            <MascotFlame size="xl" mood="confused" />
          </motion.div>
        </motion.div>

        {/* Heading & Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 dark:text-white tracking-tight leading-tight">
            Waduh, Kamu Tersesat di <br />
            <span className="fire-text-gradient">Lorong Kampus UMKT!</span>
          </h1>

          <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 max-w-lg mx-auto leading-relaxed">
            Halaman atau tautan yang kamu tuju sepertinya sudah dipindahkan, keliru diketik, atau ruangannya belum dibuka oleh panitia.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-nyala-500 to-amber-500 text-white font-extrabold text-sm shadow-xl shadow-nyala-500/25 hover:shadow-nyala-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <House weight="bold" className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/jadwal"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-navy-900 text-navy-800 dark:text-navy-200 border border-navy-200 dark:border-navy-800 font-bold text-sm hover:bg-navy-50 dark:hover:bg-navy-800 transition-all"
          >
            <Calendar weight="bold" className="w-4 h-4 text-emerald-500" />
            <span>Cek Jadwal MASTA</span>
          </Link>

          <Link
            href="/companion"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-navy-900 text-navy-800 dark:text-navy-200 border border-navy-200 dark:border-navy-800 font-bold text-sm hover:bg-navy-50 dark:hover:bg-navy-800 transition-all"
          >
            <Sparkle weight="bold" className="w-4 h-4 text-amber-500" />
            <span>Tanya Nyala AI</span>
          </Link>
        </motion.div>

        {/* Quick Route Shortcuts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-6 border-t border-navy-200/80 dark:border-navy-800/80"
        >
          <p className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wider mb-4">
            Atau Jelajahi Rute Utama Lainnya:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto">
            {[
              { label: "Hub Kampus", href: "/hub-umkt", icon: Globe, color: "text-blue-500" },
              { label: "Panduan MABA", href: "/blog", icon: BookOpenText, color: "text-indigo-500" },
              { label: "Simulasi SIKAD", href: "/panduan-sikad", icon: Compass, color: "text-amber-500" },
              { label: "Akademik TI", href: "/panduan-ti", icon: Sparkle, color: "text-nyala-500" },
            ].map((shortcut, idx) => {
              const Icon = shortcut.icon;
              return (
                <Link
                  key={idx}
                  href={shortcut.href}
                  className="flex items-center gap-2 p-3 rounded-2xl bg-white/60 dark:bg-navy-900/60 border border-navy-200/60 dark:border-navy-800 hover:border-nyala-500/40 hover:bg-white dark:hover:bg-navy-800 transition-all text-xs font-bold text-navy-700 dark:text-navy-300 group"
                >
                  <Icon weight="bold" className={`w-4 h-4 ${shortcut.color} group-hover:scale-110 transition-transform`} />
                  <span className="truncate">{shortcut.label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
