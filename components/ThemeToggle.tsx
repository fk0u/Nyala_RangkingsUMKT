"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle tema tampilan"
      className="relative p-2 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-200 hover:text-nyala-500 dark:hover:text-nyala-400 transition-colors border border-navy-200/60 dark:border-navy-700/60"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-navy-700" />
        )}
      </motion.div>
    </button>
  );
}
