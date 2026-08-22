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

## 📚 Pusat Dokumentasi & Sistem Desain

Dokumentasi lengkap proyek disusun secara sistematis di dalam folder `docs/` dan berkas acuan desain `DESIGN.md`:

- 🎨 [**`DESIGN.md`**](file:///d:/Project/Nyala_RangkingsUMKT/DESIGN.md) — *Single Source of Truth* sistem desain antarmuka, token warna, tipografi, dan aturan anti-slop.
- 📖 [**`docs/README.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/README.md) — Indeks navigasi seluruh dokumentasi teknis dan panduan operasional.
- 🏗️ [**Arsitektur Sistem**](file:///d:/Project/Nyala_RangkingsUMKT/docs/architecture/system-overview.md) | [**Referensi API**](file:///d:/Project/Nyala_RangkingsUMKT/docs/architecture/api-reference.md) | [**Keamanan & Cache**](file:///d:/Project/Nyala_RangkingsUMKT/docs/architecture/security-and-caching.md)
- 🤖 [**AI Companion Guide**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/companion-guide.md) | [**Kurikulum MASTA**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/masta-curriculum.md) | [**Simulator SIKAD**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/sikad-guide.md)
- 🚀 [**Panduan Akademik S1 TI**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/ti-academics.md) | [**Blog CMS & Scraper**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/blog-cms.md) | [**Mobile App & PWA**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/mobile-pwa.md)
- 📜 [**Keputusan Arsitektur (ADR)**](file:///d:/Project/Nyala_RangkingsUMKT/docs/history/architectural-decisions.md) | [**Panduan Deploy Vercel**](file:///d:/Project/Nyala_RangkingsUMKT/docs/deployment/vercel-deployment.md)

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

Buka `.env.local` dan tentukan API Key Zpi Anda (opsional):

```env
ZPI_API_KEY=zpi_blablablabla
```

*Catatan: Jika API Key tidak diisi, fitur chat tetap berjalan 100% menggunakan Smart Local Knowledge Engine bawaan.*

### 4. Jalankan Aplikasi

```bash
npm run dev
```

Buka browser pada [http://localhost:3000](http://localhost:3000).

---

## Struktur Direktori

```
Nyala_RangkingsUMKT/
├── app/
│   ├── api/chat/route.ts       # Endpoint AI Companion (Zpi SDK + Anti-DDoS & Cache)
│   ├── api/scrape-umkt/route.ts# Scraper Berita Resmi Django REST API UMKT
│   ├── mobile/                 # Modul True Fluid Responsive Mobile App (/mobile/*)
│   ├── checklist/page.tsx      # Halaman Checklist Persiapan
│   ├── companion/page.tsx      # Halaman Tanya Nyala AI Companion
│   ├── health-check/page.tsx   # Halaman Mood & Health Tracker
│   ├── jadwal/page.tsx         # Halaman Alur 5 Tahap MASTA & Countdown
│   ├── panduan-sikad/page.tsx  # Halaman Panduan & Simulator SIKAD Mahasiswa
│   ├── panduan-ti/page.tsx     # Halaman Kurikulum & Panduan Akademik TI UMKT
│   ├── blog/page.tsx           # Halaman Blog & Berita Kampus
│   ├── adminuse/page.tsx       # Panel Admin Konten & Sync Scraper
│   ├── globals.css             # Styling & Animasi Tema
│   ├── layout.tsx              # Root Layout, Metadata SEO, & Navigasi
│   └── page.tsx                # Beranda / Landing Page
├── components/
│   ├── BacklinkBanner.tsx      # Komponen Backlink Resmi UMKT
│   ├── CountdownTimer.tsx      # Hitung Mundur MASTA 2026
│   ├── Footer.tsx              # Footer Aplikasi & Tautan Penting
│   ├── MascotFlame.tsx         # Maskot Animasi Karakter Nyala
│   ├── MobileNav.tsx           # Navigasi Bawah untuk Mobile
│   ├── Navbar.tsx              # Navigasi Utama & Switcher Tema
│   ├── CookieConsent.tsx       # Persetujuan Cookie & LocalStorage
│   └── SkeletonLoader.tsx      # Animasi Shimmer Loading
├── context/
│   ├── ThemeContext.tsx        # Penyimpanan Preferensi Tema (Default Light)
│   └── ToastContext.tsx        # Sistem Notifikasi Toast Taktil Global
├── docs/                       # Dokumentasi Teknis & Panduan Lengkap
├── lib/
│   ├── ai-engine.ts            # Integrasi Zpi SDK & Smart Fallback
│   ├── cache.ts                # Cache Semantik In-Memory (TTL 2 Jam)
│   ├── masta-data.ts           # Data Rujukan Resmi MASTA & Kurikulum UMKT
│   ├── security.ts             # Rate Limiter, Anti-DDoS, & Input Sanitizer
│   ├── umkt-api.ts             # API Client & Scraper Resmi UMKT
│   └── utils.ts                # Helper & Utility Class Merge
├── public/
│   └── manifest.json           # Konfigurasi PWA Standalone
├── DESIGN.md                   # Single Source of Truth Sistem Desain
├── tailwind.config.ts          # Token Warna & Radius Desain
├── tsconfig.json               # Konfigurasi TypeScript
└── README.md                   # Dokumentasi Resmi Proyek
```

---

## Kepatuhan Syarat & Kualitas Teknis

1. **Originalitas & Identitas Kuat:** Karakter maskot api unik Nyala dengan desain visual berorientasi keramahan pendampingan (*Warm Fire, Soft Companion*).
2. **Akurasi Materi & Kedalaman:** Seluruh tahapan, kontak admin, dosen, dan kurikulum disinkronkan secara faktual dengan edaran resmi UMKT.
3. **Backlink Aktif:** Menghubungkan langsung ke `https://www.umkt.ac.id/`, `https://www.umkt.ac.id/kemahasiswaan/`, dan `https://mahasiswa.umkt.ac.id/`.
4. **Kualitas Teknis Modern:** Next.js 16 (Turbopack), React 19, Phosphor Icons, Tailwind CSS, Framer Motion, PWA, in-memory semantic cache, dan zero-error production build.
