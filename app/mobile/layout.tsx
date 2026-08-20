"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  House, 
  Sparkle, 
  CalendarCheck, 
  Globe, 
  Laptop, 
  Code, 
  MagnifyingGlass, 
  GridFour, 
  X,
  CheckSquare,
  Heartbeat,
  Headset,
  BookOpenText,
  Monitor,
  Compass,
  ArrowSquareOut
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood } from "@/components/MascotFlame";
import ThemeToggle from "@/components/ThemeToggle";
import CommandSearchModal from "@/components/CommandSearchModal";
import MobileOnboarding from "@/components/MobileOnboarding";
import AdminHelpModal from "@/components/AdminHelpModal";

export default function MobileAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const handleSwitchToDesktop = () => {
    document.cookie = "nyala_view_preference=desktop; path=/; max-age=31536000";
    const desktopPath = pathname.replace(/^\/mobile/, "") || "/";
    router.push(desktopPath);
  };

  const handleReplayOnboarding = () => {
    setMenuDrawerOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-nyala-onboarding"));
    }
  };

  const PRIMARY_MOBILE_TABS = [
    { href: "/mobile", label: "Beranda", icon: House },
    { href: "/mobile/jadwal", label: "Jadwal", icon: CalendarCheck },
    { href: "/mobile/companion", label: "Tanya AI", icon: Sparkle, isCenter: true },
    { href: "/mobile/panduan-sikad", label: "SIKAD", icon: Laptop },
    { href: "/mobile/hub-umkt", label: "Hub", icon: Globe },
  ];

  const DRAWER_ITEMS = [
    { href: "/mobile/panduan-ti", label: "Kurikulum Prodi TI", desc: "Paket 20 SKS, standar nilai & dosen", icon: Code, color: "bg-red-500/10 text-red-400" },
    { href: "/mobile/checklist", label: "Checklist Persiapan", desc: "Berkas wajib & perlengkapan seragam", icon: CheckSquare, color: "bg-amber-500/10 text-amber-400" },
    { href: "/mobile/health-check", label: "Health & Mood Check", desc: "Evaluasi kesiapan fisik & mental", icon: Heartbeat, color: "bg-rose-500/10 text-rose-400" },
    { href: "/mobile/blog", label: "Majalah Edukasi MABA", desc: "Tips adaptasi, kos & beasiswa", icon: BookOpenText, color: "bg-indigo-500/10 text-indigo-400" },
    { href: "/mobile/tentang-masta", label: "Pedoman & Nilai AIK", desc: "Tata tertib & esensi orientasi", icon: Compass, color: "bg-emerald-500/10 text-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-[#070B19] text-white flex flex-col selection:bg-nyala-500 selection:text-white">
      
      {/* ── 1. NATIVE APPLICATION TOP HEADER BAR ── */}
      <header className="sticky top-0 z-40 bg-[#070B19]/90 backdrop-blur-xl border-b border-navy-800/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand & Active Identity */}
          <Link href="/mobile" className="flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-nyala-600 via-nyala-500 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-[#0A0F24] flex items-center justify-center">
                <MascotFlame size="sm" mood="excited" className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-white leading-none">
                  Nyala <span className="text-nyala-500">MABA</span>
                </span>
                <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-nyala-500/20 text-nyala-400 border border-nyala-500/30">
                  UMKT 2026
                </span>
              </div>
              <span className="text-[11px] text-navy-400 font-medium hidden sm:block">
                Aplikasi Pendamping Resmi Mahasiswa Baru
              </span>
            </div>
          </Link>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-900/90 border border-navy-800 text-navy-300 hover:text-white active:scale-95 transition-all cursor-pointer text-xs"
            >
              <MagnifyingGlass weight="bold" className="w-4 h-4 text-nyala-400" />
              <span className="hidden md:inline">Cari materi (Ctrl+K)...</span>
            </button>

            <button
              onClick={() => setAdminModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Headset weight="bold" className="w-4 h-4" />
              <span>Admin Gedung C</span>
            </button>

            <button
              onClick={() => setMenuDrawerOpen(true)}
              className="p-2.5 rounded-xl bg-navy-900/90 border border-navy-800 text-navy-300 hover:text-white active:scale-90 transition-transform cursor-pointer"
              title="Semua Modul"
            >
              <GridFour weight="bold" className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* ── 2. MAIN APPLICATION CONTENT VIEWPORT ── */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-28 space-y-6">
        {children}
      </main>

      {/* ── 3. NATIVE FLOATING BOTTOM APP DOCK BAR ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none px-4 pb-safe pb-3">
        <div className="w-full max-w-md bg-[#0E1530]/95 backdrop-blur-2xl border border-navy-800/90 shadow-2xl rounded-3xl px-3 py-2 pointer-events-auto flex items-center justify-around">
          
          {PRIMARY_MOBILE_TABS.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;

            if (tab.isCenter) {
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="relative -top-4 flex flex-col items-center group active:scale-90 transition-transform"
                >
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-nyala-600 via-nyala-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-nyala-500/40 border-2 border-[#0A0F24] relative">
                    <Sparkle weight="fill" className="w-6 h-6 animate-pulse text-white" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0A0F24]" />
                  </div>
                  <span className="text-[10px] font-black text-nyala-400 mt-1">
                    {tab.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative active:scale-90 min-w-[56px] ${
                  isActive
                    ? "text-nyala-400 font-extrabold"
                    : "text-navy-400 hover:text-white font-medium"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-app-tab-active"
                    className="absolute inset-0 bg-nyala-500/15 rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}

                <Icon
                  weight={isActive ? "fill" : "bold"}
                  className={`w-5 h-5 transition-transform ${isActive ? "scale-110 text-nyala-500" : ""}`}
                />
                <span className="text-[10px] tracking-tight mt-1">
                  {tab.label}
                </span>
              </Link>
            );
          })}

        </div>
      </nav>

      {/* ── 4. NATIVE DRAWER ACTION SHEET ── */}
      <AnimatePresence>
        {menuDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy-950/80 backdrop-blur-md p-0 sm:p-4">
            <div className="absolute inset-0" onClick={() => setMenuDrawerOpen(false)} />

            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="relative z-10 w-full max-w-lg bg-[#0F1738] rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 pb-safe border border-navy-800 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto"
            >
              {/* Pull Bar for mobile */}
              <div className="w-12 h-1 rounded-full bg-navy-700 mx-auto -mt-2 sm:hidden" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white">Menu Modul & Ekosistem</h3>
                  <p className="text-xs text-navy-400">Seluruh modul resmi Nyala MABA UMKT 2026</p>
                </div>
                <button
                  onClick={() => setMenuDrawerOpen(false)}
                  className="p-2 rounded-full bg-navy-900 text-navy-300 hover:text-white cursor-pointer"
                >
                  <X weight="bold" className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Menu List */}
              <div className="space-y-2">
                {DRAWER_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuDrawerOpen(false)}
                      className="p-3.5 rounded-2xl bg-navy-900/90 border border-navy-800/80 flex items-center gap-3.5 active:scale-98 transition-transform hover:border-nyala-500/50"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${item.color}`}>
                        <Icon weight="bold" className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-white">{item.label}</h4>
                        <p className="text-[10px] text-navy-400">{item.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Action Row: Onboarding Replay & Desktop Switch */}
              <div className="pt-2 border-t border-navy-800 space-y-2">
                <button
                  onClick={handleReplayOnboarding}
                  className="w-full p-3 rounded-xl bg-navy-900 border border-navy-800 text-xs font-bold text-navy-300 flex items-center justify-center gap-2 cursor-pointer hover:text-white"
                >
                  <Compass weight="bold" className="w-4 h-4 text-nyala-500" />
                  <span>Putar Ulang Pengantar Onboarding</span>
                </button>

                <button
                  onClick={handleSwitchToDesktop}
                  className="w-full p-3 rounded-xl bg-navy-900 border border-navy-800 text-xs font-bold text-navy-300 flex items-center justify-center gap-2 cursor-pointer hover:text-white"
                >
                  <Monitor weight="bold" className="w-4 h-4 text-sky-400" />
                  <span>Alihkan ke Tampilan Desktop Web</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Modals */}
      <CommandSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <MobileOnboarding />
      <AdminHelpModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

    </div>
  );
}
