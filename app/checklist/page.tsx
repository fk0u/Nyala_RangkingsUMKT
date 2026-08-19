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
import { useToast } from "@/context/ToastContext";

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [checkedState, setCheckedState] = useState<{ [id: string]: boolean }>({});
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [newItemTitle, setNewItemTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem["category"]>("Dokumen & Identitas");
  const [celebrated, setCelebrated] = useState(false);
  const toast = useToast();

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
      toast.nyala("Selamat! Seluruh persiapan MASTA-mu telah lengkap 100%! 🔥🎉", "Luar Biasa!");
    } else if (progressPercent < 100) {
      setCelebrated(false);
    }
  }, [progressPercent, totalCount, celebrated, toast]);

  const handleToggleItem = (id: string, title: string) => {
    const nextState = !checkedState[id];
    const updated = {
      ...checkedState,
      [id]: nextState,
    };
    setCheckedState(updated);
    localStorage.setItem("nyala_checklist", JSON.stringify(updated));

    if (nextState) {
      toast.success(`"${title.slice(0, 28)}..." selesai!`, "Item Dicentang");
    }
  };

  const handleResetChecklist = () => {
    if (confirm("Reset semua centang persiapan?")) {
      setCheckedState({});
      localStorage.setItem("nyala_checklist", JSON.stringify({}));
      setCelebrated(false);
      toast.info("Centang persiapan berhasil di-reset.", "Reset");
    }
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: newItemCategory,
      title: newItemTitle.trim(),
      description: "Catatan perlengkapan kustom tambahan.",
      required: false,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    const customOnly = updatedItems.filter((it) => it.id.startsWith("custom-"));
    localStorage.setItem("nyala_custom_checklist", JSON.stringify(customOnly));

    setNewItemTitle("");
    setShowAddForm(false);
    toast.success(`Item "${newItem.title.slice(0, 24)}" berhasil ditambahkan!`, "Item Baru");
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
    toast.info("Item kustom dihapus.", "Dihapus");
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
          Checklist Persiapan MASTA UMKT 2026
        </h1>
        <p className="text-sm sm:text-base text-navy-600 dark:text-navy-300">
          Centang setiap perlengkapan dan dokumen wajib agar kamu siap 100% menghadapi seluruh rangkaian Masa Ta’aruf.
        </p>
      </div>

      {/* Progress Card with Mascot */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-navy-200/60 dark:border-navy-800 shadow-xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          
          <div className="sm:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-nyala-600 dark:text-nyala-400">
                  Status Kelengkapan
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white">
                  {completedCount} dari {totalCount} Item Terpenuhi
                </h3>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-nyala-600 dark:text-nyala-400">
                {progressPercent}%
              </span>
            </div>

            <ProgressBar progress={progressPercent} size="lg" showPercentage={false} />

            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
              {progressPercent === 100
                ? "Hebat! Semua perlengkapan resmi dan berkas telah siap. Kamu siap menjalani MASTA UMKT 2026 dengan percaya diri!"
                : progressPercent >= 50
                ? "Bagus sekali! Lebih dari separuh perlengkapan sudah siap. Lanjutkan mencentang item lainnya ya!"
                : "Ayo mulai periksa dan siapkan berkas serta perlengkapanmu dari sekarang."}
            </p>
          </div>

          <div className="sm:col-span-4 flex justify-center sm:justify-end">
            <MascotFlame 
              size="lg" 
              mood={progressPercent === 100 ? "cheering" : progressPercent >= 50 ? "excited" : "happy"} 
            />
          </div>

        </div>
      </div>

      {/* Action Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap text-xs px-3.5 py-2 rounded-xl font-bold transition-all ${
                  isSelected
                    ? "bg-nyala-500 text-white shadow-fire scale-[1.02]"
                    : "bg-white dark:bg-navy-800 text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-700 border border-navy-200/50 dark:border-navy-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Buttons: Add Item & Reset */}
        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 dark:bg-navy-800 hover:bg-nyala-500 text-white text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Catatan</span>
          </button>

          <button
            onClick={handleResetChecklist}
            className="p-2 rounded-xl bg-white dark:bg-navy-800 border border-navy-200/60 dark:border-navy-700 text-navy-500 hover:text-rose-500 hover:border-rose-300 transition-colors"
            title="Reset Centang"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Add Custom Item Modal / Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddNewItem}
            className="p-5 rounded-3xl glass-card border border-amber-200 dark:border-navy-700 space-y-4 shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-navy-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-nyala-500" />
                <span>Tambah Perlengkapan Khusus</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-navy-400 hover:text-navy-700"
              >
                Batal
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder="Misal: Obat pribadi / Vitamin / Powerbank..."
                className="sm:col-span-2 bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-700 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-nyala-500 outline-none text-navy-900 dark:text-white"
                autoFocus
              />
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as any)}
                className="bg-white dark:bg-navy-900 border border-navy-200 dark:border-navy-700 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-nyala-500 outline-none text-navy-900 dark:text-white"
              >
                <option value="Dokumen & Identitas">Dokumen & Identitas</option>
                <option value="Perangkat & Jaringan">Perangkat & Jaringan</option>
                <option value="Pakaian & Atribut">Pakaian & Atribut</option>
                <option value="Kesehatan & Mental">Kesehatan & Mental</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!newItemTitle.trim()}
              className="px-4 py-2 rounded-xl bg-nyala-500 hover:bg-nyala-600 disabled:opacity-50 text-white font-bold text-xs shadow-fire transition-all"
            >
              Simpan Item
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Items List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredItems.map((item) => {
            const isChecked = !!checkedState[item.id];
            const Icon = getCategoryIcon(item.category);
            const isCustom = item.id.startsWith("custom-");

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => handleToggleItem(item.id, item.title)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 group ${
                  isChecked
                    ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300/80 dark:border-emerald-800/60 shadow-xs"
                    : "glass-card border-navy-200/60 dark:border-navy-800 hover:border-nyala-400/80"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex-shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-5 h-5 text-navy-300 dark:text-navy-600 group-hover:text-nyala-500 transition-colors" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={`text-sm sm:text-base font-bold transition-all ${
                          isChecked
                            ? "line-through text-navy-400 dark:text-navy-500"
                            : "text-navy-900 dark:text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                      {item.required && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400">
                          Wajib
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-navy-400 dark:text-navy-500 flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        <span>{item.category}</span>
                      </span>
                    </div>

                    <p
                      className={`text-xs leading-relaxed ${
                        isChecked
                          ? "text-navy-400 dark:text-navy-500"
                          : "text-navy-600 dark:text-navy-300"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                {isCustom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCustomItem(item.id);
                    }}
                    className="opacity-40 hover:opacity-100 p-1.5 text-navy-400 hover:text-rose-500 transition-opacity"
                    title="Hapus Catatan Kustom"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Verified Official Links Banner */}
      <BacklinkBanner />

    </div>
  );
}
