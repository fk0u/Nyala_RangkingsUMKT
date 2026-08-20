"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Sparkle, 
  GraduationCap, 
  IdentificationCard, 
  Users, 
  Sun, 
  Moon, 
  Check, 
  Compass, 
  Trash, 
  Headset, 
  FloppyDisk,
  ArrowSquareOut
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood } from "@/components/MascotFlame";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import AdminHelpModal from "@/components/AdminHelpModal";

const PRODI_OPTIONS = [
  "S1 Teknik Informatika",
  "S1 Sistem Informasi",
  "S1 Teknik Mesin",
  "S1 Teknik Sipil",
  "S1 Farmasi",
  "S1 Manajemen",
  "S1 Psikologi",
  "S1 Ilmu Hukum",
  "S1 Ilmu Komunikasi",
  "Fakultas Lainnya",
];

const GUGUS_OPTIONS = Array.from({ length: 20 }, (_, i) => `Gugus ${String(i + 1).padStart(2, "0")}`);

const MOOD_CHOICES: { mood: MascotMood; label: string }[] = [
  { mood: "excited", label: "Semangat" },
  { mood: "coding", label: "Fokus TI" },
  { mood: "studying", label: "Belajar" },
  { mood: "cheering", label: "Gembira" },
  { mood: "happy", label: "Santai" },
];

