"use client";

import React, { useState } from "react";
import { CaretRight, CaretDown } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface FlutterListTileProps {
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  expandable?: boolean;
  expandedContent?: React.ReactNode;
  className?: string;
  badge?: string;
  badgeColor?: "orange" | "emerald" | "blue" | "slate";
  dense?: boolean;
}

/**
 * FlutterListTile - Komponen baris informasi bergaya Flutter ListTile & ExpansionTile.
 * Memadatkan informasi dengan hierarki visual terstruktur (Leading -> Title/Subtitle -> Trailing).
 */
export default function FlutterListTile({
  leading,
  title,
  subtitle,
  trailing,
  onClick,
  expandable = false,
  expandedContent,
  className,
  badge,
  badgeColor = "orange",
  dense = false,
}: FlutterListTileProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (expandable) {
      setIsExpanded(!isExpanded);
    }
    if (onClick) {
      onClick();
    }
  };

  const badgeColorMap = {
    orange: "bg-nyala-50 dark:bg-nyala-950/60 text-nyala-600 dark:text-nyala-400 border-nyala-200 dark:border-nyala-800",
    emerald: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    blue: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    slate: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700",
  };

  const isInteractive = Boolean(onClick || expandable);

  return (
    <div
      className={clsx(
        "rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-200 overflow-hidden",
        isInteractive && "hover:border-nyala-300 dark:hover:border-nyala-700 active:scale-[0.98] cursor-pointer",
        className
      )}
    >
      <div
        onClick={isInteractive ? handleClick : undefined}
        className={clsx(
          "flex items-center justify-between gap-3.5 sm:gap-4",
          dense ? "p-3 sm:p-4" : "p-4 sm:p-5"
        )}
      >
        {/* Leading Widget */}
        {leading && <div className="flex-shrink-0">{leading}</div>}

        {/* Title & Subtitle */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-sm sm:text-base font-bold text-navy-950 dark:text-white leading-snug tracking-tight">
              {title}
            </h2>
            {badge && (
              <span
                className={clsx(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold border",
                  badgeColorMap[badgeColor]
                )}
              >
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              {subtitle}
            </div>
          )}
        </div>

        {/* Trailing Widget / Caret */}
        <div className="flex-shrink-0 flex items-center gap-2">
          {trailing}
          {expandable ? (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-slate-400"
            >
              <CaretDown weight="bold" className="w-4 h-4" />
            </motion.div>
          ) : onClick ? (
            <CaretRight weight="bold" className="w-4 h-4 text-slate-400" />
          ) : null}
        </div>
      </div>

      {/* Expandable Accordion Body */}
      <AnimatePresence initial={false}>
        {expandable && isExpanded && expandedContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 p-4 sm:p-5"
          >
            {expandedContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
