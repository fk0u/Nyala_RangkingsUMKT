"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  MessageSquareHeart, 
  HeartPulse, 
  CalendarDays, 
  CheckSquare, 
  BookOpenText,
  Laptop,
  Code2,
  Flame,
  Search,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import MascotFlame from "./MascotFlame";
import { OFFICIAL_LINKS } from "@/lib/masta-data";

export default function Navbar({
  onOpenSearch,
}: {
  onOpenSearch?: () => void;
}) {
  const pathname = usePathname();
  const [akademikDropdownOpen, setAkademikDropdownOpen] = useState(false);
  const [persiapanDropdownOpen, setPersiapanDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setAkademikDropdownOpen(false);
    setPersiapanDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/85 dark:bg-navy-950/85 border-b border-navy-200/60 dark:border-navy-800/80 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* 1. BRAND LOGO & MASCOT */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-nyala-500/20 rounded-full blur-sm group-hover:bg-nyala-500/40 transition-colors" />
            <MascotFlame size="sm" className="relative w-8 h-8 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-navy-900 dark:text-white">
                Nyala
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-nyala-500/15 text-nyala-600 dark:text-nyala-400 border border-nyala-500/25">
                UMKT '26
              </span>
            </div>
            <span className="text-[10px] font-semibold text-navy-400 dark:text-navy-400 hidden sm:inline -mt-0.5">
              Teman perjalanan MABA-mu.
            </span>
          </div>
        </Link>

        {/* 2. DESKTOP ADVANCED NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1.5">
          
          {/* Beranda */}
          <Link
            href="/"
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              pathname === "/"
                ? "text-nyala-600 dark:text-nyala-400 bg-nyala-500/10 font-extrabold"
                : "text-navy-700 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-100/60 dark:hover:bg-navy-800/60"
            }`}
          >
            Beranda
          </Link>

          {/* Dropdown: Akademik & SIKAD */}
          <div 
            className="relative"
            onMouseEnter={() => setAkademikDropdownOpen(true)}
            onMouseLeave={() => setAkademikDropdownOpen(false)}
          >
            <button
              onClick={() => setAkademikDropdownOpen((prev) => !prev)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname.startsWith("/panduan") || pathname === "/tentang-masta"
                  ? "text-nyala-600 dark:text-nyala-400 bg-nyala-500/10 font-extrabold"
                  : "text-navy-700 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-100/60 dark:hover:bg-navy-800/60"
              }`}
            >
              <span>Akademik & SIKAD</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${akademikDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {akademikDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-80 mt-1 p-2 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 shadow-2xl space-y-1"
                >
                  <Link
                    href="/panduan-ti"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800/70 transition-all group"
                  >
                    <div className="p-2 rounded-xl bg-nyala-500/10 text-nyala-500 group-hover:bg-nyala-500 group-hover:text-white transition-colors">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-navy-900 dark:text-white">Prodi Teknologi Informasi</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">2026</span>
                      </div>
                      <p className="text-[11px] text-navy-500 dark:text-navy-400 line-clamp-1">
                        Visi 2037, Kurikulum 4 Semester, Dosen & Gaji IT
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/panduan-sikad"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800/70 transition-all group"
                  >
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-navy-900 dark:text-white">Portal SIKAD UMKT</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold">1:1 Simulator</span>
                      </div>
                      <p className="text-[11px] text-navy-500 dark:text-navy-400 line-clamp-1">
                        Simulasi KRS, Jadwal, Tagihan VA & Presensi 75%
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/tentang-masta"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800/70 transition-all group"
                  >
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <BookOpenText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-navy-900 dark:text-white">Edukasi & 4 Pilar MASTA</span>
                      <p className="text-[11px] text-navy-500 dark:text-navy-400 line-clamp-1">
                        Esensi orientasi, tata nilai & FAQ resmi
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dropdown: Persiapan MABA */}
          <div 
            className="relative"
            onMouseEnter={() => setPersiapanDropdownOpen(true)}
            onMouseLeave={() => setPersiapanDropdownOpen(false)}
          >
            <button
              onClick={() => setPersiapanDropdownOpen((prev) => !prev)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname === "/jadwal" || pathname === "/checklist" || pathname === "/health-check"
                  ? "text-nyala-600 dark:text-nyala-400 bg-nyala-500/10 font-extrabold"
                  : "text-navy-700 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-100/60 dark:hover:bg-navy-800/60"
              }`}
            >
              <span>Persiapan MABA</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${persiapanDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {persiapanDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-72 mt-1 p-2 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 shadow-2xl space-y-1"
                >
                  <Link
                    href="/jadwal"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800/70 transition-all group"
                  >
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <CalendarDays className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-navy-900 dark:text-white">Alur 5 Tahap MASTA</span>
                      <p className="text-[11px] text-navy-500 dark:text-navy-400 line-clamp-1">
                        Timeline interaktif & pro-tips tiap sesi
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/checklist"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800/70 transition-all group"
                  >
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-navy-900 dark:text-white">Checklist Perlengkapan</span>
                      <p className="text-[11px] text-navy-500 dark:text-navy-400 line-clamp-1">
                        Atribut, pakaian, berkas & task kustom
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/health-check"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800/70 transition-all group"
                  >
                    <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-navy-900 dark:text-white">Health Check & Mood</span>
                      <p className="text-[11px] text-navy-500 dark:text-navy-400 line-clamp-1">
                        Asesmen fisik, nutrisi & mood harian
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tanya Nyala AI Link */}
          <Link
            href="/companion"
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              pathname === "/companion"
                ? "text-nyala-600 dark:text-nyala-400 bg-nyala-500/10 font-extrabold"
                : "text-navy-700 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-100/60 dark:hover:bg-navy-800/60"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-nyala-500" />
            <span>Tanya Nyala</span>
            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-nyala-500 text-white">
              AI
            </span>
          </Link>

        </nav>

        {/* 3. RIGHT CONTROLS: SEARCH, THEME TOGGLE & PRIMARY CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Command Search Trigger */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl bg-navy-100/80 dark:bg-navy-800/80 text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-200 dark:hover:bg-navy-700 transition-all flex items-center gap-1.5 text-xs"
              title="Buka Pencarian Cepat (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-nyala-500" />
              <span className="hidden xl:inline text-[11px] font-semibold text-navy-500 dark:text-navy-400">
                Pencarian
              </span>
            </button>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Chat AI Button CTA */}
          <Link
            href="/companion"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-nyala-500 via-amber-500 to-nyala-600 text-white text-xs sm:text-sm font-extrabold shadow-fire hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Chat Nyala AI</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* MOBILE EXPANDED MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-navy-200 dark:border-navy-800 bg-white/95 dark:bg-navy-950/95 backdrop-blur-2xl px-4 py-5 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/panduan-ti"
                className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 space-y-1"
              >
                <Code2 className="w-4 h-4 text-nyala-500" />
                <span className="text-xs font-bold block text-navy-900 dark:text-white">Akademik TI</span>
                <span className="text-[10px] text-navy-400 block">Kurikulum 2026</span>
              </Link>

              <Link
                href="/panduan-sikad"
                className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 space-y-1"
              >
                <Laptop className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold block text-navy-900 dark:text-white">SIKAD UMKT</span>
                <span className="text-[10px] text-navy-400 block">1:1 Simulator</span>
              </Link>

              <Link
                href="/jadwal"
                className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 space-y-1"
              >
                <CalendarDays className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold block text-navy-900 dark:text-white">Alur MASTA</span>
                <span className="text-[10px] text-navy-400 block">Timeline 5 Tahap</span>
              </Link>

              <Link
                href="/checklist"
                className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 space-y-1"
              >
                <CheckSquare className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold block text-navy-900 dark:text-white">Checklist</span>
                <span className="text-[10px] text-navy-400 block">Berkas & Atribut</span>
              </Link>

              <Link
                href="/health-check"
                className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 space-y-1"
              >
                <HeartPulse className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold block text-navy-900 dark:text-white">Health Check</span>
                <span className="text-[10px] text-navy-400 block">Fisik & Mood</span>
              </Link>

              <Link
                href="/companion"
                className="p-3 rounded-2xl bg-gradient-to-br from-nyala-500/10 to-amber-500/10 border border-nyala-500/30 space-y-1"
              >
                <Sparkles className="w-4 h-4 text-nyala-500" />
                <span className="text-xs font-bold block text-navy-900 dark:text-white">Tanya Nyala AI</span>
                <span className="text-[10px] text-nyala-600 dark:text-nyala-400 block font-bold">Live Companion</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
