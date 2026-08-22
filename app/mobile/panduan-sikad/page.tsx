"use client";

import React, { useState } from "react";
import { 
  Laptop, 
  Table, 
  Calendar, 
  CreditCard, 
  Star, 
  CheckCircle, 
  ArrowSquareOut,
  ShieldCheck,
  CaretRight,
  Copy,
  Check,
  ChatCenteredText,
  Clock,
  WarningCircle
} from "@phosphor-icons/react";
import FlutterCard from "@/components/flutter/FlutterCard";
import FlutterSegmentedTabs from "@/components/flutter/FlutterSegmentedTabs";
import FlutterListTile from "@/components/flutter/FlutterListTile";
import { OFFICIAL_LINKS } from "@/lib/masta-data";
import { useToast } from "@/context/ToastContext";

export default function MobilePanduanSikadPage() {
  const [activeTab, setActiveTab] = useState<string>("langkah");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const SIKAD_TABS = [
    { id: "langkah", label: "5 Langkah", icon: Laptop },
    { id: "etika-chat", label: "Etika Dosen PA", icon: ChatCenteredText },
    { id: "presensi", label: "Presensi 75%", icon: Clock },
  ];

  const SIKAD_STEPS = [
    {
      title: "1. Login NIM & Password",
      desc: "Buka portal mahasiswa.umkt.ac.id. Masukkan NIM 9 digit dan password awal yang tertera pada lembar bukti registrasi PMB.",
      tips: "Jika lupa password, segera hubungi Helpdesk IT Gedung E atau klik tautan 'Lupa Password'.",
    },
    {
      title: "2. Pengisian KRS Online",
      desc: "Masuk ke menu Akademik > Isi KRS. Pilih paket 20 SKS wajib Semester 1 dan pastikan tidak ada bentrok antar kelas.",
      tips: "Segera lakukan validasi dengan Dosen Pembimbing Akademik (PA) sebelum batas waktu penetapan KRS berakhir.",
    },
    {
      title: "3. Presensi Kuliah Min. 75%",
      desc: "Scan QR presensi atau isi token presensi dosen di kelas. Kehadiran minimal 75% adalah syarat mutlak mengikuti UAS.",
      tips: "Kehadiran kurang dari 75% otomatis menggugurkan hak mengikuti UAS dan mata kuliah memperoleh nilai E.",
    },
    {
      title: "4. Tagihan & BRIVA SPP",
      desc: "Menu Biaya Kuliah > Generate BRIVA. Lakukan pembayaran via ATM, Mobile Banking BRI, atau teller bank terdekat.",
      tips: "KRS otomatis terbuka dalam hitungan menit setelah sistem keuangan memvalidasi pelunasan tagihan SPP.",
    },
    {
      title: "5. Hasil Studi & KHS",
      desc: "Pantau Indeks Prestasi Semester (IPS) dan Indeks Prestasi Kumulatif (IPK) pada menu Nilai > Kartu Hasil Studi (KHS).",
      tips: "Pertahankan IP di atas 3.00 agar berhak mengambil beban maksimal 24 SKS di semester berikutnya.",
    },
  ];

  const CHAT_TEMPLATE = `Assalamu'alaikum Warahmatullahi Wabarakatuh,

Selamat pagi/siang Bapak/Ibu [Nama Dosen PA],
Mohon maaf mengganggu waktu Bapak/Ibu.

Perkenalkan, saya:
Nama: [Nama Lengkap Mahasiswa]
NIM: [Nomor Induk Mahasiswa]
Program Studi: S1 Teknologi Informasi (Angkatan 2026)

Izin menyampaikan bahwa saya telah menyelesaikan pengisian Kartu Rencana Studi (KRS) untuk Semester Ganjil 2026/2027 melalui portal SIKAD sejumlah [20] SKS.

Mohon kesediaan Bapak/Ibu untuk memeriksa dan memberikan validasi/persetujuan pada sistem SIKAD.

Terima kasih banyak atas bimbingan dan waktu yang Bapak/Ibu berikan.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.`;

  const handleCopyChat = () => {
    navigator.clipboard.writeText(CHAT_TEMPLATE);
    setCopied(true);
    toast.success("Template etika chat Dosen PA disalin ke clipboard!", "Tersalin");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      
      {/* ── 1. HEADER ── */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
          Simulator Portal SIKAD
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Panduan terstruktur mengoperasikan portal resmi <code className="font-mono text-nyala-600 dark:text-nyala-400">mahasiswa.umkt.ac.id</code>.
        </p>
      </div>

      {/* ── 2. OFFICIAL SIKAD LINK BANNER ── */}
      <a
        href={OFFICIAL_LINKS.sikadMahasiswa}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-nyala-600 to-nyala-500 hover:from-nyala-500 hover:to-nyala-600 text-white flex items-center justify-between text-xs sm:text-sm font-bold shadow-md shadow-nyala-500/20 active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-2.5">
          <Laptop weight="bold" className="w-5 h-5" />
          <span>Kunjungi Portal SIKAD UMKT Resmi</span>
        </div>
        <ArrowSquareOut weight="bold" className="w-4 h-4" />
      </a>

      {/* ── 3. SEGMENTED TABS (Hick's Law 1-Tap Filter) ── */}
      <FlutterSegmentedTabs
        tabs={SIKAD_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* ── 4. TAB 1: 5 LANGKAH SIKAD (Interactive Carousel Deck) ── */}
      {activeTab === "langkah" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Alur Pengoperasian Sistem
            </span>
            <span className="text-xs font-mono text-nyala-500 font-bold">
              Langkah {activeStep + 1} / 5
            </span>
          </div>

          <FlutterCard variant="elevated" className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-nyala-100 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400 uppercase inline-block">
                Langkah {activeStep + 1}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white">
                {SIKAD_STEPS[activeStep].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {SIKAD_STEPS[activeStep].desc}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-navy-950/80 border border-amber-200 dark:border-navy-800 text-xs text-amber-900 dark:text-amber-300 space-y-1">
              <span className="font-bold block">💡 Tips Penting Senior:</span>
              <p className="text-[11px] text-amber-800 dark:text-slate-300 leading-snug">
                {SIKAD_STEPS[activeStep].tips}
              </p>
            </div>

            {/* Navigation Step Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-30 cursor-pointer active:scale-95 transition-all"
              >
                ← Sebelumnya
              </button>

              <button
                disabled={activeStep === SIKAD_STEPS.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(SIKAD_STEPS.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-nyala-500 text-white text-xs font-bold disabled:opacity-30 cursor-pointer active:scale-95 transition-all shadow-sm"
              >
                Selanjutnya →
              </button>
            </div>
          </FlutterCard>
        </div>
      )}

      {/* ── 5. TAB 2: TEMPLATE ETIKA CHAT DOSEN PA ── */}
      {activeTab === "etika-chat" && (
        <div className="space-y-4">
          <FlutterCard variant="elevated" className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-navy-950 dark:text-white font-bold text-sm">
                <ChatCenteredText weight="bold" className="w-5 h-5 text-nyala-500" />
                <span>Template WhatsApp Konfirmasi KRS</span>
              </div>

              <button
                onClick={handleCopyChat}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-nyala-500 text-white text-xs font-bold active:scale-95 transition-all shadow-sm"
              >
                {copied ? <Check weight="bold" className="w-3.5 h-3.5" /> : <Copy weight="bold" className="w-3.5 h-3.5" />}
                <span>{copied ? "Tersalin!" : "Salin Pesan"}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
              {CHAT_TEMPLATE}
            </pre>
          </FlutterCard>
        </div>
      )}

      {/* ── 6. TAB 3: ATURAN PRESENSI 75% ── */}
      {activeTab === "presensi" && (
        <div className="space-y-4">
          <FlutterCard variant="elevated" className="border-rose-300 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <WarningCircle weight="fill" className="w-5 h-5" />
              <span>Regulasi Wajib Presensi Minimal 75%</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Sesuai SK Rektor UMKT, mahasiswa wajib menghadiri minimal 12 dari total 16 pertemuan kuliah per semester.
            </p>
          </FlutterCard>

          <div className="grid grid-cols-2 gap-3">
            <FlutterCard variant="outlined" className="text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Sesi Kuliah</span>
              <div className="text-xl font-black font-mono text-navy-950 dark:text-white">16 Pertemuan</div>
              <span className="text-[10px] text-slate-500">14 Kuliah + UTS + UAS</span>
            </FlutterCard>

            <FlutterCard variant="outlined" className="text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Batas Minimum</span>
              <div className="text-xl font-black font-mono text-emerald-500">12 Kehadiran</div>
              <span className="text-[10px] text-slate-500">Maks. 4x Alpa/Izin</span>
            </FlutterCard>
          </div>
        </div>
      )}

    </div>
  );
}
