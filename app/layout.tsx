import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import ClientShell from "@/components/ClientShell";
import StructuredData from "@/components/StructuredData";

export const viewport: Viewport = {
  themeColor: "#FF5A1F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nyala.umkt.ac.id"),
  title: {
    default: "Nyala . Teman Perjalanan MABA UMKT 2026",
    template: "%s | Nyala UMKT 2026",
  },
  description: "Virtual companion digital pintar, interaktif dan suportif untuk Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026. Lengkap dengan panduan alur resmi MASTA, simulasi SIKAD 1:1, kurikulum Prodi TI 2026, warta live kampus, checklist persiapan, dan Tanya Nyala AI.",
  keywords: [
    "Nyala",
    "MASTA UMKT 2026",
    "Mahasiswa Baru UMKT",
    "Universitas Muhammadiyah Kalimantan Timur",
    "Masa Ta'aruf UMKT",
    "SIKAD UMKT",
    "Teknologi Informasi UMKT",
    "Fakultas Sains dan Teknologi UMKT",
    "mahasiswa.umkt.ac.id",
    "MABA UMKT 2026",
    "Companion Mahasiswa",
    "Kurikulum TI UMKT",
    "Jadwal MASTA UMKT"
  ],
  authors: [{ name: "Kou Sozo", url: "https://instagram.com/kou.sozo" }],
  creator: "Kou Sozo",
  publisher: "Universitas Muhammadiyah Kalimantan Timur",
  alternates: {
    canonical: "https://nyala.umkt.ac.id",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nyala . Teman Perjalanan MABA UMKT 2026",
    description: "Digital companion resmi dan interaktif bagi Mahasiswa Baru UMKT 2026. Navigasi alur MASTA, simulator SIKAD 1:1, kurikulum TI 2026, warta live kampus, dan ngobrol dengan Nyala AI!",
    url: "https://nyala.umkt.ac.id",
    siteName: "Nyala UMKT",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://nyala.umkt.ac.id/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Nyala UMKT 2026 - Portal Sahabat Perjalanan Mahasiswa Baru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyala . Teman Perjalanan MABA UMKT 2026",
    description: "Digital companion interaktif resmi Mahasiswa Baru UMKT 2026. Alur MASTA, simulator SIKAD 1:1, kurikulum Prodi TI, dan AI Companion!",
    creator: "@kou.sozo",
    images: ["https://nyala.umkt.ac.id/twitter-image"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased selection:bg-nyala-500/20 selection:text-nyala-600">
        <ThemeProvider>
          <ToastProvider>
            <ClientShell>
              {children}
            </ClientShell>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
