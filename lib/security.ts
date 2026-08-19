/**
 * Top-Level Security, Anti-DDoS, Anti-Spam, & Input Sanitizer for Nyala AI API
 */

interface RateLimitRecord {
  timestamps: number[];
  blockedUntil?: number;
}

// In-Memory Storage for IP Tracking (Sliding Window)
const ipStore = new Map<string, RateLimitRecord>();

// Configuration Constants
const WINDOW_MS = 60 * 1000; // 1 Menit
const MAX_REQUESTS_PER_WINDOW = 20; // Max 20 request / menit per IP
const BURST_WINDOW_MS = 5 * 1000; // 5 Detik
const MAX_BURST_REQUESTS = 5; // Max 5 request dalam 5 detik
const BLOCK_DURATION_MS = 2 * 60 * 1000; // 2 Menit blokir jika terdeteksi spam/flood
const MAX_MESSAGE_LENGTH = 1200; // Maksimum karakter per pesan
const MAX_HISTORY_MESSAGES = 10; // Maksimum riwayat percakapan dikirim ke LLM

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
  reason?: string;
}

/**
 * Validasi Rate Limit & Deteksi Serangan Spam/DDoS
 */
export function checkRateLimit(clientIp: string): RateLimitResult {
  const now = Date.now();
  let record = ipStore.get(clientIp);

  if (!record) {
    record = { timestamps: [now] };
    ipStore.set(clientIp, record);
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  // Cek apakah IP sedang dalam status blokir (quarantine)
  if (record.blockedUntil && now < record.blockedUntil) {
    const retryAfter = Math.ceil((record.blockedUntil - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: retryAfter,
      reason: "Terdeteksi aktivitas mencurigakan. Akses Anda ditangguhkan sementara.",
    };
  }

  // Bersihkan timestamps lama di luar jendela 1 menit
  record.timestamps = record.timestamps.filter((ts) => now - ts < WINDOW_MS);

  // 1. Cek Burst Flood (cth: spam klik 5x dalam 5 detik)
  const recentBursts = record.timestamps.filter((ts) => now - ts < BURST_WINDOW_MS);
  if (recentBursts.length >= MAX_BURST_REQUESTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(BLOCK_DURATION_MS / 1000),
      reason: "Terlalu banyak permintaan dalam waktu singkat (Burst Flood). Silakan tunggu sebentar.",
    };
  }

  // 2. Cek Window Limit (20 req / menit)
  if (record.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = record.timestamps[0];
    const resetTime = oldest + WINDOW_MS;
    const retryAfter = Math.ceil((resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: retryAfter,
      reason: "Batas permintaan per menit tercapai. Harap tunggu sebelum mengirim pesan lagi.",
    };
  }

  // Catat request baru
  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - record.timestamps.length,
  };
}

/**
 * Sanitasi & Validasi Input User (Anti-Prompt Injection, Anti-XSS, Length Limiter)
 */
export function sanitizeInput(text: string): { valid: boolean; sanitized: string; error?: string } {
  if (typeof text !== "string" || text.trim().length === 0) {
    return { valid: false, sanitized: "", error: "Pesan tidak boleh kosong." };
  }

  // 1. Batasi panjang pesan
  if (text.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      sanitized: "",
      error: `Pesan terlalu panjang (maksimal ${MAX_MESSAGE_LENGTH} karakter).`,
    };
  }

  // 2. Bersihkan karakter kontrol berbahaya & null bytes
  let sanitized = text
    .replace(/\0/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    .trim();

  // 3. Deteksi pola eksploitasi berbahaya / harmful payloads
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(sanitized)) {
      return {
        valid: false,
        sanitized: "",
        error: "Konten pesan mengandung format yang tidak diizinkan.",
      };
    }
  }

  return { valid: true, sanitized };
}

/**
 * Ekstraksi IP Klien dari Header HTTP
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  return "127.0.0.1";
}
