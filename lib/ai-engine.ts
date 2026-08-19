import { ZpiClient } from "zpi-sdk";
import { getFromCache, saveToCache } from "./cache";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const SYSTEM_PROMPT = `
Kamu adalah "Nyala", virtual companion dan asisten digital resmi untuk Mahasiswa Baru (MABA) Universitas Muhammadiyah Kalimantan Timur (UMKT) Angkatan 2026, khususnya Program Studi Teknologi Informasi (TI).
Tagline-mu adalah: "Nyala. Teman perjalanan MABA-mu."

BRAND & PERSONALITY:
- Kamu ramah, hangat, penuh energi positif, suportif, dan dekat (seperti sahabat atau kakak tingkat yang asik).
- Responsif, solutif, santun, respect, dan edukatif.
- Semboyan Tekno: "HIDUP TEKNIK! NO SKILL NO TRUST!"
- Bahasa: Bahasa Indonesia yang santai, luwes, dan lugas namun tetap informatif, jelas, dan akurat.
- Jangan kaku, jangan menjawab seperti robot birokrasi, tapi jadilah teman yang menguatkan dan menyemangati MABA agar lulus 100% tepat waktu (3.5 - 4 tahun).

KONTAK RESMI ADMIN & LAYANAN MAHASISWA UMKT (JIKA PENGGUNA MEMERLUKAN BANTUAN RESMI ATAU KAMU TIDAK YAKIN):
1. Admin Penerimaan Mahasiswa Baru (PMB) UMKT:
   - WhatsApp: +62 812-3001-7008 (https://wa.me/6281230017008)
   - Layanan: Kelulusan seleksi, aktivasi NIM, berkas pendaftaran & biaya daftar ulang.
2. Biro Kemahasiswaan dan Alumni (BIMA) UMKT:
   - Lokasi: Gedung C Lantai 1 UMKT, Samarinda
   - Jam Pelayanan:
     * Senin - Kamis : 08.00 - 16.00 WITA
     * Jumat : 08.00 - 11.30 WITA
     * Sabtu - Minggu : Tutup (Libur Layanan)
   - WhatsApp Admin: 082250878843 / +62 822-5087-8843 (https://wa.me/6282250878843)
   - Layanan: Pelaksanaan teknis MASTA 2026, sertifikat kelulusan, izin dispensasi, pendaftaran beasiswa KIP-Kuliah/Prestasi/Kader, dan Unit Kegiatan Mahasiswa (UKM).

INFORMASI RESMI MASTA, SIKAD & PRODI TEKNOLOGI INFORMASI UMKT 2026:
- Visi TI 2037: Menjadi program studi yang unggul dalam teknologi informasi dan algoritma komputasi untuk penyelesaian permasalahan sosial dan lingkungan berlandaskan nilai-nilai keislaman.
- Akreditasi: "Baik Sekali" (2025 - 2030).
- Gelar: Sarjana Komputer (S.Kom).
- Konsentrasi: 1) Jaringan dan Rekayasa Sistem (JRS), 2) Komputasi Cerdas (KC).
- Kurikulum Semester 1 (20 SKS): Aljabar Linear, Matematika Diskrit, Statistika, Dasar Pemrograman + Praktikum, Sistem Digital & Arsitektur Komputer, Islamologi 1, PTI.
- Standar Nilai Minimum: MK Wajib (C), MKDU (B), Konsentrasi (C), Basic Science/Praktikum (BC), Magang/Capstone (B), Skripsi (AB).
- Kalender Akademik Semester Ganjil 2026/2027:
  - 27 Juli - 27 Agustus 2026: Pengambilan MK / KRS di SIKAD
  - 31 Agustus - 7 Oktober 2026: Perkuliahan Periode I
  - 19 - 24 Oktober 2026: Ujian Tengah Semester (UTS)
  - 26 Oktober - 19 Desember 2026: Perkuliahan Periode II
  - 21 Desember 2026 - 9 Januari 2027: Ujian Akhir Semester (UAS)
  - 16 Januari 2027: Batas Entri Nilai UAS di SIKAD
- Bimbingan Dosen PA: Wajib minimal 4 kali per semester (KRS, pra-UTS, pra-UAS, evaluasi KHS).
- Semester Pendek (SP): Berlangsung 2 minggu intensif untuk memperbaiki nilai tanpa harus menunda kelulusan.
- Organisasi Mahasiswa: HIMATIF (Himpunan Mahasiswa Teknik Informatika) - Dept PSDM, Kominfo/Media Kreatif, Sosma, Kerohanian.
- Portal Resmi:
  - Website UMKT: https://www.umkt.ac.id/
  - Portal Mahasiswa SIKAD: https://mahasiswa.umkt.ac.id/
  - Portal Resmi MASTA: https://masta-maba.odoo.com/
`;

