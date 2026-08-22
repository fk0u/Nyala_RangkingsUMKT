"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";
import clsx from "clsx";

interface FlutterAppBarProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  transparent?: boolean;
}

/**
 * FlutterAppBar - Header aplikasi native bergaya Flutter Sliver/AppBar (Material 3 & Cupertino).
 * Translucent glassmorphism, tombol back otomatis, dan container action buttons.
 */
export default function FlutterAppBar({
  title,
  subtitle,
  showBackButton = false,
  onBack,
  leading,
  actions,
  className,
  transparent = false,
}: FlutterAppBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      className={clsx(
        "w-full transition-all duration-200",
        !transparent &&
          "bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Leading / Back Button */}
        <div className="flex items-center gap-3 min-w-0">
          {showBackButton ? (
            <button
              onClick={handleBack}
              aria-label="Kembali"
              className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-nyala-50 dark:hover:bg-nyala-950/40 text-navy-800 dark:text-slate-200 hover:text-nyala-500 transition-all flex items-center justify-center active:scale-95 flex-shrink-0"
            >
              <CaretLeft weight="bold" className="w-5 h-5" />
            </button>
          ) : leading ? (
            <div className="flex-shrink-0">{leading}</div>
          ) : null}

          {/* Title & Subtitle */}
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white truncate leading-tight tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {actions && (
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
