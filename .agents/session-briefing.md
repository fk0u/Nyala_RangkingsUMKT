# Session Briefing

## Project Overview
- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Status:** Integrated 5 Official UMKT Presentation Slides (Exact Schedule, Dresscode, Rules, Sanctions & Signatories) + Rigged 12-Mood Animated Mascot + CMS & Scraper + Markdown AI Companion

## Key Updates
1. **Integrasi 5 Slide Presentasi Resmi MASTA UMKT 2026**:
   - **Tabel 9 Rangkaian Kegiatan Lengkap**:
     1. *06 Agustus 2026*: Pembekalan (Samarinda, 12 Shafar 1447 H / Sekretaris: Suhardiansyah, NIDN 1129058501).
     2. *11 Agustus 2026*: Masta FEBP.
     3. *12 Agustus 2026*: Masta Teknik (Fakultas Sains & Teknologi / TI).
     4. *18 Agustus 2026*: Masta Hukum dan Kesmas; Masta IMM.
     5. *19 Agustus 2026*: Masta Psikologi dan KIP; Masta IMM.
     6. *20 Agustus 2026*: Masta Farmasi dan Keperawatan; Masta IMM.
     7. *24 Agustus 2026*: **Pembukaan dan Materi Universitas Hari 1 (Daring Zoom, 08.00 – 17.00 WITA)**.
     8. *26 Agustus 2026*: **Materi Universitas Hari 2 dan Kemahasiswaan (Daring Zoom, 08.00 – 17.00 WITA)**.
     9. *28 Agustus 2026*: **UKM Expo (06.30 – 11.30 WITA) & Puncak Milad / Penutupan MASTA (17.00 – 22.00 WITA Luring Kampus UMKT)**.
   - **Ketentuan Dresscode Luring (28 Agustus 2026)**:
     * *Sesi Pagi (06.30 - 11.30 WITA - UKM Expo)*: Kaos UMKT (bila tidak ada, kaos olahraga sopan), celana training, sepatu olahraga. Mahasiswi mengenakan jilbab hitam.
     * *Sesi Malam (17.00 - 22.00 WITA - Puncak Milad)*: Pria mengenakan kemeja putih, celana panjang hitam formal, songkok/peci hitam, dan jas almamater. Wanita mengenakan kemeja putih, rok panjang hitam formal, jilbab hitam, dan jas almamater.
   - **Tata Tertib & Sanksi Tegas**:
     * Rambut pria wajib rapi, tidak gondrong, dan berwarna hitam.
     * Dilarang keras membawa sajam, narkoba, miras, rokok, maupun vape.
     * Sanksi: Peserta yang melanggar dapat dikeluarkan dan **WAJIB MENGULANG MASTA TAHUN DEPAN**.
   - **Informasi Lanjutan & Pengesahan**:
     * Kegiatan fakultas, prodi, dan himpunan diumumkan oleh pihak masing-masing.
     * Surat bertanggal: Samarinda, 12 Shafar 1447 H / 06 Agustus 2026 oleh Sekretaris Panitia Suhardiansyah, NIDN 1129058501.
2. **Upgrade Halaman & Komponen**:
   - **Halaman Jadwal ([app/jadwal/page.tsx](file:///d:/Project/Nyala_RangkingsUMKT/app/jadwal/page.tsx))**: Redesain lengkap dengan 4 Tab (Tabel Jadwal Rangkaian, Daring vs Luring, Dresscode & Aturan Luring, Peringatan Sanksi).
   - **Countdown Timer ([components/CountdownTimer.tsx](file:///d:/Project/Nyala_RangkingsUMKT/components/CountdownTimer.tsx))**: Dilengkapi toggle milestone (24 Agt Daring vs 28 Agt Luring).
   - **Checklist MASTA ([lib/masta-data.ts](file:///d:/Project/Nyala_RangkingsUMKT/lib/masta-data.ts))**: Diperbarui dengan seluruh atribut seragam resmi, kerapian rambut, dan larangan barang terlarang.
   - **Knowledge AI Companion ([lib/ai-engine.ts](file:///d:/Project/Nyala_RangkingsUMKT/lib/ai-engine.ts))**: Injeksi pengetahuan faktual lengkap dari 5 slide sehingga jawaban AI 100% presisi.
3. **Status Kompilasi Produksi**:
   - `npm run build` sukses 100% (13 rute ter-generate sempurna) di Next.js 16.3.1 (Turbopack) & React 19.
