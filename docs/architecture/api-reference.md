# Referensi API (API Reference)

Dokumen ini mendokumentasikan spesifikasi seluruh rute *API Endpoints* yang disediakan oleh server aplikasi **Nyala** untuk melayani percakapan AI, sinkronisasi data berita portal resmi UMKT, dan pengelolaan administrasi.

---

## 1. Endpoint AI Companion (`/api/chat`)

Melayani pertanyaan interaktif seputar MASTA, perkuliahan, SIKAD, Program Studi TI, dan tips kehidupan kampus MABA.

- **URL:** `/api/chat`
- **Method:** `POST`, `OPTIONS`
- **Content-Type:** `application/json`
- **Keamanan:** Terproteksi oleh *Sliding Window Rate Limiter* (20 req/menit) dan *Burst Flood Throttle* (5 req/5 detik).

### Request Headers
| Header | Tipe | Wajib | Keterangan |
| :--- | :--- | :--- | :--- |
| `Content-Type` | `string` | Ya | Harus `application/json` |
| `Origin` | `string` | Tidak | Dicek terhadap whitelist CORS (`localhost:3000`, `nyala.umkt.ac.id`) |

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
- `messages` *(Array of Object, wajib)*: Riwayat pesan percakapan.
  - `role` *(string, wajib)*: `"user"` atau `"assistant"`.
  - `content` *(string, wajib)*: Teks pertanyaan/pesan (maksimal 1.200 karakter, otomatis disanitasi dari tag HTML/skrip berbahaya).

### Response Schema (Sukses - 200 OK)
```json
{
  "response": "Halo Sobat Nyala! ✨\n\nJadwal resmi pelaksanaan MASTA MABA UMKT 2026 dimulai pada **24 Agustus 2026**...",
  "source": "zpi-ai" // atau "cache" (jika hit < 1ms) atau "local-knowledge" (jika fallback offline)
}
```

### Response Schema (Rate Limited - 429 Too Many Requests)
```json
{
  "error": "Terlalu banyak permintaan berturut-turut. Harap jeda 10 detik.",
  "retryAfter": 10
}
```

---

## 2. Endpoint Scraper Berita UMKT (`/api/scrape-umkt`)

Menarik data warta dan agenda kegiatan terbaru langsung dari portal resmi `https://www.umkt.ac.id/` dengan mekanisme *Django REST API bridge* dan *ISR (Incremental Static Regeneration)* berdurasi 180 detik.

- **URL:** `/api/scrape-umkt`
- **Method:** `GET`
- **Caching:** ISR 180 detik (Cache-Control: `s-maxage=180, stale-while-revalidate=300`)

### Query Parameters
| Parameter | Tipe | Default | Keterangan |
| :--- | :--- | :--- | :--- |
| `page_size` | `number` | `12` | Jumlah artikel berita yang ditarik |

### Response Schema (Sukses - 200 OK)
```json
{
  "success": true,
  "source": "live_api_umkt",
  "total": 12,
  "articles": [
    {
      "slug": "umkt-raih-akreditasi-unggul-2026",
      "title": "UMKT Raih Akreditasi Unggul Institusi Tahun 2026",
      "excerpt": "Universitas Muhammadiyah Kalimantan Timur kembali mengukir prestasi gemilang...",
      "category": "Berita Kampus",
      "readTime": "3 menit baca",
      "author": "Humas UMKT",
      "date": "20 Agustus 2026",
      "imageUrl": "https://api.umkt.ac.id/media/berita/akreditasi.jpg",
      "keyTakeaways": [
        "Pencapaian akreditasi Unggul BAN-PT",
        "Peningkatan fasilitas riset dan laboratorium terpadu"
      ]
    }
  ]
}
```

---

## 3. Endpoint Portal Hub UMKT (`/api/umkt-portal`)

Menyediakan data teragregasi untuk tab Agenda, Pengumuman Kemahasiswaan, dan Info Beasiswa resmi.

- **URL:** `/api/umkt-portal`
- **Method:** `GET`
- **Headers:** `Cache-Control: public, s-maxage=300, stale-while-revalidate=600`

### Query Parameters
| Parameter | Tipe | Pilihan | Keterangan |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `events`, `announcements`, `scholarships` | Jenis data yang diminta |

### Response Schema (Sukses - 200 OK)
```json
{
  "success": true,
  "type": "events",
  "data": [
    {
      "id": "event-1",
      "title": "Sidang Terbuka & Kuliah Umum MABA UMKT 2026",
      "date": "24 Agustus 2026",
      "location": "Auditorium Utama Gedung E Lantai 4 & Zoom Meeting",
      "organizer": "Biro Kemahasiswaan UMKT"
    }
  ]
}
```

---

## 4. Endpoint Autentikasi Admin (`/api/admin-auth`)

Memvalidasi sesi login pengelola konten blog dan sinkronisasi artikel manual di panel `/adminuse`.

- **URL:** `/api/admin-auth`
- **Method:** `POST`
- **Body:** `{ "passcode": "string" }`
- **Response:**
  - `200 OK`: `{ "authenticated": true, "token": "string" }`
  - `401 Unauthorized`: `{ "authenticated": false, "message": "Passcode salah." }`
