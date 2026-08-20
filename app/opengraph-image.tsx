import { ImageResponse } from "next/og";

export const alt = "Nyala . Sahabat Perjalanan MABA UMKT 2026";
export const size = {
  width: 1200,
  height: 630,
};
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
          background: "linear-gradient(135deg, #070B19 0%, #0F172A 50%, #1E293B 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Glowing Orange Flame Ambient Halo */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.45) 0%, rgba(234, 88, 12, 0.15) 50%, transparent 70%)",
          }}
        />
        
        {/* Cyan Ambient Rim */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Logo & Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, #F97316 0%, #EA580C 50%, #C2410C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 30px rgba(249, 115, 22, 0.6)",
                fontSize: "30px",
              }}
            >
              🔥
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.5px", color: "#FFFFFF" }}>
                NYALA <span style={{ color: "#F97316" }}>UMKT</span>
              </span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#94A3B8", letterSpacing: "1px", textTransform: "uppercase" }}>
                Sahabat Perjalanan MABA 2026
              </span>
            </div>
          </div>

          {/* Official Accreditation / Semester Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "14px",
              fontWeight: "800",
              color: "#38BDF8",
              letterSpacing: "0.5px",
            }}
          >
            <span>🏛️ UNIVERSITAS MUHAMMADIYAH KALIMANTAN TIMUR</span>
          </div>
        </div>

        {/* Central Hero Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "12px",
              background: "rgba(249, 115, 22, 0.2)",
              border: "1px solid rgba(249, 115, 22, 0.4)",
              color: "#FB923C",
              fontSize: "15px",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              alignSelf: "flex-start",
            }}
          >
            <span>✨ DIGITAL COMPANION RESMI MAHASISWA BARU 2026</span>
          </div>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: "900",
              lineHeight: "1.15",
              letterSpacing: "-1.5px",
              margin: 0,
              color: "#FFFFFF",
            }}
          >
            Nyala. Teman Perjalanan <br />
            <span
              style={{
                color: "#F97316",
              }}
            >
              MABA UMKT Angkatan 2026.
            </span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "1.4",
              color: "#CBD5E1",
              margin: 0,
              maxWidth: "920px",
            }}
          >
            Panduan Alur Resmi MASTA, Simulator SIKAD 1:1, Kurikulum Prodi Teknologi Informasi 2026, Hitung Mundur Realtime, dan Tanya Nyala AI Companion.
          </p>
        </div>

        {/* Bottom Feature Badges & Slogan */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          {/* Feature Tags */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {[
              "📅 Alur 5 Tahap MASTA",
              "💻 Simulator SIKAD 1:1",
              "🎓 Kurikulum TI 2026",
              "🤖 Tanya Nyala AI",
              "📰 Live Feed 10 Fakultas",
            ].map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#E2E8F0",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Slogan */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: "900", color: "#F97316", fontStyle: "italic", letterSpacing: "0.5px" }}>
              "HIDUP TEKNIK! NO SKILL NO TRUST!"
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
