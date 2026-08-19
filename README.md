# 🔥 Nyala — Teman Perjalanan MABA-mu
> **Web Application Digital Companion Resmi & Interaktif untuk Mahasiswa Baru (MABA) Universitas Muhammadiyah Kalimantan Timur (UMKT) Angkatan 2026**

[![UMKT Official](https://img.shields.io/badge/UMKT-Official_Partner-FF5A1F.svg)](https://www.umkt.ac.id/)
[![Framework](https://img.shields.io/badge/Next.js-14_App_Router-0F172A.svg)](https://nextjs.org/)
[![Styling](https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38BDF8.svg)](https://tailwindcss.com/)
[![Animation](https://img.shields.io/badge/Framer_Motion-Smooth-FF5A1F.svg)](https://www.framer.com/motion/)

---

## 🌟 Tentang Proyek

**Nyala** adalah companion digital yang terasa hidup, modern, dan peduli. Bukan sekadar website informasi statis, melainkan teman virtual yang mendampingi Mahasiswa Baru selama menjalani masa orientasi **Masa Ta’aruf (MASTA) UMKT 2026**.

- **Tagline:** *“Nyala. Teman perjalanan MABA-mu.”*
- **Target Pengguna:** Seluruh Mahasiswa Baru UMKT 2026 & Mahasiswa yang belum menyelesaikan MASTA.
- **Nilai Utama:** Positif, Edukatif, Suportif, Energetik, dan Ramah (Gen-Z friendly).

---

## 🔗 Tautan Resmi & Backlink Aktif

Aplikasi ini terhubung langsung dengan ekosistem resmi Universitas Muhammadiyah Kalimantan Timur:
- 🌐 **Website Utama UMKT**: [https://www.umkt.ac.id/](https://www.umkt.ac.id/)
- 🏛️ **Biro Kemahasiswaan & Alumni UMKT**: [https://www.umkt.ac.id/kemahasiswaan/](https://www.umkt.ac.id/kemahasiswaan/)
- 📖 **Portal Informasi Resmi MASTA MABA**: [https://masta-maba.odoo.com/](https://masta-maba.odoo.com/)

---

## 🚀 Fitur Utama (Core Features)

1. **🤖 Tanya Nyala (Companion AI)**
   - Asisten virtual dengan persona ramah, bersahabat, enerjik, dan suportif.
   - Menjawab seputar alur MASTA, tips On-Cam Zoom, mengatasi rasa cemas/gugup, serta info kampus.
   - Terintegrasi dengan **Google Gemini API**, **Groq API**, atau **OpenRouter**.
   - **Smart Local Knowledge Fallback**: Tetap dapat menjawab dengan cerdas secara instan meski tanpa API key eksternal!

2. **❤️ Health Check & Mood Tracker**
   - Mood selector harian dengan emoji interaktif.
   - Checklist kebiasaan fisik (kualitas tidur 6-8 jam, makan sehat, hidrasi 2L air, relaksasi pikiran).
   - Perhitungan skor kesiapan harian (0–100%) & rekomendasi personal hangat.
   - Penyimpanan riwayat 7 hari terakhir di `localStorage`.

3. **📅 5 Alur Pelaksanaan Resmi MASTA**
   - Visual timeline interaktif 5 tahapan resmi:
     1. Membaca Panduan Resmi
     2. Verifikasi Identitas
     3. Kegiatan Daring (Zoom Meeting)
     4. UKM Expo
     5. Puncak dan Evaluasi
   - Countdown timer langsung menuju hari pelaksanaan MASTA UMKT 2026.

4. **✅ Checklist Persiapan Interaktif**
   - Kategori lengkap: Dokumen & Identitas, Perangkat & Jaringan, Pakaian & Atribut, Kesehatan & Mental.
   - Progress bar dinamis dengan efek animasi api.
   - Animasi **Confetti Perayaan** saat mencapai kelengkapan 100%.
   - Fitur tambah item kustom sendiri & tersimpan otomatis di `localStorage`.

5. **📚 Edukasi & Pedoman MASTA**
   - Penjelasan esensi orientasi yang humanis dan islami di UMKT.
   - 3 Fokus Utama (Adaptasi Kampus, Karakter, Peluang Mahasiswa).
   - 4 Pilar Capaian (Orientasi, Akademik, Relasi, Karakter).
   - FAQ Accordion interaktif & Backlink terverifikasi.

6. **🎨 Desain & Identitas Visual**
   - Warna Brand: Fire Orange (`#FF5A1F`), Deep Ember (`#E04500`), Deep Navy (`#0F172A`), Soft Cream (`#FFF7ED`).
   - Dukungan penuh **Dark Mode** & **Light Mode**.
   - Maskot api hidup **MascotFlame** berekspresi dinamis dengan Framer Motion.
   - PWA-ready & responsive mobile-first dengan floating navigation bar.

---

## 🛠️ Panduan Instalasi & Menjalankan Lokal

### 1. Prasyarat
- **Node.js**: Versi 18.x atau lebih baru (Disarankan Node 20+)
- **NPM** atau **PNPM / Yarn**

### 2. Kloning / Buka Direktori Proyek
```bash
git clone <repository-url>
cd Nyala_RangkingsUMKT
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variables (Opsional)
Salin template konfigurasi:
```bash
cp .env.local.example .env.local
```

Buka file `.env.local` dan masukkan API Key AI pilihanmu (bisa gratis):
```env
# Opsi 1: Google Gemini API (Sangat Direkomendasikan - Cepat & Gratis)
# Dapatkan di: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Opsi 2: Groq API
# Dapatkan di: https://console.groq.com/keys
GROQ_API_KEY=

# Opsi 3: OpenRouter API
OPENROUTER_API_KEY=
```

> **Catatan:** Jika `.env.local` tidak diisi, Nyala AI tetap akan berjalan sempurna menggunakan **Smart Local Knowledge Engine** bawaan khusus konten MASTA UMKT 2026.

### 5. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

---

## 🚀 Panduan Deployment ke Vercel

1. Push repository ke GitHub / GitLab.
2. Buka dashboard [Vercel](https://vercel.com/) lalu pilih **Add New Project**.
3. Import repository **Nyala**.
4. Di bagian *Environment Variables*, tambahkan `GEMINI_API_KEY` (jika menggunakan API eksternal).
5. Klik **Deploy**. Aplikasi akan live dalam hitungan detik!

---

## 📁 Struktur Direktori

```
Nyala_RangkingsUMKT/
├── app/
│   ├── api/chat/route.ts       # Endpoint AI Companion (Gemini/Groq/Fallback)
│   ├── checklist/page.tsx      # Halaman Checklist Persiapan & Confetti
│   ├── companion/page.tsx      # Halaman Tanya Nyala AI Companion
│   ├── health-check/page.tsx   # Halaman Mood & Health Tracker 7 Hari
│   ├── jadwal/page.tsx         # Halaman 5 Tahap Alur MASTA UMKT 2026
│   ├── tentang-masta/page.tsx  # Halaman Edukasi, Nilai & Backlink Resmi
│   ├── globals.css             # Styling Global & Keyframe Animasi Nyala
│   ├── layout.tsx              # Root Layout, SEO Metadata, PWA, Navigation
│   └── page.tsx                # Beranda / Landing Hero Section
├── components/
│   ├── BacklinkBanner.tsx      # Banner Verifikasi & Backlink Resmi UMKT
│   ├── CountdownTimer.tsx      # Timer Hitung Mundur MASTA 2026
│   ├── Footer.tsx              # Footer Terstruktur & Tautan Resmi
│   ├── MascotFlame.tsx         # Karakter Api Animasi Interaktif
│   ├── MobileNav.tsx           # Floating Bottom Navigation Mobile
│   ├── Navbar.tsx              # Header Navigasi Desktop & Dark Mode
│   ├── ProgressBar.tsx         # Indikator Progress Gradient Animasi
│   └── ThemeToggle.tsx         # Tombol Switch Dark/Light Mode
├── context/
│   └── ThemeContext.tsx        # Provider Tema Terintegrasi LocalStorage
├── lib/
│   ├── ai-engine.ts            # Logika Pemrosesan AI Hybrid & Fallback
│   ├── masta-data.ts           # Data Resmi MASTA UMKT (Alur, Syarat, FAQ)
│   └── utils.ts                # Helper & Utility Class Merge
├── public/
│   └── manifest.json           # Konfigurasi Progressive Web App
├── tailwind.config.ts          # Konfigurasi Token Warna Nyala Fire & Navy
├── tsconfig.json               # Konfigurasi TypeScript
└── README.md                   # Dokumentasi Lengkap Proyek
```

---

## 🏆 Kepatuhan Kriteria Kompetisi

- [x] **Originalitas & Konsep**: Maskot unik "Nyala" dengan tagline resmi *“Nyala. Teman perjalanan MABA-mu.”*.
- [x] **Akurasi Konten**: Mengadopsi 5 tahapan alur resmi dan 3 fokus MASTA UMKT 2026 dari sumber rujukan `https://masta-maba.odoo.com/`.
- [x] **Backlink Aktif**: Backlink jelas dan menonjol ke `https://www.umkt.ac.id/` dan `https://www.umkt.ac.id/kemahasiswaan/`.
- [x] **Kesiapan Teknis**: Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, PWA Ready, dan lolos uji build produksi tanpa error.

---

Dibuat dengan 🔥 penuh cinta dan dedikasi untuk menyalakan semangat Mahasiswa Baru **Universitas Muhammadiyah Kalimantan Timur**.
