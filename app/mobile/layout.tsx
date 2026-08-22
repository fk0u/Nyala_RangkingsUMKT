"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  House, 
  CalendarCheck, 
  Newspaper, 
  User,
  MagnifyingGlass, 
  Flame, 
  Lightning,
  GridFour
} from "@phosphor-icons/react";
import ThemeToggle from "@/components/ThemeToggle";
import CommandSearchModal from "@/components/CommandSearchModal";
import MobileOnboarding from "@/components/MobileOnboarding";
import CookieConsent from "@/components/CookieConsent";
import AdminHelpModal from "@/components/AdminHelpModal";
import DuolingoActionMenuDock from "@/components/flutter/DuolingoActionMenuDock";
import NyalaUserDropdownTitle from "@/components/NyalaUserDropdownTitle";

import { calculateRealStreak, calculateRealXp } from "@/lib/gamification";

export default function MobileAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuDockOpen, setMenuDockOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [streakDays, setStreakDays] = useState(1);
  const [totalXp, setTotalXp] = useState(50);

  const refreshGamification = () => {
    const streak = calculateRealStreak();
    const xpData = calculateRealXp();
    setStreakDays(streak);
    setTotalXp(xpData.totalXp);
  };

  useEffect(() => {
    refreshGamification();

    // Safeguard: If on wide screen desktop (> 1024px) without mobile touch/emulation, redirect to desktop web
    const checkDesktopBypass = () => {
      if (typeof window !== "undefined") {
        const isWideScreen = window.innerWidth > 1024;
        const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isWideScreen && !isTouch && !isMobileUA) {
          window.location.replace("/");
        }
      }
    };

    checkDesktopBypass();
    window.addEventListener("resize", checkDesktopBypass);

    const handleUpdate = () => {
      refreshGamification();
    };

    window.addEventListener("nyala-gamification-update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("resize", checkDesktopBypass);
      window.removeEventListener("nyala-gamification-update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [pathname]);

  const PRIMARY_MOBILE_TABS = [
    { href: "/mobile", label: "Beranda", icon: House },
    { href: "/mobile/jadwal", label: "Jadwal", icon: CalendarCheck },
    { isActionLauncher: true, label: "Menu" },
    { href: "/mobile/hub-umkt", label: "Warta", icon: Newspaper },
    { href: "/mobile/profile", label: "Profil", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-[#070B19] text-navy-950 dark:text-white flex flex-col selection:bg-nyala-500 selection:text-white transition-colors duration-200">
      
      {/* ── 1. CLEAN TOP BAR WITH USER TRACKING DROPDOWN (CENTERED) ── */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0E1635]/95 backdrop-blur-xl border-b-2 border-slate-200 dark:border-slate-800 px-3 sm:px-4 py-2.5 transition-colors">
        <div className="max-w-lg mx-auto relative flex items-center justify-between">
          
          {/* Left Slot: Search & Flame Streak */}
          <div className="flex items-center gap-1.5 z-10">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-90 transition-transform"
              title="Cari Materi"
            >
              <MagnifyingGlass weight="bold" className="w-4 h-4" />
            </button>

            <div className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border-2 border-amber-300/80 dark:border-amber-900/80 flex items-center gap-1 text-amber-700 dark:text-amber-400 font-mono font-black text-xs">
              <Flame weight="fill" className="w-3.5 h-3.5 text-nyala-500" />
              <span>{streakDays}d</span>
            </div>
          </div>

          {/* Center: Interactive User Tracking Dropdown (No redundant dots) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <NyalaUserDropdownTitle />
            </div>
          </div>

          {/* Right Slot: XP Energy & Theme Switcher */}
          <div className="flex items-center gap-1.5 z-10">
            <div className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-300/80 dark:border-emerald-900/80 flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-mono font-black text-xs">
              <Lightning weight="fill" className="w-3.5 h-3.5 text-emerald-500" />
              <span>{totalXp} XP</span>
            </div>

            <ThemeToggle />
          </div>

        </div>
      </header>

      {/* ── 2. MAIN APPLICATION CONTENT VIEWPORT ── */}
      <main className="flex-grow max-w-lg w-full mx-auto px-4 sm:px-6 py-5 pb-32 space-y-4">
        {children}
      </main>

      {/* ── 3. DUOLINGO FULL-WIDTH SOLID DOCKED BOTTOM BAR (PROMINENT ELEVATED 3D MENU) ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#0E1635] border-t-2 border-slate-200 dark:border-slate-800 px-3 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          
          {PRIMARY_MOBILE_TABS.map((tab) => {
            // Refined 3D Tactile Center Action Button
            if (tab.isActionLauncher) {
              return (
                <div key="action-launcher" className="flex-1 flex justify-center">
                  <button
                    onClick={() => setMenuDockOpen(true)}
                    className="relative -top-3.5 flex flex-col items-center group active:scale-95 transition-transform select-none cursor-pointer"
                    title="Pusat Navigasi & Menu MABA"
                  >
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-b from-nyala-500 to-nyala-600 text-white flex items-center justify-center shadow-lg shadow-nyala-600/25 border-2 border-white dark:border-[#0E1635] border-b-[5px] border-b-nyala-800 active:border-b-2 active:translate-y-1 transition-all">
                      <GridFour weight="fill" className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-nyala-600 dark:text-nyala-400 mt-0.5 tracking-tight">
                      Menu
                    </span>
                  </button>
                </div>
              );
            }

            const isActive = pathname === tab.href || (tab.href !== "/mobile" && pathname.startsWith(tab.href!));
            const Icon = tab.icon!;

            return (
              <Link
                key={tab.href}
                href={tab.href!}
                className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all select-none active:scale-90 ${
                  isActive
                    ? "text-nyala-600 dark:text-nyala-400 font-black"
                    : "text-slate-400 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white font-bold"
                }`}
              >
                <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-nyala-500/10 dark:bg-nyala-500/20" : ""}`}>
                  <Icon
                    weight={isActive ? "fill" : "bold"}
                    className={`w-5 h-5 ${isActive ? "text-nyala-500" : ""}`}
                  />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5">
                  {tab.label}
                </span>
              </Link>
            );
          })}

        </div>
      </nav>

      {/* ── 4. MULTIFUNCTIONAL ACTION MENU DOCK ── */}
      <DuolingoActionMenuDock
        isOpen={menuDockOpen}
        onClose={() => setMenuDockOpen(false)}
        onOpenAdminHelp={() => setAdminModalOpen(true)}
      />

      {/* Global Modals & Notifications */}
      <CommandSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <MobileOnboarding />
      <CookieConsent />
      <AdminHelpModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

    </div>
  );
}
