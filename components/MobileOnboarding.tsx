"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkle, 
  CalendarCheck, 
  Laptop, 
  GraduationCap, 
  X,
  Compass
} from "@phosphor-icons/react";
import MascotFlame, { MascotMood } from "./MascotFlame";
import { useToast } from "@/context/ToastContext";

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  mascotMood: MascotMood;
  content: React.ReactNode;
}

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

export default function MobileOnboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProdi, setSelectedProdi] = useState("S1 Teknik Informatika");
  const toast = useToast();

  useEffect(() => {
    // Check if user has already onboarded
    const hasOnboarded = localStorage.getItem("nyala_maba_onboarded_v1");
    if (!hasOnboarded) {
      // Show onboarding after a tiny delay for smooth entry
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Listen for manual trigger to replay onboarding
    const handleOpen = () => {
      setCurrentSlide(0);
      setIsOpen(true);
    };
    window.addEventListener("open-nyala-onboarding", handleOpen);
    return () => window.removeEventListener("open-nyala-onboarding", handleOpen);
  }, []);

  const handleFinish = () => {
    localStorage.setItem("nyala_maba_onboarded_v1", "true");
    localStorage.setItem("nyala_user_prodi", selectedProdi);
    setIsOpen(false);
    toast.nyala(`Selamat datang mahasiswa ${selectedProdi}! Nyala siap menemanimu.`, "Siap Memulai");
  };

  const handleNext = () => {
    if (currentSlide < 2) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slides: OnboardingSlide[] = [
    {
      id: 0,
      title: "Nyala. Teman Perjalanan MABA-mu.",
      subtitle: "Portal digital resmi yang menemani 3.755 Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur 2026.",
      mascotMood: "excited",
      content: (
        <div className="space-y-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800 text-left space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-navy-950 dark:text-white">
              <Compass weight="bold" className="w-4 h-4 text-nyala-500" />
              <span>Semua Kebutuhan MABA dalam 1 Aplikasi</span>
            </div>
            <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
              Jadwal 3 Gelombang IMM, simulator KRS SIKAD 1:1, kurikulum Prodi TI, hingga asisten cerdas AI.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-mono text-navy-400 pt-1">
            <span>• Tanpa Drama</span>
            <span>• Data Terverifikasi</span>
            <span>• Siap 24/7</span>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "Fitur Esensial di Ujung Jarimu",
      subtitle: "Tiga instrumen utama yang memastikan seluruh rangkaian orientasimu berjalan lancar.",
      mascotMood: "studying",
      content: (
        <div className="space-y-2.5 pt-1 text-left">
          <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-navy-950 dark:bg-navy-800 text-white flex items-center justify-center font-bold flex-shrink-0">
              <CalendarCheck weight="bold" className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-navy-950 dark:text-white">Rundown 3 Gelombang & Zoom</h4>
              <p className="text-[11px] text-navy-600 dark:text-navy-300 leading-snug">
                Hitung mundur realtime menuju sesi luring dan materi daring universitas.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-navy-950 dark:bg-navy-800 text-white flex items-center justify-center font-bold flex-shrink-0">
              <Laptop weight="bold" className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-navy-950 dark:text-white">Simulator SIKAD Mahasiswa 1:1</h4>
              <p className="text-[11px] text-navy-600 dark:text-navy-300 leading-snug">
                Latihan KRS online, presensi 75%, dan generate tagihan BRIVA SPP.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-navy-950 dark:bg-navy-800 text-white flex items-center justify-center font-bold flex-shrink-0">
              <Sparkle weight="bold" className="w-4 h-4 text-nyala-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-navy-950 dark:text-white">Tanya Nyala AI Companion</h4>
              <p className="text-[11px] text-navy-600 dark:text-navy-300 leading-snug">
                Jawaban instan untuk pertanyaan tata tertib, kontak admin, dan beasiswa.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Pilih Program Studi Kamu",
      subtitle: "Personalisasi pengalaman panduan orientasi sesuai jurusan perkuliahanmu.",
      mascotMood: "cheering",
      content: (
        <div className="space-y-3 pt-1 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider text-navy-400 block">
            Pilih Program Studi:
          </label>
          
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {PRODI_OPTIONS.map((prodi) => {
              const isSelected = selectedProdi === prodi;
              return (
                <button
                  key={prodi}
                  type="button"
                  onClick={() => setSelectedProdi(prodi)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center justify-between gap-1 cursor-pointer ${
                    isSelected
                      ? "bg-nyala-600 text-white shadow-sm"
                      : "bg-navy-50 dark:bg-navy-950 text-navy-700 dark:text-navy-300 border border-navy-100 dark:border-navy-800 hover:border-nyala-500"
                  }`}
                >
                  <span className="truncate">{prodi}</span>
                  {isSelected && <Check weight="bold" className="w-3.5 h-3.5 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-navy-500 dark:text-navy-400 leading-snug pt-1">
            Pilihan ini dapat diubah kapan saja pada profil atau pengaturan aplikasi.
          </p>
        </div>
      ),
    },
  ];

  const activeSlideData = slides[currentSlide];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-950/70 backdrop-blur-md">
          
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleFinish}
            className="absolute inset-0"
          />

          {/* Native Mobile Sheet / Modal */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className="relative z-10 w-full max-w-md bg-white dark:bg-navy-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-navy-200/80 dark:border-navy-800 flex flex-col justify-between max-h-[90vh] overflow-y-auto"
          >
            
            {/* Top Bar: Pull Indicator & Skip Button */}
            <div className="flex items-center justify-between pb-3">
              <div className="w-12 h-1 rounded-full bg-navy-200 dark:bg-navy-700 sm:hidden mx-auto absolute top-3 left-1/2 -translate-x-1/2" />
              
              <span className="text-[11px] font-mono font-bold text-navy-400">
                Langkah {currentSlide + 1} dari 3
              </span>

              <button
                onClick={handleFinish}
                className="text-xs font-bold text-navy-500 hover:text-navy-900 dark:hover:text-white px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Lewati
              </button>
            </div>

            {/* Slide Body */}
            <div className="space-y-4 text-center py-2">
              <div className="flex justify-center py-1">
                <MascotFlame size="lg" mood={activeSlideData.mascotMood} />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-navy-950 dark:text-white tracking-tight leading-snug">
                  {activeSlideData.title}
                </h3>
                <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed font-normal">
                  {activeSlideData.subtitle}
                </p>
              </div>

              {activeSlideData.content}
            </div>

            {/* Bottom Controls: Indicator Dots & Action Buttons */}
            <div className="pt-6 space-y-4 border-t border-navy-100 dark:border-navy-800/80">
              
              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx
                        ? "w-8 bg-nyala-600"
                        : "w-2 bg-navy-200 dark:bg-navy-700"
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {currentSlide > 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-3.5 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 hover:bg-navy-200 transition-colors cursor-pointer"
                    title="Sebelumnya"
                  >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-nyala-600 hover:bg-nyala-500 text-white font-extrabold text-sm shadow-lg shadow-nyala-600/20 active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <span>{currentSlide === 2 ? "Mulai Petualangan MABA" : "Lanjutkan"}</span>
                  <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
