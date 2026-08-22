"use client";

import React from "react";
import clsx from "clsx";

interface FlutterCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "elevated" | "outlined" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * FlutterCard - Permukaan kartu terstandarisasi bergaya Material 3 Elevation & Rounded Geometry.
 */
export default function FlutterCard({
  children,
  className,
  onClick,
  variant = "outlined",
  padding = "md",
}: FlutterCardProps) {
  const paddingMap = {
    none: "",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  const variantMap = {
    outlined:
      "bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-sm",
    elevated:
      "bg-white dark:bg-[#0F172A] border border-slate-100 dark:border-slate-800/80 shadow-md",
    filled:
      "bg-slate-50 dark:bg-[#1E293B]/70 border border-transparent",
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-2xl sm:rounded-3xl transition-all duration-200",
        variantMap[variant],
        paddingMap[padding],
        onClick &&
          "cursor-pointer hover:border-nyala-300 dark:hover:border-nyala-700 active:scale-[0.98]",
        className
      )}
    >
      {children}
    </div>
  );
}
