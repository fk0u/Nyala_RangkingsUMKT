# Sistem Blog CMS, Hub Warta & Sinkronisasi API Portal UMKT

Dokumen ini menjelaskan arsitektur Content Management System (CMS) lokal, integrasi Live REST API portal resmi UMKT, dan modul pembaca warta cerdas yang terpasang pada modul `/blog`, `/hub-umkt`, `/mobile/hub-umkt`, `/adminuse`, `/api/umkt-portal`, dan `/api/scrape-umkt`.

---

## 1. Arsitektur Ganda: Majalah Panduan MABA (`/blog`) & Hub Warta Kampus (`/hub-umkt`)

Sistem informasi berbasis teks di Nyala dirancang dengan pemisahan peran yang tegas namun saling melengkapi:

1. **Majalah Edukasi Panduan MABA (`/blog` & `/mobile/blog`):**
   - Berisi artikel kurasi panduan praktis mahasiswa baru (kost, transportasi, bimbingan KRS, finansial, dan kesehatan mental).
   - Mendukung penulisan artikel kustom via panel admin (`/adminuse`) yang tersimpan di `localStorage` (`lib/blog-store.ts`).
   - Menggunakan parser **React-Markdown + Remark-GFM** lengkap dengan tabel, blok kutipan, dan kode sintaks.

2. **Hub Warta & Direktori Kampus Live API (`/hub-umkt` & `/mobile/hub-umkt`):**
   - Terhubung secara *real-time* ke **2.100+ artikel berita resmi, agenda event, edaran pengumuman, dan 10 direktori fakultas** langsung dari Django REST Framework `https://web.umkt.ac.id/api/`.
   - Menggunakan sanitasi HTML otomatis (`sanitizeArticleHTML()`) yang membersihkan warna inline CMS agar adaptif sempurna di Light Mode maupun Dark Mode.

```mermaid
graph TD
    StaticData[Default Curated Articles - masta-data.ts] --> StoreEngine[Blog Store Engine - lib/blog-store.ts]
    CustomLocal[(Local Storage Custom Posts)] --> StoreEngine
    StoreEngine --> BlogReader[Majalah Panduan /blog & /blog/[slug]]
    
    PortalUMKT[Portal Resmi UMKT web.umkt.ac.id/api/] -->|Live Query| InternalProxy[/api/umkt-portal]
    InternalProxy --> HubDesktop[Hub Warta Desktop /hub-umkt & /hub-umkt/[slug]]
    InternalProxy --> HubMobile[Hub Warta Mobile /mobile/hub-umkt & /mobile/hub-umkt/[slug]]
    
    PortalUMKT -->|Manual Scraper Sync| ScraperAPI[/api/scrape-umkt]
    ScraperAPI -->|JSON Payload| AdminSync[Tombol Sync di /adminuse]
    AdminSync -->|Persist ke Local Storage| CustomLocal
```

---

## 2. Mekanisme Resolusi Slug Warta Multi-Tier (`fetchUMKTArticleBySlug`)

Untuk memastikan setiap artikel yang diklik membuka naskah yang tepat (dan tidak pernah salah membuka artikel lain), sistem menerapkan algoritma pencocokan 4 tingkat:

```mermaid
flowchart TD
    Req([User Mengklik Tautan /hub-umkt/slug-artikel]) --> Dec[Decode URL Slug]
    Dec --> FetchLatest[Ambil 30 Berita Terbaru via /api/umkt-portal]
    
    FetchLatest --> CheckExact{1. Exact Match: b.slug == rawSlug?}
    CheckExact -->|Cocok| ReturnArticle[Kembalikan Naskah Artikel Terpilih]
    
    CheckExact -->|Tidak Cocok| CheckGen{2. Generated Slug: generateSlug(b.judul) == rawSlug?}
    CheckGen -->|Cocok| ReturnArticle
    
    CheckGen -->|Tidak Cocok| CheckSub{3. Substring / URL Match?}
    CheckSub -->|Cocok| ReturnArticle
    
    CheckSub -->|Tidak Cocok| SearchDB[4. Kueri REST API UMKT: ?search=kata+kunci]
    SearchDB --> FilterDB{Cari Exact Match di Hasil Database?}
    FilterDB -->|Cocok| ReturnArticle
    FilterDB -->|Tidak Ditemukan| NotFound[Tampilkan State: Warta Tidak Ditemukan]
```

---

## 3. Fitur Interaktif Pembaca Warta

Setiap halaman detail warta (`/hub-umkt/[slug]`) dan panduan (`/blog/[slug]`) dilengkapi utilitas pembaca modern:

- **Top Reading Progress Bar:** Indikator persentase scroll atas dengan animasi pegas *Framer Motion*.
- **Text-to-Speech (TTS) Narasi Nyala:** Pembacaan suara naskah warta berbahasa Indonesia menggunakan Web Speech API.
- **Pengatur Ukuran Teks (Aa):** Beralih dinamis antara ukuran normal, besar (*large*), dan ekstra besar (*xl*).
- **Bagikan Instan (*Social Share*):** Tombol bagikan langsung ke WhatsApp dengan teks terformat dan salin tautan cepat.
- **Lencana SDGs Interaktif (PBB):** Menampilkan target pembangunan berkelanjutan yang didukung oleh artikel terkait (misal: SDG 4 Pendidikan Berkualitas, SDG 16 Perdamaian & Kelembagaan) lengkap dengan modal pop-up penjelasan resmi.
- **Warta Terkait (*Related News Carousel*):** Menampilkan 3 artikel rilis terbaru lainnya di bagian bawah halaman.

