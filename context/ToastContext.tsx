"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from "lucide-react";

export type ToastType = "success" | "info" | "warning" | "nyala";

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string, duration?: number) => void;
  success: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  nyala: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", title?: string, duration: number = 3200) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const newToast: ToastMessage = { id, message, type, title, duration };

      setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts on screen

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const success = useCallback((msg: string, title?: string) => showToast(msg, "success", title), [showToast]);
  const info = useCallback((msg: string, title?: string) => showToast(msg, "info", title), [showToast]);
  const warning = useCallback((msg: string, title?: string) => showToast(msg, "warning", title), [showToast]);
  const nyala = useCallback((msg: string, title?: string) => showToast(msg, "nyala", title), [showToast]);

  const getIcon = (type?: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case "nyala":
        return <Sparkles className="w-5 h-5 text-nyala-500 animate-pulse" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, success, info, warning, nyala }}>
      {children}

      {/* Floating Toasts Viewport */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="pointer-events-auto flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border border-navy-200/80 dark:border-navy-700/80 shadow-2xl text-navy-900 dark:text-white"
            >
              <div className="flex-shrink-0 mt-0.5">{getIcon(toast.type)}</div>
              <div className="flex-1 text-left pr-2">
                {toast.title && <h5 className="text-xs font-bold leading-tight mb-0.5">{toast.title}</h5>}
                <p className="text-xs text-navy-600 dark:text-navy-300 leading-snug">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 p-1 text-navy-400 hover:text-navy-700 dark:hover:text-white rounded-lg transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
