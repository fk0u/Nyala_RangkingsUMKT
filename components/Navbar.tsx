"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkle,
  Heartbeat,
  CalendarCheck,
  CheckSquare,
  BookOpenText,
  Laptop,
  Code,
  MagnifyingGlass,
  CaretDown,
  List,
  X,
  Newspaper,
  WhatsappLogo,
  DeviceMobile,
} from "@phosphor-icons/react";
import ThemeToggle from "./ThemeToggle";
import MascotFlame from "./MascotFlame";
import AdminHelpModal from "./AdminHelpModal";

export default function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const pathname = usePathname();
  const [akademikOpen, setAkademikOpen] = useState(false);
  const [persiapanOpen, setPersiapanOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isDockedLanding, setIsDockedLanding] = useState(false);

  useEffect(() => {
    setAkademikOpen(false);
    setPersiapanOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleDocked = () => {
      setIsDockedLanding(true);
      setTimeout(() => setIsDockedLanding(false), 1200);
    };
    window.addEventListener("nyala-mascot-docked", handleDocked);
    return () => window.removeEventListener("nyala-mascot-docked", handleDocked);
  }, []);

  const isActiveGroup = (paths: string[]) => paths.some((p) => pathname === p);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-navy-950/95 backdrop-blur-xl border-b border-navy-200/60 dark:border-navy-800/80 shadow-xs transition-colors select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* ── 1. Brand Logo ── */}
          <Link href="/" id="navbar-brand-link" className="flex items-center gap-2.5 group flex-shrink-0">
            <motion.div
              id="navbar-brand-mascot"
              animate={
                isDockedLanding
                  ? {
                      scale: [1, 1.45, 0.9, 1.15, 1],
                      rotate: [0, -12, 12, -6, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              <MascotFlame size="sm" className="w-8 h-8 group-hover:scale-110 transition-transform" />
              {isDockedLanding && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full bg-nyala-500/40 pointer-events-none"
                />
              )}
            </motion.div>
            <span className="text-xl font-black tracking-tight text-navy-950 dark:text-white">
              Nyala
            </span>
            <span className="hidden sm:inline px-2 py-0.5 text-[9px] font-black uppercase rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 border border-nyala-500/20 font-mono">
              UMKT '26
            </span>
          </Link>

          {/* ── 2. Center Nav Links (Spacious, Clean Typography) ── */}
          <nav className="hidden lg:flex items-center gap-1">

            <NavLink href="/" label="Beranda" active={pathname === "/"} />

            {/* Hub Warta Live API */}
            <NavLink 
              href="/hub-umkt" 
              label="Hub Warta" 
              active={pathname.startsWith("/hub-umkt")} 
            />

            {/* Akademik Dropdown */}
            <Dropdown
              label="Akademik"
              open={akademikOpen}
              setOpen={setAkademikOpen}
              active={isActiveGroup(["/panduan-ti", "/panduan-sikad", "/tentang-masta"])}
            >
              <DropdownItem
                href="/panduan-ti"
                icon={<Code weight="bold" className="w-4 h-4" />}
                color="nyala"
                title="Prodi Teknologi Informasi"
                desc="Kurikulum 2026, Dosen, Standar Nilai & Karir"
                badge="2026"
              />
              <DropdownItem
                href="/panduan-sikad"
                icon={<Laptop weight="bold" className="w-4 h-4" />}
                color="blue"
                title="Portal SIKAD UMKT"
                desc="Simulator KRS, Jadwal, Tagihan & Presensi"
                badge="Simulator"
              />
              <DropdownItem
                href="/tentang-masta"
                icon={<BookOpenText weight="bold" className="w-4 h-4" />}
                color="purple"
                title="Edukasi & Pilar MASTA"
                desc="Fokus pembinaan, tata nilai & FAQ"
              />
            </Dropdown>

            {/* Persiapan Dropdown */}
            <Dropdown
              label="Persiapan"
              open={persiapanOpen}
              setOpen={setPersiapanOpen}
              active={isActiveGroup(["/jadwal", "/checklist", "/health-check"])}
            >
              <DropdownItem
                href="/jadwal"
                icon={<CalendarCheck weight="bold" className="w-4 h-4" />}
                color="amber"
                title="Rundown & Jadwal MASTA"
                desc="Timeline 3 gelombang & pro-tips"
              />
              <DropdownItem
                href="/checklist"
                icon={<CheckSquare weight="bold" className="w-4 h-4" />}
                color="emerald"
                title="Checklist Perlengkapan"
                desc="11 berkas wajib & task kustom"
              />
              <DropdownItem
                href="/health-check"
                icon={<Heartbeat weight="bold" className="w-4 h-4" />}
                color="rose"
                title="Health Check & Mood"
                desc="Asesmen kesiapan fisik & mental"
              />
            </Dropdown>

            {/* Panduan Blog */}
            <NavLink 
              href="/blog" 
              label="Panduan Blog" 
              active={pathname.startsWith("/blog")} 
            />
          </nav>

          {/* ── 3. Right Slot (Balanced, Non-Cluttered Controls) ── */}
          <div className="flex items-center gap-2.5">
            
            {/* Search Input Trigger */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-navy-900 hover:bg-slate-200 dark:hover:bg-navy-800 border border-slate-200/80 dark:border-navy-800 transition-all cursor-pointer"
                title="Cari Materi (Ctrl+K)"
              >
                <MagnifyingGlass weight="bold" className="w-4 h-4 text-slate-400" />
                <span className="hidden xl:inline text-xs font-medium">Cari info...</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-navy-800 text-[10px] font-mono font-bold text-slate-400 border border-slate-200 dark:border-navy-700 shadow-2xs">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Admin Help Button */}
            <button
              onClick={() => setAdminModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all active:scale-95 cursor-pointer"
              title="Hubungi Admin WhatsApp Resmi Gedung C"
            >
              <WhatsappLogo weight="fill" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Admin UMKT</span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Primary Action Button: Tanya Nyala AI */}
            <Link
              href="/companion"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-nyala-600 to-amber-500 hover:from-nyala-500 hover:to-amber-400 text-white text-xs font-extrabold shadow-md shadow-nyala-500/20 hover:shadow-lg transition-all active:scale-95 flex-shrink-0"
            >
              <Sparkle weight="fill" className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Tanya Nyala AI</span>
              <span className="sm:hidden">AI</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors"
            >
              {mobileOpen ? <X weight="bold" className="w-6 h-6" /> : <List weight="bold" className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown Menu for Small Screens ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-950 px-4 py-4 space-y-3"
            >
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "/hub-umkt", label: "Hub Warta", icon: Newspaper, color: "text-nyala-500" },
                  { href: "/panduan-ti", label: "Akademik TI", icon: Code, color: "text-emerald-500" },
                  { href: "/panduan-sikad", label: "SIKAD UMKT", icon: Laptop, color: "text-blue-500" },
                  { href: "/jadwal", label: "Jadwal MASTA", icon: CalendarCheck, color: "text-amber-500" },
                  { href: "/checklist", label: "Checklist MABA", icon: CheckSquare, color: "text-purple-500" },
                  { href: "/health-check", label: "Health Check", icon: Heartbeat, color: "text-rose-500" },
                  { href: "/blog", label: "Panduan Blog", icon: Newspaper, color: "text-indigo-500" },
                  { href: "/companion", label: "Tanya Nyala AI", icon: Sparkle, color: "text-nyala-500" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs font-bold text-navy-900 dark:text-white active:scale-95 transition-all"
                    >
                      <Icon weight="bold" className={`w-4 h-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AdminHelpModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
        active
          ? "text-nyala-600 dark:text-nyala-400 bg-nyala-500/10"
          : "text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-900"
      }`}
    >
      {label}
    </Link>
  );
}

function Dropdown({
  label,
  open,
  setOpen,
  active,
  children,
}: {
  label: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          active || open
            ? "text-nyala-600 dark:text-nyala-400 bg-nyala-500/10"
            : "text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-900"
        }`}
      >
        <span>{label}</span>
        <CaretDown
          weight="bold"
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            open ? "rotate-180 text-nyala-500" : "text-slate-400"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full pt-1.5 w-72 z-50"
          >
            <div className="rounded-2xl bg-white dark:bg-navy-900 border-2 border-slate-200 dark:border-navy-800 shadow-xl p-2 space-y-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({
  href,
  icon,
  color,
  title,
  desc,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  color: string;
  title: string;
  desc: string;
  badge?: string;
}) {
  const colorMap: { [k: string]: string } = {
    nyala: "bg-nyala-500/10 text-nyala-600 dark:text-nyala-400",
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  };

  return (
    <Link
      href={href}
      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-navy-800/80 transition-colors group"
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
          colorMap[color] || "bg-slate-100 text-slate-600"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="text-xs font-bold text-navy-900 dark:text-white group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors">
            {title}
          </span>
          {badge && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-nyala-500/10 text-nyala-600 dark:text-nyala-400">
              {badge}
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
          {desc}
        </p>
      </div>
    </Link>
  );
}
