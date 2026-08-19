"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkle, 
  ArrowRight, 
  CheckCircle, 
  Heartbeat, 
  CalendarCheck, 
  BookOpen, 
  ShieldCheck, 
  MapPin, 
  ArrowSquareOut, 
  Fire,
  Laptop,
  Smiley,
  Newspaper,
  Headset,
  WhatsappLogo,
  Clock,
  Compass,
  GraduationCap,
  PaperPlaneRight,
  CaretRight,
  Check
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood, MASCOT_MOOD_DESCRIPTIONS } from "@/components/MascotFlame";
import CountdownTimer from "@/components/CountdownTimer";
import BacklinkBanner from "@/components/BacklinkBanner";
import ProgressBar from "@/components/ProgressBar";
import AdminContactCard from "@/components/AdminContactCard";
import { MASTA_STAGES, OFFICIAL_LINKS, BLOG_POSTS } from "@/lib/masta-data";

export default function HomePage() {
  const [checklistProgress, setChecklistProgress] = useState(0);
  const [todayMood, setTodayMood] = useState<string | null>(null);
  const [heroMascotMood, setHeroMascotMood] = useState<MascotMood>("excited");

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
          setTodayMood(parsed[0].label || "Semangat");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const latestPosts = BLOG_POSTS.slice(0, 3);

  const HERO_QUICK_PROMPTS = [
    { label: "Berapa kuota fakultas saya?", query: "Berapa kuota dan jadwal gelombang untuk fakultas saya di MASTA IMM?" },
    { label: "Aturan dresscode resmi", query: "Apa saja aturan dresscode dan pakaian resmi MASTA daring dan luring?" },
    { label: "Cara login SIKAD NIM", query: "Bagaimana cara aktivasi dan login NIM mahasiswa di SIKAD UMKT?" },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      
      {/* ── 1. HERO SECTION (EDITORIAL SPLIT & DOUBLE-BEZEL DECK) ── */}
      <section className="relative pt-6 sm:pt-12 pb-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Col: Hero Copy & Button-in-Button CTAs */}
            <motion.div 
              className="lg:col-span-7 space-y-7 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy-950 dark:text-white leading-[1.1]">
                Nyala. <br className="hidden sm:inline" />
                <span className="fire-text-gradient">
                  Teman perjalanan
                </span>{" "}
                MABA-mu.
              </h1>

              {/* Subheadline: Authentic Human Copy */}
              <p className="text-base sm:text-lg text-navy-700 dark:text-navy-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Persiapkan masa orientasi kampus tanpa rasa bingung. Nyala merangkum rundown resmi 3 Gelombang MASTA IMM, panduan pengisian KRS di SIKAD, checklist berkas wajib, dan asisten tanya-jawab cerdas untuk 3.755 Mahasiswa Baru UMKT 2026.
              </p>

              {/* Button-in-Button Interactive CTA Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                
                {/* Primary Action */}
                <Link
                  href="/jadwal"
                  className="w-full sm:w-auto inline-flex items-center justify-between gap-4 px-6 py-3.5 rounded-full bg-nyala-600 hover:bg-nyala-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-nyala-600/20 active:scale-[0.98] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <CalendarCheck weight="bold" className="w-5 h-5" />
                    <span>Cek Jadwal & Gelombang Saya</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight weight="bold" className="w-3.5 h-3.5 text-white" />
                  </div>
                </Link>

                {/* Secondary Action */}
                <Link
                  href="/companion"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-navy-950 dark:bg-navy-800 hover:bg-navy-900 text-white font-bold text-sm sm:text-base border border-navy-800 dark:border-navy-700 active:scale-[0.98] transition-all"
                >
                  <Sparkle weight="fill" className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>Tanya Nyala AI</span>
                </Link>

                {/* SIKAD Simulator */}
                <Link
                  href="/panduan-sikad"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-navy-900 text-navy-900 dark:text-white font-bold text-sm sm:text-base border border-navy-300 dark:border-navy-700 hover:bg-navy-50 dark:hover:bg-navy-800 active:scale-[0.98] transition-all"
                >
                  <Laptop weight="bold" className="w-5 h-5 text-nyala-500" />
                  <span>Panduan SIKAD</span>
                </Link>

              </div>

              {/* Verified Attribution / Official Source Note */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-navy-500 dark:text-navy-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Data Resmi masta-maba.odoo.com dan mahasiswa.umkt.ac.id</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin weight="fill" className="w-3.5 h-3.5 text-nyala-500" />
                  <span>Gedung C Lantai 1 UMKT Samarinda</span>
                </div>
              </div>

            </motion.div>

            {/* Right Col: Concentric Double-Bezel Live Deck */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Outer Doppelrand Shell */}
              <div className="p-2 sm:p-2.5 rounded-[2.25rem] bg-navy-950/5 dark:bg-white/5 border border-navy-200/80 dark:border-white/10 shadow-2xl ring-1 ring-black/5">
                
                {/* Inner Concentric Core */}
                <div className="rounded-[calc(2.25rem-0.625rem)] p-6 sm:p-7 bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800/80 space-y-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                  
                  {/* Top Deck Bar */}
                  <div className="flex items-center justify-between border-b border-navy-100 dark:border-navy-800 pb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-wider text-navy-950 dark:text-white">
                        Live MABA Command Deck
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-nyala-500/10 text-nyala-600 dark:text-nyala-400">
                      MASTA 2026
                    </span>
                  </div>

                  {/* Interactive Mascot Centerpiece */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    
                    <div className="relative cursor-pointer group" onClick={() => {
                      const moods: MascotMood[] = ["excited", "coding", "studying", "withClipboard", "cheering", "happy"];
                      const nextIdx = (moods.indexOf(heroMascotMood) + 1) % moods.length;
                      setHeroMascotMood(moods[nextIdx]);
                    }} title="Klik untuk mengganti gaya maskot Nyala!">
                      <MascotFlame size="xl" mood={heroMascotMood} />
                      <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-navy-900 dark:bg-white text-white dark:text-navy-950 text-[9px] font-extrabold shadow group-hover:scale-105 transition-transform">
                        Ganti Mood ⚡
                      </div>
                    </div>

                    {/* Speech Bubble */}
                    <div className="bg-amber-500/10 dark:bg-navy-800/90 p-3.5 rounded-2xl border border-amber-500/20 text-left w-full">
                      <p className="text-xs sm:text-sm text-navy-900 dark:text-navy-100 font-semibold leading-snug">
                        {MASCOT_MOOD_DESCRIPTIONS[heroMascotMood]?.quote || "Selamat datang di Universitas Muhammadiyah Kalimantan Timur! Nyala siap memandu seluruh rangkaian orientasimu."}
                      </p>
                    </div>

                    {/* Live Metric Row */}
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <Link
                        href="/checklist"
                        className="p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-left hover:border-nyala-500 transition-colors group"
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[11px] font-bold text-navy-600 dark:text-navy-400">Checklist Berkas</span>
                          <span className="text-xs font-black text-nyala-600 dark:text-nyala-400">{checklistProgress}%</span>
                        </div>
                        <ProgressBar progress={checklistProgress} size="sm" showPercentage={false} />
                      </Link>

                      <Link
                        href="/health-check"
                        className="p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-left hover:border-nyala-500 transition-colors group"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-bold text-navy-600 dark:text-navy-400">Kondisi Mental</span>
                          <Smiley weight="duotone" className="w-4 h-4 text-nyala-500" />
                        </div>
                        <span className="text-xs font-extrabold text-nyala-600 dark:text-nyala-400 block truncate">
                          {todayMood ? todayMood : "Cek Kesiapan →"}
                        </span>
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. COUNTDOWN & VERIFIED BACKLINK SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <CountdownTimer />
        <BacklinkBanner compact />
      </section>

      {/* ── 3. ASYMMETRICAL BENTO GRID (AWARD-WINNING TOOL SUITE) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b border-navy-200 dark:border-navy-800 pb-4 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
            Pusat Kendali & Panduan Cepat Mahasiswa
          </h2>
          <p className="text-sm text-navy-600 dark:text-navy-400">
            Akses langsung ke seluruh kebutuhan orientasi kampus, kesiapan teknis SIKAD, dan pendampingan mental.
          </p>
        </div>

        {/* The Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Bento Item 1: Large Span-7 AI Companion Interactive Card */}
          <div className="md:col-span-7 rounded-[2rem] p-6 sm:p-8 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 flex flex-col justify-between space-y-6 shadow-sm hover:border-nyala-500 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-nyala-600 text-white flex items-center justify-center font-bold shadow-md">
                  <Sparkle weight="fill" className="w-6 h-6 text-amber-300" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300">
                  AI Companion Aktif
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
                  Tanya Nyala AI (Companion Cerdas)
                </h3>
                <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 mt-1 leading-relaxed">
                  Dapatkan jawaban instan seputar tata tertib MASTA, kuota per gelombang, tips on-cam Zoom, hingga petunjuk teknis login SIKAD.
                </p>
              </div>

              {/* Quick Pick Interactive Prompts */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-extrabold text-navy-400 dark:text-navy-500 uppercase tracking-wider block">
                  Pertanyaan Populer Hari Ini:
                </span>
                <div className="flex flex-wrap gap-2">
                  {HERO_QUICK_PROMPTS.map((prompt, idx) => (
                    <Link
                      key={idx}
                      href={`/companion?q=${encodeURIComponent(prompt.query)}`}
                      className="text-xs px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 hover:border-nyala-500 font-bold text-navy-800 dark:text-navy-200 flex items-center gap-1.5 transition-colors"
                    >
                      <span>{prompt.label}</span>
                      <CaretRight weight="bold" className="w-3 h-3 text-nyala-500" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/companion"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-nyala-600 dark:text-nyala-400 group-hover:gap-3 transition-all pt-2"
            >
              <span>Mulai Percakapan dengan Nyala</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </Link>
          </div>

          {/* Bento Item 2: Span-5 MASTA IMM 3-Wave Rundown Highlight */}
          <div className="md:col-span-5 rounded-[2rem] p-6 sm:p-8 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 flex flex-col justify-between space-y-6 shadow-sm hover:border-nyala-500 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-md">
                  <CalendarCheck weight="fill" className="w-6 h-6 text-white" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                  18 - 20 Agustus
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
                  Jadwal 3 Gelombang IMM
                </h3>
                <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 mt-1 leading-relaxed">
                  Rundown pelaksanaan resmi di kampus untuk 9 Fakultas dan 3.755 mahasiswa baru.
                </p>
              </div>

              <div className="space-y-2 p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs">
                <div className="flex justify-between font-bold text-navy-900 dark:text-white">
                  <span>Gelombang 1 (18 Agt):</span>
                  <span className="text-nyala-600 dark:text-nyala-400">1.400 Mhs</span>
                </div>
                <div className="flex justify-between font-bold text-navy-900 dark:text-white">
                  <span>Gelombang 2 (19 Agt):</span>
                  <span className="text-nyala-600 dark:text-nyala-400">1.435 Mhs</span>
                </div>
                <div className="flex justify-between font-bold text-navy-900 dark:text-white">
                  <span>Gelombang 3 (20 Agt):</span>
                  <span className="text-nyala-600 dark:text-nyala-400">920 Mhs</span>
                </div>
              </div>
            </div>

            <Link
              href="/jadwal"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-nyala-600 dark:text-nyala-400 group-hover:gap-3 transition-all pt-2"
            >
              <span>Buka Rundown Jam & Kuota</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </Link>
          </div>

          {/* Bento Item 3: Span-4 Simulator SIKAD Mahasiswa */}
          <div className="md:col-span-4 rounded-[2rem] p-6 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-nyala-500 transition-all group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy-950 dark:bg-navy-800 text-white flex items-center justify-center font-bold">
                <Laptop weight="bold" className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-black text-navy-950 dark:text-white">
                Simulator Portal SIKAD
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                Simulasi login NIM, pengisian KRS online, presensi kuliah 75%, tagihan SPP, hingga cetak KHS.
              </p>
            </div>
            <Link
              href="/panduan-sikad"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-nyala-600 dark:text-nyala-400 pt-2"
            >
              <span>Buka Simulasi SIKAD</span>
              <ArrowRight weight="bold" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Bento Item 4: Span-4 Checklist & Wellness */}
          <div className="md:col-span-4 rounded-[2rem] p-6 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-nyala-500 transition-all group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                <CheckCircle weight="fill" className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-navy-950 dark:text-white">
                Checklist & Health Check
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                Pantau kelengkapan atribut putih-hitam, berkas pendaftaran, jam tidur, dan kesiapan mental.
              </p>
            </div>
            <Link
              href="/checklist"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-nyala-600 dark:text-nyala-400 pt-2"
            >
              <span>Kelola Kesiapan Pribadi</span>
              <ArrowRight weight="bold" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Bento Item 5: Span-4 Warta & Direktori Kampus */}
          <div className="md:col-span-4 rounded-[2rem] p-6 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-nyala-500 transition-all group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold">
                <GraduationCap weight="bold" className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-black text-navy-950 dark:text-white">
                Hub Warta UMKT Live
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                Terhubung langsung ke REST API 2.100+ artikel berita, pengumuman beasiswa, dan 10 fakultas resmi.
              </p>
            </div>
            <Link
              href="/hub-umkt"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-nyala-600 dark:text-nyala-400 pt-2"
            >
              <span>Buka Hub Kampus</span>
              <ArrowRight weight="bold" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── 4. BLOG & TIPS MABA SPOTLIGHT ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-navy-200 dark:border-navy-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
              Majalah & Panduan Edukasi MABA
            </h2>
            <p className="text-sm text-navy-600 dark:text-navy-400">
              Artikel panduan adaptasi kost di Samarinda, raih IPK 4.0, beasiswa, hingga persiapan MASTA.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-nyala-600 dark:text-nyala-400 hover:underline self-start sm:self-auto"
          >
            <span>Lihat Semua Panduan</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-3xl p-6 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-800 space-y-3 hover:border-nyala-500 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-navy-200 text-[10px] font-black uppercase">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-navy-400 font-mono flex items-center gap-1">
                    <Clock weight="bold" className="w-3 h-3 text-nyala-500" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-navy-950 dark:text-white group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-navy-600 dark:text-navy-300 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-navy-100 dark:border-navy-800/80 flex items-center justify-between text-xs text-nyala-600 dark:text-nyala-400 font-bold">
                <span>Baca Artikel Lengkap</span>
                <ArrowRight weight="bold" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 5. TAHAPAN ALUR MASTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-navy-50 dark:bg-navy-900/80 border border-navy-200 dark:border-navy-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-navy-200 dark:border-navy-800 pb-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
                5 Tahapan Pelaksanaan Orientasi
              </h2>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
                Rangkaian resmi dari pembekalan daring hingga malam puncak milad universitas.
              </p>
            </div>
            <Link
              href="/jadwal"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-nyala-600 dark:text-nyala-400 hover:underline"
            >
              <span>Lihat Detail Alur</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {MASTA_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="p-4 rounded-2xl bg-white dark:bg-navy-950 border border-navy-200 dark:border-navy-800 space-y-2 group hover:border-nyala-500 transition-colors shadow-sm"
              >
                <div className="w-7 h-7 rounded-xl bg-nyala-600 text-white font-black flex items-center justify-center text-xs">
                  {stage.id}
                </div>
                <h4 className="text-sm font-black text-navy-950 dark:text-white leading-tight">
                  {stage.title.replace(/^\d+\.\s*/, '')}
                </h4>
                <p className="text-xs text-navy-600 dark:text-navy-400 line-clamp-2 leading-relaxed">
                  {stage.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PUSAT LAYANAN & KONTAK ADMIN RESMI ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-navy-200 dark:border-navy-800 pb-4 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
            Kontak Admin & Biro Kemahasiswaan
          </h2>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
            Perlu konfirmasi berkas pendaftaran, dispensasi kegiatan orientasi, atau informasi beasiswa? Hubungi admin resmi kampus via WhatsApp atau kunjungi Gedung C Lantai 1.
          </p>
        </div>

        <AdminContactCard />
      </section>

      {/* ── 7. PROMINENT BACKLINK BANNER SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BacklinkBanner />
      </section>

    </div>
  );
}
