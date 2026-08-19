"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heartbeat, 
  Sparkle, 
  Moon, 
  ForkKnife, 
  Drop, 
  Lightning, 
  CheckCircle, 
  WarningCircle, 
  ArrowClockwise, 
  Calendar, 
  TrendUp,
  Smiley,
  SmileyMeh,
  SmileySad,
  SmileyWink,
  ShieldCheck,
  NotePencil,
  Trash
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import { useToast } from "@/context/ToastContext";

interface HealthLog {
  date: string; // YYYY-MM-DD
  displayDate: string;
  mood: number; // 1 to 5
  moodLabel: string;
  sleep: boolean;
  meal: boolean;
  water: boolean;
  energy: boolean;
  score: number;
  note?: string;
}

const MOOD_OPTIONS = [
  { value: 5, label: "Luar Biasa", icon: "🔥", desc: "Energi 100%, siap taklukkan MASTA!" },
  { value: 4, label: "Semangat", icon: "✨", desc: "Mood positif dan antusias." },
  { value: 3, label: "Cukup Baik", icon: "😊", desc: "Stabil, siap mengikuti alur." },
  { value: 2, label: "Lelah / Ngantuk", icon: "🥱", desc: "Butuh tidur ekstra dan rehidrasi." },
  { value: 1, label: "Cemas / Tegang", icon: "😰", desc: "Perlu tarik napas & rileks sejenak." },
];

