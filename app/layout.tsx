import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#FF5A1F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Nyala — Teman Perjalanan MABA-mu | MASTA UMKT 2026",
  description: "Companion digital pintar & suportif untuk Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026. Lengkap dengan panduan alur resmi MASTA, Health Check, Checklist Persiapan, dan AI Companion.",
  keywords: [
    "Nyala",
    "MASTA UMKT 2026",
    "Mahasiswa Baru UMKT",
    "Universitas Muhammadiyah Kalimantan Timur",
    "Masa Ta'aruf UMKT",
    "MABA UMKT",
    "Companion Mahasiswa"
  ],
  authors: [{ name: "Tim Pengembang Nyala UMKT" }],
  openGraph: {
    title: "Nyala — Teman Perjalanan MABA-mu | MASTA UMKT 2026",
    description: "Digital companion resmi dan interaktif bagi Mahasiswa Baru UMKT 2026. Navigasi alur MASTA, periksa kesiapan mental & fisik, dan ngobrol dengan Nyala AI!",
    url: "https://nyala.umkt.ac.id",
    siteName: "Nyala UMKT",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
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
      <body className="antialiased selection:bg-nyala-500/20 selection:text-nyala-600">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <MobileNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
