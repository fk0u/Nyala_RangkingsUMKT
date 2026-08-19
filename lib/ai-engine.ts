import { ZpiClient } from "zpi-sdk";
import { getFromCache, saveToCache } from "./cache";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const SYSTEM_PROMPT = `
Kamu adalah "Nyala", virtual companion dan asisten digital resmi untuk Mahasiswa Baru (MABA) Universitas Muhammadiyah Kalimantan Timur (UMKT) Angkatan 2026, khususnya Program Studi Teknologi Informasi (TI).
Tagline-mu adalah: "Nyala. Teman perjalanan MABA-mu."

ATURAN UTAMA & ANTI-HALUSINASI (SANGAT PENTING):
1. Berikan jawaban yang FAKTUAL, AKURAT, LUGAS, TERSTRUKTUR, dan BERBOBOT berdasarkan dokumen resmi MASTA UMKT 2026.
2. DILARANG KERAS mengarang fakta (no hallucination/kidding). Jika ada informasi spesifik berkas atau kebijakan personal yang tidak kamu ketahui, WAJIB arahkan mahasiswa untuk langsung menghubungi Admin Resmi UMKT (PMB atau Biro Kemahasiswaan).
3. Gunakan format MARKDOWN KAYA (Gunakan **bold** untuk istilah penting, daftar berpoin/nomor, tabel perbandingan jika relevan, dan tautan aktif).
4. Sikap: Hangat, suportif, cerdas, bersahabat seperti kakak tingkat teladan yang siap membimbing MABA agar sukses 100% lulus tepat waktu.
5. Semboyan Mahasiswa TI: "HIDUP TEKNIK! NO SKILL NO TRUST!"

AGENDA RESMI & RANGKAIAN MASTA UMKT 2026 (BERDASARKAN EDARAN RESMI 12 SHAFAR 1447 H / 06 AGUSTUS 2026):
1. Kamis, 06 Agustus 2026: Pembekalan
2. Selasa, 11 Agustus 2026: Masta FEBP
3. Rabu, 12 Agustus 2026: Masta Teknik (FST / TI)
4. Selasa, 18 Agustus 2026: Masta Hukum dan Kesmas; Masta IMM
5. Rabu, 19 Agustus 2026: Masta Psikologi dan KIP; Masta IMM
6. Kamis, 20 Agustus 2026: Masta Farmasi dan Keperawatan; Masta IMM
7. Senin, 24 Agustus 2026: Pembukaan dan Materi Universitas Hari 1 (Daring Zoom, 08.00 - 17.00 WITA)
8. Rabu, 26 Agustus 2026: Materi Universitas Hari 2 dan Kemahasiswaan (Daring Zoom, 08.00 - 17.00 WITA)
9. Jumat, 28 Agustus 2026: Kegiatan Luring di Lingkungan Kampus UMKT:
   - Sesi Pagi (06.30 – 11.30 WITA): UKM EXPO
   - Sesi Malam (17.00 – 22.00 WITA): PUNCAK MILAD DAN PENUTUPAN

KETENTUAN DRESSCODE & TATA TERTIB RESMI:
- Kegiatan Daring (24 & 26 Agustus): Zoom Meeting, On-Cam, format nama: [Nomor Gugus]_[Nama Lengkap].
- Kegiatan Luring (28 Agustus):
  * Sesi Pagi (UKM Expo): Kaos UMKT (bila tidak ada, kaos olahraga), celana training, sepatu olahraga. Mahasiswi perempuan mengenakan jilbab hitam.
  * Sesi Malam (Puncak Milad):
    - Pria: Kemeja putih, celana panjang hitam formal, songkok hitam, jas almamater.
    - Wanita: Kemeja putih, rok panjang hitam formal, jilbab hitam, jas almamater.
- Kerapian: Rambut laki-laki tidak gondrong, dipotong rapi, dan berwarna hitam alami.
- Barang Terlarang: Dilarang keras membawa senjata tajam (sajam), narkoba, minuman keras, rokok, atau vape.
- SANKSI PELANGGARAN: Peserta yang tidak mengikuti aturan dapat dikenakan sanksi hingga DIKELUARKAN sebagai peserta Masa Ta'aruf Mahasiswa Baru dan WAJIB MENGULANG PADA TAHUN DEPAN (berlaku sesi daring maupun luring).
- Sekretaris Panitia: SUHARDIANSYAH, NIDN 1129058501.

KONTAK RESMI ADMIN & LAYANAN MAHASISWA UMKT:
1. Admin Penerimaan Mahasiswa Baru (PMB) UMKT:
   - WhatsApp: +62 812-3001-7008 (https://wa.me/6281230017008)
   - Layanan: Pengumuman jalur seleksi, aktivasi NIM, verifikasi berkas ijazah, kendala pembayaran daftar ulang.
2. Biro Kemahasiswaan dan Alumni (BIMA) UMKT:
   - Lokasi: Gedung C Lantai 1 UMKT, Samarinda
   - Jam Operasional Pelayanan:
     * Senin - Kamis : 08.00 - 16.00 WITA
     * Jumat : 08.00 - 11.30 WITA
     * Sabtu - Minggu : Libur / Tutup
   - WhatsApp Admin: 0822-5087-8843 (https://wa.me/6282250878843)
   - Layanan: Pelaksanaan teknis MASTA 2026, sertifikat kelulusan, izin dispensasi resmi, pendaftaran Beasiswa KIP-Kuliah/Prestasi/Tahfidz/Kader, dan Unit Kegiatan Mahasiswa (UKM).

DATA AKADEMIK PRODI TEKNOLOGI INFORMASI UMKT 2026:
- Visi TI 2037: Menjadi program studi yang unggul dalam teknologi informasi dan algoritma komputasi untuk penyelesaian permasalahan sosial dan lingkungan berlandaskan nilai-nilai keislaman.
- Akreditasi: "Baik Sekali" (2025 - 2030) oleh LAM-INFOKOM.
- Gelar Kelulusan: Sarjana Komputer (S.Kom).
- Konsentrasi Peminatan:
  1) Jaringan dan Rekayasa Sistem (JRS) - Fokus: Cyber Security, Cloud, Network Infrastructure.
  2) Komputasi Cerdas (KC) - Fokus: AI, Machine Learning, Data Science, Computer Vision.
- Kurikulum Semester 1 (Paket 20 SKS): Aljabar Linear (3), Matematika Diskrit (3), Statistika (3), Dasar Pemrograman (3), Praktikum Daspro (1), Sisdig & Arsitektur Komputer (3), Islamologi 1 (2), Aplikasi Komputer & Pengantar TI (2).

PORTAL & TAUTAN RESMI:
- Website Utama: https://www.umkt.ac.id/
- Portal Mahasiswa (SIKAD): https://mahasiswa.umkt.ac.id/
- Portal Resmi MASTA: https://masta-maba.odoo.com/
`;

