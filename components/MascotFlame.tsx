"use client";

import React from "react";
import { motion } from "framer-motion";

interface MascotFlameProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  mood?: "happy" | "excited" | "calm" | "cheering" | "thinking";
  interactive?: boolean;
}

export default function MascotFlame({
  size = "md",
  className = "",
  mood = "happy",
  interactive = true,
}: MascotFlameProps) {
  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
    xl: "w-44 h-44",
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
      animate={{
        y: [0, -6, 0],
        rotate: [-1, 1.5, -1],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={interactive ? { scale: 1.08, rotate: 3 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
    >
      {/* Outer Glow Halo */}
      <motion.div
        className="absolute inset-0 bg-nyala-500/20 rounded-full blur-xl -z-10"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SVG Character Flame */}
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flameOuter" x1="50" y1="0" x2="50" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF7D47" />
            <stop offset="50%" stopColor="#FF5A1F" />
            <stop offset="100%" stopColor="#E04500" />
          </linearGradient>

          <linearGradient id="flameInner" x1="50" y1="30" x2="50" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="35%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#FF5A1F" />
          </linearGradient>
        </defs>

        {/* Outer Body Flame */}
        <motion.path
          d="M50 8C50 8 32 36 32 66C32 88.0914 40.0589 106 50 106C59.9411 106 68 88.0914 68 66C68 36 50 8 50 8Z"
          fill="url(#flameOuter)"
          animate={{
            d: [
              "M50 8C50 8 30 36 30 66C30 88.0914 38.9543 106 50 106C61.0457 106 70 88.0914 70 66C70 36 50 8 50 8Z",
              "M50 5C47 28 28 40 28 68C28 90 39 108 50 108C61 108 72 90 72 68C72 40 53 28 50 5Z",
              "M50 8C50 8 30 36 30 66C30 88.0914 38.9543 106 50 106C61.0457 106 70 88.0914 70 66C70 36 50 8 50 8Z",
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Inner Heart Core */}
        <motion.path
          d="M50 36C50 36 39 54 39 74C39 88.3594 43.9249 100 50 100C56.0751 100 61 88.3594 61 74C61 54 50 36 50 36Z"
          fill="url(#flameInner)"
          animate={{
            scale: [1, 0.95, 1],
            y: [0, 2, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Eyes */}
        <g className="mascot-eyes">
          {mood === "happy" || mood === "cheering" ? (
            <>
              {/* Happy Arched Eyes */}
              <path
                d="M43 68C43 65.5 45.5 64 47.5 65.5"
                stroke="#0F172A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M52.5 65.5C54.5 64 57 65.5 57 68"
                stroke="#0F172A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </>
          ) : mood === "excited" ? (
            <>
              {/* Star / Big Eyes */}
              <circle cx="45" cy="66" r="2.8" fill="#0F172A" />
              <circle cx="46" cy="65" r="0.9" fill="#FFF7ED" />
              <circle cx="55" cy="66" r="2.8" fill="#0F172A" />
              <circle cx="56" cy="65" r="0.9" fill="#FFF7ED" />
            </>
          ) : (
            <>
              {/* Calm Eyes */}
              <circle cx="45" cy="67" r="2.2" fill="#0F172A" />
              <circle cx="55" cy="67" r="2.2" fill="#0F172A" />
            </>
          )}
        </g>

        {/* Smile */}
        <path
          d="M47 73C48.5 75.5 51.5 75.5 53 73"
          stroke="#0F172A"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Cheeks Blush */}
        <circle cx="41" cy="71" r="2" fill="#FF5A1F" fillOpacity="0.4" />
        <circle cx="59" cy="71" r="2" fill="#FF5A1F" fillOpacity="0.4" />

        {/* Little Sparkle Accent */}
        <motion.path
          d="M68 28L70 33L75 35L70 37L68 42L66 37L61 35L66 33L68 28Z"
          fill="#FFF7ED"
          animate={{
            scale: [0.7, 1.2, 0.7],
            opacity: [0.6, 1, 0.6],
            rotate: [0, 90, 180],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}
