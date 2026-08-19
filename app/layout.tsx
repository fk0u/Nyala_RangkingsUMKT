import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import ClientShell from "@/components/ClientShell";

export const viewport: Viewport = {
  themeColor: "#FF5A1F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Nyala — Teman Perjalanan MABA-mu | MASTA UMKT 2026",
  description: "Companion digital pintar & suportif untuk Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026. Lengkap dengan panduan alur resmi MASTA, Health Check, Checklist Persiapan, Panduan SIKAD, Kurikulum TI 2026, dan AI Companion.",
  keywords: [
    "Nyala",
    "MASTA UMKT 2026",
    "Mahasiswa Baru UMKT",
    "Universitas Muhammadiyah Kalimantan Timur",
    "Masa Ta'aruf UMKT",
    "SIKAD UMKT",
    "Teknologi Informasi UMKT",
    "mahasiswa.umkt.ac.id",
    "MABA UMKT",
    "Companion Mahasiswa"
  ],
  authors: [{ name: "Tim Pengembang Nyala UMKT" }],
  openGraph: {
    title: "Nyala — Teman Perjalanan MABA-mu | MASTA UMKT 2026",
    description: "Digital companion resmi dan interaktif bagi Mahasiswa Baru UMKT 2026. Navigasi alur MASTA, periksa kesiapan mental & fisik, panduan SIKAD 1:1, kurikulum TI 2026, dan ngobrol dengan Nyala AI!",
    url: "https://nyala.umkt.ac.id",
    siteName: "Nyala UMKT",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
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
