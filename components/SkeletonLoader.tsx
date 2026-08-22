"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rect" | "circle" | "card" | "chat" | "timeline" | "berita" | "faculty";
  lines?: number;
  count?: number;
}

export const SHIMMER_BASE =
  "relative overflow-hidden bg-slate-200/70 dark:bg-slate-800/80 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent";

export default function SkeletonLoader({
  className = "",
  variant = "rect",
  lines,
  count,
}: SkeletonProps) {
  const lineCount = count ?? lines ?? 3;

  if (variant === "circle") {
    return <div className={`rounded-full ${SHIMMER_BASE} ${className}`} />;
  }

  if (variant === "text") {
    return (
      <div className={`space-y-2 w-full ${className}`}>
        {Array.from({ length: lineCount }).map((_, i) => (
          <div
            key={i}
            className={`h-3.5 rounded-lg ${SHIMMER_BASE} ${
              i === lineCount - 1 ? "w-3/4" : "w-full"
            }`}
          />
        ))}
      </div>
    );
  }

  if (variant === "chat") {
    return (
      <div className={`flex items-start gap-3 w-full max-w-md ${className}`}>
        <div className={`w-8 h-8 rounded-full flex-shrink-0 ${SHIMMER_BASE}`} />
        <div className="flex-1 space-y-2 p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800">
          <div className={`h-3.5 w-1/3 rounded-md ${SHIMMER_BASE}`} />
          <div className={`h-3 rounded-md ${SHIMMER_BASE} w-full`} />
          <div className={`h-3 rounded-md ${SHIMMER_BASE} w-5/6`} />
        </div>
      </div>
    );
  }

  if (variant === "berita") {
    return (
      <div
        className={`rounded-3xl overflow-hidden bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 space-y-3 p-0 ${className}`}
      >
        <div className={`aspect-video w-full ${SHIMMER_BASE}`} />
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className={`h-3 w-20 rounded-md ${SHIMMER_BASE}`} />
            <div className={`h-3 w-16 rounded-md ${SHIMMER_BASE}`} />
          </div>
          <div className={`h-4 w-full rounded-md ${SHIMMER_BASE}`} />
          <div className={`h-4 w-4/5 rounded-md ${SHIMMER_BASE}`} />
          <div className={`h-3 w-full rounded-md ${SHIMMER_BASE}`} />
          <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <div className={`h-3 w-24 rounded-md ${SHIMMER_BASE}`} />
            <div className={`h-3 w-16 rounded-md ${SHIMMER_BASE}`} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`p-5 rounded-3xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 space-y-4 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${SHIMMER_BASE}`} />
          <div className="space-y-2 flex-1">
            <div className={`h-4 w-1/2 rounded-md ${SHIMMER_BASE}`} />
            <div className={`h-3 w-1/3 rounded-md ${SHIMMER_BASE}`} />
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <div className={`h-3 rounded-md ${SHIMMER_BASE} w-full`} />
          <div className={`h-3 rounded-md ${SHIMMER_BASE} w-4/5`} />
        </div>
      </div>
    );
  }

  return <div className={`rounded-2xl ${SHIMMER_BASE} ${className}`} />;
}

export function BeritaSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonLoader key={`skel-berita-${i}`} variant="berita" />
      ))}
    </div>
  );
}
