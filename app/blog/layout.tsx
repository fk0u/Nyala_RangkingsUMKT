import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan MABA & Warta Edukasi UMKT 2026",
  description: "Kumpulan artikel panduan esensial mahasiswa baru UMKT 2026: tips survival anak rantau di Samarinda, panduan beasiswa KIP-K/Tahfidz, alur KRS, dan warta resmi.",
  openGraph: {
    title: "Panduan MABA & Warta Edukasi UMKT 2026",
    description: "Artikel panduan survival MABA, info beasiswa, alur KRS, organisasi UKM, dan warta kampus UMKT 2026.",
    url: "https://nyala.umkt.ac.id/blog",
    type: "website",
    images: [
      {
        url: "https://nyala.umkt.ac.id/blog/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Panduan MABA & Warta Edukasi UMKT 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Panduan MABA & Warta Edukasi UMKT 2026",
    description: "Artikel panduan survival MABA, info beasiswa, alur KRS, dan warta kampus UMKT 2026.",
    images: ["https://nyala.umkt.ac.id/blog/opengraph-image"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
