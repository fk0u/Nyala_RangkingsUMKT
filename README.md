# 🔥 Nyala — Teman Perjalanan MABA-mu (UMKT 2026)

> **Tagline:** *"Nyala. Teman perjalanan MABA-mu."*  
> **Kompetisi:** Web Application Companion Resmi Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026.

Nyala adalah aplikasi web pendamping digital (*digital companion*) berstandar kompetisi dan berestetika **Awwwards / FWA / CSS Design Awards** yang dirancang khusus untuk memandu, memotivasi, dan mengedukasi Mahasiswa Baru (MABA) UMKT Angkatan 2026 selama melalui proses **Masa Ta'aruf Mahasiswa Baru (MASTA)** dan adaptasi kehidupan akademik kampus.

---

## 🌟 Fitur Utama Ekosistem

1. **🤖 Companion AI (`/companion`)**:
   - Asisten cerdas dengan persona hangat, suportif, dan ramah khas sahabat sebaya.
   - Menjawab pertanyaan seputar tata tertib MASTA, strategi KRS SIKAD, tips kost di Samarinda, serta motivasi mental.
   - Integrasi fleksibel multi-provider: **Groq / Google Gemini / OpenRouter** dengan graceful offline fallback.
   - Tombol eskalasi langsung ke WhatsApp Admin Resmi Biro Kemahasiswaan & PMB UMKT.

2. **❤️ Health Check & Mood Tracker (`/health`)**:
   - Pencatat suasana hati harian (5 ekspresi emosi + catatan personal).
   - Checklist kondisi fisik harian: Kecukupan tidur (≥ 7 jam), asupan sarapan, hidrasi air (≥ 2 liter), dan level energi.
   - Kalkulator indeks kesiapan fisik & mental (0–100) dilengkapi rekomendasi kontekstual.
   - Visualisasi riwayat 7 hari yang tersimpan persisten di `localStorage`.

3. **📅 Jadwal & Alur 5 Tahap MASTA (`/jadwal`)**:
   - Timeline interaktif 5 tahapan resmi:
     1. *Membaca Panduan*
     2. *Verifikasi Identitas*
     3. *Kegiatan Daring (Zoom)* — 24 & 26 Agustus 2026
     4. *UKM Expo* — 28 Agustus 2026 (Luring)
     5. *Puncak & Evaluasi*
   - Countdown timer dinamis dan panduan teknis tiap sesi.

4. **✅ Checklist Persiapan MABA (`/checklist`)**:
   - Daftar kelengkapan dokumen resmi, tata busana Daring & Luring, name tag, serta fitur tambah tugas kustom.
   - Progress bar interaktif dengan penyimpanan otomatis di `localStorage`.

5. **🏛️ Hub Informasi & API Resmi UMKT (`/hub-umkt`)**:
   - Terkoneksi *live* dengan REST API resmi `https://web.umkt.ac.id/api/` (2.100+ warta kampus, 349+ edaran pengumuman, dan 85+ agenda universitas).
   - Direktori 10 Fakultas resmi lengkap dengan logo dan tautan website masing-masing.
   - Portal akses sistem terpadu (SIKAD, Odoo MASTA, LP3M, BIMA, PMB, Tracer Study).
   - Backlink aktif dan terverifikasi ke seluruh domain resmi `umkt.ac.id`.

6. **📖 Majalah Digital & Panduan Edukasi (`/panduan` & `/panduan/[slug]`)**:
   - Desain editorial berita/majalah kelas atas dengan filter kategori, estimasi waktu baca, dan badge penulis resmi.
   - Halaman pembaca naskah imersif dengan *Key Takeaways Callout*, tipografi *prose*, tombol salin tautan, dan rujukan resmi.

7. **🔒 Hidden Protected Admin Panel (`/adminuse`)**:
   - Panel CMS pengelola naskah panduan dan sinkronisasi scraper API UMKT.
   - Tersembunyi 100% dari seluruh menu navigasi publik, footer, dan sitemap.
   - Terproteksi autentikasi kata sandi yang dikonfigurasi melalui file lokal ter-gitignore (`.admin.config.local`).

---

## 🛠️ Tech Stack & Arsitektur

- **Framework:** Next.js 15+ (App Router, Turbopack)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS (Modern Glassmorphism & Custom Palette)
- **Animations:** Framer Motion (Spring Physics & Dynamic Trajectory)
- **Icons:** Phosphor Icons React
- **PWA Ready:** Web App Manifest (`manifest.ts`) & Dynamic Sitemap (`sitemap.ts`)
- **Typography:** Plus Jakarta Sans & Inter (Google Fonts)

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### 1. Kloning Repositori & Instalasi Dependensi
```bash
# Masuk ke direktori proyek
cd Nyala_RangkingsUMKT

# Instal seluruh dependensi
npm install
```

