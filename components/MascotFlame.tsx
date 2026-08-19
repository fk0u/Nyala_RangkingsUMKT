"use client";

import React from "react";
import { motion, TargetAndTransition } from "framer-motion";

export type MascotMood =
  | "happy"
  | "excited"
  | "calm"
  | "cheering"
  | "thinking"
  | "withClipboard"
  | "coding"
  | "sleepy"
  | "confused"
  | "nervous"
  | "studying"
  | "salim"
  | "waving";

export interface MascotFlameProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  mood?: MascotMood;
  interactive?: boolean;
  onClick?: () => void;
}

export const MASCOT_MOOD_DESCRIPTIONS: Record<MascotMood, { label: string; quote: string; tag: string }> = {
  waving: {
    label: "Menyapa MABA",
    quote: "Halo Inovator Muda UMKT 2026! Nyala siap jadi teman terbaikmu dari MASTA sampai wisuda!",
    tag: "Welcoming Hero"
  },
  happy: {
    label: "Semangat Menyala",
    quote: "Siap mendampingi perjalanan MABA UMKT 2026!",
    tag: "Default Semangat"
  },
  withClipboard: {
    label: "Cek Perlengkapan",
    quote: "Semua berkas dan perlengkapan MASTA sudah dicentang!",
    tag: "Checklist Master"
  },
  coding: {
    label: "Ngoding Mode",
    quote: "No Skill No Trust! Sedang push tugas Dasar Pemrograman.",
    tag: "Anak IT Sejati"
  },
  sleepy: {
    label: "Begadang MABA",
    quote: "Hoaaamm... Ngerjain tugas sampai jam 3 pagi nih...",
    tag: "Efek Deadline"
  },
  confused: {
    label: "Bingung SIKAD",
    quote: "Ini tombol simpan KRS di mana ya? Kok error 404?",
    tag: "MABA Lost"
  },
  nervous: {
    label: "Deg-degan Zoom",
    quote: "Aduh, nama Zoom-ku sudah sesuai format gugus belum ya?",
    tag: "Anxiety H-1"
  },
  studying: {
    label: "Belajar Rajin",
    quote: "Target Semester 1: IPK 4.0 dan lolos 24 SKS!",
    tag: "Kutu Buku TI"
  },
  cheering: {
    label: "Selebrasi Lulus",
    quote: "Horeee! e-Sertifikat MASTA 2026 sudah terbit!",
    tag: "Full Happy"
  },
  salim: {
    label: "Santun ke Dosen",
    quote: "Assalamualaikum Bapak/Ibu Dosen Pembimbing Akademik...",
    tag: "Etika Mahasiswa"
  },
  thinking: {
    label: "Sedang Mikir",
    quote: "Hmm... Pilih konsentrasi Jaringan atau Komputasi Cerdas ya?",
    tag: "Deep Thinking"
  },
  excited: {
    label: "Super Antusias",
    quote: "Wah, UKM Expo-nya seru banget! Mau daftar HIMATIF & Tapak Suci!",
    tag: "High Energy"
  },
  calm: {
    label: "Santai & Tenang",
    quote: "Tarik napas, hidrasi cukup, semua pasti berjalan lancar.",
    tag: "Chill Vibes"
  }
};

