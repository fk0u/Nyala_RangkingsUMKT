"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlass, 
  Sparkle, 
  Laptop, 
  Code, 
  CalendarCheck, 
  CheckSquare, 
  Heartbeat, 
  BookOpenText, 
  ArrowRight, 
  ArrowSquareOut,
  Command,
  X,
  Newspaper,
  Headset,
  WhatsappLogo,
  Globe
} from "@phosphor-icons/react";
import { OFFICIAL_LINKS, OFFICIAL_CONTACTS, BLOG_POSTS } from "@/lib/masta-data";

interface SearchItem {
  id: string;
  title: string;
  desc: string;
  category: "Navigasi" | "SIKAD UMKT" | "Prodi TI 2026" | "Panduan MASTA" | "Blog & Tips" | "Kontak Admin" | "Tautan Resmi";
  href: string;
  icon: any;
  isExternal?: boolean;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Navigasi Utama
  { id: "nav-home", title: "Beranda Utama", desc: "Hero, countdown timer, dan ringkasan fitur Nyala", category: "Navigasi", href: "/", icon: Sparkle },
  { id: "nav-ai", title: "Tanya Nyala AI", desc: "Virtual companion cerdas seputar MASTA & perkuliahan", category: "Navigasi", href: "/companion", icon: Sparkle },
  { id: "nav-blog", title: "Panduan & Edukasi MABA 2026", desc: "Kumpulan artikel tips adaptasi, beasiswa, kost, & strategi kuliah", category: "Blog & Tips", href: "/blog", icon: Newspaper },
  { id: "nav-hub-umkt", title: "Hub Portal Kampus UMKT (Live API)", desc: "2.100+ warta berita, pengumuman resmi, agenda IKN & direktori 10 fakultas", category: "Tautan Resmi", href: "/hub-umkt", icon: Globe },
  { id: "nav-sikad", title: "Panduan Portal SIKAD", desc: "Simulasi 1:1 mahasiswa.umkt.ac.id, login NIM, KRS, & tagihan", category: "SIKAD UMKT", href: "/panduan-sikad", icon: Laptop },
  { id: "nav-ti", title: "Akademik & Karir TI UMKT 2026", desc: "Kurikulum Semester 1-4, dosen tetap, standar nilai, & gaji IT", category: "Prodi TI 2026", href: "/panduan-ti", icon: Code },
  { id: "nav-health", title: "Health Check & Mood Tracker", desc: "Pantau kesiapan tidur, nutrisi, hidrasi, & kestabilan mental", category: "Navigasi", href: "/health-check", icon: Heartbeat },
  { id: "nav-jadwal", title: "Alur 5 Tahap MASTA 2026", desc: "Timeline interaktif dari Membaca Panduan hingga Inaugurasi", category: "Panduan MASTA", href: "/jadwal", icon: CalendarCheck },
  { id: "nav-check", title: "Checklist Persiapan MABA", desc: "Daftar perlengkapan, berkas wajib, dan pakaian resmi", category: "Panduan MASTA", href: "/checklist", icon: CheckSquare },
  { id: "nav-masta", title: "Edukasi & 4 Pilar MASTA", desc: "3 fokus pembinaan dan FAQ resmi orientasi kampus", category: "Panduan MASTA", href: "/tentang-masta", icon: BookOpenText },

  // Kontak Admin Resmi
  { id: "contact-pmb", title: "Chat Admin PMB UMKT (+62 812-3001-7008)", desc: "WhatsApp resmi untuk konfirmasi pendaftaran, kelulusan & NIM", category: "Kontak Admin", href: "https://wa.me/6281230017008?text=Halo%20Admin%20PMB%20UMKT%2C%20saya%20Mahasiswa%20Baru%202026.", icon: WhatsappLogo, isExternal: true },
  { id: "contact-bima", title: "Biro Kemahasiswaan Gedung C Lt. 1 (0822-5087-8843)", desc: "WhatsApp resmi untuk dispensasi MASTA, beasiswa & sertifikat", category: "Kontak Admin", href: "https://wa.me/6282250878843?text=Halo%20Biro%20Kemahasiswaan%20UMKT%2C%20saya%20MABA%202026.", icon: WhatsappLogo, isExternal: true },

  // Blog Posts Index
  ...BLOG_POSTS.map((post) => ({
    id: `blog-${post.slug}`,
    title: post.title,
    desc: `${post.category} • ${post.excerpt.slice(0, 75)}...`,
    category: "Blog & Tips" as const,
    href: `/blog/${post.slug}`,
    icon: Newspaper
  })),

  // SIKAD Shortcuts
  { id: "sikad-krs", title: "Pengisian KRS Online", desc: "Panduan paket mata kuliah Semester 1 & bimbingan Dosen PA", category: "SIKAD UMKT", href: "/panduan-sikad", icon: Laptop },
  { id: "sikad-presensi", title: "Aturan Presensi 75%", desc: "Batas minimal kehadiran perkuliahan untuk syarat ujian", category: "SIKAD UMKT", href: "/panduan-sikad", icon: Laptop },
  { id: "sikad-tagihan", title: "Cek Tagihan SPP & BRIVA", desc: "Pembayaran Virtual Account dan verifikasi otomatis", category: "SIKAD UMKT", href: "/panduan-sikad", icon: Laptop },

