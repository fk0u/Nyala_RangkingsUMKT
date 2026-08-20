"use client";

import React, { useState } from "react";
import { 
  Terminal, 
  Cpu, 
  Trophy, 
  MagnifyingGlass, 
  Laptop,
  ArrowSquareOut,
  Sparkle
} from "@phosphor-icons/react";
import { PRODI_TI_DATA } from "@/lib/masta-data";
import BacklinkBanner from "@/components/BacklinkBanner";
import MascotFlame from "@/components/MascotFlame";

export default function PanduanTiPage() {
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [lecturerFilter, setLecturerFilter] = useState<"Semua" | "Aktif" | "Tugas Belajar (S3)">("Semua");
  const [searchLecturer, setSearchLecturer] = useState("");

  const semesterCourses = PRODI_TI_DATA.courses.filter((c) => c.semester === selectedSemester);
  const totalSksSemester = semesterCourses.reduce((acc, c) => acc + c.sks, 0);

  const filteredLecturers = PRODI_TI_DATA.lecturers.filter((lec) => {
    const matchStatus = lecturerFilter === "Semua" || lec.status === lecturerFilter;
    const matchSearch = lec.name.toLowerCase().includes(searchLecturer.toLowerCase()) ||
      lec.expertise.toLowerCase().includes(searchLecturer.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">
      
      {/* 1. HERO SECTION & VISI AKADEMIK */}
      <section className="relative overflow-hidden rounded-3xl bg-navy-950 text-white p-6 sm:p-10 lg:p-12 border border-navy-800 shadow-xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-nyala-400">
              <span className="w-1.5 h-1.5 rounded-full bg-nyala-500" />
              <span>Program Studi S1 Teknologi Informasi • FST UMKT</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Panduan Akademik & Karir <br />
              <span className="fire-text-gradient">Sarjana Komputer (S.Kom)</span>
            </h1>

            <p className="text-sm sm:text-base text-navy-200 leading-relaxed max-w-2xl font-normal">
              Menempuh studi Teknologi Informasi di UMKT bukan sekadar belajar kode, melainkan membentuk teknokrat yang mampu menyelesaikan masalah nyata dengan berlandaskan nilai-nilai keislaman.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5 max-w-xl">
              <Terminal weight="bold" className="w-5 h-5 text-nyala-400 flex-shrink-0" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-navy-400 font-bold block">
                  Semboyan Mahasiswa TI:
                </span>
                <span className="text-sm font-black text-nyala-400 tracking-wide">
                  HIDUP TEKNIK! NO SKILL NO TRUST!
                </span>
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4">
            <MascotFlame size="xl" mood="coding" />
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 w-full space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-navy-300">Target Lulus</span>
                <span className="font-bold text-emerald-400">Tepat Waktu</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-navy-300">Masa Studi Ideal</span>
                <span className="font-bold text-white font-mono">{PRODI_TI_DATA.stats.targetStudyYears}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-navy-300">Mahasiswa Aktif</span>
                <span className="font-bold text-white font-mono">{PRODI_TI_DATA.stats.totalActiveStudents} Mahasiswa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VIDEO MINDSET MABA TEKNIK INFORMATIKA */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-navy-200 dark:border-navy-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
              Video Mindset & Persiapan MABA
            </h2>
            <p className="text-sm text-navy-600 dark:text-navy-400 max-w-2xl">
              Fondasi berpikir, etos kerja praktikum, dan peta jalan sukses menjadi Sarjana Komputer yang tangguh.
            </p>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden bg-navy-950 border border-navy-800 shadow-xl">
          <video 
            controls 
            controlsList="nodownload" 
            playsInline
            crossOrigin="anonymous"
            className="w-full aspect-video object-contain bg-black"
            preload="metadata"
          >
            <source src="https://file.garden/aoXG-IHDqFuT7RDT/Mindset_MABA_Informatika.mp4" type="video/mp4" />
            <p className="text-white text-xs p-6 text-center">
              Browser Anda tidak mendukung video HTML5. 
              <a href="https://file.garden/aoXG-IHDqFuT7RDT/Mindset_MABA_Informatika.mp4" target="_blank" rel="noopener noreferrer" className="text-nyala-400 underline font-bold ml-1">
                Tonton langsung di sini
              </a>.
            </p>
          </video>
          
          <div className="p-4 sm:p-5 bg-navy-900 border-t border-navy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
            <div>
              <h3 className="text-sm font-bold text-white">
                Mindset MABA Teknik Informatika UMKT
              </h3>
              <p className="text-xs text-navy-400">
                Logika algoritma, konsistensi praktikum, dan filosofi keilmuan teknologi informasi.
              </p>
            </div>
            
            <a
              href="https://file.garden/aoXG-IHDqFuT7RDT/Mindset_MABA_Informatika.mp4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-nyala-600 text-white text-xs font-semibold transition-colors"
            >
              <span>Buka Video di Tab Baru</span>
              <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. TIGA PILAR UTAMA */}
      <section className="space-y-6">
        <div className="space-y-1 border-b border-navy-200 dark:border-navy-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
            3 Pilar Utama Kurikulum & Riset
          </h2>
          <p className="text-sm text-navy-600 dark:text-navy-400">
            Fokus pengembangan keahlian teknologi dan inovasi digital di UMKT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODI_TI_DATA.pillars.map((pilar, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 space-y-3 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-navy-950 dark:bg-navy-800 text-white flex items-center justify-center font-bold">
                {idx === 0 ? <Cpu weight="bold" className="w-5 h-5 text-amber-400" /> : idx === 1 ? <Terminal weight="bold" className="w-5 h-5 text-emerald-400" /> : <Trophy weight="bold" className="w-5 h-5 text-sky-400" />}
              </div>
              <h3 className="text-base font-bold text-navy-950 dark:text-white">
                {pilar.title}
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                {pilar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STRUKTUR KURIKULUM 2026 */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-navy-200 dark:border-navy-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
              Daftar Mata Kuliah Semester 1 - 4
            </h2>
            <p className="text-sm text-navy-600 dark:text-navy-400">
              Pilih semester untuk melihat rincian mata kuliah wajib, praktikum, dan beban SKS.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-navy-100 dark:bg-navy-800 p-1.5 rounded-2xl self-start sm:self-auto">
            {[1, 2, 3, 4].map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedSemester === sem
                    ? "bg-nyala-600 text-white shadow-sm"
                    : "text-navy-600 dark:text-navy-300 hover:text-navy-950 dark:hover:text-white"
                }`}
              >
                Semester {sem}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-navy-100 dark:border-navy-800/80">
            <div>
              <h3 className="text-base font-bold text-navy-950 dark:text-white">
                Kurikulum Semester {selectedSemester}
              </h3>
              <span className="text-xs text-navy-500 dark:text-navy-400">
                {semesterCourses.length} Mata Kuliah
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-navy-900 dark:text-white">
              Total {totalSksSemester} SKS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {semesterCourses.map((course, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800/80 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-nyala-600 dark:text-nyala-400">
                      {course.code}
                    </span>
                    <span className="text-[10px] font-medium text-navy-400">
                      {course.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                    {course.name}
                  </h4>
                </div>

                <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-700 text-navy-800 dark:text-navy-200">
                  {course.sks} SKS
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800/80 space-y-1.5 text-xs text-navy-600 dark:text-navy-300">
            <span className="font-bold text-navy-950 dark:text-white block">
              Saran Strategis Akademik:
            </span>
            <p>
              Beban 24 SKS dapat diambil jika Indeks Prestasi (IP) di atas 3.00 untuk mempercepat masa studi menjadi 3,5 tahun. Manfaatkan Semester Pendek jika ada mata kuliah yang perlu perbaikan nilai.
            </p>
          </div>
        </div>
      </section>

      {/* 5. DIREKTORI DOSEN TETAP */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-navy-200 dark:border-navy-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white tracking-tight">
              Profil Dosen Tetap TI UMKT
            </h2>
            <p className="text-sm text-navy-600 dark:text-navy-400">
              Daftar akademisi dan pengajar di bidang Machine Learning, IoT, Data Science, dan Jaringan Komputer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <MagnifyingGlass weight="bold" className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                value={searchLecturer}
                onChange={(e) => setSearchLecturer(e.target.value)}
                placeholder="Cari dosen..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-700 text-xs text-navy-900 dark:text-white outline-none focus:ring-1 focus:ring-nyala-500"
              />
            </div>

            <select
              value={lecturerFilter}
              onChange={(e) => setLecturerFilter(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-700 text-xs font-medium text-navy-900 dark:text-white outline-none"
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif Mengajar</option>
              <option value="Tugas Belajar (S3)">Tugas Belajar (S3)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLecturers.map((lec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 space-y-3 shadow-sm hover:border-nyala-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-navy-50 dark:bg-navy-950 text-nyala-600 dark:text-nyala-400 font-bold flex items-center justify-center text-xs">
                  {lec.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[11px] text-navy-400">
                  {lec.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                  {lec.name}
                </h4>
                <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">
                  Keahlian: <span className="text-navy-700 dark:text-navy-300 font-medium">{lec.expertise}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BacklinkBanner />

    </div>
  );
}
