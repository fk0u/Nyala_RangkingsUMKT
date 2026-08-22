/**
 * Basis Pengetahuan Q&A Terstruktur & Terverifikasi Nyala UMKT 2026
 * Dirancang untuk respon instan, akurat, dan 100% offline tanpa ketergantungan API eksternal.
 * Karya Inovasi Mahasiswa Baru: Al-Ghani Desta Setyawan (@kou.sozo, https://kou.bio)
 * Diajukan untuk: Kompetisi Pemeringkatan UMKT 2026
 */

export interface QAKnowledgeItem {
  id: string;
  category: "sikad" | "jadwal" | "tatatertib" | "akademik" | "layanan" | "beasiswa" | "pemeringkatan" | "umum";
  categoryLabel: string;
  categoryIcon: string;
  question: string;
  keywords: string[];
  answer: string;
  suggestedFollowups?: string[];
}

export const QA_CATEGORIES = [
  { id: "all", label: "Semua Topik", icon: "Sparkle" },
  { id: "sikad", label: "SIKAD & KRS", icon: "Laptop" },
  { id: "jadwal", label: "Jadwal MABA", icon: "CalendarCheck" },
  { id: "tatatertib", label: "Tata Tertib & Dresscode", icon: "TShirt" },
  { id: "akademik", label: "Kurikulum & Nilai", icon: "GraduationCap" },
  { id: "layanan", label: "Kontak & Gedung", icon: "MapPin" },
  { id: "beasiswa", label: "Beasiswa & UKM", icon: "Trophy" },
  { id: "pemeringkatan", label: "Inovasi Pemeringkatan", icon: "ShieldCheck" },
];

