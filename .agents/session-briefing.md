# Session Briefing

## Project Overview
- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Attribution:** © 2026 Nyala. Karya inovasi @kou.sozo (https://instagram.com/kou.sozo)
- **Architecture:** Dual Platform Web & True Fluid Responsive Native App (/mobile/*) + Next.js Middleware Auto-Routing + Default Light Mode + Dedicated Profile Module + Cookie Consent.

## Key Accomplishments in This Session
1. **Sistem Lengkap Error Pages (404, 500 & Loading States)**:
   - [`app/not-found.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/not-found.tsx) & [`app/mobile/not-found.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/mobile/not-found.tsx): Halaman 404 interaktif dengan animasi Maskot Nyala bingung, pesan ramah MABA, tombol kembali ke Beranda, dan shortcut navigasi cepat.
   - [`app/error.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/error.tsx) & [`app/mobile/error.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/mobile/error.tsx): Error Boundary 500 dengan tombol coba muat ulang (`reset()`), kode digest, dan akses instan ke WhatsApp Admin Gedung C.
   - [`app/global-error.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/global-error.tsx): Fallback error halaman tingkat root layout dengan styling inline anti-crash.
   - [`app/loading.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/loading.tsx) & [`app/mobile/loading.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/mobile/loading.tsx): Indikator loading shimmer animasi maskot saat transisi antar rute.
2. **Perbaikan Syntax & Dark Mode pada Berita**:
   - Membersihkan inline color CMS dengan `sanitizeArticleHTML()` dan override CSS `.dark .prose *` agar seluruh teks warta otomatis putih di Dark Mode.
2. **Redesign Header Desktop (Zero-Clutter & Balanced Layout)**:
   - [`components/TopNotificationBar.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/TopNotificationBar.tsx) & [`components/Navbar.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/Navbar.tsx): Ditata ulang dengan tipografi lega, navigasi terstruktur, tombol pencarian minimalis (`⌘K`), 1 tombol Admin WhatsApp resmi Gedung C, dan 1 tombol utama *Tanya Nyala AI* bergradasi tanpa tombol bertumpuk.
3. **Durasi Splash Screen Optimal (~2.2 Detik) & Fix Z-Index**:
   - [`components/WelcomingPreloader.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/WelcomingPreloader.tsx): Memperbaiki z-index menjadi `style={{ zIndex: 99999 }}` dengan layar solid penuh sehingga tidak menimpa teks hero banner.
4. **Sistem Proteksi Akses `/mobile` dari Desktop**:
   - [`middleware.ts`](file:///d:/Project/Nyala_RangkingsUMKT/middleware.ts): Browser desktop standar yang membuka rute `/mobile/*` dialihkan otomatis ke rute web desktop padanannya, kecuali jika menggunakan **DevTools Toggle Device Toolbar (F12 / Ctrl+Shift+M)**.
4. **Sistem SDG Badge Resmi PBB & Penataan Kartu Warta**:
   - SDG Badge diletakkan rapi di bawah teks ringkasan kartu berita dengan modal interaktif penjelasan target global PBB.
5. **Verifikasi Kompilasi Produksi**:
   - `npm run build` sukses 100% (**38 rute statis & dinamis + Proxy Middleware**, kompilasi 6.3s, 0 error, Exit Code 0).











