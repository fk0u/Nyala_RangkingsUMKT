import { NextRequest, NextResponse } from "next/server";
import { queryAICompanion, ChatMessage } from "@/lib/ai-engine";
import { checkRateLimit, sanitizeInput, getClientIp } from "@/lib/security";
import { getCacheStats } from "@/lib/cache";

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req.headers);

  // 1. TOP-LEVEL RATE LIMITING & ANTI-DDOS / ANTI-SPAM
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
        { status: 400 }
      );
    }

    // 2. INPUT SANITIZATION & ANTI-INJECTION
    const sanitizedMessages: ChatMessage[] = [];
    for (const msg of rawMessages.slice(-10)) {
      if (typeof msg.content !== "string") continue;
      const clean = sanitizeInput(msg.content);
      if (!clean.valid) {
        return NextResponse.json(
          { error: clean.error || "Input tidak valid." },
          { status: 400 }
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
        { status: 400 }
      );
    }

    // 3. EXECUTE QUERY (ZPI SDK + TOP-LEVEL CACHE)
    const { reply, cached } = await queryAICompanion(sanitizedMessages);

    return NextResponse.json(
      {
        reply,
        cached,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "X-Cache-Status": cached ? "HIT" : "MISS",
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { error: "Terjadi kendala pada pemrosesan AI. Silakan coba sesaat lagi." },
      { status: 500 }
    );
  }
}

// Endpoint GET untuk status cache dan health check API
export async function GET() {
  const stats = getCacheStats();
  return NextResponse.json({
    status: "ok",
    service: "Nyala AI API",
    security: {
      rateLimiting: "active (sliding window)",
      antiDDoS: "active (burst throttle + quarantine)",
      inputSanitization: "active (XSS & length protection)",
    },
    cache: stats,
  });
}
