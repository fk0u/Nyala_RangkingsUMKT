import { ImageResponse } from "next/og";

export const alt = "Panduan & Kurikulum Prodi Teknologi Informasi UMKT 2026";
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
          background: "linear-gradient(135deg, #090D1E 0%, #111827 50%, #1E1B4B 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>
              💻
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: "900", color: "#FFFFFF" }}>PRODI TEKNOLOGI INFORMASI</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#F87171", letterSpacing: "1px" }}>FAKULTAS SAINS DAN TEKNOLOGI • UMKT 2026</span>
            </div>
          </div>
          <div style={{ padding: "8px 18px", borderRadius: "999px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.4)", fontSize: "14px", fontWeight: "800", color: "#FCA5A5" }}>
            AKREDITASI: BAIK SEKALI (LAM-INFOKOM)
          </div>
        </div>

        {/* Hero Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "10px", background: "rgba(249, 115, 22, 0.2)", color: "#FDBA74", fontSize: "14px", fontWeight: "900", alignSelf: "flex-start" }}>
            <span>🎓 SARJANA KOMPUTER (S.Kom)</span>
          </div>
          <h1 style={{ fontSize: "52px", fontWeight: "900", lineHeight: "1.15", margin: 0, color: "#FFFFFF" }}>
            Kurikulum & Roadmap Akademik <br />
            <span style={{ color: "#F87171" }}>
              Teknologi Informasi UMKT 2026
            </span>
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", margin: 0, maxWidth: "900px" }}>
            Paket 20 SKS Semester 1, Standar Nilai Minimum Kelulusan, Video Mindset MABA, dan 2 Peminatan: Jaringan & Rekayasa Sistem (JRS) serta Komputasi Cerdas (KC).
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {["Aljabar Linear", "Matematika Diskrit", "Statistika", "Dasar Pemrograman", "Sistem Digital", "Islamologi 1"].map((c, i) => (
              <span key={i} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", fontSize: "12px", fontWeight: "700", color: "#E2E8F0" }}>
                {c}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "15px", fontWeight: "900", color: "#EF4444", fontStyle: "italic" }}>
            "HIDUP TEKNIK! NO SKILL NO TRUST!"
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