export default function MobileProfilePage() {
  const { theme, setThemeMode } = useTheme();
  const toast = useToast();

  const [name, setName] = useState("Mahasiswa Baru UMKT");
  const [nim, setNim] = useState("2611102441001");
  const [prodi, setProdi] = useState("S1 Teknik Informatika");
  const [gugus, setGugus] = useState("Gugus 04");
  const [mascotMood, setMascotMood] = useState<MascotMood>("excited");
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [checklistPercent, setChecklistPercent] = useState(0);
  const [healthScore, setHealthScore] = useState(85);

  useEffect(() => {
    // Load profile from localStorage
    const saved = localStorage.getItem("nyala_user_profile_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.nim) setNim(parsed.nim);
        if (parsed.prodi) setProdi(parsed.prodi);
        if (parsed.gugus) setGugus(parsed.gugus);
        if (parsed.mascotMood) setMascotMood(parsed.mascotMood);
      } catch (e) {
        console.error(e);
      }
    } else {
      const savedProdi = localStorage.getItem("nyala_user_prodi");
      if (savedProdi) setProdi(savedProdi);
    }

    const savedChecklist = localStorage.getItem("nyala_checklist");
    if (savedChecklist) {
      try {
        const parsed = JSON.parse(savedChecklist);
        const count = Object.values(parsed).filter(Boolean).length;
        setChecklistPercent(Math.round((count / 11) * 100));
      } catch (e) {
        console.error(e);
      }
    }

    const savedHealth = localStorage.getItem("nyala_health_logs");
    if (savedHealth) {
      try {
        const parsed = JSON.parse(savedHealth);
        if (parsed.length > 0 && parsed[0].score) {
          setHealthScore(parsed[0].score);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const profileData = {
      name: name.trim() || "Mahasiswa Baru UMKT",
      nim: nim.trim() || "2611102441001",
      prodi,
      gugus,
      mascotMood,
    };
    localStorage.setItem("nyala_user_profile_v1", JSON.stringify(profileData));
    localStorage.setItem("nyala_user_prodi", prodi);
    toast.success("Profil mahasiswa berhasil diperbarui!", "Tersimpan");
  };

  const handleReplayOnboarding = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-nyala-onboarding"));
    }
  };

  const handleResetData = () => {
    if (confirm("Apakah Anda yakin ingin mengatur ulang data checklist dan riwayat kesehatan lokal?")) {
      localStorage.removeItem("nyala_checklist");
      localStorage.removeItem("nyala_health_logs");
      localStorage.removeItem("nyala_mood_history");
      setChecklistPercent(0);
      setHealthScore(0);
      toast.nyala("Data lokal berhasil dibersihkan.", "Reset Selesai");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white">
          Profil & Pengaturan Mahasiswa
        </h1>
        <p className="text-xs text-navy-600 dark:text-navy-300">
          Personalisasi identitas, program studi, dan preferensi aplikasi Nyala.
        </p>
      </div>

      {/* ── 1. AVATAR & MASCOT CARD ── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-4">
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-nyala-600 to-amber-500 p-1 flex items-center justify-center shadow-lg shadow-nyala-500/20 flex-shrink-0">
            <div className="w-full h-full rounded-[20px] bg-white dark:bg-[#0A0F24] flex items-center justify-center">
              <MascotFlame size="md" mood={mascotMood} className="w-10 h-10" />
            </div>
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-black text-navy-950 dark:text-white truncate">
              {name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-navy-500 dark:text-navy-400 font-mono">
              <span>{nim}</span>
              <span>•</span>
              <span className="text-nyala-600 dark:text-nyala-400 font-bold">{gugus}</span>
            </div>
          </div>
        </div>

        {/* Mascot Mood Selector */}
        <div className="space-y-2 pt-2 border-t border-navy-100 dark:border-navy-800">
          <label className="text-[11px] font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wider block">
            Gaya Maskot Nyala:
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {MOOD_CHOICES.map((m) => {
              const isSelected = mascotMood === m.mood;
              return (
                <button
                  key={m.mood}
                  type="button"
                  onClick={() => setMascotMood(m.mood)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    isSelected
                      ? "bg-nyala-600 text-white shadow-sm"
                      : "bg-navy-50 dark:bg-navy-950 text-navy-700 dark:text-navy-300 border border-navy-100 dark:border-navy-800"
                  }`}
                >
                  <span className="text-[10px] truncate">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── 2. STATS OVERVIEW CARDS ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 space-y-1">
          <span className="text-[10px] text-navy-500 dark:text-navy-400 uppercase tracking-wider font-bold block">Checklist Berkas</span>
          <span className="text-xl font-black font-mono text-nyala-600 dark:text-nyala-400">{checklistPercent}%</span>
          <span className="text-[10px] text-navy-400 block">Kesiapan Berkas</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 space-y-1">
          <span className="text-[10px] text-navy-500 dark:text-navy-400 uppercase tracking-wider font-bold block">Skor Stamina</span>
          <span className="text-xl font-black font-mono text-emerald-500">{healthScore}%</span>
          <span className="text-[10px] text-navy-400 block">Kondisi Fisik/Mental</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-navy-500 dark:text-navy-400 uppercase tracking-wider font-bold block">Angkatan Kuliah</span>
          <span className="text-xl font-black font-mono text-amber-500">2026</span>
          <span className="text-[10px] text-navy-400 block">MABA UMKT</span>
        </div>
      </div>

      {/* ── 3. EDIT PROFILE FORM ── */}
      <form onSubmit={handleSaveProfile} className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-4">
        
        <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-wider">
          Data Identitas Mahasiswa
        </h3>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy-700 dark:text-navy-300">Nama Lengkap:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Muhammad Rizky"
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs text-navy-950 dark:text-white outline-none focus:border-nyala-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-700 dark:text-navy-300">NIM / Nomor Registrasi:</label>
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="Contoh: 2611102441001"
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs font-mono text-navy-950 dark:text-white outline-none focus:border-nyala-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-navy-700 dark:text-navy-300">Gugus MASTA:</label>
              <select
                value={gugus}
                onChange={(e) => setGugus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs font-bold text-navy-950 dark:text-white outline-none focus:border-nyala-500"
              >
                {GUGUS_OPTIONS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-navy-700 dark:text-navy-300">Program Studi:</label>
            <select
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-xs font-bold text-navy-950 dark:text-white outline-none focus:border-nyala-500"
            >
              {PRODI_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-nyala-600 hover:bg-nyala-500 text-white text-xs font-black shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FloppyDisk weight="bold" className="w-4 h-4" />
          <span>Simpan Perubahan Profil</span>
        </button>

      </form>

      {/* ── 4. THEME & APP PREFERENCES ── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-4">
        
        <h3 className="text-sm font-black text-navy-950 dark:text-white uppercase tracking-wider">
          Tema & Pengaturan Aplikasi
        </h3>

        {/* Light / Dark Mode Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-navy-700 dark:text-navy-300">Mode Tampilan:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setThemeMode("light")}
              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-nyala-600 text-white shadow-sm border-nyala-600"
                  : "bg-navy-50 dark:bg-navy-950 text-navy-700 dark:text-navy-300 border-navy-200 dark:border-navy-800"
              }`}
            >
              <Sun weight="fill" className="w-4 h-4 text-amber-400" />
              <span>Light Mode (Default)</span>
            </button>

            <button
              type="button"
              onClick={() => setThemeMode("dark")}
              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-nyala-600 text-white shadow-sm border-nyala-600"
                  : "bg-navy-50 dark:bg-navy-950 text-navy-700 dark:text-navy-300 border-navy-200 dark:border-navy-800"
              }`}
            >
              <Moon weight="fill" className="w-4 h-4 text-sky-400" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Quick Utility Actions */}
        <div className="space-y-2 pt-2 border-t border-navy-100 dark:border-navy-800">
          <button
            type="button"
            onClick={handleReplayOnboarding}
            className="w-full p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-navy-800 text-navy-800 dark:text-navy-200 flex items-center justify-between text-xs font-bold hover:border-nyala-500 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Compass weight="bold" className="w-4 h-4 text-nyala-500" />
              <span>Buka Kembali Onboarding Slider</span>
            </div>
            <ArrowSquareOut weight="bold" className="w-4 h-4 text-navy-400" />
          </button>

          <button
            type="button"
            onClick={() => setAdminModalOpen(true)}
            className="w-full p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-between text-xs font-bold hover:bg-emerald-500/20 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Headset weight="bold" className="w-4 h-4 text-emerald-500" />
              <span>Kontak Admin Resmi Gedung C</span>
            </div>
            <ArrowSquareOut weight="bold" className="w-4 h-4 text-emerald-500" />
          </button>

          <button
            type="button"
            onClick={handleResetData}
            className="w-full p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-center justify-between text-xs font-bold hover:bg-rose-500/20 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Trash weight="bold" className="w-4 h-4 text-rose-500" />
              <span>Bersihkan Riwayat Checklist & Mood</span>
            </div>
            <span className="text-[10px] font-mono text-rose-400">Reset</span>
          </button>
        </div>

      </div>

      <AdminHelpModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

    </div>
  );
}
