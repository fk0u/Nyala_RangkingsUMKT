"use client";

import React, { useState, useEffect } from "react";
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
import DuolingoSegmentedTabs from "@/components/flutter/DuolingoSegmentedTabs";
import { 
  UMKTBerita, 
  UMKTPengumuman, 
  UMKTEvent, 
  UMKTFakultas, 
  cleanHTML, 
  formatDateIndo 
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
    { id: "berita", label: "Berita", icon: Newspaper, badge: beritaList.length || undefined },
    { id: "pengumuman", label: "Pengumuman", icon: Megaphone, badge: pengumumanList.length || undefined },
    { id: "event", label: "Event", icon: CalendarCheck, badge: eventList.length || undefined },
    { id: "fakultas", label: "10 Fakultas", icon: Buildings, badge: fakultasList.length || undefined },
  ];

  const filteredBerita = beritaList.filter((b) =>
    b.judul.toLowerCase().includes(search.toLowerCase()) || cleanHTML(b.isi).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      
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

      {/* ── 3. DUOLINGO 3D SEGMENTED TABS ── */}
      <DuolingoSegmentedTabs
        tabs={HUB_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        gridCols={4}
      />

      {/* ── 4. TAB 1: BERITA KAMPUS ── */}
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
            filteredBerita.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 space-y-2 select-none"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm">
                    {item.judul}
                  </h3>
                  {item.slug && (
                    <a
                      href={`/blog/${item.slug}`}
                      className="p-1.5 rounded-xl bg-nyala-500 text-white flex-shrink-0"
                    >
                      <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                  {cleanHTML(item.isi)}
                </p>

                <span className="text-[10px] text-nyala-500 font-mono font-bold block">
                  {formatDateIndo(item.created || item.tanggal || undefined)}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── 5. TAB 2: PENGUMUMAN RESMI ── */}
      {activeTab === "pengumuman" && (
        <div className="space-y-3">
          {pengumumanList.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 uppercase">
                  Pengumuman Resmi
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {formatDateIndo(item.created || item.tanggal || undefined)}
                </span>
              </div>

              <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm">
                {item.judul}
              </h3>

              <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
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
              className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 uppercase">
                  Agenda Kampus
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  📅 {formatDateIndo(ev.tgl_event || ev.tanggal || ev.created || undefined)}
                </span>
              </div>

              <h3 className="font-black text-navy-950 dark:text-white text-xs sm:text-sm">
                {ev.judul}
              </h3>
            </div>
          ))}
        </div>
      )}

      {/* ── 7. TAB 4: DIREKTORI 10 FAKULTAS ── */}
      {activeTab === "fakultas" && (
        <div className="space-y-2">
          {fakultasList.map((fak, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 dark:border-b-slate-900 flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <h3 className="font-black text-navy-950 dark:text-white text-xs">
                  {fak.nama || fak.nama_lembaga || "Fakultas UMKT"}
                </h3>
                <p className="text-[10px] text-slate-500">
                  {fak.deskripsi || fak.keterangan || "Fakultas Resmi Universitas Muhammadiyah Kalimantan Timur"}
                </p>
              </div>

              {fak.url || fak.link ? (
                <a
                  href={fak.url || fak.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl duo-btn-surface flex-shrink-0"
                >
                  <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
                </a>
              ) : null}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
