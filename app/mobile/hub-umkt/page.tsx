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
import FlutterCard from "@/components/flutter/FlutterCard";
import FlutterSegmentedTabs from "@/components/flutter/FlutterSegmentedTabs";
import FlutterListTile from "@/components/flutter/FlutterListTile";
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
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-xs text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-nyala-500 shadow-sm"
        />
      </div>

      {/* ── 3. SEGMENTED TABS ── */}
      <FlutterSegmentedTabs
        tabs={HUB_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* ── 4. TAB 1: BERITA KAMPUS ── */}
      {activeTab === "berita" && (
        <div className="space-y-3">
          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400 font-medium">
              Memuat feed berita resmi UMKT...
            </div>
          ) : filteredBerita.length === 0 ? (
            <FlutterCard variant="outlined" className="text-center p-6 text-xs text-slate-400">
              Tidak ada artikel yang cocok dengan pencarian.
            </FlutterCard>
          ) : (
            filteredBerita.map((item, idx) => (
              <FlutterListTile
                key={idx}
                title={item.judul}
                subtitle={
                  <span className="space-y-1 block mt-1">
                    <span className="line-clamp-2 text-slate-500 dark:text-slate-400">
                      {cleanHTML(item.isi)}
                    </span>
                    <span className="text-[10px] text-nyala-500 font-mono font-semibold block">
                      {formatDateIndo(item.created || item.tanggal || undefined)}
                    </span>
                  </span>
                }
                trailing={
                  item.slug ? (
                    <a
                      href={`/blog/${item.slug}`}
                      className="w-8 h-8 rounded-xl bg-nyala-50 dark:bg-nyala-950/80 text-nyala-500 flex items-center justify-center"
                    >
                      <ArrowRight weight="bold" className="w-4 h-4" />
                    </a>
                  ) : null
                }
              />
            ))
          )}
        </div>
      )}

      {/* ── 5. TAB 2: PENGUMUMAN RESMI ── */}
      {activeTab === "pengumuman" && (
        <div className="space-y-3">
          {pengumumanList.map((item, idx) => (
            <FlutterListTile
              key={idx}
              title={item.judul}
              subtitle={
                <span className="space-y-1 block mt-1">
                  <span className="line-clamp-2 text-slate-500 dark:text-slate-400">
                    {cleanHTML(item.isi)}
                  </span>
                  <span className="text-[10px] text-blue-500 font-mono font-semibold block">
                    {formatDateIndo(item.created || item.tanggal || undefined)}
                  </span>
                </span>
              }
              badge="Pengumuman"
              badgeColor="blue"
            />
          ))}
        </div>
      )}

      {/* ── 6. TAB 3: EVENT & AGENDA ── */}
      {activeTab === "event" && (
        <div className="space-y-3">
          {eventList.map((ev, idx) => (
            <FlutterListTile
              key={idx}
              title={ev.judul}
              subtitle={
                <span className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>📅 {formatDateIndo(ev.tgl_event || ev.tanggal || ev.created || undefined)}</span>
                </span>
              }
              badge="Event Kampus"
              badgeColor="emerald"
            />
          ))}
        </div>
      )}

      {/* ── 7. TAB 4: DIREKTORI 10 FAKULTAS ── */}
      {activeTab === "fakultas" && (
        <div className="space-y-2">
          {fakultasList.map((fak, idx) => (
            <FlutterListTile
              key={idx}
              dense
              title={fak.nama || fak.nama_lembaga || "Fakultas UMKT"}
              subtitle={
                <span className="text-xs text-slate-500">
                  {fak.deskripsi || fak.keterangan || "Fakultas Resmi Universitas Muhammadiyah Kalimantan Timur"}
                </span>
              }
              trailing={
                fak.url || fak.link ? (
                  <a
                    href={fak.url || fak.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-nyala-500"
                  >
                    <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
                  </a>
                ) : null
              }
            />
          ))}
        </div>
      )}

    </div>
  );
}
