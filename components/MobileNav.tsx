"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  House, 
  Sparkle, 
  Code, 
  Laptop, 
  CalendarCheck, 
  CheckSquare, 
  Heartbeat, 
  Newspaper, 
  Headset, 
  BookOpenText, 
  X,
  CaretUp,
  Fire,
  GridFour
} from "@phosphor-icons/react";
import AdminHelpModal from "./AdminHelpModal";
import MascotFlame from "./MascotFlame";

export default function MobileNav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const PRIMARY_TABS = [
    { href: "/", label: "Beranda", icon: House },
    { href: "/panduan-ti", label: "Akademik", icon: Code, badge: "TI" },
    { href: "/companion", label: "Tanya AI", icon: Sparkle, isCenter: true },
    { href: "/jadwal", label: "Persiapan", icon: CalendarCheck, badge: "Alur" },
    { href: "/blog", label: "Warta", icon: Newspaper, badge: "Live" },
  ];

  const QUICK_APPS = [
    { href: "/panduan-ti", label: "Kurikulum TI 2026", desc: "Dosen, standar nilai S.Kom & karir", icon: Code, color: "text-nyala-500 bg-nyala-500/10" },
    { href: "/panduan-sikad", label: "Simulator SIKAD", desc: "KRS, presensi 75%, tagihan SPP", icon: Laptop, color: "text-blue-500 bg-blue-500/10" },
    { href: "/jadwal", label: "Alur 5 Tahap MASTA", desc: "Daring (24/26) & Luring (28 Agt)", icon: CalendarCheck, color: "text-amber-500 bg-amber-500/10" },
    { href: "/checklist", label: "Checklist Berkas", desc: "Kelengkapan & pakaian resmi", icon: CheckSquare, color: "text-emerald-500 bg-emerald-500/10" },
    { href: "/health-check", label: "Health & Mood Check", desc: "Kesiapan fisik & mental MABA", icon: Heartbeat, color: "text-rose-500 bg-rose-500/10" },
    { href: "/tentang-masta", label: "Edukasi & 4 Pilar", desc: "Nilai AIK & pedoman orientasi", icon: BookOpenText, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <>
      {/* ── NATIVE APP BOTTOM TAB BAR (iOS & Android Style) ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 select-none">
        
        {/* Native Frosted Bar Container */}
        <nav className="w-full bg-white/92 dark:bg-navy-950/92 backdrop-blur-2xl border-t border-navy-200/60 dark:border-navy-800/80 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 pt-1 pb-safe max-w-2xl mx-auto flex items-center justify-around">
          
          {PRIMARY_TABS.map((tab) => {
            const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
            const Icon = tab.icon;

            // Center Elevated AI Companion Button
            if (tab.isCenter) {
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="relative -top-3 flex flex-col items-center group active:scale-90 transition-transform"
                >
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-nyala-600 via-nyala-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-nyala-500/40 border-2 border-white dark:border-navy-900 relative">
                    <Sparkle weight="fill" className="w-6 h-6 animate-pulse" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-navy-900" />
                  </div>
                  <span className="text-[10px] font-black text-nyala-600 dark:text-nyala-400 mt-1">
                    {tab.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all relative active:scale-90 min-w-[58px] ${
                  isActive
                    ? "text-nyala-600 dark:text-nyala-400 font-extrabold"
                    : "text-navy-500 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200 font-medium"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="native-tab-indicator"
                    className="absolute inset-0 bg-nyala-500/12 dark:bg-nyala-500/20 rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                
                <div className="relative">
                  <Icon 
                    weight={isActive ? "fill" : "bold"} 
                    className={`w-5 h-5 transition-transform ${isActive ? "scale-110 text-nyala-500" : ""}`} 
                  />
                  {tab.badge && !isActive && (
                    <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full bg-navy-200 dark:bg-navy-800 text-[8px] font-bold text-navy-600 dark:text-navy-300">
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span className="text-[10px] tracking-tight mt-1">
                  {tab.label}
                </span>
              </Link>
            );
          })}

          {/* More Apps Drawer Trigger Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-2xl text-navy-500 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200 font-medium active:scale-90 transition-transform min-w-[50px]"
          >
            <GridFour weight="bold" className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-1">
              Menu
            </span>
          </button>

        </nav>
      </div>

      {/* ── NATIVE iOS / ANDROID BOTTOM ACTION SHEET MODAL ── */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-navy-950/70 backdrop-blur-md">
            
            {/* Backdrop click to dismiss */}
            <div className="flex-1" onClick={() => setDrawerOpen(false)} />

            {/* Bottom Sheet Card */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="bg-white dark:bg-navy-900 rounded-t-[32px] p-6 pb-safe border-t border-navy-200 dark:border-navy-800 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
            >
              {/* Native iOS Grabber Handle */}
              <div className="flex justify-center -mt-2">
                <div className="w-12 h-1.5 rounded-full bg-navy-300 dark:bg-navy-700" />
              </div>

              {/* Sheet Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MascotFlame size="sm" className="w-7 h-7" />
                  <div>
                    <h3 className="text-base font-black text-navy-900 dark:text-white">
                      Semua Fitur & Ekosistem Nyala
                    </h3>
                    <p className="text-xs text-navy-500 dark:text-navy-400">
                      Pusat navigasi cepat MABA UMKT 2026
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300"
                >
                  <X weight="bold" className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Apps Grid */}
              <div className="grid grid-cols-2 gap-3">
                {QUICK_APPS.map((app) => {
                  const Icon = app.icon;
                  return (
                    <Link
                      key={app.href}
                      href={app.href}
                      onClick={() => setDrawerOpen(false)}
                      className="p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950/80 border border-navy-100 dark:border-navy-800/80 space-y-2 hover:border-nyala-500/50 active:scale-95 transition-all flex flex-col justify-between"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${app.color}`}>
                        <Icon weight="bold" className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-navy-900 dark:text-white leading-tight">
                          {app.label}
                        </h4>
                        <p className="text-[10px] text-navy-500 dark:text-navy-400 line-clamp-1 mt-0.5">
                          {app.desc}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Direct Official Admin Help Callout in Drawer */}
              <div className="pt-2 border-t border-navy-100 dark:border-navy-800">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setAdminModalOpen(true);
                  }}
                  className="w-full p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-between active:scale-95 transition-all"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                      <Headset weight="bold" className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black">
                        Hubungi Admin Resmi UMKT
                      </h4>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                        Biro Kemahasiswaan (Gedung C) & PMB
                      </p>
                    </div>
                  </div>
                  <CaretUp weight="bold" className="w-4 h-4 rotate-90 text-emerald-600" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AdminHelpModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </>
  );
}
