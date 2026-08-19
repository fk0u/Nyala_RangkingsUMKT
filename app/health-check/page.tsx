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
import { useToast } from "@/context/ToastContext";

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
  const toast = useToast();

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
    toast.nyala(`Kesiapan harianmu (${currentScore}%) berhasil tersimpan! 🔥`, "Tersimpan");
    setTimeout(() => setShowCelebration(false), 4000);
  };

  // Get Personalized Recommendation based on score and mood
  const getRecommendation = () => {
    if (selectedMood.emoji === "😰" || selectedMood.emoji === "🥱") {
      return {
        title: "Perhatian & Istirahat Tambahan",
        advice: "Tarik napas panjang secara perlahan dan luangkan waktu untuk rileks 10-15 menit. Pastikan kamu minum segelas air hangat dan tidur lebih awal malam ini. Semangat, kamu pasti bisa melewatinya!",
        mascotMood: "calm" as const,
      };
    }

    if (currentScore >= 80) {
      return {
        title: "Kondisi Prima & Siap Menginspirasi!",
        advice: "Stamina dan pikiranmu dalam keadaan sangat baik! Pertahankan pola tidur teratur dan jangan lupa sarapan sebelum mengikuti rangkaian MASTA.",
        mascotMood: "excited" as const,
      };
    }

    return {
      title: "Kesiapan Cukup Baik, Terus Jaga Stamina",
      advice: "Pastikan kamu melengkapi kebutuhan minum air putih dan cukupi asupan nutrisi sebelum acara dimulai ya!",
      mascotMood: "happy" as const,
    };
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
          Health Check & Mood Tracker MABA
        </h1>
        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300">
          Kesehatan fisik dan ketenangan mentalmu adalah kunci utama sukses menjalani MASTA UMKT 2026. Pantau kondisimu setiap hari!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Check-in Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Mood Selector */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-200/60 dark:border-navy-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <Smile className="w-5 h-5 text-nyala-500" />
                <span>1. Bagaimana Perasaan / Mood-mu Hari Ini?</span>
              </h3>
              <span className="text-xs font-bold text-nyala-600 dark:text-nyala-400">
                {selectedMood.label}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {MOOD_OPTIONS.map((mood, idx) => {
                const isSelected = selectedMood.emoji === mood.emoji;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedMood(mood);
                      toast.info(`Mood dipilih: ${mood.label}`, "Mood");
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-nyala-500/15 border-nyala-500 shadow-fire scale-105"
                        : "bg-white dark:bg-navy-900/50 border-navy-200/60 dark:border-navy-800 hover:border-nyala-300"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl mb-1">{mood.emoji}</span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-center text-navy-700 dark:text-navy-300 leading-tight">
                      {mood.label.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Physical Conditions Checklist */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-200/60 dark:border-navy-800 space-y-4 shadow-md">
            <h3 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>2. Kesiapan Fisik & Asupan Harian</span>
            </h3>

            <div className="space-y-3">
              {PHYSICAL_CHECKS.map((check) => {
                const Icon = check.icon;
                const isChecked = selectedChecks.includes(check.id);

                return (
                  <div
                    key={check.id}
                    onClick={() => handleToggleCheck(check.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isChecked
                        ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800"
                        : "bg-white dark:bg-navy-900/50 border-navy-200/60 dark:border-navy-800 hover:border-nyala-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl mt-0.5 ${isChecked ? "bg-emerald-500 text-white" : "bg-navy-100 dark:bg-navy-800 text-navy-500"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-navy-900 dark:text-white">
                          {check.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-navy-500 dark:text-navy-400 mt-0.5">
                          {check.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-1">
                      <CheckCircle2
                        className={`w-5 h-5 transition-colors ${
                          isChecked ? "text-emerald-500" : "text-navy-300 dark:text-navy-600"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Optional Daily Notes */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-200/60 dark:border-navy-800 space-y-3 shadow-md">
            <h3 className="text-xs sm:text-sm font-bold text-navy-900 dark:text-white">
              Catatan atau Harapan Hari Ini (Opsional):
            </h3>
            <input
              type="text"
              value={dailyNote}
              onChange={(e) => setDailyNote(e.target.value)}
              placeholder="Contoh: 'Semoga hari ini dapat kenalan teman baru dari prodi lain!'"
              className="w-full bg-white dark:bg-navy-900 border border-navy-200/70 dark:border-navy-700 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-nyala-500 text-navy-900 dark:text-white"
            />

            <button
              onClick={handleSaveDailyCheck}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-nyala-500 to-nyala-600 hover:from-nyala-600 hover:to-nyala-700 text-white font-bold text-sm shadow-fire hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{hasSavedToday ? "Perbarui Log Hari Ini" : "Simpan Health Check Hari Ini"}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Score Summary & Personalized AI Recommendations */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Readiness Score Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-navy-200/60 dark:border-navy-800 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
                Skor Kesiapan Harian
              </span>
              <span className="text-3xl font-black text-navy-900 dark:text-white">
                {currentScore}%
              </span>
            </div>

            <ProgressBar progress={currentScore} size="lg" showPercentage={false} />

            {/* Mascot Advice Box */}
            <div className="p-5 rounded-2xl bg-cream-100 dark:bg-navy-900/90 border border-amber-200/70 dark:border-navy-700 space-y-3">
              <div className="flex items-center gap-3">
                <MascotFlame size="sm" mood={rec.mascotMood} className="w-10 h-10" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-navy-900 dark:text-white">
                    {rec.title}
                  </h4>
                  <span className="text-[11px] text-nyala-600 dark:text-nyala-400 font-semibold">
                    Rekomendasi Nyala
                  </span>
                </div>
              </div>
              <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                {rec.advice}
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
