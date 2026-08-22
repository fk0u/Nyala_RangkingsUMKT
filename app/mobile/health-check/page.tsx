"use client";

import React, { useState } from "react";
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
  FloppyDisk,
  Star
} from "@phosphor-icons/react";
import MascotFlame from "@/components/MascotFlame";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import DuolingoButton from "@/components/flutter/DuolingoButton";
import { useToast } from "@/context/ToastContext";
import ProgressBar from "@/components/ProgressBar";

const MOODS = [
  { id: "excited", label: "Semangat", bonus: 25, icon: SmileyXEyes, color: "text-amber-500" },
  { id: "happy", label: "Senang", bonus: 20, icon: Smiley, color: "text-emerald-500" },
  { id: "neutral", label: "Biasa", bonus: 15, icon: SmileyMeh, color: "text-blue-500" },
  { id: "tired", label: "Lelah", bonus: 10, icon: SmileySad, color: "text-purple-500" },
  { id: "nervous", label: "Cemas", bonus: 5, icon: SmileyNervous, color: "text-rose-500" },
];

const CHECKS = [
  { id: "sleep", label: "Tidur Cukup (6–8 Jam)", icon: Moon, points: 20, desc: "Memulihkan daya ingat dan fokus menyerap materi orientasi" },
  { id: "food", label: "Sarapan & Nutrisi Sehat", icon: ForkKnife, points: 20, desc: "Energi utama untuk aktif on-camera Zoom seharian" },
  { id: "water", label: "Hidrasi Air Min. 2 Liter", icon: Drop, points: 20, desc: "Mencegah dehidrasi dan menjaga konsentrasi belajar" },
  { id: "mind", label: "Peregangan & Relaksasi", icon: Lightning, points: 15, desc: "Relaksasi otot dan mindfulness anti-stres perkuliahan" },
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
    toast.nyala(`Skor kesiapan (${totalScore}%) tersimpan di log harian!`, "Tersimpan");
  };

  return (
    <div className="space-y-5">
      
      {/* ── 1. HEADER ── */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
          Health & Mood Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Pantau stamina fisik dan kesiapan mental mahasiswa baru setiap hari.
        </p>
      </div>

      {/* ── 2. READINESS GAUGE (DUOLINGO 3D CARD) ── */}
      <DuolingoCard variant="surface" padding="md" className="text-center space-y-3">
        <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
          Skor Kesiapan Fisik & Mental Hari Ini
        </span>
        
        <div className="text-4xl sm:text-5xl font-black font-mono text-nyala-500">
          {totalScore}%
        </div>

        <ProgressBar progress={totalScore} size="md" />

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
          {totalScore >= 80
            ? "✨ Kondisi fisik dan mentalmu sangat prima untuk menyerap materi orientasi kampus!"
            : "💡 Pastikan minum air cukup dan tidur teratur malam ini agar tetap fokus."}
        </p>
      </DuolingoCard>

      {/* ── 3. MOOD SELECTOR 3D BUTTONS ── */}
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-wider block px-1">
          Bagaimana Perasaanmu Hari Ini?
        </label>
        
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {MOODS.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMood.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m)}
                className={`p-3 rounded-2xl border-2 border-b-4 flex flex-col items-center gap-1.5 transition-all cursor-pointer select-none active:border-b-2 active:translate-y-0.5 ${
                  isSelected
                    ? "bg-nyala-500/10 border-nyala-500 border-b-nyala-700 text-nyala-600 dark:text-nyala-400 font-black"
                    : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 border-b-slate-300 dark:border-b-slate-900 text-slate-500"
                }`}
              >
                <Icon weight={isSelected ? "fill" : "bold"} className={`w-6 h-6 ${m.color}`} />
                <span className="text-[10px] tracking-tight">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. PHYSICAL CHECKS QUEST TILES ── */}
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-wider block px-1">
          Checklist Kesiapan Fisik (4 Pilar):
        </label>

        <div className="space-y-2">
          {CHECKS.map((c) => {
            const isChecked = selectedChecks.includes(c.id);
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                onClick={() => handleToggleCheck(c.id)}
                className={`p-3.5 rounded-2xl border-2 border-b-4 transition-all cursor-pointer select-none active:border-b-2 active:translate-y-0.5 flex items-center justify-between gap-3 ${
                  isChecked
                    ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900 border-b-emerald-400 dark:border-b-emerald-950"
                    : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 border-b-slate-300 dark:border-b-slate-900"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      isChecked
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    <Icon weight="bold" className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white truncate">
                      {c.label}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-normal">
                      {c.desc}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-mono font-bold text-emerald-500">
                    +{c.points} XP
                  </span>
                  <div
                    className={`w-6 h-6 rounded-xl flex items-center justify-center ${
                      isChecked
                        ? "bg-emerald-500 text-white"
                        : "border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                    }`}
                  >
                    {isChecked && <Check weight="bold" className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. SAVE BUTTON (DUOLINGO 3D BUTTON) ── */}
      <button
        onClick={handleSave}
        className="w-full py-4 px-4 rounded-2xl duo-btn-primary text-xs sm:text-sm font-black flex items-center justify-center gap-2"
      >
        <FloppyDisk weight="bold" className="w-4 h-4" />
        <span>{hasSaved ? "Pembaruan Kesiapan Tersimpan!" : "Simpan Catatan Kesiapan Hari Ini (+30 XP)"}</span>
      </button>

    </div>
  );
}
