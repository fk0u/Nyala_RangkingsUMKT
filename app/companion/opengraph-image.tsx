import { ImageResponse } from "next/og";

export const alt = "Tanya Nyala - Asisten AI Virtual MABA UMKT 2026";
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
          background: "linear-gradient(135deg, #1E0B24 0%, #3B0764 50%, #0F172A 100%)",
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
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "#A855F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>
              🤖
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: "900", color: "#FFFFFF" }}>TANYA NYALA AI COMPANION</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#C084FC", letterSpacing: "1px" }}>POWERED BY NYALA AI ENGINE</span>
            </div>
          </div>
          <div style={{ padding: "8px 18px", borderRadius: "999px", background: "rgba(168, 85, 247, 0.15)", border: "1px solid rgba(168, 85, 247, 0.4)", fontSize: "14px", fontWeight: "800", color: "#E9D5FF" }}>
            RESPON CEPAT 24/7
          </div>
        </div>

        {/* Hero Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "10px", background: "rgba(168, 85, 247, 0.2)", color: "#F3E8FF", fontSize: "14px", fontWeight: "900", alignSelf: "flex-start" }}>
            <span>✨ VIRTUAL COMPANION KHUSUS MABA UMKT 2026</span>
          </div>
          <h1 style={{ fontSize: "52px", fontWeight: "900", lineHeight: "1.15", margin: 0, color: "#FFFFFF" }}>
            Tanya Nyala: Konsultasi AI <br />
            <span style={{ color: "#C084FC" }}>
              Seputar MASTA, SIKAD & Prodi TI
            </span>
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", margin: 0, maxWidth: "900px" }}>
            Asisten digital pintar yang siap menjawab seluruh pertanyaanmu seputar tata tertib MASTA, kontak admin PMB & BIMA Gedung C, kurikulum semester 1, dan tips adaptasi kampus.
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {["Alur MASTA", "SIKAD & KRS", "Kurikulum TI", "Kontak Admin UMKT"].map((c, i) => (
              <span key={i} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", fontSize: "12px", fontWeight: "700", color: "#E2E8F0" }}>
                {c}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "14px", fontWeight: "800", color: "#C084FC" }}>
            © 2026 Nyala UMKT
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
