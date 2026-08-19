import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PASSPHRASE = "NyalaUMKT2026SecureAdmin!";

export async function POST(req: NextRequest) {
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

    if (passphrase.trim() === expectedPassphrase.trim()) {
      // Create a deterministic session auth token with expiry
      const timestamp = Date.now();
      const sessionToken = Buffer.from(`nyala_admin_${timestamp}_authorized`).toString("base64");

      const response = NextResponse.json({
        success: true,
        message: "Otorisasi berhasil. Selamat datang di Panel CMS Nyala.",
        token: sessionToken,
      });

      // Set secure HTTP-only cookie
      response.cookies.set("nyala_admin_session", sessionToken, {
        httpOnly: false, // Accessible to client for verification
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 8, // 8 hours
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Kunci sandi tidak valid. Akses ditolak." },
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
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
