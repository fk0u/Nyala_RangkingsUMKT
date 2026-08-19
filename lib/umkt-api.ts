/**
 * UMKT Official REST API Client & Data Types
 * Base URL: https://web.umkt.ac.id/api/
 * 
 * Endpoints:
 * - /api/berita/ (2,199+ news articles)
 * - /api/event/ (85+ live agendas & events)
 * - /api/pengumuman/ (349+ official academic announcements)
 * - /api/info-fakultas/ (10 official faculties)
 * - /api/informasi/ (59 official prodi, units & biro)
 * - /api/last-update/ (live portal update timestamps)
 */

export interface UMKTArticleSDG {
  id: number;
  sdgs: string;
  color: string;
}

export interface UMKTBeritaItem {
  thumbnail: string | null;
  judul: string;
  isi: string;
  kategori?: {
    kategori: string;
  };
  url: string;
  slug: string;
  tags?: string | string[];
  sdgs?: UMKTArticleSDG[];
  tanggal: string;
  kode_lembaga?: string;
  publish: boolean;
  created?: string | null;
}

export interface UMKTEventItem {
  thumbnail: string | null;
  judul: string;
  isi: string;
  kategori?: {
    kategori: string;
  };
  url: string;
  slug: string;
  tags?: string | string[];
  tanggal: string;
  kode_lembaga?: string;
  publish: boolean;
  created?: string | null;
}

export interface UMKTPengumumanItem {
  thumbnail: string | null;
  judul: string;
  isi: string;
  kategori?: {
    kategori: string;
  };
  url: string;
  slug: string;
  tags?: string | string[];
  tanggal: string;
  kode_lembaga?: string;
  publish: boolean;
  created?: string | null;
}

export interface UMKTFakultasItem {
  logo: string | null;
  kode_lembaga: string;
  nama_lembaga: string;
  deskripsi: string;
  jenis: string;
  url: string;
}

export interface UMKTInformasiItem {
  logo: string | null;
  kode_lembaga: string;
  nama_lembaga: string;
  deskripsi: string;
  jenis: string;
  url: string;
}

export interface UMKTLastUpdateItem {
  kode_lembaga: string;
  judul: string;
  tanggal: string;
  created: string | null;
  tanggal_formatted: string;
}

export interface UMKTListResponse<T> {
  count: number;
  total_pages?: number;
  current_page?: number;
  page_size?: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}

const UMKT_API_BASE = "https://web.umkt.ac.id/api";

const API_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
  "Referer": "https://web.umkt.ac.id/",
  "Origin": "https://web.umkt.ac.id"
};

/**
 * Fetch official data from UMKT API with automatic fallback and caching
 */
export async function fetchUMKTApi<T>(
  endpoint: string,
  params?: Record<string, string | number>,
  revalidate: number = 180 // 3 minutes ISR cache
): Promise<T | null> {
  try {
    const url = new URL(`${UMKT_API_BASE}/${endpoint.replace(/^\//, "")}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          url.searchParams.set(k, String(v));
        }
      });
    }

    const res = await fetch(url.toString(), {
      headers: API_HEADERS,
      next: { revalidate },
    });

    if (!res.ok) {
      console.warn(`[UMKT API] Failed to fetch ${url.toString()} status: ${res.status}`);
      return null;
    }

    return await res.json() as T;
  } catch (error: any) {
    console.error(`[UMKT API] Fetch error for ${endpoint}:`, error.message);
    return null;
  }
}

/**
 * Helper to strip HTML tags for clean text preview
 */
export function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Format ISO Date into Indonesian Friendly Date
 */
export function formatIndonesianDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
}
