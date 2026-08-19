"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HeartPulse, 
  Smile, 
  Moon, 
  Utensils, 
  Droplet, 
  Zap, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Flame,
  AlertCircle,
  TrendingUp,
  RotateCcw
} from "lucide-react";
import MascotFlame from "@/components/MascotFlame";
import ProgressBar from "@/components/ProgressBar";
import BacklinkBanner from "@/components/BacklinkBanner";

interface MoodOption {
  emoji: string;
  label: string;
  color: string;
  scoreBonus: number;
}

const MOOD_OPTIONS: MoodOption[] = [
  { emoji: "🤩", label: "Sangat Bersemangat", color: "text-amber-500", scoreBonus: 25 },
  { emoji: "😊", label: "Senang & Siap", color: "text-emerald-500", scoreBonus: 20 },
  { emoji: "😐", label: "Biasa Saja", color: "text-blue-500", scoreBonus: 15 },
  { emoji: "🥱", label: "Sedikit Lelah", color: "text-purple-500", scoreBonus: 10 },
  { emoji: "😰", label: "Gugup / Cemas", color: "text-rose-500", scoreBonus: 5 },
];

interface PhysicalCheck {
  id: string;
  title: string;
  desc: string;
  icon: any;
  points: number;
}

const PHYSICAL_CHECKS: PhysicalCheck[] = [
  { id: "sleep", title: "Tidur Cukup (6-8 Jam)", desc: "Istirahat cukup agar konsentrasi tetap tajam saat materi MASTA", icon: Moon, points: 20 },
  { id: "food", title: "Sarapan & Nutrisi Teratur", desc: "Perut terisi dengan makanan sehat bergizi", icon: Utensils, points: 20 },
  { id: "water", title: "Hidrasi Air Putih (Min. 2 Liter)", desc: "Menjaga cairan tubuh agar tidak cepat lemas atau dehidrasi", icon: Droplet, points: 20 },
  { id: "mind", title: "Peregangan & Mental Rileks", desc: "Melakukan deep breathing atau peregangan ringan sebelum beraktivitas", icon: Zap, points: 15 },
];

interface HealthLog {
  id: string;
  date: string;
  dayName: string;
  emoji: string;
  moodLabel: string;
  score: number;
  checks: string[];
  note?: string;
}

