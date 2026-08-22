/**
 * UMKT Official REST API Client & Data Types
 * Base URL: https://web.umkt.ac.id/api/
 */

export interface UMKTArticleSDG {
  id: number;
  sdgs: string;
  color: string;
}

export interface UMKTBerita {
  id?: number;
  thumbnail: string | null;
  foto?: string | null;
  judul: string;
  isi: string;
  kategori?: {
    kategori: string;
  };
  url?: string;
  slug: string;
  tags?: string | string[];
  sdgs?: UMKTArticleSDG[];
  tanggal?: string;
  tgl_upload?: string;
  kode_lembaga?: string;
  publish?: boolean;
  created?: string | null;
}

export interface UMKTEvent {
  id?: number;
  thumbnail: string | null;
  foto?: string | null;
  judul: string;
  isi: string;
  kategori?: {
    kategori: string;
  };
  url?: string;
  slug: string;
  tags?: string | string[];
  tanggal?: string;
  tgl_event?: string;
  tgl_upload?: string;
  kode_lembaga?: string;
  publish?: boolean;
  created?: string | null;
}

export interface UMKTPengumuman {
  id?: number;
  thumbnail: string | null;
  foto?: string | null;
  judul: string;
  isi: string;
  kategori?: {
    kategori: string;
  };
  url?: string;
  slug: string;
  tags?: string | string[];
  tanggal?: string;
  tgl_upload?: string;
  kode_lembaga?: string;
  publish?: boolean;
  created?: string | null;
}

export interface UMKTFakultas {
  id?: number;
  logo: string | null;
  kode_lembaga?: string;
  nama_lembaga?: string;
  nama?: string;
  singkatan?: string;
  deskripsi?: string;
  keterangan?: string;
  jenis?: string;
  url?: string;
  link?: string;
}

export interface UMKTInformasi {
  id?: number;
  logo: string | null;
  kode_lembaga?: string;
  nama_lembaga?: string;
  nama?: string;
  deskripsi?: string;
  keterangan?: string;
  jenis?: string;
  url?: string;
  link?: string;
}

export interface UMKTLastUpdate {
  kode_lembaga?: string;
  judul?: string;
  tanggal?: string;
  created?: string | null;
  tanggal_formatted?: string;
  last_update?: string;
}

export type UMKTBeritaItem = UMKTBerita;
export type UMKTEventItem = UMKTEvent;
export type UMKTPengumumanItem = UMKTPengumuman;
export type UMKTFakultasItem = UMKTFakultas;
export type UMKTInformasiItem = UMKTInformasi;
export type UMKTLastUpdateItem = UMKTLastUpdate;

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
export function stripHtml(html?: string): string {
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

export const cleanHTML = stripHtml;

/**
 * Sanitize HTML content from CMS to work seamlessly in both Light and Dark modes
 * Strips hardcoded inline font colors, background colors, and styling artifacts
 */
export function sanitizeArticleHTML(html?: string): string {
  if (!html) return "";
  return html
    // Remove inline color styles like color: rgb(0,0,0) or color: #000 or color: black
    .replace(/color\s*:\s*[^;"]+;?/gi, "")
    // Remove inline background-color styles like background-color: rgb(255,255,255)
    .replace(/background-color\s*:\s*[^;"]+;?/gi, "")
    // Remove empty style attributes
    .replace(/style\s*=\s*["']\s*["']/gi, "")
    // Remove old font tags with color attribute
    .replace(/<font[^>]*color=[^>]*>/gi, "<span>")
    .replace(/<\/font>/gi, "</span>");
}

/**
 * Format ISO Date into Indonesian Friendly Date
 */
export function formatIndonesianDate(isoString?: string): string {
  if (!isoString) return "Terbaru";
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

export const formatDateIndo = formatIndonesianDate;

/**
 * Extract first image URL from HTML content string
 */
export function extractImageFromHTML(html?: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

/**
 * Generate clean URL slug from title and ID
 */
export function generateSlug(title: string, id?: number | string): string {
  const clean = (title || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);

  return id ? `${clean}-${id}` : clean || `berita-${Date.now()}`;
}

export async function fetchUMKTHub() {
  const res = await fetch("/api/umkt-portal?type=all-hub");
  return await res.json();
}
