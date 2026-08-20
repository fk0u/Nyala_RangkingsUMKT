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
        <h1 className="text-xl font-black text-white">Jadwal & Rundown MASTA</h1>
        <p className="text-xs text-navy-300">Rangkaian resmi 3 Gelombang IMM, Daring Zoom & Puncak Milad.</p>
      </div>

      {/* Countdown Widget */}
      <CountdownTimer />

      {/* Segmented Controller Tab Bar */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0E1635] border border-navy-800 overflow-x-auto scrollbar-none">
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
                  : "text-navy-400 hover:text-white"
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
                    ? "bg-nyala-600/20 border-nyala-500 text-white shadow-sm"
                    : "bg-[#0E1635] border-navy-800 text-navy-400"
                }`}
              >
                <span className="text-[10px] font-bold block uppercase tracking-wider">Gelombang</span>
                <span className="text-base font-black font-mono">Ke-{w}</span>
              </button>
            ))}
          </div>

          {activeWaveData && (
            <div className="p-5 rounded-3xl bg-[#0E1635] border border-navy-800 space-y-4">
              <div className="border-b border-navy-800 pb-3 space-y-1">
                <span className="text-[10px] font-mono text-nyala-400 font-bold uppercase">{activeWaveData.date}</span>
                <h3 className="text-base font-black text-white">{activeWaveData.waveName}: {activeWaveData.subTotalNotes}</h3>
                <span className="text-xs text-navy-400 font-mono">Total Kuota: {activeWaveData.totalKuota} Mahasiswa</span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-navy-400 uppercase tracking-wider block">Rundown Kegiatan:</span>
                <div className="space-y-1.5">
                  {activeWaveData.rundown.map((r, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-navy-900/80 border border-navy-800 flex items-start justify-between gap-2 text-xs">
                      <div>
                        <span className="font-mono font-bold text-nyala-400 block text-[10px]">{r.time}</span>
                        <h5 className="font-bold text-white text-xs">{r.activity}</h5>
                        <p className="text-[10px] text-navy-400">{r.notes}</p>
                      </div>
                      {r.kuota && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-navy-950 border border-navy-800 text-navy-300 whitespace-nowrap">
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
            <div key={item.no} className="p-4 rounded-2xl bg-[#0E1635] border border-navy-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-nyala-400">{item.dayDate}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-navy-900 text-navy-300 border border-navy-800 font-mono">
                  {item.category}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{item.activity}</h4>
              {item.time && (
                <div className="flex items-center gap-1.5 text-xs text-navy-400 font-mono">
                  <Clock weight="bold" className="w-3.5 h-3.5 text-nyala-500" />
                  <span>{item.time}</span>
                </div>
              )}
              {item.description && (
                <p className="text-xs text-navy-400 leading-snug">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SEGMENT 3: DRESSCODE */}
      {activeSegment === "dresscode" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#0E1635] border border-navy-800 space-y-2">
            <div className="flex items-center gap-2">
              <TShirt weight="bold" className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase">{MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session1.title}</h4>
            </div>
            <p className="text-xs text-navy-300">
              {MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session1.details}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0E1635] border border-navy-800 space-y-2">
            <div className="flex items-center gap-2">
              <TShirt weight="bold" className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase">{MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session2.title}</h4>
            </div>
            <div className="space-y-1 text-xs text-navy-300">
              <p><strong className="text-white">Pria:</strong> {MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session2.detailsMale}</p>
              <p><strong className="text-white">Wanita:</strong> {MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session2.detailsFemale}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0E1635] border border-navy-800 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">Kerapian Rambut & Grooming</h4>
            <p className="text-xs text-navy-300">
              {MASTA_OFFICIAL_RULES.luringProvisions.grooming.rule}
            </p>
          </div>
        </div>
      )}

      {/* SEGMENT 4: SANKSI */}
      {activeSegment === "sanksi" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#0E1635] border border-navy-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400">
              <WarningOctagon weight="bold" className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase">{MASTA_OFFICIAL_RULES.sanctions.title}</h4>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
              {MASTA_OFFICIAL_RULES.sanctions.warning}
            </div>
            <p className="text-xs text-navy-300 leading-snug">
              <strong className="text-white block pb-1">Pelanggaran Daring:</strong>
              {MASTA_OFFICIAL_RULES.sanctions.daring}
            </p>
            <p className="text-xs text-navy-300 leading-snug pt-1 border-t border-navy-800">
              <strong className="text-white block pb-1">Pelanggaran Luring:</strong>
              {MASTA_OFFICIAL_RULES.sanctions.luring}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
