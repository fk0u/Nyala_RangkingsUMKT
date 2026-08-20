"use client";

import React, { useState } from "react";
import { 
  BookOpenText, 
  Compass, 
  Target, 
  Handshake, 
  GraduationCap, 
  CaretDown,
  Sparkle
} from "@phosphor-icons/react";
import { MASTA_FAQS } from "@/lib/masta-data";
import MascotFlame from "@/components/MascotFlame";

export default function MobileTentangMastaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white">Masa Ta’aruf (MASTA) 2026</h1>
        <p className="text-xs text-navy-600 dark:text-navy-300">Pengenalan nilai Al-Islam Kemuhammadiyahan dan etika akademik.</p>
      </div>

      {/* Intro Card with Mascot */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <MascotFlame size="sm" mood="cheering" className="w-8 h-8 flex-shrink-0" />
          <h3 className="text-sm sm:text-base font-black text-navy-950 dark:text-white">Orientasi Tanpa Perpeloncoan</h3>
        </div>
        <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 leading-relaxed">
          MASTA UMKT berfokus pada adaptasi kultur perguruan tinggi, integritas moral, serta penanaman karakter Islami dan berkemajuan.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wider">3 Fokus Pembinaan:</h3>
        <div className="space-y-2">
          {[
            { title: "1. Adaptasi Kampus", desc: "Metode belajar mandiri dan penggunaan sistem informasi SIAKAD.", icon: Compass },
            { title: "2. Pembentukan Karakter", desc: "Kejujuran akademik, etika pergaulan, dan penguatan nilai AIK.", icon: Target },
            { title: "3. Pengembangan Potensi", desc: "Organisasi kemahasiswaan, riset, dan prestasi penalaran.", icon: GraduationCap },
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-1">
                <div className="flex items-center gap-2">
                  <Icon weight="bold" className="w-4 h-4 text-nyala-600 dark:text-nyala-400" />
                  <h4 className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white">{p.title}</h4>
                </div>
                <p className="text-[11px] text-navy-600 dark:text-navy-300 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-navy-500 dark:text-navy-400 uppercase tracking-wider">FAQ Pertanyaan Umum:</h3>
        <div className="space-y-2">
          {MASTA_FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-2">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left gap-2 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white leading-snug">{faq.question}</span>
                  <CaretDown weight="bold" className={`w-3.5 h-3.5 text-navy-400 transition-transform ${isOpen ? "rotate-180 text-nyala-600 dark:text-nyala-400" : ""}`} />
                </button>
                {isOpen && (
                  <p className="text-[11px] text-navy-600 dark:text-navy-300 leading-relaxed pt-2 border-t border-navy-100 dark:border-navy-800/80">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
