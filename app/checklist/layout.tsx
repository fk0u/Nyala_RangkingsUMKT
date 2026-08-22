import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checklist Persiapan & Berkas Wajib MABA UMKT 2026",
  description: "Pantau kesiapan berkas pendaftaran, perlengkapan dresscode resmi MASTA, aktivasi akun SIKAD, dan persiapan fisik dengan checklist interaktif.",
  openGraph: {
    title: "Checklist Persiapan & Berkas Wajib MABA UMKT 2026",
    description: "Centang kelengkapan berkas, seragam MASTA, dan aktivasi sistem akademik Anda.",
    url: "https://nyala-umkt.vercel.app/checklist",
    type: "website",
    images: [
      {
        url: "https://nyala-umkt.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Checklist Persiapan & Berkas Wajib MABA UMKT 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Checklist Persiapan & Berkas Wajib MABA UMKT 2026",
    description: "Centang kelengkapan berkas, seragam MASTA, dan aktivasi akun SIKAD.",
    images: ["https://nyala-umkt.vercel.app/twitter-image"],
  },
};

export default function ChecklistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
