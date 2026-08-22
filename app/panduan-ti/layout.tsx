import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan & Kurikulum Prodi Teknologi Informasi 2026",
  description: "Eksplorasi kurikulum lengkap, paket 20 SKS semester 1, standar nilai kelulusan, profil dosen tetap, video mindset MABA, dan roadmap peminatan JRS & KC Prodi TI UMKT 2026.",
  openGraph: {
    title: "Panduan & Kurikulum Prodi Teknologi Informasi UMKT 2026",
    description: "Kenali kurikulum, standar nilai kelulusan, video mindset MABA, dan peminatan Jaringan & Komputasi Cerdas di Prodi TI UMKT.",
    url: "https://nyala-umkt.vercel.app/panduan-ti",
    type: "website",
    images: [
      {
        url: "https://nyala-umkt.vercel.app/panduan-ti/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Panduan & Kurikulum Prodi TI UMKT 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Panduan & Kurikulum Prodi Teknologi Informasi UMKT 2026",
    description: "Kenali kurikulum, standar nilai kelulusan, video mindset MABA, dan peminatan Jaringan & Komputasi Cerdas di Prodi TI UMKT.",
    images: ["https://nyala-umkt.vercel.app/panduan-ti/opengraph-image"],
  },
};

export default function PanduanTILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
