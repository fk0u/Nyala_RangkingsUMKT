"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Headset, ShieldCheck, Sparkle } from "@phosphor-icons/react";
import AdminContactCard from "./AdminContactCard";

interface AdminHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminHelpModal({ isOpen, onClose }: AdminHelpModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-navy-900 border border-navy-200/80 dark:border-navy-800 shadow-2xl p-6 sm:p-8 space-y-6 z-10"
          >
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-navy-100 dark:border-navy-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
                  <Headset weight="bold" className="w-3.5 h-3.5" />
                  <span>Pusat Layanan & Kontak Admin Resmi</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 dark:text-white">
                  Hubungi Admin Universitas Muhammadiyah Kalimantan Timur
                </h2>
                <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300">
                  Perlu bantuan langsung terkait registrasi, KRS, izin MASTA, atau beasiswa? Terhubung langsung dengan tim administrasi resmi UMKT.
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-2xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 dark:hover:bg-navy-700 text-navy-600 dark:text-navy-300 transition-colors"
                title="Tutup Modal"
              >
                <X weight="bold" className="w-5 h-5" />
              </button>
            </div>

            {/* Contact Cards */}
            <AdminContactCard />

            {/* Footer Advice */}
            <div className="p-4 rounded-2xl bg-nyala-50 dark:bg-nyala-950/20 border border-nyala-200/60 dark:border-nyala-900/40 text-xs text-navy-700 dark:text-navy-300 flex items-start gap-3">
              <ShieldCheck weight="duotone" className="w-5 h-5 text-nyala-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-navy-900 dark:text-white block">
                  Etika Komunikasi Resmi Mahasiswa:
                </span>
                <p className="text-[11px] leading-relaxed">
                  Harap mengirimkan pesan pada jam operasional kerja resmi. Awali dengan salam, cantumkan Nama Lengkap, NIM (atau Nomor Registrasi), dan jelaskan permohonan secara santun.
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
