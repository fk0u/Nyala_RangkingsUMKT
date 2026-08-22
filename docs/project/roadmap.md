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

## Fase 6: Blog CMS, Scraper Berita UMKT, Karakter Asli & Markdown AI Chat ✅
- [x] Redesain Maskot Karakter Nyala di `MascotFlame.tsx` 100% presisi sesuai referensi (wajah bulat putih-krem, rona pipi, lapisan mahkota lidah api, varian papan checklist dengan centang oranye)
- [x] Dashboard Admin Blog & CMS di `/admin/blog` dengan editor Markdown, Live Preview, pemilihan preset gambar, dan tag manager
- [x] Server-side Scraper API di `/api/scrape-umkt` untuk menarik berita dan agenda resmi dari portal `https://www.umkt.ac.id/`
- [x] Tombol "Tarik Berita Resmi UMKT (Sync Scraper)" yang otomatis mengimpor artikel ke blog
- [x] Penyematan cover image beresolusi tinggi pada seluruh postingan blog dan halaman pembaca `/blog/[slug]`
- [x] Integrasi `react-markdown` + `remark-gfm` pada `/companion` untuk merender tabel, teks tebal, daftar nomor, dan blok kode
- [x] Penguatan prompt anti-halusinasi dan basis data faktual seputar perkuliahan TI, SIKAD, jadwal kalender akademik, dan kontak WhatsApp admin resmi

## Fase 7: Dokumentasi Lengkap & Single Source of Truth Sistem Desain ✅
- [x] Penerbitan acuan desain utama `DESIGN.md` (SSOT) berbasis *anti-slop* dan *stitch-design-taste*
- [x] Pusat Dokumentasi Terpadu (`docs/README.md`)
- [x] Dokumentasi Arsitektur Sistem (`docs/architecture/system-overview.md`), Referensi API (`docs/architecture/api-reference.md`), dan Keamanan/Cache (`docs/architecture/security-and-caching.md`)
- [x] Panduan Modul Fitur AI Companion (`docs/guides/companion-guide.md`), Kurikulum MASTA (`docs/guides/masta-curriculum.md`), Simulator SIKAD (`docs/guides/sikad-guide.md`), Akademik TI (`docs/guides/ti-academics.md`), Blog CMS (`docs/guides/blog-cms.md`), dan Mobile PWA (`docs/guides/mobile-pwa.md`)
- [x] Catatan Keputusan Arsitektur (`docs/history/architectural-decisions.md`) dan Panduan Deployment Vercel (`docs/deployment/vercel-deployment.md`)

## Fase 8: Live Hub Warta UMKT, Master SRS & Enterprise Production Hardening ✅
- [x] Penerbitan Dokumen Master **Software Requirements Specification (SRS)** (`docs/srs-software-requirements.md`) lengkap dengan System Flowchart, User Flows, ERD, DFD Level 0 & 1, Sequence Diagrams, dan Kebutuhan Fungsional/Non-Fungsional
- [x] Integrasi Hub Warta & Direktori 10 Fakultas Live Django REST API (`/hub-umkt` & `/mobile/hub-umkt`) terhubung langsung ke 2.100+ warta, agenda IKN, dan rilis resmi
- [x] Algoritma resolusi slug multi-tier `fetchUMKTArticleBySlug()` yang menjamin 100% akurasi pembukaan naskah artikel
- [x] Interaktivitas SDG Badge resmi PBB dengan modal penjelasan target global
- [x] Penyelarasan domain produksi resmi `https://nyala-umkt.vercel.app`, Schema.org JSON-LD Knowledge Graph, dan optimasi SEO 36 rute statis/dinamis


