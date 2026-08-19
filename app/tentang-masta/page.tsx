"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpenText, 
  Sparkles, 
  Target, 
  Compass, 
  HeartHandshake, 
  GraduationCap, 
  ShieldCheck, 
  ExternalLink, 
  ChevronDown, 
  Globe, 
  Users, 
  Flame,
  Award
} from "lucide-react";
import BacklinkBanner from "@/components/BacklinkBanner";
import MascotFlame from "@/components/MascotFlame";
import { MASTA_FAQS, OFFICIAL_LINKS } from "@/lib/masta-data";

export default function TentangMastaPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* 1. Header & Hero Intro */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-bold uppercase tracking-wider">
          <BookOpenText className="w-4 h-4" />
          <span>Informasi Resmi & Edukatif</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-tight">
          Masa Ta’aruf (MASTA) <br className="hidden sm:inline" />
          <span className="fire-text-gradient">UMKT Angkatan 2026</span>
        </h1>
        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300 leading-relaxed">
          MASTA MABA adalah gerbang awal transformasi dari siswa menjadi insan akademis berkarakter islami di Universitas Muhammadiyah Kalimantan Timur.
        </p>
      </div>

      {/* 2. Definisi & Esensi MASTA Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-navy-200/60 dark:border-navy-800 space-y-6 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-nyala-600 dark:text-nyala-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Apa Itu MASTA MABA?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white">
              Bukan Sekadar Orientasi, Ini Langkah Awal Masa Depanmu
            </h2>
            <p className="text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
              MASTA (Masa Ta’aruf) Mahasiswa Baru UMKT 2026 merupakan proses pengenalan awal yang dirancang untuk membantu mahasiswa baru memahami lingkungan kampus, sistem akademik, nilai-nilai Kemuhammadiyahan, tata tertib, serta berbagai layanan kemahasiswaan dan peluang pengembangan diri.
            </p>
            <p className="text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
              Di UMKT, orientasi menjunjung tinggi nilai persaudaraan, edukasi positif, dan pembentukan karakter mulia tanpa perpeloncoan.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <MascotFlame size="xl" mood="cheering" />
          </div>
        </div>
      </div>

      {/* 3. Tiga Fokus Utama MASTA */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
            3 Fokus Utama Pembinaan
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400">
            Kurikulum orientasi MASTA UMKT 2026 bertumpu pada 3 fondasi penting:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Fokus 1 */}
          <div className="p-6 sm:p-7 rounded-3xl glass-card border border-navy-200/60 dark:border-navy-800 space-y-3 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900 dark:text-white">
              1. Adaptasi Kehidupan Kampus
            </h3>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
              Transisi lancar dari pola belajar sekolah ke iklim perguruan tinggi mandiri, pengenalan sistem informasi akademik (SIAKAD), serta sarana prasarana kampus.
            </p>
          </div>

          {/* Fokus 2 */}
          <div className="p-6 sm:p-7 rounded-3xl glass-card border border-navy-200/60 dark:border-navy-800 space-y-3 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-nyala-500 text-white flex items-center justify-center shadow-fire">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900 dark:text-white">
              2. Pembentukan Karakter
            </h3>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
              Menanamkan integritas moral, etika akademik, kepedulian sosial, serta nilai-nilai luhur Al-Islam dan Kemuhammadiyahan yang berkemajuan.
            </p>
          </div>

          {/* Fokus 3 */}
          <div className="p-6 sm:p-7 rounded-3xl glass-card border border-navy-200/60 dark:border-navy-800 space-y-3 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900 dark:text-white">
              3. Pengenalan Peluang Mahasiswa
            </h3>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
              Eksplorasi potensi diri melalui Program Kreativitas Mahasiswa (PKM), beasiswa, kompetisi nasional/internasional, dan Unit Kegiatan Mahasiswa (UKM).
            </p>
          </div>

        </div>
      </div>

      {/* 4. 4 Pilar Tujuan MASTA */}
      <div className="rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-white p-6 sm:p-10 border border-navy-800 space-y-8 shadow-2xl">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-nyala-400">
            Pilar Capaian
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            4 Pilar Tujuan Pelaksanaan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Orientasi",
              desc: "Mengenal ekosistem, tata kelola, dan fasilitas pendukung di lingkungan UMKT.",
              icon: Target,
            },
            {
              title: "Akademik",
              desc: "Memahami kurikulum, SKS, bimbingan KRS, dan etika perkuliahan di era digital.",
              icon: GraduationCap,
            },
            {
              title: "Relasi",
              desc: "Membangun jejaring pertemanan kolaboratif lintas program studi dan fakultas.",
              icon: Users,
            },
            {
              title: "Karakter",
              desc: "Menumbuhkan sikap disiplin, santun, kritis, dan berwawasan kebangsaan.",
              icon: HeartHandshake,
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 hover:border-nyala-500/50 transition-colors"
              >
                <Icon className="w-6 h-6 text-nyala-400" />
                <h4 className="text-base font-bold text-white">{pillar.title}</h4>
                <p className="text-xs text-navy-300 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. FAQ Accordion */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400">
            Jawaban seputar teknis dan kepesertaan MASTA MABA UMKT 2026
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {MASTA_FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;

            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-navy-200/60 dark:border-navy-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-navy-900 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-nyala-500 font-extrabold">Q:</span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-navy-400 transition-transform ${
                      isOpen ? "rotate-180 text-nyala-500" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed border-t border-navy-100 dark:border-navy-800/60 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Prominent Backlinks Section */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-nyala-600 dark:text-nyala-400 uppercase tracking-wider">
            Tautan & Referensi Resmi
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900 dark:text-white">
            Kunjungi Sumber Informasi Terpercaya UMKT
          </h3>
        </div>
        <BacklinkBanner />
      </div>

    </div>
  );
}
