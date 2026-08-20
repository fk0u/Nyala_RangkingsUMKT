import { ImageResponse } from "next/og";

export const alt = "Jadwal & Rundown Resmi MASTA UMKT 2026";
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
          background: "linear-gradient(135deg, #061A14 0%, #064E3B 50%, #0F172A 100%)",
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
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>
              🗓️
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: "900", color: "#FFFFFF" }}>RUNDOWN RESMI MASTA 2026</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#34D399", letterSpacing: "1px" }}>9 FAKULTAS • 3 GELOMBANG • 3.755 MAHASISWA</span>
            </div>
          </div>
          <div style={{ padding: "8px 18px", borderRadius: "999px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.4)", fontSize: "14px", fontWeight: "800", color: "#6EE7B7" }}>
            PENGESAHAN: 12 SHAFAR 1447 H
          </div>
        </div>

        {/* Hero Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.2)", color: "#A7F3D0", fontSize: "14px", fontWeight: "900", alignSelf: "flex-start" }}>
            <span>⏱️ JADWAL LENGKAP & TATA TERTIB RESMI</span>
          </div>
          <h1 style={{ fontSize: "52px", fontWeight: "900", lineHeight: "1.15", margin: 0, color: "#FFFFFF" }}>
            Jadwal Rangkaian MASTA UMKT 2026: <br />
            <span style={{ color: "#34D399" }}>
              MASTA IMM, Daring Zoom, & Puncak Milad
            </span>
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", margin: 0, maxWidth: "900px" }}>
            Jadwal MASTA IMM 3 Gelombang (18 - 20 Agt), Pembukaan & Materi Universitas Daring (24 & 26 Agt), UKM Expo & Puncak Milad Luring Kampus (28 Agt 2026).
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {["18-20 Agt: MASTA IMM", "24 Agt: Daring Hari 1", "26 Agt: Daring Hari 2", "28 Agt: UKM Expo & Milad"].map((c, i) => (
              <span key={i} style={{ padding: "6px 12px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", fontSize: "12px", fontWeight: "700", color: "#E2E8F0" }}>
                {c}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "14px", fontWeight: "800", color: "#34D399" }}>
            Sekretaris Panitia: Suhardiansyah, NIDN 1129058501
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
