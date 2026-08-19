# ROLE

Kamu adalah Senior Full-Stack Developer + UI/UX Designer expert yang sangat berpengalaman membangun web application modern, engaging, dan polished. Kamu bekerja dengan standar tinggi seperti produk startup bagus.

# PROJECT OVERVIEW

Bangun **satu web application lengkap** bernama **Nyala**.

**Tagline:** “Nyala. Teman perjalanan MABA-mu.”

Ini adalah proyek kompetisi untuk Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) Angkatan 2026. Aplikasi harus original, positif, edukatif, dan wajib mengandung konten terkait proses MASTA MABA UMKT 2026 serta memiliki backlink aktif ke website resmi UMKT (https://www.umkt.ac.id/ atau halaman di dalamnya).

Sumber informasi resmi yang wajib dijadikan acuan konten:
https://masta-maba.odoo.com/

# PRODUCT VISION & BRAND

**Nyala** adalah companion digital yang terasa hidup, modern, dan peduli. Bukan sekadar website informasi, melainkan teman virtual yang menemani Mahasiswa Baru selama menjalani masa orientasi (MASTA).

Brand Personality:

- Energetic tapi hangat
- Suportif dan dekat
- Sedikit playful namun tetap respect
- Gen-Z friendly

Visual Identity:

- Primary Color: Fire Orange / Deep Orange (#FF5A1F atau setara yang lebih premium)
- Secondary: Deep Navy / Dark Blue
- Accent: Soft Cream / Warm White
- Background: Clean off-white + dukungan dark mode (sangat disarankan)
- Typography: Modern, bold untuk heading, readable untuk body
- Gunakan micro-interactions yang memuaskan (hover, click, progress, transition)

Tagline harus muncul dengan jelas di hero section dan tempat strategis lainnya.

# INFORMASI RESMI MASTA (Wajib akurat)

MASTA MABA = Masa Ta’aruf Mahasiswa Baru UMKT 2026.

MASTA merupakan proses pengenalan awal bagi mahasiswa baru untuk memahami lingkungan kampus, budaya akademik, nilai-nilai institusi, tata tertib, layanan mahasiswa, serta kesempatan pengembangan diri di UMKT.

Fokus Utama:

1. Adaptasi Kehidupan Kampus
2. Pembentukan Karakter
3. Pengenalan Peluang Mahasiswa

Tujuan:

- Orientasi (Mengenal lingkungan UMKT)
- Akademik (Memahami sistem perkuliahan)
- Relasi (Membangun kebersamaan)
- Karakter (Menumbuhkan sikap positif)

Alur Pelaksanaan Resmi:

1. Membaca Panduan
2. Verifikasi Identitas
3. Kegiatan Daring (Zoom Meeting)
4. UKM Expo
5. Puncak dan Evaluasi

Peserta: Seluruh mahasiswa baru UMKT + mahasiswa yang belum menyelesaikan MASTA sebelumnya.

# CORE FEATURES (WAJIB DIIMPLEMENTASIKAN DENGAN BAIK)

1. **Companion AI (Fitur Utama)**
   - Chat interface yang bersih, modern, dan nyaman
   - Persona AI: ramah, energetic, suportif, sedikit playful, dan terasa seperti teman
   - Mampu menjawab pertanyaan seputar MASTA, tips persiapan, motivasi, kesehatan mental, dan info kampus
   - Gunakan API gratis (Groq / Google Gemini / OpenRouter). Buat konfigurasi API key mudah melalui .env.local
   - Sediakan quick reply / suggested questions

2. **Health Check**
   - Mood tracker harian (pilih emoji + catatan opsional)
   - Checklist kondisi fisik (kualitas tidur, makan, hidrasi, tingkat energi)
   - Perhitungan skor sederhana + rekomendasi yang relevan
   - Riwayat 7 hari terakhir dengan visual yang bagus
   - Data disimpan di localStorage

3. **Jadwal & Alur MASTA**
   - Tampilkan 5 tahapan alur resmi dengan jelas
   - Desain card yang menarik
   - Countdown atau status kegiatan
   - Mudah untuk di-update nantinya

4. **Checklist Persiapan**
   - Berdasarkan kebutuhan resmi (identitas, perangkat, koneksi internet, pakaian, perlengkapan, dll)
   - Progress bar yang visual dan memuaskan saat dicentang
   - Status tersimpan di localStorage

5. **Konten Edukatif + Backlink (Syarat Kompetisi)**
   - Halaman khusus yang menjelaskan apa itu MASTA, tujuan, fokus, dan alurnya secara positif serta edukatif
   - Wajib memiliki backlink aktif yang jelas dan mudah ditemukan ke:
     - https://www.umkt.ac.id/
     - Minimal 1 halaman di dalam umkt.ac.id (contoh: kemahasiswaan)
   - Boleh juga mencantumkan https://masta-maba.odoo.com/ sebagai sumber informasi

# TECHNICAL REQUIREMENTS

- Framework: Next.js 14 atau 15 (App Router)
- Styling: Tailwind CSS + Framer Motion
- Fully responsive (mobile-first)
- PWA-ready (bisa ditambahkan ke home screen)
- Kode bersih, terstruktur, dan mudah dipahami
- Siap di-deploy ke Vercel

# PAGE STRUCTURE

- Home / Landing (Hero kuat dengan nama + tagline)
- Companion (Chat)
- Health Check
- Jadwal & Alur MASTA
- Checklist Persiapan
- Tentang MASTA (Edukasi + Backlink)

# OUTPUT YANG DIHARAPKAN

1. Source code lengkap yang bisa langsung dijalankan (`npm install` & `npm run dev`)
2. File README.md yang jelas berisi cara install, setup environment variable, dan cara deploy
3. Semua fitur inti di atas sudah berfungsi dengan baik
4. Desain terasa polished, modern, dan sesuai brand Nyala
5. Konten edukatif akurat sesuai sumber resmi
6. Backlink aktif dan mudah ditemukan

# FINAL NOTES

- Prioritaskan pengalaman pengguna yang menyenangkan, bermanfaat, dan terasa “ditemanin”
- Konten harus positif, edukatif, dan sesuai semangat MASTA
- Jangan membuat desain yang kaku atau terlalu formal
- Pastikan aplikasi siap untuk dikirim sebagai karya kompetisi

Sekarang bangun aplikasi **Nyala** secara lengkap, profesional, dan berkualitas tinggi.
