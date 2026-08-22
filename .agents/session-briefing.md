# Session Briefing

## Project Overview

- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Attribution:** © 2026 Nyala. Karya inovasi @kou.sozo (https://instagram.com/kou.sozo)
- **Architecture:** Dual Platform Web & True Fluid Responsive Native App (/mobile/\*) + Next.js Middleware Auto-Routing + Default Light Mode + Dedicated Profile Module + Cookie Consent.

## Key Accomplishments in This Session

1. **Penyetelan Domain Produksi Resmi ([`https://nyala-umkt.vercel.app`](https://nyala-umkt.vercel.app))**:
   - Seluruh metadata canonical, OpenGraph, Twitter Cards, JSON-LD Structured Data Schema.org (`Person`, `WebApplication`, `BreadcrumbList`), `app/sitemap.ts`, `app/robots.ts`, serta whitelist CORS API telah disinkronkan ke **`https://nyala-umkt.vercel.app`**.
2. **Peningkatan Keamanan Enterprise & Anti-Abuse Rate Limiting**:
   - [`next.config.mjs`](file:///d:/Project/Nyala_RangkingsUMKT/next.config.mjs): Mengonfigurasi Security HTTP Headers lengkap (Content Security Policy (CSP), HSTS 1 tahun, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Cross-Origin-Opener-Policy`, dan `Permissions-Policy`).
   - [`lib/security.ts`](file:///d:/Project/Nyala_RangkingsUMKT/lib/security.ts) & [`lib/rate-limit.ts`](file:///d:/Project/Nyala_RangkingsUMKT/lib/rate-limit.ts): Proteksi Sliding Window Rate Limiter, burst flood guard, anti-bruteforce quarantine, timing-safe string comparison, dan detektor prompt injection.
3. **Supercharged SEO & Personal Creator Branding (Al-Ghani Desta Setyawan)**:
   - [`app/layout.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/layout.tsx): Menambahkan metadata lengkap, OpenGraph, Twitter cards, dan variasi kata kunci personal (`Al-Ghani Desta Setyawan`, `Al Ghani Desta`, `Desta Setyawan`, `Kou Sozo`, `kou.sozo`, `https://kou.bio`, `Pemeringkatan UMKT`, `https://www.umkt.ac.id/pemeringkatan/`, `Lomba Web UMKT`).
   - [`components/StructuredData.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/StructuredData.tsx): Menanamkan Schema.org JSON-LD Knowledge Graph `Person` (menghubungkan identitas developer Al-Ghani Desta Setyawan dengan media sosial dan bio), `EducationalOrganization` (UMKT), `Organization` (Pemeringkatan UMKT), `WebApplication`, `BreadcrumbList`, dan `FAQPage`.
   - [`app/sitemap.ts`](file:///d:/Project/Nyala_RangkingsUMKT/app/sitemap.ts) & [`app/robots.ts`](file:///d:/Project/Nyala_RangkingsUMKT/app/robots.ts): Mengindeks seluruh 38+ rute desktop & native mobile secara terstruktur untuk Googlebot.
4. **Perbaikan Syntax & Dark Mode pada Berita**:
   - Membersihkan inline color CMS dengan `sanitizeArticleHTML()` dan override CSS `.dark .prose *` agar seluruh teks warta otomatis putih di Dark Mode.
5. **Redesign Header Desktop (Zero-Clutter & Balanced Layout)**:
   - [`components/TopNotificationBar.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/TopNotificationBar.tsx) & [`components/Navbar.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/Navbar.tsx): Ditata ulang dengan tipografi lega, navigasi terstruktur, tombol pencarian minimalis (`⌘K`), 1 tombol Admin WhatsApp resmi Gedung C, dan 1 tombol utama _Tanya Nyala AI_ bergradasi tanpa tombol bertumpuk.
6. **Durasi Splash Screen Optimal (~2.2 Detik) & Fix Z-Index**:
   - [`components/WelcomingPreloader.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/WelcomingPreloader.tsx): Memperbaiki z-index menjadi `style={{ zIndex: 99999 }}` dengan layar solid penuh sehingga tidak menimpa teks hero banner.
7. **Sistem Proteksi Akses `/mobile` dari Desktop**:
   - [`middleware.ts`](file:///d:/Project/Nyala_RangkingsUMKT/middleware.ts): Browser desktop standar yang membuka rute `/mobile/*` dialihkan otomatis ke rute web desktop padanannya, kecuali jika menggunakan **DevTools Toggle Device Toolbar (F12 / Ctrl+Shift+M)**.
8. **Sistem SDG Badge Resmi PBB & Penataan Kartu Warta**:
   - SDG Badge diletakkan rapi di bawah teks ringkasan kartu berita dengan modal interaktif penjelasan target global PBB.
9. **Penyelesaian Bug Slug Detail Warta ([`lib/umkt-api.ts`](file:///d:/Project/Nyala_RangkingsUMKT/lib/umkt-api.ts), [`app/hub-umkt/[slug]/page.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/hub-umkt/[slug]/page.tsx), [`app/mobile/hub-umkt/[slug]/page.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/app/mobile/hub-umkt/[slug]/page.tsx))**:
   - Memperbaiki algoritma pencarian artikel warta di halaman detail. Sebelumnya, ketiadaan pencocokan langsung `b.slug === rawSlug` serta fallback `list[0]` menyebabkan semua artikel membuka berita pertama ("si A").
   - Menghadirkan fungsi `fetchUMKTArticleBySlug()` dengan multi-tier matching (exact slug, decoded slug, generated slug, substring, dan dynamic search query across 2.100+ berita UMKT).
10. **Verifikasi Kompilasi Produksi**:
   - `npm run build` sukses 100% (**36 rute statis & dinamis + Proxy Middleware**, kompilasi 2.9s, 0 error, Exit Code 0).
