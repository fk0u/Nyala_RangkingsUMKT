"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Check, ShieldCheck, X } from "@phosphor-icons/react";
import { useToast } from "@/context/ToastContext";

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const consent = localStorage.getItem("nyala_cookie_consent_v1");
    if (!consent) {
      // Delay slightly for smooth non-blocking entry
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("nyala_cookie_consent_v1", "accepted");
    document.cookie = "nyala_cookie_consent=accepted; path=/; max-age=31536000; SameSite=Lax";
    setIsOpen(false);
    toast.success("Preferensi cookies & data lokal berhasil disimpan!", "Penyimpanan Aktif");
  };

  const handleDecline = () => {
    localStorage.setItem("nyala_cookie_consent_v1", "essential_only");
    document.cookie = "nyala_cookie_consent=essential; path=/; max-age=31536000; SameSite=Lax";
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 sm:p-5 rounded-3xl bg-white dark:bg-navy-900 text-navy-950 dark:text-white border border-navy-200 dark:border-navy-800 shadow-2xl shadow-navy-950/20 backdrop-blur-2xl"
        >
          <div className="space-y-3">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <Cookie weight="fill" className="w-5 h-5" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold leading-tight">
                    Persetujuan Cookies & Data Lokal
                  </h4>
                  <button
                    onClick={handleDecline}
                    className="text-navy-400 hover:text-navy-700 dark:hover:text-white"
                  >
                    <X weight="bold" className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
                  Nyala menggunakan penyimpanan lokal untuk menyimpan identitas prodi, checklist berkas, dan tema pilihanmu agar pengalaman orientasi berjalan lancar.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-navy-100 dark:border-navy-800">
              <button
                type="button"
                onClick={handleDecline}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors cursor-pointer"
              >
                Esensial Saja
              </button>

              <button
                type="button"
                onClick={handleAccept}
                className="px-4 py-1.5 rounded-xl bg-nyala-600 hover:bg-nyala-500 text-white text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check weight="bold" className="w-3.5 h-3.5" />
                <span>Setujui Semua</span>
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
