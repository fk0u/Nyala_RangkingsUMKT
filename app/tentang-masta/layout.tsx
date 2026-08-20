import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang MASTA UMKT 2026 - Nilai AIK, Tata Tertib & Sanksi",
  description: "Pelajari sejarah, nilai dasar Al-Islam & Kemuhammadiyahan (AIK), 5 alur tahapan orientasi resmi, dan sanksi kedisiplinan MASTA UMKT 2026.",
  openGraph: {
    title: "Tentang MASTA UMKT 2026 - Nilai AIK, Tata Tertib & Sanksi",
    description: "Pelajari filosofi, tata tertib resmi, pilar AIK, dan alur kelulusan sertifikat MASTA UMKT 2026.",
    url: "https://nyala.umkt.ac.id/tentang-masta",
    type: "website",
    images: [
      {
        url: "https://nyala.umkt.ac.id/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Tentang MASTA UMKT 2026 - Nilai AIK & Tata Tertib",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang MASTA UMKT 2026 - Nilai AIK, Tata Tertib & Sanksi",
    description: "Pelajari filosofi, tata tertib resmi, pilar AIK, dan 5 alur MASTA UMKT 2026.",
    images: ["https://nyala.umkt.ac.id/twitter-image"],
  },
};

export default function TentangMastaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
