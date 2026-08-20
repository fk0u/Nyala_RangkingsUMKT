"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CalendarCheck, 
  MapPin, 
  Laptop,
  GraduationCap,
  CaretRight,
  Sparkle,
  CheckCircle,
  Smiley
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood, MASCOT_MOOD_DESCRIPTIONS } from "@/components/MascotFlame";
import CountdownTimer from "@/components/CountdownTimer";
import BacklinkBanner from "@/components/BacklinkBanner";
import ProgressBar from "@/components/ProgressBar";
import { BLOG_POSTS } from "@/lib/masta-data";

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
    { label: "Aturan pakaian resmi", query: "Apa saja aturan dresscode dan pakaian resmi MASTA daring dan luring?" },
    { label: "Cara login SIKAD NIM", query: "Bagaimana cara aktivasi dan login NIM mahasiswa di SIKAD UMKT?" },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* ── 1. HERO SECTION (EDITORIAL SPLIT & MINIMALIST ARCHITECTURE) ── */}
      <section className="relative pt-6 sm:pt-10 pb-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Col: Hero Copy & Clean Action Row */}
            <motion.div 
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-nyala-600 dark:text-nyala-400">
                <span className="w-1.5 h-1.5 rounded-full bg-nyala-500" />
                <span>Portal Resmi Mahasiswa Baru UMKT 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy-950 dark:text-white leading-[1.1]">
                Nyala. <br className="hidden sm:inline" />
                <span className="fire-text-gradient">
                  Teman perjalanan
                </span>{" "}
                MABA-mu.
              </h1>

              <p className="text-base sm:text-lg text-navy-600 dark:text-navy-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Navigasi seluruh masa orientasi kampus dengan tenang. Nyala merangkum rundown resmi 3 Gelombang MASTA IMM, simulator pengisian KRS di SIKAD, checklist berkas wajib, dan asisten AI cerdas untuk 3.755 mahasiswa baru.
              </p>

              {/* Button-in-Button CTA Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                
                <Link
                  href="/jadwal"
                  className="w-full sm:w-auto inline-flex items-center justify-between gap-4 px-6 py-3.5 rounded-full bg-nyala-600 hover:bg-nyala-500 text-white font-extrabold text-sm shadow-lg shadow-nyala-600/20 active:scale-[0.98] transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <CalendarCheck weight="bold" className="w-4 h-4" />
                    <span>Cek Jadwal & Gelombang</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight weight="bold" className="w-3 h-3 text-white" />
                  </div>
                </Link>

                <Link
                  href="/companion"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-navy-950 dark:bg-navy-800 hover:bg-navy-900 text-white font-bold text-sm border border-navy-800 dark:border-navy-700 active:scale-[0.98] transition-all"
                >
                  <Sparkle weight="bold" className="w-4 h-4 text-amber-400" />
                  <span>Tanya Nyala AI</span>
                </Link>

                <Link
                  href="/panduan-sikad"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-navy-900 text-navy-900 dark:text-white font-bold text-sm border border-navy-200 dark:border-navy-700 hover:bg-navy-50 dark:hover:bg-navy-800 active:scale-[0.98] transition-all"
                >
                  <Laptop weight="bold" className="w-4 h-4 text-nyala-500" />
                  <span>Panduan SIKAD</span>
                </Link>

              </div>

              {/* Attribution Line */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-navy-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Data Resmi masta-maba.odoo.com & mahasiswa.umkt.ac.id</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin weight="bold" className="w-3.5 h-3.5 text-navy-400" />
                  <span>Kampus UMKT Samarinda</span>
                </div>
              </div>

            </motion.div>

            {/* Right Col: Clean Interactive Mascot Deck */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 space-y-5 shadow-sm">
                
                <div className="flex items-center justify-between border-b border-navy-100 dark:border-navy-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-navy-950 dark:text-white">
                      Status Persiapan MABA
                    </span>
                  </div>
                  <span className="text-xs font-mono text-navy-400">
                    Angkatan 2026
                  </span>
                </div>

                <div className="flex flex-col items-center text-center space-y-4">
                  <div 
                    className="cursor-pointer transition-transform hover:scale-105" 
                    onClick={() => {
                      const moods: MascotMood[] = ["excited", "coding", "studying", "withClipboard", "cheering", "happy"];
                      const nextIdx = (moods.indexOf(heroMascotMood) + 1) % moods.length;
                      setHeroMascotMood(moods[nextIdx]);
                    }} 
                    title="Klik untuk mengganti gaya maskot"
                  >
                    <MascotFlame size="xl" mood={heroMascotMood} />
                  </div>

                  <div className="bg-navy-50 dark:bg-navy-950 p-4 rounded-2xl border border-navy-100 dark:border-navy-800/80 text-left w-full">
                    <p className="text-xs sm:text-sm text-navy-800 dark:text-navy-200 leading-relaxed font-medium">
                      {MASCOT_MOOD_DESCRIPTIONS[heroMascotMood]?.quote || "Selamat datang di UMKT! Nyala siap memandu seluruh orientasi dan perkuliahanmu."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <Link
                      href="/checklist"
                      className="p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800/80 text-left hover:border-nyala-500 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-semibold text-navy-600 dark:text-navy-400">Checklist Berkas</span>
                        <span className="text-xs font-mono font-bold text-nyala-600 dark:text-nyala-400">{checklistProgress}%</span>
                      </div>
                      <ProgressBar progress={checklistProgress} size="sm" showPercentage={false} />
                    </Link>

                    <Link
                      href="/health-check"
                      className="p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800/80 text-left hover:border-nyala-500 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-navy-600 dark:text-navy-400">Kondisi Mental</span>
                        <Smiley weight="bold" className="w-4 h-4 text-navy-400" />
                      </div>
                      <span className="text-xs font-bold text-navy-900 dark:text-white block truncate">
                        {todayMood ? todayMood : "Cek Kesiapan →"}
                      </span>
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. REALTIME COUNTDOWN ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <CountdownTimer />
        <BacklinkBanner compact />
      </section>

      {/* ── 3. CLEAN TOOL SUITE BENTO GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="border-b border-navy-200 dark:border-navy-800 pb-4 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
            Pusat Kendali & Panduan Mahasiswa
          </h2>
          <p className="text-sm text-navy-600 dark:text-navy-400">
            Akses langsung ke seluruh kebutuhan orientasi, persiapan teknis SIKAD, dan panduan akademik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: Tanya Nyala AI */}
          <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 flex flex-col justify-between space-y-6 shadow-sm hover:border-nyala-500 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-navy-950 dark:bg-navy-800 text-white flex items-center justify-center font-bold">
                  <Sparkle weight="bold" className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-xs font-mono text-navy-400">
                  Respon Cepat 24/7
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-navy-950 dark:text-white tracking-tight">
                  Tanya Nyala AI
                </h3>
                <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 mt-1 leading-relaxed">
                  Konsultasi instan seputar tata tertib MASTA, kuota per gelombang, tips on-camera Zoom, hingga cara login SIKAD.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-navy-400 uppercase tracking-wider block">
                  Topik Populer:
                </span>
                <div className="flex flex-wrap gap-2">
                  {HERO_QUICK_PROMPTS.map((prompt, idx) => (
                    <Link
                      key={idx}
                      href={`/companion?q=${encodeURIComponent(prompt.query)}`}
                      className="text-xs px-3 py-2 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800 hover:border-nyala-500 font-medium text-navy-800 dark:text-navy-200 flex items-center gap-1.5 transition-colors"
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
              <span>Mulai Percakapan</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Jadwal 3 Gelombang IMM */}
          <div className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 flex flex-col justify-between space-y-6 shadow-sm hover:border-nyala-500 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-navy-950 dark:bg-navy-800 text-white flex items-center justify-center font-bold">
                  <CalendarCheck weight="bold" className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-xs font-mono text-navy-400">
                  18 - 20 Agustus
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-navy-950 dark:text-white tracking-tight">
                  Jadwal 3 Gelombang IMM
                </h3>
                <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 mt-1 leading-relaxed">
                  Rundown pelaksanaan resmi di kampus untuk 9 Fakultas dan 3.755 mahasiswa baru.
                </p>
              </div>

              <div className="space-y-2 p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800 text-xs">
                <div className="flex justify-between font-semibold text-navy-900 dark:text-white">
                  <span>Gelombang 1 (18 Agt):</span>
                  <span className="text-nyala-600 dark:text-nyala-400 font-mono">1.400 Mhs</span>
                </div>
                <div className="flex justify-between font-semibold text-navy-900 dark:text-white">
                  <span>Gelombang 2 (19 Agt):</span>
                  <span className="text-nyala-600 dark:text-nyala-400 font-mono">1.435 Mhs</span>
                </div>
                <div className="flex justify-between font-semibold text-navy-900 dark:text-white">
                  <span>Gelombang 3 (20 Agt):</span>
                  <span className="text-nyala-600 dark:text-nyala-400 font-mono">920 Mhs</span>
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

          {/* Card 3: Simulator SIKAD */}
          <div className="md:col-span-4 rounded-3xl p-6 bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-nyala-500 transition-all group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-navy-950 dark:bg-navy-800 text-white flex items-center justify-center font-bold">
                <Laptop weight="bold" className="w-4 h-4 text-amber-400" />
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
              className="inline-flex items-center gap-1.5 text-xs font-bold text-nyala-600 dark:text-nyala-400 pt-2"
            >
              <span>Buka Simulasi SIKAD</span>
              <ArrowRight weight="bold" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Card 4: Checklist & Persiapan */}
          <div className="md:col-span-4 rounded-3xl p-6 bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-nyala-500 transition-all group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-navy-950 dark:bg-navy-800 text-white flex items-center justify-center font-bold">
                <CheckCircle weight="bold" className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-lg font-black text-navy-950 dark:text-white">
                Checklist & Persiapan
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                Pantau kelengkapan atribut seragam putih-hitam, berkas pendaftaran, dan kesiapan fisik.
              </p>
            </div>
            <Link
              href="/checklist"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-nyala-600 dark:text-nyala-400 pt-2"
            >
              <span>Kelola Checklist</span>
              <ArrowRight weight="bold" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Card 5: Hub Warta UMKT Live */}
          <div className="md:col-span-4 rounded-3xl p-6 bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-nyala-500 transition-all group">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-navy-950 dark:bg-navy-800 text-white flex items-center justify-center font-bold">
                <GraduationCap weight="bold" className="w-4 h-4 text-sky-400" />
              </div>
              <h3 className="text-lg font-black text-navy-950 dark:text-white">
                Hub Warta UMKT Live
              </h3>
              <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                Terhubung langsung ke API 2.100+ artikel berita, pengumuman beasiswa, dan 10 fakultas resmi.
              </p>
            </div>
            <Link
              href="/hub-umkt"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-nyala-600 dark:text-nyala-400 pt-2"
            >
              <span>Buka Hub Kampus</span>
              <ArrowRight weight="bold" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
            className="inline-flex items-center gap-2 text-sm font-bold text-nyala-600 dark:text-nyala-400 hover:underline self-start sm:self-auto"
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
              className="group rounded-3xl p-5 bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 space-y-4 shadow-sm hover:border-nyala-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-navy-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-nyala-600 dark:text-nyala-400">
                    {post.category}
                  </span>
                  <h3 className="text-base font-bold text-navy-950 dark:text-white leading-snug group-hover:text-nyala-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-navy-600 dark:text-navy-300 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-navy-100 dark:border-navy-800/80 text-xs text-navy-400">
                <span>{post.readTime}</span>
                <span className="font-bold text-nyala-600 dark:text-nyala-400 group-hover:translate-x-0.5 transition-transform">
                  Baca Artikel →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