export default function MascotFlame({
  size = "md",
  className = "",
  mood = "happy",
  interactive = true,
  onClick,
}: MascotFlameProps) {
  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-44 h-44",
    "2xl": "w-56 h-56",
  };

  // Body animation configs based on mood
  const getBodyAnimation = (): TargetAndTransition => {
    switch (mood) {
      case "coding":
        return {
          y: [0, -2, 0, -1, 0],
          rotate: [-0.5, 0.5, -0.5],
          transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const }
        };
      case "sleepy":
        return {
          y: [0, 4, 0],
          rotate: [-2, 1, -2],
          transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const }
        };
      case "confused":
        return {
          rotate: [-4, 6, -4],
          y: [0, -3, 0],
          transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }
        };
      case "nervous":
        return {
          x: [-1.2, 1.2, -1.2, 1, -1],
          y: [0, -2, 0],
          transition: { duration: 0.25, repeat: Infinity, ease: "linear" as const }
        };
      case "waving":
        return {
          y: [0, -6, 0],
          rotate: [-1.5, 1.5, -1.5],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
        };
      case "cheering":
      case "excited":
        return {
          y: [0, -10, 0],
          rotate: [-3, 3, -3],
          scale: [1, 1.05, 1],
          transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" as const }
        };
      case "salim":
        return {
          y: [0, 3, 0],
          rotate: [0, 2, 0],
          transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const }
        };
      case "withClipboard":
      case "studying":
        return {
          y: [0, -4, 0],
          rotate: [0, 0.8, 0],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
        };
      default:
        return {
          y: [0, -5, 0],
          rotate: [-0.8, 0.8, -0.8],
          transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const }
        };
    }
  };

  const isStanding = [
    "withClipboard",
    "coding",
    "studying",
    "salim",
    "cheering",
    "confused",
    "sleepy",
    "nervous",
    "waving"
  ].includes(mood);

  return (
    <motion.div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
      animate={getBodyAnimation()}
      whileHover={interactive ? { scale: 1.08, rotate: 2 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
    >
      {/* ── Soft Ambient Warm Backlight Glow ── */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-2xl -z-10 ${
          mood === "sleepy"
            ? "bg-indigo-500/20"
            : mood === "coding"
            ? "bg-cyan-500/25"
            : mood === "cheering"
            ? "bg-amber-400/35"
            : "bg-nyala-500/25"
        }`}
        animate={{
          scale: mood === "sleepy" ? [0.9, 1.05, 0.9] : [0.95, 1.2, 0.95],
          opacity: mood === "sleepy" ? [0.2, 0.4, 0.2] : [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── RIGGED SVG MASCOT ── */}
      <svg
        viewBox={isStanding ? "0 0 140 155" : "0 0 130 130"}
        className="w-full h-full drop-shadow-xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer Flame Gradient */}
          <linearGradient id="flameBack" x1="65" y1="5" x2="65" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FA5D38" />
            <stop offset="45%" stopColor="#EA4826" />
            <stop offset="100%" stopColor="#C82E12" />
          </linearGradient>

          {/* Middle Flame Gradient */}
          <linearGradient id="flameMid" x1="65" y1="15" x2="65" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFB347" />
            <stop offset="40%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Inner Golden Flame Gradient */}
          <linearGradient id="flameInnerGold" x1="65" y1="25" x2="65" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Spherical Head Gradient */}
          <radialGradient id="headShading" cx="45%" cy="40%" r="58%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFF7ED" />
            <stop offset="100%" stopColor="#FED7AA" />
          </radialGradient>

          {/* Clipboard Wood */}
          <linearGradient id="clipWood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* Laptop Screen Glow */}
          <linearGradient id="laptopScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          {/* Book Cover */}
          <linearGradient id="bookCover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* ── 1. LAYERED FLAME MANE (RIGGED WITH DYNAMIC WAVE) ── */}
        <g className="rig-flame-mane">
          {/* Layer 1: Outer Coral-Red Flame Tongues */}
          <motion.path
            d="M65 14C55 24 35 18 24 38C13 58 14 84 27 104C40 124 88 126 103 105C118 84 116 56 106 38C96 20 75 4 65 14Z"
            fill="url(#flameBack)"
            animate={{
              d: mood === "sleepy"
                ? [
                    "M65 20C55 28 35 24 24 42C13 60 14 84 27 104C40 124 88 126 103 105C118 84 116 58 106 42C96 24 75 12 65 20Z",
                    "M65 24C55 30 35 26 24 44C13 62 14 86 27 104C40 124 88 126 103 105C118 84 116 60 106 44C96 26 75 14 65 24Z",
                    "M65 20C55 28 35 24 24 42C13 60 14 84 27 104C40 124 88 126 103 105C118 84 116 58 106 42C96 24 75 12 65 20Z",
                  ]
                : [
                    "M65 14C55 24 35 18 24 38C13 58 14 84 27 104C40 124 88 126 103 105C118 84 116 56 106 38C96 20 75 4 65 14Z",
                    "M65 8C53 20 32 14 22 34C12 54 12 86 26 106C40 126 90 128 105 107C120 86 118 52 108 34C98 16 77 0 65 8Z",
                    "M65 14C55 24 35 18 24 38C13 58 14 84 27 104C40 124 88 126 103 105C118 84 116 56 106 38C96 20 75 4 65 14Z",
                  ],
            }}
            transition={{ duration: mood === "cheering" ? 1.5 : 3.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Layer 2: Left Wing */}
          <motion.path
            d="M26 36C22 22 28 12 32 6C36 14 36 28 42 36C36 38 30 38 26 36Z"
            fill="url(#flameBack)"
            animate={{
              rotate: mood === "cheering" ? [-6, 8, -6] : [-2, 3, -2],
              originX: "30px",
              originY: "36px",
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Layer 3: Right Wing */}
          <motion.path
            d="M96 38C104 26 102 14 98 8C94 16 92 26 88 36C91 37 94 38 96 38Z"
            fill="url(#flameBack)"
            animate={{
              rotate: mood === "cheering" ? [8, -6, 8] : [2, -3, 2],
              originX: "96px",
              originY: "38px",
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Layer 4: Middle Warm Flare */}
          <motion.path
            d="M65 24C56 32 40 28 32 46C24 64 26 86 36 100C46 114 84 115 94 101C104 87 104 64 96 46C88 28 74 16 65 24Z"
            fill="url(#flameMid)"
            animate={{
              scale: [0.98, 1.03, 0.98],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Layer 5: Inner Golden Amber */}
          <motion.path
            d="M65 32C58 38 46 36 40 50C34 64 36 82 44 94C52 106 78 107 86 95C94 83 94 64 88 50C82 36 72 26 65 32Z"
            fill="url(#flameInnerGold)"
            animate={{
              scale: [1, 0.96, 1],
            }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* ── 2. FLOATING EMBERS & MOOD FX ── */}
        <g className="rig-floating-fx">
          {/* Top-Right Floating Ember (Reference standard) */}
          {mood !== "sleepy" && (
            <motion.path
              d="M108 24C114 28 118 36 115 44C112 48 106 50 102 46C98 42 100 34 104 28C105 26 107 24 108 24Z"
              fill="#F59E0B"
              animate={{
                y: [-3, 4, -3],
                x: [0, 2, 0],
                rotate: [-4, 6, -4],
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Left Ember Spark */}
          <motion.circle
            cx="18"
            cy="42"
            r="3.5"
            fill="#FBBF24"
            animate={{
              y: [0, -5, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* SLEEPY: Floating Zzz */}
          {mood === "sleepy" && (
            <g>
              <motion.text
                x="98"
                y="35"
                fill="#818CF8"
                fontSize="12"
                fontWeight="bold"
                fontFamily="sans-serif"
                animate={{
                  y: [35, 20, 10],
                  x: [98, 104, 110],
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 1.4],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
              >
                Z
              </motion.text>
              <motion.text
                x="88"
                y="45"
                fill="#A5B4FC"
                fontSize="9"
                fontWeight="bold"
                fontFamily="sans-serif"
                animate={{
                  y: [45, 30, 20],
                  x: [88, 92, 98],
                  opacity: [0, 0.8, 0],
                  scale: [0.7, 1, 1.2],
                }}
                transition={{ duration: 2.8, delay: 0.9, repeat: Infinity, ease: "easeOut" }}
              >
                z
              </motion.text>
            </g>
          )}

          {/* CONFUSED: Floating Question Mark */}
          {mood === "confused" && (
            <motion.g
              animate={{
                y: [-2, 3, -2],
                rotate: [-8, 8, -8],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="106" cy="24" r="9" fill="#F59E0B" />
              <text
                x="102.5"
                y="28"
                fill="#FFFFFF"
                fontSize="12"
                fontWeight="900"
                fontFamily="sans-serif"
              >
                ?
              </text>
            </motion.g>
          )}

          {/* NERVOUS: Blue Sweat Drop on Temple */}
          {mood === "nervous" && (
            <motion.path
              d="M90 62C90 62 94 56 94 53C94 51 92 49 90 49C88 49 86 51 86 53C86 56 90 62 90 62Z"
              fill="#38BDF8"
              animate={{
                y: [0, 4, 0],
                scale: [0.9, 1.15, 0.9],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* THINKING: Glowing Lightbulb Spark */}
          {mood === "thinking" && (
            <motion.g
              animate={{
                scale: [0.9, 1.2, 0.9],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="98" cy="28" r="7" fill="#FBBF24" />
              <circle cx="98" cy="28" r="4" fill="#FEF08A" />
              <line x1="98" y1="18" x2="98" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              <line x1="106" y1="22" x2="109" y2="20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              <line x1="106" y1="34" x2="109" y2="36" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          )}

          {/* CHEERING / CELEBRATION: Sparkle Stars */}
          {(mood === "cheering" || mood === "excited") && (
            <>
              <motion.path
                d="M106 18L108 22L112 24L108 26L106 30L104 26L100 24L104 22L106 18Z"
                fill="#FBBF24"
                animate={{
                  scale: [0.6, 1.3, 0.6],
                  rotate: [0, 90, 180],
                }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                d="M24 22L25.5 25L28.5 26.5L25.5 28L24 31L22.5 28L19.5 26.5L22.5 25L24 22Z"
                fill="#F97316"
                animate={{
                  scale: [1.2, 0.7, 1.2],
                  rotate: [180, 90, 0],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}
        </g>

        {/* ── 3. CUTE ROUND WHITE HEAD / BODY (RIGGED SHADING) ── */}
        <g className="rig-head-sphere">
          <circle
            cx="65"
            cy="74"
            r="26"
            fill="url(#headShading)"
            stroke="#FED7AA"
            strokeWidth="0.8"
          />

          {/* Big Blush Cheeks (Warm Coral Orange Circles) */}
          <ellipse
            cx="49"
            cy="80"
            rx="3.4"
            ry="2.8"
            fill="#F47244"
            opacity={mood === "nervous" || mood === "salim" ? 0.95 : 0.85}
          />
          <ellipse
            cx="81"
            cy="80"
            rx="3.4"
            ry="2.8"
            fill="#F47244"
            opacity={mood === "nervous" || mood === "salim" ? 0.95 : 0.85}
          />
        </g>

        {/* ── 4. RIGGED FACIAL EXPRESSIONS (EYES, GLASSES & MOUTH) ── */}
        <g className="rig-facial-features">
          
          {/* EYES RIGGING */}
          {mood === "coding" ? (
            /* Coding Nerd/Pro Glasses */
            <g>
              {/* Glasses frame */}
              <rect x="46" y="66" width="14" height="11" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
              <rect x="70" y="66" width="14" height="11" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
              <line x1="60" y1="71" x2="70" y2="71" stroke="#38BDF8" strokeWidth="1.5" />
              {/* Blue Terminal Screen Reflection in Lenses */}
              <text x="48" y="74" fill="#38BDF8" fontSize="6" fontFamily="monospace" fontWeight="bold">&gt;_</text>
              <text x="72" y="74" fill="#34D399" fontSize="6" fontFamily="monospace" fontWeight="bold">01</text>
            </g>
          ) : mood === "sleepy" ? (
            /* Sleepy / Droopy Eyes */
            <g>
              <path d="M49 74C52 71 56 71 59 74" stroke="#241E1C" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M71 74C74 71 78 71 81 74" stroke="#241E1C" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          ) : mood === "confused" ? (
            /* Confused Uneven Eyes */
            <g>
              <circle cx="53" cy="71" r="3.2" fill="#241E1C" />
              <circle cx="54" cy="70" r="1.1" fill="#FFFFFF" />
              {/* Spiral/Swirl on Right Eye */}
              <path
                d="M77 69C75 71 77 74 79 73C80 72 79 70 78 71"
                stroke="#241E1C"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          ) : mood === "nervous" ? (
            /* Nervous Wide Shaking Eyes */
            <g>
              <circle cx="53" cy="72" r="3.5" fill="#241E1C" />
              <circle cx="54.5" cy="70.5" r="1.3" fill="#FFFFFF" />
              <circle cx="77" cy="72" r="3.5" fill="#241E1C" />
              <circle cx="78.5" cy="70.5" r="1.3" fill="#FFFFFF" />
            </g>
          ) : mood === "cheering" || mood === "excited" ? (
            /* Joyful Star / Big Sparkle Eyes */
            <g>
              <ellipse cx="53" cy="72" rx="2.8" ry="3.4" fill="#241E1C" />
              <circle cx="54.5" cy="70.5" r="1.1" fill="#FFFFFF" />
              <ellipse cx="77" cy="72" rx="2.8" ry="3.4" fill="#241E1C" />
              <circle cx="78.5" cy="70.5" r="1.1" fill="#FFFFFF" />
            </g>
          ) : mood === "thinking" ? (
            /* Thinking Glancing Upper Right */
            <g>
              <ellipse cx="54" cy="70" rx="2.2" ry="2.8" fill="#241E1C" />
              <circle cx="55.2" cy="69" r="0.8" fill="#FFFFFF" />
              <ellipse cx="78" cy="70" rx="2.2" ry="2.8" fill="#241E1C" />
              <circle cx="79.2" cy="69" r="0.8" fill="#FFFFFF" />
            </g>
          ) : (
            /* Reference 1 & 2 Default: Cute Solid Round Dot Eyes */
            <g>
              <ellipse cx="53" cy="72" rx="2.2" ry="2.8" fill="#241E1C" />
              <ellipse cx="77" cy="72" rx="2.2" ry="2.8" fill="#241E1C" />
            </g>
          )}

          {/* MOUTH RIGGING */}
          {mood === "sleepy" ? (
            /* Yawn Mouth */
            <ellipse cx="65" cy="80" rx="3.5" ry="4.5" fill="#241E1C" />
          ) : mood === "cheering" || mood === "excited" ? (
            /* Big Joyful Open Mouth */
            <path
              d="M60 77C60 82 70 82 70 77Z"
              fill="#241E1C"
              stroke="#241E1C"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          ) : mood === "nervous" ? (
            /* Wavy Anxious Mouth */
            <path
              d="M60 80C62 78 64 81 66 79C68 81 70 79 70 79"
              stroke="#241E1C"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : mood === "confused" || mood === "thinking" ? (
            /* Cute Small 'o' / Puzzled Smile */
            <path
              d="M62 79C64 78 66 80 68 79"
              stroke="#241E1C"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          ) : mood === "salim" ? (
            /* Gentle Polite Smile */
            <path
              d="M61 79C63 81 67 81 69 79"
              stroke="#241E1C"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            /* Default Sweet Curved Smile */
            <path
              d="M61 78.5C63 80.5 67 80.5 69 78.5"
              stroke="#241E1C"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          )}

        </g>

        {/* ── 5. RIGGED BODY PROPS, HANDS & LEGS (BY MOOD) ── */}

        {/* LEGS & FEET (For standing poses) */}
        {isStanding && (
          <g className="rig-legs">
            <rect x="52" y="98" width="6" height="10" rx="3" fill="#FFF7ED" />
            <ellipse cx="55" cy="110" rx="4.5" ry="2.5" fill="#475569" />

            <rect x="72" y="98" width="6" height="10" rx="3" fill="#FFF7ED" />
            <ellipse cx="75" cy="110" rx="4.5" ry="2.5" fill="#475569" />
          </g>
        )}

        {/* MOOD PROPS: 1. WITH CLIPBOARD (Reference 2) */}
        {mood === "withClipboard" && (
          <g className="rig-prop-clipboard">
            {/* Right Hand */}
            <circle cx="94" cy="84" r="4.5" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="0.8" />

            {/* Left Arm holding Clipboard */}
            <path d="M44 80C34 82 28 88 24 92" stroke="#FFF7ED" strokeWidth="6" strokeLinecap="round" />

            {/* Wooden Clipboard */}
            <g transform="translate(10, 68) rotate(-6)">
              <rect x="0" y="0" width="28" height="36" rx="3" fill="url(#clipWood)" stroke="#78350F" strokeWidth="1" />
              <rect x="8" y="-3" width="12" height="6" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
              <rect x="3" y="4" width="22" height="28" rx="1.5" fill="#FFFFFF" />
              {/* Row 1: Checked */}
              <path d="M6 10L8 12L12 8" stroke="#EA580C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="14" y1="10" x2="21" y2="10" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              {/* Row 2: Checked */}
              <path d="M6 17L8 19L12 15" stroke="#EA580C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="14" y1="17" x2="21" y2="17" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              {/* Row 3: Checkbox Square */}
              <rect x="6" y="22" width="5" height="5" rx="1" stroke="#EA580C" strokeWidth="1.2" fill="none" />
              <line x1="14" y1="24.5" x2="21" y2="24.5" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            <circle cx="24" cy="92" r="3.5" fill="#FFF7ED" />
          </g>
        )}

        {/* MOOD PROPS: 2. CODING WITH MINI LAPTOP (CORRECT PERSPECTIVE: BACK LID FACING CAMERA) */}
        {mood === "coding" && (
          <g className="rig-prop-coding">
            {/* Screen Blue Glow Reflection Upward onto Face */}
            <ellipse cx="65" cy="74" rx="20" ry="8" fill="#38BDF8" opacity="0.25" />

            {/* Laptop Base (Chassis on Lap) */}
            <path
              d="M40 94L45 88L85 88L90 94Z"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="0.8"
            />
            {/* Front Edge Highlight */}
            <line x1="42" y1="94" x2="88" y2="94" stroke="#475569" strokeWidth="1" />

            {/* Laptop Lid (Facing Camera - Back Cover with Metallic Finish) */}
            <path
              d="M45 88L47 70L83 70L85 88Z"
              fill="#1E293B"
              stroke="#334155"
              strokeWidth="1"
            />
            {/* Sleek Inner Lid Panel Accent */}
            <path
              d="M47 86L48.5 72L81.5 72L83 86Z"
              fill="#0F172A"
              opacity="0.5"
            />

            {/* Glowing Logo on Laptop Lid (Cute Flame / Hacker Symbol) */}
            <g transform="translate(65, 79)">
              {/* Glowing Aura */}
              <circle cx="0" cy="0" r="5" fill="#FF5A1F" opacity="0.3" />
              {/* Flame Symbol on Back Lid */}
              <path
                d="M0 -3.5C1.5 -1.5 3 0 2 2.5C1 4.5 -1 4.5 -2 2.5C-3 0 -1.5 -1.5 0 -3.5Z"
                fill="#FF7A00"
              />
              <circle cx="0" cy="2" r="1" fill="#FEF08A" />
            </g>

            {/* Little Animated Typing Hands on Keyboard Sides */}
            <motion.circle
              cx="44"
              cy="87"
              r="3.5"
              fill="#FFF7ED"
              animate={{ y: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="86"
              cy="87"
              r="3.5"
              fill="#FFF7ED"
              animate={{ y: [1.5, -1.5, 1.5] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}

        {/* MOOD PROPS: 3. STUDYING WITH TEXTBOOK */}
        {mood === "studying" && (
          <g className="rig-prop-book">
            {/* Open Book */}
            <g transform="translate(42, 84)">
              {/* Left Page */}
              <path d="M0 4C6 2 18 2 23 6L23 24C18 20 6 20 0 22Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
              {/* Right Page */}
              <path d="M46 4C40 2 28 2 23 6L23 24C28 20 40 20 46 22Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
              {/* Book Spine */}
              <line x1="23" y1="6" x2="23" y2="24" stroke="#0284C7" strokeWidth="2" />
              {/* Text lines */}
              <line x1="4" y1="9" x2="18" y2="9" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
              <line x1="4" y1="13" x2="16" y2="13" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
              <line x1="28" y1="9" x2="42" y2="9" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
              <line x1="28" y1="13" x2="38" y2="13" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
            </g>
            {/* Holding Hands */}
            <circle cx="44" cy="94" r="3.5" fill="#FFF7ED" />
            <circle cx="86" cy="94" r="3.5" fill="#FFF7ED" />
          </g>
        )}

        {/* MOOD PROPS: 4. SALIM / HORMAT DOSEN */}
        {mood === "salim" && (
          <g className="rig-prop-salim">
            {/* Clasped Hands in Front (Sembah / Salim) */}
            <g transform="translate(60, 84)">
              <ellipse cx="3" cy="4" rx="3" ry="5" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="0.8" />
              <ellipse cx="7" cy="4" rx="3" ry="5" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="0.8" />
            </g>
          </g>
        )}

        {/* MOOD PROPS: 5. CHEERING / CELEBRATION */}
        {(mood === "cheering" || mood === "excited") && (
          <g className="rig-prop-cheering">
            {/* Raised Left Arm */}
            <path d="M42 76C32 70 26 58 22 50" stroke="#FFF7ED" strokeWidth="5" strokeLinecap="round" />
            <circle cx="22" cy="49" r="4" fill="#FFF7ED" />

            {/* Raised Right Arm */}
            <path d="M88 76C98 70 104 58 108 50" stroke="#FFF7ED" strokeWidth="5" strokeLinecap="round" />
            <circle cx="108" cy="49" r="4" fill="#FFF7ED" />
          </g>
        )}

        {/* MOOD PROPS: 6. CONFUSED (Scratching Head) */}
        {mood === "confused" && (
          <g className="rig-prop-confused">
            {/* Hand on Head */}
            <path d="M88 78C96 74 100 66 94 56C90 52 82 52 80 56" stroke="#FFF7ED" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="79" cy="56" r="3.5" fill="#FFF7ED" />
          </g>
        )}

        {/* MOOD PROPS: 7. THINKING (Hand on Chin) */}
        {mood === "thinking" && (
          <g className="rig-prop-thinking">
            {/* Hand under chin */}
            <path d="M46 84C52 86 58 87 64 85" stroke="#FFF7ED" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="64" cy="85" r="3.5" fill="#FFF7ED" />
          </g>
        )}

        {/* MOOD PROPS: 8. WAVING / MENYAPA MABA */}
        {mood === "waving" && (
          <g className="rig-prop-waving">
            {/* Left Hand Relaxed */}
            <circle cx="42" cy="84" r="4" fill="#FFF7ED" />

            {/* Right Arm Animated Wave */}
            <motion.g
              animate={{
                rotate: [-12, 22, -12],
              }}
              style={{ originX: "86px", originY: "78px" }}
              transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M86 78C94 70 100 58 104 46" stroke="#FFF7ED" strokeWidth="5.5" strokeLinecap="round" />
              <circle cx="104" cy="46" r="4.5" fill="#FFF7ED" />
              {/* Joyful Little Sparkles Around Hand */}
              <circle cx="112" cy="42" r="2.2" fill="#FBBF24" />
              <circle cx="96" cy="38" r="1.5" fill="#F59E0B" />
            </motion.g>
          </g>
        )}

      </svg>
    </motion.div>
  );
}
