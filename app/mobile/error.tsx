"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowClockwise, House, WhatsappLogo, WarningCircle } from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import DuolingoButton from "@/components/flutter/DuolingoButton";
import { OFFICIAL_CONTACTS } from "@/lib/masta-data";

export default function MobileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Mobile Error Boundary caught]:", error);
  }, [error]);

  return (
    <div className="p-4 sm:p-5 max-w-lg mx-auto space-y-5 pb-24">
      
      {/* 500 Main Card */}
      <DuolingoCard variant="elevated" className="text-center p-6 space-y-4">
        <div className="w-24 h-24 mx-auto flex items-center justify-center">
          <MascotFlame size="lg" mood="nervous" />
        </div>

        <div className="space-y-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-mono font-bold">
            ERROR 500 • KENDALA SISTEM
          </span>
          <h1 className="text-xl font-black text-navy-950 dark:text-white">
            Api Nyala Sedang Kepanasan!
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Terjadi kendala teknis saat memuat data halaman ini. Silakan coba muat ulang atau kembali ke Beranda.
          </p>

          {error.digest && (
            <span className="inline-block mt-2 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-mono">
              ID: {error.digest}
            </span>
          )}
        </div>

        <div className="space-y-2 pt-2">
          <DuolingoButton
            onClick={() => reset()}
            variant="primary"
            fullWidth
            size="md"
          >
            <ArrowClockwise weight="bold" className="w-4 h-4 mr-1.5" />
            <span>Coba Muat Ulang</span>
          </DuolingoButton>

          <Link href="/mobile" className="block w-full">
            <DuolingoButton variant="secondary" fullWidth size="md">
              <House weight="bold" className="w-4 h-4 mr-1.5" />
              <span>Kembali ke Beranda</span>
            </DuolingoButton>
          </Link>

          <a
            href={OFFICIAL_CONTACTS[1]?.whatsappUrl || "https://wa.me/6282250878843"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <DuolingoButton variant="emerald" fullWidth size="md">
              <WhatsappLogo weight="fill" className="w-4 h-4 mr-1.5" />
              <span>Lapor ke Admin Gedung C</span>
            </DuolingoButton>
          </a>
        </div>
      </DuolingoCard>
    </div>
  );
}
