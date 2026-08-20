import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hub UMKT Live - Sinkronisasi API 10 Fakultas & Berita Kampus",
  description: "Pusat warta terintegrasi live REST API web.umkt.ac.id. Menampilkan 2.100+ berita resmi, 340+ pengumuman kampus, agenda event IKN, dan direktori 10 fakultas UMKT.",
  openGraph: {
    title: "Hub UMKT Live - Sinkronisasi API 10 Fakultas & Berita Kampus",
    description: "Pantau feed berita live, agenda event kampus, pengumuman resmi, dan direktori 10 fakultas Universitas Muhammadiyah Kalimantan Timur.",
    url: "https://nyala.umkt.ac.id/hub-umkt",
    type: "website",
    images: [
      {
        url: "https://nyala.umkt.ac.id/hub-umkt/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Hub UMKT Live - Sinkronisasi API 10 Fakultas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hub UMKT Live - Sinkronisasi API 10 Fakultas & Berita Kampus",
    description: "Pantau feed berita live, event kampus, dan direktori 10 fakultas UMKT.",
    images: ["https://nyala.umkt.ac.id/hub-umkt/opengraph-image"],
  },
};

export default function HubUMKTLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
