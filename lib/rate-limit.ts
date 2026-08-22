/**
 * In-memory Sliding Window Rate Limiter for API Route Protection
 * Prevents DDoS, brute force, and abusive scraping loops
 */

interface RateLimitRecord {
  timestamps: number[];
}

const ipStore = new Map<string, RateLimitRecord>();

// Clean up old entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    ipStore.forEach((record, ip) => {
      record.timestamps = record.timestamps.filter((t: number) => now - t < 300_000);
      if (record.timestamps.length === 0) {
        ipStore.delete(ip);
      }
    });
  }, 300_000);
}

export function checkRateLimit(
  identifier: string,
  limit: number = 30, // max requests
  windowMs: number = 60_000 // in 1 minute
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  let record = ipStore.get(identifier);

  if (!record) {
    record = { timestamps: [] };
    ipStore.set(identifier, record);
  }

  // Filter timestamps within the active window
  record.timestamps = record.timestamps.filter((t: number) => now - t < windowMs);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0];
    const resetMs = Math.max(0, windowMs - (now - oldest));
    return { allowed: false, remaining: 0, resetMs };
  }

  record.timestamps.push(now);
  const remaining = Math.max(0, limit - record.timestamps.length);
  return { allowed: true, remaining, resetMs: windowMs };
}
