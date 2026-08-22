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
  metadataBase: new URL("https://nyala-umkt.vercel.app"),
  title: {
    default: "Nyala . Teman Perjalanan MABA UMKT 2026 | Karya Al-Ghani Desta Setyawan",
    template: "%s | Nyala UMKT 2026",
  },
  description: "Virtual companion digital pintar, interaktif dan suportif untuk Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026 karya Al-Ghani Desta Setyawan (@kou.sozo). Lengkap dengan panduan alur resmi MASTA IMM, simulasi SIKAD 1:1, kurikulum Prodi TI 2026, warta live kampus, Eco-Impact Tracker SDGs, checklist berkas, dan Tanya Nyala AI.",
  keywords: [
    // Creator Personal Branding Keywords
    "Al-Ghani Desta Setyawan",
    "Al Ghani Desta Setyawan",
    "Al-Ghani Desta",
    "Al Ghani Desta",
    "Desta Setyawan",
    "Kou Sozo",
    "kou.sozo",
    "kou bio",
    "https://kou.bio",
    // Project & Competition Keywords
    "Nyala UMKT",
    "Nyala UMKT 2026",
    "Pemeringkatan UMKT",
    "umkt.ac.id/pemeringkatan",
    "Lomba Web Pemeringkatan UMKT",
    "Lomba Web UMKT 2026",
    "Kantor Pemeringkatan UMKT",
    "UniRank UMKT",
    // Academic & Campus Keywords
    "MASTA UMKT 2026",
    "Mahasiswa Baru UMKT 2026",
    "MABA UMKT 2026",
    "Universitas Muhammadiyah Kalimantan Timur",
    "Masa Ta'aruf UMKT",
    "SIKAD UMKT",
    "Simulator SIKAD",
    "Teknologi Informasi UMKT",
    "Fakultas Sains dan Teknologi UMKT",
    "mahasiswa.umkt.ac.id",
    "Kurikulum TI UMKT 2026",
    "Jadwal MASTA UMKT",
    "Eco-Impact MABA",
    "Green Campus UMKT",
    "SDGs UMKT",
    "Paperless MABA"
  ],
  authors: [
    { name: "Al-Ghani Desta Setyawan", url: "https://kou.bio" },
    { name: "Kou Sozo", url: "https://instagram.com/kou.sozo" },
    { name: "Kantor Pemeringkatan UMKT", url: "https://www.umkt.ac.id/pemeringkatan/" }
  ],
  creator: "Al-Ghani Desta Setyawan (@kou.sozo)",
  publisher: "Al-Ghani Desta Setyawan & Kantor Pemeringkatan UMKT (umkt.ac.id/pemeringkatan)",
  applicationName: "Nyala UMKT",
  category: "Education, Technology, Academic Companion",
  classification: "Web Application, Student Portal, AI Virtual Assistant",
  alternates: {
    canonical: "https://nyala-umkt.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nyala . Teman Perjalanan MABA UMKT 2026 | Karya Al-Ghani Desta Setyawan",
    description: "Digital companion resmi dan interaktif bagi Mahasiswa Baru UMKT 2026 karya Al-Ghani Desta Setyawan (@kou.sozo). Navigasi alur MASTA IMM, simulator SIKAD 1:1, kurikulum TI 2026, warta live kampus, Eco-Impact Tracker, dan Tanya Nyala AI!",
    url: "https://nyala-umkt.vercel.app",
    siteName: "Nyala UMKT - Sahabat MABA 2026",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://nyala-umkt.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Nyala UMKT 2026 - Karya Al-Ghani Desta Setyawan (@kou.sozo)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyala . Teman Perjalanan MABA UMKT 2026 | Al-Ghani Desta Setyawan",
    description: "Digital companion resmi Mahasiswa Baru UMKT 2026 karya Al-Ghani Desta Setyawan (@kou.sozo). Alur MASTA, simulator SIKAD 1:1, kurikulum Prodi TI, dan AI Companion!",
    creator: "@kou.sozo",
    images: ["https://nyala-umkt.vercel.app/twitter-image"],
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
