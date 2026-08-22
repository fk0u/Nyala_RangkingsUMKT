"use client";

import React from "react";
import clsx from "clsx";

interface FlutterChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string; weight?: any }>;
  badge?: string | number;
  className?: string;
}

/**
 * FlutterChip - Filter / Choice chip untuk seleksi cepat dan filter kategori.
 */
export default function FlutterChip({
  label,
  selected = false,
  onClick,
  icon: Icon,
  badge,
  className,
}: FlutterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 select-none active:scale-95 border flex-shrink-0",
        selected
          ? "bg-nyala-500 text-white border-nyala-500 shadow-sm shadow-nyala-500/20"
          : "bg-white dark:bg-[#0F172A] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700",
        className
      )}
    >
      {Icon && (
        <Icon
          weight={selected ? "fill" : "regular"}
          className={clsx("w-3.5 h-3.5", selected ? "text-white" : "text-slate-400")}
        />
      )}
      <span>{label}</span>
      {badge !== undefined && (
        <span
          className={clsx(
            "text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold",
            selected
              ? "bg-white/20 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
