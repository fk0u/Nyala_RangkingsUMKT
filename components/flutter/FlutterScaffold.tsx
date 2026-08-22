"use client";

import React from "react";
import clsx from "clsx";

interface FlutterScaffoldProps {
  children: React.ReactNode;
  appBar?: React.ReactNode;
  bottomNavigationBar?: React.ReactNode;
  floatingActionButton?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  hasBottomPadding?: boolean;
}

/**
 * FlutterScaffold - Fondasi layout bergaya Flutter Scaffold.
 * Mengelola struktur App Bar, Body dengan Safe-Area Inset, dan Bottom Navigation Bar.
 */
export default function FlutterScaffold({
  children,
  appBar,
  bottomNavigationBar,
  floatingActionButton,
  className,
  bodyClassName,
  hasBottomPadding = true,
}: FlutterScaffoldProps) {
  return (
    <div
      className={clsx(
        "min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0B1120] text-navy-900 dark:text-white transition-colors duration-200 selection:bg-nyala-500 selection:text-white relative",
        className
      )}
    >
      {/* 1. App Bar (Sticky / Sliver) */}
      {appBar && <div className="sticky top-0 z-40 w-full">{appBar}</div>}

      {/* 2. Main Body Content */}
      <main
        className={clsx(
          "flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6",
          hasBottomPadding && "pb-28 sm:pb-32",
          bodyClassName
        )}
      >
        {children}
      </main>

      {/* 3. Floating Action Button (FAB) */}
      {floatingActionButton && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40">
          {floatingActionButton}
        </div>
      )}

      {/* 4. Bottom Navigation Bar / Dock */}
      {bottomNavigationBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-lg mx-auto px-4 pb-safe">
            {bottomNavigationBar}
          </div>
        </div>
      )}
    </div>
  );
}
