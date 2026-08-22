import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulator & Panduan SIKAD Mahasiswa UMKT 1:1",
  description: "Pelajari simulasi alur KRS Online, presensi perkuliahan 75%, tagihan BRIVA keuangan, dan transkrip nilai KHS di portal mahasiswa.umkt.ac.id.",
  openGraph: {
    title: "Simulator & Panduan SIKAD Mahasiswa UMKT 1:1",
    description: "Pelajari simulasi KRS Online, presensi minimal 75%, tagihan BRIVA, dan KHS di portal resmi mahasiswa.umkt.ac.id.",
    url: "https://nyala-umkt.vercel.app/panduan-sikad",
    type: "website",
    images: [
      {
        url: "https://nyala-umkt.vercel.app/panduan-sikad/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Simulator SIKAD Mahasiswa UMKT 1:1",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulator & Panduan SIKAD Mahasiswa UMKT 1:1",
    description: "Pelajari simulasi alur KRS Online, presensi 75%, tagihan BRIVA, dan KHS.",
    images: ["https://nyala-umkt.vercel.app/panduan-sikad/opengraph-image"],
  },
};

export default function PanduanSikadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
