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
  Heartbeat
} from "@phosphor-icons/react";
import ProgressBar from "@/components/ProgressBar";
import FlutterCard from "@/components/flutter/FlutterCard";
import FlutterChip from "@/components/flutter/FlutterChip";
import FlutterListTile from "@/components/flutter/FlutterListTile";
import { INITIAL_CHECKLIST, ChecklistItem } from "@/lib/masta-data";
import { useToast } from "@/context/ToastContext";

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
      id: `custom-${Date.now()}`,
      title: newItemTitle.trim(),
      description: "Persiapan tambahan mandiri mahasiswa baru.",
      category: "Dokumen & Identitas",
      required: false,
    };

    const updated = [...items, newItem];
    setItems(updated);
    setNewItemTitle("");
    toast.success("Item persiapan ditambahkan!", "Ditambahkan");
  };

  const categories = [
    { label: "Semua", icon: CheckSquare },
    { label: "Dokumen & Identitas", icon: FileText },
    { label: "Pakaian & Atribut", icon: TShirt },
    { label: "Perangkat & Jaringan", icon: Laptop },
    { label: "Kesehatan & Mental", icon: Heartbeat },
  ];

  const filteredItems = items.filter((item) => {
    if (activeCategory === "Semua") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-5">
      
      {/* ── 1. HEADER ── */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
          Checklist Berkas & Perlengkapan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Pantau kelengkapan dokumen resmi dan atribut orientasi MASTA 2026.
        </p>
      </div>

      {/* ── 2. FLUTTER STYLE READINESS PROGRESS CARD ── */}
      <FlutterCard variant="elevated" className="space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-navy-950 dark:text-white">
            <CheckCircle weight="fill" className="w-5 h-5 text-emerald-500" />
            <span>Kesiapan MABA:</span>
          </div>
          <span className="font-mono font-bold text-nyala-600 dark:text-nyala-400">
            {completedCount} / {totalCount} Selesai ({progressPercent}%)
          </span>
        </div>
        
        <ProgressBar progress={progressPercent} size="md" />

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span>Tersimpan di perangkat lokal</span>
          {progressPercent === 100 && (
            <span className="text-emerald-500 font-bold">✨ Siap 100%!</span>
          )}
        </div>
      </FlutterCard>

      {/* ── 3. FLUTTER CATEGORY CHIPS ── */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Filter Kategori:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <FlutterChip
              key={cat.label}
              label={cat.label}
              icon={cat.icon}
              selected={activeCategory === cat.label}
              onClick={() => setActiveCategory(cat.label)}
            />
          ))}
        </div>
      </div>

      {/* ── 4. CHECKLIST LIST (Flutter ListTile with Custom Checkbox) ── */}
      <div className="space-y-2.5">
        {filteredItems.map((item) => {
          const isChecked = Boolean(checkedState[item.id]);

          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-4 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer select-none active:scale-[0.98] flex items-start gap-3.5 ${
                isChecked
                  ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300/80 dark:border-emerald-900/60 shadow-sm"
                  : "bg-white dark:bg-[#0F172A] border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-nyala-300"
              }`}
            >
              {/* Checkbox Trigger */}
              <div
                className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                  isChecked
                    ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                    : "border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                }`}
              >
                {isChecked && <Check weight="bold" className="w-4 h-4" />}
              </div>

              {/* Title & Description */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs sm:text-sm font-bold leading-snug ${
                      isChecked
                        ? "line-through text-slate-400 dark:text-slate-500"
                        : "text-navy-950 dark:text-white"
                    }`}
                  >
                    {item.title}
                  </span>
                  {item.required && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
                      Wajib
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 5. QUICK ADD CUSTOM ITEM FORM ── */}
      <form
        onSubmit={handleAddItem}
        className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-sm"
      >
        <input
          type="text"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          placeholder="+ Tambah catatan perlengkapan sendiri..."
          className="flex-1 px-3.5 py-2.5 text-xs text-navy-950 dark:text-white bg-transparent placeholder-slate-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!newItemTitle.trim()}
          className="px-4 py-2.5 rounded-xl bg-nyala-500 text-white text-xs font-bold active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 flex-shrink-0"
        >
          <Plus weight="bold" className="w-3.5 h-3.5" />
          <span>Tambah</span>
        </button>
      </form>

    </div>
  );
}
