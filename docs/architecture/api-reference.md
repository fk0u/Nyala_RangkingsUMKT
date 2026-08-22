# Referensi API (API Reference)

Dokumen ini mendokumentasikan spesifikasi seluruh rute *API Endpoints* yang disediakan oleh server aplikasi **Nyala** untuk melayani percakapan AI, kueri portal resmi UMKT, sinkronisasi scraper, dan pengelolaan administrasi.

- **Base URL Produksi:** `https://nyala-umkt.vercel.app`
- **Spesifikasi Lengkap:** [Master SRS Document (`docs/srs-software-requirements.md`)](file:///d:/Project/Nyala_RangkingsUMKT/docs/srs-software-requirements.md)

---

## 1. Endpoint AI Companion (`/api/chat`)

Melayani pertanyaan interaktif seputar MASTA, perkuliahan, SIKAD, Program Studi TI, dan tips adaptasi kampus MABA.

- **URL:** `/api/chat`
- **Method:** `POST`, `OPTIONS`
- **Content-Type:** `application/json`
- **Keamanan:** Terproteksi oleh *Sliding Window Rate Limiter* (20 req/menit), *Burst Flood Throttle* (5 req/5 detik), dan *Prompt Injection Guard*.

### Request Body Schema
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Kapan jadwal MASTA 2026 dan apa saja yang wajib disiapkan?"
    }
  ]
}
```

### Atribut Request
- `messages` *(Array of Object, wajib)*: Riwayat percakapan.
  - `role` *(string, wajib)*: `"user"` atau `"assistant"`.
  - `content` *(string, wajib)*: Teks pertanyaan (maksimal 1.200 karakter, otomatis disanitasi dari tag HTML/skrip berbahaya).

### Response Schema (Sukses - 200 OK)
```json
{
  "response": "Halo Sobat Nyala! ✨\n\nJadwal resmi pelaksanaan MASTA MABA UMKT 2026 dimulai pada **24 Agustus 2026**...",
  "source": "zpi-ai" // atau "cache" (jika hit < 1ms) atau "local-knowledge" (jika offline fallback)
}
```

---

## 2. Endpoint Portal Hub UMKT (`/api/umkt-portal`)

Proxy endpoint terpusat yang menjembatani aplikasi Nyala dengan Django REST Framework `https://web.umkt.ac.id/api/`.

- **URL:** `/api/umkt-portal`
- **Method:** `GET`
- **Caching:** Edge Cache (Cache-Control: `public, s-maxage=180, stale-while-revalidate=600`)

### Query Parameters
| Parameter | Tipe | Default | Pilihan / Keterangan |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `berita` | `all-hub` (agregasi lengkap), `berita`, `berita-lembaga`, `event`, `pengumuman`, `info-fakultas`, `informasi`, `last-update`, `sdgs-in-umkt` |
| `page` | `number` | `1` | Nomor halaman data |
| `page_size` | `number` | `10` | Jumlah data per halaman |
| `search` | `string` | `""` | Kata kunci pencarian judul/konten |
| `kode_lembaga` | `string` | `""` | Filter lembaga tertentu (misal: `lmbg1111` untuk FST, `lmbg1110` untuk FEBP) |

### Response Schema: Mode Aggregated (`type=all-hub`)
```json
{
  "status": "success",
  "source": "https://web.umkt.ac.id/api/",
  "timestamp": "2026-08-22T08:00:00.000Z",
  "data": {
    "berita": [...],
    "beritaTotal": 2145,
    "event": [...],
    "eventTotal": 48,
    "pengumuman": [...],
    "pengumumanTotal": 89,
    "fakultas": [...],
    "lastUpdate": [...]
  }
}
```

### Response Schema: Mode Kueri Spesifik (`type=berita`)
```json
{
  "status": "success",
  "endpoint": "berita/",
  "data": {
    "count": 2145,
    "next": "https://web.umkt.ac.id/api/berita/?page=2",
    "previous": null,
    "results": [
      {
        "thumbnail": "https://media.umkt.ac.id/web/thumbnail/...",
        "foto": "https://media.umkt.ac.id/web/dokumen/...",
        "judul": "FK UMKT Perkuat Sinergi dengan Orang Tua/Wali Mahasiswa Baru TA 2026/2027",
        "isi": "<p>Naskah artikel resmi...</p>",
        "slug": "fk-umkt-perkuat-sinergi-dengan-orang-tuawali-mahasiswa-baru-ta-20262027",
        "tags": "[\"Kabar kampus\"]",
        "sdgs": [
          { "id": 4, "sdgs": "Goal 4: Pendidikan Berkualitas", "color": "#C5192D" }
        ],
        "tanggal": "2026-08-22T09:33:00+08:00",
        "kode_lembaga": "lmbg1001",
        "publish": true
      }
    ]
  }
}
```

---

## 3. Endpoint Scraper Berita UMKT (`/api/scrape-umkt`)

Digunakan oleh panel admin `/adminuse` untuk melakukan sinkronisasi warta rilis pers Humas UMKT langsung ke penyimpanan lokal aplikasi tanpa kompilasi ulang kode.

- **URL:** `/api/scrape-umkt`
- **Method:** `GET`
- **Query Params:** `?page_size=12`
- **Output:** Array artikel terformat dengan estimasi waktu baca (`readTime`) dan ekstraksi gambar otomatis.

---

## 4. Endpoint Autentikasi Admin (`/api/admin-auth`)

Memvalidasi sesi login pengelola konten blog di panel `/adminuse`.

- **URL:** `/api/admin-auth`
- **Method:** `POST`
- **Body:** `{ "passcode": "string" }`
- **Keamanan:** Perbandingan string *timing-safe* (`crypto.timingSafeEqual`) untuk memitigasi serangan waktu (*timing attack*).
- **Response:**
  - `200 OK`: `{ "authenticated": true, "token": "jwt_token_payload" }`
  - `401 Unauthorized`: `{ "authenticated": false, "message": "Passcode salah atau sesi kedaluwarsa." }`

