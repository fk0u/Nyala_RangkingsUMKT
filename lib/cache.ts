/**
 * Top-Level In-Memory Smart Cache with Semantic Normalization & TTL
 */

interface CacheEntry {
  response: string;
  expiresAt: number;
  hitCount: number;
}

const cacheStore = new Map<string, CacheEntry>();
const MAX_CACHE_ENTRIES = 500;
const DEFAULT_TTL_MS = 2 * 60 * 60 * 1000; // 2 Jam Cache

let stats = {
  hits: 0,
  misses: 0,
};

/**
 * Normalisasi query untuk memaksimalkan cache hit
 * Contoh: "Apa itu MASTA UMKT 2026?" -> "apa itu masta umkt 2026"
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/[?!.,;:_'"~`@#$%^&*()\-+=[\]{}|\\/]/g, "")
    .replace(/\s+/g, " ");
}

/**
 * Ambil respon dari Cache jika ada dan belum kedaluwarsa
 */
export function getFromCache(query: string): string | null {
  const key = normalizeQuery(query);
  const entry = cacheStore.get(key);

  if (!entry) {
    stats.misses++;
    return null;
  }

  // Cek apakah sudah expired
  if (Date.now() > entry.expiresAt) {
    cacheStore.delete(key);
    stats.misses++;
    return null;
  }

  // Cache HIT
  entry.hitCount++;
  stats.hits++;
  return entry.response;
}

/**
 * Simpan respon ke Cache
 */
export function saveToCache(query: string, response: string, ttlMs: number = DEFAULT_TTL_MS): void {
  const key = normalizeQuery(query);

  // Jika cache sudah penuh, lakukan pembersihan LRU sederhana
  if (cacheStore.size >= MAX_CACHE_ENTRIES) {
    const firstKey = cacheStore.keys().next().value;
    if (firstKey) cacheStore.delete(firstKey);
  }

  cacheStore.set(key, {
    response,
    expiresAt: Date.now() + ttlMs,
    hitCount: 0,
  });
}

/**
 * Statistik Cache
 */
export function getCacheStats() {
  return {
    ...stats,
    size: cacheStore.size,
    hitRatio: stats.hits + stats.misses > 0 ? (stats.hits / (stats.hits + stats.misses)).toFixed(2) : "0.00",
  };
}
