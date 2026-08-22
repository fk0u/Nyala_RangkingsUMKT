"use client";

import React from "react";

interface DuolingoCardProps {
  children: React.ReactNode;
  variant?: "surface" | "primary" | "emerald" | "sky" | "amber";
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
  interactive?: boolean;
}

export default function DuolingoCard({
  children,
  variant = "surface",
  className = "",
  padding = "md",
  onClick,
  interactive = false,
}: DuolingoCardProps) {
  const paddingClasses = {
    none: "p-0",
    sm: "p-3.5",
    md: "p-4 sm:p-5",
    lg: "p-6 sm:p-7",
  }[padding];

  const variantClasses = {
    surface: "duo-card text-navy-950 dark:text-white",
    primary: "bg-gradient-to-br from-nyala-500 to-nyala-600 border-2 border-nyala-600 border-b-4 border-b-nyala-800 text-white rounded-3xl",
    emerald: "bg-gradient-to-br from-emerald-500 to-emerald-600 border-2 border-emerald-600 border-b-4 border-b-emerald-800 text-white rounded-3xl",
    sky: "bg-gradient-to-br from-sky-500 to-sky-600 border-2 border-sky-600 border-b-4 border-b-sky-800 text-white rounded-3xl",
    amber: "bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-amber-600 border-b-4 border-b-amber-800 text-white rounded-3xl",
  }[variant];

  const isClickable = interactive || !!onClick;

  return (
    <div
      onClick={onClick}
      className={`${variantClasses} ${paddingClasses} ${
        isClickable ? "cursor-pointer active:border-b-2 active:translate-y-0.5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
