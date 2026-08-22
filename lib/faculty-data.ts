/**
 * Direktori Terstruktur 10 Fakultas Resmi Universitas Muhammadiyah Kalimantan Timur (UMKT)
 * Data terverifikasi untuk Hub Warta, Profil Akademik, dan Portal MABA.
 */

export interface FacultyDetail {
  id: string;
  code: string;
  name: string;
  shortName: string;
  colorClass: string;
  badgeBg: string;
  badgeText: string;
  buildingLocation: string;
  websiteUrl: string;
  description: string;
  imageUrl: string;
  programs: {
    name: string;
    degree: string;
    accreditation?: string;
  }[];
}

export const UMKT_10_FAKULTAS: FacultyDetail[] = [
  {
    id: "fst",
    code: "FST",
    name: "Fakultas Sains dan Teknologi",
    shortName: "Saintek (FST)",
    colorClass: "from-blue-600 to-indigo-700",
    badgeBg: "bg-blue-100 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800",
    badgeText: "text-blue-700 dark:text-blue-300",
    buildingLocation: "Gedung E & Gedung F (Kompleks Lab Komputasi & Rekayasa)",
    websiteUrl: "https://fst.umkt.ac.id/",
    imageUrl: "https://media.umkt.ac.id/web/thumbnail/lmbg1001/ra727/d57ad51df8464ec18e2f81a4dcc6b7c2.webp",
    description: "Fakultas pusat rekayasa perangkat lunak, infrastruktur sipil, otomasi permesinan, dan kecerdasan artifisial berlandaskan nilai keislaman.",
    programs: [
      { name: "S1 Teknologi Informasi", degree: "S.Kom", accreditation: "Baik Sekali (LAM-INFOKOM)" },
      { name: "S1 Teknik Informatika", degree: "S.Kom", accreditation: "Baik Sekali (LAM-INFOKOM)" },
      { name: "S1 Teknik Sipil", degree: "S.T", accreditation: "B (BAN-PT)" },
      { name: "S1 Teknik Mesin", degree: "S.T", accreditation: "B (BAN-PT)" },
      { name: "S1 Teknik Geofisika", degree: "S.T", accreditation: "Baik" },
    ],
  },
  {
    id: "febp",
    code: "FEBP",
    name: "Fakultas Ekonomi Bisnis dan Politik",
    shortName: "Ekonomi & Bisnis (FEBP)",
    colorClass: "from-amber-600 to-orange-700",
    badgeBg: "bg-amber-100 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800",
    badgeText: "text-amber-700 dark:text-amber-300",
    buildingLocation: "Gedung D (Kompleks Manajemen & Hubungan Internasional)",
    websiteUrl: "https://febp.umkt.ac.id/",
    imageUrl: "https://media.umkt.ac.id/web/thumbnail/lmbglab001/nap192/d99e06e782de4b0189e02a410e2eb095.webp",
    description: "Mencetak pemimpin bisnis, akuntan profesional, diplomat, dan analis kebijakan publik yang adaptif di era digital.",
    programs: [
      { name: "S1 Manajemen (Reguler & Internasional)", degree: "S.M", accreditation: "Unggul" },
      { name: "S1 Akuntansi", degree: "S.Ak", accreditation: "Baik Sekali" },
      { name: "S1 Hubungan Internasional", degree: "S.Sos", accreditation: "B" },
      { name: "S1 Ilmu Politik", degree: "S.IP", accreditation: "Baik" },
      { name: "S2 Magister Manajemen", degree: "M.M", accreditation: "Baik Sekali" },
    ],
  },
  {
    id: "farmasi",
    code: "FFARM",
    name: "Fakultas Farmasi",
    shortName: "Farmasi",
    colorClass: "from-emerald-600 to-teal-700",
    badgeBg: "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    buildingLocation: "Gedung B (Laboratorium Farmasi & Farmakologi Terpadu)",
    websiteUrl: "https://farmasi.umkt.ac.id/",
    imageUrl: "https://media.umkt.ac.id/web/thumbnail/lmbg1001/ra727/0742e834d1764447b7e928bee5d4c3ba.webp",
    description: "Pusat pendidikan kefarmasian terdepan dalam formulasi obat tradisional Borneo, farmasi klinis rumah sakit, dan industri halal.",
    programs: [
      { name: "S1 Farmasi Klinis & Komunitas", degree: "S.Farm", accreditation: "Baik Sekali (LAM-PTKes)" },
      { name: "Pendidikan Profesi Apoteker (PPA)", degree: "Apt", accreditation: "Baik Sekali (LAM-PTKes)" },
    ],
  },
  {
    id: "fk",
    code: "FK",
    name: "Fakultas Kedokteran",
    shortName: "Kedokteran",
    colorClass: "from-rose-600 to-red-700",
    badgeBg: "bg-rose-100 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800",
    badgeText: "text-rose-700 dark:text-rose-300",
    buildingLocation: "Gedung B & Rumah Sakit Pendidikan Utama",
    websiteUrl: "https://fk.umkt.ac.id/",
    imageUrl: "https://media.umkt.ac.id/web/thumbnail/lmbg1001/ra727/4f1dbc4e2a9b4152ba7083c289552f83.jpg",
    description: "Mendidik dokter profesional berkarakter islami yang unggul dalam kedokteran kegawatdaruratan tropis dan kesehatan masyarakat pesisir.",
    programs: [
      { name: "S1 Pendidikan Dokter", degree: "S.Ked", accreditation: "Baik (LAM-PTKes)" },
      { name: "Pendidikan Profesi Dokter", degree: "dr", accreditation: "Baik (LAM-PTKes)" },
    ],
  },
  {
    id: "fik",
    code: "FIK",
    name: "Fakultas Ilmu Keperawatan",
    shortName: "Keperawatan (FIK)",
    colorClass: "from-cyan-600 to-blue-700",
    badgeBg: "bg-cyan-100 dark:bg-cyan-950/80 border-cyan-200 dark:border-cyan-800",
    badgeText: "text-cyan-700 dark:text-cyan-300",
    buildingLocation: "Gedung A & Clinical Simulation Skill Lab",
    websiteUrl: "https://fik.umkt.ac.id/",
    imageUrl: "https://media.umkt.ac.id/web/thumbnail/lmbg1001/ra727/efc71455b038416c90516b63b5a23c4d.webp",
    description: "Pusat keunggulan keperawatan medikal bedah dan home care dengan laboratorium simulasi klinis berstandar internasional.",
    programs: [
      { name: "D3 Keperawatan", degree: "A.Md.Kep", accreditation: "Unggul" },
      { name: "S1 Ilmu Keperawatan (Reguler & RPL)", degree: "S.Kep", accreditation: "Unggul" },
      { name: "Profesi Ners", degree: "Ns", accreditation: "Unggul" },
    ],
  },
  {
    id: "fkm",
    code: "FKM",
    name: "Fakultas Kesehatan Masyarakat",
    shortName: "Kesehatan Masyarakat",
    colorClass: "from-lime-600 to-emerald-700",
    badgeBg: "bg-lime-100 dark:bg-lime-950/80 border-lime-200 dark:border-lime-800",
    badgeText: "text-lime-700 dark:text-lime-300",
    buildingLocation: "Gedung C Lantai 2",
    websiteUrl: "https://fkm.umkt.ac.id/",
    imageUrl: "https://media.umkt.ac.id/web/thumbnail/lmbg2222/shs500/bb7e8c4a7efc4aee878be171a7269a01.webp",
    description: "Fokus pada pencegahan epidemiologi, keselamatan dan kesehatan kerja (K3), kesehatan lingkungan, dan promosi kesehatan.",
    programs: [
      { name: "S1 Kesehatan Masyarakat", degree: "S.K.M", accreditation: "Baik Sekali" },
      { name: "S1 Kesehatan Lingkungan", degree: "S.K.L", accreditation: "Baik" },
    ],
  },
  {
    id: "fpsikologi",
    code: "FPSI",
    name: "Fakultas Psikologi",
    shortName: "Psikologi",
    colorClass: "from-purple-600 to-violet-700",
    badgeBg: "bg-purple-100 dark:bg-purple-950/80 border-purple-200 dark:border-purple-800",
    badgeText: "text-purple-700 dark:text-purple-300",
    buildingLocation: "Gedung D Lantai 3 (Laboratorium Konseling & Psikometri)",
    websiteUrl: "https://psikologi.umkt.ac.id/",
    imageUrl: "https://media.umkt.ac.id/web/thumbnail/lmbg1001/ra727/3ff937cf261345ffa78b66f9512917be.webp",
    description: "Mengembangkan keilmuan psikologi terapan, psikologi perkembangan anak, dan intervensi psikososial berbasis kearifan lokal.",
    programs: [
      { name: "S1 Psikologi", degree: "S.Psi", accreditation: "Baik Sekali (B)" },
    ],
  },
  {
    id: "fkip",
    code: "FKIP",
    name: "Fakultas Keguruan dan Ilmu Pendidikan",
    shortName: "FKIP (Pendidikan)",
    colorClass: "from-orange-600 to-amber-700",
    badgeBg: "bg-orange-100 dark:bg-orange-950/80 border-orange-200 dark:border-orange-800",
    badgeText: "text-orange-700 dark:text-orange-300",
    buildingLocation: "Gedung G & Microteaching Studio",
    websiteUrl: "https://fkip.umkt.ac.id/",
    imageUrl: "https://media.umkt.ac.id/web/thumbnail/lmbg2222/ra694/a1acd2e642b344a989cf66818892f1be.jpg",
    description: "Mencetak pendidik unggul, pelatih olahraga profesional, dan praktisi pendidikan anak usia dini yang inovatif dan melek teknologi.",
    programs: [
      { name: "S1 Pendidikan Bahasa Inggris", degree: "S.Pd", accreditation: "Baik Sekali" },
      { name: "S1 Pendidikan Matematika", degree: "S.Pd", accreditation: "Baik" },
      { name: "S1 Pendidikan Olahraga", degree: "S.Pd", accreditation: "Baik" },
      { name: "S1 Pendidikan Guru PAUD", degree: "S.Pd", accreditation: "Baik" },
    ],
  },
  {
    id: "fhukum",
    code: "FH",
    name: "Fakultas Hukum",
    shortName: "Hukum",
    colorClass: "from-red-700 to-rose-900",
    badgeBg: "bg-red-100 dark:bg-red-950/80 border-red-200 dark:border-red-800",
    badgeText: "text-red-700 dark:text-red-300",
    buildingLocation: "Gedung C Lantai 3 & Laboratorium Peradilan Semu",
    websiteUrl: "https://hukum.umkt.ac.id/",
    imageUrl: "https://media.umkt.ac.id/web/thumbnail/lmbg2222/ra694/1a0112b185c8493ebf54ff310c2920ac.jpg",
    description: "Mencetak praktisi hukum, advokat, dan akademisi berintegritas tinggi dengan keunggulan hukum bisnis digital dan hukum lingkungan IKN.",
    programs: [
      { name: "S1 Ilmu Hukum", degree: "S.H", accreditation: "Baik Sekali (B)" },
      { name: "S2 Magister Hukum", degree: "M.H", accreditation: "Baik" },
    ],
  },
  {
    id: "fpbd",
    code: "FPBD",
    name: "Fakultas Pertanian dan Bisnis Digital",
    shortName: "Pertanian & Bisnis Digital",
    colorClass: "from-emerald-700 to-green-900",
    badgeBg: "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    buildingLocation: "Gedung F Lantai 2 & Smart Greenhouse UMKT",
    websiteUrl: "https://fpbd.umkt.ac.id/",
    imageUrl: "https://media.umkt.ac.id/web/thumbnail/lmbglab001/nap192/8b1ff568590c4e4fbbb9f1d841fbc77d.webp",
    description: "Pelopor smart agriculture, rantai pasok agribisnis modern, dan ekosistem bisnis digital untuk mendukung ketahanan pangan IKN.",
    programs: [
      { name: "S1 Agribisnis", degree: "S.P", accreditation: "Baik" },
      { name: "S1 Bisnis Digital", degree: "S.Bns", accreditation: "Baik" },
    ],
  },
];
