"use client";

import React, { useState } from "react";
import { 
  CalendarCheck, 
  Users, 
  TShirt, 
  WarningOctagon, 
  Clock, 
  MapPin, 
  CheckCircle 
} from "@phosphor-icons/react";
import CountdownTimer from "@/components/CountdownTimer";
import { 
  OFFICIAL_MASTA_SCHEDULE_2026, 
  MASTA_WAVES_RUNDOWN_2026, 
  MASTA_OFFICIAL_RULES 
} from "@/lib/masta-data";

export default function MobileJadwalPage() {
  const [activeSegment, setActiveSegment] = useState<"imm" | "timeline" | "dresscode" | "sanksi">("imm");
  const [selectedWave, setSelectedWave] = useState<number>(1);

  const activeWaveData = MASTA_WAVES_RUNDOWN_2026.find((w) => w.waveNumber === selectedWave);

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white">Jadwal & Rundown MASTA</h1>
        <p className="text-xs text-navy-600 dark:text-navy-300">Rangkaian resmi 3 Gelombang IMM, Daring Zoom & Puncak Milad.</p>
      </div>

      {/* Countdown Widget */}
      <CountdownTimer />

      {/* Segmented Controller Tab Bar */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-navy-100/80 dark:bg-[#0E1635] border border-navy-200 dark:border-navy-800 overflow-x-auto scrollbar-none">
        {[
          { id: "imm", label: "3 Gelombang", icon: Users },
          { id: "timeline", label: "Rangkaian", icon: CalendarCheck },
          { id: "dresscode", label: "Pakaian", icon: TShirt },
          { id: "sanksi", label: "Sanksi", icon: WarningOctagon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSegment === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSegment(tab.id as any)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-nyala-600 text-white shadow-sm"
                  : "text-navy-600 dark:text-navy-400 hover:text-navy-950 dark:hover:text-white"
              }`}
            >
              <Icon weight={isActive ? "fill" : "bold"} className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SEGMENT 1: 3 GELOMBANG IMM */}
      {activeSegment === "imm" && (
        <div className="space-y-4">
          
          {/* Wave Selector Chips */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWave(w)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedWave === w
                    ? "bg-nyala-600/15 border-nyala-500 text-nyala-600 dark:text-white shadow-sm font-bold"
                    : "bg-white dark:bg-[#0E1635] border-navy-200 dark:border-navy-800 text-navy-600 dark:text-navy-400 hover:border-nyala-500/50"
                }`}
              >
                <span className="text-[10px] font-bold block uppercase tracking-wider">Gelombang</span>
                <span className="text-base font-black font-mono">Ke-{w}</span>
              </button>
            ))}
          </div>

          {activeWaveData && (
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-4">
              <div className="border-b border-navy-100 dark:border-navy-800 pb-3 space-y-1">
                <span className="text-[10px] font-mono text-nyala-600 dark:text-nyala-400 font-bold uppercase">{activeWaveData.date}</span>
                <h3 className="text-base sm:text-lg font-black text-navy-950 dark:text-white">{activeWaveData.waveName}: {activeWaveData.subTotalNotes}</h3>
                <span className="text-xs text-navy-500 dark:text-navy-400 font-mono">Total Kuota: {activeWaveData.totalKuota} Mahasiswa</span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wider block">Rundown Kegiatan:</span>
                <div className="space-y-1.5">
                  {activeWaveData.rundown.map((r, i) => (
                    <div key={i} className="p-3 rounded-xl bg-navy-50 dark:bg-navy-900/80 border border-navy-100 dark:border-navy-800 flex items-start justify-between gap-2 text-xs">
                      <div>
                        <span className="font-mono font-bold text-nyala-600 dark:text-nyala-400 block text-[10px]">{r.time}</span>
                        <h5 className="font-bold text-navy-950 dark:text-white text-xs">{r.activity}</h5>
                        <p className="text-[10px] text-navy-500 dark:text-navy-400">{r.notes}</p>
                      </div>
                      {r.kuota && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-navy-600 dark:text-navy-300 whitespace-nowrap">
                          {r.kuota}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* SEGMENT 2: TIMELINE RANGKAIAN */}
      {activeSegment === "timeline" && (
        <div className="space-y-3">
          {OFFICIAL_MASTA_SCHEDULE_2026.map((item) => (
            <div key={item.no} className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-nyala-600 dark:text-nyala-400">{item.dayDate}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-navy-100 dark:bg-navy-900 text-navy-600 dark:text-navy-300 border border-navy-200 dark:border-navy-800 font-mono">
                  {item.category}
                </span>
              </div>
              <h4 className="text-sm font-bold text-navy-950 dark:text-white">{item.activity}</h4>
              {item.time && (
                <div className="flex items-center gap-1.5 text-xs text-navy-500 dark:text-navy-400 font-mono">
                  <Clock weight="bold" className="w-3.5 h-3.5 text-nyala-500" />
                  <span>{item.time}</span>
                </div>
              )}
              {item.description && (
                <p className="text-xs text-navy-600 dark:text-navy-300 leading-snug">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SEGMENT 3: DRESSCODE */}
      {activeSegment === "dresscode" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <TShirt weight="bold" className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold text-navy-950 dark:text-white uppercase">{MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session1.title}</h4>
            </div>
            <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
              {MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session1.details}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <TShirt weight="bold" className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-bold text-navy-950 dark:text-white uppercase">{MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session2.title}</h4>
            </div>
            <div className="space-y-1 text-xs text-navy-600 dark:text-navy-300">
              <p><strong className="text-navy-900 dark:text-white">Pria:</strong> {MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session2.detailsMale}</p>
              <p><strong className="text-navy-900 dark:text-white">Wanita:</strong> {MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session2.detailsFemale}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-navy-950 dark:text-white uppercase">Kerapian Rambut & Grooming</h4>
            <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
              {MASTA_OFFICIAL_RULES.luringProvisions.grooming.rule}
            </p>
          </div>
        </div>
      )}

      {/* SEGMENT 4: SANKSI */}
      {activeSegment === "sanksi" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-rose-500">
              <WarningOctagon weight="bold" className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase">{MASTA_OFFICIAL_RULES.sanctions.title}</h4>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-bold">
              {MASTA_OFFICIAL_RULES.sanctions.warning}
            </div>
            <p className="text-xs text-navy-600 dark:text-navy-300 leading-snug">
              <strong className="text-navy-950 dark:text-white block pb-1">Pelanggaran Daring:</strong>
              {MASTA_OFFICIAL_RULES.sanctions.daring}
            </p>
            <p className="text-xs text-navy-600 dark:text-navy-300 leading-snug pt-1 border-t border-navy-100 dark:border-navy-800">
              <strong className="text-navy-950 dark:text-white block pb-1">Pelanggaran Luring:</strong>
              {MASTA_OFFICIAL_RULES.sanctions.luring}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
