import React from "react";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://www.umkt.ac.id/#organization",
        "name": "Universitas Muhammadiyah Kalimantan Timur",
        "alternateName": "UMKT",
        "url": "https://www.umkt.ac.id",
        "logo": "https://nyala.umkt.ac.id/favicon.svg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. Ir. H. Juanda No. 15",
          "addressLocality": "Samarinda",
          "addressRegion": "Kalimantan Timur",
          "postalCode": "75124",
          "addressCountry": "ID"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+62-812-3001-7008",
            "contactType": "Admissions / PMB",
            "areaServed": "ID",
            "availableLanguage": ["Indonesian", "English"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+62-822-5087-8843",
            "contactType": "Student Affairs / Biro Kemahasiswaan (BIMA)",
            "areaServed": "ID",
            "availableLanguage": ["Indonesian"]
          }
        ]
      },
      {
        "@type": "WebApplication",
        "@id": "https://nyala.umkt.ac.id/#webapp",
        "name": "Nyala . Sahabat Perjalanan MABA UMKT 2026",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "url": "https://nyala.umkt.ac.id",
        "author": {
          "@type": "Person",
          "name": "Kou Sozo",
          "url": "https://instagram.com/kou.sozo"
        },
        "description": "Virtual companion digital pintar, interaktif dan suportif untuk Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026. Panduan resmi alur MASTA, simulator SIKAD 1:1, kurikulum TI 2026, warta live kampus, dan Tanya Nyala AI.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "IDR"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://nyala.umkt.ac.id/#website",
        "url": "https://nyala.umkt.ac.id",
        "name": "Nyala UMKT 2026",
        "publisher": {
          "@id": "https://www.umkt.ac.id/#organization"
        },
        "inLanguage": "id-ID"
      },
      {
        "@type": "FAQPage",
        "@id": "https://nyala.umkt.ac.id/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Kapan jadwal pelaksanaan MASTA UMKT 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Rangkaian MASTA UMKT 2026 dimulai dari Pembekalan (06 Agustus 2026), MASTA IMM 3 Gelombang (18 - 20 Agustus 2026), Materi Universitas Daring (24 & 26 Agustus 2026), dan UKM Expo serta Puncak Milad Luring di Kampus UMKT (28 Agustus 2026)."
            }
          },
          {
            "@type": "Question",
            "name": "Apa itu semboyan mahasiswa Teknologi Informasi UMKT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Semboyan juang mahasiswa Teknologi Informasi UMKT adalah: 'HIDUP TEKNIK! NO SKILL NO TRUST!' dengan fokus keahlian Jaringan & Rekayasa Sistem (JRS) serta Komputasi Cerdas (KC)."
            }
          },
          {
            "@type": "Question",
            "name": "Bagaimana syarat kehadiran presensi kuliah di SIKAD UMKT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Syarat mutlak untuk dapat mengikuti Ujian Akhir Semester (UAS) adalah memiliki presensi kehadiran minimal 75% di portal mahasiswa.umkt.ac.id."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
