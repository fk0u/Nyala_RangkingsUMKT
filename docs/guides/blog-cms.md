# Sistem Blog CMS & Sinkronisasi Berita Portal UMKT

Dokumen ini menjelaskan arsitektur Content Management System (CMS) lokal dan integrasi sinkronisasi berita resmi UMKT yang terpasang pada modul `/blog`, `/adminuse`, dan `/api/scrape-umkt`.

---

## 1. Arsitektur Blog & Manajemen Konten

Sistem blog Nyala menggabungkan artikel bawaan (*curated static articles*), artikel kustom yang ditulis admin, serta artikel warta dinamis hasil sinkronisasi dari portal resmi UMKT.

```mermaid
graph TD
    StaticData[Default Curated Articles - masta-data.ts] --> StoreEngine[Blog Store Engine - lib/blog-store.ts]
    CustomLocal[(Local Storage Custom Posts)] --> StoreEngine
    
    PortalUMKT[Portal Resmi UMKT www.umkt.ac.id] -->|Django REST API /berita/| ScraperAPI[/api/scrape-umkt]
    ScraperAPI -->|JSON Response| AdminSync[Tombol Sync di /adminuse]
    AdminSync -->|Persist ke Local Storage| CustomLocal
    
    StoreEngine --> BlogReader[Halaman Pembaca /blog & /blog/[slug]]
    StoreEngine --> MobileFeed[Halaman Mobile /mobile/hub-umkt]
```

---

## 2. Kategori Artikel & Topik Pembahasan

Setiap artikel diklasifikasikan ke dalam salah satu dari 7 kategori resmi:

1. **Adaptasi & Rantau:** Tips memilih kost di Juanda/Pramuka, rute angkutan umum Samarinda, dan manajemen keuangan bulanan.
2. **Akademik & SIKAD:** Panduan pengisian KRS, bimbingan PA, dan simulasi IPK.
3. **Beasiswa:** Informasi Beasiswa Kaltim Tuntas, Beasiswa Kader Muhammadiyah, dan Beasiswa Prestasi UMKT.
4. **Organisasi & UKM:** Profil Ikatan Mahasiswa Muhammadiyah (IMM), HIMATIF, Tapak Suci, dan UKM Seni/Olahraga.
5. **Teknis MASTA:** Panduan On-Cam Zoom, gladi resik, dan jadwal gelombang.
6. **Fasilitas Kampus:** Akses Perpustakaan Digital, Lab Komputer Gedung E, dan Masjid Kampus.
7. **Berita Kampus:** Warta terkini, prestasi mahasiswa, dan pengumuman resmi institusi.

---

## 3. Fitur Panel Admin (`/adminuse`)

Panel administrasi konten menyediakan fungsionalitas komprehensif:

- **Autentikasi Aman:** Proteksi Passcode dengan mitigasi brute force (maksimal 5 kali salah) dan karantina otomatis.
- **Markdown Editor dengan Live Preview:** Menulis konten menggunakan format Markdown kaya dengan pratinjau instan berdampingan.
- **Preset Gambar Sampul HD:** Koleksi foto kampus beresolusi tinggi (Gedung Utama, Lab IT, Wisuda, Perpustakaan, dan Panorama Samarinda).
- **Tag Manager & Key Takeaways:** Menambahkan label kata kunci serta poin intisari (*bullet points*) artikel.
- **Tombol Sinkronisasi Cerdas (*Sync Scraper*):** Sekali klik untuk menarik warta rilis pers Humas UMKT langsung ke penyimpanan lokal aplikasi tanpa mengubah basis kode.
- **Reset Pabrik (*Factory Reset*):** Opsi mengembalikan seluruh daftar artikel ke konfigurasi standar.

---

## 4. Mekanisme Scraper Web UMKT (`lib/umkt-api.ts`)

Scraper terhubung langsung dengan backend resmi Django REST API UMKT:
- Mengonversi konten HTML berita menjadi teks bersih (*HTML stripping & sanitizer*).
- Menghitung perkiraan waktu baca secara otomatis (`readTime` berbasis rata-rata 450 karakter/menit).
- Menguraikan metadata Sustainable Development Goals (SDGs) institusi untuk dijadikan poin intisari (*key takeaways*).
- Menyimpan cache perantara berdurasi 180 detik (*ISR revalidation*) untuk mencegah beban berlebih pada server universitas.
