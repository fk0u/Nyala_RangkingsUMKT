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
  CaretRight
} from "@phosphor-icons/react";
import { OFFICIAL_LINKS } from "@/lib/masta-data";

export default function MobilePanduanSikadPage() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const SIKAD_STEPS = [
    {
      title: "1. Login NIM & Password",
      desc: "Buka mahasiswa.umkt.ac.id. Masukkan NIM 9 digit dan password default dari bukti registrasi PMB.",
      tips: "Jika lupa password, segera hubungi Helpdesk IT Gedung E atau klik menu Lupa Password.",
    },
    {
      title: "2. Pengisian KRS Online",
      desc: "Masuk ke menu KRS > Isi KRS. Ambil paket 20 SKS wajib Semester 1 dan pastikan tidak ada bentrok kelas.",
      tips: "Segera lakukan validasi dengan Dosen Pembimbing Akademik (PA) sebelum batas 27 Agustus 2026.",
    },
    {
      title: "3. Presensi Kuliah Min. 75%",
      desc: "Scan QR presensi atau isi token presensi dosen di kelas. Minimal kehadiran 75% adalah syarat mutlak ikut UAS.",
      tips: "Kurang dari 75% kehadiran otomatis tidak bisa mengikuti Ujian Akhir Semester (nilai E).",
    },
    {
      title: "4. Tagihan & BRIVA SPP",
      desc: "Menu Biaya Kuliah > Generate BRIVA. Lakukan pembayaran via ATM, Mobile Banking BRI, atau teller.",
      tips: "KRS otomatis terbuka setelah sistem mencatat pelunasan tagihan SPP.",
    },
    {
      title: "5. Hasil Studi & KHS",
      desc: "Pantau Indeks Prestasi Semester (IPS) dan Indeks Prestasi Kumulatif (IPK) di menu Nilai > KHS.",
      tips: "Pertahankan IP di atas 3.00 agar dapat mengambil maksimal 24 SKS di semester berikutnya.",
    },
  ];

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white">Simulator Portal SIKAD</h1>
        <p className="text-xs text-navy-600 dark:text-navy-300">
          Panduan langkah demi langkah mengoperasikan portal <code className="font-mono text-nyala-600 dark:text-nyala-400">mahasiswa.umkt.ac.id</code>.
        </p>
      </div>

      {/* Official Link Button */}
      <a
        href={OFFICIAL_LINKS.sikadMahasiswa}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 rounded-2xl bg-nyala-600 hover:bg-nyala-500 text-white flex items-center justify-between text-xs font-bold shadow-md active:scale-98 transition-transform"
      >
        <div className="flex items-center gap-2.5">
          <Laptop weight="bold" className="w-5 h-5" />
          <span>Kunjungi mahasiswa.umkt.ac.id Resmi</span>
        </div>
        <ArrowSquareOut weight="bold" className="w-4 h-4" />
      </a>

      {/* Interactive Step Card Deck */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-wider">
            5 Langkah Alur Akademik SIKAD
          </h3>
          <span className="text-[11px] font-mono text-navy-500 dark:text-navy-400 font-bold">Langkah {activeStep + 1}/5</span>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-nyala-600 dark:text-nyala-400 font-bold uppercase block">Langkah Ke-{activeStep + 1}</span>
            <h4 className="text-base sm:text-lg font-black text-navy-950 dark:text-white">{SIKAD_STEPS[activeStep].title}</h4>
            <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed pt-1">{SIKAD_STEPS[activeStep].desc}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-navy-950/80 border border-amber-200 dark:border-navy-800 text-xs text-amber-800 dark:text-amber-300 space-y-0.5">
            <span className="font-bold text-[11px] block">Tips Penting:</span>
            <p className="text-[11px] text-amber-900 dark:text-navy-300 leading-snug">{SIKAD_STEPS[activeStep].tips}</p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-navy-100 dark:border-navy-800">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              className="px-3.5 py-2 rounded-xl bg-navy-100 dark:bg-navy-900 border border-navy-200 dark:border-navy-800 text-xs font-bold text-navy-700 dark:text-navy-300 disabled:opacity-30 cursor-pointer hover:bg-navy-200 dark:hover:bg-navy-800 transition-colors"
            >
              ← Sebelumnya
            </button>

            <div className="flex items-center gap-1">
              {SIKAD_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeStep === i ? "w-6 bg-nyala-600" : "w-2 bg-navy-200 dark:bg-navy-700"
                  }`}
                />
              ))}
            </div>

            <button
              disabled={activeStep === SIKAD_STEPS.length - 1}
              onClick={() => setActiveStep((prev) => Math.min(SIKAD_STEPS.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl bg-nyala-600 hover:bg-nyala-500 text-xs font-bold text-white disabled:opacity-30 cursor-pointer transition-colors shadow-sm"
            >
              Lanjut →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