// Smart Offline Fallback Engine
export function generateLocalResponse(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

  // 1. ADMIN, KONTAK, WHATSAPP, GEDUNG C, BIMA, PMB
  if (
    query.includes("admin") ||
    query.includes("kontak") ||
    query.includes("whatsapp") ||
    query.includes("wa") ||
    query.includes("telepon") ||
    query.includes("gedung c") ||
    query.includes("kemahasiswaan") ||
    query.includes("pmb") ||
    query.includes("jam buka") ||
    query.includes("operasional")
  ) {
    return `Berikut adalah **Daftar Kontak Resmi & Jam Pelayanan Admin UMKT**:

### 1. 🏛️ Biro Kemahasiswaan dan Alumni (BIMA) UMKT
- **Lokasi**: Gedung C Lantai 1 UMKT, Samarinda
- **Jam Pelayanan Operasional**:
  - **Senin - Kamis**: 08.00 - 16.00 WITA
  - **Jumat**: 08.00 - 11.30 WITA
  - **Sabtu - Minggu**: Libur / Tutup
- **Layanan**: Pelaksanaan MASTA 2026, surat dispensasi, sertifikat kelulusan, info beasiswa (KIP-K, Prestasi, Tahfidz), dan legalitas UKM.
- **WhatsApp**: [0822-5087-8843](https://wa.me/6282250878843)

---

### 2. 🎓 Admin Penerimaan Mahasiswa Baru (PMB) UMKT
- **Lokasi**: Gedung Utama UMKT Lantai 1
- **Layanan**: Pendaftaran, verifikasi berkas ijazah, aktivasi Nomor Induk Mahasiswa (NIM), dan registrasi ulang.
- **WhatsApp**: [+62 812-3001-7008](https://wa.me/6281230017008)

> **Catatan:** Untuk respon tercepat, hubungi nomor WhatsApp di atas pada jam kerja operasional resmi kampus ya!`;
  }

  // 2. JADWAL, MASTA, TANGGAL, SANKSI, DRESSCODE, LURING, DARING
  if (
    query.includes("jadwal") ||
    query.includes("tanggal") ||
    query.includes("masta") ||
    query.includes("luring") ||
    query.includes("daring") ||
    query.includes("dresscode") ||
    query.includes("pakaian") ||
    query.includes("sanksi") ||
    query.includes("rambut") ||
    query.includes("ukm expo") ||
    query.includes("milad")
  ) {
    return `📅 **Rangkaian Jadwal & Ketetapan Resmi MASTA UMKT 2026**:

### Rangkaian Jadwal Utama:
| Tanggal | Kegiatan | Media / Lokasi | Waktu |
|---|---|---|---|
| **Kamis, 06 Agt 2026** | Pembekalan MASTA | Daring (Zoom) | Selesai |
| **11 – 20 Agt 2026** | MASTA Fakultas & IMM (Teknik: 12 Agt) | Fakultas & IMM | Selesai / Berjalan |
| **Senin, 24 Agt 2026** | **Pembukaan & Materi Universitas Hari 1** | **Zoom Meeting** | **08.00 – 17.00 WITA** |
| **Rabu, 26 Agt 2026** | **Materi Universitas Hari 2 & Kemahasiswaan** | **Zoom Meeting** | **08.00 – 17.00 WITA** |
| **Jumat, 28 Agt 2026** | **UKM Expo (Sesi 1)** | **Kampus UMKT (Luring)** | **06.30 – 11.30 WITA** |
| **Jumat, 28 Agt 2026** | **Puncak Milad UMKT & Penutupan (Sesi 2)** | **Kampus UMKT (Luring)** | **17.00 – 22.00 WITA** |

---

### 👔 Ketentuan Dresscode Luring (28 Agustus 2026):
1. **Sesi Pagi (06.30 – 11.30 WITA - UKM Expo)**:
   - Kaos UMKT (bila tidak ada, gunakan kaos olahraga), celana training, sepatu olahraga. Mahasiswi mengenakan **jilbab hitam**.
2. **Sesi Malam (17.00 – 22.00 WITA - Puncak Milad & Penutupan)**:
   - **Pria**: Kemeja putih, celana panjang hitam formal, **songkok/peci hitam**, jas almamater.
   - **Wanita**: Kemeja putih, rok panjang hitam formal, **jilbab hitam**, jas almamater.

---

### ⚠️ Tata Tertib & Sanksi Tegas:
- **Rambut Pria**: Wajib rapi, tidak gondrong, dan berwarna hitam.
- **Barang Terlarang**: Dilarang keras membawa senjata tajam, narkoba, miras, rokok, atau vape.
- **Sanksi Pelanggaran**: Peserta yang melanggar dapat dikenakan sanksi hingga **dikeluarkan dari MASTA dan WAJIB MENGULANG TAHUN DEPAN**.

*Pengesahan resmi: Sekretaris Panitia Bapak SUHARDIANSYAH, NIDN 1129058501.*`;
  }

  // 2. PRODI TEKNOLOGI INFORMASI & KURIKULUM
  if (
    query.includes("prodi ti") ||
    query.includes("teknologi informasi") ||
    query.includes("kurikulum") ||
    query.includes("mata kuliah") ||
    query.includes("s.kom") ||
    query.includes("kaprodi") ||
    query.includes("no skill") ||
    query.includes("semester")
  ) {
    if (query.includes("semester 1") || query.includes("sem 1") || query.includes("makul") || query.includes("mata kuliah")) {
      return `Berikut adalah **Struktur Mata Kuliah Semester 1 Prodi Teknologi Informasi UMKT 2026 (Total 20 SKS)**:

| No | Kode / Mata Kuliah | Bobot SKS | Kategori |
|---|---|---|---|
| 1 | **Aljabar Linear** | 3 SKS | Basic Science & Logic |
| 2 | **Matematika Diskrit** | 3 SKS | Basic Science & Logic |
| 3 | **Statistika** | 3 SKS | Basic Science & Analytics |
| 4 | **Dasar Pemrograman** | 3 SKS | Core Computing |
| 5 | **Praktikum Dasar Pemrograman** | 1 SKS | Laboratorium |
| 6 | **Sistem Digital & Arsitektur Komputer** | 3 SKS | Hardware & Systems |
| 7 | **Kemanusiaan & Keimanan (Islamologi 1)** | 2 SKS | MKDU Universitas |
| 8 | **Aplikasi Komputer & Pengantar TI** | 2 SKS | Core Computing |

💡 **Tips Sukses:** Pastikan nilai *Dasar Pemrograman* dan *Matematika Diskrit* minimal **BC** untuk menjadi syarat mengambil mata kuliah lanjutan di Semester 2!`;
    }

    if (query.includes("nilai") || query.includes("standar") || query.includes("syarat lulus")) {
      return `Berikut adalah **Standar Nilai Minimum Kelulusan Prodi TI UMKT**:

- **MK Wajib Prodi & Konsentrasi (JRS/KC)**: Minimal **C** (Skor 2.00)
- **Mata Kuliah Dasar Umum (MKDU)**: Minimal **B** (Skor 3.00)
- **Basic Science & Praktikum Lab**: Minimal **BC** (Skor 2.50)
- **Kerja Praktik / Magang & Capstone Design**: Minimal **B** (Skor 3.00)
- **Skripsi / Tugas Akhir**: Minimal **AB** (Skor 3.50)

> Semboyan juang kita: **HIDUP TEKNIK! NO SKILL NO TRUST!**`;
    }

    if (query.includes("kalender") || query.includes("uts") || query.includes("uas") || query.includes("jadwal")) {
      return `📅 **Kalender Akademik Semester Ganjil 2026/2027**:

- **27 Juli – 27 Agustus 2026**: Pengambilan MK & Validasi KRS di SIKAD
- **31 Agustus – 7 Oktober 2026**: Perkuliahan Periode I
- **19 – 24 Oktober 2026**: Ujian Tengah Semester (UTS)
- **26 Oktober – 19 Desember 2026**: Perkuliahan Periode II
- **21 Desember 2026 – 9 Januari 2027**: Ujian Akhir Semester (UAS)
- **16 Januari 2027**: Batas Akhir Entri Nilai Dosen di SIKAD`;
    }

    return `🎓 **Profil Program Studi Teknologi Informasi UMKT**:
- **Akreditasi**: "Baik Sekali" oleh LAM-INFOKOM (2025–2030)
- **Gelar Lulusan**: Sarjana Komputer (S.Kom)
- **Peminatan**: 1) *Jaringan dan Rekayasa Sistem (JRS)*, 2) *Komputasi Cerdas (KC)*
- **Bimbingan PA**: Wajib minimal 4 kali per semester bersama Dosen Pembimbing Akademik.

Kamu bisa menjelajahi kurikulum semester 1–4 dan daftar dosen tetap di menu **[Panduan TI](/panduan-ti)**.`;
  }

  // 3. SIKAD & PORTAL MAHASISWA
  if (
    query.includes("sikad") ||
    query.includes("siakad") ||
    query.includes("mahasiswa.umkt") ||
    query.includes("krs") ||
    query.includes("khs") ||
    query.includes("presensi") ||
    query.includes("absen") ||
    query.includes("briva")
  ) {
    if (query.includes("presensi") || query.includes("absen") || query.includes("kehadiran")) {
      return `📌 **Aturan Presensi Kuliah di SIKAD UMKT**:
- Syarat mutlak untuk mengikuti Ujian Akhir Semester (UAS) adalah **kehadiran minimal 75%** dari total 16 pertemuan.
- Maksimal ketidakhadiran yang ditoleransi (dengan surat izin/sakit resmi) adalah **4 kali pertemuan**.
- Jika kehadiran < 75%, sistem SIKAD otomatis mengunci kartu ujian.`;
    }

    if (query.includes("krs")) {
      return `📋 **Alur Pengisian KRS Online MABA Semester 1**:
1. Login ke portal [mahasiswa.umkt.ac.id](https://mahasiswa.umkt.ac.id/) menggunakan NIM dan kata sandi resmi.
2. Masuk ke menu **Kartu Rencana Studi (KRS)**.
3. Untuk Semester 1, seluruh 20 SKS telah dipaketkan secara otomatis oleh Program Studi.
4. Periksa nama dosen pengampu dan kode kelas (A/B/C).
5. Hubungi Dosen Pembimbing Akademik (PA) untuk konsultasi dan persetujuan (*approval*) sebelum batas akhir 27 Agustus 2026.`;
    }

    return `🌐 **Panduan Portal SIKAD Mahasiswa ([mahasiswa.umkt.ac.id](https://mahasiswa.umkt.ac.id/))**:
Portal ini merupakan pusat aktivitas akademik:
- **KRS Online**: Pengisian dan validasi rencana studi
- **Jadwal Kuliah & Ruangan**: Cek jam kuliah dan gedung perkuliahan
- **Presensi Digital**: Rekapitulasi kehadiran (min. 75%)
- **Keuangan & BRIVA**: Generate kode Virtual Account pembayaran SPP
- **KHS & Transkrip**: Pantau Indeks Prestasi Semester (IPS) dan IPK

Kamu dapat mencoba simulator menu SIKAD di tab **[Panduan SIKAD](/panduan-sikad)**.`;
  }

  // 4. BEASISWA & ORGANISASI
  if (query.includes("beasiswa") || query.includes("kip") || query.includes("tahfidz") || query.includes("ukm") || query.includes("himatif")) {
    return `🌟 **Beasiswa & Organisasi Mahasiswa UMKT 2026**:

### Skema Beasiswa Tersedia:
1. **Beasiswa KIP-Kuliah**: Pembebasan biaya pendidikan + subsidi biaya hidup bulanan.
2. **Beasiswa Prestasi**: Jalur kejuaraan sains, olahraga (Tapak Suci), dan seni.
3. **Beasiswa Tahfidz Al-Qur'an**: Keringanan SPP bagi hafiz minimal 5–30 Juz.
4. **Beasiswa Kader Persyarikatan**: Rekomendasi resmi dari Pimpinan Daerah Muhammadiyah (PDM).

### Organisasi & UKM:
- **HIMATIF**: Himpunan Mahasiswa Teknik Informatika (Dept. PSDM, Kominfo, Sosma, Kerohanian).
- **UKM Expo**: Seluruh pendaftaran organisasi dibuka serentak pada Tahap 4 MASTA 2026.

Semua pengurusan administrasi beasiswa berpusat di **Biro Kemahasiswaan (Gedung C Lantai 1)** atau via WhatsApp [0822-5087-8843](https://wa.me/6282250878843).`;
  }

  // 5. MASTA & TATA TERTIB ZOOM
  if (query.includes("masta") || query.includes("zoom") || query.includes("dresscode") || query.includes("pakaian") || query.includes("on-cam")) {
    return `🎯 **Ketentuan Resmi MASTA UMKT 2026**:

### Format Nama Zoom Wajib:
\`\`\`text
[Nomor Gugus]_[Nama Lengkap]
Contoh: Gugus 04_Muhammad Rizky Pratama
\`\`\`

### Aturan Pakaian (Dresscode):
- **Pria**: Kemeja putih panjang formal, celana kain hitam (bukan jeans), peci hitam, sepatu formal.
- **Wanita**: Kemeja/tunik putih panjang tidak menerawang, rok panjang kain hitam, jilbab rapi, sepatu formal.

### Ketentuan Sesi:
- Kamera wajib **On-Cam** selama pemaparan materi.
- Gunakan Virtual Background resmi dari [masta-maba.odoo.com](https://masta-maba.odoo.com/).
- Wajib hadir di seluruh 5 tahapan orientasi untuk kelulusan e-Sertifikat MASTA.`;
  }

  // 6. DEFAULT GENERAL HELPFUL RESPONSE
  return `Halo! Aku **Nyala**, siap membantu seputar informasi akademik dan kehidupan kampus di **Universitas Muhammadiyah Kalimantan Timur (UMKT)**.

Kamu bisa menanyakan topik seputar:
- 📋 **SIKAD & KRS Online**: Alur pengisian dan batas validasi Dosen PA.
- 🎓 **Prodi Teknologi Informasi**: Kurikulum semester 1, standar nilai, dan prospek karir.
- 🏛️ **Kontak Admin UMKT**: Lokasi Gedung C Lt. 1 & nomor WhatsApp resmi PMB/Biro Kemahasiswaan.
- 📅 **Kalender Akademik**: Jadwal perkuliahan, UTS, dan UAS ganjil 2026/2027.
- 🏠 **Tips Rantau & Kost**: Biaya hidup dan tips adaptasi di Samarinda.

Jika kamu membutuhkan layanan berkas pendaftaran atau izin dispensasi resmi, silakan hubungi **Admin PMB (+62 812-3001-7008)** atau **Biro Kemahasiswaan (0822-5087-8843)** ya!`;
}

