export interface MastaStage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  status: "completed" | "active" | "upcoming";
  dates?: string;
  steps: string[];
  tips: string;
}

export interface ChecklistItem {
  id: string;
  category: "Dokumen & Identitas" | "Perangkat & Jaringan" | "Pakaian & Atribut" | "Kesehatan & Mental";
  title: string;
  description: string;
  required: boolean;
  officialRef?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface SikadGuideSection {
  id: string;
  title: string;
  badge: string;
  summary: string;
  steps: string[];
  tips: string;
  portalUrl: string;
  iconName: string;
}

export interface Lecturer {
  name: string;
  expertise: string;
  status: "Aktif" | "Tugas Belajar (S3)";
}

export interface Course {
  semester: number;
  code: string;
  name: string;
  sks: number;
  category: "Wajib Prodi" | "Praktikum" | "Universitas (UNI)" | "Fakultas (FST)";
}

export interface AcademicMilestone {
  dateRange: string;
  title: string;
  desc: string;
  status: "active" | "upcoming";
}

export interface AdminContact {
  id: string;
  name: string;
  badge: string;
  department: string;
  location: string;
  operationalHours: { days: string; time: string }[];
  whatsapp: string;
  whatsappFormatted: string;
  whatsappUrl: string;
  services: string[];
  quickGreeting: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Adaptasi & Rantau" | "Akademik & SIKAD" | "Beasiswa" | "Organisasi & UKM" | "Teknis MASTA" | "Fasilitas Kampus";
  readTime: string;
  author: string;
  authorRole: string;
  date: string;
  tags: string[];
  content: string;
  keyTakeaways: string[];
}

export const OFFICIAL_LINKS = {
  umktMain: "https://www.umkt.ac.id/",
  umktKemahasiswaan: "https://www.umkt.ac.id/kemahasiswaan/",
  umktAkademik: "https://www.umkt.ac.id/akademik/",
  mastaOdoo: "https://masta-maba.odoo.com/",
  sikadMahasiswa: "https://mahasiswa.umkt.ac.id/",
};

// ==========================================
// KONTAK RESMI ADMIN & LAYANAN MAHASISWA UMKT
// ==========================================
export const OFFICIAL_CONTACTS: AdminContact[] = [
  {
    id: "admin-pmb",
    name: "Admin Penerimaan Mahasiswa Baru (PMB)",
    badge: "Pendaftaran & Registrasi",
    department: "Biro Admisi & PMB UMKT",
    location: "Gedung Utama UMKT Lantai 1, Samarinda",
    operationalHours: [
      { days: "Senin - Kamis", time: "08.00 - 16.00 WITA" },
      { days: "Jumat", time: "08.00 - 11.30 WITA" },
      { days: "Sabtu - Minggu", time: "Tutup (Libur Layanan)" }
    ],
    whatsapp: "6281230017008",
    whatsappFormatted: "+62 812-3001-7008",
    whatsappUrl: "https://wa.me/6281230017008?text=Halo%20Admin%20PMB%20UMKT%2C%20saya%20Mahasiswa%20Baru%202026%20ingin%20bertanya%20seputar%20registrasi%2FNIM%2Fpendaftaran.",
    services: [
      "Informasi kelulusan jalur seleksi PMB",
      "Aktivasi Nomor Induk Mahasiswa (NIM)",
      "Verifikasi berkas ijazah & kartu pendaftaran",
      "Kendala pembayaran biaya daftar ulang"
    ],
    quickGreeting: "Halo Admin PMB UMKT, saya calon mahasiswa baru 2026 ingin mengonfirmasi terkait berkas pendaftaran saya."
  },
  {
    id: "admin-kemahasiswaan",
    name: "Biro Kemahasiswaan dan Alumni (BIMA) UMKT",
    badge: "MASTA & Beasiswa",
    department: "Biro Kemahasiswaan & Alumni (BIMA)",
    location: "Gedung C Lantai 1 UMKT, Samarinda",
    operationalHours: [
      { days: "Senin - Kamis", time: "08.00 - 16.00 WITA" },
      { days: "Jumat", time: "08.00 - 11.30 WITA" },
      { days: "Sabtu - Minggu", time: "Tutup (Libur Layanan)" }
    ],
    whatsapp: "6282250878843",
    whatsappFormatted: "+62 822-5087-8843",
    whatsappUrl: "https://wa.me/6282250878843?text=Halo%20Admin%20Biro%20Kemahasiswaan%20dan%20Alumni%20UMKT%2C%20saya%20MABA%202026%20ingin%20konsultasi%20seputar%20pelaksanaan%20MASTA%2Fbeasiswa%2Fkegiatan%20kemahasiswaan.",
    services: [
      "Pelaksanaan & jadwal teknis MASTA UMKT 2026",
      "Penerbitan & kendala e-Sertifikat kelulusan MASTA",
      "Pendaftaran Beasiswa KIP-Kuliah, Prestasi & Kader",
      "Izin dispensasi resmi kegiatan orientasi",
      "Legalitas Unit Kegiatan Mahasiswa (UKM) & Organisasi"
    ],
    quickGreeting: "Halo Biro Kemahasiswaan UMKT (Gedung C Lt. 1), saya peserta MASTA 2026 ingin menanyakan izin dispensasi/sertifikat."
  }
];

// ==========================================
// ARTIKEL / BLOG PANDUAN MABA UMKT 2026
// ==========================================
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "tips-adaptasi-mahasiswa-rantau-samarinda",
    title: "Panduan Bertahan & Sukses Adaptasi Kuliah di Samarinda untuk Mahasiswa Rantau",
    excerpt: "Panduan lengkap seputar biaya hidup, mencari kost sekitar Jl. Ir. H. Juanda, transportasi lokal, hingga tips kuliner hemat di Samarinda bagi MABA.",
    category: "Adaptasi & Rantau",
    readTime: "5 menit baca",
    author: "Tim Kemahasiswaan & BIMA UMKT",
    authorRole: "Biro Kemahasiswaan",
    date: "18 Agustus 2026",
    tags: ["Rantau", "Kost Samarinda", "Biaya Hidup", "Tips Mahasiswa"],
    content: `
Memulai masa perkuliahan di kota baru seringkali memicu rasa cemas sekaligus antusias. Bagi kalian mahasiswa rantau yang baru pertama kali menginjakkan kaki di Samarinda untuk berkuliah di **Universitas Muhammadiyah Kalimantan Timur (UMKT)**, berikut adalah panduan praktis agar adaptasi kalian berjalan lancar dan hemat.

### 1. Memilih Hunian Kost di Sekitar Kampus
Kampus utama UMKT terletak strategis di kawasan Jl. Ir. H. Juanda, Samarinda Ulu. Kawasan ini memiliki banyak pilihan kost dengan harga bervariasi:
- **Rentang Harga:** Rp 500.000 - Rp 900.000 / bulan untuk kamar standar, dan Rp 1.100.000 - Rp 1.800.000 / bulan untuk kamar berfasilitas AC dan kamar mandi dalam.
- **Lokasi Strategis:** Pilih gang atau jalan di sepanjang Jl. Juanda, Jl. P. Antasari, atau Jl. Siradj Salman agar mudah menjangkau kampus dengan berjalan kaki atau kendaraan roda dua dalam 5-10 menit.
- **Fasilitas Wajib:** Pastikan kost memiliki ventilasi udara baik, keamanan gerbang memadai, dan akses air PDAM/tandon yang stabil.

### 2. Transportasi dan Mobilitas di Samarinda
- **Ojek Daring (Gojek / Maxim / Grab):** Sangat mudah diakses di sekitar kampus dan tarifnya ramah di kantong mahasiswa.
- **Angkutan Kota (Angkot):** Trayek A dan B sering melintasi jalan arteri utama Samarinda jika ingin bepergian hemat ke Pasar Segiri atau Mall Lembuswana.
- **Sepeda Motor:** Transportasi paling efisien untuk mobilitas kuliah harian dan kegiatan kerja kelompok.

### 3. Estimasi Anggaran Biaya Hidup Bulanan
Sebagai estimasi rata-rata mahasiswa di Samarinda:
- **Makan Harian:** Rp 25.000 - Rp 45.000 / hari (Warung nasi campur, warung padang, dan warung burjo di sekitar kampus sangat terjangkau).
- **Kebutuhan Bulanan (Total):** Rp 1.500.000 - Rp 2.500.000 (sudah termasuk makan, kuota internet cadangan, dan laundry kiloan).

### 4. Menjaga Kesehatan Fisik dan Mental
Perubahan cuaca di Samarinda yang cukup dinamis menuntut hidrasi yang baik. Selalu bawa botol air minum pribadi, konsumsi makanan bergizi, dan jangan ragu memanfaatkan fitur **Health Check** di portal Nyala untuk memonitor kebugaranmu!
`,
    keyTakeaways: [
      "Pilih kost dalam radius 1-2 km dari Jl. Ir. H. Juanda untuk efisiensi biaya transportasi.",
      "Estimasi biaya makan dan kebutuhan hidup bulanan berkisar Rp 1,5 - 2,5 juta.",
      "Gunakan layanan ojek daring atau motor pribadi untuk mobilitas optimal."
    ]
  },
  {
    slug: "strategi-krs-dan-raih-ipk-4-semester-1",
    title: "Trik Pengisian KRS SIKAD & Strategi Meraih IPK 4.0 di Semester 1",
    excerpt: "Bagaimana cara memaksimalkan SIKAD, membangun relasi dengan Dosen Pembimbing Akademik (PA), dan menyusun jadwal belajar anti-burnout.",
    category: "Akademik & SIKAD",
    readTime: "6 menit baca",
    author: "Abdul Rahim, M.Kom",
    authorRole: "Dosen Program Studi TI",
    date: "17 Agustus 2026",
    tags: ["SIKAD", "KRS Online", "IPK 4.0", "Teknik Belajar"],
    content: `
Banyak mahasiswa baru mengira semester 1 adalah waktu untuk santai. Faktanya, **nilai di semester 1 adalah fondasi psikologis dan akademis paling krusial**. Indeks Prestasi Semester (IPS) awal menentukan apakah kalian berhak mengambil beban maksimal 24 SKS di semester berikutnya untuk lulus 3,5 tahun!

### 1. Pahami Alur KRS di Portal SIKAD (mahasiswa.umkt.ac.id)
- Pada Semester 1, seluruh mata kuliah dipaketkan oleh Program Studi (20 SKS).
- Tugas utama kalian adalah memverifikasi nama dosen pengampu, kode kelas (A/B/C), dan memastikan tidak ada status mata kuliah yang berstatus *unapproved*.
- **Wajib Bimbingan Dosen PA:** Jadwalkan konsultasi awal dengan Dosen Pembimbing Akademik kalian untuk perkenalan dan validasi KRS. Jangan menunggu sampai batas penutupan sistem pada 27 Agustus 2026!

### 2. Rumus Pembagian Waktu Kuliah vs Belajar Mandiri
Setiap 1 SKS perkuliahan setara dengan 50 menit tatap muka di kelas, 60 menit tugas terstruktur, dan 60 menit belajar mandiri.
- Jika mengambil 20 SKS, alokasikan minimal 2-3 jam per hari untuk mengulang materi coding (Dasar Pemrograman) dan latihan soal matematika (Aljabar Linear & Matematika Diskrit).
- **Pro Tips:** Buat *Cheat Sheet* rumus logika matematika dan git command sejak minggu pertama!

### 3. Kuasai Standar Nilai Minimum Kelulusan
Ingat, di Program Studi Teknologi Informasi UMKT:
- MK Wajib Prodi & Konsentrasi: Minimal nilai **C**.
- MKDU (Universitas): Minimal nilai **B**.
- Basic Science & Praktikum: Minimal **BC**.
- Semboyan kita adalah: **HIDUP TEKNIK! NO SKILL NO TRUST!**

### 4. Etika Menghubungi Dosen PA Melalui WhatsApp
1. Hubungi di jam kerja resmi (Senin-Jumat, 08.00 - 16.00 WITA).
2. Awali salam formal, perkenalkan diri lengkap: Nama, NIM, Program Studi, dan Angkatan.
3. Sampaikan maksud dengan lugas, santun, dan tanpa singkatan berlebihan (misal: gunakan *dengan* bukan *dgn*).
4. Akhiri dengan ucapan terima kasih dan doa kebaikan.
`,
    keyTakeaways: [
      "Validasi KRS di SIKAD sebelum 27 Agustus 2026 bersama Dosen PA.",
      "IPS > 3.00 di semester 1 membuka kesempatan mengambil 24 SKS untuk lulus 3,5 tahun.",
      "Terapkan etika formal saat berkomunikasi dengan dosen via WhatsApp."
    ]
  },
  {
    slug: "kupas-tuntas-beasiswa-umkt-kip-prestasi-kader",
    title: "Kupas Tuntas Beasiswa UMKT: KIP-Kuliah, Prestasi, Tahfidz & Kader Muhammadiyah",
    excerpt: "Informasi resmi persyaratan, alur seleksi, serta panduan pengajuan beasiswa di Biro Kemahasiswaan dan Alumni (Gedung C Lantai 1 UMKT).",
    category: "Beasiswa",
    readTime: "4 menit baca",
    author: "Biro Kemahasiswaan & Alumni (BIMA)",
    authorRole: "Unit Pengelola Beasiswa",
    date: "16 Agustus 2026",
    tags: ["Beasiswa", "KIP Kuliah", "BIMA UMKT", "Tahfidz"],
    content: `
Universitas Muhammadiyah Kalimantan Timur berkomitmen memberikan akses pendidikan tinggi yang inklusif melalui berbagai skema beasiswa penuh maupun parsial bagi mahasiswa berprestasi dan berdedikasi.

### Jenis Beasiswa yang Tersedia di UMKT
1. **Beasiswa KIP-Kuliah (Kemendikbudristek):**
   - Ditujukan bagi mahasiswa baru berprestasi dari keluarga kurang mampu secara ekonomi.
   - Fasilitas: Pembebasan biaya kuliah penuh dan bantuan biaya hidup bulanan.
2. **Beasiswa Prestasi Akademik & Olahraga / Seni:**
   - Ditujukan bagi peraih medali kejuaraan tingkat provinsi, nasional, atau internasional (misal: Olimpiade Sains, Kejuaraan Silat Tapak Suci).
3. **Beasiswa Tahfidz Al-Qur'an:**
   - Diberikan bagi penghafal Al-Qur'an minimal 5 Juz, 10 Juz, hingga 30 Juz dengan evaluasi berkala oleh Lembaga Al-Islam Kemuhammadiyahan (AIK).
4. **Beasiswa Kader Persyarikatan Muhammadiyah / Aisyiyah:**
   - Rekomendasi resmi dari Pimpinan Daerah Muhammadiyah (PDM) atau organisasi otonom (IPM/IMM).

### Lokasi & Layanan Informasi Beasiswa
Seluruh administrasi beasiswa dikoordinasikan secara terpadu di:
- **Lokasi:** Biro Kemahasiswaan dan Alumni (BIMA), Gedung C Lantai 1 UMKT.
- **Jam Pelayanan:** Senin - Kamis (08.00 - 16.00 WITA) dan Jumat (08.00 - 11.30 WITA).
- **Kontak WhatsApp Resmi BIMA:** \`0822-5087-8843\`.
`,
    keyTakeaways: [
      "Tersedia skema KIP-Kuliah, Prestasi, Tahfidz, dan Beasiswa Kader Muhammadiyah.",
      "Konsultasi berkas dan seleksi dipusatkan di Gedung C Lantai 1 UMKT.",
      "Layanan WhatsApp resmi Biro Kemahasiswaan aktif di nomor 0822-5087-8843."
    ]
  },
  {
    slug: "daftar-ukm-dan-organisasi-mahasiswa-umkt",
    title: "Daftar Unit Kegiatan Mahasiswa (UKM) & Komunitas Unggulan di Kampus UMKT",
    excerpt: "Tingkatkan soft skill, kepemimpinan, dan jejaring karir melalui organisasi kemahasiswaan, dari bidang teknologi, seni, hingga bela diri.",
    category: "Organisasi & UKM",
    readTime: "5 menit baca",
    author: "Presidium BEM UMKT",
    authorRole: "Lembaga Eksekutif Mahasiswa",
    date: "15 Agustus 2026",
    tags: ["UKM", "HIMATIF", "Organisasi", "Kepemimpinan"],
    content: `
Kuliah bukan hanya soal ruang kelas dan nilai di transkrip. Dunia industri di tahun 2026 sangat mengapresiasi kandidat yang memiliki kemampuan kepemimpinan, komunikasi, dan kerja tim yang terasah nyata di organisasi kampus.

### 1. Organisasi Jurusan: HIMATIF (Himpunan Mahasiswa Teknik Informatika)
Sebagai mahasiswa Teknologi Informasi, HIMATIF adalah rumah pertama kalian. Memiliki 4 departemen aktif:
- **Dept. PSDM:** Pengembangan skill anggota, kaderisasi, dan pelatihan kepemimpinan.
- **Dept. Kominfo / Media Kreatif:** Desain grafis, podcast kampus, dan branding media digital.
- **Dept. Sosma:** Bakti sosial, tanggap bencana, dan pengabdian masyarakat.
- **Dept. Kerohanian:** Menjaga nilai Al-Islam dan kekeluargaan antar angkatan.

### 2. Unit Kegiatan Mahasiswa (UKM) Olahraga & Bela Diri
- **Tapak Suci Putera Muhammadiyah:** Seni bela diri pencak silat berprestasi internasional.
- **UKM Futsal & Sepak Bola:** Mengikuti liga mahasiswa tingkat regional dan nasional.
- **UKM Badminton & Bola Voli:** Wadah olahraga rutin dan turnamen tahunan.

### 3. UKM Seni, Budaya & Minat Khusus
- **UKM Paduan Suara Mahasiswa (PSM):** Penampil utama di wisuda dan kompetisi paduan suara.
- **UKM Teater & Seni Musik:** Kolaborasi pertunjukan drama dan konser akustik kampus.
- **Mapala (Mahasiswa Pecinta Alam):** Ekspedisi alam bebas, konservasi lingkungan Kalimantan Timur.
- **Hizbul Wathan (HW) & KSR PMI:** Korps sukarelawan kemanusiaan dan kepanduan.

### 4. Kapan Mendaftar UKM?
Seluruh UKM akan membuka pendaftaran anggota baru pada **Sesi UKM Expo di Tahap 4 MASTA 2026**. Pastikan kalian memilih minimal satu organisasi yang sesuai dengan minat!
`,
    keyTakeaways: [
      "HIMATIF adalah himpunan resmi mahasiswa TI dengan 4 departemen aktif.",
      "Pendaftaran seluruh UKM dibuka serentak pada sesi UKM Expo MASTA Tahap 4.",
      "Keaktifan organisasi akan masuk ke dokumen SKPI (Surat Keterangan Pendamping Ijazah)."
    ]
  },
  {
    slug: "checklist-teknis-h-3-masta-umkt-zoom-dresscode",
    title: "Checklist Teknis H-3 MASTA UMKT: Setup Zoom, Dresscode & Ketentuan On-Cam",
    excerpt: "Panduan teknis menghindari kendala koneksi, aturan pakaian hitam-putih, format penamaan akun Zoom, dan tata tertib presensi online.",
    category: "Teknis MASTA",
    readTime: "4 menit baca",
    author: "Panitia Pelaksana MASTA 2026",
    authorRole: "Divisi Teknis & Acara",
    date: "14 Agustus 2026",
    tags: ["MASTA 2026", "Zoom Meeting", "Dresscode", "Tata Tertib"],
    content: `
Agar partisipasi kalian di Masa Ta’aruf (MASTA) UMKT 2026 berjalan mulus tanpa teguran dari panitia pendamping gugus, ikuti panduan teknis wajib berikut ini.

### 1. Format Penamaan Akun Zoom Meeting
Seluruh peserta wajib menggunakan format nama baku sebelum masuk ke ruang rapat Zoom:
\`\`\`text
[Nomor Gugus]_[Nama Lengkap]
Contoh: Gugus 04_Muhammad Rizky Pratama
\`\`\`
*Catatan: Akun yang tidak menggunakan format resmi akan dipindahkan ke Waiting Room oleh host panitia.*

### 2. Ketentuan Pakaian (Dresscode) Resmi
- **Pria:** Kemeja putih polos lengan panjang berkerah, celana kain warna hitam formal (bukan jeans/chino ketat), peci hitam (sesuai arahan gugus), dan sepatu formal.
- **Wanita:** Kemeja/tunik putih polos panjang tidak menerawang, rok panjang kain warna hitam formal (bukan plisket tipis), jilbab warna hitam/putih rapi, dan sepatu formal.

### 3. Ketentuan Kamera (On-Cam) & Virtual Background
- Kamera wajib menyala (On-Cam) selama seluruh sesi materi berlangsung dengan pencahayaan yang jelas menampakkan wajah.
- Gunakan Virtual Background resmi MASTA 2026 yang dapat diunduh di portal resmi \`https://masta-maba.odoo.com/\`.
- Pastikan mikrofon dalam keadaan **Mute** kecuali dipersilakan bertanya oleh moderator.

### 4. Layanan Bantuan Darurat Saat Sesi Berlangsung
Jika mengalami mati listrik atau kendala teknis mendadak, segera hubungi pendamping gugus kalian atau kirim pesan ke WhatsApp Biro Kemahasiswaan di \`0822-5087-8843\`.
`,
    keyTakeaways: [
      "Format nama Zoom wajib: [Nomor Gugus]_[Nama Lengkap].",
      "Pakaian resmi: Kemeja putih lengan panjang dan bawahan kain hitam formal.",
      "Kamera wajib On-Cam dan mic wajib Mute selama pemaparan materi."
    ]
  },
  {
    slug: "eksplorasi-fasilitas-kampus-umkt-samarinda",
    title: "Eksplorasi Fasilitas Kampus UMKT: Perpustakaan Digital, Lab Komputer, & Spot Belajar",
    excerpt: "Kenali fasilitas penunjang akademik di Kampus UMKT Samarinda, mulai dari laboratorium riset komputasi hingga spot WiFi gratis berkecepatan tinggi.",
    category: "Fasilitas Kampus",
    readTime: "5 menit baca",
    author: "Tim Humas & Protokoler UMKT",
    authorRole: "Humas Universitas",
    date: "13 Agustus 2026",
    tags: ["Fasilitas", "Perpustakaan", "Laboratorium Komputer", "Kampus Juanda"],
    content: `
Universitas Muhammadiyah Kalimantan Timur terus berinvestasi menghadirkan fasilitas akademik dan non-akademik berstandar modern untuk menunjang kenyamanan belajar mahasiswa.

### 1. Laboratorium Komputer & Riset TI
Fakultas Sains & Teknologi UMKT dilengkapi dengan laboratorium modern berpendingin udara dan perangkat komputasi tinggi untuk:
- Laboratorium Pemrograman & Algoritma
- Laboratorium Jaringan Komputer & Cyber Security
- Laboratorium Komputasi Cerdas & Data Science

### 2. Perpustakaan Universitas & Ruang Diskusi
Perpustakaan UMKT menyediakan ribuan koleksi buku fisik, jurnal ilmiah internasional terindeks Scopus/SINTA, serta ruang belajar ber-AC yang tenang dan dilengkapi stopkontak di setiap meja.
- Mahasiswa dapat mengakses e-book dan jurnal daring menggunakan akun SSO email mahasiswa.

### 3. Akses Internet & Spot Belajar Terbuka
- Seluruh area kampus terhubung dengan jaringan **UMKT Edu-WiFi** berkecepatan tinggi.
- Gazebo terbuka di area taman kampus menjadi spot favorit mahasiswa untuk berdiskusi tugas kelompok di sore hari.

### 4. Masjid Kampus & Pusat Kegiatan Islam
Masjid megah di lingkungan kampus menjadi pusat kegiatan keagamaan, kajian Al-Islam Kemuhammadiyahan, dan shalat berjamaah civitas akademika UMKT.
`,
    keyTakeaways: [
      "Tersedia lab pemrograman, jaringan, dan data science untuk mahasiswa TI.",
      "Perpustakaan menyediakan akses e-journal dan ruang diskusi ber-AC.",
      "Akses Edu-WiFi gratis tersedia di seluruh penjuru gedung dan taman kampus."
    ]
  }
];

