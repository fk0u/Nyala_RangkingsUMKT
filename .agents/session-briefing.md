# Session Briefing

## Project Overview
- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Attribution:** © 2026 Nyala. Karya inovasi @kou.sozo (https://instagram.com/kou.sozo)
- **Architecture:** Dual Platform Web & True Fluid Responsive Native App (/mobile/*) + Next.js Middleware Auto-Routing + Default Light Mode + Dedicated Profile Module + Cookie Consent.

## Key Accomplishments in This Session
1. **Redesign Header Desktop (Zero-Clutter & Balanced Layout)**:
   - [`components/TopNotificationBar.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/TopNotificationBar.tsx): Disederhanakan menjadi siaran resmi MASTA, link panduan blog, tautan portal SIKAD resmi, dan jam real-time WITA tanpa tombol duplikat.
   - [`components/Navbar.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/Navbar.tsx): Ditata ulang dengan tipografi lega, navigasi terstruktur (`Beranda`, `Hub Warta`, `Akademik`, `Persiapan`, `Panduan Blog`), tombol pencarian minimalis (`⌘K`), 1 tombol Admin WhatsApp resmi Gedung C, dan 1 tombol utama *Tanya Nyala AI* bergradasi tanpa tombol bertumpuk.
2. **Durasi Splash Screen Optimal (~2.4 Detik)**:
   - [`components/WelcomingPreloader.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/WelcomingPreloader.tsx): Splash screen kini tampil ~2.4 detik pada kunjungan awal dengan animasi glowing maskot Nyala, progress bar shimmer, badge SDGs paperless, dan tombol *Ketuk untuk lewati* instan.
3. **Sistem Proteksi Akses `/mobile` dari Desktop**:
   - [`middleware.ts`](file:///d:/Project/Nyala_RangkingsUMKT/middleware.ts): Browser desktop standar yang membuka rute `/mobile/*` dialihkan otomatis ke rute web desktop padanannya.
   - Tetap mengizinkan akses jika pengguna membuka melalui **DevTools Toggle Device Toolbar (F12 / Ctrl+Shift+M)** atau ekstensi mobile simulator.
   - [`app/mobile/layout.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/mobile/layout.tsx): Dilengkapi pengaman sisi klien (*client-side safeguard*) jika jendela desktop dilebarkan tanpa emulasi mobile.
4. **Sistem SDG Badge Resmi PBB & Penataan Kartu Warta**:
   - SDG Badge diletakkan rapi di bawah teks ringkasan kartu berita dengan modal interaktif penjelasan target global PBB.
5. **Verifikasi Kompilasi Produksi**:
   - `npm run build` sukses 100% (**38 rute statis & dinamis + Proxy Middleware**, kompilasi 6.3s, 0 error, Exit Code 0).











