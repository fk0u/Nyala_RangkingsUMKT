# Arsitektur & Gambaran Sistem (System Overview)

Dokumen ini menjelaskan gambaran menyeluruh arsitektur perangkat lunak aplikasi **Nyala** (Sahabat Perjalanan MABA UMKT 2026), mencakup topologi modular, strategi routing, siklus data, keamanan tingkat enterprise, serta integrasi komponen.

- **Domain Produksi:** [https://nyala-umkt.vercel.app](https://nyala-umkt.vercel.app)
- **Creator & Publisher:** Al-Ghani Desta Setyawan (@kou.sozo) & Kantor Pemeringkatan UMKT
- **Spesifikasi Lengkap:** [Master SRS Document (`docs/srs-software-requirements.md`)](file:///d:/Project/Nyala_RangkingsUMKT/docs/srs-software-requirements.md)

---

## 1. Arsitektur Global & Pola Desain

Aplikasi Nyala dibangun di atas arsitektur modern **Next.js 16 App Router (Turbopack)** yang menggabungkan kemampuan *Server-Side Rendering (SSR)* dan *Edge Middleware Routing* untuk optimasi mesin pencari (SEO) dengan *Client-Side Interactivity (CSR)* untuk memberikan pengalaman pengguna yang sangat responsif (*Single Page Application feeling*).

```mermaid
graph TD
    Client[Browser / Smartphone Client] -->|HTTP/HTTPS Request| Edge[Vercel Edge / Next.js Middleware]
    
    subgraph Routing_Middleware [Smart Middleware Layer]
        Edge -->|User-Agent Detection / URL Mapping| Router{Middleware Router}
        Router -->|Desktop Route /| WebLayout[Desktop Layout & Pages]
        Router -->|Mobile Route /mobile/*| MobileLayout[Fluid Native Mobile App Layout]
    end

    subgraph Presentation_Layer [Presentation & Client Shell]
        WebLayout --> ThemeCtx[ThemeContext & ToastContext]
        MobileLayout --> ThemeCtx
        ThemeCtx --> Pages[Interactive Pages & Components]
        Pages --> JSONLD[Schema.org Structured Data JSON-LD]
    end

    subgraph Service_Layer [Service & Business Logic]
        Pages -->|Fetch Chat / Inquire| ApiChat[/api/chat Endpoint]
        Pages -->|Live Query Portal UMKT| ApiPortal[/api/umkt-portal Endpoint]
        Pages -->|Fetch Articles / Events| ApiScrape[/api/scrape-umkt Endpoint]
        Pages -->|Local Storage Read/Write| LocalDB[(Client localStorage)]
    end

    subgraph Security_Engine [In-House Protection & Cache]
        ApiChat --> RateLimiter[Sliding Window Limiter & Flood Throttle]
        RateLimiter --> Sanitizer[Input Sanitizer & XSS Guard]
        Sanitizer --> SemCache[In-Memory Normalized Hash Cache]
        SemCache -->|Cache Miss| ZpiSDK[Zpi SDK - Model GLM-4.7]
        SemCache -.->|Cache Hit < 1ms| QuickResp[Instant Response]
        ZpiSDK -.->|Network Outage| Fallback[Smart Local Knowledge Engine]
    end
```

---

## 2. Dual-Platform Architecture (Web & True Fluid Mobile)

Salah satu keunggulan arsitektur Nyala adalah implementasi **Dual Platform Experience**:

1. **Desktop Web Experience (`/`)**:
   - Menampilkan layout layar lebar dengan header navigasi elegan, bilah pencarian cerdas (`⌘K`), dan sistem bento grid asimetris.
   - Dioptimalkan untuk navigasi menggunakan mouse, touchpad, dan keyboard shortcut.
2. **True Fluid Mobile Native Experience (`/mobile/*`)**:
   - Rute mandiri dengan isolasi layout total tanpa komponen web ganda (mencegah *double navbar* atau *double dock*).
   - Menampilkan *native-like header* (status profil, prodi, dan toggle tema) serta *Floating Bottom Dock Bar* bersensor haptik.
   - Menggunakan komponen taktil gaya *Duolingo 3D Design* dengan *FlutterBottomSheet* untuk membaca artikel dan rincian acara.
   - Dilengkapi proteksi middleware: browser desktop standar yang membuka `/mobile/*` dialihkan otomatis ke halaman desktop padanannya (kecuali menggunakan DevTools Device Mode).

---

## 3. Struktur Modul & Direktori

```
Nyala_RangkingsUMKT/
├── app/
│   ├── layout.tsx              # Root layout web, OpenGraph, Twitter Card, & ClientShell
│   ├── page.tsx                # Landing page interaktif desktop
│   ├── globals.css             # Desain token, animasi kustom, & utilitas haptik
│   ├── sitemap.ts              # Generator Sitemap XML otomatis untuk SEO
│   ├── robots.ts               # Kebijakan perayapan mesin pencari
│   │
│   ├── api/                    # Serverless API routes
│   │   ├── chat/route.ts       # Endpoint AI Companion (Zpi SDK + Anti-DDoS + Cache)
│   │   ├── umkt-portal/route.ts# Proxy Live Query 2.100+ berita, event & fakultas
│   │   ├── scrape-umkt/route.ts# Scraper berita & agenda portal resmi UMKT
│   │   └── admin-auth/route.ts # Autentikasi sesi dashboard admin
│   │
│   ├── mobile/                 # Modul platform khusus mobile app
│   │   ├── layout.tsx          # Mobile container layout & floating dock
│   │   ├── page.tsx            # Beranda mobile dengan kartu ringkasan instan
│   │   ├── profile/page.tsx    # Manajemen profil mahasiswa & Eco-Impact SDGs
│   │   ├── companion/page.tsx  # Tanya Nyala AI versi antarmuka mobile
│   │   ├── checklist/page.tsx  # Checklist perlengkapan versi mobile
│   │   ├── hub-umkt/page.tsx   # Portal berita, event & 10 fakultas versi mobile
│   │   ├── hub-umkt/[slug]/    # Detail pembaca warta mobile dengan TTS
│   │   ├── jadwal/page.tsx     # Alur 5 tahap MASTA mobile
│   │   ├── panduan-sikad/      # Simulator SIKAD versi mobile
│   │   └── panduan-ti/         # Panduan kurikulum TI versi mobile
│   │
│   ├── companion/page.tsx      # Tanya Nyala AI Companion (Desktop)
│   ├── checklist/page.tsx      # Checklist Persiapan MABA (Desktop)
│   ├── health-check/page.tsx   # Mood & Physical Readiness Tracker
│   ├── jadwal/page.tsx         # 5 Tahap Alur MASTA & Countdown
│   ├── panduan-sikad/page.tsx  # Simulator & Panduan SIKAD Mahasiswa
│   ├── panduan-ti/page.tsx     # Panduan Akademik Prodi Teknologi Informasi
│   ├── hub-umkt/page.tsx       # Live Feed Portal UMKT Desktop
│   ├── hub-umkt/[slug]/page.tsx# Detail pembaca warta desktop + TTS
│   └── blog/page.tsx           # Majalah edukasi & panduan MABA
│
├── components/                 # Komponen UI modular terstandarisasi
│   ├── MascotFlame.tsx         # Maskot SVG interaktif dengan berbagai emosi
│   ├── CountdownTimer.tsx      # Hitung mundur realtime MASTA 2026
│   ├── Navbar.tsx              # Navigasi utama desktop
│   ├── Footer.tsx              # Footer & tautan resmi UMKT
│   ├── BacklinkBanner.tsx      # Banner rujukan resmi portal UMKT & Kemahasiswaan
│   ├── CookieConsent.tsx       # Lembar persetujuan penyimpanan data lokal
│   ├── CommandSearchModal.tsx  # Bilah pencarian global cepat (⌘K)
│   ├── SDGBadge.tsx            # Lencana SDG resmi PBB interaktif
│   ├── StructuredData.tsx      # Schema.org JSON-LD Knowledge Graph
│   └── SkeletonLoader.tsx      # Placeholder pemuatan animasi shimmer
│
├── context/
│   ├── ThemeContext.tsx        # Manajemen tema (Default Light Mode + Dark Mode)
│   └── ToastContext.tsx        # Sistem notifikasi toast taktil global
│
├── lib/
│   ├── ai-engine.ts            # Handler Zpi SDK, prompt persona, & offline fallback
│   ├── cache.ts                # In-Memory Cache dengan normalisasi kueri (TTL 2 jam)
│   ├── security.ts             # Rate Limiting, Flood Detection, & Input Sanitizer
│   ├── rate-limit.ts           # Sliding window rate limiter standalone
│   ├── umkt-api.ts             # API Client, Multi-Tier Slug Finder, Sanitizer
│   ├── faculty-data.ts         # Data direktori 10 fakultas & program studi
│   ├── masta-data.ts           # Data rujukan resmi MASTA, TI, SIKAD, & FAQ
│   ├── blog-store.ts           # Manajemen penyimpanan postingan blog lokal
│   └── utils.ts                # Class merging & format helper
│
└── public/
    └── manifest.json           # Konfigurasi Progressive Web App (PWA)
```

---

## 4. Siklus Pengolahan Data & State Management

Aplikasi mengadopsi prinsip **Offline-First & Zero Friction**:

1. **Preferensi & Data Pengguna (`Client State`):**
   - Data profil mahasiswa (Nama, NIM, Program Studi, Gugus MASTA), catatan kesehatan harian, jejak Eco-Impact SDGs, dan centang checklist disimpan di `localStorage` peramban.
   - Tidak memerlukan registrasi akun rumit, menjamin privasi data mahasiswa tetap terjaga di perangkat masing-masing.
2. **State Tema (`ThemeContext`):**
   - Nilai default disetel ke `light` untuk keterbacaan optimal di siang hari, dengan opsi beralih ke `dark` mode yang disimpan otomatis.
3. **Notifikasi Toast (`ToastContext`):**
   - Menghasilkan umpan balik instan saat aksi pengguna berhasil (misal: menyalin teks etika chat Dosen PA atau menandai checklist).

