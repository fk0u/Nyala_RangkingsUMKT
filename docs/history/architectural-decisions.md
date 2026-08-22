# Catatan Keputusan Arsitektur (Architecture Decision Records)

Dokumen ini mencatat keputusan-keputusan teknis dan arsitektural penting (*Architecture Decision Records / ADR*) yang diambil selama masa pengembangan aplikasi **Nyala**.

---

## ADR 001: Pemilihan Stack Next.js 16 (Turbopack) & React 19

- **Status:** Diterima & Terimplementasi
- **Konteks:** Diperlukan framework yang memiliki performa tinggi, waktu build cepat, kemampuan Server-Side Rendering (SSR) untuk SEO, serta fleksibilitas Serverless API Route dalam satu repositori (*monolith-friendly*).
- **Keputusan:** Menggunakan **Next.js 16.3.1** dengan engine Turbopack dan **React 19.2.8**.
- **Konsekuensi:**
  - Kecepatan hot-reload dan kompilasi meningkat drastis.
  - Dukungan penuh terhadap React Server Components (RSC) dan fitur Concurrent.
  - Kompatibel dengan deployment satu klik di Vercel Edge.

---

## ADR 002: Migrasi Total ke Ekosistem Phosphor Icons React

- **Status:** Diterima & Terimplementasi
- **Konteks:** Penggunaan paket ikon yang bercampur (misal gabungan font awesome dan lucide) menyebabkan inkonsistensi ketebalan garis, ukuran visual (*optical weight*), dan pembengkakan ukuran bundle JavaScript.
- **Keputusan:** Melakukan migrasi 100% dari seluruh komponen ke **`@phosphor-icons/react` (v2.1.10)**.
- **Konsekuensi:**
  - Keseragaman gaya visual di seluruh halaman (Web & Mobile).
  - Kemudahan penggunaan bobot ikon beragam (`regular`, `bold`, `fill`) sesuai status interaktif.
  - Pengurangan beban bundle karena dukungan tree-shaking yang optimal.

---

## ADR 003: Arsitektur Dual-Platform (Web & True Fluid Mobile Routing)

- **Status:** Diterima & Terimplementasi
- **Konteks:** Mahasiswa baru mengakses panduan MASTA mayoritas melalui ponsel saat berada di lapangan kampus. Desain web responsif konvensional sering kali kaku dan terasa lambat. Di sisi lain, pembatasan bingkai mockup HP buatan (*artificial iframe/frame*) mempersempit area pandang di layar nyata.
- **Keputusan:** Membangun sub-arsitektur mandiri di `/mobile/*` dengan *Next.js Middleware Auto-Routing* dan *True Fluid Layout* (tanpa bingkai sempit buatan, melainkan layout layar penuh dengan bottom floating dock).
- **Konsekuensi:**
  - Pengalaman penggunaan terasa seperti aplikasi native (APK/PWA).
  - Tidak ada konflik navigasi (*no double navbar*).
  - Fleksibilitas beralih ke tampilan web desktop bagi pengguna yang menginginkannya.

---

## ADR 004: Strategi Default Light Mode & Dark Mode Adaptif

- **Status:** Diterima & Terimplementasi
- **Konteks:** Kegiatan MASTA luar ruangan (luring kampus) berlangsung di bawah sinar matahari terang Samarinda, di mana *Dark Mode* sulit dibaca karena pantulan cahaya.
- **Keputusan:** Menetapkan **Light Mode** sebagai tema bawaan (*default*) untuk seluruh modul, dengan tetap menyediakan tombol beralih ke *Dark Mode* yang disimpan di `localStorage`.
- **Konsekuensi:**
  - Keterbacaan teks maksimal di kondisi pencahayaan luar ruangan.
  - Kenyamanan membaca di malam hari tetap terjaga saat mahasiswa beralih ke mode gelap secara manual.

---

## ADR 005: Sistem Keamanan Mandiri (In-House Rate Limiter & Semantic Cache)

- **Status:** Diterima & Terimplementasi
- **Konteks:** Mengandalkan layanan pihak ketiga seperti Redis / Upstash menambah kompleksitas dependensi, latensi jaringan antar-server, dan biaya operasional.
- **Keputusan:** Mengimplementasikan **Sliding Window Rate Limiter**, **Burst Flood Throttle**, dan **In-Memory Normalized Hash Cache** secara *native* di dalam runtime Node.js Next.js.
- **Konsekuensi:**
  - Waktu latensi cache < 1 milidetik.
  - Perlindungan tangguh terhadap serangan DoS dan bot tanpa biaya infrastruktur tambahan.
  - Zero external database dependencies untuk kebutuhan caching dasar.

---

## ADR 006: Standarisasi Domain Produksi Resmi & Schema.org JSON-LD

- **Status:** Diterima & Terimplementasi
- **Konteks:** Penggunaan domain acak atau staging menyebabkan fragmentasi indeks Googlebot dan menurunkan reputasi personal branding pengembang serta institusi.
- **Keputusan:** Menetapkan domain produksi tunggal **`https://nyala-umkt.vercel.app`** sebagai canonical base URL untuk seluruh OpenGraph, Twitter Cards, Sitemap XML, Robots.txt, dan menanamkan Schema.org JSON-LD Knowledge Graph terstruktur (`Person` untuk Al-Ghani Desta Setyawan / @kou.sozo, `EducationalOrganization` untuk UMKT, `WebApplication`, `BreadcrumbList`, dan `FAQPage`).
- **Konsekuensi:**
  - Validitas 100% pada Google Rich Results Test.
  - Sinkronisasi identitas kreator dan lembaga resmi terverifikasi secara global.

---

## ADR 007: Resolusi Slug Multi-Tier pada Live REST API Portal UMKT

- **Status:** Diterima & Terimplementasi
- **Konteks:** Backend Django REST Framework UMKT menyimpan 2.100+ artikel dengan slug berbasis string penuh tanpa menyertakan field ID numerik. Pengambilan 10 artikel awal menyebabkan kegagalan pencocokan pada berita halaman lanjut (fallback salah ke artikel pertama).
- **Keputusan:** Mengimplementasikan fungsi `fetchUMKTArticleBySlug()` yang menjalankan pencocokan multi-tingkat (Exact Slug -> Decoded Slug -> Generated Title Slug -> Substring / URL Match -> Backend Keyword Search Filter).
- **Konsekuensi:**
  - Setiap artikel berita dan rilis resmi yang diklik dari halaman mana pun terbuka dengan akurasi 100%.
  - Menghilangkan bug *fallback* palsu tanpa membebani kuota transfer server universitas.

