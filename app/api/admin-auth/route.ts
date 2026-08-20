import { NextRequest, NextResponse } from "next/server";
import { 
  checkAdminRateLimit, 
  recordAdminFailure, 
  recordAdminSuccess, 
  timingSafeCompare, 
  getClientIp 
} from "@/lib/security";

const DEFAULT_PASSPHRASE = "NyalaUMKT2026SecureAdmin!";

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req.headers);

  // 1. Anti-Brute Force Protection
  const rateLimit = checkAdminRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: rateLimit.reason || "Percobaan masuk dibatasi. Silakan coba lagi beberapa saat lagi.",
        retryAfter: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds || 900),
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }

  try {
    const body = await req.json();
    const { passphrase } = body;

    const expectedPassphrase = process.env.ADMIN_PASSPHRASE || DEFAULT_PASSPHRASE;

    if (!passphrase || typeof passphrase !== "string") {
      return NextResponse.json(
        { success: false, message: "Kunci sandi wajib diisi." },
        { status: 400 }
      );
    }

    // 2. Constant-Time Timing Attack Defense
    const isValid = timingSafeCompare(passphrase.trim(), expectedPassphrase.trim());

    if (isValid) {
      recordAdminSuccess(clientIp);

      const timestamp = Date.now();
      const sessionToken = Buffer.from(`nyala_admin_${timestamp}_authorized`).toString("base64");

      const response = NextResponse.json({
        success: true,
        message: "Otorisasi berhasil. Selamat datang di Panel CMS Nyala.",
        token: sessionToken,
      });

      // Set hardened cookie
      response.cookies.set("nyala_admin_session", sessionToken, {
        httpOnly: false, // needed for client authorization checks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 8, // 8 hours
        path: "/",
      });

      return response;
    }

    // Record failure for rate limiting
    recordAdminFailure(clientIp);

    return NextResponse.json(
      { 
        success: false, 
        message: "Kunci sandi tidak valid. Akses ditolak.",
        remainingAttempts: Math.max(0, rateLimit.remaining - 1)
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin auth error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server autentikasi." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("nyala_admin_session")?.value;
  if (token && token.startsWith("bnlhbGFfYWRtaW5f")) {
    return NextResponse.json(
      { authenticated: true },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store",
        },
      }
    );
  }
  return NextResponse.json(
    { authenticated: false }, 
    { 
      status: 401,
      headers: {
        "Cache-Control": "private, no-cache, no-store",
      }
    }
  );
}
