# Session Briefing

## Project Overview
- **Project Name:** Nyala (Sahabat Perjalanan MABA UMKT 2026)
- **Tagline:** "Nyala. Teman perjalanan MABA-mu."
- **Status:** Full Blog CMS + Scraper Berita UMKT + Markdown AI Chat Engine + Official Mascot Character Implemented (Production Ready)

## Key Updates
1. **Maskot Karakter Asli Nyala Sesuai Desain Referensi**:
   - Kepala/tubuh bulat putih-krem menggemaskan (*kawaii proportions*) dengan rona pipi bulat oranye lembut (`#F47244`).
   - Lapisan lidah api di sekeliling kepala (*layered flame mane*) bergradasi warna coral-red, warm orange, golden amber, serta bara api melayang (*floating embers*).
   - Pose khusus **With Clipboard Checklist** (sesuai gambar ke-2 referensi) dengan papan checklist kayu, centang tugas oranye, dan kaki mungil di halaman `/checklist`.
2. **Dashboard Admin Blog & Scraper Berita Resmi UMKT (`/admin/blog` & `/api/scrape-umkt`)**:
   - Endpoint `/api/scrape-umkt` untuk menarik dan mengonversi berita terbaru dari portal resmi UMKT (`https://www.umkt.ac.id/`) secara dinamis.
   - Tombol **"Tarik Berita Resmi UMKT (Sync Scraper)"** untuk mengimpor berita kampus ke blog dalam 1-klik.
   - Formulir pembuatan & pengeditan artikel Markdown lengkap dengan *Live Preview*, pemilihan cover image preset kampus beresolusi tinggi, tag, dan ringkasan poin utama (*Key Takeaways*).
   - Sinkronisasi store `lib/blog-store.ts` berbasis `localStorage` yang terhubung langsung ke `/blog` dan `/blog/[slug]`.
3. **Penyematan Cover Image & Visual Blog**:
   - Seluruh artikel blog bawaan kini dilengkapi foto cover bertema perkuliahan, laboratorium komputer, dan gedung kampus UMKT.
   - Halaman baca dinamis menampilkan banner cover beresolusi tinggi, badge sumber resmi UMKT, author card, dan tombol konsultasi WhatsApp ke Biro Kemahasiswaan.
4. **Peningkatan AI Chat (ReactMarkdown + remarkGfm + Anti-Ngawur)**:
   - Integrasi `react-markdown` dan `remark-gfm` untuk rendering tabel Markdown, daftar berpoin/nomor, teks tebal, blok kode bersintaks bersih, blockquote, dan link aktif.
   - Pengetatan *system prompt* dan basis pengetahuan offline agar seluruh jawaban faktual, akurat, dan tidak mengada-ada terkait kurikulum TI 2026, 11 dosen tetap, kalender akademik ganjil 2026/2027, SIKAD, dan eskalasi ke WhatsApp Admin resmi.
5. **Kompilasi & Kualitas Kode**:
   - Kompilasi `npm run build` sukses 100% pada 13 rute di Next.js 16.3.1 (Turbopack) dan React 19.
