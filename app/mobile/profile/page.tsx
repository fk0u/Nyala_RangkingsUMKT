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
  ArrowSquareOut,
  PencilSimple,
  SlidersHorizontal,
  CheckCircle,
  Heartbeat,
  Trophy,
  Flame,
  Lightning
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood } from "@/components/MascotFlame";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import DuolingoButton from "@/components/flutter/DuolingoButton";
import FlutterBottomSheet from "@/components/flutter/FlutterBottomSheet";
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
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [checklistPercent, setChecklistPercent] = useState(0);
  const [healthScore, setHealthScore] = useState(85);

  useEffect(() => {
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
    const profile = { name, nim, prodi, gugus, mascotMood };
    localStorage.setItem("nyala_user_profile_v1", JSON.stringify(profile));
    localStorage.setItem("nyala_user_prodi", prodi);
    setEditSheetOpen(false);
    toast.success("Profil mahasiswa berhasil diperbarui!", "Tersimpan");
  };

  const handleResetData = () => {
    if (confirm("Apakah Anda yakin ingin mereset seluruh data lokal aplikasi Nyala?")) {
      localStorage.clear();
      toast.info("Seluruh data lokal telah dibersihkan", "Reset Berhasil");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="space-y-5">
      
      {/* ── 1. GAMIFIED PROFILE AVATAR CARD ── */}
      <DuolingoCard variant="surface" padding="md" className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-nyala-500/10 dark:bg-nyala-950/80 border-2 border-b-4 border-nyala-500/30 border-b-nyala-600/50 flex items-center justify-center p-2">
              <MascotFlame size="sm" mood={mascotMood} className="w-14 h-14" />
            </div>
            <button
              onClick={() => setEditSheetOpen(true)}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full duo-btn-primary flex items-center justify-center shadow-md cursor-pointer"
              title="Edit Profil"
            >
              <PencilSimple weight="bold" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-black text-navy-950 dark:text-white">
            {name}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            NIM: {nim} • {gugus}
          </p>
          <span className="inline-block px-3 py-1 rounded-xl bg-nyala-50 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400 font-black text-xs border border-nyala-200 dark:border-nyala-900">
            {prodi}
          </span>
        </div>

        {/* Gamified Stats Summary */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B] text-center border border-slate-200/80 dark:border-slate-700">
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Streak</span>
            <span className="text-sm font-black font-mono text-amber-500">🔥 3 Hari</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B] text-center border border-slate-200/80 dark:border-slate-700">
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Checklist</span>
            <span className="text-sm font-black font-mono text-emerald-500">{checklistPercent}%</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1E293B] text-center border border-slate-200/80 dark:border-slate-700">
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Kesiapan</span>
            <span className="text-sm font-black font-mono text-nyala-500">{healthScore}%</span>
          </div>
        </div>
      </DuolingoCard>

      {/* ── 2. DUOLINGO 3D SETTINGS TILES ── */}
      <div className="space-y-2.5">
        <span className="text-xs font-black text-slate-400 uppercase tracking-wider block px-1">
          Pengaturan & Bantuan
        </span>

        {/* Edit Biodata Tile */}
        <div
          onClick={() => setEditSheetOpen(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-center justify-between gap-3 text-xs cursor-pointer active:border-b-2 active:translate-y-0.5 transition-all select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-500 flex items-center justify-center">
              <IdentificationCard weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm">
                Ubah Biodata & Gugus
              </h3>
              <p className="text-[10px] text-slate-500">Nama, NIM, Program Studi, & Maskot</p>
            </div>
          </div>
        </div>

        {/* Theme Mode Toggle Tile */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-center justify-between gap-3 text-xs select-none">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-500 flex items-center justify-center">
              {theme === "dark" ? <Moon weight="bold" className="w-5 h-5" /> : <Sun weight="bold" className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm">
                Tema Tampilan
              </h3>
              <p className="text-[10px] text-slate-500">
                Mode saat ini: {theme === "dark" ? "Mode Gelap (Dark)" : "Mode Terang (Light)"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setThemeMode(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1.5 rounded-xl duo-btn-surface text-xs font-bold"
          >
            Ganti
          </button>
        </div>

        {/* Admin Contact Tile */}
        <div
          onClick={() => setAdminModalOpen(true)}
          className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-center justify-between gap-3 text-xs cursor-pointer active:border-b-2 active:translate-y-0.5 transition-all select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-500 flex items-center justify-center">
              <Headset weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm">
                Kontak Admin Resmi Gedung C
              </h3>
              <p className="text-[10px] text-slate-500">Biro Kemahasiswaan & Helpdesk SIKAD UMKT</p>
            </div>
          </div>
        </div>

        {/* Reset App Data Tile */}
        <div
          onClick={handleResetData}
          className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-rose-200 dark:border-rose-900 border-b-4 border-b-rose-300 dark:border-b-rose-950 flex items-center justify-between gap-3 text-xs cursor-pointer active:border-b-2 active:translate-y-0.5 transition-all select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-500 flex items-center justify-center">
              <Trash weight="bold" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
                Reset Data Lokal
              </h3>
              <p className="text-[10px] text-slate-500">Bersihkan checklist, mood history, dan profil</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM SHEET EDIT PROFIL ── */}
      <FlutterBottomSheet
        isOpen={editSheetOpen}
        onClose={() => setEditSheetOpen(false)}
        title="Edit Profil Mahasiswa Baru"
        subtitle="Data tersimpan aman di perangkat lokal Anda"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs sm:text-sm">
          {/* Name Input */}
          <div className="space-y-1">
            <label className="font-bold text-navy-950 dark:text-white">Nama Lengkap:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 text-navy-950 dark:text-white outline-none focus:border-nyala-500"
              required
            />
          </div>

          {/* NIM Input */}
          <div className="space-y-1">
            <label className="font-bold text-navy-950 dark:text-white">Nomor Induk Mahasiswa (NIM):</label>
            <input
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 text-navy-950 dark:text-white outline-none focus:border-nyala-500 font-mono"
              required
            />
          </div>

          {/* Program Studi Selector */}
          <div className="space-y-1">
            <label className="font-bold text-navy-950 dark:text-white">Program Studi:</label>
            <select
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 text-navy-950 dark:text-white outline-none focus:border-nyala-500"
            >
              {PRODI_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Gugus Selector */}
          <div className="space-y-1">
            <label className="font-bold text-navy-950 dark:text-white">Gugus MASTA:</label>
            <select
              value={gugus}
              onChange={(e) => setGugus(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 text-navy-950 dark:text-white outline-none focus:border-nyala-500"
            >
              {GUGUS_OPTIONS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Mascot Mood Picker */}
          <div className="space-y-2">
            <label className="font-bold text-navy-950 dark:text-white">Ekspresi Maskot Favorit:</label>
            <div className="grid grid-cols-5 gap-2">
              {MOOD_CHOICES.map((m) => (
                <button
                  key={m.mood}
                  type="button"
                  onClick={() => setMascotMood(m.mood)}
                  className={`p-2 rounded-xl border-2 border-b-4 flex flex-col items-center gap-1 ${
                    mascotMood === m.mood
                      ? "bg-nyala-500/10 border-nyala-500 border-b-nyala-700 text-nyala-500 font-bold"
                      : "border-slate-200 dark:border-slate-800 border-b-slate-300 dark:border-b-slate-900 text-slate-400"
                  }`}
                >
                  <MascotFlame size="sm" mood={m.mood} className="w-5 h-5" />
                  <span className="text-[9px]">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl duo-btn-primary font-black shadow-md"
          >
            Simpan Perubahan
          </button>
        </form>
      </FlutterBottomSheet>

      {/* Admin Help Modal */}
      <AdminHelpModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

    </div>
  );
}
