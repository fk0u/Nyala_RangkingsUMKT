# Mistake Registry

Catatan kesalahan dan aturan pencegahan agar tidak terulang.

| ID | Tanggal | Deskripsi Error | Root Cause | Aturan Pencegahan |
|---|---|---|---|---|
| ERR-001 | 2026-08-22 | Klik sembarang berita di Hub Warta selalu membuka berita pertama (si A) | Detail page hanya mengambil 10 artikel tanpa pencocokan `b.slug === rawSlug` dan fallback ke `list[0]` | Gunakan `fetchUMKTArticleBySlug` dengan multi-tier slug & API search matching across 2.100+ artikel dan jangan fallback ke item[0] jika tidak cocok |
