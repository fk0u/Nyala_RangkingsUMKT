import { ImageResponse } from "next/og";

export const alt = "Hub UMKT Live - Sinkronisasi API 10 Fakultas & Warta Kampus";
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
          background: "linear-gradient(135deg, #0B132B 0%, #1C2541 50%, #3A506B 100%)",
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
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "#0284C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>
              📡
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: "900", color: "#FFFFFF" }}>HUB UMKT LIVE FEED</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#7DD3FC", letterSpacing: "1px" }}>web.umkt.ac.id/api</span>
            </div>
          </div>
          <div style={{ padding: "8px 18px", borderRadius: "999px", background: "rgba(56, 189, 248, 0.15)", border: "1px solid rgba(56, 189, 248, 0.4)", fontSize: "14px", fontWeight: "800", color: "#BAE6FD" }}>
            REALTIME DJANGO REST API
          </div>
        </div>

        {/* Hero Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "10px", background: "rgba(56, 189, 248, 0.2)", color: "#E0F2FE", fontSize: "14px", fontWeight: "900", alignSelf: "flex-start" }}>
            <span>📰 PUSAT INFORMASI & DIREKTORI RESMI</span>
          </div>
          <h1 style={{ fontSize: "52px", fontWeight: "900", lineHeight: "1.15", margin: 0, color: "#FFFFFF" }}>
            Sinkronisasi Live API UMKT: <br />
            <span style={{ color: "#38BDF8" }}>
              2.100+ Berita, Pengumuman & 10 Fakultas
            </span>
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", margin: 0, maxWidth: "900px" }}>
            Pusat agregasi berita terverifikasi humas, edaran pengumuman resmi, agenda event kampus, pilar SDGs, dan direktori 10 fakultas resmi UMKT.
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {["2.100+ Berita", "340+ Pengumuman", "85+ Event", "10 Fakultas Resmi"].map((c, i) => (
              <span key={i} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", fontSize: "12px", fontWeight: "700", color: "#E2E8F0" }}>
                {c}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "14px", fontWeight: "800", color: "#38BDF8" }}>
            © 2026 Nyala UMKT
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
