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
  Users, 
  Zap,
  ExternalLink,
  Flame,
  Clock
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
    // Load local storage progress for summary
    const savedChecklist = localStorage.getItem("nyala_checklist");
    if (savedChecklist) {
      try {
        const parsed = JSON.parse(savedChecklist);
        const checkedCount = Object.values(parsed).filter(Boolean).length;
        // Total default 11 items
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
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-nyala-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-nyala-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Hero Copy */}
            <motion.div 
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nyala-500/10 border border-nyala-500/20 text-nyala-600 dark:text-nyala-400 text-xs sm:text-sm font-semibold">
                <Flame className="w-4 h-4 text-nyala-500 animate-bounce" />
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
                Masa orientasi (MASTA) gak perlu bikin cemas atau bingung! Nyala hadir sebagai sahabat digital yang menemani persiapanmu, memantau kesehatan fisik & mental, serta siap menjawab segala pertanyaan seputar kampus UMKT.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/companion"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-nyala-500 to-nyala-600 hover:from-nyala-600 hover:to-nyala-700 text-white font-bold text-base shadow-fire-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Mulai Tanya Nyala AI</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/checklist"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-navy-800 hover:bg-navy-50 dark:hover:bg-navy-750 text-navy-800 dark:text-white font-semibold text-base border border-navy-200 dark:border-navy-700 shadow-soft hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-nyala-500" />
                  <span>Checklist Persiapan</span>
                </Link>
              </div>

              {/* Live Status Pill */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-navy-500 dark:text-navy-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Resmi Selaras MASTA UMKT 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-nyala-500" />
                  <span>Didesain untuk Ribuan MABA</span>
                </div>
              </div>

            </motion.div>

            {/* Right Col: Interactive Visual Card with Mascot */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="relative glass-card rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-navy-700/80 shadow-2xl">
                
                {/* Center Mascot with animated message bubble */}
                <div className="flex flex-col items-center text-center space-y-4">
                  
                  <MascotFlame size="xl" mood="excited" />

                  {/* Speech Bubble */}
                  <div className="relative bg-cream-100 dark:bg-navy-800 p-4 rounded-2xl border border-amber-200/60 dark:border-navy-700 text-left max-w-sm shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-nyala-600 dark:text-nyala-400 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-nyala-500" />
                        Pesan Hangat Nyala:
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-navy-800 dark:text-navy-200 leading-snug">
                      “Selamat datang di Universitas Muhammadiyah Kalimantan Timur! Jangan ragu jelajahi semua fitur di sini ya. Nyala siap nemenin kamu setiap saat! 🔥”
                    </p>
                  </div>

                  {/* Quick Summary Grid */}
                  <div className="grid grid-cols-2 gap-3 w-full pt-2">
                    <Link
                      href="/checklist"
                      className="p-3 rounded-xl bg-white/70 dark:bg-navy-900/50 border border-navy-100 dark:border-navy-800 text-left hover:border-nyala-500/50 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-semibold text-navy-500 dark:text-navy-400">Persiapan</span>
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
                        {todayMood ? "Tercatat!" : "Cek Mood →"}
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
            <span>Fitur Unggulan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 dark:text-white">
            Semua yang Kamu Butuhkan untuk MASTA
          </h2>
          <p className="text-sm sm:text-base text-navy-600 dark:text-navy-400 max-w-xl mx-auto">
            Dirancang secara komprehensif untuk memastikan pengalaman orientasimu di UMKT lancar, nyaman, dan berkesan.
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
                Companion AI yang Pengertian
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Ngobrol santai seputar aturan MASTA, tips Zoom On-Cam, cara hilangkan nervous, sampai rekomendasi UKM favorit.
              </p>
            </div>
            <Link
              href="/companion"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Tanya Nyala Sekarang</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Health Check */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-100 dark:border-navy-800 space-y-4 hover:border-nyala-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Health Check & Mood Tracker
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Pantau kondisi fisik (tidur, makan, air putih) dan mental harianmu selama orientasi dengan saran personal yang menyemangati.
              </p>
            </div>
            <Link
              href="/health-check"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Cek Kondisimu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 3: 5 Alur MASTA */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-100 dark:border-navy-800 space-y-4 hover:border-nyala-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                5 Alur Pelaksanaan Resmi
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Panduan terstruktur dari Membaca Panduan, Verifikasi Berkas, Sesi Daring Zoom, UKM Expo, hingga Puncak Acara.
              </p>
            </div>
            <Link
              href="/jadwal"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Lihat Alur Lengkap</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 4: Checklist */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-100 dark:border-navy-800 space-y-4 hover:border-nyala-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Checklist Perlengkapan
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Centang kelengkapan dokumen, atribut baju putih hitam, kuota internet, hingga botol minum tanpa khawatir ada yang terlewat.
              </p>
            </div>
            <Link
              href="/checklist"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Buka Checklist</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 5: Edukasi & Nilai MASTA */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-100 dark:border-navy-800 space-y-4 hover:border-nyala-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Edukasi & 4 Pilar MASTA
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Pahami esensi orientasi kampus: Adaptasi Kehidupan Kampus, Pembentukan Karakter, dan Pengenalan Peluang Mahasiswa.
              </p>
            </div>
            <Link
              href="/tentang-masta"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Pelajari Makna MASTA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card 6: Official Portal */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-100 dark:border-navy-800 space-y-4 hover:border-nyala-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bg-gradient-to-br from-nyala-500/5 to-transparent">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-navy-900 dark:bg-navy-700 text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6 text-nyala-400" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Integrasi Sumber Resmi
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                Seluruh materi bersumber resmi dari Portal MASTA UMKT dan situs resmi Universitas Muhammadiyah Kalimantan Timur.
              </p>
            </div>
            <a
              href={OFFICIAL_LINKS.umktMain}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-nyala-600 dark:text-nyala-400 group pt-2"
            >
              <span>Kunjungi umkt.ac.id</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
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
                5 Langkah Menuju Kelulusan Orientasi
              </h2>
            </div>
            <Link
              href="/jadwal"
              className="inline-flex items-center gap-2 text-sm font-bold text-nyala-600 dark:text-nyala-400 hover:underline"
            >
              <span>Buka Panduan Langkah Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {MASTA_STAGES.map((stage, idx) => (
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
