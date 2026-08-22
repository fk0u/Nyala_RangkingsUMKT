"use client";

import React, { useState } from "react";
import { 
  CalendarCheck, 
  Sparkle, 
  MapPin, 
  Clock, 
  TShirt, 
  WarningCircle, 
  CaretRight,
  Info,
  CheckCircle,
  Users
} from "@phosphor-icons/react";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import DuolingoSegmentedTabs from "@/components/flutter/DuolingoSegmentedTabs";
import FlutterBottomSheet from "@/components/flutter/FlutterBottomSheet";
import { 
  MASTA_WAVES_RUNDOWN_2026, 
  OFFICIAL_MASTA_SCHEDULE_2026,
  MASTA_OFFICIAL_RULES,
  MastaWave 
} from "@/lib/masta-data";

export default function MobileJadwalPage() {
  const [activeTab, setActiveTab] = useState<string>("waves");
  const [selectedWave, setSelectedWave] = useState<number>(1);
  const [selectedScheduleDetail, setSelectedScheduleDetail] = useState<any | null>(null);

  const JADWAL_TABS = [
    { id: "waves", label: "MASTA IMM", icon: CalendarCheck },
    { id: "full-schedule", label: "Semua Agenda", icon: Clock },
    { id: "dresscode", label: "Pakaian", icon: TShirt },
    { id: "sanksi", label: "Tata Tertib", icon: WarningCircle },
  ];

  const activeWaveData = MASTA_WAVES_RUNDOWN_2026.find((w) => w.waveNumber === selectedWave);

  return (
    <div className="space-y-5">
      
      {/* ── 1. HEADER ── */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
          Jadwal & Rundown Kegiatan MABA
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Rangkaian resmi MASTA Universitas, Fakultas, IMM 3 Gelombang, dan UKM Expo 2026.
        </p>
      </div>

      {/* ── 2. DUOLINGO 3D SEGMENTED TABS (STRICTLY NO PILL CAPSULE) ── */}
      <DuolingoSegmentedTabs
        tabs={JADWAL_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        gridCols={4}
      />

      {/* ── 3. TAB 1: 3 GELOMBANG IMM (WAVE SELECTOR + RUNDOWN) ── */}
      {activeTab === "waves" && (
        <div className="space-y-4">
          
          {/* Chunky 3D Wave Selector Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((waveNum) => {
              const isSelected = selectedWave === waveNum;
              const waveData = MASTA_WAVES_RUNDOWN_2026.find((w) => w.waveNumber === waveNum);
              return (
                <button
                  key={waveNum}
                  onClick={() => setSelectedWave(waveNum)}
                  className={`p-3 rounded-2xl text-left border-2 border-b-4 transition-all active:border-b-2 active:translate-y-0.5 cursor-pointer ${
                    isSelected
                      ? "bg-nyala-500 text-white border-nyala-600 border-b-nyala-800 shadow-sm"
                      : "bg-white dark:bg-[#0F172A] text-navy-950 dark:text-white border-slate-200 dark:border-slate-800 border-b-slate-300 dark:border-b-slate-900"
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-80">
                    Gelombang {waveNum}
                  </div>
                  <div className="text-xs font-black truncate mt-0.5">
                    {waveData?.dayName || `Gel. ${waveNum}`}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Wave Card (Duolingo 3D Card) */}
          {activeWaveData && (
            <DuolingoCard variant="surface" padding="md" className="space-y-4">
              
              {/* Header Info */}
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-nyala-50 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400 uppercase">
                    Gelombang {activeWaveData.waveNumber} • {activeWaveData.date}
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-navy-950 dark:text-white mt-1">
                    {activeWaveData.subTotalNotes}
                  </h2>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-500 block">
                    {activeWaveData.totalKuota} Mhs
                  </span>
                  <span className="text-[10px] text-slate-400">Total Kuota</span>
                </div>
              </div>

              {/* Rundown Timeline List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Rundown Sesi Kegiatan:
                </span>
                
                <div className="space-y-2">
                  {activeWaveData.rundown.map((r, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200/80 dark:border-slate-700/80 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="font-black text-navy-950 dark:text-white text-xs sm:text-sm">
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
            </DuolingoCard>
          )}
        </div>
      )}

      {/* ── 4. TAB 2: RANGKAIAN LENGKAP MASTA ── */}
      {activeTab === "full-schedule" && (
        <div className="space-y-2.5">
          {OFFICIAL_MASTA_SCHEDULE_2026.map((item) => (
            <div
              key={item.no}
              onClick={() => setSelectedScheduleDetail(item)}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-center justify-between gap-3 text-xs cursor-pointer active:border-b-2 active:translate-y-0.5 transition-all select-none"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-nyala-500">
                  {item.dayDate} • {item.locationType}
                </span>
                <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm">
                  {item.activity}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-slate-400">
                  {item.time}
                </span>
                <CaretRight weight="bold" className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 5. TAB 3: ATURAN PAKAIAN & DRESSCODE ── */}
      {activeTab === "dresscode" && (
        <div className="space-y-4">
          <DuolingoCard variant="surface" padding="md" className="space-y-3">
            <h3 className="text-xs font-black text-navy-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <TShirt weight="bold" className="w-4 h-4 text-nyala-500" />
              <span>Ketentuan Seragam Resmi MASTA</span>
            </h3>
            
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700">
                <strong className="text-navy-950 dark:text-white block mb-1">👔 Sesi Pagi (Luring):</strong>
                Kemeja putih lengan panjang polos, celana/rok kain hitam formal (bukan jeans), jilbab putih bagi muslimah, sepatu bertali gelap, dan kartu tanda peserta MASTA.
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700">
                <strong className="text-navy-950 dark:text-white block mb-1">🌙 Sesi Malam (Daring Zoom):</strong>
                Pakaian sopan rapi berkerah, on-camera Zoom selama sesi berlangsung, dan pencahayaan memadai.
              </div>
            </div>
          </DuolingoCard>
        </div>
      )}

      {/* ── 6. TAB 4: SANKSI & TATA TERTIB ── */}
      {activeTab === "sanksi" && (
        <div className="space-y-4">
          <DuolingoCard variant="surface" padding="md" className="border-rose-300 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-black text-xs sm:text-sm">
              <WarningCircle weight="fill" className="w-5 h-5" />
              <span>Sanksi & Pelanggaran Tata Tertib</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Ketidakhadiran tanpa izin resmi panitia berkonsekuensi pada penangguhan sertifikat orientasi kampus yang menjadi syarat wajib skripsi.
            </p>
          </DuolingoCard>
        </div>
      )}

      {/* ── 7. BOTTOM SHEET DETAIL RANGKAIAN ── */}
      <FlutterBottomSheet
        isOpen={!!selectedScheduleDetail}
        onClose={() => setSelectedScheduleDetail(null)}
        title={selectedScheduleDetail?.activity || "Detail Kegiatan"}
        subtitle={selectedScheduleDetail?.dayDate}
      >
        {selectedScheduleDetail && (
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Waktu Pelaksanaan:</span>
                <span className="font-mono font-bold text-nyala-500">{selectedScheduleDetail.time}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Metode / Lokasi:</span>
                <span className="font-bold text-navy-950 dark:text-white">{selectedScheduleDetail.locationType}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Pastikan hadir 15 menit sebelum kegiatan dimulai. Peserta wajib mematuhi seluruh protokol dan tata tertib dari panitia pelaksana kegiatan.
            </p>
          </div>
        )}
      </FlutterBottomSheet>

    </div>
  );
}