// ==========================================
// DATA PROGRAM STUDI TEKNOLOGI INFORMASI UMKT 2026
// ==========================================
export const PRODI_TI_DATA = {
  title: "Program Studi Teknologi Informasi UMKT",
  tagline: "HIDUP TEKNIK! NO SKILL NO TRUST!",
  degree: "Sarjana Komputer (S.Kom)",
  accreditation: "Baik Sekali (2025 - 2030)",
  vision2037: "Menjadi program studi yang unggul dalam teknologi informasi dan algoritma komputasi untuk penyelesaian permasalahan sosial dan lingkungan dengan berlandaskan nilai-nilai keislaman.",
  pillars: [
    {
      title: "Konsentrasi Keilmuan",
      desc: "Fokus pada Jaringan dan Rekayasa Sistem (JRS) serta Komputasi Cerdas (KC)."
    },
    {
      title: "Solusi Masalah Nyata",
      desc: "Setiap perkuliahan diarahkan untuk memberikan solusi praktis bagi isu sosial dan lingkungan."
    },
    {
      title: "Landasan Keislaman",
      desc: "Membentuk karakter teknokrat yang berintegritas dan berakhlaqul karimah."
    }
  ],
  stats: {
    established: 2017,
    initialStudents: 21,
    newStudents2025: 336,
    totalActiveStudents: 1286,
    graduationRateCurrent: 56,
    targetGraduationRate: 100,
    targetStudyYears: "3,5 - 4 Tahun"
  },
  lecturers: [
    { name: "Abdul Rahim", expertise: "Computer Science", status: "Aktif" },
    { name: "Arbansyah", expertise: "Internet of Things", status: "Aktif" },
    { name: "Naufal Azmi Verdikha", expertise: "Machine Learning, Natural Language Processing", status: "Aktif" },
    { name: "Taghfirul Azhima Yoga Siswa", expertise: "Data Science, Machine Learning", status: "Tugas Belajar (S3)" },
    { name: "Asslia Johar Latifah", expertise: "Machine Learning, Image Processing", status: "Tugas Belajar (S3)" },
    { name: "Faldi", expertise: "Networking", status: "Tugas Belajar (S3)" },
    { name: "Rofilde Hasudungan", expertise: "Machine Learning, DNA Computing", status: "Tugas Belajar (S3)" },
    { name: "Sayekti Harits Suryawan", expertise: "Simulation & Modelling, Sustainable Development", status: "Tugas Belajar (S3)" },
    { name: "Rudiman", expertise: "Geographic Information System, Machine Learning", status: "Tugas Belajar (S3)" },
    { name: "Wawan Joko Pranoto", expertise: "Data Science", status: "Tugas Belajar (S3)" },
    { name: "Abd Hallim", expertise: "Networking, Kriptografi", status: "Tugas Belajar (S3)" },
  ] as Lecturer[],
  courses: [
    // Semester 1
    { semester: 1, code: "CSE1013", name: "Aljabar Linear", sks: 3, category: "Wajib Prodi" },
    { semester: 1, code: "CSE1023", name: "Matematika Diskrit", sks: 3, category: "Wajib Prodi" },
    { semester: 1, code: "CSE1033", name: "Statistika", sks: 3, category: "Wajib Prodi" },
    { semester: 1, code: "CSE1043", name: "Dasar Pemrograman", sks: 3, category: "Wajib Prodi" },
    { semester: 1, code: "CSE1054", name: "Praktikum Dasar Pemrograman", sks: 1, category: "Praktikum" },
    { semester: 1, code: "CSE1063", name: "Sistem Digital dan Arsitektur Komputer", sks: 3, category: "Wajib Prodi" },
    { semester: 1, code: "UNI...", name: "Kemanusiaan dan Keimanan / Islamologi 1", sks: 2, category: "Universitas (UNI)" },
    { semester: 1, code: "UNI...", name: "Aplikasi Komputer & Pengantar Teknologi Informasi", sks: 2, category: "Universitas (UNI)" },
    
    // Semester 2
    { semester: 2, code: "CSE1073", name: "Algoritma dan Struktur Data", sks: 3, category: "Wajib Prodi" },
    { semester: 2, code: "CSE1083", name: "Praktikum Algoritma dan Struktur Data", sks: 1, category: "Praktikum" },
    { semester: 2, code: "CSE1093", name: "Basis Data", sks: 3, category: "Wajib Prodi" },
    { semester: 2, code: "CSE1103", name: "Praktikum Basis Data", sks: 1, category: "Praktikum" },
    { semester: 2, code: "CSE1113", name: "Jaringan Komputer", sks: 3, category: "Wajib Prodi" },
    { semester: 2, code: "CSE1123", name: "Praktikum Jaringan Komputer", sks: 1, category: "Praktikum" },
    { semester: 2, code: "CSE1133", name: "Technopreneurship", sks: 2, category: "Wajib Prodi" },
    { semester: 2, code: "UNI1113", name: "Ibadah, Akhlak dan Muamalah / Islamologi 2", sks: 2, category: "Universitas (UNI)" },
    { semester: 2, code: "UNI1053", name: "Bahasa Indonesia", sks: 2, category: "Universitas (UNI)" },
    { semester: 2, code: "UNI1043", name: "Pancasila", sks: 2, category: "Universitas (UNI)" },

    // Semester 3
    { semester: 3, code: "CSE2143", name: "Kalkulus", sks: 3, category: "Wajib Prodi" },
    { semester: 3, code: "CSE2153", name: "Pemrograman Web", sks: 3, category: "Wajib Prodi" },
    { semester: 3, code: "CSE2163", name: "Praktikum Pemrograman Web", sks: 1, category: "Praktikum" },
    { semester: 3, code: "CSE2173", name: "Pemrograman Berorientasi Objek", sks: 3, category: "Wajib Prodi" },
    { semester: 3, code: "CSE2183", name: "Praktikum Pemrograman Berorientasi Objek", sks: 1, category: "Praktikum" },
    { semester: 3, code: "CSE2193", name: "Kompleksitas Algoritma", sks: 3, category: "Wajib Prodi" },
    { semester: 3, code: "CSE2203", name: "Kecerdasan Buatan", sks: 3, category: "Wajib Prodi" },
    { semester: 3, code: "UNI2023", name: "Kemuhammadiyahan", sks: 2, category: "Universitas (UNI)" },
    { semester: 3, code: "UNI2033", name: "Kewarganegaraan", sks: 2, category: "Universitas (UNI)" },

    // Semester 4
    { semester: 4, code: "CSE2213", name: "Praktikum Pemrograman Web Lanjut", sks: 1, category: "Praktikum" },
    { semester: 4, code: "CSE2223", name: "Rekayasa Perangkat Lunak", sks: 3, category: "Wajib Prodi" },
    { semester: 4, code: "CSE2233", name: "Pemrograman Web Lanjut", sks: 3, category: "Wajib Prodi" },
    { semester: 4, code: "CSE2243", name: "Machine Learning dan Big Data", sks: 3, category: "Wajib Prodi" },
    { semester: 4, code: "CSE2253", name: "Pemrograman Perangkat Bergerak (Mobile Programming)", sks: 3, category: "Wajib Prodi" },
    { semester: 4, code: "CSE2263", name: "Praktikum Pemrograman Perangkat Bergerak", sks: 1, category: "Praktikum" },
    { semester: 4, code: "CSE2273", name: "Keamanan Komputer dan Jaringan", sks: 3, category: "Wajib Prodi" },
    { semester: 4, code: "CSE2283", name: "Praktikum Keamanan Komputer dan Jaringan", sks: 1, category: "Praktikum" },
    { semester: 4, code: "FST...", name: "Etika dan Hukum Profesi (K3)", sks: 2, category: "Fakultas (FST)" },
  ] as Course[],
  minimumGrades: [
    { category: "MK Wajib Prodi", min: "C" },
    { category: "MK Dasar Umum (MKDU)", min: "B" },
    { category: "MK Konsentrasi (JRS / KC)", min: "C" },
    { category: "MK Metodologi Penelitian & Publikasi", min: "BC" },
    { category: "Basic Science (Fisika, Kalkulus, dll)", min: "BC" },
    { category: "Praktikum atau Tugas Proyek", min: "BC" },
    { category: "Capstone Design / Proyek Puncak", min: "B" },
    { category: "Kerja Praktik / Magang", min: "B" },
    { category: "Skripsi", min: "AB" },
  ],
  academicCalendar2026: [
    { dateRange: "27 Juli - 27 Agustus 2026", title: "Masa Pengambilan MK / KRS", desc: "Konsultasi Dosen PA dan pemilihan paket mata kuliah di SIKAD.", status: "active" },
    { dateRange: "31 Agustus - 7 Oktober 2026", title: "Masa Perkuliahan Periode I", desc: "Pertemuan perkuliahan tatap muka & praktikum sesi pertama.", status: "upcoming" },
    { dateRange: "19 - 24 Oktober 2026", title: "Ujian Tengah Semester (UTS)", desc: "Evaluasi capaian pembelajaran paruh semester.", status: "upcoming" },
    { dateRange: "26 Oktober - 19 Desember 2026", title: "Masa Perkuliahan Periode II", desc: "Lanjutan materi kuliah, presentasi tugas besar & projek.", status: "upcoming" },
    { dateRange: "21 Desember 2026 - 9 Januari 2027", title: "Ujian Akhir Semester (UAS)", desc: "Ujian akhir penentu nilai kelulusan mata kuliah.", status: "upcoming" },
    { dateRange: "16 Januari 2027", title: "Batas Entri Nilai UAS", desc: "Hari penetapan nilai resmi di transkrip akademik SIKAD.", status: "upcoming" },
  ] as AcademicMilestone[],
  himatifDepartments: [
    { name: "PSDM", desc: "Fokus pada penguatan kualitas anggota, soft skill, dan kepemimpinan." },
    { name: "Kominfo / Media Kreatif", desc: "Wadah bagi mahasiswa yang menyukai publikasi, branding, dan desain digital." },
    { name: "Sosma", desc: "Bergerak di bidang sosial masyarakat dan pengabdian lingkungan." },
    { name: "Kerohanian", desc: "Memastikan nilai-nilai keislaman dan akhlaqul karimah tetap terjaga dalam setiap aktivitas." },
  ],
  salaryBenchmarks: [
    { role: "Software Engineer (Traveloka)", range: "Rp 205.376.683 / tahun" },
    { role: "Software Engineer (Bukalapak)", range: "Rp 192.826.154 / tahun" },
    { role: "Software Engineer (Tokopedia)", range: "Rp 190.583.333 / tahun" },
    { role: "Rata-rata Gaji IT Tangerang", range: "Rp 13,7 Juta / bulan" },
    { role: "Rata-rata Gaji IT Jakarta", range: "Rp 10,8 Juta / bulan" },
    { role: "Rata-rata Gaji IT Bandung", range: "Rp 8,3 Juta / bulan" },
  ]
};

