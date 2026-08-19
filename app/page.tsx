"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HeartPulse, 
  Calendar, 
  BookOpen, 
  ShieldCheck, 
  MapPin, 
  ExternalLink, 
  Flame,
  Laptop
} from "lucide-react";
import MascotFlame from "@/components/MascotFlame";
import CountdownTimer from "@/components/CountdownTimer";
import BacklinkBanner from "@/components/BacklinkBanner";
import ProgressBar from "@/components/ProgressBar";
import { MASTA_STAGES, OFFICIAL_LINKS } from "@/lib/masta-data";

export default function HomePage() {
  const [checklistProgress, setChecklistProgress] = useState(0);
  const [todayMood, setTodayMood] = useState<string | null>(null);

  useEffect(() => {
    const savedChecklist = localStorage.getItem("nyala_checklist");
    if (savedChecklist) {
      try {
        const parsed = JSON.parse(savedChecklist);
        const checkedCount = Object.values(parsed).filter(Boolean).length;
        const pct = Math.round((checkedCount / 11) * 100);
        setChecklistProgress(pct);
      } catch (e) {
        console.error(e);
      }
    }

    const savedMoods = localStorage.getItem("nyala_mood_history");
    if (savedMoods) {
      try {
        const parsed = JSON.parse(savedMoods);
        if (parsed.length > 0) {
          setTodayMood(parsed[0].emoji);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Ambient Warm Atmosphere */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-nyala-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-nyala-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Hero Copy */}
            <motion.div 
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nyala-500/10 border border-nyala-500/20 text-nyala-600 dark:text-nyala-400 text-xs sm:text-sm font-semibold">
                <Flame className="w-4 h-4 text-nyala-500" />
                <span>Sahabat Virtual MABA UMKT 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 dark:text-white leading-[1.15]">
                Nyala. <br className="hidden sm:inline" />
                <span className="fire-text-gradient">
                  Teman perjalanan
                </span>{" "}
                MABA-mu.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-navy-600 dark:text-navy-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Persiapkan masa ta’aruf kampus dengan tenang. Nyala memandu alur resmi MASTA UMKT 2026, sistem akademik SIKAD mahasiswa.umkt.ac.id, kesiapan fisik dan mental harian, serta asisten AI responsif.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/companion"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-nyala-500 to-nyala-600 hover:from-nyala-600 hover:to-nyala-700 text-white font-bold text-base shadow-fire-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Tanya Nyala AI</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/panduan-sikad"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-soft hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Laptop className="w-5 h-5" />
                  <span>Panduan SIKAD UMKT</span>
                </Link>

                <Link
                  href="/checklist"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-navy-800 hover:bg-navy-50 dark:hover:bg-navy-750 text-navy-800 dark:text-white font-semibold text-base border border-navy-200 dark:border-navy-700 shadow-soft hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-nyala-500" />
                  <span>Checklist</span>
                </Link>
              </div>

              {/* Verified Identity Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-navy-500 dark:text-navy-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Rujukan Resmi masta-maba.odoo.com & mahasiswa.umkt.ac.id</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-nyala-500" />
                  <span>Kampus UMKT Samarinda</span>
                </div>
              </div>

            </motion.div>

            {/* Right Col: Interactive Visual Card with Mascot */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative glass-card rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-navy-700/80 shadow-2xl">
                
                {/* Center Mascot with animated message bubble */}
                <div className="flex flex-col items-center text-center space-y-4">
                  
                  <MascotFlame size="xl" mood="excited" />

                  {/* Speech Bubble */}
                  <div className="relative bg-cream-100 dark:bg-navy-800 p-4 rounded-2xl border border-amber-200/60 dark:border-navy-700 text-left max-w-sm shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-nyala-600 dark:text-nyala-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 fill-nyala-500" />
                        Pesan Hangat Nyala:
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-navy-800 dark:text-navy-200 leading-snug">
                      Selamat datang di Universitas Muhammadiyah Kalimantan Timur! Buka panduan SIKAD atau tanyakan apa pun seputar MASTA.
                    </p>
                  </div>

                  {/* Quick Summary Grid */}
                  <div className="grid grid-cols-2 gap-3 w-full pt-2">
                    <Link
                      href="/checklist"
                      className="p-3 rounded-xl bg-white/70 dark:bg-navy-900/50 border border-navy-100 dark:border-navy-800 text-left hover:border-nyala-500/50 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-semibold text-navy-500 dark:text-navy-400">Kelengkapan</span>
                        <span className="text-xs font-bold text-nyala-600 dark:text-nyala-400">{checklistProgress}%</span>
                      </div>
                      <ProgressBar progress={checklistProgress} size="sm" showPercentage={false} />
                    </Link>

                    <Link
                      href="/health-check"
                      className="p-3 rounded-xl bg-white/70 dark:bg-navy-900/50 border border-navy-100 dark:border-navy-800 text-left hover:border-nyala-500/50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-semibold text-navy-500 dark:text-navy-400">Mood Hari Ini</span>
                        <span className="text-base">{todayMood || "😊"}</span>
                      </div>
                      <span className="text-[11px] text-nyala-600 dark:text-nyala-400 font-medium">
                        {todayMood ? "Tersimpan" : "Cek Mood →"}
                      </span>
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. COUNTDOWN & VERIFIED BACKLINK SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <CountdownTimer />
        <BacklinkBanner compact />
      </section>

      {/* 3. CORE FEATURES HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fitur Terpadu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 dark:text-white">
            Panduan Lengkap MASTA & SIKAD UMKT
          </h2>
          <p className="text-sm sm:text-base text-navy-600 dark:text-navy-400 max-w-xl mx-auto">
            Semua kebutuhan informasi orientasi, kesiapan teknis, portal mahasiswa, dan pendampingan mental dirancang dalam satu aplikasi terpadu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Companion AI */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-100 dark:border-navy-800 space-y-4 hover:border-nyala-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nyala-500 to-amber-500 text-white flex items-center justify-center shadow-fire">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Tanya Nyala (AI Companion)
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Tanyakan tata tertib, tips On-Cam Zoom, cara adaptasi lingkungan baru, dan info unit kegiatan mahasiswa secara instan.
              </p>
            </div>
            <Link
              href="/companion"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Mulai Percakapan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Panduan SIKAD */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-blue-200/60 dark:border-blue-900/60 space-y-4 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-gradient-to-br from-blue-500/5 to-transparent">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Panduan Portal SIKAD UMKT
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Simulasi dan petunjuk lengkap login NIM, pengisian KRS, jadwal kuliah, presensi 75%, tagihan SPP, hingga nilai KHS.
              </p>
            </div>
            <Link
              href="/panduan-sikad"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 group pt-2"
            >
              <span>Buka Panduan SIKAD</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 3: Health Check */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-100 dark:border-navy-800 space-y-4 hover:border-nyala-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Health Check & Mood Tracker
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Pantau kecukupan tidur, hidrasi, asupan makan, dan kestabilan emosi sebelum rangkaian orientasi dimulai.
              </p>
            </div>
            <Link
              href="/health-check"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Periksa Kesiapan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 4: 5 Alur MASTA */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-100 dark:border-navy-800 space-y-4 hover:border-nyala-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Alur Resmi 5 Tahap
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Pelajari urutan resmi: Panduan, Verifikasi Identitas, Sidang Terbuka Zoom, UKM Expo, hingga Inaugurasi Puncak.
              </p>
            </div>
            <Link
              href="/jadwal"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Buka Alur Kegiatan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 5: Checklist */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-100 dark:border-navy-800 space-y-4 hover:border-nyala-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Checklist Perlengkapan
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Periksa berkas administrasi, pakaian resmi putih hitam, kuota cadangan, dan kelengkapan pribadi lainnya.
              </p>
            </div>
            <Link
              href="/checklist"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Kelola Checklist</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 6: Edukasi & Nilai MASTA */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-100 dark:border-navy-800 space-y-4 hover:border-nyala-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-navy-900 dark:bg-navy-700 text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-6 h-6 text-nyala-400" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Edukasi & 4 Pilar MASTA
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Pahami tujuan pembinaan: Adaptasi Kampus, Karakter Islami, dan Peluang Pengembangan Diri di perguruan tinggi.
              </p>
            </div>
            <Link
              href="/tentang-masta"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Baca Pedoman Edukatif</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. TAHAPAN ALUR MASTA PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-cream-100/60 dark:bg-navy-900/60 border border-amber-200/50 dark:border-navy-800 p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
                Alur Resmi MASTA MABA UMKT 2026
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
                5 Tahapan Pelaksanaan Orientasi
              </h2>
            </div>
            <Link
              href="/jadwal"
              className="inline-flex items-center gap-2 text-sm font-bold text-nyala-600 dark:text-nyala-400 hover:underline"
            >
              <span>Lihat Detail Tahapan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {MASTA_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="p-4 rounded-2xl bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700/70 space-y-2.5 relative overflow-hidden group hover:border-nyala-500/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-nyala-500/15 text-nyala-600 dark:text-nyala-400 font-extrabold flex items-center justify-center text-sm">
                  {stage.id}
                </div>
                <h4 className="text-sm font-bold text-navy-900 dark:text-white leading-tight">
                  {stage.title.replace(/^\d+\.\s*/, '')}
                </h4>
                <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2">
                  {stage.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROMINENT BACKLINK BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BacklinkBanner />
      </section>

    </div>
  );
}