export const VERIFIED_QA_DATABASE: QAKnowledgeItem[] = [
  // ── KATEGORI 1: SIKAD & KREDENSIAL LOGIN ──
  {
    id: "qa-sikad-login",
    category: "sikad",
    categoryLabel: "SIKAD & Login",
    categoryIcon: "Laptop",
    question: "Bagaimana cara login dan apa username & password default SIKAD?",
    keywords: ["login", "sikad", "siakad", "username", "password", "password default", "nim", "13 digit", "12xxxxxx", "masuk"],
    answer: `🌐 **Panduan Login Portal Mahasiswa SIKAD UMKT**:

Akses portal resmi di: **[mahasiswa.umkt.ac.id](https://mahasiswa.umkt.ac.id/)**

### 🔑 Kredensial Login Resmi:
- **Username:** NIM (Nomor Induk Mahasiswa) resmi sepanjang **13 digit** (contoh: \`2611102441001\`).
- **Password Default:** Nomor Registrasi Pendaftaran yang diawali angka **\`12xxxxxx\`** (tertera pada bukti registrasi ulang).

> 💡 **Saran Keamanan:** Setelah pertama kali berhasil login, segera ganti password di menu *Pengaturan Akun / Profil* demi keamanan biodata dan nilai akademikmu.`,
    suggestedFollowups: ["Bagaimana cara mengisi KRS Semester 1?", "Bagaimana cara membayar tagihan SPP BRIVA?"]
  },
  {
    id: "qa-sikad-krs",
    category: "sikad",
    categoryLabel: "SIKAD & KRS",
    categoryIcon: "Laptop",
    question: "Bagaimana alur pengisian KRS Semester 1? Apakah memilih mata kuliah sendiri?",
    keywords: ["krs", "isi krs", "paket krs", "semester 1", "20 sks", "mata kuliah", "pilih makul"],
    answer: `📋 **Alur Pengisian KRS Online Mahasiswa Baru (Semester 1)**:

1. **Paket Otomatis:** Untuk Mahasiswa Baru Semester 1, seluruh mata kuliah telah **dipaketkan secara otomatis** oleh Program Studi sejumlah **20 SKS**.
2. **Cek Kelas:** Buka menu **KRS > Pengisian KRS** di SIKAD, periksa kelas dan nama dosen pengampu.
3. **Ajukan Validasi:** Klik tombol **"Ajukan Bimbingan / Simpan KRS"**.
4. **Validasi Dosen PA:** Hubungi Dosen Pembimbing Akademik (PA) via WhatsApp resmi untuk persetujuan validasi sebelum batas akhir penetapan KRS.`,
    suggestedFollowups: ["Bagaimana etika chat Dosen PA untuk validasi KRS?", "Berapa standar presensi kehadiran kuliah?"]
  },
  {
    id: "qa-sikad-briva",
    category: "sikad",
    categoryLabel: "SIKAD & Pembayaran",
    categoryIcon: "Laptop",
    question: "Bagaimana cara generate kode pembayaran BRIVA SPP di SIKAD?",
    keywords: ["briva", "spp", "bayar spp", "dpp", "biaya kuliah", "generate briva", "va", "virtual account", "bri"],
    answer: `💳 **Cara Pembayaran SPP / DPP via BRIVA SIKAD**:

1. Login ke portal **[mahasiswa.umkt.ac.id](https://mahasiswa.umkt.ac.id/)**.
2. Masuk ke menu **Biaya Kuliah > Tagihan**.
3. Klik tombol **"Generate BRIVA"** pada semester yang aktif.
4. Salin kode BRIVA (Nomor Virtual Account BRI) yang diterbitkan sistem.
5. Lakukan pembayaran via ATM BRI, BRImo (Mobile Banking), atau teller bank mana pun.
6. Status pembayaran akan otomatis **Lunas (Verified)** dalam 5–15 menit dan membuka akses KRS.`,
    suggestedFollowups: ["Bagaimana cara login SIKAD?", "Di mana kontak Admin Keuangan UMKT?"]
  },
  {
    id: "qa-sikad-presensi",
    category: "sikad",
    categoryLabel: "SIKAD & Presensi",
    categoryIcon: "Laptop",
    question: "Berapa aturan batas minimum presensi kehadiran kuliah untuk ikut UAS?",
    keywords: ["presensi", "absen", "kehadiran", "75%", "syarat uas", "tidak hadir", "izin", "alfa"],
    answer: `📌 **Aturan Presensi Kuliah Digital UMKT (Ambang Batas Minimum 75%)**:

- Total pertemuan dalam 1 semester: **16 sesi** (14 perkuliahan + 1 UTS + 1 UAS).
- **Syarat Mutlak UAS:** Wajib menghadiri minimal **75% perkuliahan (minimal 12 dari 16 pertemuan)**.
- **Toleransi Ketidakhadiran:** Maksimal **4 kali** (harus disertai surat izin/sakit resmi).
- ⚠️ **Sanksi:** Jika presensi < 75%, sistem SIKAD otomatis mengunci kartu ujian dan mata kuliah bersangkutan mendapat nilai **E (Tidak Lulus)**.`,
    suggestedFollowups: ["Bagaimana etika chat izin ke Dosen PA?", "Kapan jadwal UTS dan UAS?"]
  },
  {
    id: "qa-etika-dosen-pa",
    category: "sikad",
    categoryLabel: "SIKAD & Etika Chat",
    categoryIcon: "Laptop",
    question: "Bagaimana format dan etika chat WhatsApp ke Dosen Pembimbing Akademik (PA)?",
    keywords: ["dosen pa", "etika chat", "wa dosen", "bimbingan pa", "template chat", "validasi krs"],
    answer: `📱 **Template Etika Chat Resmi Dosen Pembimbing Akademik (PA)**:

Gunakan format sopan pada jam kerja (08.00–16.00 WITA):

\`\`\`text
Assalamu'alaikum Warahmatullahi Wabarakatuh,

Selamat pagi/siang Bapak/Ibu [Nama Dosen PA],
Mohon maaf mengganggu waktu Bapak/Ibu.

Perkenalkan, saya:
Nama: [Nama Lengkap Mahasiswa]
NIM: [NIM 13 Digit]
Program Studi: S1 Teknologi Informasi (Angkatan 2026)

Izin menyampaikan bahwa saya telah menyelesaikan pengisian KRS untuk Semester Ganjil 2026/2027 sejumlah 20 SKS melalui portal SIKAD.

Mohon kesediaan Bapak/Ibu untuk memeriksa dan memberikan validasi pada sistem SIKAD.

Terima kasih banyak atas waktu dan arahan Bapak/Ibu.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.
\`\`\``,
    suggestedFollowups: ["Bagaimana alur pengisian KRS?", "Bagaimana jika Dosen PA belum merespon?"]
  },

  // ── KATEGORI 2: JADWAL & RUNDOWN KEGIATAN MABA ──
  {
    id: "qa-jadwal-lengkap",
    category: "jadwal",
    categoryLabel: "Jadwal & Rundown",
    categoryIcon: "CalendarCheck",
    question: "Apa saja rangkaian lengkap kegiatan orientasi MABA UMKT 2026?",
    keywords: ["jadwal", "rundown", "rangkaian", "tanggal", "kegiatan maba", "masta", "agenda"],
    answer: `📅 **Rangkaian Lengkap Kegiatan Orientasi MABA UMKT 2026**:

| Tanggal | Kegiatan | Penyelenggara / Media | Waktu |
|---|---|---|---|
| **Kamis, 06 Agt 2026** | Pembekalan MASTA | Panitia Universitas (Zoom) | Selesai |
| **11–12 Agt 2026** | MASTA Fakultas (FEBP & Teknik) | Panitia Fakultas Masing-Masing | Sesuai Jadwal |
| **18–20 Agt 2026** | **MASTA IMM (3 Gelombang)** | **Panitia IMM (Kampus UMKT)** | **06.00–17.00 WITA** |
| **Senin, 24 Agt 2026** | **Materi Universitas Hari 1** | **Panitia Universitas (Zoom)** | **08.00–17.00 WITA** |
| **Rabu, 26 Agt 2026** | **Materi Universitas Hari 2** | **Panitia Universitas (Zoom)** | **08.00–17.00 WITA** |
| **Jumat, 28 Agt 2026** | **UKM Expo (Sesi 1)** | **Kampus UMKT (Luring)** | **06.30–11.30 WITA** |
| **Jumat, 28 Agt 2026** | **Puncak Milad & Penutupan (Sesi 2)** | **Kampus UMKT (Luring)** | **17.00–22.00 WITA** |`,
    suggestedFollowups: ["Bagaimana pembagian 3 gelombang MASTA IMM?", "Apa ketentuan dresscode UKM Expo dan Milad?"]
  },
  {
    id: "qa-jadwal-imm",
    category: "jadwal",
    categoryLabel: "Jadwal IMM",
    categoryIcon: "CalendarCheck",
    question: "Bagaimana pembagian sesi dan gelombang MASTA IMM (18–20 Agustus 2026)?",
    keywords: ["imm", "gelombang 1", "gelombang 2", "gelombang 3", "sesi pagi", "sesi siang", "kuota", "febp", "fst", "teknik", "farmasi", "hukum"],
    answer: `🏛️ **Pembagian 3 Gelombang MASTA IMM (18–20 Agustus 2026)**:
*Total Kuota: 3.755 Mahasiswa Baru di Kampus UMKT*

### 1️⃣ **Gelombang 1: Selasa, 18 Agustus 2026 (1.400 Mhs)**
- **Sesi Pagi (06.00–12.00 WITA):** FEBP (HI, Akuntansi, MNJ, MLM Inter, MM) — Kuota 935 Mhs.
- **12.00–13.00 WITA:** ISHOMA.
- **Sesi Siang (13.00–17.00 WITA):** PSIKOLOGI & FKIP (B. Inggris, Olahraga) — Kuota 465 Mhs.

### 2️⃣ **Gelombang 2: Rabu, 19 Agustus 2026 (1.435 Mhs)**
- **Sesi Pagi (06.00–12.00 WITA):** FKM (Kesling, Kesmas) & HUKUM (S1 & S2) — Kuota 710 Mhs.
- **12.00–13.00 WITA:** ISHOMA.
- **Sesi Siang (13.00–17.00 WITA):** FARMASI, FIK (D3/S1/RPL/Ners) & KEDOKTERAN (FK) — Kuota 725 Mhs.

### 3️⃣ **Gelombang 3: Kamis, 20 Agustus 2026 (920 Mhs)**
- **Sesi Pagi (06.00–12.00 WITA):** SAINTEK / FST (TI Reguler, TI MLM, TI Inter, Sipil, Mesin, Geo) — Kuota 920 Mhs.`,
    suggestedFollowups: ["Apa dresscode MASTA IMM?", "Kapan jadwal materi universitas daring Zoom?"]
  },
  {
    id: "qa-jadwal-milad",
    category: "jadwal",
    categoryLabel: "Jadwal Milad",
    categoryIcon: "CalendarCheck",
    question: "Kapan pelaksanaan UKM Expo dan Puncak Milad UMKT?",
    keywords: ["ukm expo", "milad", "puncak milad", "penutupan", "28 agustus", "luring kampus"],
    answer: `🎉 **Jadwal UKM Expo & Puncak Milad UMKT (Jumat, 28 Agustus 2026)**:

Dilaksanakan secara **Luring (Tatap Muka)** di lingkungan Kampus UMKT Samarinda:
1. **Sesi Pagi (06.30–11.30 WITA): UKM EXPO**
   - Pawai dan demonstrasi seluruh organisasi & Unit Kegiatan Mahasiswa (Tapak Suci, HIMATIF, Futsal, Seni Musik, dll.).
   - Pendaftaran keanggotaan organisasi mahasiswa untuk portofolio SKPI.
2. **Sesi Malam (17.00–22.00 WITA): PUNCAK MILAD & PENUTUPAN MASTA**
   - Malam inaugurasi resmi, pengumuman penghargaan, dan penyerahan e-Sertifikat kelulusan orientasi.`,
    suggestedFollowups: ["Apa pakaian yang wajib dikenakan saat UKM Expo?", "Apa pakaian saat Puncak Milad?"]
  },

  // ── KATEGORI 3: TATA TERTIB & DRESSCODE ──
  {
    id: "qa-zoom-format",
    category: "tatatertib",
    categoryLabel: "Tata Tertib & Zoom",
    categoryIcon: "TShirt",
    question: "Apa format resmi penamaan akun Zoom untuk sesi materi universitas?",
    keywords: ["nama zoom", "format zoom", "rename zoom", "ganti nama zoom", "on cam", "virtual background"],
    answer: `💻 **Ketentuan Format Akun Zoom Meeting MASTA Daring (24 & 26 Agustus 2026)**:

Seluruh peserta wajib mengganti nama profil Zoom sebelum memasuki ruang rapat dengan format baku:

\`\`\`text
[Prodi]_[Nama Lengkap]
Contoh: TI_Muhammad Rizky Pratama
Contoh: Farmasi_Aisyah Putri Azzahra
\`\`\`

### Aturan Tambahan Sesi Zoom:
- Kamera wajib **On-Cam** menampakkan wajah dengan pencahayaan jelas.
- Menggunakan **Virtual Background resmi MASTA 2026** (unduh di \`masta-maba.odoo.com\`).
- Mikrofon dalam posisi **Mute** kecuali saat dipersilakan bertanya oleh moderator.`,
    suggestedFollowups: ["Apa dresscode saat sesi Zoom daring?", "Apa sanksi jika off-cam di Zoom?"]
  },
  {
    id: "qa-dresscode-lengkap",
    category: "tatatertib",
    categoryLabel: "Dresscode",
    categoryIcon: "TShirt",
    question: "Apa saja ketentuan dresscode pakaian untuk sesi Daring dan sesi Luring?",
    keywords: ["dresscode", "pakaian", "baju", "celana", "jilbab", "sepatu", "jas almamater", "peci", "kaos umkt"],
    answer: `👔 **Ketentuan Dresscode Resmi Kegiatan Mahasiswa Baru UMKT 2026**:

### 1. Sesi Daring via Zoom (24 & 26 Agustus):
- **Pria:** Kemeja putih polos lengan panjang, peci hitam, celana kain hitam formal.
- **Wanita:** Kemeja/tunik putih polos panjang tidak menerawang, jilbab rapi, rok kain hitam formal.

### 2. Sesi Luring Pagi — UKM Expo (Jumat, 28 Agustus 06.30 WITA):
- Kaos resmi UMKT (atau kaos olahraga sopan), celana training olahraga, sepatu olahraga (wanita mengenakan **jilbab hitam**).

### 3. Sesi Luring Malam — Puncak Milad (Jumat, 28 Agustus 17.00 WITA):
- **Pria:** Kemeja putih, celana panjang kain hitam, **peci/songkok hitam**, **jas almamater UMKT**, sepatu pantofel/formal.
- **Wanita:** Kemeja putih panjang, rok kain hitam panjang, **jilbab hitam**, **jas almamater UMKT**, sepatu formal.`,
    suggestedFollowups: ["Bagaimana aturan kerapian rambut pria?", "Apa barang yang dilarang dibawa ke kampus?"]
  },
  {
    id: "qa-tata-tertib-sanksi",
    category: "tatatertib",
    categoryLabel: "Tata Tertib & Sanksi",
    categoryIcon: "TShirt",
    question: "Apa saja aturan rambut, barang terlarang, dan sanksi kedisiplinan?",
    keywords: ["sanksi", "tata tertib", "rambut", "gondrong", "rokok", "vape", "miras", "sajam", "larangan", "mengulang"],
    answer: `⚠️ **Tata Tertib & Sanksi Kedisiplinan Resmi**:

### Aturan Kerapian:
- **Rambut Mahasiswa Laki-laki:** Wajib dicukur rapi (pendek formal), tidak gondrong, tidak menutup telinga/kerah, dan berwarna hitam alami.

### Barang yang Dilarang Keras:
- ❌ Senjata tajam (sajam), senjata api, bahan peledak.
- ❌ Minuman keras (miras) dan narkoba jenis apapun.
- ❌ Rokok tembakau maupun rokok elektrik (**Vape / Pod**) di seluruh area kampus.

### Sanksi Tegas:
Peserta yang melanggar tata tertib atau tidak menghadiri rangkaian tanpa izin resmi akan **DIKELUARKAN dari MASTA dan WAJIB MENGULANG TAHUN DEPAN** (Sertifikat MASTA merupakan syarat mutlak kelulusan dan SKPI).

*Disahkan oleh: Sekretaris Panitia SUHARDIANSYAH, NIDN 1129058501.*`,
    suggestedFollowups: ["Bagaimana format penamaan Zoom?", "Bagaimana cara izin dispensasi sakit?"]
  },

  // ── KATEGORI 4: AKADEMIK & KURIKULUM PRODI ──
  {
    id: "qa-kurikulum-ti-sem1",
    category: "akademik",
    categoryLabel: "Kurikulum & SKS",
    categoryIcon: "GraduationCap",
    question: "Apa saja mata kuliah Semester 1 Program Studi Teknologi Informasi (20 SKS)?",
    keywords: ["kurikulum ti", "mata kuliah ti", "semester 1 ti", "20 sks", "daspro", "matdis", "aljabar linear", "islamologi"],
    answer: `💻 **Daftar Mata Kuliah Semester 1 S1 Teknologi Informasi UMKT (Total 20 SKS)**:

| No | Mata Kuliah | SKS | Kelompok Keilmuan |
|---|---|---|---|
| 1 | **Aljabar Linear** | 3 SKS | Basic Science & Matematika |
| 2 | **Matematika Diskrit** | 3 SKS | Basic Science & Logika Algoritma |
| 3 | **Statistika** | 3 SKS | Sains Data & Analitika |
| 4 | **Dasar Pemrograman** | 3 SKS | Pemrograman Utama (Core Computing) |
| 5 | **Praktikum Dasar Pemrograman** | 1 SKS | Praktikum Laboratorium Komputer |
| 6 | **Sistem Digital & Arsitektur Komputer** | 3 SKS | Perangkat Keras & Arsitektur Sistem |
| 7 | **Kemanusiaan & Keimanan (Islamologi 1)** | 2 SKS | MKDU Universitas |
| 8 | **Aplikasi Komputer & Pengantar TI** | 2 SKS | Pengantar Teknologi Informasi |

> 🔥 **Semboyan TI:** *"HIDUP TEKNIK! NO SKILL NO TRUST!"*`,
    suggestedFollowups: ["Berapa standar nilai kelulusan mata kuliah TI?", "Apa saja konsentrasi peminatan di prodi TI?"]
  },
  {
    id: "qa-standar-nilai",
    category: "akademik",
    categoryLabel: "Standar Nilai",
    categoryIcon: "GraduationCap",
    question: "Berapa standar nilai kelulusan mata kuliah di UMKT?",
    keywords: ["standar nilai", "nilai lulus", "bobot nilai", "ipk", "ips", "nilai c", "nilai b", "skripsi"],
    answer: `📊 **Standar Nilai Minimum Kelulusan Mata Kuliah UMKT**:

- **Mata Kuliah Wajib Prodi & Konsentrasi:** Minimal **C** (Skor 2.00).
- **Mata Kuliah Dasar Umum (MKDU):** Minimal **B** (Skor 3.00).
- **Praktikum Laboratorium & Sains Dasar:** Minimal **BC** (Skor 2.50).
- **Kerja Praktik / Magang Industri & Capstone:** Minimal **B** (Skor 3.00).
- **Skripsi / Tugas Akhir:** Minimal **AB** (Skor 3.50).

*Tips:* Pertahankan IPS $\ge 3.00$ di semester awal agar berhak mengambil beban maksimal **24 SKS** di semester berikutnya!`,
    suggestedFollowups: ["Apa saja kurikulum semester 1 TI?", "Kapan jadwal UTS dan UAS ganjil?"]
  },
  {
    id: "qa-profil-ti-umkt",
    category: "akademik",
    categoryLabel: "Profil Prodi TI",
    categoryIcon: "GraduationCap",
    question: "Apa akreditasi, gelar lulusan, dan konsentrasi peminatan Prodi TI UMKT?",
    keywords: ["profil ti", "akreditasi ti", "s.kom", "gelar", "peminatan ti", "jrs", "kc", "cyber security", "ai"],
    answer: `🎓 **Profil Program Studi S1 Teknologi Informasi UMKT**:

- **Akreditasi:** **"Baik Sekali"** oleh LAM-INFOKOM (Berlaku 2025–2030).
- **Gelar Kelulusan:** **Sarjana Komputer (S.Kom)**.
- **Konsentrasi Peminatan (Semester 5 ke atas):**
  1. 🌐 **Jaringan dan Rekayasa Sistem (JRS):** Cyber Security, Cloud Computing, Network Infrastructure, dan IoT.
  2. 🤖 **Komputasi Cerdas (KC):** Artificial Intelligence, Machine Learning, Data Science, dan Computer Vision.
- **Fasilitas Unggulan:** Lab Cyber Security, Lab Software Engineering, Lab AI & Robotika, dan Server Riset Kampus.`,
    suggestedFollowups: ["Apa saja mata kuliah Semester 1 TI?", "Di mana lokasi gedung Fakultas Teknik / FST?"]
  },

  // ── KATEGORI 5: LAYANAN KAMPUS & KONTAK ADMIN ──
  {
    id: "qa-kontak-admin-bima",
    category: "layanan",
    categoryLabel: "Layanan & Kontak",
    categoryIcon: "MapPin",
    question: "Di mana lokasi Biro Kemahasiswaan (BIMA) dan apa nomor WhatsApp resminya?",
    keywords: ["kontak bima", "biro kemahasiswaan", "gedung c", "wa bima", "jam kerja", "surat dispensasi", "beasiswa", "admin"],
    answer: `🏛️ **Biro Kemahasiswaan dan Alumni (BIMA) UMKT**:

- **Lokasi Kantor:** Gedung C Lantai 1, Kampus UMKT Samarinda.
- **Jam Pelayanan Operasional:**
  - **Senin – Kamis:** 08.00 – 16.00 WITA
  - **Jumat:** 08.00 – 11.30 WITA
  - **Sabtu & Minggu:** Libur / Tutup
- **Nomor WhatsApp Resmi:** [**0822-5087-8843**](https://wa.me/6282250878843)
- **Layanan:** Pelaksanaan MASTA, surat izin dispensasi, sertifikat kelulusan orientasi, legalitas UKM, dan pendaftaran beasiswa KIP-K/Tahfidz.`,
    suggestedFollowups: ["Di mana kontak Admin PMB untuk aktivasi NIM?", "Bagaimana cara mengajukan izin dispensasi sakit?"]
  },
  {
    id: "qa-kontak-admin-pmb",
    category: "layanan",
    categoryLabel: "Admin PMB",
    categoryIcon: "MapPin",
    question: "Ke mana menghubungi jika ada kendala aktivasi NIM, daftar ulang, atau ijazah PMB?",
    keywords: ["pmb", "admin pmb", "aktivasi nim", "daftar ulang", "ijazah", "berkas pmb", "gedung utama"],
    answer: `🎓 **Admin Penerimaan Mahasiswa Baru (PMB) UMKT**:

- **Lokasi Kantor:** Gedung Utama UMKT Lantai 1 (Front Office PMB).
- **Nomor WhatsApp Resmi:** [**+62 812-3001-7008**](https://wa.me/6281230017008)
- **Layanan:**
  1. Konfirmasi kelulusan seleksi dan aktivasi NIM 13 digit.
  2. Verifikasi berkas ijazah, SKL, dan dokumen pendaftaran ulang.
  3. Kendala mutasi program studi atau pelunasan tagihan awal registrasi.`,
    suggestedFollowups: ["Bagaimana cara login portal SIKAD?", "Di mana kontak Biro Kemahasiswaan Gedung C?"]
  },
  {
    id: "qa-dispensasi-izin",
    category: "layanan",
    categoryLabel: "Izin & Dispensasi",
    categoryIcon: "MapPin",
    question: "Bagaimana alur pengajuan surat izin dispensasi jika berhalangan hadir saat kegiatan?",
    keywords: ["dispensasi", "izin tidak hadir", "sakit", "surat izin", "keringanan", "halangan"],
    answer: `📝 **Alur Pengajuan Surat Izin Dispensasi Resmi**:

1. Siapkan **Surat Keterangan Dokter / Surat Tugas Instansi** yang sah.
2. Buat surat permohonan izin tertulis mencantumkan: Nama Lengkap, NIM 13 Digit, Program Studi, Alasan Berhalangan, dan Tanggal Kegiatan.
3. Serahkan berkas fisik ke **Biro Kemahasiswaan di Gedung C Lantai 1** atau kirim PDF via WhatsApp BIMA di [**0822-5087-8843**](https://wa.me/6282250878843) minimal 1 hari sebelum agenda berlangsung.
4. Panitia akan menerbitkan surat keterangan dispensasi resmi agar tidak terkena sanksi gugur.`,
    suggestedFollowups: ["Apa sanksi jika tidak hadir tanpa izin?", "Berapa kontak WhatsApp Biro Kemahasiswaan?"]
  },

  // ── KATEGORI 6: BEASISWA, UKM & FASILITAS ──
  {
    id: "qa-beasiswa-umkt",
    category: "beasiswa",
    categoryLabel: "Beasiswa",
    categoryIcon: "Trophy",
    question: "Apa saja jenis beasiswa yang tersedia di UMKT dan bagaimana persyaratannya?",
    keywords: ["beasiswa", "kip kuliah", "kip-k", "tahfidz", "prestasi", "kader muhammadiyah", "pdm", "gratis spp"],
    answer: `🌟 **Daftar Skema Beasiswa Mahasiswa UMKT 2026**:

1. **Beasiswa KIP-Kuliah (Kemendikbudristek):** Pembebasan penuh SPP/DPP hingga lulus + bantuan biaya hidup bulanan bagi mahasiswa berprestasi dari keluarga prasejahtera.
2. **Beasiswa Tahfidz Al-Qur'an:** Keringanan potongan biaya SPP 50%–100% bagi penghafal Al-Qur'an minimal 5 hingga 30 Juz.
3. **Beasiswa Prestasi Sains, Seni & Olahraga:** Potongan biaya bagi juara kompetisi tingkat provinsi, nasional, atau internasional (e.g. Tapak Suci, MTQ, OSN).
4. **Beasiswa Kader Persyarikatan:** Rekomendasi resmi dari Pimpinan Daerah Muhammadiyah (PDM) setempat.

*Informasi seleksi:* Diajukan melalui Biro Kemahasiswaan (BIMA) Gedung C Lt. 1.`,
    suggestedFollowups: ["Kapan pendaftaran UKM Expo dibuka?", "Apa saja fasilitas yang tersedia di kampus?"]
  },
  {
    id: "qa-ukm-organisasi",
    category: "beasiswa",
    categoryLabel: "UKM & Organisasi",
    categoryIcon: "Trophy",
    question: "Apa saja organisasi kemahasiswaan dan UKM yang ada di UMKT?",
    keywords: ["ukm", "organisasi", "himatif", "imm", "bem", "dpm", "tapak suci", "futsal", "psm", "mapala"],
    answer: `🎪 **Organisasi & Unit Kegiatan Mahasiswa (UKM) UMKT**:

- **Lembaga Eksekutif & Legislatif:** BEM Universitas, DPM, BEM Fakultas, dan Ikatan Mahasiswa Muhammadiyah (IMM).
- **Himpunan Mahasiswa Jurusan:** **HIMATIF** (Teknik Informatika), HIMASIP (Teknik Sipil), HIMAJEM (Manajemen), BEM Farmasi, dll.
- **UKM Bela Diri & Olahraga:** Tapak Suci Putera Muhammadiyah, Sepak Bola & Futsal, Badminton, Basket, Bola Voli.
- **UKM Seni & Penalaran:** Paduan Suara Mahasiswa (PSM), Teater & Tari, Mahasiswa Pecinta Alam (MAPALA), English Club, Robotika & Coding Club.

*Pendaftaran serentak dibuka pada **UKM Expo, Jumat 28 Agustus 2026** di Kampus UMKT!*`,
    suggestedFollowups: ["Kapan jadwal UKM Expo?", "Bagaimana cara mendaftar beasiswa?"]
  },
  {
    id: "qa-fasilitas-kampus",
    category: "beasiswa",
    categoryLabel: "Fasilitas Kampus",
    categoryIcon: "Trophy",
    question: "Fasilitas apa saja yang dapat dinikmati mahasiswa baru di kampus UMKT?",
    keywords: ["fasilitas", "perpustakaan", "lab komputer", "wifi", "masjid", "student lounge", "kantin"],
    answer: `🏢 **Fasilitas Kampus Unggulan UMKT Samarinda**:

1. **Perpustakaan Digital (Digilib):** Koleksi ribuan e-book, jurnal internasional terakreditasi, dan ruang belajar multimedia hening.
2. **Laboratorium Komputer & Komputasi:** Dilengkapi workstation spesifikasi tinggi untuk praktikum coding, AI, dan jaringan.
3. **Masjid Kampus UMKT:** Pusat ibadah berjamaah, kajian keislaman, dan pembinaan karakter.
4. **Free WiFi Eduroam & UMKT-Net:** Akses internet cepat di seluruh gedung ruang kelas dan koridor.
5. **Student Lounge & Coworking Space:** Spot belajar kelompok yang nyaman dengan colokan listrik dan AC.
6. **Kantin Sehat & Lapangan Olahraga Multifungsi.**`,
    suggestedFollowups: ["Di mana lokasi Biro Kemahasiswaan?", "Bagaimana kurikulum semester 1 prodi TI?"]
  },

  // ── KATEGORI 7: INOVASI & PEMERINGKATAN UMKT 2026 (SUSTAINABILITY & SDGS) ──
  {
    id: "qa-pemeringkatan-umkt",
    category: "pemeringkatan",
    categoryLabel: "Inovasi Keberlanjutan",
    categoryIcon: "ShieldCheck",
    question: "Apa latar belakang aplikasi Nyala dan kaitannya dengan tema Keberlanjutan (Sustainability) di Lomba Pemeringkatan UMKT?",
    keywords: ["pemeringkatan", "lomba", "inovasi", "pengembang", "al-ghani", "desta", "setyawan", "kou.sozo", "kou.bio", "karya", "maba 2026", "sustainability", "keberlanjutan", "sdgs"],
    answer: `🌿 **Nyala — Inovasi Keberlanjutan & Paperless Orientasi MABA UMKT 2026**:

Aplikasi **Nyala** dirancang dan dikembangkan secara mandiri oleh **Al-Ghani Desta Setyawan** (Mahasiswa Baru UMKT 2026, Instagram: [**@kou.sozo**](https://instagram.com/kou.sozo) • Portfolio: [**kou.bio**](https://kou.bio)) dengan mengusung tema **Inovasi Digital Keberlanjutan (*Sustainability & Green Campus*)**.

### 🌍 4 Pilar SDGs yang Didukung Nyala:
1. **SDGs 12 (Konsumsi & Produksi Bertanggung Jawab):** Mengubah orientasi fisik yang boros kertas menjadi **100% Paperless Digital Ecosystem** (menghemat ~15 lembar kertas per mahasiswa).
2. **SDGs 13 (Aksi Iklim & Reduksi Emisi):** Memangkas emisi karbon (*carbon footprint*) dari pencetakan dan distribusi modul fisik.
3. **SDGs 4 (Pendidikan Berkualitas & Inklusif):** Akses informasi transparan tanpa batasan kuota berkat fitur offline-first PWA dan AI Companion deterministik.
4. **SDGs 9 (Inovasi & Infrastruktur Digital):** Arsitektur komputasi ringan berkecepatan tinggi yang ramah energi server (*low energy digital footprint*).

> *Catatan Transparansi:* Disusun untuk **Submission Lomba Pengembangan Web Pemeringkatan UMKT (umkt.ac.id/pemeringkatan)**. Seluruh data dirangkum dari pengumuman resmi kampus.`,
    suggestedFollowups: ["Bagaimana cara kerja Eco-Impact Tracker?", "Bagaimana cara login portal SIKAD?"]
  },
  {
    id: "qa-sustainability-paperless",
    category: "pemeringkatan",
    categoryLabel: "Kampus Paperless",
    categoryIcon: "ShieldCheck",
    question: "Bagaimana cara kerja Eco-Impact Tracker dan perhitungan penghematan kertas di Nyala?",
    keywords: ["eco impact", "kertas", "hemat kertas", "paperless", "jejak karbon", "co2", "air", "green campus", "lingkungan", "lca"],
    answer: `🌱 **Sistem Perhitungan Eco-Impact Tracker Nyala**:

Eco-Impact Tracker menghitung kontribusi nyata setiap mahasiswa baru dalam pelestarian lingkungan berdasarkan standar *Life Cycle Assessment (LCA)* industri kertas:

### 📊 Metrik Perhitungan Nyata:
- **Kertas Dihemat:** Base 8 lembar (buku panduan & rundown digital) + 1 lembar per item checklist digital yang diselesaikan.
- **Reduksi Emisi CO₂:** \`Kertas Dihemat × 0.015 kg CO₂e\` (mengurangi jejak emisi produksi pulp & logistik).
- **Air Bersih Dihemat:** \`Kertas Dihemat × 0.3 Liter air\` (penghematan air proses industri kertas).

💡 *Kamu dapat memantau akumulasi penghematan kertas dan jejak karbon pribadimu langsung di menu **Profil Mahasiswa**!*`,
    suggestedFollowups: ["Berapa lembar kertas yang bisa dihemat 3.755 MABA?", "Apa saja fitur utama aplikasi Nyala?"]
  }
];