export const SIKAD_GUIDES: SikadGuideSection[] = [
  {
    id: "sikad-login",
    title: "1. Cara Login Portal Mahasiswa SIKAD",
    badge: "Langkah Pertama",
    summary: "SIKAD (Sistem Informasi Akademik) adalah pusat data aktivitas perkuliahanmu dari semester awal hingga wisuda.",
    steps: [
      "Buka browser dan akses portal resmi: https://mahasiswa.umkt.ac.id/",
      "Masukkan NIM (Nomor Induk Mahasiswa) resmi yang kamu terima saat registrasi ulang.",
      "Ketik password default (biasanya tanggal lahir atau password sementara dari Biro Akademik BAAK).",
      "Setelah berhasil login pertama kali, segera perbarui password di menu Profil untuk keamanan akun."
    ],
    tips: "Jangan pernah membagikan password SIKAD kepada siapa pun karena memuat data KRS, riwayat pembayaran, dan nilai akademikmu.",
    portalUrl: "https://mahasiswa.umkt.ac.id/",
    iconName: "KeyRound"
  },
  {
    id: "sikad-krs",
    title: "2. Pengisian & Validasi KRS Online",
    badge: "Kewajiban Akademik",
    summary: "Kartu Rencana Studi (KRS) menentukan mata kuliah dan kelas yang kamu ambil di setiap semester.",
    steps: [
      "Untuk MABA Semester 1, biasanya mata kuliah telah dipaketkan secara otomatis oleh Program Studi.",
      "Buka menu 'KRS' -> 'Pengisian KRS' pada SIKAD.",
      "Periksa daftar mata kuliah, nama dosen, dan beban SKS (biasanya 18-21 SKS di semester awal).",
      "Klik tombol 'Ajukan Bimbingan / Simpan KRS' agar Dosen PA (Pembimbing Akademik) dapat menyetujui dan memvalidasi KRS-mu.",
      "Unduh dan cetak lembar KRS jika diminta oleh dosen pengampu saat perkuliahan dimulai."
    ],
    tips: "Segera hubungi Dosen PA (Pembimbing Akademik) jika status KRS masih 'Pending' mendekati hari pertama kuliah.",
    portalUrl: "https://mahasiswa.umkt.ac.id/",
    iconName: "FileSpreadsheet"
  },
  {
    id: "sikad-jadwal",
    title: "3. Cek Jadwal Kuliah & Ruang Kelas",
    badge: "Perkuliahan",
    summary: "Ketahui jam kuliah, gedung perkuliahan (Kampus 1/2 Juanda), dan nama dosen sebelum kelas dimulai.",
    steps: [
      "Pilih menu 'Perkuliahan' -> 'Jadwal Kuliah Semester Berjalan'.",
      "Perhatikan kode ruangan (misal: Ruang Lab Komputer, Gedung G, Gedung Utama UMKT).",
      "Pastikan tidak ada jam kuliah yang bentrok.",
      "Catat nama Dosen Pengampu untuk memudahkan komunikasi tugas atau presensi kelas."
    ],
    tips: "Unduh file jadwal dan simpan di layar utama ponselmu agar tidak salah ruang kelas di hari pertama.",
    portalUrl: "https://mahasiswa.umkt.ac.id/",
    iconName: "CalendarClock"
  },
  {
    id: "sikad-presensi",
    title: "4. Presensi Kehadiran & Batas Absensi",
    badge: "Syarat Ujian",
    summary: "Presensi kehadiran menentukan apakah kamu berhak mengikuti Ujian Tengah Semester (UTS) dan Ujian Akhir Semester (UAS).",
    steps: [
      "Periksa persentase kehadiranmu pada menu 'Presensi Kuliah'.",
      "Standar minimal kehadiran mahasiswa di UMKT adalah 75% dari total tatap muka (minimal 12 dari 16 pertemuan).",
      "Jika berhalangan hadir karena sakit, segera unggah surat dokter ke dosen pengampu dan prodi dalam waktu 2x24 jam."
    ],
    tips: "Jangan sampai alfa lebih dari 3-4 kali dalam satu semester pada mata kuliah yang sama agar tidak terkena diskualifikasi ujian.",
    portalUrl: "https://mahasiswa.umkt.ac.id/",
    iconName: "UserCheck"
  },
  {
    id: "sikad-keuangan",
    title: "5. Cek Tagihan SPP & Pembayaran (Virtual Account)",
    badge: "Keuangan Mahasiswa",
    summary: "Informasi tagihan semester, riwayat pembayaran, dan nomor Virtual Account (VA) bank mitra UMKT.",
    steps: [
      "Buka menu 'Keuangan' / 'Tagihan Mahasiswa'.",
      "Salin nomor Virtual Account (BRIVA BRI / Bank Jateng / Bank Syariah mitra UMKT).",
      "Lakukan pembayaran melalui ATM, Mobile Banking, atau Teller Bank terdekat.",
      "Status pembayaran di SIKAD akan terverifikasi otomatis (Real-time) dalam 5-15 menit."
    ],
    tips: "Simpan selalu struk atau tangkapan layar bukti transfer sampai masa perkuliahan semester berakhir.",
    portalUrl: "https://mahasiswa.umkt.ac.id/",
    iconName: "CreditCard"
  },
  {
    id: "sikad-khs",
    title: "6. Kartu Hasil Studi (KHS) & Evaluasi IPK",
    badge: "Hasil Belajar",
    summary: "Lihat hasil nilai akhir (A, B, C, D, E), Indeks Prestasi Semester (IPS), dan Indeks Prestasi Kumulatif (IPK).",
    steps: [
      "Setelah periode UAS selesai dan masa input nilai dosen berakhir, buka menu 'KHS'.",
      "Pilih semester yang ingin dicek.",
      "Lihat rincian nilai tugas, kuis, UTS, dan UAS beserta perolehan IPS.",
      "Jika terdapat nilai yang belum keluar, kamu dapat mengonfirmasi kepada dosen pengampu selama masa sanggah nilai."
    ],
    tips: "Pertahankan IPK di atas 3.00 untuk mendapatkan kesempatan mengambil beban 24 SKS di semester berikutnya dan mendaftar beasiswa prestasi!",
    portalUrl: "https://mahasiswa.umkt.ac.id/",
    iconName: "GraduationCap"
  }
];

