/**
 * UN Sustainable Development Goals (SDGs) Data Definition for UMKT
 * Official UN Color Hexes, Titles, and Nyala/UMKT Implementation Context
 */

export interface SDGInfo {
  id: number;
  code: string;
  nameIndo: string;
  nameEng: string;
  color: string;
  icon: string; // Emoji or Lucide/Phosphor representation
  description: string;
  umktImplementation: string;
}

export const OFFICIAL_SDGS: { [key: number]: SDGInfo } = {
  4: {
    id: 4,
    code: "SDG 4",
    nameIndo: "Pendidikan Berkualitas",
    nameEng: "Quality Education",
    color: "#C5192D",
    icon: "🎓",
    description: "Menjamin pendidikan inklusif, merata, dan berkualitas bagi semua.",
    umktImplementation: "Aksesibilitas panduan SIKAD, kurikulum transparan, dan AI Companion 24/7 offline-first untuk pendampingan belajar MABA.",
  },
  9: {
    id: 9,
    code: "SDG 9",
    nameIndo: "Industri, Inovasi & Infrastruktur",
    nameEng: "Industry, Innovation and Infrastructure",
    color: "#FD6925",
    icon: "⚡",
    description: "Membangun infrastruktur tangguh, industrialisasi berkelanjutan, dan mendorong inovasi.",
    umktImplementation: "Arsitektur web modern PWA, komputasi berkecepatan tinggi, dan digitalisasi layanan akademik hemat daya server.",
  },
  11: {
    id: 11,
    code: "SDG 11",
    nameIndo: "Kota & Komunitas Berkelanjutan",
    nameEng: "Sustainable Cities and Communities",
    color: "#FD9D24",
    icon: "🏙️",
    description: "Menjadikan kota dan pemukiman inklusif, aman, tangguh, dan berkelanjutan.",
    umktImplementation: "Pusat studi penyangga IKN Nusantara di Kalimantan Timur dan integrasi green campus UMKT.",
  },
  12: {
    id: 12,
    code: "SDG 12",
    nameIndo: "Konsumsi & Produksi Bertanggung Jawab",
    nameEng: "Responsible Consumption and Production",
    color: "#BF8B2E",
    icon: "🌿",
    description: "Menjamin pola konsumsi dan produksi yang berkelanjutan.",
    umktImplementation: "100% Paperless MABA Orientation Checklist & digital guidebook menghemat puluhan rim kertas per angkatan.",
  },
  13: {
    id: 13,
    code: "SDG 13",
    nameIndo: "Penanganan Perubahan Iklim",
    nameEng: "Climate Action",
    color: "#3F7E44",
    icon: "🌍",
    description: "Mengambil tindakan cepat untuk memerangi perubahan iklim dan dampaknya.",
    umktImplementation: "Reduksi emisi karbon (CO2e) dari pemangkasan pencetakan dan logistik materi fisik orientasi.",
  },
  17: {
    id: 17,
    code: "SDG 17",
    nameIndo: "Kemitraan untuk Mencapai Tujuan",
    nameEng: "Partnerships for the Goals",
    color: "#19486A",
    icon: "🤝",
    description: "Memperkuat sarana pelaksanaan dan merevitalisasi kemitraan global untuk pembangunan berkelanjutan.",
    umktImplementation: "Kemitraan riset UMKT dengan universitas internasional dan integrasi portal pemeringkatan (rankings.umkt.ac.id).",
  },
};

export function getSDGByNumber(num: number): SDGInfo | undefined {
  return OFFICIAL_SDGS[num];
}

export function parseSDGString(sdgStr: string): SDGInfo | undefined {
  const match = sdgStr.match(/\d+/);
  if (match) {
    const num = parseInt(match[0], 10);
    return OFFICIAL_SDGS[num];
  }
  return undefined;
}
