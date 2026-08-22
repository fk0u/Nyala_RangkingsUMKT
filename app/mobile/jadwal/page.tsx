"use client";

import React, { useState } from "react";
import { 
  CalendarCheck, 
  Users, 
  TShirt, 
  WarningOctagon, 
  Clock, 
  MapPin, 
  CheckCircle,
  Info,
  Calendar,
  Sparkle
} from "@phosphor-icons/react";
import CountdownTimer from "@/components/CountdownTimer";
import FlutterCard from "@/components/flutter/FlutterCard";
import FlutterSegmentedTabs from "@/components/flutter/FlutterSegmentedTabs";
import FlutterListTile from "@/components/flutter/FlutterListTile";
import FlutterBottomSheet from "@/components/flutter/FlutterBottomSheet";
import FlutterChip from "@/components/flutter/FlutterChip";
import { 
  OFFICIAL_MASTA_SCHEDULE_2026, 
  MASTA_WAVES_RUNDOWN_2026, 
  MASTA_OFFICIAL_RULES 
} from "@/lib/masta-data";

export default function MobileJadwalPage() {
  const [activeTab, setActiveTab] = useState<string>("imm");
  const [selectedWave, setSelectedWave] = useState<number>(1);
  const [selectedScheduleItem, setSelectedScheduleItem] = useState<typeof OFFICIAL_MASTA_SCHEDULE_2026[0] | null>(null);

  const activeWaveData = MASTA_WAVES_RUNDOWN_2026.find((w) => w.waveNumber === selectedWave);

  const JADWAL_TABS = [
    { id: "imm", label: "3 Gelombang", icon: Users },
    { id: "timeline", label: "Rangkaian", icon: CalendarCheck },
    { id: "dresscode", label: "Pakaian", icon: TShirt },
    { id: "sanksi", label: "Sanksi", icon: WarningOctagon },
  ];

  return (
    <div className="space-y-5">
      
      {/* ── 1. HEADER & INTRO ── */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
          Jadwal & Rundown MASTA
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Rangkaian resmi 3 Gelombang IMM, Daring Zoom & Puncak Milad 2026.
        </p>
      </div>

      {/* ── 2. COUNTDOWN TIMER WIDGET ── */}
      <CountdownTimer />

      {/* ── 3. FLUTTER SEGMENTED CONTROLLER (Hick's Law 1-Tap Filter) ── */}
      <FlutterSegmentedTabs
        tabs={JADWAL_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* ── 4. TAB 1: 3 GELOMBANG MASTA IMM ── */}
      {activeTab === "imm" && (
        <div className="space-y-4">
          
          {/* Wave Selector Chips */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWave(w)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer active:scale-95 ${
                  selectedWave === w
                    ? "bg-nyala-500/10 border-nyala-500 text-nyala-600 dark:text-nyala-400 shadow-sm font-bold"
                    : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-nyala-300"
                }`}
              >
                <span className="text-[10px] font-bold block uppercase tracking-wider text-slate-400">
                  Gelombang
                </span>
                <span className="text-base font-black font-mono">Ke-{w}</span>
              </button>
            ))}
          </div>

          {activeWaveData && (
            <FlutterCard variant="elevated" className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-nyala-100 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400 uppercase">
                    {activeWaveData.date}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Kuota: {activeWaveData.totalKuota} Mahasiswa
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white">
                  {activeWaveData.waveName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeWaveData.subTotalNotes}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Rundown Sesi Kegiatan:
                </span>
                
                <div className="space-y-2">
                  {activeWaveData.rundown.map((r, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B]/60 border border-slate-200/60 dark:border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="font-bold text-navy-950 dark:text-white text-xs sm:text-sm">
                          {r.activity}
                        </div>
                        {r.notes && (
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {r.notes}
                          </div>
                        )}
                      </div>

                      <div className="flex-shrink-0 text-right space-y-0.5">
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-nyala-600 dark:text-nyala-400 bg-nyala-50 dark:bg-nyala-950/80 px-2 py-0.5 rounded-md text-[11px]">
                          <Clock weight="bold" className="w-3 h-3" />
                          {r.time}
                        </span>
                        {r.kuota && (
                          <div className="text-[10px] text-slate-400 font-mono font-medium">
                            {r.kuota}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FlutterCard>
          )}
        </div>
      )}

      {/* ── 5. TAB 2: RANGKAIAN LENGKAP MASTA ── */}
      {activeTab === "timeline" && (
        <div className="space-y-3">
          {OFFICIAL_MASTA_SCHEDULE_2026.map((item) => (
            <FlutterListTile
              key={item.no}
              leading={
                <div className="w-9 h-9 rounded-2xl bg-nyala-50 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400 font-mono font-black flex items-center justify-center text-sm border border-nyala-200 dark:border-nyala-800">
                  {item.no}
                </div>
              }
              title={item.activity}
              subtitle={
                <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <span className="font-medium">{item.dayDate}</span> • <span>{item.locationType}</span>
                </span>
              }
              badge={item.category}
              badgeColor={item.category.includes("Universitas") ? "blue" : item.category.includes("Puncak") ? "emerald" : "orange"}
              onClick={() => setSelectedScheduleItem(item)}
            />
          ))}
        </div>
      )}

      {/* ── 6. TAB 3: DRESSCODE RESMI (Pagi & Malam) ── */}
      {activeTab === "dresscode" && (
        <div className="space-y-4">
          <FlutterCard variant="elevated" className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <TShirt weight="bold" className="w-5 h-5" />
              <span>Sesi Pagi (06.30 – 11.30 WITA) - UKM EXPO</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session1.details}
            </p>
          </FlutterCard>

          <FlutterCard variant="elevated" className="space-y-3">
            <div className="flex items-center gap-2 text-nyala-600 dark:text-nyala-400 font-bold text-sm">
              <TShirt weight="bold" className="w-5 h-5" />
              <span>Sesi Malam (17.00 – 22.00 WITA) - PUNCAK MILAD</span>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-navy-950 dark:text-white block mb-1">👔 Mahasiswa Laki-laki:</span>
                {MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session2.detailsMale}
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-navy-950 dark:text-white block mb-1">🧕 Mahasiswi Perempuan:</span>
                {MASTA_OFFICIAL_RULES.luringProvisions.dresscode.session2.detailsFemale}
              </div>
            </div>
          </FlutterCard>
        </div>
      )}

      {/* ── 7. TAB 4: SANKSI & TATA TERTIB ── */}
      {activeTab === "sanksi" && (
        <div className="space-y-4">
          <FlutterCard variant="elevated" className="border-rose-300 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <WarningOctagon weight="fill" className="w-5 h-5" />
              <span>Peringatan Sanksi Pelanggaran</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {MASTA_OFFICIAL_RULES.sanctions.warning}
            </p>
          </FlutterCard>

          <FlutterCard variant="outlined" className="space-y-2">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Barang Terlarang di Kampus:
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {MASTA_OFFICIAL_RULES.luringProvisions.prohibitedItems.rule}
            </p>
          </FlutterCard>
        </div>
      )}

      {/* ── 8. BOTTOM SHEET DETAIL JADWAL (Cupertino Sheet) ── */}
      <FlutterBottomSheet
        isOpen={Boolean(selectedScheduleItem)}
        onClose={() => setSelectedScheduleItem(null)}
        title={selectedScheduleItem?.activity}
        subtitle={`${selectedScheduleItem?.dayDate} • ${selectedScheduleItem?.category}`}
      >
        {selectedScheduleItem && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Waktu Sesi:</span>
                <span className="font-mono font-bold text-navy-950 dark:text-white">
                  {selectedScheduleItem.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Lokasi / Platform:</span>
                <span className="font-bold text-navy-950 dark:text-white">
                  {selectedScheduleItem.locationType}
                </span>
              </div>
              {selectedScheduleItem.kuota && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Total Peserta:</span>
                  <span className="font-mono font-bold text-nyala-500">
                    {selectedScheduleItem.kuota}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <h2 className="font-bold text-navy-950 dark:text-white text-xs uppercase tracking-wider">
                Uraian Kegiatan:
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedScheduleItem.description}
              </p>
            </div>
          </div>
        )}
      </FlutterBottomSheet>

    </div>
  );
}
