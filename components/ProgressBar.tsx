"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ProgressBar({
  progress,
  label,
  showPercentage = true,
  size = "md",
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(progress, 0), 100);

  const heightMap = {
    sm: "h-2",
    md: "h-3.5",
    lg: "h-5",
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-navy-700 dark:text-navy-300">
          {label && <span>{label}</span>}
          {showPercentage && (
            <span className="text-nyala-600 dark:text-nyala-400 font-bold ml-auto">
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-navy-100 dark:bg-navy-800/80 rounded-full overflow-hidden p-0.5 border border-navy-200/50 dark:border-navy-700/50 ${heightMap[size]}`}>
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-nyala-500 via-nyala-400 to-amber-400 relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Shimmer line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[pulse_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  );
}
