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
  ArrowRight
} from "@phosphor-icons/react";
import { 
  UMKTBerita, 
  UMKTPengumuman, 
  UMKTEvent, 
  UMKTFakultas, 
  cleanHTML, 
  formatDateIndo 
} from "@/lib/umkt-api";

export default function MobileHubUMKTPage() {
  const [activeTab, setActiveTab] = useState<"berita" | "pengumuman" | "event" | "fakultas">("berita");
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

  const filteredBerita = beritaList.filter((b) =>
    b.judul.toLowerCase().includes(search.toLowerCase()) || cleanHTML(b.isi).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white">Hub Warta & 10 Fakultas</h1>
        <p className="text-xs text-navy-600 dark:text-navy-300">Live feed berita terverifikasi humas dan pengumuman kampus.</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <MagnifyingGlass weight="bold" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari berita atau pengumuman..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200 dark:border-navy-800 text-xs text-navy-950 dark:text-white placeholder:text-navy-400 outline-none focus:border-nyala-500"
        />
      </div>

      {/* Horizontal Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-navy-100/80 dark:bg-[#0E1635] border border-navy-200 dark:border-navy-800 overflow-x-auto scrollbar-none">
        {[
          { id: "berita", label: "Berita", count: beritaList.length, icon: Newspaper },
          { id: "pengumuman", label: "Pengumuman", count: pengumumanList.length, icon: Megaphone },
          { id: "event", label: "Event", count: eventList.length, icon: CalendarCheck },
          { id: "fakultas", label: "10 Fakultas", count: fakultasList.length, icon: Buildings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-nyala-600 text-white shadow-sm"
                  : "text-navy-600 dark:text-navy-400 hover:text-navy-950 dark:hover:text-white"
              }`}
            >
              <Icon weight={isActive ? "fill" : "bold"} className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Stream */}
      {loading ? (
        <div className="py-12 text-center text-xs text-navy-500 dark:text-navy-400 font-mono">
          Menyinkronkan feed API kampus...
        </div>
      ) : (
        <div className="space-y-3">
          {activeTab === "berita" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredBerita.slice(0, 10).map((b) => (
                <div key={b.id} className="p-4 rounded-3xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-2">
                  {b.foto && (
                    <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-navy-100 dark:bg-navy-950">
                      <img src={b.foto} alt={b.judul} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <span className="text-[10px] text-navy-500 dark:text-navy-400 font-mono block">{formatDateIndo(b.tgl_upload)}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white leading-snug">{b.judul}</h4>
                  <p className="text-[11px] text-navy-600 dark:text-navy-300 line-clamp-2 leading-relaxed">{cleanHTML(b.isi)}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "pengumuman" && (
            <div className="space-y-2.5">
              {pengumumanList.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-1.5">
                  <span className="text-[10px] text-nyala-600 dark:text-nyala-400 font-mono font-bold">{formatDateIndo(p.tgl_upload)}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white">{p.judul}</h4>
                  <p className="text-[11px] text-navy-600 dark:text-navy-300 line-clamp-2">{cleanHTML(p.isi)}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "event" && (
            <div className="space-y-2.5">
              {eventList.map((e) => (
                <div key={e.id} className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-1.5">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">{formatDateIndo(e.tgl_upload)}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white">{e.judul}</h4>
                  <p className="text-[11px] text-navy-600 dark:text-navy-300 line-clamp-2">{cleanHTML(e.isi)}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "fakultas" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {fakultasList.map((f) => (
                <div key={f.id} className="p-4 rounded-2xl bg-white dark:bg-[#0E1635] border border-navy-200/80 dark:border-navy-800 shadow-sm space-y-1">
                  <span className="text-[10px] text-nyala-600 dark:text-nyala-400 font-bold block">{f.singkatan || "FAKULTAS"}</span>
                  <h4 className="text-xs font-bold text-navy-950 dark:text-white leading-tight">{f.nama}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
