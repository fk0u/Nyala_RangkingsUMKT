"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#0B132B",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "500px", padding: "2rem" }}>
          <div style={{
            fontSize: "4rem",
            marginBottom: "1rem",
            filter: "drop-shadow(0 0 20px rgba(255, 90, 31, 0.5))"
          }}>
            🔥
          </div>

          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            Terjadi Kesalahan Sistem
          </h1>

          <p style={{ fontSize: "0.95rem", color: "#94A3B8", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Sistem Nyala mendeteksi adanya kendala fatal pada antarmuka. Silakan muat ulang halaman untuk memulihkan sesi.
          </p>

          <button
            onClick={() => reset()}
            style={{
              padding: "0.85rem 1.75rem",
              borderRadius: "1rem",
              backgroundColor: "#FF5A1F",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(255, 90, 31, 0.4)",
              transition: "transform 0.15s ease"
            }}
          >
            Muat Ulang Halaman
          </button>
        </div>
      </body>
    </html>
  );
}