export const MASTA_STAGES: MastaStage[] = [
  {
    id: 1,
    title: "1. Membaca Panduan Resmi",
    subtitle: "Pahami Aturan & Petunjuk Pelaksanaan",
    description: "Langkah pertama yang wajib dilakukan setiap MABA adalah membaca dan memahami seluruh buku panduan, tata tertib, serta pedoman teknis MASTA UMKT 2026.",
    iconName: "BookOpen",
    status: "active",
    dates: "Tahap Awal",
    steps: [
      "Mengunduh buku pedoman resmi MASTA 2026 di portal resmi",
      "Memahami tata tertib, pakaian, dan jadwal tiap sesi",
      "Mencatat kontak darurat dan grup panitia/pendamping gugus"
    ],
    tips: "Baca bagian tata tertib pakaian dan perlengkapan secara teliti agar tidak keliru saat sesi verifikasi!"
  },
  {
    id: 2,
    title: "2. Verifikasi Identitas",
    subtitle: "Validasi Data Mahasiswa Baru",
    description: "Proses verifikasi berkas dan identitas calon peserta MASTA untuk memastikan keabsahan data kemahasiswaan di sistem pangkalan data kampus UMKT.",
    iconName: "ShieldCheck",
    status: "upcoming",
    dates: "Pra-Kegiatan",
    steps: [
      "Memastikan NIM / Nomor Registrasi sudah aktif",
      "Mengunggah bukti registrasi dan foto kartu identitas",
      "Mendapatkan ID Gugus atau Kelompok pendampingan"
    ],
    tips: "Siapkan file scan KTP/Kartu Pelajar dan bukti pembayaran registrasi dalam format JPG/PDF yang jelas."
  },
  {
    id: 3,
    title: "3. Kegiatan Daring (Zoom Meeting)",
    subtitle: "Materi Pengenalan & Sidang Terbuka",
    description: "Pelaksanaan materi orientasi kampus, kuliah umum kebangsaan, pengenalan sistem akademik (SIAKAD), serta nilai-nilai Al-Islam dan Kemuhammadiyahan secara daring.",
    iconName: "Video",
    status: "upcoming",
    dates: "Sesi Utama Daring",
    steps: [
      "Bergabung ke ruang Zoom 15 menit sebelum acara dimulai",
      "Menggunakan format nama akun: [Nomor Gugus]_[Nama Lengkap]",
      "Wajib menyalakan kamera (On-Cam) dan mengenakan pakaian resmi yang ditentukan",
      "Mengisi presensi kehadiran pada link yang dibagikan panitia"
    ],
    tips: "Pastikan koneksi internet stabil dan cari tempat yang tenang serta memiliki pencahayaan baik."
  },
  {
    id: 4,
    title: "4. UKM Expo",
    subtitle: "Eksplorasi Minat, Bakat, & Organisasi",
    description: "Ajang pameran dan demonstrasi seluruh Unit Kegiatan Mahasiswa (UKM), Lembaga Eksekutif/Legislatif Mahasiswa, dan Komunitas di UMKT.",
    iconName: "Sparkles",
    status: "upcoming",
    dates: "Sesi Expo & Minat Bakat",
    steps: [
      "Menyaksikan parade dan presentasi karya tiap UKM",
      "Mengikuti sesi tanya jawab langsung dengan pengurus organisasi",
      "Mendaftarkan diri pada UKM yang sesuai dengan minat dan passion-mu"
    ],
    tips: "Manfaatkan sesi ini untuk memilih minimal 1 UKM demi mengasah soft skill, relasi, dan portofolio prestasimu!"
  },
  {
    id: 5,
    title: "5. Puncak dan Evaluasi",
    subtitle: "Inagurasi, Refleksi, & Sertifikasi",
    description: "Acara puncak penutupan MASTA MABA UMKT 2026, inaugurasi resmi sebagai Mahasiswa Baru, pengisian kuesioner evaluasi, dan penerbitan sertifikat kelulusan MASTA.",
    iconName: "Award",
    status: "upcoming",
    dates: "Puncak Acara",
    steps: [
      "Mengikuti prosesi inaugurasi dan pelantikan MABA",
      "Mengisi formulir evaluasi kegiatan kepanitiaan",
      "Mendapatkan sertifikat resmi MASTA (syarat akademik/kemahasiswaan ke depan)"
    ],
    tips: "Sertifikat MASTA sangat penting untuk kelengkapan administrasi SKPI (Surat Keterangan Pendamping Ijazah) saat wisuda nanti."
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: "chk-1",
    category: "Dokumen & Identitas",
    title: "Nomor Registrasi & Kartu Peserta MASTA",
    description: "Cetak atau simpan file PDF kartu bukti pendaftaran MABA UMKT 2026.",
    required: true,
  },
  {
    id: "chk-2",
    category: "Dokumen & Identitas",
    title: "Scan KTP / Kartu Identitas & Pas Foto Resmi",
    description: "Format pas foto dengan latar belakang resmi untuk verifikasi data SIAKAD.",
    required: true,
  },
  {
    id: "chk-3",
    category: "Perangkat & Jaringan",
    title: "Laptop / Smartphone Siap Pakai",
    description: "Pastikan baterai terisi penuh, kamera & mikrofon berfungsi dengan jernih.",
    required: true,
  },
  {
    id: "chk-4",
    category: "Perangkat & Jaringan",
    title: "Aplikasi Zoom Meeting Terbaru",
    description: "Update aplikasi Zoom ke versi paling baru untuk kestabilan fitur breakout room dan virtual background.",
    required: true,
  },
  {
    id: "chk-5",
    category: "Perangkat & Jaringan",
    title: "Koneksi Internet / Kuota Cadangan Minimal 5GB",
    description: "Sediakan tethering cadangan untuk antisipasi jika WiFi mengalami kendala saat sesi langsung.",
    required: true,
  },
  {
    id: "chk-6",
    category: "Pakaian & Atribut",
    title: "Kemeja Putih Polos Lengan Panjang Berkerah",
    description: "Pakaian wajib sesi pembukaan dan pelaksanaan resmi MASTA.",
    required: true,
  },
  {
    id: "chk-7",
    category: "Pakaian & Atribut",
    title: "Bawahan Celana / Rok Kain Hitam Formal",
    description: "Bukan berbahan jeans atau ketat, rapi dan sopan sesuai tata tertib islami.",
    required: true,
  },
  {
    id: "chk-8",
    category: "Pakaian & Atribut",
    title: "Jilbab / Dasi Sesuai Ketentuan Gugus",
    description: "Jilbab putih/hitam untuk mahasiswi muslimah dan dasi formal untuk mahasiswa.",
    required: false,
  },
  {
    id: "chk-9",
    category: "Kesehatan & Mental",
    title: "Air Minum (Tumbler) & Makanan Ringan",
    description: "Tetap terhidrasi dan siapkan cemilan sehat saat jeda istirahat materi.",
    required: true,
  },
  {
    id: "chk-10",
    category: "Kesehatan & Mental",
    title: "Tidur Cukup Minimal 7 Jam Malam Sebelumnya",
    description: "Fisik yang segar membuat daya fokus dan penyerapan materi jauh lebih maksimal.",
    required: true,
  },
  {
    id: "chk-11",
    category: "Kesehatan & Mental",
    title: "Mindset Positif & Semangat Kolaboratif",
    description: "Buka diri untuk berkenalan dengan teman baru lintas jurusan dan fakultas.",
    required: true,
  }
];

