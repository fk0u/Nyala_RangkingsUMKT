export interface MastaStage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  status: "completed" | "active" | "upcoming";
  dates?: string;
  steps: string[];
  tips: string;
}

export interface ChecklistItem {
  id: string;
  category: "Dokumen & Identitas" | "Perangkat & Jaringan" | "Pakaian & Atribut" | "Kesehatan & Mental";
  title: string;
  description: string;
  required: boolean;
  officialRef?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const OFFICIAL_LINKS = {
  umktMain: "https://www.umkt.ac.id/",
  umktKemahasiswaan: "https://www.umkt.ac.id/kemahasiswaan/",
  umktAkademik: "https://www.umkt.ac.id/akademik/",
  mastaOdoo: "https://masta-maba.odoo.com/",
};

export const MASTA_STAGES: MastaStage[] = [
  {
    id: 1,
    title: "1. Membaca Panduan Resmi",
    subtitle: "Pahami Aturan & Petunjuk Pelaksanaan",
    description: "Langkah pertama yang wajib dilakukan setiap MABA adalah membaca dan memahami seluruh buku panduan, tata tertib, serta pedoman teknis MASTA UMKT 2026.",
    iconName: "BookOpen",
    status: "active",
    dates: "Tahap Awal",
    steps: [
      "Mengunduh buku pedoman resmi MASTA 2026 di portal resmi",
      "Memahami tata tertib, pakaian, dan jadwal tiap sesi",
      "Mencatat kontak darurat dan grup panitia/pendamping gugus"
    ],
    tips: "Baca bagian tata tertib pakaian dan perlengkapan secara teliti agar tidak keliru saat sesi verifikasi!"
  },
  {
    id: 2,
    title: "2. Verifikasi Identitas",
    subtitle: "Validasi Data Mahasiswa Baru",
    description: "Proses verifikasi berkas dan identitas calon peserta MASTA untuk memastikan keabsahan data kemahasiswaan di sistem pangkalan data kampus UMKT.",
    iconName: "ShieldCheck",
    status: "upcoming",
    dates: "Pra-Kegiatan",
    steps: [
      "Memastikan NIM / Nomor Registrasi sudah aktif",
      "Mengunggah bukti registrasi dan foto kartu identitas",
      "Mendapatkan ID Gugus atau Kelompok pendampingan"
    ],
    tips: "Siapkan file scan KTP/Kartu Pelajar dan bukti pembayaran registrasi dalam format JPG/PDF yang jelas."
  },
  {
    id: 3,
    title: "3. Kegiatan Daring (Zoom Meeting)",
    subtitle: "Materi Pengenalan & Sidang Terbuka",
    description: "Pelaksanaan materi orientasi kampus, kuliah umum kebangsaan, pengenalan sistem akademik (SIAKAD), serta nilai-nilai Al-Islam dan Kemuhammadiyahan secara daring.",
    iconName: "Video",
    status: "upcoming",
    dates: "Sesi Utama Daring",
    steps: [
      "Bergabung ke ruang Zoom 15 menit sebelum acara dimulai",
      "Menggunakan format nama akun: [Nomor Gugus]_[Nama Lengkap]",
      "Wajib menyalakan kamera (On-Cam) dan mengenakan pakaian resmi yang ditentukan",
      "Mengisi presensi kehadiran pada link yang dibagikan panitia"
    ],
    tips: "Pastikan koneksi internet stabil dan cari tempat yang tenang serta memiliki pencahayaan baik."
  },
  {
    id: 4,
    title: "4. UKM Expo",
    subtitle: "Eksplorasi Minat, Bakat, & Organisasi",
    description: "Ajang pameran dan demonstrasi seluruh Unit Kegiatan Mahasiswa (UKM), Lembaga Eksekutif/Legislatif Mahasiswa, dan Komunitas di UMKT.",
    iconName: "Sparkles",
    status: "upcoming",
    dates: "Sesi Expo & Minat Bakat",
    steps: [
      "Menyaksikan parade dan presentasi karya tiap UKM",
      "Mengikuti sesi tanya jawab langsung dengan pengurus organisasi",
      "Mendaftarkan diri pada UKM yang sesuai dengan minat dan passion-mu"
    ],
    tips: "Manfaatkan sesi ini untuk memilih minimal 1 UKM demi mengasah soft skill, relasi, dan portofolio prestasimu!"
  },
  {
    id: 5,
    title: "5. Puncak dan Evaluasi",
    subtitle: "Inagurasi, Refleksi, & Sertifikasi",
    description: "Acara puncak penutupan MASTA MABA UMKT 2026, inaugurasi resmi sebagai Mahasiswa Baru, pengisian kuesioner evaluasi, dan penerbitan sertifikat kelulusan MASTA.",
    iconName: "Award",
    status: "upcoming",
    dates: "Puncak Acara",
    steps: [
      "Mengikuti prosesi inaugurasi dan pelantikan MABA",
      "Mengisi formulir evaluasi kegiatan kepanitiaan",
      "Mendapatkan sertifikat resmi MASTA (syarat akademik/kemahasiswaan ke depan)"
    ],
    tips: "Sertifikat MASTA sangat penting untuk kelengkapan administrasi SKPI (Surat Keterangan Pendamping Ijazah) saat wisuda nanti."
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: "chk-1",
    category: "Dokumen & Identitas",
    title: "Nomor Registrasi & Kartu Peserta MASTA",
    description: "Cetak atau simpan file PDF kartu bukti pendaftaran MABA UMKT 2026.",
    required: true,
  },
  {
    id: "chk-2",
    category: "Dokumen & Identitas",
    title: "Scan KTP / Kartu Identitas & Pas Foto Resmi",
    description: "Format pas foto dengan latar belakang resmi untuk verifikasi data SIAKAD.",
    required: true,
  },
  {
    id: "chk-3",
    category: "Perangkat & Jaringan",
    title: "Laptop / Smartphone Siap Pakai",
    description: "Pastikan baterai terisi penuh, kamera & mikrofon berfungsi dengan jernih.",
    required: true,
  },
  {
    id: "chk-4",
    category: "Perangkat & Jaringan",
    title: "Aplikasi Zoom Meeting Terbaru",
    description: "Update aplikasi Zoom ke versi paling baru untuk kestabilan fitur breakout room dan virtual background.",
    required: true,
  },
  {
    id: "chk-5",
    category: "Perangkat & Jaringan",
    title: "Koneksi Internet / Kuota Cadangan Minimal 5GB",
    description: "Sediakan tethering cadangan untuk antisipasi jika WiFi mengalami kendala saat sesi langsung.",
    required: true,
  },
  {
    id: "chk-6",
    category: "Pakaian & Atribut",
    title: "Kemeja Putih Polos Lengan Panjang Berkerah",
    description: "Pakaian wajib sesi pembukaan dan pelaksanaan resmi MASTA.",
    required: true,
  },
  {
    id: "chk-7",
    category: "Pakaian & Atribut",
    title: "Bawahan Celana / Rok Kain Hitam Formal",
    description: "Bukan berbahan jeans atau ketat, rapi dan sopan sesuai tata tertib islami.",
    required: true,
  },
  {
    id: "chk-8",
    category: "Pakaian & Atribut",
    title: "Jilbab / Dasi Sesuai Ketentuan Gugus",
    description: "Jilbab putih/hitam untuk mahasiswi muslimah dan dasi formal untuk mahasiswa.",
    required: false,
  },
  {
    id: "chk-9",
    category: "Kesehatan & Mental",
    title: "Air Minum (Tumbler) & Makanan Ringan",
    description: "Tetap terhidrasi dan siapkan cemilan sehat saat jeda istirahat materi.",
    required: true,
  },
  {
    id: "chk-10",
    category: "Kesehatan & Mental",
    title: "Tidur Cukup Minimal 7 Jam Malam Sebelumnya",
    description: "Fisik yang segar membuat daya fokus dan penyerapan materi jauh lebih maksimal.",
    required: true,
  },
  {
    id: "chk-11",
    category: "Kesehatan & Mental",
    title: "Mindset Positif & Semangat Kolaboratif",
    description: "Buka diri untuk berkenalan dengan teman baru lintas jurusan dan fakultas.",
    required: true,
  }
];

export const MASTA_FAQS: FAQItem[] = [
  {
    question: "Apa itu MASTA MABA UMKT?",
    answer: "MASTA (Masa Ta’aruf) MABA UMKT adalah kegiatan orientasi resmi bagi seluruh mahasiswa baru Universitas Muhammadiyah Kalimantan Timur untuk mengenal lingkungan kampus, sistem akademik, nilai-nilai Kemuhammadiyahan, dan organisasi kemahasiswaan.",
    category: "Umum"
  },
  {
    question: "Apakah MASTA wajib diikuti oleh seluruh Mahasiswa Baru?",
    answer: "Ya, MASTA bersifat WAJIB bagi seluruh mahasiswa baru angkatan 2026 serta mahasiswa angkatan sebelumnya yang belum lulus atau belum mengikuti MASTA. Keikutsertaan ini menjadi syarat kelengkapan administrasi akademik dan SKPI.",
    category: "Kewajiban"
  },
  {
    question: "Apa saja fokus utama dalam pelaksanaan MASTA?",
    answer: "Terdapat 3 fokus utama: 1) Adaptasi Kehidupan Kampus, 2) Pembentukan Karakter & Akhlak Mulia, dan 3) Pengenalan Peluang Mahasiswa (beasiswa, UKM, riset, dan prestasi).",
    category: "Materi"
  },
  {
    question: "Bagaimana jika koneksi internet terputus saat sesi Zoom?",
    answer: "Jangan panik! Segera beralih ke koneksi cadangan (misal: hotspot seluler) dan laporkan kendala ke Panitia Pendamping Gugus melalui grup komunikasi resmi agar presensimu tetap tercatat.",
    category: "Teknis"
  },
  {
    question: "Di mana saya bisa mengakses informasi resmi terbaru UMKT?",
    answer: "Kamu dapat mengunjungi website resmi universitas di https://www.umkt.ac.id/ dan portal resmi MASTA di https://masta-maba.odoo.com/.",
    category: "Informasi"
  }
];
