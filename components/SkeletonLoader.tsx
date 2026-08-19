"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rect" | "circle" | "card" | "chat" | "timeline";
  lines?: number;
}

export default function SkeletonLoader({
  className = "",
  variant = "rect",
  lines = 3,
}: SkeletonProps) {
  // Base shimmering effect class
  const shimmer =
    "relative overflow-hidden bg-navy-200/50 dark:bg-navy-800/60 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/10 before:to-transparent";

  if (variant === "circle") {
    return <div className={`rounded-full ${shimmer} ${className}`} />;
  }

  if (variant === "text") {
    return (
      <div className={`space-y-2 w-full ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-3.5 rounded-lg ${shimmer} ${
              i === lines - 1 ? "w-3/4" : "w-full"
            }`}
          />
        ))}
      </div>
    );
  }

  if (variant === "chat") {
    return (
      <div className={`flex items-start gap-3 w-full max-w-md ${className}`}>
        <div className={`w-8 h-8 rounded-full flex-shrink-0 ${shimmer}`} />
        <div className="flex-1 space-y-2 p-4 rounded-2xl bg-cream-100/60 dark:bg-navy-800/50 border border-amber-200/40 dark:border-navy-700/50">
          <div className={`h-3.5 w-1/3 rounded-md ${shimmer}`} />
          <div className={`h-3 rounded-md ${shimmer} w-full`} />
          <div className={`h-3 rounded-md ${shimmer} w-5/6`} />
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`p-6 rounded-3xl glass-card border border-navy-100 dark:border-navy-800 space-y-4 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${shimmer}`} />
          <div className="space-y-2 flex-1">
            <div className={`h-4 w-1/2 rounded-md ${shimmer}`} />
            <div className={`h-3 w-1/3 rounded-md ${shimmer}`} />
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <div className={`h-3 rounded-md ${shimmer} w-full`} />
          <div className={`h-3 rounded-md ${shimmer} w-4/5`} />
        </div>
      </div>
    );
  }

  return <div className={`rounded-2xl ${shimmer} ${className}`} />;
}
