import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getAdminPassword(): string {
  // 1. Check environment variable first
  if (process.env.ADMIN_PASSWORD) {
    return process.env.ADMIN_PASSWORD.trim();
  }

  // 2. Check gitignored local config file .admin.config.local
  try {
    const configPath = path.join(process.cwd(), ".admin.config.local");
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, "utf-8");
      const match = content.match(/ADMIN_PASSWORD\s*=\s*(.+)/);
      if (match && match[1]) {
        return match[1].trim().replace(/^["']|["']$/g, "");
      }
    }
  } catch (err) {
    console.error("Error reading .admin.config.local:", err);
  }

  // 3. Fallback password
  return "nyala2026admin";
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = getAdminPassword();

    if (password && password.trim() === correctPassword) {
      return NextResponse.json({
        success: true,
        message: "Autentikasi admin berhasil.",
        sessionToken: `nyala_admin_${Date.now()}_auth`,
      });
    }

    return NextResponse.json(
      { success: false, message: "Kata sandi admin salah." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
