# Session Briefing

## Project Overview
- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Status:** Dedicated Hub Portal UMKT (`/hub-umkt`) + MABA Editorial Magazine (`/blog`) + Password-Protected Admin CMS (`/adminuse`) + Full SEO & Security Infrastructure + 100% Production Build

## Key Architecture Upgrades
1. **Dedicated Hub Portal Kampus UMKT ([app/hub-umkt/page.tsx](file:///d:/Project/Nyala_RangkingsUMKT/app/hub-umkt/page.tsx) & [app/hub-umkt/[slug]/page.tsx](file:///d:/Project/Nyala_RangkingsUMKT/app/hub-umkt/%5Bslug%5D/page.tsx))**:
   - Menghubungkan 2.100+ artikel berita, 349+ pengumuman, 85+ agenda, 10 profil fakultas resmi & 59 biro/unit dari `https://web.umkt.ac.id/api/`.
   - Layout *editorial newsroom* berkelas majalah (*Spotlight Breaking News*, live search, filter SDGs).
   - Pengalaman membaca naskah berkelas (*Reading Progress Bar*, Text-to-Speech audio synthesizer, foto resolusi tinggi `media.umkt.ac.id`, tombol share WA/Twitter/Copy, rujukan portal resmi).
2. **Dedicated Majalah Panduan & Edukasi MABA ([app/blog/page.tsx](file:///d:/Project/Nyala_RangkingsUMKT/app/blog/page.tsx) & [app/blog/[slug]/page.tsx](file:///d:/Project/Nyala_RangkingsUMKT/app/blog/%5Bslug%5D/page.tsx))**:
   - Fokus 100% pada panduan adaptasi anak rantau, strategi KRS SIKAD nilai A, info beasiswa, etika dosen TI, dan UKM.
   - Dilengkapi *Key Takeaways Box*, kartu profil penulis resmi terverifikasi, tipografi *prose* tajam, dan widget feedback pembaca.
3. **Panel Admin Tersembunyi di `/adminuse` ([app/adminuse/page.tsx](file:///d:/Project/Nyala_RangkingsUMKT/app/adminuse/page.tsx) & [app/api/admin-auth/route.ts](file:///d:/Project/Nyala_RangkingsUMKT/app/api/admin-auth/route.ts))**:
   - Memindahkan panel admin dari `/admin` lama ke rute tersembunyi `/adminuse`.
   - Dilindungi **Gerbang Sandi (*Glass Passcode Lock Gate*)** dengan konfigurasi password di `.env.local` (`ADMIN_PASSPHRASE`).
   - Fitur CMS lengkap: 1-Click Live REST API Sync, Markdown WYSIWYG editor dengan live preview, image picker, dan manajemen artikel.
   - Seluruh tautan publik ke admin telah dihapus dari Navbar, Footer, dan Search Modal.
4. **Pembersihan Playground Maskot**:
   - Menghapus komponen `MascotPlayground.tsx` dan merapikan halaman utama.
5. **Infrastruktur SEO & Security Tier-1**:
   - Dynamic Sitemap: [app/sitemap.ts](file:///d:/Project/Nyala_RangkingsUMKT/app/sitemap.ts) (`/sitemap.xml`).
   - Security Robots: [app/robots.ts](file:///d:/Project/Nyala_RangkingsUMKT/app/robots.ts) (memblokir crawling ke `/adminuse` & `/api/admin-auth`).
   - Security Headers di [next.config.mjs](file:///d:/Project/Nyala_RangkingsUMKT/next.config.mjs) (CSP, X-Frame-Options: `DENY`, X-Content-Type-Options: `nosniff`, Referrer-Policy, Strict-Transport-Security).
6. **Kompilasi Produksi**:
   - `npm run build` sukses 100% (17 static & dynamic routes) di Next.js 16.3.1 (Turbopack) & React 19.
