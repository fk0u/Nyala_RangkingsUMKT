/**
 * Top-Level Security: Rate Limiter, Anti-DDoS Burst Guard, Input Sanitizer,
 * Prompt Injection Detector, and IP Quarantine System for Nyala AI API.
 *
 * Layers:
 *  1. IP Quarantine — blocked IPs are fully locked out for a cooldown period.
 *  2. Burst Guard   — max 5 requests per 5 seconds before quarantine triggers.
 *  3. Window Limiter — max 20 requests per 60 seconds (sliding window).
 *  4. Input Sanitizer — length limit, control character stripping, XSS blocking.
 *  5. Prompt Injection Detector — blocks known LLM exploitation patterns.
 *  6. IP Cleanup     — stale records are pruned every 10 minutes.
 */

interface RateLimitRecord {
  timestamps: number[];
  blockedUntil?: number;
  violationCount: number;
}

// In-Memory IP Store (sliding window)
const ipStore = new Map<string, RateLimitRecord>();

// Tuning constants
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const BURST_WINDOW_MS = 5 * 1000;
const MAX_BURST_REQUESTS = 5;
const BLOCK_DURATION_MS = 2 * 60 * 1000;
const ESCALATION_FACTOR = 2;
const MAX_MESSAGE_LENGTH = 1200;
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;

// Periodic cleanup of stale IP records (runs once, idempotent)
let cleanupScheduled = false;
function scheduleCleanup() {
  if (cleanupScheduled) return;
  cleanupScheduled = true;
  setInterval(() => {
    const now = Date.now();
    const staleIps: string[] = [];
    ipStore.forEach((record, ip) => {
      const hasRecentActivity = record.timestamps.some((ts) => now - ts < WINDOW_MS * 5);
      const isBlocked = record.blockedUntil && now < record.blockedUntil;
      if (!hasRecentActivity && !isBlocked) {
        staleIps.push(ip);
      }
    });
    staleIps.forEach((ip) => ipStore.delete(ip));
  }, CLEANUP_INTERVAL_MS);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
  reason?: string;
}

/**
 * Rate Limit + Burst Flood + IP Quarantine (escalating block duration)
 */
export function checkRateLimit(clientIp: string): RateLimitResult {
  scheduleCleanup();
  const now = Date.now();
  let record = ipStore.get(clientIp);

  if (!record) {
    record = { timestamps: [now], violationCount: 0 };
    ipStore.set(clientIp, record);
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  // Quarantine check
  if (record.blockedUntil && now < record.blockedUntil) {
    const retryAfter = Math.ceil((record.blockedUntil - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: retryAfter,
      reason: "Terdeteksi aktivitas mencurigakan. Akses ditangguhkan sementara.",
    };
  }

  // Slide the window
  record.timestamps = record.timestamps.filter((ts) => now - ts < WINDOW_MS);

  // Burst detection
  const recentBursts = record.timestamps.filter((ts) => now - ts < BURST_WINDOW_MS);
  if (recentBursts.length >= MAX_BURST_REQUESTS) {
    record.violationCount++;
    const duration = BLOCK_DURATION_MS * Math.pow(ESCALATION_FACTOR, Math.min(record.violationCount - 1, 4));
    record.blockedUntil = now + duration;
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(duration / 1000),
      reason: "Terlalu banyak permintaan dalam waktu singkat (Burst Flood). Silakan tunggu.",
    };
  }

  // Window limit
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

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - record.timestamps.length,
  };
}

/**
 * Input Sanitizer + Prompt Injection Detector + XSS Guard
 */
export function sanitizeInput(text: string): { valid: boolean; sanitized: string; error?: string } {
  if (typeof text !== "string" || text.trim().length === 0) {
    return { valid: false, sanitized: "", error: "Pesan tidak boleh kosong." };
  }

  if (text.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      sanitized: "",
      error: `Pesan terlalu panjang (maksimal ${MAX_MESSAGE_LENGTH} karakter).`,
    };
  }

  // Strip control characters & null bytes
  let sanitized = text
    .replace(/\0/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    .trim();

  // XSS payloads
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /on\w+\s*=/gi,
    /<iframe\b/gi,
    /<object\b/gi,
    /<embed\b/gi,
    /<svg\b[^>]*\bon\w+/gi,
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(sanitized)) {
      return {
        valid: false,
        sanitized: "",
        error: "Konten pesan mengandung format yang tidak diizinkan.",
      };
    }
  }

  // Prompt injection patterns (LLM exploitation attempts)
  const injectionPatterns = [
    /ignore\s+(all\s+)?(previous|prior|above|preceding)\s+(instructions?|prompts?|rules?)/i,
    /disregard\s+(all\s+)?(previous|prior|system)\s+(instructions?|prompts?)/i,
    /you\s+are\s+now\s+(a|an)\s+/i,
    /new\s+instructions?\s*:/i,
    /system\s*:\s*/i,
    /\[INST\]/i,
    /<<SYS>>/i,
    /```system/i,
    /act\s+as\s+(a|an|the|my)\s+(different|new|unrestricted|jailbroken)/i,
    /pretend\s+(you\s+are|to\s+be|you're)\s+(a|an)\s+(different|unrestricted)/i,
    /DAN\s*mode/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(sanitized)) {
      return {
        valid: false,
        sanitized: "",
        error: "Pesan terdeteksi mengandung pola yang tidak diperbolehkan.",
      };
    }
  }

  return { valid: true, sanitized };
}

/**
 * Client IP extraction (supports Vercel, Cloudflare, Nginx proxy headers)
 */
export function getClientIp(headers: Headers): string {
  const candidates = [
    headers.get("x-forwarded-for"),
    headers.get("x-real-ip"),
    headers.get("cf-connecting-ip"),
    headers.get("x-vercel-forwarded-for"),
  ];

  for (const header of candidates) {
    if (header) {
      const ip = header.split(",")[0].trim();
      if (ip && ip !== "::1") return ip;
    }
  }

  return "127.0.0.1";
}
