"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkle, 
  ArrowRight, 
  Heartbeat, 
  CalendarCheck, 
  CheckSquare, 
  BookOpenText, 
  Globe, 
  Laptop, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Headset, 
  Buildings,
  GraduationCap,
  UsersThree,
  Compass,
  ArrowUpRight
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import CountdownTimer from "@/components/CountdownTimer";
import BacklinkBanner from "@/components/BacklinkBanner";
import AdminContactCard from "@/components/AdminContactCard";
import { MASTA_STAGES, OFFICIAL_LINKS, BLOG_POSTS } from "@/lib/masta-data";

export default function HomePage() {
  const latestGuides = BLOG_POSTS.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12 overflow-hidden">
      
      {/* ── 1. AWWWARDS HERO SECTION ── */}
      <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Ambient Glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-gradient-to-b from-nyala-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Super Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 border border-nyala-500/20 text-xs font-black uppercase tracking-wider shadow-sm"
            >
              <Sparkle weight="fill" className="w-4 h-4 text-nyala-500 animate-pulse" />
              <span>Digital Companion Resmi MABA UMKT 2026</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy-900 dark:text-white leading-[1.1]">
                Nyala. <br />
                <span className="fire-text-gradient">Teman Perjalanan MABA-mu.</span>
              </h1>
              <p className="text-base sm:text-lg text-navy-600 dark:text-navy-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed pt-2">
                Menemani setiap langkah adaptasi mahasiswa baru Universitas Muhammadiyah Kalimantan Timur. Dari alur orientasi MASTA, tanya jawab AI cerdas, simulator SIKAD, hingga panduan hidup di Samarinda.
              </p>
            </motion.div>

            {/* Quick Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <Link
                href="/companion"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-nyala-500 via-nyala-600 to-amber-500 hover:from-nyala-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-nyala-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkle weight="fill" className="w-4 h-4" />
                <span>Tanya AI Nyala</span>
              </Link>

              <Link
                href="/jadwal"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-navy-900 hover:bg-navy-50 dark:hover:bg-navy-800 text-navy-800 dark:text-navy-200 border border-navy-200/60 dark:border-navy-700/80 font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <CalendarCheck weight="bold" className="w-4 h-4 text-nyala-500" />
                <span>Alur 5 Tahap MASTA</span>
              </Link>

              <Link
                href="/health"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold text-sm transition-all active:scale-95"
              >
                <Heartbeat weight="fill" className="w-4 h-4" />
                <span>Cek Kesehatan</span>
              </Link>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-6 border-t border-navy-200/60 dark:border-navy-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-navy-500 dark:text-navy-400 font-mono"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck weight="fill" className="w-4 h-4 text-emerald-500" />
                <span>Kurikulum TI & SIKAD 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe weight="fill" className="w-4 h-4 text-nyala-500" />
                <span>Live REST API Terhubung</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock weight="fill" className="w-4 h-4 text-amber-500" />
                <span>Pusat Layanan WITA</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Mascot Avatar & Live Countdown */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Mascot Visual Card */}
            <div className="glass-card p-8 rounded-3xl border border-navy-200/60 dark:border-navy-800 relative overflow-hidden shadow-2xl flex flex-col items-center text-center space-y-4">
              
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-nyala-500/20 to-amber-400/20 absolute inset-0 blur-2xl pointer-events-none" />
                <MascotFlame size="2xl" mood="cheering" className="w-36 h-36 relative z-10" />
              </div>

              <div className="space-y-1 relative z-10">
                <span className="text-xs font-black uppercase tracking-widest text-nyala-500 font-mono">
                  Sahabat Setia MABA
                </span>
                <h3 className="text-lg font-black text-navy-900 dark:text-white">
                  "No Skill No Trust! Semangat Angkatan 2026!"
                </h3>
                <p className="text-xs text-navy-500 dark:text-navy-400">
                  Bersiaplah mengikuti rangkaian MASTA Daring (24 & 26 Agt) dan Luring (28 Agt).
                </p>
              </div>

              {/* Countdown Component */}
              <div className="w-full pt-2">
                <CountdownTimer />
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ── 2. OFFICIAL BACKLINK BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BacklinkBanner />
      </section>

      {/* ── 3. CORE FEATURES GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-nyala-500 font-mono">
            Fitur Utama Ekosistem
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-900 dark:text-white tracking-tight">
            Semua yang Kamu Butuhkan <br />
            <span className="fire-text-gradient">Dalam Satu Tempat</span>
          </h2>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
            Didesain khusus untuk menjawab kebingungan mahasiswa baru dengan navigasi yang intuitif dan data yang akurat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Tanya AI */}
          <Link
            href="/companion"
            className="glass-card p-6 sm:p-7 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 hover:border-nyala-500/50 transition-all hover:scale-[1.02] shadow-xl group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 flex items-center justify-center">
                <Sparkle weight="fill" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-navy-900 dark:text-white group-hover:text-nyala-500 transition-colors">
                Asisten AI Nyala
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-400 leading-relaxed">
                Tanya apapun seputar tata tertib MASTA, tips SIKAD, rekomendasi kost, hingga motivasi akademik dengan respon hangat & ramah.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-nyala-600 dark:text-nyala-400 pt-3 border-t border-navy-100 dark:border-navy-800">
              <span>Buka Ruang Obrolan</span>
              <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Health Check */}
          <Link
            href="/health"
            className="glass-card p-6 sm:p-7 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 hover:border-rose-500/50 transition-all hover:scale-[1.02] shadow-xl group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Heartbeat weight="fill" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-navy-900 dark:text-white group-hover:text-rose-500 transition-colors">
                Health & Mood Check
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-400 leading-relaxed">
                Catat suasana hati harian, cek kecukupan tidur & hidrasi, serta pantau grafik kesiapan fisik 7 hari selama MASTA.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 pt-3 border-t border-navy-100 dark:border-navy-800">
              <span>Mulai Check-in Harian</span>
              <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Alur 5 Tahap MASTA */}
          <Link
            href="/jadwal"
            className="glass-card p-6 sm:p-7 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 hover:border-amber-500/50 transition-all hover:scale-[1.02] shadow-xl group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <CalendarCheck weight="fill" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-navy-900 dark:text-white group-hover:text-amber-500 transition-colors">
                Alur & Jadwal MASTA
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-400 leading-relaxed">
                Panduan runtut 5 tahapan orientasi dari Membaca Panduan, Verifikasi Berkas, Sesi Daring Zoom, hingga UKM Expo Luring.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 pt-3 border-t border-navy-100 dark:border-navy-800">
              <span>Lihat Timeline Rinci</span>
              <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Checklist Persiapan */}
          <Link
            href="/checklist"
            className="glass-card p-6 sm:p-7 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 hover:border-emerald-500/50 transition-all hover:scale-[1.02] shadow-xl group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckSquare weight="fill" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-navy-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                Checklist Persiapan
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-400 leading-relaxed">
                Pastikan dokumen registrasi, pakaian resmi MASTA, perlengkapan Zoom, dan name tag sudah 100% lengkap.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-3 border-t border-navy-100 dark:border-navy-800">
              <span>Centang Kesiapanmu</span>
              <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Hub Kampus UMKT */}
          <Link
            href="/hub-umkt"
            className="glass-card p-6 sm:p-7 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 hover:border-cyan-500/50 transition-all hover:scale-[1.02] shadow-xl group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Globe weight="fill" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-navy-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                Hub Informasi UMKT
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-400 leading-relaxed">
                Pantau warta resmi dari 2.100+ artikel, pengumuman lomba, agenda IKN & FEBP, serta direktori 10 fakultas resmi.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 pt-3 border-t border-navy-100 dark:border-navy-800">
              <span>Jelajahi Portal Kampus</span>
              <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: Majalah Panduan Edukasi */}
          <Link
            href="/panduan"
            className="glass-card p-6 sm:p-7 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 hover:border-purple-500/50 transition-all hover:scale-[1.02] shadow-xl group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <BookOpenText weight="fill" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-navy-900 dark:text-white group-hover:text-purple-500 transition-colors">
                Panduan Edukasi MABA
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-400 leading-relaxed">
                Artikel editorial mendalam tentang strategi KRS, beasiswa, kehidupan kampus di Samarinda, dan tata nilai Al-Islam Kemuhammadiyahan.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 pt-3 border-t border-navy-100 dark:border-navy-800">
              <span>Baca Majalah Panduan</span>
              <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* ── 4. 5-STAGE OVERVIEW (Timeline Preview) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-nyala-500 font-mono">
              Alur Wajib Orientasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white">
              5 Tahap Sukses MASTA UMKT 2026
            </h2>
          </div>

          <Link
            href="/jadwal"
            className="inline-flex items-center gap-2 text-xs font-bold text-nyala-600 dark:text-nyala-400 hover:underline"
          >
            <span>Buka Detail Jadwal & Alur</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MASTA_STAGES.map((stage) => (
            <div
              key={stage.id}
              className="glass-card p-5 rounded-2xl border border-navy-200/60 dark:border-navy-800 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="w-7 h-7 rounded-xl bg-nyala-500/15 text-nyala-600 dark:text-nyala-400 flex items-center justify-center text-xs font-mono font-black">
                  0{stage.id}
                </span>
                <h4 className="text-xs font-black text-navy-900 dark:text-white leading-snug">
                  {stage.title.replace(/^\d+\.\s*/, "")}
                </h4>
                <p className="text-[11px] text-navy-500 dark:text-navy-400 line-clamp-3">
                  {stage.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-navy-100 dark:border-navy-800 text-[10px] font-bold text-navy-400 font-mono">
                {stage.dates || "Agustus 2026"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. LATEST PANDUAN EDITORIAL PREVIEW ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-nyala-500 font-mono">
              Wawasan Terbaru
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white">
              Artikel Panduan Edukasi Pilihan
            </h2>
          </div>

          <Link
            href="/panduan"
            className="inline-flex items-center gap-2 text-xs font-bold text-nyala-600 dark:text-nyala-400 hover:underline"
          >
            <span>Lihat Semua Artikel ({BLOG_POSTS.length})</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestGuides.map((post) => (
            <Link
              key={post.slug}
              href={`/panduan/${post.slug}`}
              className="glass-card rounded-3xl border border-navy-200/60 dark:border-navy-800 overflow-hidden flex flex-col justify-between hover:border-nyala-500/50 transition-all hover:scale-[1.01] group shadow-lg"
            >
              <div className="space-y-3">
                <div className="relative h-44 w-full bg-navy-950 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-navy-950/80 backdrop-blur-md text-[10px] font-bold text-nyala-400 border border-white/10">
                    {post.category}
                  </div>
                </div>

                <div className="px-5 space-y-1.5">
                  <span className="text-[10px] text-navy-400 font-mono">{post.readTime}</span>
                  <h3 className="text-sm font-black text-navy-900 dark:text-white group-hover:text-nyala-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 flex items-center justify-between text-xs font-bold text-nyala-600 dark:text-nyala-400 border-t border-navy-100 dark:border-navy-800 mt-3">
                <span>Baca Selengkapnya</span>
                <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 6. OFFICIAL ADMIN & HELP CONTACTS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Headset weight="bold" className="w-4 h-4" />
            <span>Pusat Bantuan Terverifikasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white">
            Kontak Admin & Pelayanan Resmi
          </h2>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
            Butuh klarifikasi terkait pembayaran SPP, presensi, atau sertifikat MASTA? Hubungi biro resmi UMKT pada jam operasional WITA.
          </p>
        </div>

        <AdminContactCard />
      </section>

    </div>
  );
}
