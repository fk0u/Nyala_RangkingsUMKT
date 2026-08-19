/**
 * Top-Level In-Memory Smart Cache with LRU Eviction, TTL, Semantic Normalization,
 * Periodic Pruning, and Hit Statistics.
 *
 * Design:
 *  - MAX_ENTRIES: 500 cached responses.
 *  - DEFAULT_TTL: 2 hours per entry.
 *  - LRU Eviction: When full, evict the entry with the lowest hitCount first.
 *  - Pruning: Every 15 minutes, expired entries are swept.
 *  - Normalization: Queries are lowercased, punctuation-stripped, and whitespace-collapsed
 *    to maximize cache hits on equivalent questions.
 */

interface CacheEntry {
  response: string;
  expiresAt: number;
  hitCount: number;
  lastAccessedAt: number;
}

const cacheStore = new Map<string, CacheEntry>();
const MAX_CACHE_ENTRIES = 500;
const DEFAULT_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const PRUNE_INTERVAL_MS = 15 * 60 * 1000;   // 15 minutes

let stats = { hits: 0, misses: 0 };
let pruneScheduled = false;

function schedulePrune() {
  if (pruneScheduled) return;
  pruneScheduled = true;
  setInterval(() => {
    const now = Date.now();
    const expired: string[] = [];
    cacheStore.forEach((entry, key) => {
      if (now > entry.expiresAt) expired.push(key);
    });
    expired.forEach((k) => cacheStore.delete(k));
  }, PRUNE_INTERVAL_MS);
}

/**
 * Normalize a query string to maximize semantic cache hits.
 * "Apa itu MASTA UMKT 2026?" → "apa itu masta umkt 2026"
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/[?!.,;:_'"~`@#$%^&*()\-+=[\]{}|\\/]/g, "")
    .replace(/\s+/g, " ");
}

/**
 * Retrieve a cached response if it exists and has not expired.
 */
export function getFromCache(query: string): string | null {
  schedulePrune();
  const key = normalizeQuery(query);
  const entry = cacheStore.get(key);

  if (!entry) {
    stats.misses++;
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    cacheStore.delete(key);
    stats.misses++;
    return null;
  }

  entry.hitCount++;
  entry.lastAccessedAt = Date.now();
  stats.hits++;
  return entry.response;
}

/**
 * Store a response in the cache. When full, evict the least-used entry.
 */
export function saveToCache(query: string, response: string, ttlMs: number = DEFAULT_TTL_MS): void {
  schedulePrune();
  const key = normalizeQuery(query);

  if (cacheStore.size >= MAX_CACHE_ENTRIES) {
    // LRU eviction: find the entry with the lowest hitCount, breaking ties by oldest access
    let worstKey: string | null = null;
    let worstScore = Infinity;
    let worstAccess = Infinity;

    cacheStore.forEach((v, k) => {
      if (v.hitCount < worstScore || (v.hitCount === worstScore && v.lastAccessedAt < worstAccess)) {
        worstKey = k;
        worstScore = v.hitCount;
        worstAccess = v.lastAccessedAt;
      }
    });

    if (worstKey) cacheStore.delete(worstKey);
  }

  cacheStore.set(key, {
    response,
    expiresAt: Date.now() + ttlMs,
    hitCount: 0,
    lastAccessedAt: Date.now(),
  });
}

/**
 * Return current cache statistics for monitoring.
 */
export function getCacheStats() {
  const total = stats.hits + stats.misses;
  return {
    ...stats,
    size: cacheStore.size,
    maxSize: MAX_CACHE_ENTRIES,
    ttlHours: DEFAULT_TTL_MS / 3600000,
    hitRatio: total > 0 ? (stats.hits / total).toFixed(2) : "0.00",
  };
}
