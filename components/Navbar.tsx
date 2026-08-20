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
  Headset,
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
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-navy-950/90 backdrop-blur-xl border-b border-navy-200/50 dark:border-navy-800/60 shadow-[0_1px_3px_0_rgba(0,0,0,.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

          {/* ── Brand ── */}
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
              <MascotFlame size="sm" className="w-7 h-7 group-hover:scale-110 transition-transform" />
              {isDockedLanding && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-full bg-nyala-500/40 pointer-events-none"
                />
              )}
            </motion.div>
            <span className="text-lg font-black tracking-tight text-navy-900 dark:text-white">
              Nyala
            </span>
            <span className="hidden sm:inline px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-nyala-500/12 text-nyala-600 dark:text-nyala-400 border border-nyala-500/20">
              UMKT '26
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">

            <NavLink href="/" label="Beranda" active={pathname === "/"} />

            {/* Hub UMKT Live API */}
            <NavLink 
              href="/hub-umkt" 
              label="Hub Kampus UMKT" 
              active={pathname.startsWith("/hub-umkt")} 
            />

            {/* Panduan MABA */}
            <NavLink 
              href="/blog" 
              label="Panduan MABA" 
              active={pathname.startsWith("/blog")} 
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
                title="Alur 5 Tahap MASTA"
                desc="Timeline interaktif & pro-tips"
              />
              <DropdownItem
                href="/checklist"
                icon={<CheckSquare weight="bold" className="w-4 h-4" />}
                color="emerald"
                title="Checklist Perlengkapan"
                desc="Berkas, pakaian & task kustom"
              />
              <DropdownItem
                href="/health-check"
                icon={<Heartbeat weight="bold" className="w-4 h-4" />}
                color="rose"
                title="Health Check & Mood"
                desc="Asesmen kesiapan fisik & mental"
              />
            </Dropdown>

            <NavLink
              href="/companion"
              label="Tanya Nyala"
              active={pathname === "/companion"}
              accent
            />
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2">
            
            {/* Direct Admin Help Button */}
            <button
              onClick={() => setAdminModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
              title="Hubungi Admin PMB / Kemahasiswaan Gedung C"
            >
              <Headset weight="bold" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Admin UMKT</span>
            </button>

            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-xl text-navy-500 dark:text-navy-400 hover:text-navy-900 dark:hover:text-white hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors"
                title="Pencarian (Ctrl+K)"
              >
                <MagnifyingGlass weight="bold" className="w-4 h-4" />
              </button>
            )}

            <ThemeToggle />

            <Link
              href="/mobile"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-navy-600 dark:text-navy-300 hover:text-navy-950 dark:hover:text-white bg-navy-100 dark:bg-navy-900 border border-navy-200 dark:border-navy-800 transition-colors"
              title="Buka Versi Mobile App (App Store Mode)"
            >
              <DeviceMobile weight="bold" className="w-3.5 h-3.5 text-nyala-500" />
              <span>Mobile App</span>
            </Link>

            <Link
              href="/companion"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-nyala-500 hover:bg-nyala-600 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all active:scale-[0.97]"
            >
              <Sparkle weight="fill" className="w-3.5 h-3.5" />
              <span>Chat AI</span>
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800"
            >
              {mobileOpen ? <X weight="bold" className="w-5 h-5" /> : <List weight="bold" className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
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
                  { href: "/panduan-ti", label: "Akademik TI", icon: Code, color: "text-nyala-500" },
                  { href: "/panduan-sikad", label: "SIKAD UMKT", icon: Laptop, color: "text-blue-500" },
                  { href: "/jadwal", label: "Alur MASTA", icon: CalendarCheck, color: "text-amber-500" },
                  { href: "/checklist", label: "Checklist", icon: CheckSquare, color: "text-emerald-500" },
                  { href: "/health-check", label: "Health Check", icon: Heartbeat, color: "text-rose-500" },
                  { href: "/blog", label: "Blog & Tips", icon: Newspaper, color: "text-indigo-500" },
                  { href: "/companion", label: "Tanya AI", icon: Sparkle, color: "text-nyala-500" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="p-3 rounded-xl bg-navy-50 dark:bg-navy-900 border border-navy-100 dark:border-navy-800 flex items-center gap-2.5"
                    >
                      <Icon weight="bold" className={`w-4 h-4 ${item.color}`} />
                      <span className="text-xs font-bold text-navy-900 dark:text-white">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Admin Contact Action */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setAdminModalOpen(true);
                }}
                className="w-full p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Headset weight="bold" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Hubungi Admin Resmi UMKT (Gedung C & PMB)</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Admin Help Modal */}
      <AdminHelpModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </>
  );
}

/* ── Reusable Sub-Components ── */

function NavLink({
  href,
  label,
  active,
  accent,
}: {
  href: string;
  label: string;
  active: boolean;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
        active
          ? "text-nyala-600 dark:text-nyala-400 bg-nyala-500/8"
          : "text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-100/50 dark:hover:bg-navy-800/50"
      } ${accent ? "flex items-center gap-1.5" : ""}`}
    >
      {accent && <Sparkle weight="fill" className="w-3.5 h-3.5 text-nyala-500" />}
      {label}
      {accent && (
        <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-full bg-nyala-500 text-white leading-none">
          AI
        </span>
      )}
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
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
          active
            ? "text-nyala-600 dark:text-nyala-400 bg-nyala-500/8"
            : "text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-100/50 dark:hover:bg-navy-800/50"
        }`}
      >
        {label}
        <CaretDown weight="bold" className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 w-72 mt-1 p-1.5 rounded-xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 shadow-xl space-y-0.5"
          >
            {children}
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
  const colorMap: Record<string, string> = {
    nyala: "bg-nyala-500/10 text-nyala-600 group-hover:bg-nyala-600 group-hover:text-white",
    amber: "bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    emerald: "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    rose: "bg-rose-500/10 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
    slate: "bg-slate-500/10 text-slate-700 dark:text-slate-300 group-hover:bg-slate-700 group-hover:text-white",
  };

  return (
    <Link
      href={href}
      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-800/60 transition-colors group"
    >
      <div className={`p-1.5 rounded-lg transition-colors ${colorMap[color] || colorMap.nyala}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-navy-900 dark:text-white truncate">{title}</span>
          {badge && (
            <span className="text-[9px] px-1.5 rounded bg-navy-100 dark:bg-navy-800 text-navy-500 dark:text-navy-400 font-semibold flex-shrink-0">
              {badge}
            </span>
          )}
        </div>
        <p className="text-[11px] text-navy-500 dark:text-navy-400 truncate">{desc}</p>
      </div>
    </Link>
  );
}
