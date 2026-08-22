"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AppleNyalaTitle({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none py-1 ${className}`}>
      <div className="flex items-center gap-1">
        {/* Crisp, Bold Geometric Sans Typography */}
        <span className="font-sans font-black text-lg tracking-tight text-navy-950 dark:text-white flex items-center">
          Nyala
        </span>
        
        {/* Subtle Warm Terracotta Ember Dot */}
        <motion.span
          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-2 h-2 rounded-full bg-nyala-500 inline-block shadow-sm shadow-nyala-500/40 ml-0.5"
        />
      </div>
    </div>
  );
}
