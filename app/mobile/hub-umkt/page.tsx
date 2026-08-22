"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Globe, 
  Newspaper, 
  Megaphone, 
  CalendarCheck, 
  Buildings, 
  ArrowClockwise, 
  MagnifyingGlass,
  ArrowRight,
  ArrowSquareOut
} from "@phosphor-icons/react";
import DuolingoCard from "@/components/flutter/DuolingoCard";
import { 
  UMKTBerita, 
  UMKTPengumuman, 
  UMKTEvent, 
  UMKTFakultas, 
  cleanHTML, 
  formatDateIndo,
  generateSlug
} from "@/lib/umkt-api";

export default function MobileHubUMKTPage() {
  const [activeTab, setActiveTab] = useState<string>("berita");
  const [search, setSearch] = useState("");
  const [beritaList, setBeritaList] = useState<UMKTBerita[]>([]);
  const [pengumumanList, setPengumumanList] = useState<UMKTPengumuman[]>([]);
  const [eventList, setEventList] = useState<UMKTEvent[]>([]);
  const [fakultasList, setFakultasList] = useState<UMKTFakultas[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/umkt-portal?type=all-hub");
      const data = await res.json();
      const payload = data.data || data.hub || {};
      if (payload) {
        setBeritaList(payload.berita || []);
        setPengumumanList(payload.pengumuman || []);
        setEventList(payload.event || []);
        setFakultasList(payload.fakultas || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const HUB_TABS = [
    { id: "berita", label: "Berita", count: beritaList.length, icon: Newspaper },
    { id: "pengumuman", label: "Pengumuman", count: pengumumanList.length, icon: Megaphone },
    { id: "event", label: "Agenda Event", count: eventList.length, icon: CalendarCheck },
    { id: "fakultas", label: "10 Fakultas", count: fakultasList.length, icon: Buildings },
  ];

  const filteredBerita = beritaList.filter((b) =>
    b.judul.toLowerCase().includes(search.toLowerCase()) || cleanHTML(b.isi).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      
      {/* ── 1. HEADER ── */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white tracking-tight">
          Hub Warta & 10 Fakultas
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Live feed berita terverifikasi humas dan pengumuman resmi kampus.
        </p>
      </div>

      {/* ── 2. SEARCH INPUT ── */}
      <div className="relative">
        <MagnifyingGlass weight="bold" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari berita atau pengumuman..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 text-xs text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-nyala-500 shadow-sm"
        />
      </div>

      {/* ── 3. DUOLINGO 3D TABS (CLEAN NON-TRUNCATED HORIZONTAL CARDS) ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
        {HUB_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap flex items-center gap-2 border-2 border-b-4 transition-all cursor-pointer ${
                isActive
                  ? "bg-nyala-600 text-white border-nyala-700 border-b-nyala-900 shadow-sm"
                  : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 border-b-slate-300 dark:border-b-slate-900 text-navy-950 dark:text-white hover:border-slate-300"
              }`}
            >
              <Icon weight={isActive ? "fill" : "bold"} className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── 4. TAB 1: BERITA KAMPUS (DEDICATED MOBILE LINKS) ── */}
      {activeTab === "berita" && (
        <div className="space-y-3">
          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400 font-medium">
              Memuat feed berita resmi UMKT...
            </div>
          ) : filteredBerita.length === 0 ? (
            <DuolingoCard variant="surface" padding="md" className="text-center text-xs text-slate-400">
              Tidak ada artikel yang cocok dengan pencarian.
            </DuolingoCard>
          ) : (
            filteredBerita.map((item, idx) => {
              const articleSlug = item.slug || generateSlug(item.judul, item.id);
              return (
                <Link
                  key={idx}
                  href={`/mobile/hub-umkt/${articleSlug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 space-y-2 select-none active:border-b-2 active:translate-y-0.5 transition-all block group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm group-hover:text-nyala-600 dark:group-hover:text-nyala-400 transition-colors leading-snug">
                      {item.judul}
                    </h3>
                    <div className="w-7 h-7 rounded-xl bg-nyala-500/10 dark:bg-nyala-500/20 text-nyala-600 dark:text-nyala-400 flex items-center justify-center flex-shrink-0 group-hover:bg-nyala-600 group-hover:text-white transition-colors">
                      <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cleanHTML(item.isi)}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-mono">
                    <span className="text-nyala-600 dark:text-nyala-400 font-bold">
                      {formatDateIndo(item.created || item.tanggal || undefined)}
                    </span>
                    <span className="text-slate-400">Humas UMKT</span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}

      {/* ── 5. TAB 2: PENGUMUMAN RESMI ── */}
      {activeTab === "pengumuman" && (
        <div className="space-y-3">
          {pengumumanList.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 space-y-2 select-none"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase border border-blue-200 dark:border-blue-900">
                  Pengumuman Resmi
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {formatDateIndo(item.created || item.tanggal || undefined)}
                </span>
              </div>

              <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm leading-snug">
                {item.judul}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {cleanHTML(item.isi)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── 6. TAB 3: EVENT & AGENDA ── */}
      {activeTab === "event" && (
        <div className="space-y-3">
          {eventList.map((ev, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 space-y-2 select-none"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 uppercase border border-amber-200 dark:border-amber-900">
                  Agenda Kampus
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {formatDateIndo(ev.created || ev.tanggal || undefined)}
                </span>
              </div>

              <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm leading-snug">
                {ev.judul}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {cleanHTML(ev.isi)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── 7. TAB 4: 10 FAKULTAS DIRECTORY ── */}
      {activeTab === "fakultas" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fakultasList.map((fak, idx) => {
            const facultyName = fak.nama_lembaga || fak.nama || `Fakultas ${idx + 1}`;
            const facultyLink = fak.url || fak.link;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 space-y-2 select-none"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-nyala-500/15 text-nyala-600 dark:text-nyala-400 flex items-center justify-center font-black text-xs">
                    {fak.singkatan || `F${idx + 1}`}
                  </div>
                  <h4 className="font-black text-xs text-navy-950 dark:text-white flex-1 leading-tight">
                    {facultyName}
                  </h4>
                </div>

                {fak.deskripsi && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {fak.deskripsi}
                  </p>
                )}

                {facultyLink && (
                  <a
                    href={facultyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-nyala-600 dark:text-nyala-400 font-bold flex items-center gap-1 hover:underline pt-1"
                  >
                    <span>Kunjungi Web Fakultas</span>
                    <ArrowSquareOut weight="bold" className="w-3 h-3" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