export default function HealthCheckPage() {
  const toast = useToast();
  const [selectedMood, setSelectedMood] = useState<number>(4);
  const [sleepCheck, setSleepCheck] = useState<boolean>(true);
  const [mealCheck, setMealCheck] = useState<boolean>(true);
  const [waterCheck, setWaterCheck] = useState<boolean>(true);
  const [energyCheck, setEnergyCheck] = useState<boolean>(true);
  const [note, setNote] = useState<string>("");
  const [logs, setLogs] = useState<HealthLog[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Load 7-day logs from localStorage
  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("nyala_health_logs");
    if (stored) {
      try {
        setLogs(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse health logs", e);
      }
    } else {
      // Seed default baseline for pleasant visualization
      const sampleLogs: HealthLog[] = [
        {
          date: "2026-08-16",
          displayDate: "16 Agt",
          mood: 4,
          moodLabel: "Semangat",
          sleep: true,
          meal: true,
          water: true,
          energy: true,
          score: 95,
          note: "Mempersiapkan berkas registrasi UMKT."
        },
        {
          date: "2026-08-17",
          displayDate: "17 Agt",
          mood: 5,
          moodLabel: "Luar Biasa",
          sleep: true,
          meal: true,
          water: true,
          energy: true,
          score: 100,
          note: "Semangat Hari Kemerdekaan & verifikasi berkas selesai!"
        },
        {
          date: "2026-08-18",
          displayDate: "18 Agt",
          mood: 3,
          moodLabel: "Cukup Baik",
          sleep: false,
          meal: true,
          water: true,
          energy: false,
          score: 75,
          note: "Membaca panduan SIKAD sampai larut malam."
        }
      ];
      setLogs(sampleLogs);
      localStorage.setItem("nyala_health_logs", JSON.stringify(sampleLogs));
    }
  }, []);

  // Compute Current Form Score (0-100)
  const calculateScore = () => {
    let score = (selectedMood / 5) * 40; // 40% from mood
    if (sleepCheck) score += 15;
    if (mealCheck) score += 15;
    if (waterCheck) score += 15;
    if (energyCheck) score += 15;
    return Math.round(score);
  };

  const currentScore = calculateScore();

  // Save Today's Health Log
  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];
    const displayDate = today.toLocaleDateString("id-ID", { day: "numeric", month: "short" });

    const moodObj = MOOD_OPTIONS.find((m) => m.value === selectedMood);

    const newLog: HealthLog = {
      date: dateStr,
      displayDate,
      mood: selectedMood,
      moodLabel: moodObj?.label || "Baik",
      sleep: sleepCheck,
      meal: mealCheck,
      water: waterCheck,
      energy: energyCheck,
      score: currentScore,
      note: note.trim() || undefined,
    };

    // Replace if exists for today or prepend, keep max 7 items
    const updated = [newLog, ...logs.filter((l) => l.date !== dateStr)].slice(0, 7);
    setLogs(updated);
    localStorage.setItem("nyala_health_logs", JSON.stringify(updated));
    setNote("");
    toast.success("Catatan kondisi harian berhasil disimpan!", "Kondisi Tercatat");
  };

  const handleClearHistory = () => {
    if (confirm("Hapus seluruh riwayat kondisi kesehatan?")) {
      setLogs([]);
      localStorage.removeItem("nyala_health_logs");
      toast.info("Riwayat kesehatan telah dikosongkan.", "Reset");
    }
  };

  // Recommendation Engine
  const getRecommendation = (score: number) => {
    if (score >= 85) {
      return {
        title: "Kondisi Fisik & Mental Prima!",
        desc: "Kamu berada dalam performa terbaik. Pertahankan pola hidrasi dan istirahat agar tetap fokus selama rangkaian MASTA 2026.",
        color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        badge: "Status: Optimal 🔥",
      };
    }
    if (score >= 65) {
      return {
        title: "Kondisi Cukup Baik",
        desc: "Perhatikan asupan air putih minimal 2 liter per hari dan hindari begadang sebelum sesi daring Zoom dimulai.",
        color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
        badge: "Status: Perlu Rehidrasi 💧",
      };
    }
    return {
      title: "Waktunya Rehat & Pulihkan Energi",
      desc: "Tubuhmu mengirim sinyal kelelahan. Segera cukupkan tidur 7-8 jam, makan teratur, dan lakukan peregangan ringan.",
      color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
      badge: "Status: Butuh Istirahat 🛑",
    };
  };

  const rec = getRecommendation(currentScore);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* ── Page Header ── */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 text-xs font-black uppercase tracking-wider border border-nyala-500/20">
          <Heartbeat weight="fill" className="w-4 h-4" />
          <span>Health & Wellness Tracker MABA 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
          Cek Kesiapan Fisik & <br />
          <span className="fire-text-gradient">Kesehatan Mentalmu</span>
        </h1>
        <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400">
          MASTA bukan sekadar orientasi akademik, tapi juga tentang menjaga kesehatan fisik dan kejernihan pikiran agar kamu dapat berproses dengan bahagia di UMKT.
        </p>
      </div>

      {/* ── Main Interactive Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Check-in */}
        <div className="lg:col-span-7 space-y-6">
          
          <form onSubmit={handleSaveLog} className="glass-card p-6 sm:p-8 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-6 shadow-xl">
            
            {/* Step 1: Mood Tracker */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-navy-700 dark:text-navy-300 flex items-center justify-between">
                <span>1. Bagaimana Suasana Hatimu Hari Ini?</span>
                <span className="text-[10px] text-nyala-500 font-mono">Wajib Diisi</span>
              </label>

              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {MOOD_OPTIONS.map((m) => {
                  const isSelected = selectedMood === m.value;
                  return (
                    <button
                      type="button"
                      key={m.value}
                      onClick={() => setSelectedMood(m.value)}
                      className={`p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center space-y-1.5 transition-all text-center border active:scale-95 ${
                        isSelected
                          ? "bg-nyala-500/15 border-nyala-500 text-nyala-600 dark:text-nyala-400 shadow-md ring-2 ring-nyala-500/30 font-bold"
                          : "bg-white dark:bg-navy-900 border-navy-200/50 dark:border-navy-800 text-navy-600 dark:text-navy-400 hover:border-navy-300"
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl">{m.icon}</span>
                      <span className="text-[10px] sm:text-xs font-bold leading-tight">
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Physical Checklist */}
            <div className="space-y-3 pt-4 border-t border-navy-100 dark:border-navy-800/80">
              <label className="text-xs font-black uppercase tracking-wider text-navy-700 dark:text-navy-300">
                2. Checklist Kondisi Fisik Harian
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Sleep */}
                <label className={`p-4 rounded-2xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                  sleepCheck 
                    ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-900 dark:text-indigo-200" 
                    : "bg-white dark:bg-navy-900 border-navy-200/50 dark:border-navy-800 text-navy-500"
                }`}>
                  <input
                    type="checkbox"
                    checked={sleepCheck}
                    onChange={(e) => setSleepCheck(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Moon weight="fill" className="w-4 h-4 text-indigo-500" />
                      <span>Tidur Cukup (≥ 7 Jam)</span>
                    </div>
                    <p className="text-[10px] text-navy-500 dark:text-navy-400 mt-0.5">
                      Bangun dalam kondisi segar tanpa pusing
                    </p>
                  </div>
                </label>

                {/* Meal */}
                <label className={`p-4 rounded-2xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                  mealCheck 
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-200" 
                    : "bg-white dark:bg-navy-900 border-navy-200/50 dark:border-navy-800 text-navy-500"
                }`}>
                  <input
                    type="checkbox"
                    checked={mealCheck}
                    onChange={(e) => setMealCheck(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <ForkKnife weight="fill" className="w-4 h-4 text-amber-500" />
                      <span>Sarapan / Makan Teratur</span>
                    </div>
                    <p className="text-[10px] text-navy-500 dark:text-navy-400 mt-0.5">
                      Asupan nutrisi untuk fokus berpikir
                    </p>
                  </div>
                </label>

                {/* Water */}
                <label className={`p-4 rounded-2xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                  waterCheck 
                    ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-900 dark:text-cyan-200" 
                    : "bg-white dark:bg-navy-900 border-navy-200/50 dark:border-navy-800 text-navy-500"
                }`}>
                  <input
                    type="checkbox"
                    checked={waterCheck}
                    onChange={(e) => setWaterCheck(e.target.checked)}
                    className="w-4 h-4 text-cyan-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Drop weight="fill" className="w-4 h-4 text-cyan-500" />
                      <span>Hidrasi Air (≥ 2 Liter)</span>
                    </div>
                    <p className="text-[10px] text-navy-500 dark:text-navy-400 mt-0.5">
                      Cegah dehidrasi saat sesi panjang
                    </p>
                  </div>
                </label>

                {/* Energy */}
                <label className={`p-4 rounded-2xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                  energyCheck 
                    ? "bg-nyala-500/10 border-nyala-500/40 text-nyala-900 dark:text-nyala-200" 
                    : "bg-white dark:bg-navy-900 border-navy-200/50 dark:border-navy-800 text-navy-500"
                }`}>
                  <input
                    type="checkbox"
                    checked={energyCheck}
                    onChange={(e) => setEnergyCheck(e.target.checked)}
                    className="w-4 h-4 text-nyala-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Lightning weight="fill" className="w-4 h-4 text-nyala-500" />
                      <span>Level Energi Prima</span>
                    </div>
                    <p className="text-[10px] text-navy-500 dark:text-navy-400 mt-0.5">
                      Tidak demam atau flu berat
                    </p>
                  </div>
                </label>

              </div>
            </div>

            {/* Step 3: Optional Personal Note */}
            <div className="space-y-2 pt-4 border-t border-navy-100 dark:border-navy-800/80">
              <label className="text-xs font-black uppercase tracking-wider text-navy-700 dark:text-navy-300 flex items-center gap-1.5">
                <NotePencil weight="bold" className="w-4 h-4 text-nyala-500" />
                <span>3. Catatan Pribadi (Opsional)</span>
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Contoh: Sudah cetak name tag MASTA, siap ikut Zoom..."
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-navy-900 border border-navy-200/60 dark:border-navy-800 text-xs focus:ring-2 focus:ring-nyala-500 outline-none text-navy-900 dark:text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-nyala-500 via-nyala-600 to-amber-500 hover:from-nyala-600 hover:to-amber-600 text-white font-black text-sm tracking-wide shadow-lg shadow-nyala-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <CheckCircle weight="bold" className="w-5 h-5" />
              <span>Simpan Catatan Kondisi Harian</span>
            </button>

          </form>

        </div>

        {/* Right Column: Score Summary & 7-Day History */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Real-time Health Index Card */}
          <div className="glass-card p-6 sm:p-7 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-navy-500 font-mono">
                Indeks Kesiapan Hari Ini
              </span>
              <span className={`px-3 py-1 rounded-full text-[11px] font-black border ${rec.color}`}>
                {rec.badge}
              </span>
            </div>

            {/* Score Display */}
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black fire-text-gradient font-mono tracking-tight">
                {currentScore}
              </span>
              <span className="text-sm font-extrabold text-navy-400 font-mono">/ 100</span>
            </div>

            {/* Recommendation Box */}
            <div className={`p-4 rounded-2xl border space-y-1.5 ${rec.color}`}>
              <h4 className="text-xs font-black flex items-center gap-1.5">
                <Sparkle weight="fill" className="w-4 h-4" />
                <span>{rec.title}</span>
              </h4>
              <p className="text-xs leading-relaxed opacity-90">
                {rec.desc}
              </p>
            </div>
          </div>

          {/* 7-Day Visual History */}
          <div className="glass-card p-6 sm:p-7 rounded-3xl border border-navy-200/60 dark:border-navy-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendUp weight="bold" className="w-4 h-4 text-nyala-500" />
                <h3 className="text-xs font-black uppercase tracking-wider text-navy-800 dark:text-white">
                  Riwayat 7 Hari Terakhir
                </h3>
              </div>

              {logs.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="text-[10px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
                >
                  <Trash weight="bold" className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {logs.length === 0 ? (
              <p className="text-xs text-navy-400 py-6 text-center">
                Belum ada catatan kondisi. Isi form di sebelah untuk mencatat.
              </p>
            ) : (
              <div className="space-y-3">
                {logs.map((log, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/70 dark:bg-navy-900/70 border border-navy-100 dark:border-navy-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-navy-500 min-w-[48px]">
                        {log.displayDate}
                      </span>
                      <span className="text-lg">
                        {MOOD_OPTIONS.find((m) => m.value === log.mood)?.icon || "😊"}
                      </span>
                      <div>
                        <span className="font-bold text-navy-800 dark:text-white block">
                          {log.moodLabel}
                        </span>
                        {log.note && (
                          <span className="text-[10px] text-navy-500 dark:text-navy-400 line-clamp-1">
                            {log.note}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="font-mono font-black text-xs px-2 py-0.5 rounded-lg bg-nyala-500/10 text-nyala-600 dark:text-nyala-400 border border-nyala-500/20">
                      {log.score}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
