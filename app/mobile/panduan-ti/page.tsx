"use client";

import React, { useState } from "react";
import { 
  Terminal, 
  Cpu, 
  Trophy, 
  MagnifyingGlass, 
  ArrowSquareOut,
  Sparkle,
  Code,
  GraduationCap,
  BookOpen,
  User,
  CheckCircle,
  Star
} from "@phosphor-icons/react";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import DuolingoButton from "@/components/flutter/DuolingoButton";
import DuolingoSegmentedTabs from "@/components/flutter/DuolingoSegmentedTabs";
import { PRODI_TI_DATA } from "@/lib/masta-data";

export default function MobilePanduanTiPage() {
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [searchLecturer, setSearchLecturer] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Semua" | "Aktif" | "Tugas Belajar (S3)">("Semua");

  const semesterNum = parseInt(selectedSemester, 10);
  const semesterCourses = PRODI_TI_DATA.courses.filter((c) => c.semester === semesterNum);
  const totalSks = semesterCourses.reduce((acc, c) => acc + c.sks, 0);

  const filteredLecturers = PRODI_TI_DATA.lecturers.filter((lec) => {
    const matchStatus = statusFilter === "Semua" || lec.status === statusFilter;
    const matchSearch = lec.name.toLowerCase().includes(searchLecturer.toLowerCase()) ||
      lec.expertise.toLowerCase().includes(searchLecturer.toLowerCase());
    return matchStatus && matchSearch;
  });

  const SEMESTER_TABS = [
    { id: "1", label: "Sem 1", badge: "20 SKS" },
    { id: "2", label: "Sem 2", badge: "20 SKS" },
    { id: "3", label: "Sem 3", badge: "20 SKS" },
    { id: "4", label: "Sem 4", badge: "20 SKS" },
  ];

  return (
    <div className="space-y-5">
      
      {/* ── 1. HEADER ── */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-bold text-nyala-600 dark:text-nyala-400 uppercase tracking-wider block">
          Program Studi S1 Teknologi Informasi • FST UMKT
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
          Panduan Akademik S.Kom
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Kurikulum semester 1-4, standar kelulusan, dan direktori dosen tetap.
        </p>
      </div>

      {/* ── 2. SLOGAN BANNER (HIMATIF) ── */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-500/10 via-nyala-500/10 to-amber-500/10 border-2 border-b-4 border-nyala-500/30 border-b-nyala-600/40 flex items-center gap-3">
        <Terminal weight="bold" className="w-5 h-5 text-nyala-500 flex-shrink-0" />
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
            Semboyan Mahasiswa TI:
          </span>
          <span className="text-xs font-black text-nyala-600 dark:text-nyala-400 tracking-wide">
            HIDUP TEKNIK! NO SKILL NO TRUST!
          </span>
        </div>
      </div>

      {/* ── 3. VIDEO ORIENTASI MAHASISWA (DUOLINGO 3D CARD) ── */}
      <DuolingoCard variant="surface" padding="none" className="overflow-hidden space-y-0">
        <video 
          controls 
          playsInline
          crossOrigin="anonymous"
          className="w-full aspect-video object-contain bg-black"
          preload="metadata"
        >
          <source src="https://file.garden/aoXG-IHDqFuT7RDT/Mindset_MABA_Informatika.mp4" type="video/mp4" />
        </video>
        <div className="p-3.5 flex items-center justify-between text-xs bg-white dark:bg-[#0F172A]">
          <div>
            <h2 className="font-black text-navy-950 dark:text-white text-xs">
              Video Mindset MABA TI
            </h2>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Logika algoritma & etos praktikum kampus
            </p>
          </div>
          <a
            href="https://file.garden/aoXG-IHDqFuT7RDT/Mindset_MABA_Informatika.mp4"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl duo-btn-surface"
            title="Buka Video"
          >
            <ArrowSquareOut weight="bold" className="w-4 h-4" />
          </a>
        </div>
      </DuolingoCard>

      {/* ── 4. KURIKULUM SEMESTER TABS (DUOLINGO 3D TABS) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm sm:text-base font-black text-navy-950 dark:text-white">
            Mata Kuliah TI 2026
          </h2>
          <span className="text-xs font-mono font-black text-nyala-500 bg-nyala-50 dark:bg-nyala-950/80 px-2.5 py-1 rounded-lg border border-nyala-200 dark:border-nyala-900">
            Total {totalSks} SKS
          </span>
        </div>

        <DuolingoSegmentedTabs
          tabs={SEMESTER_TABS}
          activeTab={selectedSemester}
          onChange={setSelectedSemester}
          gridCols={4}
        />

        {/* Course List 3D Tiles */}
        <div className="space-y-2">
          {semesterCourses.map((c, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-center justify-between gap-3 text-xs select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm">
                    {c.name}
                  </h3>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                    <span className="text-nyala-500 font-bold">{c.code}</span> • <span>{c.category}</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono font-black px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-navy-950 dark:text-white border border-slate-200 dark:border-slate-700">
                {c.sks} SKS
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. DIREKTORI DOSEN TETAP TI ── */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm sm:text-base font-black text-navy-950 dark:text-white">
            Direktori 11 Dosen Tetap
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {filteredLecturers.length} Dosen
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlass weight="bold" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchLecturer}
            onChange={(e) => setSearchLecturer(e.target.value)}
            placeholder="Cari nama dosen atau bidang riset..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 text-xs text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-nyala-500 shadow-sm"
          />
        </div>

        {/* Status Filter 3D Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {(["Semua", "Aktif", "Tugas Belajar (S3)"] as const).map((st) => {
            const isSelected = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`py-2 px-2 rounded-xl text-xs font-bold border-2 border-b-4 transition-all truncate active:border-b-2 active:translate-y-0.5 cursor-pointer ${
                  isSelected
                    ? "bg-nyala-500 text-white border-nyala-600 border-b-nyala-800"
                    : "bg-white dark:bg-[#0F172A] text-slate-500 border-slate-200 dark:border-slate-800 border-b-slate-300 dark:border-b-slate-900"
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Lecturer Cards */}
        <div className="space-y-2">
          {filteredLecturers.map((lec, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-center justify-between gap-2 text-xs select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-nyala-50 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400 flex items-center justify-center font-bold">
                  <User weight="bold" className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-navy-950 dark:text-white text-xs">
                    {lec.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Bidang: {lec.expertise}
                  </p>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg font-mono ${
                lec.status === "Aktif"
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              }`}>
                {lec.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
