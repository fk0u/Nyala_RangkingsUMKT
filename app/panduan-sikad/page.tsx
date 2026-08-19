"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  ArrowSquareOut, 
  Key, 
  Table, 
  Calendar, 
  UserCheck, 
  CreditCard, 
  GraduationCap, 
  CheckCircle, 
  Copy, 
  Check, 
  Sparkle, 
  WarningCircle, 
  Question, 
  Fire, 
  ShieldCheck, 
  Laptop, 
  MagnifyingGlass,
  BookOpen,
  Bell,
  Info,
  User,
  Star,
  FolderOpen,
  CaretDown,
  FileText,
  ChatCenteredText,
  Trophy,
  Stack,
  Certificate,
  SignOut,
  Folder,
  BookmarkSimple
} from "@phosphor-icons/react";
import BacklinkBanner from "@/components/BacklinkBanner";
import MascotFlame from "@/components/MascotFlame";
import { SIKAD_GUIDES, OFFICIAL_LINKS } from "@/lib/masta-data";
import { useToast } from "@/context/ToastContext";

export default function PanduanSikadPage() {
  const [activeTab, setActiveTab] = useState<string>("sikad-login");
  const [simulatedMenu, setSimulatedMenu] = useState<string>("Dashboard");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const toast = useToast();

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`${label} berhasil disalin ke clipboard!`, "Tersalin");
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const SIKAD_SIDEBAR_ITEMS = [
    { name: "Dashboard", icon: Globe },
    { name: "Biodata", icon: User },
    { name: "KRS", icon: Table, hasSub: true },
    { name: "Biaya Kuliah", icon: CreditCard },
    { name: "Bahan & Tugas", icon: BookOpen },
    { name: "Jadwal & Presensi", icon: Calendar },
    { name: "PA Online", icon: ChatCenteredText },
    { name: "Kuesioner", icon: CheckCircle },
    { name: "Nilai", icon: Star },
    { name: "Kegiatan", icon: Stack, hasSub: true },
    { name: "Pengajuan", icon: FileText, hasSub: true },
    { name: "SKPI", icon: Certificate },
    { name: "Tracer Study", icon: Trophy },
    { name: "Panduan", icon: Question },
    { name: "Akun Lain", icon: User },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* 1. Header Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Laptop weight="bold" className="w-4 h-4 text-blue-500" />
          <span>Sistem Informasi Akademik Mahasiswa (SIKAD UMKT)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
          Simulator & Panduan Lengkap <br className="hidden sm:inline" />
          <span className="fire-text-gradient">Portal Mahasiswa UMKT</span>
        </h1>

        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed">
          Eksplorasi antarmuka resmi SIKAD UMKT (<code className="text-xs font-mono font-bold bg-navy-100 dark:bg-navy-800 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">mahasiswa.umkt.ac.id</code>) untuk memahami KRS, jadwal kuliah, presensi, PA Online, hingga rekapitulasi nilai.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={OFFICIAL_LINKS.sikadMahasiswa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-soft hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Laptop weight="bold" className="w-4 h-4" />
            <span>Kunjungi mahasiswa.umkt.ac.id Langsung</span>
            <ArrowSquareOut weight="bold" className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 2. REALISTIC EXACT SIKAD PORTAL SIMULATION */}
      <div className="rounded-3xl border border-navy-300/80 dark:border-navy-700 shadow-2xl bg-white dark:bg-navy-950 overflow-hidden text-navy-900 dark:text-white">
        
        {/* Top Simulated Browser Navigation Bar */}
        <div className="bg-slate-100 dark:bg-navy-900 px-4 py-3 border-b border-navy-200/80 dark:border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-navy-950 px-3 py-1 rounded-xl text-xs font-mono border border-navy-200 dark:border-navy-800 text-navy-600 dark:text-navy-300">
              <ShieldCheck weight="fill" className="w-3.5 h-3.5 text-emerald-500" />
              <span>https://mahasiswa.umkt.ac.id/</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-full bg-blue-50 dark:bg-navy-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100">
              <Bell weight="bold" className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-full bg-blue-50 dark:bg-navy-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100">
              <Info weight="bold" className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-navy-200 dark:border-navy-800 text-xs">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-nyala-500 text-white font-bold flex items-center justify-center text-[10px]">
                AG
              </div>
              <div className="hidden md:block text-left">
                <div className="font-extrabold text-[11px] leading-tight">AL-GHANI DESTA SETY...</div>
                <div className="text-[10px] text-navy-400 font-mono leading-none">2611102441026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Portal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Exact SIKAD Sidebar */}
          <div className="lg:col-span-3 bg-slate-50/90 dark:bg-navy-900/90 border-r border-navy-200/80 dark:border-navy-800 p-4 space-y-4">
            
            {/* UMKT Brand in Sidebar */}
            <div className="flex flex-col items-center text-center pb-3 border-b border-navy-200/80 dark:border-navy-800">
              <div className="w-12 h-12 rounded-full bg-navy-900 border-2 border-amber-400 flex items-center justify-center text-amber-400 mb-1.5 shadow-sm">
                <GraduationCap weight="fill" className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-navy-800 dark:text-navy-200">
                UNIVERSITAS MUHAMMADIYAH
              </span>
              <span className="text-[10px] font-bold text-navy-600 dark:text-navy-400">
                KALIMANTAN TIMUR
              </span>
            </div>

            {/* Menu List */}
            <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1">
              {SIKAD_SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isSelected = simulatedMenu === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setSimulatedMenu(item.name);
                      toast.info(`Membuka menu: ${item.name}`, "SIKAD UMKT");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-sm font-bold"
                        : "text-navy-700 dark:text-navy-300 hover:bg-navy-200/60 dark:hover:bg-navy-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon weight="bold" className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-navy-500"}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.hasSub && (
                      <CaretDown weight="bold" className={`w-3 h-3 ${isSelected ? "text-white" : "text-navy-400"}`} />
                    )}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Main Screen Simulator */}
          <div className="lg:col-span-9 p-5 sm:p-7 bg-[#F8FAFC] dark:bg-navy-950 space-y-6">
            
            {/* Screen: DASHBOARD (Exact Replica of SIKAD Screenshot) */}
            {simulatedMenu === "Dashboard" && (
              <div className="space-y-6">
                
                <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                  Dashboard
                </h2>

                {/* 4 Colored Metric Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Card 1: IPK (Purple Gradient) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#7C69EF] to-[#6351D8] text-white shadow-md space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold flex items-center gap-1 opacity-90">
                        <Star weight="fill" className="w-3.5 h-3.5 text-white" />
                        IPK
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-3xl font-black">0</h3>
                      <div className="flex text-amber-300 text-xs">
                        {"★★★★".split("").map((s, i) => (
                          <span key={i} className="opacity-80">★</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Tagihan (Sky Blue Gradient) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white shadow-md space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold flex items-center gap-1 opacity-90">
                        <CreditCard weight="bold" className="w-3.5 h-3.5" />
                        Tagihan
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight">Rp 5.900.000</h3>
                      <span className="text-[10px] opacity-90 block mt-0.5">Total tunggakan terakhir</span>
                    </div>
                  </div>

                  {/* Card 3: Semester (Coral Red Gradient) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F87171] to-[#DC2626] text-white shadow-md space-y-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold flex items-center gap-1 opacity-90">
                        <Trophy weight="bold" className="w-3.5 h-3.5" />
                        Semester
                      </span>
                    </div>
                    <h3 className="text-3xl font-black">1</h3>
                  </div>

                  {/* Card 4: Jumlah SKS (Magenta Purple Gradient) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#C084FC] to-[#9333EA] text-white shadow-md space-y-2 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold flex items-center gap-1 opacity-90">
                        <Table weight="bold" className="w-3.5 h-3.5" />
                        Jumlah SKS
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center text-[10px] font-extrabold">
                        0%
                      </div>
                      <span className="text-base font-black">0 SKS</span>
                    </div>
                  </div>

                </div>

                {/* Jadwal Pertemuan Kuliah Section */}
                <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-navy-800">
                    <div className="flex items-center gap-2">
                      <Calendar weight="bold" className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-bold text-navy-900 dark:text-white">
                        Jadwal Pertemuan Kuliah
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <select className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-800">
                        <option>Hari Ini</option>
                        <option>Besok</option>
                        <option>Minggu Ini</option>
                      </select>
                      <button className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-800 text-slate-500">
                        Pilih Tanggal
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    Rabu, 19 Agustus 2026
                  </div>

                  <div className="text-center py-10 space-y-2 text-slate-400">
                    <Folder weight="duotone" className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-xs font-medium">Tidak ada jadwal pertemuan kuliah</p>
                  </div>
                </div>

                {/* Grafik Masa Studi Section */}
                <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-navy-800">
                    <BookmarkSimple weight="bold" className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm font-bold text-navy-900 dark:text-white">
                      Grafik Masa Studi
                    </h4>
                  </div>

                  <div className="h-44 flex items-end justify-between px-6 pt-4 border-l border-b border-slate-300 dark:border-navy-700 relative text-[10px] text-slate-400 font-mono">
                    {/* Y-Labels */}
                    <div className="absolute -left-6 top-0">24</div>
                    <div className="absolute -left-6 top-1/4">18</div>
                    <div className="absolute -left-6 top-2/4">12</div>
                    <div className="absolute -left-6 top-3/4">6</div>
                    <div className="absolute -left-4 bottom-0">0</div>

                    {/* Semester Bars */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <div key={sem} className="flex flex-col items-center gap-1 flex-1">
                        <div className={`w-6 rounded-t-md transition-all ${
                          sem === 1
                            ? "h-28 bg-blue-500 shadow-sm"
                            : "h-2 bg-slate-200 dark:bg-navy-800"
                        }`} />
                        <span className="text-[10px] mt-1 font-semibold">Sem {sem}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-[11px] font-bold text-slate-400">
                    Semester
                  </div>
                </div>

              </div>
            )}

            {/* Screen: KRS */}
            {simulatedMenu === "KRS" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                  Kartu Rencana Studi (KRS) - Semester Ganjil 2026/2027
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Paket 20 SKS Semester 1 Teknologi Informasi UMKT telah disiapkan secara otomatis oleh Biro BAAK.
                </p>
                <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-2 text-xs">
                  <div className="flex justify-between font-bold pb-2 border-b border-slate-100">
                    <span>Mata Kuliah</span>
                    <span>SKS</span>
                  </div>
                  <div className="flex justify-between"><span>CSE1013 - Aljabar Linear</span><span>3 SKS</span></div>
                  <div className="flex justify-between"><span>CSE1023 - Matematika Diskrit</span><span>3 SKS</span></div>
                  <div className="flex justify-between"><span>CSE1043 - Dasar Pemrograman</span><span>3 SKS</span></div>
                  <div className="flex justify-between"><span>CSE1054 - Praktikum Dasar Pemrograman</span><span>1 SKS</span></div>
                  <div className="flex justify-between"><span>CSE1063 - Sistem Digital & Arsitektur Komputer</span><span>3 SKS</span></div>
                </div>
              </div>
            )}

            {/* Screen: Biaya Kuliah */}
            {simulatedMenu === "Biaya Kuliah" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                  Informasi Biaya Kuliah & Tagihan Virtual Account (VA)
                </h3>
                <div className="p-5 rounded-2xl bg-sky-50 dark:bg-navy-900 border border-sky-200 dark:border-navy-700 space-y-3 text-xs">
                  <div className="flex justify-between font-bold">
                    <span>Total Tagihan Semester 1</span>
                    <span className="text-sky-700 dark:text-sky-300 font-mono text-sm">Rp 5.900.000</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Nomor BRIVA Virtual Account diterbitkan melalui pangkalan data SIKAD saat pembukaan masa pembayaran.
                  </p>
                </div>
              </div>
            )}

            {/* Screen: Other menus fallback */}
            {simulatedMenu !== "Dashboard" && simulatedMenu !== "KRS" && simulatedMenu !== "Biaya Kuliah" && (
              <div className="text-center py-16 space-y-3">
                <FolderOpen weight="duotone" className="w-12 h-12 text-blue-500 mx-auto" />
                <h3 className="text-base font-bold text-navy-900 dark:text-white">
                  Menu: {simulatedMenu}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Fitur ini dapat diakses secara langsung setelah perkuliahan semester ganjil 2026/2027 resmi dimulai di portal mahasiswa.umkt.ac.id.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* 3. PANDUAN LANGKAH SIKAD */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
            Petunjuk Praktis Penggunaan SIKAD UMKT
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400">
            Ketahui langkah-langkah penting dari login pertama kali hingga konsultasi Dosen PA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIKAD_GUIDES.map((g, i) => (
            <div
              key={g.id}
              className="p-6 rounded-3xl glass-card border border-navy-200/60 dark:border-navy-800 space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    {g.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">0{i + 1}</span>
                </div>
                <h3 className="text-base font-bold text-navy-900 dark:text-white leading-snug">
                  {g.title}
                </h3>
                <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                  {g.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-navy-100 dark:border-navy-800 text-xs text-nyala-600 dark:text-nyala-400 font-semibold">
                Tips: {g.tips}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TEMPLATE CHAT KE DOSEN PA */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-navy-200/70 dark:border-navy-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-nyala-600 dark:text-nyala-400 uppercase tracking-wider">
              Template Chat PA Online
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-navy-900 dark:text-white">
              Format Etika Bimbingan & Validasi KRS ke Dosen PA
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-900/80 border border-navy-200/60 dark:border-navy-800 text-xs sm:text-sm font-mono text-navy-800 dark:text-navy-200 relative">
          <p className="leading-relaxed whitespace-pre-line">
            {`Assalamu’alaikum Warahmatullahi Wabarakatuh.
Selamat pagi/siang Bapak/Ibu [Nama Dosen PA], mohon maaf mengganggu waktu Bapak/Ibu.

Perkenalkan saya:
Nama: [Nama Lengkap Mahasiswa]
NIM: [Nomor Induk Mahasiswa]
Program Studi: Teknologi Informasi UMKT Angkatan 2026

Ingin menginformasikan bahwa saya telah melakukan pengisian dan pengajuan paket KRS Semester 1 melalui portal SIKAD (mahasiswa.umkt.ac.id).
Mohon kesediaan Bapak/Ibu Dosen Pembimbing Akademik untuk memeriksa dan menyetujui validasi KRS tersebut.

Terima kasih banyak atas bimbingan dan waktu yang Bapak/Ibu berikan.
Wassalamu’alaikum Warahmatullahi Wabarakatuh.`}
          </p>

          <button
            onClick={() =>
              handleCopy(
                `Assalamu’alaikum Warahmatullahi Wabarakatuh.\nSelamat pagi/siang Bapak/Ibu [Nama Dosen PA], mohon maaf mengganggu waktu Bapak/Ibu.\n\nPerkenalkan saya:\nNama: [Nama Lengkap Mahasiswa]\nNIM: [Nomor Induk Mahasiswa]\nProgram Studi: Teknologi Informasi UMKT Angkatan 2026\n\nIngin menginformasikan bahwa saya telah melakukan pengisian dan pengajuan paket KRS Semester 1 melalui portal SIKAD (mahasiswa.umkt.ac.id).\nMohon kesediaan Bapak/Ibu Dosen Pembimbing Akademik untuk memeriksa dan menyetujui validasi KRS tersebut.\n\nTerima kasih banyak atas bimbingan dan waktu yang Bapak/Ibu berikan.\nWassalamu’alaikum Warahmatullahi Wabarakatuh.`,
                "pa-sikad",
                "Template Chat Dosen PA"
              )
            }
            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-nyala-500 hover:bg-nyala-600 text-white font-sans text-xs font-bold transition-all shadow-xs"
          >
            {copiedKey === "pa-sikad" ? <Check weight="bold" className="w-3.5 h-3.5" /> : <Copy weight="bold" className="w-3.5 h-3.5" />}
            <span>{copiedKey === "pa-sikad" ? "Tersalin!" : "Salin Template Chat"}</span>
          </button>
        </div>
      </div>

      {/* Backlink Banner */}
      <BacklinkBanner />

    </div>
  );
}
