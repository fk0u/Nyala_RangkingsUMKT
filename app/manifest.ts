import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nyala — Teman Perjalanan MABA UMKT 2026",
    short_name: "Nyala UMKT",
    description: "Digital Companion Web App resmi bagi Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F172A",
    theme_color: "#FF5A1F",
    orientation: "portrait",
    lang: "id-ID",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
