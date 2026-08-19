# Nyala — Teman Perjalanan MABA-mu

Companion digital untuk Mahasiswa Baru (MABA) Universitas Muhammadiyah Kalimantan Timur (UMKT) Angkatan 2026. Aplikasi ini memadukan panduan resmi orientasi MASTA, pelacak kesiapan harian, checklist perlengkapan, dan asisten virtual cerdas berbasis Zpi SDK.

- **Tagline:** Nyala. Teman perjalanan MABA-mu.
- **Sasaran:** Mahasiswa Baru UMKT 2026 dan mahasiswa yang belum menyelesaikan MASTA.
- **Rujukan Resmi:** [Portal MASTA UMKT (Odoo)](https://masta-maba.odoo.com/)

---

## Tautan Resmi & Backlink

Aplikasi ini terhubung langsung dengan situs resmi Universitas Muhammadiyah Kalimantan Timur:

- [Website Utama UMKT](https://www.umkt.ac.id/)
- [Biro Kemahasiswaan & Alumni UMKT](https://www.umkt.ac.id/kemahasiswaan/)
- [Portal Resmi MASTA MABA UMKT](https://masta-maba.odoo.com/)

---

## Fitur Utama

### 1. Tanya Nyala (AI Companion)

- Asisten virtual informatif dengan persona ramah dan komunikatif.
- Menjawab aturan MASTA, teknis On-Cam Zoom, tips adaptasi kampus, dan info organisasi.
- Terintegrasi dengan **Zpi SDK (`zpi-sdk`)** menggunakan model `ai:z-ai` (GLM-4.7).
- **Keamanan & Anti-DDoS / Anti-Spam:**
  - Sliding Window Rate Limiting (20 permintaan per menit per IP).
  - Burst Flood Throttle (maksimal 5 permintaan dalam 5 detik) dengan karantina IP otomatis.
  - Sanitasi input dan proteksi XSS (maksimal 1.200 karakter).
- **Sistem Cache Semantik:**
  - In-Memory Normalized Hash Cache dengan masa aktif (TTL) 2 jam.
  - Pertanyaan berulang dijawab instan (< 1ms) tanpa membebani kuota API.
- **Smart Fallback:** Otomatis beralih ke basis pengetahuan lokal jika koneksi eksternal terputus.

### 2. Health Check & Mood Tracker

- Mood tracker harian dengan 5 pilihan emosi dan catatan refleksi.
- Checklist kesiapan fisik harian (tidur 6–8 jam, pola makan, air 2 liter, relaksasi).
- Perhitungan skor kesiapan (0–100%) dan saran harian yang kontekstual.
- Riwayat 7 hari terakhir tersimpan di `localStorage`.

### 3. Alur 5 Tahap MASTA

Visualisasi tahapan resmi berdasarkan kurikulum universitas:

1. **Membaca Panduan Resmi:** Memahami tata tertib dan petunjuk pelaksanaan.
2. **Verifikasi Identitas:** Validasi berkas dan nomor induk mahasiswa.
3. **Kegiatan Daring (Zoom Meeting):** Sesi kuliah umum, pengenalan SIAKAD, dan Al-Islam Kemuhammadiyahan.
4. **UKM Expo:** Eksplorasi unit kegiatan dan organisasi kemahasiswaan.
5. **Puncak dan Evaluasi:** Inaugurasi mahasiswa baru dan penerbitan sertifikat.

Dilengkapi hitung mundur live menuju hari pelaksanaan orientasi.

### 4. Checklist Persiapan Interaktif

- Kategori bawaan: Dokumen & Identitas, Perangkat & Jaringan, Pakaian Resmi, serta Kesehatan.
- Progress bar dinamis dan animasi perayaan saat semua item tercentang.
- Opsi menambah perlengkapan pribadi yang tersimpan di `localStorage`.

### 5. Informasi & Nilai Edukatif MASTA

- Penjelasan 3 Fokus Pembinaan (Adaptasi Kampus, Karakter, Peluang Mahasiswa).
- Penjelasan 4 Pilar Capaian (Orientasi, Akademik, Relasi, Karakter).
- Daftar FAQ interaktif seputar administrasi dan teknis orientasi.

### 6. Desain & Aksesibilitas

- Palet warna: Fire Orange (`#FF5A1F`), Deep Ember (`#E04500`), Deep Navy (`#0F172A`), Warm White (`#FAFAF9`), dan Dark Mode (`#0B1120`).
- Toggle Dark Mode instan.
- Mobile-first dengan floating navigation bar dan dukungan PWA (`manifest.json`).

---

## Panduan Instalasi & Menjalankan Lokal

### Prasyarat

- Node.js versi 18 ke atas (disarankan Node 20+)
- NPM atau package manager kompatibel

### 1. Kloning Repositori

```bash
git clone <repository-url>
cd Nyala_RangkingsUMKT
```

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Salin berkas contoh konfigurasi:

```bash
cp .env.local.example .env.local
```

Buka `.env.local` dan tentukan API Key Zpi Anda:

```env
ZPI_API_KEY=zpi_blablablabla
```

_Catatan: Jika API Key tidak diisi, fitur chat tetap berjalan dengan Smart Local Knowledge Engine bawaan._

### 4. Jalankan Aplikasi

```bash
npm run dev
```

Buka browser pada [http://localhost:3000](http://localhost:3000).

---

## Panduan Deployment ke Vercel

1. Unggah kode ke repositori Git (GitHub/GitLab).
2. Buat proyek baru di [dashboard Vercel](https://vercel.com/).
3. Hubungkan repositori **Nyala**.
4. Masukkan `ZPI_API_KEY` pada menu _Environment Variables_.
5. Klik **Deploy**.

---

## Struktur Direktori

```
Nyala_RangkingsUMKT/
├── app/
│   ├── api/chat/route.ts       # Endpoint AI Companion (Zpi SDK + Anti-DDoS & Cache)
│   ├── checklist/page.tsx      # Halaman Checklist Persiapan
│   ├── companion/page.tsx      # Halaman Tanya Nyala AI Companion
│   ├── health-check/page.tsx   # Halaman Mood & Health Tracker
│   ├── jadwal/page.tsx         # Halaman Alur 5 Tahap MASTA
│   ├── tentang-masta/page.tsx  # Halaman Edukasi & Backlink Resmi
│   ├── globals.css             # Styling & Animasi Tema
│   ├── layout.tsx              # Root Layout, Metadata SEO, & Navigasi
│   └── page.tsx                # Beranda / Landing Page
├── components/
│   ├── BacklinkBanner.tsx      # Komponen Backlink Resmi UMKT
│   ├── CountdownTimer.tsx      # Hitung Mundur MASTA 2026
│   ├── Footer.tsx              # Footer Aplikasi & Tautan Penting
│   ├── MascotFlame.tsx         # Maskot Animasi Nyala
│   ├── MobileNav.tsx           # Navigasi Bawah untuk Mobile
│   ├── Navbar.tsx              # Navigasi Utama & Switcher Tema
│   ├── ProgressBar.tsx         # Indikator Progres Animasi
│   └── ThemeToggle.tsx         # Pengalih Mode Gelap / Terang
├── context/
│   └── ThemeContext.tsx        # Penyimpanan Preferensi Tema
├── lib/
│   ├── ai-engine.ts            # Integrasi Zpi SDK & Smart Fallback
│   ├── cache.ts                # Cache Semantik In-Memory (TTL 2 Jam)
│   ├── masta-data.ts           # Data Rujukan Resmi MASTA UMKT
│   ├── security.ts             # Rate Limiter, Anti-DDoS, & Input Sanitizer
│   └── utils.ts                # Helper & Utility Class Merge
├── public/
│   └── manifest.json           # Konfigurasi PWA
├── tailwind.config.ts          # Token Warna & Radius Desain
├── tsconfig.json               # Konfigurasi TypeScript
└── README.md                   # Dokumentasi Resmi Proyek
```

---

## Kepatuhan Syarat Kompetisi

1. **Originalitas:** Konsep dan maskot unik Nyala dengan identitas visual terarah.
2. **Akurasi Materi:** 5 tahapan resmi dan 3 fokus pembinaan disadur langsung dari panduan resmi MASTA UMKT 2026.
3. **Backlink Aktif:** Tautan aktif yang mudah diakses menuju `https://www.umkt.ac.id/` dan `https://www.umkt.ac.id/kemahasiswaan/`.
4. **Kualitas Teknis:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, sistem keamanan API mandiri, dan lolos uji build produksi.
