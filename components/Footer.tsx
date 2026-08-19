"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowSquareOut, 
  Heart, 
  Sparkle, 
  Globe, 
  GraduationCap, 
  Fire, 
  Laptop, 
  Newspaper, 
  Headset, 
  WhatsappLogo, 
  MapPin, 
  Clock 
} from "@phosphor-icons/react";
import { OFFICIAL_LINKS, OFFICIAL_CONTACTS } from "@/lib/masta-data";
import MascotFlame from "./MascotFlame";
import AdminHelpModal from "./AdminHelpModal";

export default function Footer() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full border-t border-navy-200/60 dark:border-navy-800 bg-white/50 dark:bg-navy-950/80 transition-colors pb-20 md:pb-10 pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            {/* Col 1: Brand & Vision */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2">
                <MascotFlame size="sm" className="w-7 h-7" />
                <span className="text-xl font-black text-navy-900 dark:text-white">
                  Nyala
                </span>
              </div>
              <p className="text-sm font-semibold text-nyala-600 dark:text-nyala-400">
                “Nyala. Teman perjalanan MABA-mu.”
              </p>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400 leading-relaxed">
                Companion digital interaktif yang dirancang khusus untuk mendampingi Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) Angkatan 2026 selama masa orientasi MASTA dan adaptasi sistem perkuliahan SIKAD.
              </p>

              {/* Quick Admin Help Button */}
              <button
                onClick={() => setAdminModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all"
              >
                <Headset weight="bold" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Pusat Layanan Admin Resmi UMKT</span>
              </button>
            </div>

            {/* Col 2: Fitur & Blog */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 dark:text-white">
                Fitur & Wawasan
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-navy-600 dark:text-navy-400">
                <li>
                  <Link href="/companion" className="hover:text-nyala-500 transition-colors flex items-center gap-1.5 font-semibold text-nyala-600 dark:text-nyala-400">
                    <Sparkle weight="fill" className="w-3.5 h-3.5 text-nyala-500" />
                    <span>Tanya Nyala AI</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-nyala-500 transition-colors flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400">
                    <Newspaper weight="bold" className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Blog & Artikel MABA</span>
                  </Link>
                </li>
                <li>
                  <Link href="/panduan-ti" className="hover:text-nyala-500 transition-colors">
                    Akademik & Karir TI 2026
                  </Link>
                </li>
                <li>
                  <Link href="/panduan-sikad" className="hover:text-nyala-500 transition-colors">
                    Simulator SIKAD UMKT
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
              </ul>
            </div>

            {/* Col 3: Layanan Admin UMKT */}
            <div className="md:col-span-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 dark:text-white flex items-center gap-1.5">
                <WhatsappLogo weight="fill" className="w-4 h-4 text-emerald-500" />
                <span>Kontak Layanan Resmi Kampus</span>
              </h4>

              <div className="space-y-2.5 text-xs">
                {/* Biro Kemahasiswaan */}
                <div className="p-3 rounded-2xl bg-white/60 dark:bg-navy-900/60 border border-navy-100 dark:border-navy-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-900 dark:text-white">Biro Kemahasiswaan dan Alumni UMKT</span>
                    <a
                      href="https://wa.me/6282250878843"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                    >
                      0822-5087-8843
                    </a>
                  </div>
                  <p className="text-[11px] text-navy-500 dark:text-navy-400 flex items-center gap-1">
                    <MapPin weight="bold" className="w-3 h-3 text-nyala-500 flex-shrink-0" />
                    <span>Gedung C Lantai 1 UMKT, Samarinda</span>
                  </p>
                  <p className="text-[10px] text-navy-400 flex items-center gap-1">
                    <Clock weight="bold" className="w-3 h-3 text-nyala-500 flex-shrink-0" />
                    <span>Senin-Kamis 08.00-16.00 • Jumat 08.00-11.30 WITA</span>
                  </p>
                </div>

                {/* Admin PMB */}
                <div className="p-3 rounded-2xl bg-white/60 dark:bg-navy-900/60 border border-navy-100 dark:border-navy-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-900 dark:text-white">Admin Penerimaan Mahasiswa Baru</span>
                    <a
                      href="https://wa.me/6281230017008"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                    >
                      +62 812-3001-7008
                    </a>
                  </div>
                  <p className="text-[11px] text-navy-500 dark:text-navy-400">
                    Layanan pendaftaran, verifikasi berkas, & registrasi NIM
                  </p>
                </div>
              </div>
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

      <AdminHelpModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </>
  );
}
