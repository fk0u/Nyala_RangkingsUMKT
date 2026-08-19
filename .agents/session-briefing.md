# Session Briefing

## Project Overview
- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Status:** Dedicated Hub Portal UMKT (`/hub-umkt`) + MABA Editorial Magazine (`/blog`) + Password-Protected Admin CMS (`/adminuse`) + Official MASTA IMM 3-Wave Rundown (18-20 Agustus 2026) + Dynamic Real-Time Date Computation + Mascot Page Motion Transition + Custom 404/500/Global-Error Boundaries + 100% Production Build

## Latest Updates: Custom Error Boundaries & Not-Found Pages
1. **Custom 404 Not Found Page ([`app/not-found.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/not-found.tsx))**:
   - Menghadirkan tampilan ramah dan ekspresif dengan maskot Nyala mood `"confused"` (kebingungan di lorong kampus).
   - Dilengkapi tombol kembali ke Beranda, Cek Jadwal MASTA, Tanya Nyala AI, serta quick links ke Hub Kampus, Panduan MABA, SIKAD, dan Akademik TI.
2. **Custom 500 Error Boundary ([`app/error.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/error.tsx))**:
   - Menghadirkan tampilan santun dengan maskot Nyala mood `"nervous"` (*"Api Nyala Sedang Kepanasan Sebentar!"*).
   - Tombol retry `reset()` (*"Coba Muat Ulang Halaman"*), kembali ke beranda, dan tautan langsung WhatsApp ke Admin Helpdesk Kemahasiswaan BIMA.
3. **Custom Global Error Catch-All ([`app/global-error.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/global-error.tsx))**:
   - Fallback aman untuk fatal layout error dengan inline styling terisolasi dan recovery trigger.
4. **Kompilasi Produksi**:
   - `npm run build` sukses 100% (17 static & dynamic routes).
