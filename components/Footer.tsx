"use client";

import React from "react";
import Link from "next/link";
import { ArrowSquareOut, Heart, Sparkle, Globe, GraduationCap, Fire, Laptop } from "@phosphor-icons/react";
import { OFFICIAL_LINKS } from "@/lib/masta-data";
import MascotFlame from "./MascotFlame";

export default function Footer() {
  return (
    <footer className="w-full border-t border-navy-200/60 dark:border-navy-800 bg-white/50 dark:bg-navy-950/80 transition-colors pb-20 md:pb-10 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Vision */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <MascotFlame size="sm" className="w-7 h-7" />
              <span className="text-xl font-black text-navy-900 dark:text-white">
                Nyala
              </span>
            </div>
            <p className="text-sm font-semibold text-nyala-600 dark:text-nyala-400">
              “Nyala. Teman perjalanan MABA-mu.”
            </p>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400 max-w-md leading-relaxed">
              Companion digital interaktif yang dirancang khusus untuk mendampingi Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) Angkatan 2026 selama masa orientasi MASTA dan adaptasi sistem perkuliahan SIKAD.
            </p>
          </div>

          {/* Col 2: Fitur Aplikasi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 dark:text-white">
              Fitur Aplikasi
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-navy-600 dark:text-navy-400">
              <li>
                <Link href="/companion" className="hover:text-nyala-500 transition-colors flex items-center gap-1.5">
                  <Sparkle weight="fill" className="w-3.5 h-3.5 text-nyala-500" />
                  <span>AI Companion Nyala</span>
                </Link>
              </li>
              <li>
                <Link href="/panduan-sikad" className="hover:text-nyala-500 transition-colors flex items-center gap-1.5 font-semibold text-nyala-600 dark:text-nyala-400">
                  <Laptop weight="bold" className="w-3.5 h-3.5 text-blue-500" />
                  <span>Panduan SIKAD UMKT</span>
                </Link>
              </li>
              <li>
                <Link href="/health-check" className="hover:text-nyala-500 transition-colors">
                  Health Check & Mood Tracker
                </Link>
              </li>
              <li>
                <Link href="/jadwal" className="hover:text-nyala-500 transition-colors">
                  5 Alur Pelaksanaan MASTA
                </Link>
              </li>
              <li>
                <Link href="/checklist" className="hover:text-nyala-500 transition-colors">
                  Checklist Persiapan MABA
                </Link>
              </li>
              <li>
                <Link href="/tentang-masta" className="hover:text-nyala-500 transition-colors">
                  Edukasi & Pedoman MASTA
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Resmi UMKT (Wajib Backlink) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 dark:text-white">
              Tautan Resmi UMKT
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href={OFFICIAL_LINKS.umktMain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2 rounded-xl bg-navy-50 dark:bg-navy-900/60 border border-navy-200/50 dark:border-navy-800 text-navy-700 dark:text-navy-300 hover:text-nyala-600 dark:hover:text-nyala-400 hover:border-nyala-500/40 transition-all"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Globe weight="duotone" className="w-4 h-4 text-nyala-500" />
                    <span>Website Utama UMKT</span>
                  </span>
                  <ArrowSquareOut weight="bold" className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_LINKS.sikadMahasiswa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2 rounded-xl bg-blue-50 dark:bg-navy-900/80 border border-blue-200/50 dark:border-navy-700 text-navy-800 dark:text-navy-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-all"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Laptop weight="duotone" className="w-4 h-4 text-blue-500" />
                    <span>Portal Mahasiswa SIKAD</span>
                  </span>
                  <ArrowSquareOut weight="bold" className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_LINKS.umktKemahasiswaan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2 rounded-xl bg-navy-50 dark:bg-navy-900/60 border border-navy-200/50 dark:border-navy-800 text-navy-700 dark:text-navy-300 hover:text-nyala-600 dark:hover:text-nyala-400 hover:border-nyala-500/40 transition-all"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <GraduationCap weight="duotone" className="w-4 h-4 text-nyala-500" />
                    <span>Biro Kemahasiswaan</span>
                  </span>
                  <ArrowSquareOut weight="bold" className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              </li>
              <li>
                <a
                  href={OFFICIAL_LINKS.mastaOdoo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2 rounded-xl bg-navy-50 dark:bg-navy-900/60 border border-navy-200/50 dark:border-navy-800 text-navy-700 dark:text-navy-300 hover:text-nyala-600 dark:hover:text-nyala-400 hover:border-nyala-500/40 transition-all"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Fire weight="duotone" className="w-4 h-4 text-nyala-500" />
                    <span>Portal Resmi MASTA</span>
                  </span>
                  <ArrowSquareOut weight="bold" className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-navy-200/60 dark:border-navy-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-500 dark:text-navy-400">
          <p>© 2026 Nyala • Karya Inovasi MABA Universitas Muhammadiyah Kalimantan Timur.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart weight="fill" className="w-3.5 h-3.5 text-nyala-500" />
            <span>untuk menyalakan semangat MABA UMKT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
