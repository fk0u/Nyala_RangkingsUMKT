"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MascotFlame, { MascotMood } from "./MascotFlame";
import { Sparkle, Fire, RocketLaunch, GraduationCap } from "@phosphor-icons/react";

interface RouteTransitionConfig {
  mood: MascotMood;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
}

const ROUTE_CONFIGS: Record<string, RouteTransitionConfig> = {
  "/": {
    mood: "happy",
    title: "Meluncur ke Beranda!",
    subtitle: "Mempersiapkan ringkasan dan countdown...",
    badge: "Beranda Utama",
    color: "from-nyala-600 to-amber-500"
  },
  "/hub-umkt": {
    mood: "waving",
    title: "Menghubungkan Portal Kampus",
    subtitle: "Sinkronisasi warta resmi 10 Fakultas dan Biro...",
    badge: "Hub UMKT Live",
    color: "from-navy-800 to-slate-900"
  },
  "/blog": {
    mood: "studying",
    title: "Membuka Majalah Edukasi",
    subtitle: "Memuat tips survival, beasiswa, dan KRS...",
    badge: "Panduan MABA",
    color: "from-amber-600 to-orange-600"
  },
  "/panduan-sikad": {
    mood: "confused",
    title: "Simulasi Portal SIKAD",
    subtitle: "Siapkan NIM dan Password login mahasiswa...",
    badge: "SIKAD 1:1",
    color: "from-orange-600 to-amber-500"
  },
  "/panduan-ti": {
    mood: "coding",
    title: "Mode Ngoding Diaktifkan!",
    subtitle: "HIDUP TEKNIK! NO SKILL NO TRUST!",
    badge: "Akademik TI 2026",
    color: "from-nyala-600 to-red-600"
  },
  "/jadwal": {
    mood: "excited",
    title: "Membuka Agenda dan Rundown",
    subtitle: "Menyesuaikan jadwal 9 Fakultas dan 3 Gelombang...",
    badge: "Jadwal MASTA 2026",
    color: "from-emerald-700 to-teal-700"
  },
  "/checklist": {
    mood: "withClipboard",
    title: "Mengecek Daftar Perlengkapan",
    subtitle: "Pastikan berkas wajib dan dresscode siap!",
    badge: "Checklist MABA",
    color: "from-slate-700 to-navy-900"
  },
  "/health-check": {
    mood: "calm",
    title: "Pemeriksaan Stamina dan Mood",
    subtitle: "Tarik nafas dalam... Siap hadapi hari baru!",
    badge: "Health & Mindset",
    color: "from-rose-600 to-amber-500"
  },
  "/companion": {
    mood: "cheering",
    title: "Nyala AI Siap Membantu!",
    subtitle: "Tanyakan apapun seputar MASTA dan perkuliahan...",
    badge: "Tanya Nyala AI",
    color: "from-nyala-500 to-amber-500"
  },
  "/adminuse": {
    mood: "thinking",
    title: "Mengakses Ruang Kontrol",
    subtitle: "Verifikasi otentikasi kunci sandi admin...",
    badge: "Secure Admin CMS",
    color: "from-slate-800 to-navy-950"
  }
};

const DEFAULT_CONFIG: RouteTransitionConfig = {
  mood: "happy",
  title: "Menyiapkan Halaman...",
  subtitle: "Nyala siap mengantarmu ke tujuan! ✨",
  badge: "Eksplorasi Nyala",
  color: "from-nyala-500 to-amber-500"
};

export default function MascotPageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<RouteTransitionConfig>(DEFAULT_CONFIG);
  const isFirstMount = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Skip on initial landing mount to allow WelcomingPreloader to take priority
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevPathname.current = pathname;
      return;
    }

    // Trigger on genuine route changes
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      // Find matching config or fallback
      const baseRoute = Object.keys(ROUTE_CONFIGS).find(r => 
        r === pathname || (r !== "/" && pathname.startsWith(r))
      );
      const config = baseRoute ? ROUTE_CONFIGS[baseRoute] : DEFAULT_CONFIG;
      
      setCurrentConfig(config);
      setIsTransitioning(true);

      // Snappy, charming duration (~600ms)
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 650);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      {/* ── 1. Top Glowing Progress Bar ── */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 h-1 z-[9999] origin-left bg-gradient-to-r ${currentConfig.color} shadow-lg shadow-nyala-500/50`}
          />
        )}
      </AnimatePresence>

      {/* ── 2. Floating Cute Mascot Motion Toast / Overlay ── */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[9998] pointer-events-none"
          >
            <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-3xl bg-navy-950/90 dark:bg-navy-900/95 backdrop-blur-xl border-2 border-nyala-500/40 text-white shadow-2xl shadow-nyala-500/25 max-w-[340px] sm:max-w-md ring-4 ring-nyala-500/10">
              
              {/* Animated Bouncing Mascot */}
              <motion.div
                animate={{
                  y: [0, -6, 0, -4, 0],
                  rotate: [0, -4, 4, -2, 0],
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="w-14 h-14 flex-shrink-0 flex items-center justify-center relative"
              >
                <div className="absolute inset-0 bg-nyala-500/25 rounded-full blur-md animate-ping" />
                <MascotFlame size="sm" mood={currentConfig.mood} />
              </motion.div>

              {/* Text Info */}
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r ${currentConfig.color} text-white shadow-sm`}>
                    {currentConfig.badge}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-amber-400 font-bold">
                    <Sparkle weight="fill" className="w-3 h-3 animate-spin" />
                    <span>Meluncur</span>
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-extrabold text-white truncate leading-tight">
                  {currentConfig.title}
                </h4>
                
                <p className="text-[11px] text-navy-300 truncate leading-snug">
                  {currentConfig.subtitle}
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. Page Content Transition Container ── */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
}
