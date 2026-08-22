import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tanya Nyala - Asisten AI Virtual MABA UMKT 2026",
  description: "Konsultasi cerdas dan responsif 24/7 bersama Nyala AI seputar alur MASTA, jadwal kuliah, kurikulum TI, kontak admin Biro Kemahasiswaan & PMB, dan adaptasi kampus.",
  openGraph: {
    title: "Tanya Nyala - Asisten AI Virtual MABA UMKT 2026",
    description: "Tanyakan apapun seputar MASTA, SIKAD, KRS, kurikulum TI, dan info kampus UMKT kepada AI Companion Nyala.",
    url: "https://nyala-umkt.vercel.app/companion",
    type: "website",
    images: [
      {
        url: "https://nyala-umkt.vercel.app/companion/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Tanya Nyala AI Virtual Companion UMKT 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanya Nyala - Asisten AI Virtual MABA UMKT 2026",
    description: "Konsultasi cerdas 24/7 bersama Nyala AI seputar MASTA, SIKAD, dan kurikulum TI UMKT.",
    images: ["https://nyala-umkt.vercel.app/companion/opengraph-image"],
  },
};

export default function CompanionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
