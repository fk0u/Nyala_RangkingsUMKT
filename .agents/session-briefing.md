# Session Briefing

## Project Overview
- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Attribution:** © 2026 Nyala. Karya inovasi @kou.sozo (https://instagram.com/kou.sozo)
- **Architecture:** Dual Platform Web & True Fluid Responsive Native App (/mobile/*) + Next.js Middleware Auto-Routing + Default Light Mode + Dedicated Profile Module + Cookie Consent.

## Key Accomplishments in This Session
1. **Perbaikan Syntax di [`lib/umkt-api.ts`](file:///d:/Project/Nyala_RangkingsUMKT/lib/umkt-api.ts)**:
   - Memperbaiki penutupan blok fungsi `stripHtml()` sebelum deklarasi `export const cleanHTML`, menyelesaikan build error pada Turbopack secara instan.
2. **Perbaikan Teks Berita di Dark Mode (Teks Putih & Kontras Jelas)**:
   - [`lib/umkt-api.ts`](file:///d:/Project/Nyala_RangkingsUMKT/lib/umkt-api.ts): Menambahkan helper `sanitizeArticleHTML()` untuk membersihkan atribut inline `style="color: #000000"` dan `style="background-color: ..."` bawaan CMS WordPress UMKT.
   - [`app/globals.css`](file:///d:/Project/Nyala_RangkingsUMKT/app/globals.css): Menambahkan CSS rule override `.dark .prose *` (`color: #E2E8F0 !important; background-color: transparent !important;`) sehingga seluruh paragraf dan elemen HTML detail berita otomatis tampil terang di Dark Mode.
   - [`app/hub-umkt/page.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/hub-umkt/page.tsx) & [`app/mobile/hub-umkt/page.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/mobile/hub-umkt/page.tsx): Memperbaiki kontras teks ringkasan kartu warta menjadi `dark:text-slate-300`.
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











