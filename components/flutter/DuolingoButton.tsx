"use client";

import React from "react";
import { Icon } from "@phosphor-icons/react";

interface DuolingoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "emerald" | "sky" | "amber" | "surface" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: Icon;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function DuolingoButton({
  variant = "primary",
  size = "md",
  icon: IconComponent,
  fullWidth = false,
  className = "",
  children,
  ...props
}: DuolingoButtonProps) {
  const sizeClasses = {
    sm: "px-3.5 py-2 text-xs rounded-xl",
    md: "px-5 py-3 text-xs sm:text-sm rounded-2xl",
    lg: "px-6 py-4 text-sm sm:text-base rounded-2xl",
  }[size];

  const variantClasses = {
    primary: "duo-btn-primary",
    emerald: "duo-btn-emerald",
    sky: "duo-btn-sky",
    amber: "duo-btn-amber",
    surface: "duo-btn-surface",
    danger: "bg-rose-500 hover:bg-rose-400 text-white font-black border-2 border-rose-600 border-b-4 border-b-rose-800 active:border-b-2 active:translate-y-0.5 rounded-2xl",
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-black tracking-wide select-none ${sizeClasses} ${variantClasses} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {IconComponent && <IconComponent weight="bold" className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