### 2. Konfigurasi AI API Keys (Opsional)
Buat file `.env.local` pada root direktori:
```env
# Pilih salah satu atau gunakan bawaan offline engine
GROQ_API_KEY=gsk_your_groq_api_key_here
# atau
GEMINI_API_KEY=AIzaSy_your_gemini_api_key_here
# atau
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_key_here

# Domain aplikasi (untuk sitemap & OpenGraph)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Konfigurasi Kata Sandi Admin (`.admin.config.local`)
Panel admin rahasia diakses pada rute **`/adminuse`**. Kata sandi dikonfigurasi melalui file lokal **`.admin.config.local`** yang telah didaftarkan ke dalam `.gitignore` sehingga tidak akan pernah terunggah ke repositori publik:

Buat file `.admin.config.local` di root direktori:
```env
ADMIN_PASSWORD=nyala2026admin
```
*(Kamu dapat mengganti `nyala2026admin` dengan kata sandi rahasia pilihanmu).*

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada **`http://localhost:3000`**.

### 5. Kompilasi Build Produksi
```bash
npm run build
npm run start
```

---

## 🌐 Struktur Rute Aplikasi

| Rute URL | Tipe Halaman | Deskripsi |
|---|---|---|
| `/` | Publik (Static) | Beranda Utama, Hero Tagline, Countdown, 5 Alur, dan Fitur Unggulan |
| `/companion` | Publik (Client) | Asisten Digital Tanya AI Nyala & Live WhatsApp Helpdesk |
| `/health` | Publik (Client) | Health Check, Mood Tracker, Scoring Fisik & Riwayat 7 Hari |
| `/jadwal` | Publik (Static) | Jadwal & Alur 5 Tahap MASTA Daring (24/26) & Luring (28 Agt) |
| `/checklist` | Publik (Client) | Checklist Dokumen, Busana & Perlengkapan MABA |
| `/hub-umkt` | Publik (Client) | Portal Berita Live API, Direktori 10 Fakultas & Sistem UMKT |
| `/panduan` | Publik (Static) | Majalah Edukasi Digital MABA & Filter Kategori |
| `/panduan/[slug]` | Publik (Dynamic) | Detail Pembaca Artikel Edukasi & Key Takeaways |
| `/adminuse` | **Rahasia (Protected)** | Panel CMS Pengelola Konten (Terproteksi Sandi) |
| `/sitemap.xml` | SEO Endpoint | Dynamic XML Sitemap Generator |
| `/robots.txt` | SEO Endpoint | Crawl Rules (Disallow `/adminuse`) |

---

## 🔗 Tautan Rujukan & Backlinks Resmi

Aplikasi ini mencantumkan tautan aktif ke sumber rujukan resmi:
- **Situs Resmi UMKT:** [https://www.umkt.ac.id/](https://www.umkt.ac.id/)
- **Portal MASTA MABA 2026:** [https://masta-maba.odoo.com/](https://masta-maba.odoo.com/)
- **Prodi Teknologi Informasi UMKT:** [https://ti.umkt.ac.id/](https://ti.umkt.ac.id/)
- **Portal Akademik SIKAD:** [https://sikad.umkt.ac.id/](https://sikad.umkt.ac.id/)
- **Penerimaan Mahasiswa Baru (PMB):** [https://pmb.umkt.ac.id/](https://pmb.umkt.ac.id/)
- **Biro Kemahasiswaan & Alumni (BIMA):** [https://kemahasiswaan.umkt.ac.id/](https://kemahasiswaan.umkt.ac.id/)

---

## ☁️ Panduan Deployment ke Vercel

1. Push kode ke repositori GitHub / GitLab.
2. Buka dashboard [Vercel](https://vercel.com/) dan import repositori.
3. Pada bagian **Environment Variables**, tambahkan:
   - `ADMIN_PASSWORD` = *(kata sandi admin untuk produksi)*
   - `GROQ_API_KEY` / `GEMINI_API_KEY` = *(API key penyedia AI)*
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.vercel.app`
4. Klik **Deploy**. Proyek akan terkompilasi secara instan dengan Turbopack!

---

**Dibuat dengan ❤️ & Semangat Inovasi untuk Mahasiswa Baru UMKT Angkatan 2026.**  
*“No Skill No Trust! Hidup Mahasiswa! Hidup Teknik!”*
