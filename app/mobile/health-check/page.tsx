"use client";

import React, { useState, useEffect } from "react";
import { 
  Heartbeat, 
  SmileyXEyes, 
  Smiley, 
  SmileyMeh, 
  SmileySad, 
  SmileyNervous, 
  Moon, 
  ForkKnife, 
  Drop, 
  Lightning, 
  Check, 
  TrendUp 
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import { useToast } from "@/context/ToastContext";

const MOODS = [
  { id: "excited", label: "Semangat", bonus: 25, icon: SmileyXEyes, color: "text-amber-500" },
  { id: "happy", label: "Senang", bonus: 20, icon: Smiley, color: "text-emerald-500" },
  { id: "neutral", label: "Biasa", bonus: 15, icon: SmileyMeh, color: "text-blue-500" },
  { id: "tired", label: "Lelah", bonus: 10, icon: SmileySad, color: "text-purple-500" },
  { id: "nervous", label: "Cemas", bonus: 5, icon: SmileyNervous, color: "text-rose-500" },
];

const CHECKS = [
  { id: "sleep", label: "Tidur Cukup (6-8 Jam)", icon: Moon, points: 20 },
  { id: "food", label: "Sarapan & Nutrisi Sehat", icon: ForkKnife, points: 20 },
  { id: "water", label: "Hidrasi Air Min. 2 Liter", icon: Drop, points: 20 },
  { id: "mind", label: "Peregangan & Relaksasi", icon: Lightning, points: 15 },
];

export default function MobileHealthCheckPage() {
  const [selectedMood, setSelectedMood] = useState(MOODS[1]);
  const [selectedChecks, setSelectedChecks] = useState<string[]>(["sleep", "water"]);
  const [hasSaved, setHasSaved] = useState(false);
  const toast = useToast();

  const totalScore = Math.min(
    selectedMood.bonus + selectedChecks.reduce((acc, c) => acc + (CHECKS.find((k) => k.id === c)?.points || 0), 0),
    100
  );

  const handleToggleCheck = (id: string) => {
    if (selectedChecks.includes(id)) {
      setSelectedChecks(selectedChecks.filter((c) => c !== id));
    } else {
      setSelectedChecks([...selectedChecks, id]);
    }
  };

  const handleSave = () => {
    const today = new Date().toLocaleDateString("id-ID");
    const log = {
      date: today,
      mood: selectedMood.id,
      label: selectedMood.label,
      score: totalScore,
      checks: selectedChecks,
    };

    localStorage.setItem("nyala_health_logs", JSON.stringify([log]));
    localStorage.setItem("nyala_mood_history", JSON.stringify([log]));
    setHasSaved(true);
    toast.nyala(`Skor kesiapan (${totalScore}%) tersimpan!`, "Tersimpan");
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white">Health Check & Mood MABA</h1>
        <p className="text-xs text-navy-600 dark:text-navy-300">Pantau stamina fisik dan kesiapan mental setiap hari.</p>
      </div>

      {/* Readiness Gauge Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-3 text-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-navy-500 dark:text-navy-400 font-bold">Skor Kesiapan Harian</span>
        <div className="text-4xl sm:text-5xl font-black font-mono text-nyala-600 dark:text-nyala-400">{totalScore}%</div>
        <p className="text-xs text-navy-600 dark:text-navy-300 max-w-sm mx-auto">
          {totalScore >= 80 ? "Kondisi fisik dan mentalmu sangat prima untuk menyerap materi orientasi!" : "Pastikan minum air cukup dan istirahat teratur malam ini."}
        </p>
      </div>

      {/* Mood Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-navy-700 dark:text-navy-300 uppercase tracking-wider block">Bagaimana Perasaanmu Hari Ini?</label>
        <div className="grid grid-cols-5 gap-1.5">
          {MOODS.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMood.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m)}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                  isSelected
                    ? "bg-nyala-600/15 border-nyala-500 text-navy-950 dark:text-white font-bold"
                    : "bg-white dark:bg-[#0E1635] border-navy-200 dark:border-navy-800 text-navy-600 dark:text-navy-400"
                }`}
              >
                <Icon weight="bold" className={`w-5 h-5 ${m.color}`} />
                <span className="text-[9px] font-bold truncate">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Physical Checklist */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-navy-700 dark:text-navy-300 uppercase tracking-wider block">Checklist Fisik & Nutrisi:</label>
        <div className="space-y-2">
          {CHECKS.map((c) => {
            const Icon = c.icon;
            const isChecked = selectedChecks.includes(c.id);
            return (
              <div
                key={c.id}
                onClick={() => handleToggleCheck(c.id)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer select-none active:scale-98 transition-all shadow-sm ${
                  isChecked
                    ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-navy-950 dark:text-white"
                    : "bg-white dark:bg-[#0E1635] border-navy-200/80 dark:border-navy-800 text-navy-600 dark:text-navy-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon weight="bold" className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold">{c.label}</span>
                </div>
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                  isChecked ? "bg-emerald-500 border-emerald-500 text-white" : "border-navy-300 dark:border-navy-600 bg-navy-50 dark:bg-navy-900"
                }`}>
                  {isChecked && <Check weight="bold" className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-2xl bg-nyala-600 hover:bg-nyala-500 text-white text-xs font-black shadow-md shadow-nyala-600/20 active:scale-98 transition-all cursor-pointer"
      >
        Simpan Evaluasi Hari Ini
      </button>

    </div>
  );
}
