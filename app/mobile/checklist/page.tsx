"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  CheckSquare, 
  Check, 
  Plus, 
  ArrowCounterClockwise, 
  Trash,
  CheckCircle,
  FileText,
  TShirt,
  Laptop,
  Heartbeat,
  Star
} from "@phosphor-icons/react";
import ProgressBar from "@/components/ProgressBar";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import DuolingoButton from "@/components/flutter/DuolingoButton";
import DuolingoSegmentedTabs from "@/components/flutter/DuolingoSegmentedTabs";
import { INITIAL_CHECKLIST, ChecklistItem } from "@/lib/masta-data";
import { useToast } from "@/context/ToastContext";
import { dispatchGamificationUpdate } from "@/lib/gamification";

export default function MobileChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [checkedState, setCheckedState] = useState<{ [id: string]: boolean }>({});
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [newItemTitle, setNewItemTitle] = useState("");
  const toast = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("nyala_checklist");
    if (saved) {
      try {
        setCheckedState(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const totalCount = items.length;
  const completedCount = Object.keys(checkedState).filter((id) => checkedState[id]).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggle = (id: string) => {
    const next = { ...checkedState, [id]: !checkedState[id] };
    setCheckedState(next);
    localStorage.setItem("nyala_checklist", JSON.stringify(next));
    dispatchGamificationUpdate();

    if (next[id]) {
      const allDone = items.every((item) => next[item.id]);
      if (allDone) {
        confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
        toast.nyala("Seluruh persiapan MASTA Anda telah lengkap 100%!", "Lengkap!");
      }
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom_${Date.now()}`,
      category: "Perangkat & Jaringan",
      title: newItemTitle.trim(),
      description: "Catatan perlengkapan tambahan pribadi",
      required: false,
    };

    setItems([...items, newItem]);
    setNewItemTitle("");
    toast.success("Item checklist berhasil ditambahkan!");
  };

  const handleReset = () => {
    if (confirm("Reset seluruh checklist ke awal?")) {
      setCheckedState({});
      localStorage.removeItem("nyala_checklist");
      toast.info("Checklist telah direset ke awal");
    }
  };

  const CATEGORY_TABS = [
    { id: "Semua", label: "Semua" },
    { id: "Dokumen & Identitas", label: "Dokumen" },
    { id: "Pakaian & Atribut", label: "Pakaian" },
    { id: "Perangkat & Jaringan", label: "Perangkat" },
  ];

  const filteredItems = items.filter(
    (it) => activeCategory === "Semua" || it.category === activeCategory
  );

  return (
    <div className="space-y-5">
      
      {/* ── 1. HEADER ── */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
          Checklist Berkas & Kelengkapan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Daftar 11 berkas & perangkat wajib Orientasi MABA 2026.
        </p>
      </div>

      {/* ── 2. GAMIFIED PROGRESS GAUGE (DUOLINGO 3D CARD) ── */}
      <DuolingoCard variant="surface" padding="md" className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
            Status Kesiapan Mahasiswa
          </span>
          <span className="text-xs font-mono font-black text-emerald-500">
            {completedCount} / {totalCount} Selesai
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-3xl sm:text-4xl font-black font-mono text-nyala-500">
            {progressPercent}%
          </div>
          <div className="flex-1">
            <ProgressBar progress={progressPercent} size="md" />
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
          {progressPercent === 100
            ? "🎉 Hebat! Seluruh perlengkapanmu sudah siap 100% untuk orientasi kampus!"
            : "🔥 Lengkapi sisa checklist di bawah agar tidak ada berkas yang tertinggal."}
        </p>

        {/* Eco-Paperless Badge */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-emerald-600 dark:text-emerald-400 font-bold select-none">
          <span className="flex items-center gap-1">
            <span>🌱</span> 100% Paperless MABA Checklist
          </span>
          <span className="font-mono text-[9px] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            Hemat ~{completedCount || 1} Lembar Kertas (SDGs 12)
          </span>
        </div>
      </DuolingoCard>

      {/* ── 3. DUOLINGO 3D SEGMENTED TABS (NO PILL CAPSULE) ── */}
      <DuolingoSegmentedTabs
        tabs={CATEGORY_TABS}
        activeTab={activeCategory}
        onChange={setActiveCategory}
        gridCols={4}
      />

      {/* ── 4. CHECKLIST 3D GAMIFIED ITEMS ── */}
      <div className="space-y-2.5">
        {filteredItems.map((item) => {
          const isChecked = !!checkedState[item.id];
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-3.5 rounded-2xl border-2 border-b-4 flex items-center justify-between gap-3 cursor-pointer select-none active:border-b-2 active:translate-y-0.5 transition-all ${
                isChecked
                  ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900 border-b-emerald-400 dark:border-b-emerald-950"
                  : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 border-b-slate-300 dark:border-b-slate-900"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold flex-shrink-0 transition-colors ${
                    isChecked
                      ? "bg-emerald-500 text-white"
                      : "border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  }`}
                >
                  {isChecked && <Check weight="bold" className="w-4 h-4" />}
                </div>

                <div className="min-w-0">
                  <div
                    className={`text-xs sm:text-sm font-bold truncate ${
                      isChecked
                        ? "text-emerald-900 dark:text-emerald-300 line-through opacity-80"
                        : "text-navy-950 dark:text-white"
                    }`}
                  >
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {item.description}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    item.required
                      ? "bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  {item.required ? "Wajib" : "Opsional"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 5. ADD CUSTOM ITEM FORM ── */}
      <form onSubmit={handleAddItem} className="flex gap-2 pt-2">
        <input
          type="text"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          placeholder="Tambah catatan perlengkapan sendiri..."
          className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 text-xs text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-nyala-500"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-2xl duo-btn-primary text-xs flex items-center gap-1 flex-shrink-0"
        >
          <Plus weight="bold" className="w-4 h-4" />
          <span>Tambah</span>
        </button>
      </form>

      {/* ── 6. RESET BUTTON ── */}
      <div className="pt-2 text-center">
        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-rose-500 font-bold inline-flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowCounterClockwise weight="bold" className="w-3.5 h-3.5" />
          <span>Reset Status Centang Checklist</span>
        </button>
      </div>

    </div>
  );
}
