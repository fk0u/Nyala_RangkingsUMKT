import { ImageResponse } from "next/og";

export const alt = "Panduan MABA & Warta Edukasi UMKT 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #1C0F0A 0%, #431407 50%, #1E1B4B 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "#EA580C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>
              📖
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: "900", color: "#FFFFFF" }}>MAJALAH EDUKASI MABA</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#FB923C", letterSpacing: "1px" }}>TIPS SURVIVAL & PANDUAN KAMPUS</span>
            </div>
          </div>
          <div style={{ padding: "8px 18px", borderRadius: "999px", background: "rgba(249, 115, 22, 0.15)", border: "1px solid rgba(249, 115, 22, 0.4)", fontSize: "14px", fontWeight: "800", color: "#FDBA74" }}>
            ARTIKEL TERVERIFIKASI
          </div>
        </div>

        {/* Hero Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "10px", background: "rgba(249, 115, 22, 0.2)", color: "#FFEDD5", fontSize: "14px", fontWeight: "900", alignSelf: "flex-start" }}>
            <span>🌟 PANDUAN LENGKAP MAHASISWA BARU</span>
          </div>
          <h1 style={{ fontSize: "52px", fontWeight: "900", lineHeight: "1.15", margin: 0, color: "#FFFFFF" }}>
            Panduan MABA & Warta Kampus: <br />
            <span style={{ color: "#FB923C" }}>
              Survival Rantau, Beasiswa & KRS
            </span>
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", margin: 0, maxWidth: "900px" }}>
            Kumpulan artikel dan panduan esensial: Mencari kost di sekitar Jl. Juanda, beasiswa KIP-Kuliah/Tahfidz di BIMA Gedung C, tips IPK 4.0, dan organisasi UKM.
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {["Tips Rantau", "Beasiswa KIP-K", "KRS SIKAD", "HIMATIF & UKM"].map((c, i) => (
              <span key={i} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", fontSize: "12px", fontWeight: "700", color: "#E2E8F0" }}>
                {c}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "14px", fontWeight: "800", color: "#FB923C" }}>
            © 2026 Nyala UMKT
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
