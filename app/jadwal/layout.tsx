import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal & Rundown Resmi MASTA UMKT 2026",
  description: "Jadwal lengkap MASTA IMM 3 Gelombang (18 - 20 Agustus 2026), Materi Universitas Daring (24 & 26 Agustus), UKM Expo dan Puncak Milad (28 Agustus 2026).",
  openGraph: {
    title: "Jadwal & Rundown Resmi MASTA UMKT 2026",
    description: "Cek jadwal pembagian gelombang, sesi pagi/siang 9 fakultas, dan rundown lengkap MASTA UMKT 2026.",
    url: "https://nyala-umkt.vercel.app/jadwal",
    type: "website",
    images: [
      {
        url: "https://nyala-umkt.vercel.app/jadwal/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Jadwal & Rundown Resmi MASTA UMKT 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jadwal & Rundown Resmi MASTA UMKT 2026",
    description: "Jadwal MASTA IMM, Daring Zoom, UKM Expo, dan Puncak Milad UMKT 2026.",
    images: ["https://nyala-umkt.vercel.app/jadwal/opengraph-image"],
  },
};

export default function JadwalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
