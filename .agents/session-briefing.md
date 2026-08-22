# Session Briefing

## Project Overview
- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Attribution:** © 2026 Nyala. Karya inovasi @kou.sozo (https://instagram.com/kou.sozo)
- **Architecture:** Dual Platform Web & True Fluid Responsive Native App (/mobile/*) + Next.js Middleware Auto-Routing + Default Light Mode + Dedicated Profile Module + Cookie Consent.

## Key Accomplishments in This Session
1. **Splash Screen & Preloader Elegan**:
   - [`components/WelcomingPreloader.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/WelcomingPreloader.tsx): Splash screen modern dengan animasi glowing maskot Nyala, branding, indikator progress shimmer, dan badge SDGs `🌱 Inisiatif Kampus Paperless • SDGs 4, 9, 12, 13`. Dilengkapi *auto fade-out* halus (900ms) dan *click-to-skip* tanpa menghalangi interaksi.
2. **Skeleton Shimmer Loaders (Zero-Boring Loading)**:
   - [`components/SkeletonLoader.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/SkeletonLoader.tsx): Mengganti spinner standar dengan `BeritaSkeletonGrid` yang menyimulasikan kartu warta (gambar, badge, 2 baris judul, tanggal) saat memuat API di desktop dan mobile.
3. **Sistem SDG Badge Resmi PBB Interaktif**:
   - [`lib/sdg-data.ts`](file:///d:/Project/Nyala_RangkingsUMKT/lib/sdg-data.ts) & [`components/SDGBadge.tsx`](file:///d:/Project/Nyala_RangkingsUMKT/components/SDGBadge.tsx): Badge SDGs dengan warna resmi UN, ikon, dan modal dialog interaktif yang menjelaskan kontribusi nyata aplikasi Nyala dan UMKT terhadap target keberlanjutan global.
4. **Penyelarasan Penuh Tema Keberlanjutan (*Sustainability*) & SDGs**:
   - Eco-Impact Tracker di profil, badge 100% Paperless Checklist, kategori SDGs di Hub Warta, dan penegasan submission lomba Pemeringkatan UMKT ([rankings.umkt.ac.id](https://rankings.umkt.ac.id)).
5. **Verifikasi Kompilasi Produksi**:
   - `npm run build` sukses 100% (**38 rute statis & dinamis + Proxy Middleware**, kompilasi 3.0s, 0 error, Exit Code 0).











