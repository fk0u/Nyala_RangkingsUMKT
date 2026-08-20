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
  { id: "excited", label: "Semangat", bonus: 25, icon: SmileyXEyes, color: "text-amber-400" },
  { id: "happy", label: "Senang", bonus: 20, icon: Smiley, color: "text-emerald-400" },
  { id: "neutral", label: "Biasa", bonus: 15, icon: SmileyMeh, color: "text-blue-400" },
  { id: "tired", label: "Lelah", bonus: 10, icon: SmileySad, color: "text-purple-400" },
  { id: "nervous", label: "Cemas", bonus: 5, icon: SmileyNervous, color: "text-rose-400" },
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
        <h1 className="text-xl font-black text-white">Health Check & Mood MABA</h1>
        <p className="text-xs text-navy-300">Pantau stamina fisik dan kesiapan mental setiap hari.</p>
      </div>

      {/* Readiness Gauge Card */}
      <div className="p-5 rounded-3xl bg-[#0E1635] border border-navy-800 space-y-3 text-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-navy-400 font-bold">Skor Kesiapan Harian</span>
        <div className="text-4xl font-black font-mono text-nyala-400">{totalScore}%</div>
        <p className="text-xs text-navy-300">
          {totalScore >= 80 ? "Kondisi fisik dan mentalmu sangat prima!" : "Pastikan minum air cukup dan istirahat teratur."}
        </p>
      </div>

      {/* Mood Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-navy-400 uppercase tracking-wider block">Bagaimana Perasaanmu Hari Ini?</label>
        <div className="grid grid-cols-5 gap-1.5">
          {MOODS.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMood.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m)}
                className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-nyala-600/20 border-nyala-500 text-white"
                    : "bg-[#0E1635] border-navy-800 text-navy-400"
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
        <label className="text-xs font-bold text-navy-400 uppercase tracking-wider block">Checklist Fisik & Nutrisi:</label>
        <div className="space-y-2">
          {CHECKS.map((c) => {
            const Icon = c.icon;
            const isChecked = selectedChecks.includes(c.id);
            return (
              <div
                key={c.id}
                onClick={() => handleToggleCheck(c.id)}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer select-none active:scale-98 transition-all ${
                  isChecked
                    ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                    : "bg-[#0E1635] border-navy-800 text-navy-400"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon weight="bold" className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">{c.label}</span>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  isChecked ? "bg-emerald-500 border-emerald-500 text-white" : "border-navy-600 bg-navy-900"
                }`}>
                  {isChecked && <Check weight="bold" className="w-3 h-3" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-2xl bg-nyala-600 hover:bg-nyala-500 text-white text-xs font-black shadow-lg shadow-nyala-600/30 active:scale-98 transition-all cursor-pointer"
      >
        Simpan Evaluasi Hari Ini
      </button>

    </div>
  );
}
