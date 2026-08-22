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
  CheckCircle
} from "@phosphor-icons/react";
import FlutterCard from "@/components/flutter/FlutterCard";
import FlutterSegmentedTabs from "@/components/flutter/FlutterSegmentedTabs";
import FlutterListTile from "@/components/flutter/FlutterListTile";
import FlutterChip from "@/components/flutter/FlutterChip";
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
    { id: "1", label: "Semester 1" },
    { id: "2", label: "Semester 2" },
    { id: "3", label: "Semester 3" },
    { id: "4", label: "Semester 4" },
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
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-500/10 via-nyala-500/10 to-amber-500/10 border border-nyala-500/30 flex items-center gap-3">
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

      {/* ── 3. VIDEO ORIENTASI MAHASISWA ── */}
      <FlutterCard variant="elevated" padding="none" className="overflow-hidden space-y-0">
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
            <h2 className="font-bold text-navy-950 dark:text-white text-xs">
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
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-nyala-500 active:scale-95"
            title="Buka Video"
          >
            <ArrowSquareOut weight="bold" className="w-4 h-4" />
          </a>
        </div>
      </FlutterCard>

      {/* ── 4. KURIKULUM SEMESTER TABS (Hick's Law 1-Tap Switch) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm sm:text-base font-bold text-navy-950 dark:text-white">
            Mata Kuliah TI 2026
          </h2>
          <span className="text-xs font-mono font-bold text-nyala-500 bg-nyala-50 dark:bg-nyala-950/80 px-2 py-0.5 rounded-md">
            Total {totalSks} SKS
          </span>
        </div>

        <FlutterSegmentedTabs
          tabs={SEMESTER_TABS}
          activeTab={selectedSemester}
          onChange={setSelectedSemester}
        />

        {/* Course List Tiles */}
        <div className="space-y-2">
          {semesterCourses.map((c, i) => (
            <FlutterListTile
              key={i}
              dense
              leading={
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </div>
              }
              title={c.name}
              subtitle={
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                  <span className="text-nyala-500 font-bold">{c.code}</span> • <span>{c.category}</span>
                </span>
              }
              trailing={
                <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-navy-950 dark:text-white">
                  {c.sks} SKS
                </span>
              }
            />
          ))}
        </div>
      </div>

      {/* ── 5. DIREKTORI DOSEN TETAP TI ── */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm sm:text-base font-bold text-navy-950 dark:text-white">
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
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-xs text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-nyala-500 shadow-sm"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {(["Semua", "Aktif", "Tugas Belajar (S3)"] as const).map((st) => (
            <FlutterChip
              key={st}
              label={st}
              selected={statusFilter === st}
              onClick={() => setStatusFilter(st)}
            />
          ))}
        </div>

        {/* Lecturer Cards */}
        <div className="space-y-2">
          {filteredLecturers.map((lec, i) => (
            <FlutterListTile
              key={i}
              dense
              leading={
                <div className="w-9 h-9 rounded-2xl bg-nyala-50 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400 flex items-center justify-center">
                  <User weight="bold" className="w-4 h-4" />
                </div>
              }
              title={lec.name}
              subtitle={`Bidang: ${lec.expertise}`}
              badge={lec.status}
              badgeColor={lec.status === "Aktif" ? "emerald" : "slate"}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
