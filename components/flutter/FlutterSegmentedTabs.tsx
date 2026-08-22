"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export interface FlutterTabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string; weight?: any }>;
  badge?: string | number;
}

interface FlutterSegmentedTabsProps {
  tabs: FlutterTabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pill" | "chips" | "compact";
  layoutId?: string;
}

/**
 * FlutterSegmentedTabs - Tab segmentasi bergaya Cupertino/Material 3 Pill Selector.
 * Menggantikan scroll panjang tak berujung dengan pergantian view 1-tap instan dan animasi pegas halus.
 */
export default function FlutterSegmentedTabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "pill",
  layoutId = "flutter-tab-indicator",
}: FlutterSegmentedTabsProps) {
  return (
    <div
      className={clsx(
        "w-full flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 overflow-x-auto no-scrollbar",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "relative flex-1 min-w-max py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 select-none active:scale-[0.97]",
              isActive
                ? "text-nyala-600 dark:text-nyala-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white"
            )}
          >
            {/* Sliding Spring Active Indicator */}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 32,
                }}
                className="absolute inset-0 bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 z-0"
              />
            )}

            {/* Tab Content */}
            <span className="relative z-10 flex items-center gap-1.5">
              {Icon && (
                <Icon
                  weight={isActive ? "fill" : "regular"}
                  className={clsx(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-nyala-500" : "text-slate-400"
                  )}
                />
              )}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={clsx(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold leading-none",
                    isActive
                      ? "bg-nyala-100 dark:bg-nyala-950/80 text-nyala-600 dark:text-nyala-400"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
