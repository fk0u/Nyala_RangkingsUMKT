# Project Roadmap: Nyala UMKT 2026

## Fase 1: Perancangan & Fondasi ✅
- [x] Inisialisasi arsitektur Next.js App Router, TypeScript, dan Tailwind CSS
- [x] Konfigurasi design tokens resmi Nyala (Fire Orange, Deep Navy, Warm White, Dark Mode)
- [x] Standar anti-AI-slop & Hallmark styling (tipografi bebas italic headers, copywriting natural)

## Fase 2: Fitur Inti & Interaktivitas ✅
- [x] Beranda interaktif dengan maskot animasi Nyala, live countdown timer MASTA, dan status ringkasan
- [x] Virtual Companion AI (`/companion`) dengan integrasi Zapi SDK (`zpi-sdk`), smart offline knowledge base, rate limiter, anti-spam DDoS protection, dan high-performance TTL cache
- [x] Health Check & Mood Tracker (`/health-check`) dengan asesmen fisik harian, mood selector, saran personal, dan riwayat 7 hari
- [x] Interactive 5 Stages Timeline (`/jadwal`) selaras dengan alur resmi MASTA UMKT 2026
- [x] Checklist Persiapan MABA (`/checklist`) lengkap dengan kategori berkas/perangkat, custom item, dan selebrasi konfeti
- [x] Edukasi & 4 Pilar MASTA (`/tentang-masta`) dengan penjelasan 3 fokus pembinaan dan FAQ interaktif

## Fase 3: Panduan SIKAD & Micro-Interactions Lengkap ✅
- [x] Halaman Panduan & Simulator SIKAD Mahasiswa UMKT (`/panduan-sikad`) dengan rujukan `https://mahasiswa.umkt.ac.id/`
- [x] Simulasi menu Dashboard, KRS Online, Jadwal Kuliah, Presensi 75%, Tagihan Keuangan BRIVA, dan KHS
- [x] Template etika chat konfirmasi KRS ke Dosen PA yang dapat disalin instan
- [x] Shimmer Skeleton Loading states pada balasan AI, cards, dan formulir
- [x] Typewriter streaming sensation pada balasan AI Companion Nyala
- [x] Tactile Toast Notification System untuk aksi centang checklist, copy template, dan penyimpanan log harian

## Fase 4: Panduan Akademik & Karir Prodi Teknologi Informasi UMKT 2026 ✅
- [x] Halaman Panduan Akademik & Karir TI UMKT (`/panduan-ti`)
- [x] Interactive Curriculum Explorer Semester 1 - 4 lengkap dengan SKS counter dan kategori matkul
- [x] Direktori 11 Dosen Tetap TI dengan filter status aktif/S3 dan pencarian keahlian
- [x] Standar nilai minimum kelulusan & rentang nilai A - BC
- [x] Kalender Akademik Semester Ganjil 2026/2027 lengkap dengan milestone KRS, UTS, UAS, dan batas entri nilai
- [x] Estimasi gaji & prospek karir Software Engineer, Data Analyst, Cyber Security, Mobile Dev 2026
- [x] Informasi Himpunan Mahasiswa Teknik Informatika (HIMATIF) & semboyan "NO SKILL NO TRUST!"

## Fase 5: Modern Tech Stack & Phosphor Icons Ecosystem ✅
- [x] Upgrade ke **Next.js 16.3.1 (Turbopack)** & **React 19.2.8 / React DOM 19.2.8**
- [x] Upgrade **Framer Motion 13.1.0**
- [x] Migrasi 100% dari `lucide-react` ke **`@phosphor-icons/react` (v2.1.10)** di seluruh komponen & halaman
- [x] Penggantian seluruh emoji raw dengan Phosphor Icons berbobot visual presisi (`duotone`, `bold`, `fill`)

## Fase 6: Blog & Tips Hub + Pusat Layanan Admin Resmi UMKT ✅
- [x] Direktori Blog & Artikel Panduan Mahasiswa Baru (`/blog`) dengan filter 6 kategori dan live search
- [x] Halaman Pembaca Artikel Dinamis (`/blog/[slug]`) dengan Key Takeaways, Author Card, & Social Share
- [x] Integrasi Kontak Admin PMB (`+62 812-3001-7008`) & Biro Kemahasiswaan (`0822-5087-8843`, Gedung C Lt. 1)
- [x] Indikator status jam operasional pelayanan kampus (Senin-Kamis 08.00-16.00, Jumat 08.00-11.30 WITA)
- [x] Komponen `AdminContactCard` & modal global `AdminHelpModal` terintegrasi di seluruh aplikasi
- [x] Tombol fast-escalation langsung ke WhatsApp Admin di Tanya Nyala AI (`/companion`)
- [x] Resolusi tuntas port collision & build Next.js 16 (12 rute terkompilasi bersih)