export const MASTA_FAQS: FAQItem[] = [
  {
    question: "Apa itu MASTA MABA UMKT?",
    answer: "MASTA (Masa Ta’aruf) MABA UMKT adalah kegiatan orientasi resmi bagi seluruh mahasiswa baru Universitas Muhammadiyah Kalimantan Timur untuk mengenal lingkungan kampus, sistem akademik, nilai-nilai Kemuhammadiyahan, dan organisasi kemahasiswaan.",
    category: "Umum"
  },
  {
    question: "Bagaimana cara menghubungi Admin Resmi UMKT jika ada kendala pendaftaran atau MASTA?",
    answer: "Untuk kendala PMB & NIM: hubungi WhatsApp Admin PMB UMKT di +62 812-3001-7008. Untuk kendala MASTA, beasiswa, dan kemahasiswaan: hubungi Biro Kemahasiswaan dan Alumni UMKT di Gedung C Lantai 1 atau WhatsApp di 0822-5087-8843 (Senin-Kamis 08.00-16.00 WITA, Jumat 08.00-11.30 WITA).",
    category: "Kontak & Layanan"
  },
  {
    question: "Bagaimana cara mengakses portal mahasiswa SIKAD UMKT?",
    answer: "Portal SIKAD UMKT dapat diakses melalui link resmi https://mahasiswa.umkt.ac.id/ menggunakan NIM sebagai username dan password default yang telah dibagikan saat registrasi ulang.",
    category: "SIKAD"
  },
  {
    question: "Apa saja peminatan / konsentrasi di Program Studi TI UMKT?",
    answer: "Prodi TI UMKT memiliki 2 konsentrasi utama: 1) Jaringan dan Rekayasa Sistem (JRS) dan 2) Komputasi Cerdas (KC) / Algoritma Komputasi.",
    category: "Prodi TI"
  },
  {
    question: "Berapa standar nilai minimum kelulusan mata kuliah di TI UMKT?",
    answer: "MK Wajib Prodi minimal C, MKDU minimal B, Basic Science & Praktikum minimal BC, Capstone Design & Magang minimal B, dan Skripsi minimal AB.",
    category: "Prodi TI"
  },
  {
    question: "Berapa kali mahasiswa wajib bimbingan dengan Dosen PA per semester?",
    answer: "Minimal 4 kali bimbingan per semester: saat pengisian KRS awal, sebelum UTS, sebelum UAS, dan saat evaluasi hasil KHS semester.",
    category: "Akademik"
  },
  {
    question: "Apakah MASTA wajib diikuti oleh seluruh Mahasiswa Baru?",
    answer: "Ya, MASTA bersifat WAJIB bagi seluruh mahasiswa baru angkatan 2026 serta mahasiswa angkatan sebelumnya yang belum lulus atau belum mengikuti MASTA. Keikutsertaan ini menjadi syarat kelengkapan administrasi akademik dan SKPI.",
    category: "Kewajiban"
  },
  {
    question: "Di mana saya bisa mengakses informasi resmi terbaru UMKT?",
    answer: "Kamu dapat mengunjungi website resmi universitas di https://www.umkt.ac.id/, portal mahasiswa di https://mahasiswa.umkt.ac.id/, dan portal resmi MASTA di https://masta-maba.odoo.com/.",
    category: "Informasi"
  }
];