// Top-Level Query Function with Cache & Live SDK
export async function queryAICompanion(
  messages: ChatMessage[]
): Promise<{ reply: string; cached: boolean }> {
  const lastUserMessage = messages[messages.length - 1]?.content || "";

  // 1. Check High Performance In-Memory Cache
  const cachedResponse = getFromCache(lastUserMessage);
  if (cachedResponse) {
    return { reply: cachedResponse, cached: true };
  }

  const zpiApiKey = process.env.ZPI_API_KEY;

  // 2. Live Zpi AI SDK Call with Fast Timeout Race
  if (zpiApiKey && zpiApiKey.trim() !== "") {
    try {
      const client = new ZpiClient({ apiKey: zpiApiKey.trim() });

      const formattedMessages = [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...messages.slice(-6).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ];

      const apiPromise = client.run(
        "ai:z-ai",
        "chat",
        {
          messages: formattedMessages,
          stream: false,
        },
        {
          method: "POST",
          timeoutMs: 6500,
        }
      );

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Zpi timeout")), 6500)
      );

      const result: any = await Promise.race([apiPromise, timeoutPromise]);

      let replyText = "";
      if (result && typeof result === "object") {
        if (Array.isArray(result.choices) && result.choices[0]?.message?.content) {
          replyText = result.choices[0].message.content;
        } else if (result.message?.content) {
          replyText = result.message.content;
        } else if (typeof result.response === "string") {
          replyText = result.response;
        } else if (typeof result.content === "string") {
          replyText = result.content;
        }
      } else if (typeof result === "string") {
        replyText = result;
      }

      if (replyText && replyText.trim().length > 0) {
        saveToCache(lastUserMessage, replyText.trim());
        return { reply: replyText.trim(), cached: false };
      }
    } catch (err: any) {
      console.warn("Zpi SDK notice (switching to smart knowledge base):", err?.message || err);
    }
  }

  // 3. Smart Local Knowledge Fallback
  const localFallback = generateLocalResponse(lastUserMessage);
  saveToCache(lastUserMessage, localFallback);
  return { reply: localFallback, cached: false };
}
