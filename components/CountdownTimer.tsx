"use client";

import React, { useState, useEffect } from "react";
import { Clock, Sparkle, Calendar, CaretDown } from "@phosphor-icons/react";

interface Milestone {
  id: string;
  name: string;
  targetISO: string;
  badge: string;
  timeWITA: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "daring-univ",
    name: "Pembukaan & Materi Universitas (Daring Zoom)",
    targetISO: "2026-08-24T08:00:00+08:00",
    badge: "24 Agustus 2026",
    timeWITA: "08.00 WITA"
  },
  {
    id: "luring-puncak",
    name: "UKM Expo & Puncak Milad (Luring Kampus UMKT)",
    targetISO: "2026-08-28T06:30:00+08:00",
    badge: "28 Agustus 2026",
    timeWITA: "06.30 WITA"
  }
];

export default function CountdownTimer({ compact = false }: { compact?: boolean }) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>(MILESTONES[0]);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(selectedMilestone.targetISO).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [selectedMilestone]);

  return (
    <div className="bg-gradient-to-r from-nyala-500/10 via-amber-500/10 to-nyala-600/10 dark:from-nyala-500/15 dark:to-nyala-900/20 border border-nyala-500/20 rounded-3xl p-4 sm:p-6 shadow-md">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        
        {/* Left Info */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nyala-500 to-amber-500 text-white flex items-center justify-center shadow-fire flex-shrink-0">
            <Clock weight="duotone" className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
                <Sparkle weight="fill" className="w-3.5 h-3.5" />
                <span>Hitung Mundur Resmi MASTA 2026</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-nyala-500/20 text-nyala-700 dark:text-nyala-300 text-[10px] font-bold font-mono">
                {selectedMilestone.badge} ({selectedMilestone.timeWITA})
              </span>
            </div>
            
            <h4 className="text-base sm:text-lg font-black text-navy-900 dark:text-white">
              {selectedMilestone.name}
            </h4>
          </div>
        </div>

        {/* Right: Milestone Selector & Timer Chips */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          
          {/* Toggle buttons */}
          <div className="flex bg-navy-100 dark:bg-navy-800 p-1 rounded-xl w-full sm:w-auto">
            {MILESTONES.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMilestone(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-1 sm:flex-initial text-center ${
                  selectedMilestone.id === m.id
                    ? "bg-white dark:bg-navy-900 text-navy-900 dark:text-white shadow-xs"
                    : "text-navy-500 dark:text-navy-400 hover:text-navy-800"
                }`}
              >
                {m.id === "daring-univ" ? "24 Agt (Daring)" : "28 Agt (Luring)"}
              </button>
            ))}
          </div>

          {/* Digits Grid */}
          <div className="grid grid-cols-4 gap-2 text-center w-full sm:w-auto">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/90 dark:bg-navy-800/90 backdrop-blur px-3 py-2 rounded-2xl border border-navy-200/60 dark:border-navy-700 shadow-xs min-w-[62px]"
              >
                <span className="block text-xl sm:text-2xl font-black text-nyala-600 dark:text-nyala-400 leading-tight font-mono">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-navy-400 dark:text-navy-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