  // Prodi TI Shortcuts
  { id: "ti-kurikulum", title: "Mata Kuliah Semester 1 TI", desc: "Aljabar Linear, Matdis, Statistika, Dasar Pemrograman (20 SKS)", category: "Prodi TI 2026", href: "/panduan-ti", icon: Code },
  { id: "ti-dosen", title: "Profil 11 Dosen Tetap TI", desc: "Daftar dosen aktif dan tugas belajar S3 bidang AI/ML/IoT", category: "Prodi TI 2026", href: "/panduan-ti", icon: Code },
  { id: "ti-gaji", title: "Estimasi Gaji Karir IT 2026", desc: "Benchmark Software Engineer Traveloka, Tokopedia, Jakarta/Bandung", category: "Prodi TI 2026", href: "/panduan-ti", icon: Code },

  // Tautan Resmi
  { id: "ext-sikad", title: "Buka Portal SIKAD Asli", desc: "mahasiswa.umkt.ac.id", category: "Tautan Resmi", href: OFFICIAL_LINKS.sikadMahasiswa, icon: ArrowSquareOut, isExternal: true },
  { id: "ext-umkt", title: "Website Resmi UMKT", desc: "www.umkt.ac.id", category: "Tautan Resmi", href: OFFICIAL_LINKS.umktMain, icon: ArrowSquareOut, isExternal: true },
  { id: "ext-masta", title: "Portal Resmi MASTA UMKT", desc: "masta-maba.odoo.com", category: "Tautan Resmi", href: OFFICIAL_LINKS.mastaOdoo, icon: ArrowSquareOut, isExternal: true },
];

export default function CommandSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filteredItems = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (item: SearchItem) => {
      onClose();
      if (item.isExternal) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [onClose, router]
  );

  // Keyboard shortcut listener for Enter / Arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredItems[selectedIndex]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, handleSelect, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-navy-950/70 backdrop-blur-md"
        />

        {/* Command Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-700/80 shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-navy-100 dark:border-navy-800">
            <MagnifyingGlass weight="bold" className="w-5 h-5 text-nyala-500 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari artikel blog, kontak admin WA, kurikulum, atau SIKAD..."
              className="w-full bg-transparent text-sm sm:text-base font-medium text-navy-900 dark:text-white placeholder-navy-400 outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-md text-navy-400 hover:text-navy-700 dark:hover:text-white"
              >
                <X weight="bold" className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-navy-100 dark:bg-navy-800 text-[10px] font-mono font-bold text-navy-500 dark:text-navy-400 border border-navy-200 dark:border-navy-700">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 text-navy-400 text-xs">
                Tidak ada hasil yang cocok dengan &quot;{query}&quot;.
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = selectedIndex === idx;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                      isSelected
                        ? "bg-nyala-500/10 dark:bg-navy-800/90 text-navy-900 dark:text-white border border-nyala-500/30"
                        : "text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2 rounded-xl flex-shrink-0 ${
                        isSelected ? "bg-nyala-500 text-white shadow-xs" : "bg-navy-100 dark:bg-navy-800 text-navy-500"
                      }`}>
                        <Icon weight="bold" className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold">{item.title}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                            item.category === "Kontak Admin"
                              ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                              : item.category === "Blog & Tips"
                              ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                              : "bg-navy-100 dark:bg-navy-800 text-navy-500"
                          }`}>
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-navy-500 dark:text-navy-400 line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <ArrowRight weight="bold" className={`w-4 h-4 text-navy-400 transition-transform ${
                      isSelected ? "translate-x-1 text-nyala-500" : "opacity-0"
                    }`} />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="px-5 py-2.5 bg-slate-50 dark:bg-navy-950 border-t border-navy-100 dark:border-navy-800/80 flex items-center justify-between text-[11px] text-navy-500 dark:text-navy-400 font-medium">
            <div className="flex items-center gap-3">
              <span>Gunakan <kbd className="font-mono font-bold bg-white dark:bg-navy-900 px-1.5 py-0.5 rounded border border-navy-200 dark:border-navy-700">↑</kbd> <kbd className="font-mono font-bold bg-white dark:bg-navy-900 px-1.5 py-0.5 rounded border border-navy-200 dark:border-navy-700">↓</kbd> untuk memilih</span>
              <span><kbd className="font-mono font-bold bg-white dark:bg-navy-900 px-1.5 py-0.5 rounded border border-navy-200 dark:border-navy-700">↵</kbd> untuk membuka</span>
            </div>
            <span className="font-bold text-nyala-600 dark:text-nyala-400">Nyala Quick Navigator</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
