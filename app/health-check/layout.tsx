import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Check & Stamina Tracker MABA UMKT 2026",
  description: "Pemeriksaan kesiapan mental, hidrasi, tidur, dan stamina fisik harian untuk menjalani rangkaian orientasi kampus dengan bugar.",
  openGraph: {
    title: "Health Check & Stamina Tracker MABA UMKT 2026",
    description: "Evaluasi kesiapan fisik, mental, dan catatan hidrasi Anda bersama maskot Nyala.",
    url: "https://nyala.umkt.ac.id/health-check",
    type: "website",
    images: [
      {
        url: "https://nyala.umkt.ac.id/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Health Check & Stamina Tracker MABA UMKT 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Check & Stamina Tracker MABA UMKT 2026",
    description: "Evaluasi kesiapan fisik, mental, dan stamina harian MABA UMKT 2026.",
    images: ["https://nyala.umkt.ac.id/twitter-image"],
  },
};

export default function HealthCheckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
