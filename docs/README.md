# Dokumentasi Resmi Proyek Nyala UMKT 2026

Selamat datang di pusat dokumentasi teknis dan panduan operasional aplikasi **Nyala** (Sahabat Perjalanan Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur Angkatan 2026).

---

## 🗺️ Peta Navigasi Dokumentasi

Dokumentasi proyek ini distrukturkan ke dalam beberapa direktori tematik untuk memudahkan penelusuran arsitektur, panduan modul, dan prosedur operasional:

### 1. Fondasi & Desain
- 🎨 [**`DESIGN.md` (Root)**](file:///d:/Project/Nyala_RangkingsUMKT/DESIGN.md) — *Single Source of Truth* sistem desain antarmuka, token warna resmi, tipografi, haptic micro-interactions, dan anti-patterns.
- 🖼️ [**`docs/visual-style.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/visual-style.md) — Konsep visual asli *"Warm Fire, Soft Companion"*, palet warna, dan filosofi maskot Nyala.
- 📋 [**`docs/project/roadmap.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/project/roadmap.md) — Rekam jejak pengembangan, status fase rilis (Fase 1 s.d. 6), dan target penyempurnaan.

### 2. Arsitektur & Keamanan Sistem (`docs/architecture/`)
- 🏗️ [**`system-overview.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/architecture/system-overview.md) — Arsitektur global Next.js 16 (Turbopack), React 19, sistem dual-platform (Web & `/mobile/*`), PWA, dan manajemen state.
- 🔌 [**`api-reference.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/architecture/api-reference.md) — Spesifikasi teknis REST API endpoints (`/api/chat`, `/api/scrape-umkt`, `/api/admin`, dll.) beserta schema request & response.
- 🛡️ [**`security-and-caching.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/architecture/security-and-caching.md) — Mekanisme pertahanan Sliding Window Rate Limiting, Burst Flood Throttle, Karantina IP, Sanitasi XSS, dan In-Memory Semantic Cache.

### 3. Panduan Fitur & Modul (`docs/guides/`)
- 🤖 [**`companion-guide.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/companion-guide.md) — Panduan integrasi Tanya Nyala AI Companion (Zpi SDK, model GLM-4.7, Smart Offline Fallback Engine, dan Markdown stream parser).
- 🎓 [**`masta-curriculum.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/masta-curriculum.md) — Panduan kurikulum resmi MASTA UMKT 2026, 5 Tahapan Alur, 4 Pilar Capaian, 3 Fokus Pembinaan, Checklist, dan Countdown Realtime.
- 💻 [**`sikad-guide.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/sikad-guide.md) — Simulator interaktif dan panduan portal SIKAD (`mahasiswa.umkt.ac.id`), pengisian KRS, etika chat Dosen PA, dan presensi 75%.
- 🚀 [**`ti-academics.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/ti-academics.md) — Panduan Program Studi S1 Teknologi Informasi UMKT, kurikulum Semester 1-4, direktori 11 Dosen Tetap, Kalender Akademik 2026/2027, dan prospek karir.
- 📰 [**`blog-cms.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/blog-cms.md) — Manajemen Blog & Berita, Dashboard Admin, Scraper Web Resmi UMKT (`umkt.ac.id`), dan sinkronisasi agenda kampus.
- 📱 [**`mobile-pwa.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/guides/mobile-pwa.md) — Arsitektur pengalaman mobile native `/mobile/*`, profil mahasiswa, penyimpanan lokal (`localStorage`), dan floating bottom dock.

### 4. Keputusan Arsitektur (`docs/history/`)
- 📜 [**`architectural-decisions.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/history/architectural-decisions.md) — Kumpulan *Architecture Decision Records* (ADR) penting yang mendasari pemilihan teknologi dan arah desain.

### 5. Panduan Deployment & Operasional (`docs/deployment/`)
- 🚀 [**`vercel-deployment.md`**](file:///d:/Project/Nyala_RangkingsUMKT/docs/deployment/vercel-deployment.md) — Prosedur deployment ke Vercel, setup Environment Variables, optimasi Edge Network, dan troubleshooting.

---

## ⚡ Ringkasan Stack Teknologi

| Kategori | Teknologi Terpilih | Versi | Alasan / Catatan |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.3.1` | Kecepatan Turbopack, SSR/SSG prima, dan optimasi SEO |
| **Library UI** | React / React DOM | `19.2.8` | Versi stabil terkini dengan Concurrent Features optimal |
| **Styling** | Tailwind CSS | `3.4.14` | Sistem token desain terstandarisasi dan *zero-runtime CSS* |
| **Ikonografi** | Phosphor Icons React | `2.1.10` | 100% konsisten, ringan, mendukung bobot *regular*, *bold*, & *fill* |
| **Animasi** | Framer Motion | `13.1.0` | Animasi pegas taktil (*spring physics*) dan orkestrasi stagger |
| **Kecerdasan Buatan**| Zpi SDK (`zpi-sdk`) | `0.6.0` | Model `ai:z-ai` (GLM-4.7) dengan integrasi context-aware |
| **Markdown** | React-Markdown + Remark-GFM | Terkini | Merender output chat AI dan artikel blog dengan tabel & kode |
| **Keamanan** | In-House Security Engine | Custom | Rate Limiting, Flood Protection, XSS Sanitizer, Semantic Cache |
