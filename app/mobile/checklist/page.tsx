"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  CheckSquare, 
  Check, 
  Plus, 
  ArrowCounterClockwise, 
  Trash,
  Funnel
} from "@phosphor-icons/react";
import ProgressBar from "@/components/ProgressBar";
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

  const categories = ["Semua", "Dokumen & Identitas", "Pakaian & Atribut", "Perangkat & Jaringan", "Kesehatan & Mental"];

  const filteredItems = items.filter((item) => {
    if (activeCategory === "Semua") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-black text-white">Checklist Berkas & Perlengkapan</h1>
        <p className="text-xs text-navy-300">Pantau kelengkapan dokumen resmi dan atribut orientasi.</p>
      </div>

      {/* Progress Card */}
      <div className="p-5 rounded-3xl bg-[#0E1635] border border-navy-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white">Status Kelengkapan:</span>
          <span className="font-mono font-bold text-nyala-400">{completedCount} dari {totalCount} Selesai ({progressPercent}%)</span>
        </div>
        <ProgressBar progress={progressPercent} size="md" />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-nyala-600 text-white shadow-sm"
                : "bg-[#0E1635] border border-navy-800 text-navy-300 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Stream */}
      <div className="space-y-2">
        {filteredItems.map((item) => {
          const isDone = !!checkedState[item.id];
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer select-none active:scale-98 ${
                isDone
                  ? "bg-emerald-500/10 border-emerald-500/30 text-navy-300"
                  : "bg-[#0E1635] border-navy-800 text-white"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-lg border mt-0.5 flex items-center justify-center transition-colors ${
                  isDone
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "border-navy-600 bg-navy-900"
                }`}
              >
                {isDone && <Check weight="bold" className="w-3.5 h-3.5" />}
              </div>

              <div className="flex-1 space-y-0.5">
                <h4 className={`text-xs font-bold ${isDone ? "line-through text-navy-400" : "text-white"}`}>
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-[11px] text-navy-400 leading-snug">{item.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddItem} className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0E1635] border border-navy-800">
        <input
          type="text"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          placeholder="Tambah persiapan pribadi..."
          className="flex-1 px-3 py-1.5 bg-transparent text-xs text-white placeholder:text-navy-400 outline-none"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-nyala-600 text-white text-xs font-bold active:scale-90 transition-transform cursor-pointer"
        >
          <Plus weight="bold" className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
