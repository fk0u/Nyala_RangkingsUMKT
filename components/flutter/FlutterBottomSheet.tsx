"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import clsx from "clsx";

interface FlutterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
}

/**
 * FlutterBottomSheet - Modal bottom sheet interaktif bergaya Cupertino / Material 3.
 * Mengizinkan pengguna membaca informasi mendalam tanpa harus berpindah halaman atau kehilangan konteks.
 */
export default function FlutterBottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxHeight = "max-h-[85vh]",
  className,
}: FlutterBottomSheetProps) {
  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Bottom Sheet Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className={clsx(
              "relative w-full max-w-2xl bg-white dark:bg-[#0E1635] rounded-t-3xl sm:rounded-t-[32px] border-t border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden pb-safe z-10",
              maxHeight,
              className
            )}
          >
            {/* Drag Handle Bar */}
            <div className="w-full pt-3 pb-2 flex justify-center items-center cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* Sheet Header */}
            {(title || subtitle) && (
              <div className="px-5 sm:px-6 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
                <div className="min-w-0 flex-1 pr-3">
                  {title && (
                    <h3 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white truncate">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {subtitle}
                    </p>
                  )}
                </div>

                <button
                  onClick={onClose}
                  aria-label="Tutup"
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white flex items-center justify-center transition-colors active:scale-95 flex-shrink-0"
                >
                  <X weight="bold" className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Sheet Content (Scrollable) */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 overscroll-contain no-scrollbar space-y-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
