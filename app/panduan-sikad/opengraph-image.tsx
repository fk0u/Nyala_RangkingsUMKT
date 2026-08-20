import { ImageResponse } from "next/og";

export const alt = "Simulator & Panduan Portal SIKAD Mahasiswa UMKT 1:1";
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
          background: "linear-gradient(135deg, #061A23 0%, #0F2D37 50%, #0A192F 100%)",
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
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "#0EA5E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px" }}>
              🌐
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: "900", color: "#FFFFFF" }}>PORTAL SIKAD UMKT</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#38BDF8", letterSpacing: "1px" }}>mahasiswa.umkt.ac.id</span>
            </div>
          </div>
          <div style={{ padding: "8px 18px", borderRadius: "999px", background: "rgba(14, 165, 233, 0.15)", border: "1px solid rgba(14, 165, 233, 0.4)", fontSize: "14px", fontWeight: "800", color: "#7DD3FC" }}>
            SIMULATOR INTERAKTIF 1:1
          </div>
        </div>

        {/* Hero Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "10px", background: "rgba(14, 165, 233, 0.2)", color: "#BAE6FD", fontSize: "14px", fontWeight: "900", alignSelf: "flex-start" }}>
            <span>📋 PANDUAN LENGKAP MAHASISWA BARU</span>
          </div>
          <h1 style={{ fontSize: "52px", fontWeight: "900", lineHeight: "1.15", margin: 0, color: "#FFFFFF" }}>
            Kuasai Portal SIKAD Mahasiswa: <br />
            <span style={{ color: "#38BDF8" }}>
              KRS Online, Presensi 75% & BRIVA
            </span>
          </h1>
          <p style={{ fontSize: "20px", color: "#CBD5E1", margin: 0, maxWidth: "900px" }}>
            Simulasi 6 alur operasional akademik: Login NIM, Validasi KRS Dosen PA, Cek Jadwal Ruang Kuliah, Presensi Kehadiran Minimal 75%, Generate Virtual Account BRIVA, dan KHS Transkrip Nilai.
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {["1. Login NIM", "2. KRS 20 SKS", "3. Jadwal Ruang", "4. Presensi 75%", "5. BRIVA SPP", "6. KHS & IPS"].map((c, i) => (
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
