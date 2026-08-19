"use client";

import React, { useState, useEffect } from "react";
import { Clock, Sparkle } from "@phosphor-icons/react";

export default function CountdownTimer() {
  // Target MASTA UMKT 2026 (Orientasi MABA perkiraan Agustus/September 2026)
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-09-01T08:00:00+08:00").getTime();

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
  }, []);

  return (
    <div className="bg-gradient-to-r from-nyala-500/10 via-amber-500/10 to-nyala-600/10 dark:from-nyala-500/15 dark:to-nyala-900/20 border border-nyala-500/20 rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-nyala-500 text-white flex items-center justify-center shadow-fire">
            <Clock weight="duotone" className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
              <Sparkle weight="fill" className="w-3.5 h-3.5" />
              <span>Hitung Mundur Menuju</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-navy-900 dark:text-white">
              MASTA MABA UMKT 2026
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center w-full sm:w-auto">
          {[
            { label: "Hari", value: timeLeft.days },
            { label: "Jam", value: timeLeft.hours },
            { label: "Menit", value: timeLeft.minutes },
            { label: "Detik", value: timeLeft.seconds },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-navy-800/90 backdrop-blur px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-navy-100 dark:border-navy-700 min-w-[58px]"
            >
              <span className="block text-lg sm:text-xl font-extrabold text-nyala-600 dark:text-nyala-400 leading-tight">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-navy-500 dark:text-navy-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
