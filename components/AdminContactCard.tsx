"use client";

import React, { useState, useEffect } from "react";
import { 
  WhatsappLogo, 
  Clock, 
  MapPin, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowSquareOut, 
  Headset, 
  Sparkle,
  Info
} from "@phosphor-icons/react";
import { OFFICIAL_CONTACTS, AdminContact } from "@/lib/masta-data";
import { useToast } from "@/context/ToastContext";

interface AdminContactCardProps {
  compact?: boolean;
  filterId?: string;
  contact?: AdminContact;
}

export default function AdminContactCard({ compact = false, filterId, contact }: AdminContactCardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);
  const [currentWitaTime, setCurrentWitaTime] = useState<string>("");
  const toast = useToast();

  useEffect(() => {
    const checkServiceHours = () => {
      const now = new Date();
      // WITA is UTC+8
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const witaDate = new Date(utc + 3600000 * 8);

      const day = witaDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
      const hour = witaDate.getHours();
      const minute = witaDate.getMinutes();
      const currentMinute = hour * 60 + minute;

      // Time string format: HH:mm WITA
      const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} WITA`;
      setCurrentWitaTime(timeStr);

      // Senin - Kamis (1, 2, 3, 4): 08.00 - 16.00 (480 - 960 min)
      // Jumat (5): 08.00 - 11.30 (480 - 690 min)
      if (day >= 1 && day <= 4) {
        setIsOpenNow(currentMinute >= 480 && currentMinute <= 960);
      } else if (day === 5) {
        setIsOpenNow(currentMinute >= 480 && currentMinute <= 690);
      } else {
        setIsOpenNow(false);
      }
    };

    checkServiceHours();
    const interval = setInterval(checkServiceHours, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (id: string, phone: string, name: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    toast.success(`Nomor ${name} berhasil disalin!`, "Kontak Tersalin");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const contactsToDisplay = contact 
    ? [contact]
    : filterId 
    ? OFFICIAL_CONTACTS.filter((c) => c.id === filterId)
    : OFFICIAL_CONTACTS;

  return (
    <div className="space-y-6">
      
      {/* Live Operational Status Banner */}
      <div className="p-4 rounded-2xl bg-white/70 dark:bg-navy-900/80 border border-navy-200/60 dark:border-navy-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isOpenNow ? "bg-emerald-500 animate-ping" : "bg-amber-500"}`} />
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black uppercase tracking-wider ${isOpenNow ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {isOpenNow ? "Layanan Offline Sedang Buka" : "Layanan Offline Sedang Tutup"}
              </span>
              <span className="text-[11px] text-navy-400 font-mono">({currentWitaTime})</span>
            </div>
            <p className="text-xs text-navy-600 dark:text-navy-300">
              Senin–Kamis (08.00–16.00 WITA) • Jumat (08.00–11.30 WITA)
            </p>
          </div>
        </div>

        <div className="text-[11px] font-medium px-2.5 py-1 rounded-xl bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300 self-end sm:self-auto">
          Gedung C Lt. 1 & Gedung Utama UMKT
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className={`grid grid-cols-1 ${compact ? "gap-4" : "md:grid-cols-2 gap-6"}`}>
        {contactsToDisplay.map((contact) => {
          const isCopied = copiedId === contact.id;

          return (
            <div
              key={contact.id}
              className="glass-card rounded-3xl p-5 sm:p-6 border border-navy-200/70 dark:border-navy-800 space-y-4 relative overflow-hidden shadow-lg hover:border-nyala-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold flex items-center gap-1.5">
                    <WhatsappLogo weight="fill" className="w-4 h-4 text-emerald-500" />
                    <span>{contact.badge}</span>
                  </span>
                  <span className="text-[11px] font-bold text-navy-400 dark:text-navy-500">
                    {contact.department}
                  </span>
                </div>

                {/* Name & Location */}
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-navy-900 dark:text-white">
                    {contact.name}
                  </h3>
                  <p className="text-xs text-navy-500 dark:text-navy-400 flex items-center gap-1.5 mt-1">
                    <MapPin weight="bold" className="w-3.5 h-3.5 text-nyala-500 flex-shrink-0" />
                    <span>{contact.location}</span>
                  </p>
                </div>

                {/* Operational Hours List */}
                <div className="p-3 rounded-2xl bg-navy-50 dark:bg-navy-950/60 border border-navy-100 dark:border-navy-800/80 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-navy-700 dark:text-navy-300 font-bold mb-1">
                    <Clock weight="bold" className="w-3.5 h-3.5 text-nyala-500" />
                    <span>Jadwal Operasional Pelayanan:</span>
                  </div>
                  {contact.operationalHours.map((h, i) => (
                    <div key={i} className="flex justify-between text-[11px] text-navy-600 dark:text-navy-400">
                      <span>{h.days}</span>
                      <span className="font-mono font-semibold">{h.time}</span>
                    </div>
                  ))}
                </div>

                {/* Services Scope */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-navy-400 uppercase tracking-wider block">
                    Cakupan Bantuan:
                  </span>
                  <ul className="text-xs text-navy-600 dark:text-navy-300 space-y-1 list-disc list-inside">
                    {contact.services.map((svc, i) => (
                      <li key={i} className="leading-tight">{svc}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Buttons (WhatsApp Direct & Copy Number) */}
              <div className="pt-3 border-t border-navy-100 dark:border-navy-800 flex flex-col sm:flex-row items-center gap-2">
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <WhatsappLogo weight="fill" className="w-4 h-4" />
                  <span>Chat WhatsApp ({contact.whatsappFormatted})</span>
                  <ArrowSquareOut weight="bold" className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  onClick={() => handleCopy(contact.id, contact.whatsappFormatted, contact.name)}
                  className="w-full sm:w-auto p-2.5 px-3 rounded-xl bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 dark:hover:bg-navy-700 text-navy-700 dark:text-navy-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  title="Salin Nomor WhatsApp"
                >
                  {isCopied ? (
                    <>
                      <Check weight="bold" className="w-4 h-4 text-emerald-500" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy weight="bold" className="w-4 h-4" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
