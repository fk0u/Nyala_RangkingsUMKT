# Session Briefing

## Project Overview
- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Status:** Blog & Tips Hub + Direct Admin UMKT Escalation System Implemented (Production Ready)

## Key Updates
1. **Pusat Layanan & Kontak Admin Resmi UMKT**:
   - **Admin Penerimaan Mahasiswa Baru (PMB)**: WhatsApp `+62 812-3001-7008` (Verifikasi berkas, aktivasi NIM, daftar ulang).
   - **Biro Kemahasiswaan dan Alumni UMKT**:
     - Lokasi: **Gedung C Lantai 1 UMKT, Samarinda**
     - Operasional Pelayanan:
       - **Senin - Kamis: 08.00 - 16.00 WITA**
       - **Jumat: 08.00 - 11.30 WITA**
       - **Sabtu - Minggu: Tutup**
     - WhatsApp: `0822-5087-8843` (Dispensasi MASTA, beasiswa, sertifikat, legalitas UKM).
   - Indikator real-time status buka/tutup layanan offline berdasarkan waktu lokal WITA (UTC+8).
   - Terintegrasi di: `Tanya Nyala AI (/companion)` (floating strip + modal), `TopNotificationBar`, `Navbar`, `Footer`, `HomePage`, dan `CommandSearchModal`.
2. **Blog & Artikel Wawasan MABA 2026 (`/blog` & `/blog/[slug]`)**:
   - Direktori artikel dengan filter kategori ("Adaptasi & Rantau", "Akademik & SIKAD", "Beasiswa", "Organisasi & UKM", "Teknis MASTA", "Fasilitas Kampus").
   - 6 artikel komprehensif & mendalam:
     1. Panduan Bertahan & Sukses Adaptasi Kuliah di Samarinda untuk Mahasiswa Rantau.
     2. Trik Pengisian KRS SIKAD & Strategi Meraih IPK 4.0 di Semester 1.
     3. Kupas Tuntas Beasiswa UMKT: KIP-Kuliah, Prestasi, Tahfidz & Kader Muhammadiyah.
     4. Daftar Unit Kegiatan Mahasiswa (UKM) & Komunitas Unggulan di Kampus UMKT.
     5. Checklist Teknis H-3 MASTA UMKT: Setup Zoom, Dresscode & Ketentuan On-Cam.
     6. Eksplorasi Fasilitas Kampus UMKT: Perpustakaan Digital, Lab Komputer, & Spot Belajar.
   - Halaman baca dinamis dengan Key Takeaways, Author card, Share to clipboard, dan tombol eskalasi konsultasi ke WhatsApp Admin UMKT.
3. **Port Conflict & 404 Cache Resolution**:
   - Menghentikan proses node latar belakang lama yang mengunci port 3000.
   - Membersihkan direktori `.next` lama dari sisa build Next 14.
   - `npm run build` sukses 100% pada Next.js 16.3.1 (Turbopack) & React 19.2.8.
