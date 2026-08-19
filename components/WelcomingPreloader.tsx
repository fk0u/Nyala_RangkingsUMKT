"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, Terminal, ArrowRight, Fire, ShieldCheck, CheckCircle } from "@phosphor-icons/react";
import MascotFlame from "./MascotFlame";

const LOADING_STAGES = [
  { progress: 20, title: "Memuat Dokumen & Tata Nilai MASTA 2026...", sub: "Inisialisasi 5 alur orientasi, pilar AIK & tata tertib resmi" },
  { progress: 45, title: "Sinkronisasi Live API web.umkt.ac.id...", sub: "Menghubungkan 2.100+ berita, agenda IKN & direktori 10 fakultas" },
  { progress: 75, title: "Menyiapkan Kurikulum TI & Portal SIKAD...", sub: "Memuat standar nilai kelulusan, jadwal KRS & presensi 75%" },
  { progress: 95, title: "Mengaktifkan Asisten Digital Nyala AI...", sub: "No Skill No Trust! Sahabat setia perjalanan kuliahmu" },
  { progress: 100, title: "Ekosistem Siap! Nyala Meluncur ke Header...", sub: "Selamat datang calon inovator masa depan UMKT 2026!" },
];

export default function WelcomingPreloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [stageIndex, setStageIndex] = useState<number>(0);
  const [flightPhase, setFlightPhase] = useState<"loading" | "ready" | "flying" | "docked">("loading");
  const [targetOffset, setTargetOffset] = useState<{ x: number; y: number }>({ x: -300, y: -300 });
  const mascotContainerRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic target coordinates of the Navbar Mascot Brand Logo
  const calculateFlightTarget = () => {
    if (typeof window === "undefined") return;
    const targetElement = document.getElementById("navbar-brand-mascot") || document.getElementById("navbar-brand-link");
    
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const targetCenterX = rect.left + rect.width / 2;
      const targetCenterY = rect.top + rect.height / 2;

      setTargetOffset({
        x: targetCenterX - centerX,
        y: targetCenterY - centerY,
      });
    } else {
      // Fallback
      setTargetOffset({
        x: -window.innerWidth / 2 + 48,
        y: -window.innerHeight / 2 + 28,
      });
    }
  };

  const startPreloaderSequence = () => {
    setProgress(0);
    setStageIndex(0);
    setFlightPhase("loading");
    setLoading(true);

    const startTime = Date.now();
    const duration = 5000; // FULL 5.0 SECONDS IMMERSIVE EXPERIENCE

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(currentPct);

      if (currentPct < 25) setStageIndex(0);
      else if (currentPct < 50) setStageIndex(1);
      else if (currentPct < 75) setStageIndex(2);
      else if (currentPct < 96) setStageIndex(3);
      else setStageIndex(4);

      if (currentPct >= 100) {
        clearInterval(interval);
        setFlightPhase("ready");

        // Calculate exact target coordinate
        calculateFlightTarget();

        // 1. Climax hold at 100% for 500ms (mascot cheering, golden aura pulse)
        setTimeout(() => {
          calculateFlightTarget();
          setFlightPhase("flying");

          // 2. Flying flight takes 1100ms across the screen into navbar
          setTimeout(() => {
            setFlightPhase("docked");
            setLoading(false);

            // Trigger navbar logo landing shockwave & bounce
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("nyala-mascot-docked"));
            }
          }, 1100);
        }, 500);
      }
    }, 25);

    return interval;
  };

  useEffect(() => {
    // Run the 5-second cinematic intro sequence
    const interval = startPreloaderSequence();

    // Listen for custom replay event
    const handleReplay = () => {
      startPreloaderSequence();
    };

    window.addEventListener("replay-nyala-intro", handleReplay);
    window.addEventListener("resize", calculateFlightTarget);

    return () => {
      clearInterval(interval);
      window.removeEventListener("replay-nyala-intro", handleReplay);
      window.removeEventListener("resize", calculateFlightTarget);
    };
  }, []);

  const handleSkip = () => {
    calculateFlightTarget();
    setFlightPhase("flying");
    setTimeout(() => {
      setFlightPhase("docked");
      setLoading(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("nyala-mascot-docked"));
      }
    }, 500);
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="welcoming-splash-screen"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
            }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-navy-950 text-white overflow-hidden select-none"
          >
            {/* ── Ambient Radial Flares ── */}
            <motion.div 
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.65, 0.3]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[650px] h-[650px] rounded-full bg-nyala-500/25 blur-[150px] pointer-events-none -top-36 -left-36"
            />
            <motion.div 
              animate={{
                scale: [1.25, 0.95, 1.25],
                opacity: [0.25, 0.55, 0.25]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[650px] h-[650px] rounded-full bg-cyan-500/20 blur-[160px] pointer-events-none -bottom-36 -right-36"
            />

            {/* Subtle Matrix Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Top Bar Controls */}
            <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/12 text-xs font-mono text-navy-300 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>NYALA CORE v2.0 • UMKT '26</span>
              </div>

              <button
                onClick={handleSkip}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-navy-200 transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md"
              >
                <span>Lewati (5s)</span>
                <ArrowRight weight="bold" className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ── Central Hero Stage with Cinematic Morphing Flight ── */}
            <div className="relative z-10 max-w-lg w-full px-6 flex flex-col items-center text-center space-y-8">
              
              {/* Animated Rigged Mascot Container */}
              <div ref={mascotContainerRef} className="relative w-60 h-60 flex items-center justify-center">
                
                {/* Glowing Energy Halo behind Mascot */}
                <motion.div
                  animate={{
                    scale: flightPhase === "ready" ? [1, 1.5, 1.3] : [0.95, 1.15, 0.95],
                    opacity: flightPhase === "ready" ? [0.5, 0.9, 0.6] : [0.35, 0.65, 0.35],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: flightPhase === "ready" ? 0.6 : 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-nyala-500/35 via-amber-400/25 to-cyan-500/35 blur-2xl pointer-events-none"
                />

                {/* THE FLYING MORPHING MASCOT */}
                <motion.div
                  animate={
                    flightPhase === "flying"
                      ? {
                          x: targetOffset.x,
                          y: targetOffset.y,
                          scale: 0.16,
                          rotate: [-5, 15, -2],
                          opacity: [1, 1, 0.85],
                          transition: { 
                            duration: 1.05, 
                            ease: [0.16, 1, 0.3, 1] // Smooth Awwwards Spring Flight Curve
                          }
                        }
                      : flightPhase === "ready"
                      ? {
                          scale: [1, 1.18, 1.1],
                          y: [-6, -16, -10],
                          rotate: [-3, 3, -2],
                          transition: { duration: 0.5 }
                        }
                      : {
                          scale: [0.96, 1.06, 0.96],
                          y: [0, -10, 0],
                          transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                        }
                  }
                  className="relative z-30"
                >
                  <div className="p-4 rounded-full bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-[0_0_70px_rgba(249,115,22,0.45)] backdrop-blur-sm">
                    <MascotFlame 
                      size="2xl" 
                      mood={flightPhase === "ready" || flightPhase === "flying" ? "cheering" : "waving"} 
                    />
                  </div>

                  {/* Spark Flight Trail particles during flight */}
                  {flightPhase === "flying" && (
                    <motion.div
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-amber-400/50 blur-md pointer-events-none"
                    />
                  )}
                </motion.div>
              </div>

              {/* Text Narrative */}
              <motion.div
                animate={flightPhase === "flying" ? { opacity: 0, y: 25 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nyala-500/20 text-nyala-400 border border-nyala-500/30 text-xs font-extrabold uppercase tracking-widest shadow-sm">
                  <Sparkle weight="fill" className="w-4 h-4 text-nyala-400" />
                  <span>Teman Perjalanan MABA UMKT 2026</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Selamat Datang, <br />
                  <span className="fire-text-gradient">Inovator Muda UMKT!</span>
                </h1>
              </motion.div>

              {/* 5-Second Progress Bar & Stages */}
              <motion.div
                animate={flightPhase === "flying" ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
                className="w-full space-y-3.5 max-w-md"
              >
                {/* Outer Glass Track */}
                <div className="h-3.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/15 shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-nyala-500 via-amber-400 to-cyan-400 rounded-full shadow-[0_0_18px_rgba(249,115,22,0.9)] relative"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  >
                    {/* Glowing lead edge indicator */}
                    <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                  </motion.div>
                </div>

                {/* Animated Status Message & Percentage */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-navy-300 truncate max-w-[320px] text-left">
                    <Terminal weight="bold" className="w-4 h-4 text-nyala-400 flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={stageIndex}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="truncate"
                      >
                        <span className="text-[12px] font-bold text-white block truncate">
                          {LOADING_STAGES[stageIndex].title}
                        </span>
                        <span className="text-[10px] text-navy-400 block truncate">
                          {LOADING_STAGES[stageIndex].sub}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <span className="font-black text-nyala-400 font-mono text-base ml-2 bg-nyala-500/15 px-3 py-1 rounded-xl border border-nyala-500/30">
                    {progress}%
                  </span>
                </div>
              </motion.div>

            </div>

            {/* Bottom Slogan Badge */}
            <div className="absolute bottom-6 text-center text-[11px] uppercase font-bold tracking-widest text-navy-400 font-mono flex items-center justify-center gap-2">
              <span>Fakultas Sains & Teknologi</span>
              <span>•</span>
              <span className="text-nyala-400 font-black">Prodi Teknologi Informasi UMKT</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Reveal */}
      <div className={loading && flightPhase !== "flying" ? "opacity-0" : "opacity-100 transition-opacity duration-700"}>
        {children}
      </div>
    </>
  );
}
