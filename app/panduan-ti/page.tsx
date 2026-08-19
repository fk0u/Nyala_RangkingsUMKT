"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Code, 
  Terminal, 
  Cpu, 
  BookOpen, 
  Calendar, 
  CurrencyDollar, 
  Users, 
  ShieldCheck, 
  Trophy, 
  MagnifyingGlass, 
  CheckCircle, 
  Fire, 
  Sparkle, 
  CaretRight, 
  Warning, 
  Compass, 
  Laptop,
  Briefcase,
  TrendUp,
  Checks,
  Lightbulb
} from "@phosphor-icons/react";
import { PRODI_TI_DATA, OFFICIAL_LINKS, Course, Lecturer } from "@/lib/masta-data";
import BacklinkBanner from "@/components/BacklinkBanner";
import MascotFlame from "@/components/MascotFlame";
import { useToast } from "@/context/ToastContext";

export default function PanduanTiPage() {
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [lecturerFilter, setLecturerFilter] = useState<"Semua" | "Aktif" | "Tugas Belajar (S3)">("Semua");
  const [searchLecturer, setSearchLecturer] = useState("");
  const toast = useToast();

  const semesterCourses = PRODI_TI_DATA.courses.filter((c) => c.semester === selectedSemester);
  const totalSksSemester = semesterCourses.reduce((acc, c) => acc + c.sks, 0);

  const filteredLecturers = PRODI_TI_DATA.lecturers.filter((lec) => {
    const matchStatus = lecturerFilter === "Semua" || lec.status === lecturerFilter;
    const matchSearch = lec.name.toLowerCase().includes(searchLecturer.toLowerCase()) ||
      lec.expertise.toLowerCase().includes(searchLecturer.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* 1. HERO SECTION & VISI 2037 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-white p-6 sm:p-10 lg:p-12 border border-navy-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-nyala-500/15 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl -z-0" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-nyala-500/20 text-nyala-400 text-xs font-extrabold uppercase tracking-wider border border-nyala-500/30 flex items-center gap-1.5">
                <Code weight="bold" className="w-3.5 h-3.5" />
                <span>Teknologi Informasi UMKT 2026</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Akreditasi Baik Sekali (2025-2030)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Panduan Akademik & Karir <br />
              <span className="fire-text-gradient">Sarjana Komputer (S.Kom)</span>
            </h1>

            <p className="text-sm sm:text-base text-navy-200 leading-relaxed max-w-2xl">
              Selamat datang para calon inovator masa depan! Menempuh studi Teknologi Informasi di UMKT bukan sekadar belajar kode, melainkan membentuk teknokrat yang mampu menyelesaikan masalah sosial & lingkungan dengan berlandaskan nilai-nilai keislaman.
            </p>

            {/* Slogan Banner */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 max-w-xl">
              <div className="flex items-center gap-3">
                <Terminal weight="bold" className="w-6 h-6 text-nyala-400 flex-shrink-0" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-navy-400 font-bold block">
                    Semboyan Perjuangan TI:
                  </span>
                  <span className="text-sm sm:text-base font-black text-nyala-400">
                    HIDUP TEKNIK! NO SKILL NO TRUST!
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4">
            <MascotFlame size="xl" mood="coding" />
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 w-full space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-navy-300">Target Lulus Tepat Waktu</span>
                <span className="font-bold text-emerald-400">100% Sukses</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-navy-300">Masa Studi Ideal</span>
                <span className="font-bold text-white">{PRODI_TI_DATA.stats.targetStudyYears}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-navy-300">Total Mahasiswa Aktif</span>
                <span className="font-bold text-white">{PRODI_TI_DATA.stats.totalActiveStudents} Orang</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TIGA PILAR VISI 2037 */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
            Visi Keunggulan 2037
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
            3 Pilar Utama Kurikulum & Riset
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODI_TI_DATA.pillars.map((pilar, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-200/60 dark:border-navy-800 space-y-3 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nyala-500 to-amber-500 text-white flex items-center justify-center shadow-fire">
                {idx === 0 ? <Cpu weight="duotone" className="w-6 h-6" /> : idx === 1 ? <Lightbulb weight="duotone" className="w-6 h-6" /> : <Trophy weight="duotone" className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                {pilar.title}
              </h3>
              <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
                {pilar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. STRUKTUR KURIKULUM 2026 (SEMESTER 1 - 4) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
              Struktur Kurikulum 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
              Daftar Mata Kuliah Semester 1 - 4
            </h2>
            <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400">
              Pilih semester untuk melihat rincian mata kuliah wajib, praktikum, dan beban SKS.
            </p>
          </div>

          {/* Semester Tabs */}
          <div className="flex items-center gap-2 bg-navy-100 dark:bg-navy-800 p-1.5 rounded-2xl self-start md:self-auto">
            {[1, 2, 3, 4].map((sem) => (
              <button
                key={sem}
                onClick={() => {
                  setSelectedSemester(sem);
                  toast.info(`Menampilkan kurikulum Semester ${sem}`, "Kurikulum");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedSemester === sem
                    ? "bg-nyala-500 text-white shadow-fire scale-105"
                    : "text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white"
                }`}
              >
                Semester {sem}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Table / Cards */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-navy-200/60 dark:border-navy-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-navy-100 dark:border-navy-800">
            <div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Mata Kuliah Semester {selectedSemester}
              </h3>
              <span className="text-xs text-navy-500 dark:text-navy-400">
                {semesterCourses.length} Mata Kuliah Terdaftar
              </span>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-nyala-500/15 text-nyala-600 dark:text-nyala-400 font-extrabold text-xs">
              Total {totalSksSemester} SKS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {semesterCourses.map((course, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/70 dark:bg-navy-900/60 border border-navy-100 dark:border-navy-800 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-nyala-600 dark:text-nyala-400">
                      {course.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      course.category === "Praktikum"
                        ? "bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                        : course.category === "Universitas (UNI)"
                        ? "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                        : "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                    }`}>
                      {course.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white">
                    {course.name}
                  </h4>
                </div>

                <span className="font-extrabold text-xs px-2 py-1 rounded-lg bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300">
                  {course.sks} SKS
                </span>
              </div>
            ))}
          </div>

          {/* Strategic Kaprodi Advice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <Sparkle weight="fill" className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Saran Strategis Kaprodi TI:</span>
            </h4>
            <ul className="text-xs text-amber-800 dark:text-amber-200 space-y-1 list-disc list-inside leading-relaxed">
              <li><strong>Beban Studi 24 SKS:</strong> Jika Indeks Prestasi (IP) kalian di atas 3.00, manfaatkan hak mengambil hingga 24 SKS untuk mempercepat kelulusan menjadi 3,5 tahun.</li>
              <li><strong>Semester Pendek (SP):</strong> Jika ada mata kuliah yang nilainya kurang, ikuti Semester Pendek (2 minggu intensif) agar tidak menunda kelulusan.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. STANDAR NILAI MINIMUM KELULUSAN */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
            Standar Mutu Lulusan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
            Standar Nilai Minimum Kelulusan
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400">
            Setiap kategori mata kuliah memiliki batas minimum kelulusan yang wajib dipenuhi oleh calon Sarjana Komputer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODI_TI_DATA.minimumGrades.map((grade, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl glass-card border border-navy-200/60 dark:border-navy-800 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <Checks weight="bold" className="w-4 h-4 text-nyala-500" />
                <span className="text-xs font-bold text-navy-800 dark:text-navy-200">{grade.category}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-black ${
                grade.min === "AB" || grade.min === "B"
                  ? "bg-emerald-500 text-white"
                  : "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30"
              }`}>
                Min. {grade.min}
              </span>
            </div>
          ))}
        </div>

        {/* Rentang Nilai Pill */}
        <div className="p-4 rounded-2xl bg-navy-50 dark:bg-navy-900/60 border border-navy-200/60 dark:border-navy-800 flex flex-wrap items-center justify-around gap-4 text-xs font-mono">
          <span><strong>A:</strong> &gt; 80 (Istimewa)</span>
          <span><strong>AB:</strong> 75 - 79 (Sangat Baik)</span>
          <span><strong>B:</strong> 70 - 74 (Baik)</span>
          <span><strong>BC:</strong> 66 - 70 (Cukup Baik)</span>
        </div>
      </section>

      {/* 5. DIREKTORI DOSEN TETAP TI UMKT */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
              Tenaga Pendidik
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
              Profil Dosen Tetap TI UMKT
            </h2>
            <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400">
              Didukung oleh para akademisi dan praktisi di bidang Machine Learning, IoT, Data Science, dan Jaringan Komputer.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <MagnifyingGlass weight="bold" className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                value={searchLecturer}
                onChange={(e) => setSearchLecturer(e.target.value)}
                placeholder="Cari dosen / keahlian..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 text-xs text-navy-900 dark:text-white outline-none focus:ring-2 focus:ring-nyala-500"
              />
            </div>

            <select
              value={lecturerFilter}
              onChange={(e) => setLecturerFilter(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 text-xs font-bold text-navy-900 dark:text-white outline-none focus:ring-2 focus:ring-nyala-500"
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
              className="p-5 rounded-3xl glass-card border border-navy-200/60 dark:border-navy-800 space-y-3 relative overflow-hidden group hover:border-nyala-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-nyala-500/15 text-nyala-600 dark:text-nyala-400 font-extrabold flex items-center justify-center text-sm">
                  {lec.name.slice(0, 2).toUpperCase()}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  lec.status === "Aktif"
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                    : "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                }`}>
                  {lec.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-navy-900 dark:text-white">
                  {lec.name}
                </h4>
                <p className="text-xs text-navy-500 dark:text-navy-400 mt-1 leading-snug">
                  Bidang: <span className="font-semibold text-navy-700 dark:text-navy-300">{lec.expertise}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. KALENDER AKADEMIK SEMESTER GANJIL 2026/2027 */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
            Agenda Resmi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
            Kalender Akademik Semester Ganjil 2026/2027
          </h2>
          <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400">
            Catat jadwal penting agar tidak ada keterlambatan pengisian KRS maupun pelaksanaan ujian.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODI_TI_DATA.academicCalendar2026.map((cal, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl glass-card border border-navy-200/60 dark:border-navy-800 space-y-2.5 relative overflow-hidden"
            >
              <span className="text-xs font-bold text-nyala-600 dark:text-nyala-400 block font-mono">
                {cal.dateRange}
              </span>
              <h4 className="text-base font-bold text-navy-900 dark:text-white">
                {cal.title}
              </h4>
              <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                {cal.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ESTIMASI GAJI & PROSPEK KARIR IT 2026 */}
      <section className="rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-white p-6 sm:p-10 border border-navy-800 space-y-8 shadow-2xl">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-nyala-400">
            Prospek Lulusan S.Kom
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Pandangan Karir & Tolok Ukur Gaji IT 2026
          </h2>
          <p className="text-xs text-navy-300">
            Industri membayar keahlian dan kapasitas problem solving nyata yang kalian bangun sejak masa kuliah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODI_TI_DATA.salaryBenchmarks.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 hover:border-nyala-500/50 transition-colors"
            >
              <span className="text-xs text-navy-300 font-medium">{item.role}</span>
              <h4 className="text-lg font-black text-nyala-400">{item.range}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ORGANISASI KEMAHASISWAAN (HIMATIF) */}
      <section className="glass-card rounded-3xl p-6 sm:p-10 border border-navy-200/60 dark:border-navy-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
              Pengembangan Soft Skill
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900 dark:text-white">
              Himpunan Mahasiswa Teknik Informatika (HIMATIF)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-nyala-500/15 text-nyala-600 dark:text-nyala-400">
            4 Departemen Strategis
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODI_TI_DATA.himatifDepartments.map((dept, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/60 dark:bg-navy-900/60 border border-navy-100 dark:border-navy-800 space-y-1.5"
            >
              <h4 className="text-sm font-bold text-navy-900 dark:text-white">
                Dept. {dept.name}
              </h4>
              <p className="text-xs text-navy-500 dark:text-navy-400 leading-relaxed">
                {dept.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Backlink Banner */}
      <BacklinkBanner />

    </div>
  );
}