/**
 * Helper function: Pencarian Cerdas Deterministik (Fuzzy & Keyword Matcher)
 * Memberikan jawaban instan, akurat, dan terstruktur tanpa AI eksternal.
 */
export function findBestMatchingAnswer(userQuery: string): QAKnowledgeItem {
  const cleanQuery = userQuery.toLowerCase().trim();

  // 1. Direct Keyword Score Matching
  let bestItem: QAKnowledgeItem = VERIFIED_QA_DATABASE[0];
  let highestScore = 0;

  for (const item of VERIFIED_QA_DATABASE) {
    let score = 0;

    // Check Question exact phrase
    if (cleanQuery.includes(item.question.toLowerCase())) {
      score += 50;
    }

    // Check Keywords matches
    for (const kw of item.keywords) {
      if (cleanQuery.includes(kw.toLowerCase())) {
        score += 10 + kw.length; // Bobot lebih besar untuk kata kunci yang lebih spesifik
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestItem = item;
    }
  }

  // Jika skor match mencukupi, kembalikan jawaban terbaik
  if (highestScore > 0) {
    return bestItem;
  }

  // 2. Default Fallback Item jika tidak ada kata kunci yang cocok
  return {
    id: "qa-default-fallback",
    category: "umum",
    categoryLabel: "Pusat Bantuan",
    categoryIcon: "Sparkle",
    question: "Pusat Bantuan Akademik & Orientasi MABA UMKT 2026",
    keywords: [],
    answer: `Halo! Aku **Nyala**, asisten cerdas panduan Mahasiswa Baru **Universitas Muhammadiyah Kalimantan Timur (UMKT) 2026**.

Berikut beberapa topik penting yang bisa langsung kamu tanyakan:
- 🔑 **Kredensial SIKAD:** NIM 13 Digit & Password default Nomor Registrasi diawali \`12xxxxxx\`
- 📋 **KRS & Dosen PA:** Alur pengisian paket 20 SKS & etika chat WA Dosen Pembimbing
- 📅 **Jadwal MABA:** Rangkaian Universitas, Fakultas, IMM 3 Gelombang, & UKM Expo
- 👔 **Tata Tertib & Zoom:** Format penamaan \`[Prodi]_[Nama Lengkap]\` & Dresscode
- 🏛️ **Kontak Admin:** WhatsApp Biro Kemahasiswaan Gedung C Lt. 1 ([0822-5087-8843](https://wa.me/6282250878843))
- 🏆 **Inovasi Pemeringkatan:** Karya MABA Al-Ghani Desta Setyawan ([@kou.sozo](https://instagram.com/kou.sozo))

*Kamu juga bisa memilih tombol topik rekomendasi di bawah untuk jawaban instan!*`,
    suggestedFollowups: [
      "Bagaimana cara login dan apa username password SIKAD?",
      "Apa saja rangkaian lengkap kegiatan orientasi MABA?",
      "Apa format resmi nama akun Zoom?",
      "Di mana kontak Biro Kemahasiswaan Gedung C?"
    ]
  };
}
