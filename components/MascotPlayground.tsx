"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkle, 
  Code, 
  CheckSquare, 
  Moon, 
  Question, 
  Warning, 
  BookOpen, 
  Trophy, 
  HandsClapping, 
  Lightbulb,
  Heart,
  ArrowsClockwise,
  Quotes
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood, MASCOT_MOOD_DESCRIPTIONS } from "./MascotFlame";
import { useToast } from "@/context/ToastContext";

interface MoodItem {
  id: MascotMood;
  label: string;
  icon: any;
  color: string;
}

const MOODS_LIST: MoodItem[] = [
  { id: "happy", label: "Semangat", icon: Sparkle, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { id: "coding", label: "Ngoding", icon: Code, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" },
  { id: "withClipboard", label: "Checklist", icon: CheckSquare, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { id: "studying", label: "Belajar", icon: BookOpen, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  { id: "cheering", label: "Selebrasi", icon: Trophy, color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" },
  { id: "salim", label: "Hormat Dosen", icon: HandsClapping, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  { id: "thinking", label: "Mikir Solusi", icon: Lightbulb, color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
  { id: "confused", label: "Bingung SIKAD", icon: Question, color: "text-pink-500 bg-pink-500/10 border-pink-500/20" },
  { id: "sleepy", label: "Begadang MABA", icon: Moon, color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" },
  { id: "nervous", label: "Deg-degan Zoom", icon: Warning, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
];

export default function MascotPlayground() {
  const [currentMood, setCurrentMood] = useState<MascotMood>("happy");
  const toast = useToast();

  const handleSelectMood = (mood: MascotMood) => {
    setCurrentMood(mood);
    const info = MASCOT_MOOD_DESCRIPTIONS[mood];
    toast.nyala(`Ekspresi Nyala berganti ke: "${info.label}"`, info.tag);
  };

  const currentInfo = MASCOT_MOOD_DESCRIPTIONS[currentMood];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-navy-200/60 dark:border-navy-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkle weight="fill" className="w-3.5 h-3.5" />
            <span>Interactive Rigged Mascot Playground</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white">
            Galeri Ekspresi & Tingkah Laku Nyala
          </h3>
          <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
            Klik berbagai mood khas MABA untuk melihat perubahan ekspresi, properti, dan animasi maskot secara langsung!
          </p>
        </div>

        <button
          onClick={() => {
            const random = MOODS_LIST[Math.floor(Math.random() * MOODS_LIST.length)].id;
            handleSelectMood(random);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 dark:hover:bg-navy-700 text-xs font-bold text-navy-700 dark:text-navy-300 transition-colors self-start sm:self-auto"
        >
          <ArrowsClockwise weight="bold" className="w-4 h-4" />
          <span>Mood Acak</span>
        </button>
      </div>

      {/* Main Showcase Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gradient-to-br from-navy-50/70 via-white/50 to-orange-50/40 dark:from-navy-950 dark:via-navy-900/60 dark:to-navy-950 p-6 sm:p-8 rounded-2xl border border-navy-200/50 dark:border-navy-800/80">
        
        {/* Left: Animated Mascot Rig */}
        <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3">
          <div className="relative py-4">
            <MascotFlame size="2xl" mood={currentMood} interactive />
          </div>
          <span className="text-xs font-mono font-bold text-navy-500 dark:text-navy-400">
            Pose: <span className="text-nyala-600 dark:text-nyala-400 font-extrabold">{currentInfo.label}</span>
          </span>
        </div>

        {/* Right: Speech Bubble & Description */}
        <div className="md:col-span-7 space-y-4">
          <div className="relative p-5 rounded-2xl bg-white dark:bg-navy-800 border border-navy-200/80 dark:border-navy-700 shadow-md">
            <div className="flex items-center gap-2 text-xs font-extrabold text-nyala-600 dark:text-nyala-400 uppercase tracking-wider mb-2">
              <Quotes weight="fill" className="w-4 h-4" />
              <span>Suara Hati MABA ({currentInfo.tag}):</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={currentMood}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm sm:text-base font-semibold text-navy-900 dark:text-white leading-relaxed italic"
              >
                "{currentInfo.quote}"
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Mood Select Buttons Grid */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-navy-400 dark:text-navy-500 block">
              Pilih Ekspresi & Aksi:
            </span>
            <div className="flex flex-wrap gap-2">
              {MOODS_LIST.map((item) => {
                const Icon = item.icon;
                const active = currentMood === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMood(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      active
                        ? "bg-nyala-600 text-white border-nyala-600 shadow-md scale-105"
                        : "bg-white dark:bg-navy-900 text-navy-700 dark:text-navy-300 border-navy-200 dark:border-navy-700 hover:border-nyala-400"
                    }`}
                  >
                    <Icon weight="bold" className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