// Offline Smart Knowledge Base Responder (Zero-failure fallback)
export function generateLocalResponse(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

  // 1. ADMIN, KONTAK, WHATSAPP, GEDUNG C, BIMA, PMB
  if (query.includes("admin") || query.includes("kontak") || query.includes("whatsapp") || query.includes("wa") || query.includes("telepon") || query.includes("gedung c") || query.includes("kemahasiswaan") || query.includes("pmb") || query.includes("jam buka") || query.includes("operasional")) {
    return `Berikut adalah **Kontak Resmi & Jam Pelayanan Admin UMKT**:

1. 🏛️ **Biro Kemahasiswaan dan Alumni (BIMA) UMKT** (Untuk MASTA, Beasiswa, Sertifikat & UKM):
- 📍 **Lokasi**: Gedung C Lantai 1 UMKT, Samarinda
- ⏰ **Jam Operasional Pelayanan**:
  - **Senin - Kamis**: 08.00 - 16.00 WITA
  - **Jumat**: 08.00 - 11.30 WITA
  - **Sabtu - Minggu**: Libur
- 💬 **WhatsApp Admin**: [082250878843](https://wa.me/6282250878843)

2. 🎓 **Admin Penerimaan Mahasiswa Baru (PMB) UMKT** (Untuk Pendaftaran, NIM & Registrasi Ulang):
- 💬 **WhatsApp Admin**: [+62 812-3001-7008](https://wa.me/6281230017008)

Silakan hubungi admin terkait pada jam kerja di atas ya!`;
  }

  // 2. PRODI TEKNOLOGI INFORMASI UMKT & KURIKULUM
  if (query.includes("prodi ti") || query.includes("teknologi informasi") || query.includes("kurikulum") || query.includes("mata kuliah") || query.includes("s.kom") || query.includes("kaprodi") || query.includes("no skill")) {
    if (query.includes("semester 1") || query.includes("sem 1") || query.includes("makul")) {
      return `Mata kuliah **Semester 1 Prodi Teknologi Informasi UMKT 2026** (Total 20 SKS):
1. **Aljabar Linear** (3 SKS)
2. **Matematika Diskrit** (3 SKS)
3. **Statistika** (3 SKS)
4. **Dasar Pemrograman** (3 SKS) + **Praktikum Dasar Pemrograman** (1 SKS)
5. **Sistem Digital dan Arsitektur Komputer** (3 SKS)
6. **Kemanusiaan dan Keimanan / Islamologi 1** (2 SKS)
7. **Aplikasi Komputer & Pengantar Teknologi Informasi** (2 SKS)

Tips Kaprodi: Pastikan nilai Dasar Pemrograman dan Matematika minimal BC ya! Buka tab **Akademik TI** di atas untuk melihat semester 2-4.`;
    }

    if (query.includes("nilai") || query.includes("standar kelulusan") || query.includes("syarat lulus")) {
      return `Standar nilai minimum kelulusan di **Teknologi Informasi UMKT**:
- **MK Wajib Prodi & Konsentrasi (JRS/KC)**: Minimal **C**
- **MK Dasar Umum (MKDU)**: Minimal **B**
- **Basic Science & Praktikum**: Minimal **BC**
- **Kerja Praktik / Magang & Capstone Design**: Minimal **B**
- **Skripsi / Tugas Akhir**: Minimal **AB**

Rentang nilai: A (>80), AB (75-79), B (70-74), BC (66-70). Ingat slogan perjuangan kita: *HIDUP TEKNIK! NO SKILL NO TRUST!*`;
    }

    if (query.includes("kalender") || query.includes("uts") || query.includes("uas") || query.includes("jadwal kuliah")) {
      return `Agenda penting **Kalender Akademik Semester Ganjil 2026/2027**:
- **27 Juli - 27 Agustus 2026**: Masa Pengambilan MK / KRS di SIKAD
- **31 Agustus - 7 Oktober 2026**: Perkuliahan Periode I
- **19 - 24 Oktober 2026**: Ujian Tengah Semester (UTS)
- **26 Oktober - 19 Desember 2026**: Perkuliahan Periode II
- **21 Desember 2026 - 9 Januari 2027**: Ujian Akhir Semester (UAS)
- **16 Januari 2027**: Batas Entri Nilai UAS di SIKAD`;
    }

    if (query.includes("gaji") || query.includes("karir") || query.includes("prospek")) {
      return `Prospek karir lulusan **Sarjana Komputer (S.Kom) TI UMKT**:
- **Software Engineer**: Kisaran Rp 190 Juta - Rp 205 Juta / tahun (Traveloka, Tokopedia, Bukalapak).
- **Data Scientist / Analyst**: Analisis keputusan bisnis berbasis empiris.
- **Cyber Security Engineer**: Pengamanan infrastruktur jaringan & kriptografi.
- **Mobile Developer**: Spesialis aplikasi Android / iOS modern.

Di industri IT 2026, yang dinilai bukan hanya ijazah, melainkan kapasitas nyata menyelesaikan masalah (problem solving)!`;
    }

    return `Program Studi **Teknologi Informasi UMKT**:
- **Akreditasi**: "Baik Sekali" (2025 - 2030)
- **Gelar**: Sarjana Komputer (S.Kom)
- **Konsentrasi**: Jaringan dan Rekayasa Sistem (JRS) & Komputasi Cerdas (KC)
- **Semboyan**: "HIDUP TEKNIK! NO SKILL NO TRUST!"
- **Dosen PA**: Wajib bimbingan minimal 4 kali per semester (KRS, pra-UTS, pra-UAS, KHS).

Buka menu **Akademik TI** di atas untuk panduan lengkap kurikulum dan profil dosen tetap.`;
  }

  // 3. SIKAD & Portal Mahasiswa UMKT
  if (query.includes("sikad") || query.includes("siakad") || query.includes("mahasiswa.umkt") || query.includes("krs") || query.includes("khs") || query.includes("dosen pa") || query.includes("spp") || query.includes("presensi")) {
    if (query.includes("krs") || query.includes("kartu rencana")) {
      return `Untuk pengisian **KRS Online** di UMKT:
1. Buka [https://mahasiswa.umkt.ac.id/](https://mahasiswa.umkt.ac.id/).
2. Untuk MABA Semester 1, paket mata kuliah (20 SKS) sudah otomatis disiapkan.
3. Masuk menu **KRS** -> periksa nama dosen & jadwal.
4. Klik **Ajukan Bimbingan / Simpan KRS** untuk divalidasi oleh Dosen PA.
5. Cek panduan visual di tab **SIKAD** aplikasi ini ya.`;
    }

    return `Portal **SIKAD Mahasiswa UMKT** ([https://mahasiswa.umkt.ac.id/](https://mahasiswa.umkt.ac.id/)) digunakan untuk pengisian KRS, jadwal kuliah, presensi (min. 75%), tagihan SPP Virtual Account, dan cek nilai KHS.`;
  }

  // 4. BEASISWA & UKM
  if (query.includes("beasiswa") || query.includes("kip") || query.includes("tahfidz") || query.includes("ukm") || query.includes("organisasi")) {
    return `Informasi **Beasiswa & Kemahasiswaan UMKT 2026**:
- **Skema Beasiswa**: KIP-Kuliah, Prestasi Akademik/Olahraga/Seni, Tahfidz Al-Qur'an, dan Kader Muhammadiyah/Aisyiyah.
- **Pusat Pengajuan & Seleksi**: **Biro Kemahasiswaan dan Alumni (BIMA)**, Gedung C Lantai 1 UMKT.
- **WhatsApp BIMA**: [082250878843](https://wa.me/6282250878843) (Senin-Kamis 08.00-16.00 WITA, Jumat 08.00-11.30 WITA).
- **Pendaftaran UKM**: Dibuka pada sesi UKM Expo di Tahap 4 MASTA!`;
  }

  // 5. Alur MASTA & Panduan Umum
  if (query.includes("alur") || query.includes("tahap") || query.includes("jadwal") || query.includes("proses")) {
    return `Alur resmi **MASTA MABA UMKT 2026** terdiri dari 5 tahapan:
1. **Membaca Panduan Resmi**
2. **Verifikasi Identitas & NIM**
3. **Kegiatan Daring Zoom Meeting**
4. **UKM Expo & Minat Bakat**
5. **Puncak Inagurasi & Sertifikasi**

Cek timeline detail di menu **Alur MASTA** ya.`;
  }

  if (query.includes("bawa") || query.includes("syarat") || query.includes("perlengkapan") || query.includes("checklist")) {
    return `Perlengkapan wajib MASTA 2026:
- Kartu Peserta MASTA & berkas registrasi
- Laptop/Smartphone + Zoom terbaru + kuota cadangan
- Kemeja putih polos lengan panjang & bawahan hitam formal
- Air minum botol & fisik yang fit! Buka menu **Checklist** untuk mencentang persiapan.`;
  }

  if (query.includes("gugup") || query.includes("takut") || query.includes("cemas") || query.includes("teman")) {
    return `Wajar merasa gugup saat memulai masa perkuliahan baru, Sobat! Tarik napas teratur, sapa teman se-gugus, dan gunakan fitur **Health Check** untuk memantau energimu. Kamu pasti bisa!`;
  }

  return `Pertanyaan yang bagus sekali, Sobat MABA!

Kamu bisa mengeksplorasi panduan **Akademik TI UMKT**, portal **SIKAD** (mahasiswa.umkt.ac.id), membaca **Blog MABA**, atau menghubungi admin resmi:
- 🏛️ **Biro Kemahasiswaan (Gedung C Lt. 1)**: WhatsApp [082250878843](https://wa.me/6282250878843) (Senin-Kamis 08.00-16.00, Jumat 08.00-11.30 WITA)
- 🎓 **Admin PMB**: WhatsApp [+62 812-3001-7008](https://wa.me/6281230017008)

Ada hal spesifik yang ingin kamu tanyakan lagi? Nyala siap menemani!`;
}

/**
 * Core AI Companion Query Runner with Top-Level Cache, Fast Timeout & Zpi SDK
 */
export async function queryAICompanion(messages: ChatMessage[]): Promise<{ reply: string; cached: boolean }> {
  const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content || "";

  // 1. Top-Level Cache Lookup
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
