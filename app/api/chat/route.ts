import { NextRequest, NextResponse } from "next/server";
import { queryAICompanion, ChatMessage } from "@/lib/ai-engine";
import { checkRateLimit, sanitizeInput, getClientIp } from "@/lib/security";
import { getCacheStats } from "@/lib/cache";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://nyala.umkt.ac.id",
];

function corsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const clientIp = getClientIp(req.headers);

  // 1. Rate Limit & Anti-DDoS
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: rateLimit.reason || "Terlalu banyak permintaan. Harap tunggu beberapa saat.",
        retryAfter: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          ...corsHeaders(origin),
          "Retry-After": String(rateLimit.retryAfterSeconds || 30),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const body = await req.json();
    const rawMessages: ChatMessage[] = body.messages || [];

    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong." },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    // 2. Input Sanitization & Prompt Injection Guard
    const sanitizedMessages: ChatMessage[] = [];
    for (const msg of rawMessages.slice(-10)) {
      if (typeof msg.content !== "string") continue;
      const clean = sanitizeInput(msg.content);
      if (!clean.valid) {
        return NextResponse.json(
          { error: clean.error || "Input tidak valid." },
          { status: 400, headers: corsHeaders(origin) }
        );
      }
      sanitizedMessages.push({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: clean.sanitized,
      });
    }

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "Pesan tidak valid atau kosong." },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    // 3. Execute Query (Zpi SDK + Top-Level Cache)
    const { reply, cached } = await queryAICompanion(sanitizedMessages);

    return NextResponse.json(
      {
        reply,
        cached,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          ...corsHeaders(origin),
          "X-Cache-Status": cached ? "HIT" : "MISS",
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { error: "Terjadi kendala pada pemrosesan AI. Silakan coba sesaat lagi." },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

// Health Check & Cache Stats
export async function GET() {
  const stats = getCacheStats();
  return NextResponse.json({
    status: "ok",
    service: "Nyala AI API v2",
    security: {
      rateLimiting: "sliding window (20 req/min)",
      burstGuard: "5 req/5s → escalating quarantine",
      promptInjection: "active (11 patterns blocked)",
      inputSanitization: "XSS + control chars + length (1200 max)",
      securityHeaders: "CSP + HSTS + X-Frame-Options + nosniff",
      cors: "origin whitelist",
    },
    cache: stats,
  });
}
