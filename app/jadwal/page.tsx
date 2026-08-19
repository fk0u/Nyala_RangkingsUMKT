"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  ShieldCheck, 
  VideoCamera, 
  Sparkle, 
  Award, 
  CalendarCheck, 
  CheckCircle, 
  CaretDown, 
  CaretUp, 
  ArrowSquareOut,
  Info,
  Fire,
  ArrowRight
} from "@phosphor-icons/react";
import CountdownTimer from "@/components/CountdownTimer";
import BacklinkBanner from "@/components/BacklinkBanner";
import { MASTA_STAGES, OFFICIAL_LINKS, MastaStage } from "@/lib/masta-data";

export default function JadwalPage() {
  const [activeStageId, setActiveStageId] = useState<number>(1);

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen": return BookOpen;
      case "ShieldCheck": return ShieldCheck;
      case "Video": return VideoCamera;
      case "Sparkles": return Sparkle;
      case "Award": return Award;
      default: return Sparkle;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <CalendarCheck weight="bold" className="w-4 h-4" />
          <span>Panduan Terstruktur Resmi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
          Alur & Tahapan MASTA UMKT 2026
        </h1>
        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300">
          Ikuti 5 tahapan resmi pelaksanaan Masa Ta’aruf Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur secara terarah dan tuntas.
        </p>
      </div>

      <CountdownTimer />

      {/* 5 Stages Interactive Timeline */}
      <div className="space-y-6">
        
        {/* Navigation Stage Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {MASTA_STAGES.map((stage) => {
            const Icon = getStageIcon(stage.iconName);
            const isSelected = activeStageId === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-br from-nyala-500 to-nyala-600 text-white border-nyala-500 shadow-fire scale-[1.02]"
                    : "glass-card border-navy-200/60 dark:border-navy-800 text-navy-800 dark:text-white hover:border-nyala-400"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-nyala-500/10 text-nyala-600 dark:text-nyala-400"
                    }`}
                  >
                    {stage.id}
                  </div>
                  <Icon weight={isSelected ? "fill" : "bold"} className={`w-4 h-4 ${isSelected ? "text-white" : "text-navy-400"}`} />
                </div>
                <div className="text-xs sm:text-sm font-bold leading-snug line-clamp-2">
                  {stage.title.replace(/^\d+\.\s*/, "")}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        {MASTA_STAGES.filter((s) => s.id === activeStageId).map((stage) => {
          const Icon = getStageIcon(stage.iconName);

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl p-6 sm:p-9 border border-navy-200/60 dark:border-navy-800 space-y-6 shadow-xl relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-100 dark:border-navy-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-nyala-500 to-amber-500 text-white flex items-center justify-center shadow-fire flex-shrink-0">
                    <Icon weight="duotone" className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
                      Tahap ke-{stage.id} • {stage.dates}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white">
                      {stage.title}
                    </h2>
                  </div>
                </div>

                <a
                  href={OFFICIAL_LINKS.mastaOdoo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-nyala-50 dark:hover:bg-navy-700 text-xs sm:text-sm font-semibold text-navy-700 dark:text-navy-200 transition-colors self-start sm:self-auto"
                >
                  <span>Portal Resmi MASTA</span>
                  <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                  Deskripsi Pelaksanaan:
                </h4>
                <p className="text-sm sm:text-base text-navy-700 dark:text-navy-300 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                  Hal-hal yang Wajib Dilakukan:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {stage.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/70 dark:bg-navy-900/60 border border-navy-100 dark:border-navy-800 flex items-start gap-3 text-xs sm:text-sm text-navy-800 dark:text-navy-200"
                    >
                      <CheckCircle weight="fill" className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro-Tips from Nyala */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream-100 dark:bg-navy-900/90 border border-amber-200/70 dark:border-navy-700 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-nyala-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Fire weight="fill" className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-navy-900 dark:text-white">
                    Tips Nyala untuk Tahap Ini:
                  </h4>
                  <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 mt-0.5 leading-relaxed">
                    {stage.tips}
                  </p>
                </div>
              </div>

            </motion.div>
          );
        })}

      </div>

      {/* Verified Official Links Banner */}
      <BacklinkBanner />

    </div>
  );
}
