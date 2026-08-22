"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkle, 
  CalendarCheck, 
  Laptop, 
  Code, 
  CheckSquare, 
  Heartbeat, 
  Newspaper, 
  Headset,
  X,
  CaretRight,
  Flame,
  ChatCenteredDots
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";

interface DuolingoActionMenuDockProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminHelp?: () => void;
}

export default function DuolingoActionMenuDock({
  isOpen,
  onClose,
  onOpenAdminHelp,
}: DuolingoActionMenuDockProps) {
  const MENU_ITEMS = [
    {
      id: "ai-chat",
      title: "Tanya Nyala AI",
      desc: "Asisten cerdas 24/7",
      href: "/mobile/companion",
      icon: Sparkle,
      color: "bg-nyala-500 border-nyala-700 text-white",
      badge: "AI 24/7",
    },
    {
      id: "jadwal",
      title: "Jadwal & Rundown",
      desc: "Rangkaian Agenda MABA",
      href: "/mobile/jadwal",
      icon: CalendarCheck,
      color: "bg-amber-500 border-amber-700 text-white",
      badge: "Resmi",
    },
    {
      id: "sikad",
      title: "Simulator SIKAD",
      desc: "KRS & Chat Dosen PA",
      href: "/mobile/panduan-sikad",
      icon: Laptop,
      color: "bg-sky-500 border-sky-700 text-white",
      badge: "KRS",
    },
    {
      id: "prodi-ti",
      title: "Kurikulum TI",
      desc: "Semester 1-4 & Dosen",
      href: "/mobile/panduan-ti",
      icon: Code,
      color: "bg-emerald-500 border-emerald-700 text-white",
      badge: "20 SKS",
    },
    {
      id: "checklist",
      title: "Checklist MABA",
      desc: "Kelengkapan berkas",
      href: "/mobile/checklist",
      icon: CheckSquare,
      color: "bg-purple-500 border-purple-700 text-white",
      badge: "Wajib",
    },
    {
      id: "health",
      title: "Health & Mood",
      desc: "Kesiapan fisik & mental",
      href: "/mobile/health-check",
      icon: Heartbeat,
      color: "bg-rose-500 border-rose-700 text-white",
      badge: "Harian",
    },
    {
      id: "hub-umkt",
      title: "Hub Warta Kampus",
      desc: "Live berita & pengumuman",
      href: "/mobile/hub-umkt",
      icon: Newspaper,
      color: "bg-indigo-500 border-indigo-700 text-white",
      badge: "Live",
    },
    {
      id: "admin",
      title: "Admin Gedung C",
      desc: "Helpdesk & kontak resmi",
      action: () => {
        onClose();
        if (onOpenAdminHelp) onOpenAdminHelp();
      },
      icon: Headset,
      color: "bg-slate-800 border-slate-950 text-white",
      badge: "Bantuan",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
          />

          {/* Floating Action Menu Panel */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] border-t-4 sm:border-4 border-slate-300 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            
            {/* Top Drag Handle & Close */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-nyala-500/15 text-nyala-600 dark:text-nyala-400 flex items-center justify-center">
                  <Flame weight="fill" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-navy-950 dark:text-white">
                    Pusat Navigasi MABA
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Pilih menu atau fitur yang ingin kamu akses langsung
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center active:scale-90 transition-transform"
              >
                <X weight="bold" className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Grid (Duolingo 3D Tactile Action Cards) */}
            <div className="grid grid-cols-2 gap-2.5">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200 dark:border-slate-700 border-b-4 border-b-slate-300 dark:border-b-slate-900 active:border-b-2 active:translate-y-0.5 transition-all text-left flex flex-col justify-between h-28 select-none">
                    <div className="flex items-start justify-between">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-b-2 ${item.color}`}>
                        <Icon weight="bold" className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <div className="font-black text-xs text-navy-950 dark:text-white leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );

                if (item.href) {
                  return (
                    <Link key={item.id} href={item.href} onClick={onClose}>
                      {content}
                    </Link>
                  );
                }

                return (
                  <button key={item.id} onClick={item.action} className="w-full text-left">
                    {content}
                  </button>
                );
              })}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
