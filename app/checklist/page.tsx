"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  CheckSquare, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Plus, 
  RotateCcw, 
  Filter, 
  FileText, 
  Laptop, 
  Shirt, 
  Heart, 
  Trash2,
  Flame,
  AlertCircle
} from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import BacklinkBanner from "@/components/BacklinkBanner";
import MascotFlame from "@/components/MascotFlame";
import { INITIAL_CHECKLIST, ChecklistItem } from "@/lib/masta-data";

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [checkedState, setCheckedState] = useState<{ [id: string]: boolean }>({});
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [newItemTitle, setNewItemTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem["category"]>("Dokumen & Identitas");
  const [celebrated, setCelebrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedCustomItems = localStorage.getItem("nyala_custom_checklist");
    if (savedCustomItems) {
      try {
        const custom: ChecklistItem[] = JSON.parse(savedCustomItems);
        setItems([...INITIAL_CHECKLIST, ...custom]);
      } catch (e) {
        console.error(e);
      }
    }

    const savedChecks = localStorage.getItem("nyala_checklist");
    if (savedChecks) {
      try {
        const parsed = JSON.parse(savedChecks);
        setCheckedState(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const totalCount = items.length;
  const completedCount = Object.keys(checkedState).filter((id) => checkedState[id]).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Trigger Confetti upon 100% completion
  useEffect(() => {
    if (progressPercent === 100 && totalCount > 0 && !celebrated) {
      setCelebrated(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF5A1F", "#FFA885", "#FDBA74", "#0F172A", "#10B981"],
      });
    } else if (progressPercent < 100) {
      setCelebrated(false);
    }
  }, [progressPercent, totalCount, celebrated]);

  const handleToggleItem = (id: string) => {
    const updated = {
      ...checkedState,
      [id]: !checkedState[id],
    };
    setCheckedState(updated);
    localStorage.setItem("nyala_checklist", JSON.stringify(updated));
  };

  const handleResetChecklist = () => {
    if (confirm("Reset semua centang persiapan?")) {
      setCheckedState({});
      localStorage.setItem("nyala_checklist", JSON.stringify({}));
      setCelebrated(false);
    }
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: newItemCategory,
      title: newItemTitle.trim(),
      description: "Item catatan kustom yang kamu tambahkan sendiri.",
      required: false,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    const customOnly = updatedItems.filter((it) => it.id.startsWith("custom-"));
    localStorage.setItem("nyala_custom_checklist", JSON.stringify(customOnly));

    setNewItemTitle("");
    setShowAddForm(false);
  };

  const handleDeleteCustomItem = (id: string) => {
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);

    const customOnly = updated.filter((it) => it.id.startsWith("custom-"));
    localStorage.setItem("nyala_custom_checklist", JSON.stringify(customOnly));

    const newChecked = { ...checkedState };
    delete newChecked[id];
    setCheckedState(newChecked);
    localStorage.setItem("nyala_checklist", JSON.stringify(newChecked));
  };

  const categories = [
    "Semua",
    "Dokumen & Identitas",
    "Perangkat & Jaringan",
    "Pakaian & Atribut",
    "Kesehatan & Mental",
  ];

  const filteredItems = activeCategory === "Semua"
    ? items
    : items.filter((it) => it.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Dokumen & Identitas": return FileText;
      case "Perangkat & Jaringan": return Laptop;
      case "Pakaian & Atribut": return Shirt;
      case "Kesehatan & Mental": return Heart;
      default: return CheckSquare;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <CheckSquare className="w-4 h-4" />
          <span>Interactive Readiness Tracker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
          Checklist Persiapan MASTA UMKT
        </h1>
        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300">
          Pastikan semua syarat administrasi, pakaian resmi, perangkat Zoom, dan kesiapan diri lengkap sebelum hari H.
        </p>
      </div>

      {/* Progress & Summary Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-navy-200/60 dark:border-navy-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
                Status Kesiapan Bawaan
              </span>
              {progressPercent === 100 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                  Lengkap 100%! 🎉
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white">
              {completedCount} dari {totalCount} Item Selesai
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 dark:bg-navy-700 hover:bg-nyala-500 text-white text-xs font-semibold transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Item Sendiri</span>
            </button>
            <button
              onClick={handleResetChecklist}
              className="p-2 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-navy-600 dark:text-navy-300 hover:text-rose-600 transition-colors"
              title="Reset checklist"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <ProgressBar progress={progressPercent} size="lg" />

        {progressPercent === 100 && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <span>Keren banget! Semua persiapan MASTA 2026 kamu sudah lengkap 100%. Selamat mengikuti masa orientasi! 🔥</span>
          </div>
        )}
      </div>

      {/* Add Custom Item Modal / Dropdown */}
      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddNewItem}
            className="glass-card rounded-3xl p-5 sm:p-6 border border-nyala-500/30 space-y-4 shadow-lg overflow-hidden"
          >
            <h3 className="text-sm font-bold text-navy-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-nyala-500" />
              <span>Tambah Perlengkapan Pribadi:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder="Contoh: Powerbank cadangan / Catatan gugus"
                className="sm:col-span-2 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-nyala-500 focus:outline-none"
              />
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as any)}
                className="bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-nyala-500 focus:outline-none"
              >
                <option value="Dokumen & Identitas">Dokumen & Identitas</option>
                <option value="Perangkat & Jaringan">Perangkat & Jaringan</option>
                <option value="Pakaian & Atribut">Pakaian & Atribut</option>
                <option value="Kesehatan & Mental">Kesehatan & Mental</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-navy-600 dark:text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-nyala-500 text-white text-xs font-bold shadow-fire hover:bg-nyala-600"
              >
                Simpan Item
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Filter Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Filter className="w-4 h-4 text-navy-400 flex-shrink-0 ml-1" />
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? "bg-navy-900 dark:bg-nyala-500 text-white shadow-sm"
                  : "bg-white/80 dark:bg-navy-800/80 text-navy-600 dark:text-navy-300 border border-navy-200/60 dark:border-navy-700 hover:border-nyala-400"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Checklist Items List */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {filteredItems.map((item) => {
            const isChecked = !!checkedState[item.id];
            const isCustom = item.id.startsWith("custom-");
            const CatIcon = getCategoryIcon(item.category);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleToggleItem(item.id)}
                className={`p-4 sm:p-5 rounded-2xl border cursor-pointer select-none transition-all flex items-start justify-between gap-3.5 ${
                  isChecked
                    ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500/40"
                    : "glass-card border-navy-200/60 dark:border-navy-800 hover:border-nyala-400"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 transition-colors flex-shrink-0 ${
                      isChecked
                        ? "bg-emerald-500 text-white shadow-xs"
                        : "border-2 border-navy-300 dark:border-navy-600"
                    }`}
                  >
                    {isChecked ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 opacity-0" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={`text-sm font-bold leading-tight ${
                          isChecked
                            ? "line-through text-navy-400 dark:text-navy-500"
                            : "text-navy-900 dark:text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                      {item.required && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                          Wajib
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-navy-500 dark:text-navy-400 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-navy-400 dark:text-navy-500 pt-0.5">
                      <CatIcon className="w-3.5 h-3.5 text-nyala-500" />
                      <span>{item.category}</span>
                    </div>
                  </div>
                </div>

                {isCustom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCustomItem(item.id);
                    }}
                    className="p-1.5 rounded-lg text-navy-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Hapus item kustom"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <BacklinkBanner compact />

    </div>
  );
}
