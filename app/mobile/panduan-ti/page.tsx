"use client";

import React, { useState } from "react";
import { 
  Terminal, 
  Cpu, 
  Trophy, 
  MagnifyingGlass, 
  ArrowSquareOut,
  Sparkle,
  Code
} from "@phosphor-icons/react";
import { PRODI_TI_DATA } from "@/lib/masta-data";

export default function MobilePanduanTiPage() {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [searchLecturer, setSearchLecturer] = useState("");

  const semesterCourses = PRODI_TI_DATA.courses.filter((c) => c.semester === selectedSemester);
  const totalSks = semesterCourses.reduce((acc, c) => acc + c.sks, 0);

  const filteredLecturers = PRODI_TI_DATA.lecturers.filter((lec) => {
    return lec.name.toLowerCase().includes(searchLecturer.toLowerCase()) ||
      lec.expertise.toLowerCase().includes(searchLecturer.toLowerCase());
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-bold text-nyala-400 uppercase tracking-wider block">
          Program Studi S1 Teknologi Informasi
        </span>
        <h1 className="text-xl font-black text-white leading-tight">
          Kurikulum & Karir Sarjana Komputer
        </h1>
        <p className="text-xs text-navy-300">
          Panduan paket 20 SKS Semester 1, standar nilai kelulusan, dan profil dosen tetap.
        </p>
      </div>

      {/* Slogan Pill */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-500/15 to-amber-500/15 border border-red-500/30 flex items-center gap-3">
        <Terminal weight="bold" className="w-5 h-5 text-nyala-400 flex-shrink-0" />
        <div>
          <span className="text-[9px] uppercase tracking-wider text-navy-400 font-bold block">Semboyan Mahasiswa:</span>
          <span className="text-xs font-black text-nyala-400">HIDUP TEKNIK! NO SKILL NO TRUST!</span>
        </div>
      </div>

      {/* ── VIDEO PLAYER CARD ── */}
      <div className="rounded-2xl overflow-hidden bg-black border border-navy-800 shadow-xl space-y-2">
        <video 
          controls 
          playsInline
          crossOrigin="anonymous"
          className="w-full aspect-video object-contain bg-black"
          preload="metadata"
        >
          <source src="https://file.garden/aoXG-IHDqFuT7RDT/Mindset_MABA_Informatika.mp4" type="video/mp4" />
        </video>
        <div className="p-3 bg-[#0E1635] flex items-center justify-between text-xs">
          <div>
            <h4 className="font-bold text-white text-xs">Video Mindset MABA TI</h4>
            <p className="text-[10px] text-navy-400">Logika algoritma & etos praktikum</p>
          </div>
          <a
            href="https://file.garden/aoXG-IHDqFuT7RDT/Mindset_MABA_Informatika.mp4"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-navy-900 border border-navy-800 text-navy-300 hover:text-white"
          >
            <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ── KURIKULUM SEMESTER 1 - 4 ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Mata Kuliah TI 2026
          </h3>
          <span className="text-xs font-mono font-bold text-nyala-400">{totalSks} SKS</span>
        </div>

        {/* Semester Horizontal Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-[#0E1635] border border-navy-800">
          {[1, 2, 3, 4].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSemester === sem
                  ? "bg-nyala-600 text-white shadow-sm"
                  : "text-navy-400 hover:text-white"
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>

        {/* Course List */}
        <div className="space-y-2">
          {semesterCourses.map((c, i) => (
            <div key={i} className="p-3 rounded-2xl bg-[#0E1635] border border-navy-800 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-nyala-400">{c.code}</span>
                  <span className="text-[10px] text-navy-400">• {c.category}</span>
                </div>
                <h4 className="font-bold text-white text-xs">{c.name}</h4>
              </div>
              <span className="font-mono font-bold text-xs px-2 py-1 rounded-lg bg-navy-950 border border-navy-800 text-navy-200">
                {c.sks} SKS
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── DOSEN DIREKTORI ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Dosen Tetap TI
          </h3>
          <span className="text-[11px] font-mono text-navy-400">{filteredLecturers.length} Dosen</span>
        </div>

        <div className="relative">
          <MagnifyingGlass weight="bold" className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            value={searchLecturer}
            onChange={(e) => setSearchLecturer(e.target.value)}
            placeholder="Cari dosen / bidang riset..."
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#0E1635] border border-navy-800 text-xs text-white placeholder:text-navy-400 outline-none"
          />
        </div>

        <div className="space-y-2">
          {filteredLecturers.slice(0, 5).map((lec, i) => (
            <div key={i} className="p-3 rounded-2xl bg-[#0E1635] border border-navy-800 flex items-center justify-between gap-2 text-xs">
              <div>
                <h4 className="font-bold text-white text-xs">{lec.name}</h4>
                <p className="text-[10px] text-navy-400">Bidang: {lec.expertise}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-navy-950 border border-navy-800 text-navy-300">
                {lec.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
