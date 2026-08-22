"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Sparkle, 
  GraduationCap, 
  IdentificationCard, 
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
  Lightning,
  CheckSquare,
  ShieldCheck
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood } from "@/components/MascotFlame";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import DuolingoButton from "@/components/flutter/DuolingoButton";
import FlutterBottomSheet from "@/components/flutter/FlutterBottomSheet";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import AdminHelpModal from "@/components/AdminHelpModal";
import { 
  calculateRealStreak, 
  calculateRealXp, 
  calculateEcoImpact, 
  EcoImpactState, 
  dispatchGamificationUpdate 
} from "@/lib/gamification";

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
  const [mascotMood, setMascotMood] = useState<MascotMood>("excited");
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [checklistPercent, setChecklistPercent] = useState(0);
  const [checklistCount, setChecklistCount] = useState(0);
  const [streakDays, setStreakDays] = useState(1);
  const [totalXp, setTotalXp] = useState(50);
  const [levelTitle, setLevelTitle] = useState("Level 1 • MABA Pejuang");
  const [ecoImpact, setEcoImpact] = useState<EcoImpactState>({
    paperSavedSheets: 10,
    co2SavedKg: 0.15,
    waterSavedLiters: 3.0,
    sdgsContributed: ["SDG 12", "SDG 13", "SDG 4", "SDG 9"]
  });

  const loadData = () => {
    const saved = localStorage.getItem("nyala_user_profile_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.nim) setNim(parsed.nim);
        if (parsed.prodi) setProdi(parsed.prodi);
        if (parsed.mascotMood) setMascotMood(parsed.mascotMood);
      } catch (e) {
        console.error(e);
      }
    } else {
      const savedProdi = localStorage.getItem("nyala_user_prodi");
      if (savedProdi) setProdi(savedProdi);
    }

    const streak = calculateRealStreak();
    const xpData = calculateRealXp();
    setStreakDays(streak);
    setTotalXp(xpData.totalXp);
    setLevelTitle(xpData.levelTitle);
    setChecklistCount(xpData.checklistCount);
    setChecklistPercent(Math.round((xpData.checklistCount / 11) * 100));
    setEcoImpact(calculateEcoImpact());
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener("nyala-gamification-update", handleUpdate);
    return () => window.removeEventListener("nyala-gamification-update", handleUpdate);
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const profile = { name, nim, prodi, mascotMood };
    localStorage.setItem("nyala_user_profile_v1", JSON.stringify(profile));
    localStorage.setItem("nyala_user_prodi", prodi);
    setEditSheetOpen(false);
    dispatchGamificationUpdate();
    toast.showToast("Profil mahasiswa berhasil diperbarui!", "success");
  };

  const handleResetData = () => {
    if (confirm("Apakah Anda yakin ingin mereset seluruh data lokal aplikasi Nyala?")) {
      localStorage.removeItem("nyala_user_profile_v1");
      localStorage.removeItem("nyala_checklist");
      localStorage.removeItem("nyala_health_logs");
      localStorage.removeItem("nyala_streak_record_v1");
      localStorage.removeItem("nyala_maba_onboarded_v1");
      dispatchGamificationUpdate();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-4">
      
      {/* ── 1. USER PROFILE CARD WITH MASCOT ── */}
      <DuolingoCard variant="surface" padding="lg" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border-2 border-b-4 border-amber-300/40 dark:border-amber-800/40 flex items-center justify-center flex-shrink-0 shadow-sm">
              <MascotFlame size="sm" mood={mascotMood} className="w-12 h-12" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 uppercase border border-amber-200 dark:border-amber-900/50">
                {levelTitle}
              </span>
              <h2 className="text-base font-black text-navy-950 dark:text-white mt-1 leading-snug">
                {name}
              </h2>
              <p className="text-xs text-nyala-600 dark:text-nyala-400 font-bold">
                {prodi}
              </p>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                NIM: {nim}
              </div>
            </div>
          </div>
        </div>

        {/* Real Gamification & Sustainability Eco-Impact Badges */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm flex-shrink-0">
              <Flame weight="fill" className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Streak Harian</div>
              <div className="text-xs font-black font-mono text-navy-950 dark:text-white">{streakDays} Hari Aktif</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/60 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm flex-shrink-0">
              <Lightning weight="fill" className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">XP Terkumpul</div>
              <div className="text-xs font-black font-mono text-navy-950 dark:text-white">{totalXp} XP</div>
            </div>
          </div>
        </div>

        {/* 🌿 SUSTAINABILITY ECO-IMPACT WIDGET (SDGs 12 & 13) */}
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-300/40 dark:border-emerald-800/40 space-y-2 select-none">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
              <span>🌱</span> Dampak Keberlanjutan (Eco-Impact)
            </span>
            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300/60">
              Paperless MABA
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="p-2 rounded-xl bg-white/80 dark:bg-[#0F172A]/80 border border-emerald-200/60 dark:border-emerald-900/60">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Kertas Hemat</div>
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {ecoImpact.paperSavedSheets} Lembar
              </div>
            </div>
            <div className="p-2 rounded-xl bg-white/80 dark:bg-[#0F172A]/80 border border-emerald-200/60 dark:border-emerald-900/60">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Reduksi CO₂</div>
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {ecoImpact.co2SavedKg} kg
              </div>
            </div>
            <div className="p-2 rounded-xl bg-white/80 dark:bg-[#0F172A]/80 border border-emerald-200/60 dark:border-emerald-900/60">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Air Hemat</div>
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {ecoImpact.waterSavedLiters} L
              </div>
            </div>
          </div>

          <p className="text-[10px] text-emerald-800/80 dark:text-emerald-300/80 leading-tight">
            Dengan modul digital Nyala, kamu berkontribusi langsung pada <strong>SDGs 12 (Konsumsi Bertanggung Jawab)</strong> & <strong>SDGs 13 (Aksi Iklim)</strong>.
          </p>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => setEditSheetOpen(true)}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-navy-950 dark:text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <PencilSimple weight="bold" className="w-4 h-4 text-nyala-600" />
          <span>Ubah Biodata Mahasiswa</span>
        </button>
      </DuolingoCard>

      {/* ── 2. PREFERENSI & PENGATURAN ── */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-black text-navy-950 dark:text-white uppercase tracking-wider px-1">
          Pengaturan Aplikasi
        </h3>

        <div className="space-y-2">
          {/* Theme Selector */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-navy-950 dark:text-white">
                {theme === "dark" ? <Moon weight="fill" className="w-5 h-5 text-amber-400" /> : <Sun weight="fill" className="w-5 h-5 text-amber-500" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">Tema Antarmuka</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Mode {theme === "dark" ? "Gelap" : "Terang"}</p>
              </div>
            </div>
            <button
              onClick={() => setThemeMode(theme === "dark" ? "light" : "dark")}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-navy-950 dark:text-white active:scale-95 transition-transform"
            >
              Ganti ke {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>

          {/* Contact Admin */}
          <button
            onClick={() => setAdminModalOpen(true)}
            className="w-full p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-center justify-between select-none active:border-b-2 active:translate-y-0.5 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Headset weight="bold" className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy-950 dark:text-white">Bantuan Admin Kampus</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">WhatsApp Helpdesk Gedung C</p>
              </div>
            </div>
            <ArrowSquareOut weight="bold" className="w-4 h-4 text-slate-400" />
          </button>

          {/* Submission Info Card */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-200/80 dark:border-amber-900/60 border-b-4 border-b-amber-300/80 dark:border-b-amber-950 space-y-2 select-none text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy-950 dark:text-white flex items-center gap-1.5">
                <ShieldCheck weight="fill" className="w-4 h-4 text-nyala-600" />
                Karya Inovasi Web MABA
              </span>
              <span className="font-mono text-[10px] text-amber-700 dark:text-amber-300 font-bold">
                rankings.umkt.ac.id
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Dikembangkan oleh <strong>Al-Ghani Desta Setyawan</strong> (MABA UMKT 2026) untuk <strong>Submission Lomba Pengembangan Web Pemeringkatan UMKT</strong>.
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-amber-200/60 dark:border-amber-900/60 text-[10px] font-bold">
              <a href="https://instagram.com/kou.sozo" target="_blank" rel="noopener noreferrer" className="text-nyala-600 dark:text-nyala-400 hover:underline">
                @kou.sozo
              </a>
              <span>•</span>
              <a href="https://kou.bio" target="_blank" rel="noopener noreferrer" className="text-navy-700 dark:text-slate-300 hover:underline">
                kou.bio
              </a>
            </div>
          </div>

          {/* Reset Data */}
          <button
            onClick={handleResetData}
            className="w-full p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border-2 border-rose-200 dark:border-rose-900 border-b-4 border-b-rose-300 dark:border-b-rose-950 flex items-center justify-between select-none active:border-b-2 active:translate-y-0.5 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Trash weight="bold" className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-300">Reset Data Aplikasi</h4>
                <p className="text-[10px] text-rose-500/80">Hapus cache checklist & profil lokal</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ── 3. EDIT PROFILE BOTTOM SHEET MODAL ── */}
      <FlutterBottomSheet
        isOpen={editSheetOpen}
        onClose={() => setEditSheetOpen(false)}
        title="Ubah Biodata Mahasiswa"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 pb-4">
          
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy-950 dark:text-white">Nama Lengkap:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs text-navy-950 dark:text-white outline-none focus:border-nyala-500"
              required
            />
          </div>

          {/* NIM Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy-950 dark:text-white">NIM / No Pendaftaran:</label>
            <input
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs text-navy-950 dark:text-white font-mono outline-none focus:border-nyala-500"
              required
            />
          </div>

          {/* Prodi Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy-950 dark:text-white">Program Studi:</label>
            <select
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs text-navy-950 dark:text-white outline-none focus:border-nyala-500 cursor-pointer"
            >
              {PRODI_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Mascot Mood Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-navy-950 dark:text-white">Ekspresi Maskot Teman:</label>
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {MOOD_CHOICES.map((m) => (
                <button
                  type="button"
                  key={m.mood}
                  onClick={() => setMascotMood(m.mood)}
                  className={`p-2 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                    mascotMood === m.mood
                      ? "bg-nyala-500/10 border-nyala-500 text-nyala-600 font-bold"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"
                  }`}
                >
                  <MascotFlame size="sm" mood={m.mood} className="w-7 h-7" />
                  <span className="text-[9px] truncate">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <DuolingoButton type="submit" variant="primary" fullWidth size="md">
            Simpan Perubahan
          </DuolingoButton>

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
