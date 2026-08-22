"use client";

import React from "react";
import { Icon } from "@phosphor-icons/react";

export interface DuolingoTabItem {
  id: string;
  label: string;
  icon?: Icon;
  badge?: string | number;
}

interface DuolingoSegmentedTabsProps {
  tabs: DuolingoTabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  gridCols?: number;
}

export default function DuolingoSegmentedTabs({
  tabs,
  activeTab,
  onChange,
  className = "",
  gridCols,
}: DuolingoSegmentedTabsProps) {
  const dynamicCols = gridCols 
    ? `grid-cols-${gridCols}` 
    : tabs.length <= 4 
      ? `grid-cols-${tabs.length}` 
      : "grid-cols-2 sm:grid-cols-4";

  return (
    <div className={`grid gap-2 w-full select-none ${dynamicCols} ${className}`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`px-3 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isActive
                ? "bg-nyala-500 text-white border-2 border-nyala-600 border-b-4 border-b-nyala-800 translate-y-0 shadow-sm"
                : "bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 active:border-b-2 active:translate-y-0.5"
            }`}
          >
            {Icon && (
              <Icon
                weight={isActive ? "fill" : "bold"}
                className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400"}`}
              />
            )}
            <span className="truncate">{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono font-bold ml-1 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
