# Session Briefing

## Project Overview
- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Status:** Complete Competition-Ready & Awwwards-Standard Production Release (Next.js 15+ App Router, React 19, TypeScript, Tailwind CSS, Framer Motion)

## Implemented Architecture & Routes
1. **`/` (Beranda)**:
   - Hero berstandar Awwwards dengan nama & tagline resmi: *"Nyala. Teman perjalanan MABA-mu."*
   - Countdown timer interaktif ke MASTA Daring (24 & 26 Agt) dan Luring (28 Agt).
   - Ringkasan 5 Tahap Alur Wajib Orientasi MASTA 2026.
   - Kartu 6 fitur unggulan terpadu: Tanya AI, Health Check, Jadwal, Checklist, Hub UMKT, Panduan Edukasi.
   - Backlinks resmi aktif dan terverifikasi ke `https://www.umkt.ac.id/` dan `https://masta-maba.odoo.com/`.
   - Seluruh elemen mascot playground telah dibersihkan 100%.
2. **`/companion` (AI Chat Companion)**:
   - Persona hangat, energetik, suportif, dan ramah khas sahabat sebaya.
   - Multi-provider AI (Groq / Gemini / OpenRouter) dengan offline fallback handal.
   - Tombol eskalasi langsung ke WhatsApp Admin Biro Kemahasiswaan Gedung C & PMB UMKT.
3. **`/health` (Health Check & Mood Tracker)**:
   - Daily mood tracker (5 ekspresi emosi + catatan personal).
   - Physical checklist (Tidur ≥ 7 jam, sarapan, hidrasi ≥ 2L, level energi).
   - Indeks kesiapan 0–100 & rekomendasi kontekstual.
   - Riwayat visual 7 hari tersimpan persisten di `localStorage`.
4. **`/jadwal` (Alur 5 Tahap MASTA)**:
   - Timeline interaktif 5 tahapan resmi dari panduan, verifikasi berkas, sesi daring Zoom, hingga UKM Expo luring.
5. **`/checklist` (Checklist Persiapan)**:
   - Kelengkapan dokumen, busana resmi Daring & Luring, dan penambahan tugas kustom.
6. **`/hub-umkt` (Hub Informasi & Direktori Kampus)**:
   - Terkoneksi *live* ke REST API resmi UMKT (`https://web.umkt.ac.id/api/` warta, event, pengumuman).
   - Direktori 10 Fakultas resmi lengkap dengan logo dan tautan domain masing-masing.
   - Portal sistem terpadu (SIKAD, Odoo MASTA, BIMA, PMB, Perpustakaan).
7. **`/panduan` & `/panduan/[slug]` (Majalah Digital Panduan Edukasi)**:
   - Desain editorial berita/majalah kelas atas dengan filter kategori, pencarian instan, dan badge penulis resmi.
   - Detail artikel imersif dengan *Key Takeaways*, tipografi *prose*, tombol share, dan rujukan resmi.
8. **`/adminuse` (Hidden Protected Admin Panel)**:
   - Tersembunyi 100% dari menu navigasi publik, footer, dan sitemap.
   - Terproteksi autentikasi kata sandi dari file lokal ter-gitignore (`.admin.config.local`) atau env `ADMIN_PASSWORD`.
   - CMS editor artikel Markdown & penarik sinkronisasi berita dari API UMKT.
9. **SEO, PWA & Keamanan**:
   - Dynamic XML Sitemap (`/sitemap.xml`)
   - Robots.txt (`/robots.txt` dengan aturan disallow `/adminuse`)
   - Web App Manifest (`/manifest.webmanifest`)
   - Error boundary (`error.tsx`), loading skeleton (`loading.tsx`), 404 page (`not-found.tsx`).

## Build Validation
- `npm run build` sukses 100% (21 static & dynamic routes ter-generate sempurna, Exit Code 0).
