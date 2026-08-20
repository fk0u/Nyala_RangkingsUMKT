import crypto from "crypto";

/**
 * Top-Level Enterprise Security for Nyala App:
 *  1. Sliding Window & Burst Guard Rate Limiter (General API)
 *  2. Anti-Brute Force Quarantine Limiter (Admin Auth)
 *  3. Constant-Time Timing Attack Defense (Safe Passphrase Comparison)
 *  4. Advanced Input Sanitizer & Prompt Injection Detector
 *  5. Prototype Pollution & Malicious Payload Guard
 *  6. Multi-Proxy IP Extraction Engine
 */

interface RateLimitRecord {
  timestamps: number[];
  blockedUntil?: number;
  violationCount: number;
}

// In-Memory IP Stores
const generalIpStore = new Map<string, RateLimitRecord>();
const adminIpStore = new Map<string, RateLimitRecord>();

// General API Tuning constants
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;
const BURST_WINDOW_MS = 5 * 1000;
const MAX_BURST_REQUESTS = 7;
const BLOCK_DURATION_MS = 2 * 60 * 1000;
const ESCALATION_FACTOR = 2;
const MAX_MESSAGE_LENGTH = 1500;
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;

// Admin Auth Anti-Bruteforce Tuning constants
const ADMIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const ADMIN_MAX_FAILURES = 5;
const ADMIN_BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes lock

// Periodic cleanup of stale IP records
let cleanupScheduled = false;
function scheduleCleanup() {
  if (cleanupScheduled) return;
  cleanupScheduled = true;
  setInterval(() => {
    const now = Date.now();
    
    // Prune general store
    generalIpStore.forEach((record, ip) => {
      const hasRecent = record.timestamps.some((ts) => now - ts < WINDOW_MS * 5);
      const isBlocked = record.blockedUntil && now < record.blockedUntil;
      if (!hasRecent && !isBlocked) {
        generalIpStore.delete(ip);
      }
    });

    // Prune admin store
    adminIpStore.forEach((record, ip) => {
      const hasRecent = record.timestamps.some((ts) => now - ts < ADMIN_WINDOW_MS);
      const isBlocked = record.blockedUntil && now < record.blockedUntil;
      if (!hasRecent && !isBlocked) {
        adminIpStore.delete(ip);
      }
    });
  }, CLEANUP_INTERVAL_MS);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
  reason?: string;
}

/**
 * General API Rate Limit + Burst Flood + IP Quarantine
 */
export function checkRateLimit(clientIp: string): RateLimitResult {
  scheduleCleanup();
  const now = Date.now();
  let record = generalIpStore.get(clientIp);

  if (!record) {
    record = { timestamps: [now], violationCount: 0 };
    generalIpStore.set(clientIp, record);
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  // Quarantine check
  if (record.blockedUntil && now < record.blockedUntil) {
    const retryAfter = Math.ceil((record.blockedUntil - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: retryAfter,
      reason: "Aktivitas mencurigakan terdeteksi. Akses ditangguhkan sementara demi keamanan.",
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
      reason: "Terlalu banyak permintaan serentak (Burst Flood). Harap beri jeda sejenak.",
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
      reason: "Batas permintaan per menit tercapai. Harap tunggu sebelum mengirim permintaan baru.",
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - record.timestamps.length,
  };
}

/**
 * Admin Anti-Brute Force Checker
 */
export function checkAdminRateLimit(clientIp: string): RateLimitResult {
  scheduleCleanup();
  const now = Date.now();
  let record = adminIpStore.get(clientIp);

  if (!record) {
    return { allowed: true, remaining: ADMIN_MAX_FAILURES };
  }

  if (record.blockedUntil && now < record.blockedUntil) {
    const retryAfter = Math.ceil((record.blockedUntil - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: retryAfter,
      reason: `Terlalu banyak percobaan sandi gagal. Panel dikunci selama ${Math.ceil(retryAfter / 60)} menit.`,
    };
  }

  // Prune old failures
  record.timestamps = record.timestamps.filter((ts) => now - ts < ADMIN_WINDOW_MS);

  if (record.timestamps.length >= ADMIN_MAX_FAILURES) {
    record.blockedUntil = now + ADMIN_BLOCK_DURATION_MS;
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil(ADMIN_BLOCK_DURATION_MS / 1000),
      reason: "Batas percobaan login tercapai. Akses dibekukan sementara demi keamanan.",
    };
  }

  return {
    allowed: true,
    remaining: ADMIN_MAX_FAILURES - record.timestamps.length,
  };
}

export function recordAdminFailure(clientIp: string): void {
  const now = Date.now();
  let record = adminIpStore.get(clientIp);
  if (!record) {
    record = { timestamps: [now], violationCount: 1 };
    adminIpStore.set(clientIp, record);
  } else {
    record.timestamps.push(now);
    record.violationCount++;
    if (record.timestamps.length >= ADMIN_MAX_FAILURES) {
      record.blockedUntil = now + ADMIN_BLOCK_DURATION_MS;
    }
  }
}

export function recordAdminSuccess(clientIp: string): void {
  adminIpStore.delete(clientIp);
}

/**
 * Timing-Safe String Comparison to eliminate Timing Attacks
 */
export function timingSafeCompare(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");

  if (bufA.length !== bufB.length) {
    // Perform dummy timing to avoid length leak
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }

  return crypto.timingSafeEqual(bufA, bufB);
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

  // Prototype pollution keys check
  if (/\b(__proto__|constructor|prototype)\b/i.test(sanitized)) {
    return {
      valid: false,
      sanitized: "",
      error: "Input mengandung struktur berbahaya yang tidak diizinkan.",
    };
  }

  // XSS payloads
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b/gi,
    /<object\b/gi,
    /<embed\b/gi,
    /<svg\b[^>]*\bon\w+/gi,
    /<base\b/gi,
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(sanitized)) {
      return {
        valid: false,
        sanitized: "",
        error: "Konten pesan mengandung tag atau skrip yang tidak diizinkan.",
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
        error: "Pesan terdeteksi mengandung pola manipulasi instruksi sistem.",
      };
    }
  }

  return { valid: true, sanitized };
}

/**
 * Client IP extraction with Cloudflare, Vercel, and proxy header prioritization
 */
export function getClientIp(headers: Headers): string {
  const candidates = [
    headers.get("cf-connecting-ip"),
    headers.get("x-real-ip"),
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-forwarded-for"),
  ];

  for (const header of candidates) {
    if (header) {
      const ip = header.split(",")[0].trim();
      if (ip && ip !== "::1") return ip;
    }
  }

  return "127.0.0.1";
}
