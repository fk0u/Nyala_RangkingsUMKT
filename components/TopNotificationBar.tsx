"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CaretRight, 
  Clock, 
  ArrowSquareOut, 
  Laptop, 
  ShieldCheck, 
  Headset, 
  WhatsappLogo,
  Newspaper 
} from "@phosphor-icons/react";
import { OFFICIAL_LINKS } from "@/lib/masta-data";
import AdminHelpModal from "./AdminHelpModal";

export default function TopNotificationBar({
  onOpenSearch,
}: {
  onOpenSearch: () => void;
}) {
  const [witaTime, setWitaTime] = useState("");
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      setWitaTime(
        new Date().toLocaleTimeString("id-ID", {
          timeZone: "Asia/Makassar",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="z-50 w-full bg-navy-950 text-white/90 text-[11px] border-b border-navy-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between gap-4">

          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="font-bold text-white/60 uppercase tracking-widest text-[10px] flex-shrink-0">
              MASTA 2026
            </span>
            <span className="hidden sm:inline text-white/50 truncate">
              Selamat datang Mahasiswa Baru UMKT!
            </span>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-1 text-nyala-400 hover:text-nyala-300 font-semibold transition-colors flex-shrink-0"
            >
              <Newspaper weight="bold" className="w-3 h-3" />
              <span>Blog MABA</span>
              <CaretRight weight="bold" className="w-2.5 h-2.5" />
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 flex-shrink-0">
            
            {/* Quick Admin Help Button */}
            <button
              onClick={() => setAdminModalOpen(true)}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              title="Layanan WhatsApp Admin Gedung C & PMB"
            >
              <WhatsappLogo weight="fill" className="w-3.5 h-3.5" />
              <span>Admin UMKT</span>
            </button>

            <a
              href={OFFICIAL_LINKS.sikadMahasiswa}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-blue-300 hover:text-blue-200 font-semibold transition-colors"
            >
              <Laptop weight="duotone" className="w-3.5 h-3.5" />
              <span>SIKAD</span>
              <ArrowSquareOut weight="bold" className="w-2.5 h-2.5 opacity-60" />
            </a>

            <button
              onClick={onOpenSearch}
              className="hidden sm:inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors"
            >
              <span>Cari</span>
              <kbd className="px-1 py-px rounded bg-white/10 text-[9px] font-mono font-bold border border-white/10">
                ⌘K
              </kbd>
            </button>

            {witaTime && (
              <span className="hidden lg:inline-flex items-center gap-1 text-white/40 font-mono tabular-nums">
                <Clock weight="duotone" className="w-3 h-3" />
                <span>{witaTime} WITA</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <AdminHelpModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </>
  );
}
