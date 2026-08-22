import React from "react";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Creator Person Entity (Al-Ghani Desta Setyawan)
      {
        "@type": "Person",
        "@id": "https://kou.bio/#alghanidesta",
        "name": "Al-Ghani Desta Setyawan",
        "alternateName": ["Kou Sozo", "Al Ghani Desta", "Al-Ghani Desta", "Desta Setyawan"],
        "jobTitle": "Fullstack Software Engineer & UI/UX Designer",
        "description": "Mahasiswa Baru Program Studi S1 Teknologi Informasi Universitas Muhammadiyah Kalimantan Timur (UMKT) Angkatan 2026, Pengembang Aplikasi Web Nyala UMKT.",
        "url": "https://kou.bio",
        "sameAs": [
          "https://instagram.com/kou.sozo",
          "https://github.com/destasetyawan",
          "https://kou.bio"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Universitas Muhammadiyah Kalimantan Timur"
        }
      },

      // 2. Educational Organization (UMKT)
      {
        "@type": "EducationalOrganization",
        "@id": "https://www.umkt.ac.id/#organization",
        "name": "Universitas Muhammadiyah Kalimantan Timur",
        "alternateName": ["UMKT", "Universitas Muhammadiyah Kaltim"],
        "url": "https://www.umkt.ac.id",
        "logo": "https://nyala-umkt.vercel.app/favicon.svg",
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
            "contactType": "Admissions / PMB Gedung C",
            "areaServed": "ID",
            "availableLanguage": ["Indonesian", "English"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+62-822-5087-8843",
            "contactType": "Biro Kemahasiswaan & Alumni (BIMA)",
            "areaServed": "ID",
            "availableLanguage": ["Indonesian"]
          }
        ]
      },

      // 3. Contest & Institutional Sponsor (Pemeringkatan UMKT)
      {
        "@type": "Organization",
        "@id": "https://www.umkt.ac.id/pemeringkatan/",
        "name": "Kantor Pemeringkatan UMKT",
        "alternateName": ["Rankings UMKT", "UniRank & Reputation Office UMKT"],
        "url": "https://www.umkt.ac.id/pemeringkatan/",
        "parentOrganization": {
          "@id": "https://www.umkt.ac.id/#organization"
        }
      },

      // 4. Web Application Entity (Nyala UMKT)
      {
        "@type": "WebApplication",
        "@id": "https://nyala-umkt.vercel.app/#webapp",
        "name": "Nyala . Teman Perjalanan MABA UMKT 2026",
        "alternateName": "Nyala UMKT",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All (Web, PWA, iOS, Android)",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "url": "https://nyala-umkt.vercel.app",
        "creator": {
          "@id": "https://kou.bio/#alghanidesta"
        },
        "author": {
          "@id": "https://kou.bio/#alghanidesta"
        },
        "publisher": {
          "@id": "https://www.umkt.ac.id/pemeringkatan/"
        },
        "description": "Virtual companion digital pintar, interaktif dan suportif untuk Mahasiswa Baru Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026 karya Al-Ghani Desta Setyawan. Panduan resmi alur MASTA IMM, simulasi SIKAD 1:1, kurikulum Prodi TI 2026, warta live kampus, Eco-Impact Tracker, dan Tanya Nyala AI.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "IDR"
        }
      },

      // 5. Website Entity
      {
        "@type": "WebSite",
        "@id": "https://nyala-umkt.vercel.app/#website",
        "url": "https://nyala-umkt.vercel.app",
        "name": "Nyala UMKT 2026",
        "inLanguage": "id-ID",
        "publisher": {
          "@id": "https://www.umkt.ac.id/pemeringkatan/"
        }
      },

      // 6. BreadcrumbList for Google Search Hierarchy
      {
        "@type": "BreadcrumbList",
        "@id": "https://nyala-umkt.vercel.app/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda Nyala",
            "item": "https://nyala-umkt.vercel.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Hub Warta Kampus",
            "item": "https://nyala-umkt.vercel.app/hub-umkt"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Panduan & Simulator SIKAD",
            "item": "https://nyala-umkt.vercel.app/panduan-sikad"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Jadwal & Rundown MASTA",
            "item": "https://nyala-umkt.vercel.app/jadwal"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Kurikulum Prodi TI 2026",
            "item": "https://nyala-umkt.vercel.app/panduan-ti"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Tanya Nyala AI Companion",
            "item": "https://nyala-umkt.vercel.app/companion"
          }
        ]
      },

      // 7. FAQPage Structured Data
      {
        "@type": "FAQPage",
        "@id": "https://nyala-umkt.vercel.app/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Siapa pengembang aplikasi web Nyala UMKT 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Aplikasi Nyala UMKT 2026 dirancang dan dikembangkan oleh Al-Ghani Desta Setyawan (Kou Sozo, @kou.sozo, https://kou.bio), Mahasiswa Baru Program Studi S1 Teknologi Informasi UMKT 2026, sebagai karya inovasi yang diajukan ke Lomba Web Pemeringkatan UMKT (umkt.ac.id/pemeringkatan)."
            }
          },
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
            "name": "Apa saja pilar keberlanjutan (SDGs) yang didukung oleh aplikasi Nyala?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nyala mendukung SDGs Goal 4 (Pendidikan Berkualitas), SDGs Goal 9 (Inovasi & Infrastruktur Digital), SDGs Goal 12 (100% Paperless Orientation & Checklist), serta SDGs Goal 13 (Aksi Iklim & Reduksi Emisi Carbon lewat Eco-Impact Tracker)."
            }
          },
          {
            "@type": "Question",
            "name": "Bagaimana cara pengisian KRS di portal SIKAD UMKT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mahasiswa baru dapat menggunakan modul Simulator SIKAD di Nyala untuk mempraktikkan alur pemilihan mata kuliah, sinkronisasi jadwal, dan verifikasi KRS sebelum semester dimulai di portal resmi mahasiswa.umkt.ac.id."
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