export default function HealthCheckPage() {
  const [selectedMood, setSelectedMood] = useState<MoodOption>(MOOD_OPTIONS[1]);
  const [selectedChecks, setSelectedChecks] = useState<string[]>(["sleep", "water"]);
  const [dailyNote, setDailyNote] = useState("");
  const [history, setHistory] = useState<HealthLog[]>([]);
  const [hasSavedToday, setHasSavedToday] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("nyala_health_logs");
    if (saved) {
      try {
        const parsed: HealthLog[] = JSON.parse(saved);
        setHistory(parsed);
        const todayStr = new Date().toLocaleDateString("id-ID");
        const foundToday = parsed.find((item) => item.date === todayStr);
        if (foundToday) {
          setHasSavedToday(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Compute Readiness Score (0-100)
  const calculateScore = () => {
    let total = selectedMood.scoreBonus;
    PHYSICAL_CHECKS.forEach((check) => {
      if (selectedChecks.includes(check.id)) {
        total += check.points;
      }
    });
    return Math.min(total, 100);
  };

  const currentScore = calculateScore();

  const handleToggleCheck = (id: string) => {
    if (selectedChecks.includes(id)) {
      setSelectedChecks(selectedChecks.filter((item) => item !== id));
    } else {
      setSelectedChecks([...selectedChecks, id]);
    }
  };

  const handleSaveDailyCheck = () => {
    const today = new Date();
    const dateStr = today.toLocaleDateString("id-ID");
    const dayName = today.toLocaleDateString("id-ID", { weekday: "short" });

    const newLog: HealthLog = {
      id: `log-${Date.now()}`,
      date: dateStr,
      dayName,
      emoji: selectedMood.emoji,
      moodLabel: selectedMood.label,
      score: currentScore,
      checks: [...selectedChecks],
      note: dailyNote.trim() || undefined,
    };

    // Keep last 7 days
    const filtered = history.filter((item) => item.date !== dateStr);
    const updated = [newLog, ...filtered].slice(0, 7);
    
    setHistory(updated);
    localStorage.setItem("nyala_health_logs", JSON.stringify(updated));
    localStorage.setItem("nyala_mood_history", JSON.stringify(updated));
    setHasSavedToday(true);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
  };

  // Get Personalized Recommendation based on score and mood
  const getRecommendation = () => {
    if (currentScore >= 85) {
      return {
        title: "Kondisimu Luar Biasa Prima! 🔥",
        text: "Kombinasi mood positif dan kebiasaan fisik yang sehat membuatmu siap 100% menyerap seluruh materi MASTA UMKT 2026. Pertahankan ritme ini dan tularkan semangatmu ke teman-teman se-gugus!",
        level: "excellent",
      };
    } else if (currentScore >= 65) {
      return {
        title: "Kondisi Bagus & Terjaga 👍",
        text: "Kesiapanmu sudah sangat mantap. Jangan lupa sediakan botol air minum di meja belajarmu dan lakukan peregangan setiap 1 jam saat sesi Zoom berlangsung.",
        level: "good",
      };
    } else {
      return {
        title: "Perlu Sedikit Rehat & Perhatian Ekstra 🌿",
        text: "Wajar merasa cemas atau lelah menjelang kegiatan besar. Luangkan waktu 15 menit untuk tarik napas dalam, minum air hangat, dan pastikan malam ini tidur lebih awal ya. Nyala selalu ada bersamamu!",
        level: "needCare",
      };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <HeartPulse className="w-4 h-4" />
          <span>Daily Wellness & Readiness Tracker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
          Health Check MABA UMKT
        </h1>
        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300">
          Orientasi yang sukses dimulai dari tubuh yang sehat dan pikiran yang tenang. Pantau kesiapan harianmu bersama Nyala!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Daily Assessment Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Mood Tracker */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-200/60 dark:border-navy-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <Smile className="w-5 h-5 text-nyala-500" />
                <span>1. Bagaimana Perasaanmu Hari Ini?</span>
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                Pilih 1 Emoji
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3 pt-2">
              {MOOD_OPTIONS.map((mood) => {
                const isSelected = selectedMood.emoji === mood.emoji;
                return (
                  <button
                    key={mood.emoji}
                    onClick={() => setSelectedMood(mood)}
                    className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-nyala-500/10 border-nyala-500 shadow-fire scale-105"
                        : "bg-white/80 dark:bg-navy-800/80 border-navy-200/60 dark:border-navy-700 hover:border-nyala-400"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl mb-1.5">{mood.emoji}</span>
                    <span className="text-[10px] sm:text-xs font-medium text-navy-700 dark:text-navy-300 text-center leading-tight">
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Physical Habits Checklist */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-200/60 dark:border-navy-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-nyala-500" />
                <span>2. Kesiapan Fisik & Kebiasaan Sehat</span>
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                Checklist
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {PHYSICAL_CHECKS.map((check) => {
                const isChecked = selectedChecks.includes(check.id);
                const Icon = check.icon;

                return (
                  <div
                    key={check.id}
                    onClick={() => handleToggleCheck(check.id)}
                    className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border cursor-pointer select-none transition-all ${
                      isChecked
                        ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500/50 dark:border-emerald-500/30"
                        : "bg-white/70 dark:bg-navy-800/70 border-navy-200/60 dark:border-navy-700 hover:border-navy-300"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 transition-colors ${
                        isChecked
                          ? "bg-emerald-500 text-white shadow-xs"
                          : "border-2 border-navy-300 dark:border-navy-600"
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-nyala-500" />
                        <h4 className="text-sm font-bold text-navy-900 dark:text-white">
                          {check.title}
                        </h4>
                      </div>
                      <p className="text-xs text-navy-500 dark:text-navy-400 mt-0.5">
                        {check.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional Note */}
          <div className="glass-card rounded-3xl p-5 sm:p-6 border border-navy-200/60 dark:border-navy-800 space-y-2.5">
            <label className="text-xs sm:text-sm font-bold text-navy-900 dark:text-white flex items-center gap-2">
              <span>Catatan / Hal yang Dirasakan Hari Ini (Opsional):</span>
            </label>
            <input
              type="text"
              value={dailyNote}
              onChange={(e) => setDailyNote(e.target.value)}
              placeholder="Contoh: Agak nervous pas latihan On-Cam, tapi udah ketemu temen 1 gugus!"
              className="w-full bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-700 rounded-2xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-nyala-500"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveDailyCheck}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-nyala-500 via-nyala-600 to-amber-500 text-white font-bold text-base shadow-fire-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>{hasSavedToday ? "Perbarui Catatan Hari Ini" : "Simpan Health Check Hari Ini"}</span>
          </button>

          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-2xl bg-emerald-500 text-white text-center text-xs sm:text-sm font-bold shadow-lg"
            >
              🎉 Berhasil tersimpan ke riwayat 7 hari terakhir! Semangat Sobat MABA!
            </motion.div>
          )}

        </div>

        {/* Right Column: Live Score Gauge, Mascot Insight, & 7-Day History */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Score & Personal Recommendation Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-navy-200/60 dark:border-navy-800 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                Skor Kesiapan Harian
              </h3>
              <span className="text-2xl">{selectedMood.emoji}</span>
            </div>

            {/* Circular / Large Score Display */}
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
                  {currentScore}
                  <span className="text-xl font-bold text-nyala-500"> / 100</span>
                </div>
                <div className="text-xs font-semibold text-nyala-600 dark:text-nyala-400">
                  {selectedMood.label}
                </div>
              </div>
              <MascotFlame size="md" mood={currentScore >= 70 ? "cheering" : "calm"} />
            </div>

            <ProgressBar progress={currentScore} size="md" showPercentage={false} />

            {/* Personalized Recommendation Box */}
            <div className="p-4 rounded-2xl bg-cream-100 dark:bg-navy-900 border border-amber-200/70 dark:border-navy-700/80 space-y-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-navy-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-nyala-500" />
                <span>{rec.title}</span>
              </h4>
              <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                {rec.text}
              </p>
            </div>
          </div>

          {/* 7-Day History Log Card */}
          <div className="glass-card rounded-3xl p-6 border border-navy-200/60 dark:border-navy-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-nyala-500" />
                <span>Riwayat 7 Hari Terakhir</span>
              </h3>
              <span className="text-[11px] text-navy-500 dark:text-navy-400 font-medium">
                {history.length} Catatan
              </span>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-8 space-y-2 text-navy-400">
                <Smile className="w-8 h-8 mx-auto opacity-40" />
                <p className="text-xs">Belum ada riwayat tercatat. Mulai simpan health check pertamamu hari ini!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {history.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-2xl bg-white/70 dark:bg-navy-900/60 border border-navy-100 dark:border-navy-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{log.emoji}</span>
                      <div>
                        <div className="font-bold text-navy-900 dark:text-white">
                          {log.date} ({log.dayName})
                        </div>
                        <div className="text-[11px] text-navy-500 dark:text-navy-400">
                          {log.moodLabel} • {log.checks.length} kebiasaan sehat
                        </div>
                        {log.note && (
                          <div className="text-[10px] text-nyala-600 dark:text-nyala-400 italic mt-0.5">
                            "{log.note}"
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="font-extrabold text-sm text-nyala-600 dark:text-nyala-400">
                      {log.score}%
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      <BacklinkBanner compact />

    </div>
  );
}
