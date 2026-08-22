# Design System: Nyala — Sahabat Perjalanan MABA UMKT 2026

Dokumen ini merupakan **Single Source of Truth (SSOT)** sistem desain antarmuka aplikasi **Nyala**. Dirancang dengan standar *high-agency*, *anti-slop*, dan ramah sentuhan, sistem ini memadukan kehangatan karakter maskot api dengan arsitektur UI modern berdaya guna tinggi (*modern utilitarian & soft companion*).

---

## 1. Visual Theme & Atmosphere

- **Konsep Inti:** *"Warm Fire, Soft Companion"* — Menggabungkan energi api yang hidup dengan rasa hangat, aman, dan suportif layaknya sahabat senior kampus. Visual mengedepankan impresi *"aku nemenin kamu"* alih-alih kesan formal yang menggurui.
- **Dial Parameters:**
  - **Visual Density:** `Level 4 / 10` (Daily App Balanced — ruang napas lapang, pemisahan zona visual yang tegas tanpa kesempitan).
  - **Design Variance:** `Level 7 / 10` (Offset Asymmetric — komposisi hero asimetris, kartu interaktif dengan ritme dinamis, tata letak bento gapless terkalibrasi).
  - **Motion Intensity:** `Level 6 / 10` (Fluid CSS & Spring Physics — transisi pegas berbobot, mikro-animasi konstan pada elemen aktif tanpa mengorbankan performa).
- **Atmosfer Ruang:** Cerah, bersih, hangat, dan fokus. Menghindari kesan *"corporate"* kaku maupun *"over-gamey"*.

---

## 2. Color Palette & Roles

Semua warna dikalibrasi secara ketat dengan kontras WCAG AA/AAA. **Larangan:** Tidak menggunakan warna neon menyilaukan, gradien ungu/biru generik AI, maupun hitam pekat `#000000`.

### Primary Palette (Identitas Api)
| Token Name | Hex Code | Functional Role |
| :--- | :--- | :--- |
| **Fire Orange** | `#FF5A1F` | Warna utama merek, tombol CTA primer, indikator aktif, aksen sentral |
| **Deep Ember** | `#E04500` | State `hover` / `active` pada tombol utama, teks penekanan khusus |
| **Flame Muted** | `#FFA885` | Aksen sekunder, border kartu saat *hover*, badge lembut |
| **Flame Whisper** | `#FFF7ED` | Latar belakang *pill*, kontainer chat bot, highlight lembut |

### Neutral Palette (Fondasi & Teks)
| Token Name | Hex Code | Functional Role |
| :--- | :--- | :--- |
| **Warm White** | `#FAFAF9` | Latar belakang kanvas *Light Mode* default |
| **Card White** | `#FFFFFF` | Latar permukaan kartu dan kontainer utama pada mode terang |
| **Soft Gray** | `#F1F5F9` | Latar belakang input form, sekat subtil, dan badge netral |
| **Medium Slate**| `#94A3B8` | Teks sekunder, deskripsi, timestamp, dan placeholder |
| **Deep Navy** | `#0F172A` | Teks utama, judul, dan kartu dengan penekanan solid |
| **Dark Canvas** | `#0B1120` | Latar belakang kanvas *Dark Mode* |
| **Dark Surface**| `#1E293B` | Latar permukaan kartu dan *floating navigation* pada mode gelap |

### Semantic Palette
| Token Name | Hex Code | Functional Role |
| :--- | :--- | :--- |
| **Success Emerald** | `#10B981` | Indikator checklist selesai, status presensi aman, badge aktif |
| **Warning Amber** | `#F59E0B` | Peringatan jadwal mepet, batas waktu KRS, notifikasi penting |
| **Info Blue** | `#3B82F6` | Info resmi akademik, tautan backlink portal UMKT |
| **Danger Rose** | `#EF4444` | Indikator kesalahan form, status presensi di bawah 75% |

---

## 3. Typography Rules

Tipografi mengedepankan legibilitas prima di perangkat layar ponsel maupun layar desktop lebar, dengan hirarki visual yang tegas:

- **Display & Heading Font:** `Plus Jakarta Sans`
  - *Weights:* SemiBold (`600`), Bold (`700`), ExtraBold (`800`)
  - *Tracking:* `tracking-tight` (-0.02em hingga -0.03em) untuk judul besar.
  - *Constraint:* Judul tidak boleh menggunakan gaya *italic* miring murahan atau *screaming caps* berlebihan.
- **Body & Paragraph Font:** `Plus Jakarta Sans` / `Inter`
  - *Weights:* Regular (`400`), Medium (`500`)
  - *Leading:* `leading-relaxed` (1.6 – 1.7) untuk kenyamanan baca mahasiswa baru.
  - *Line Length:* Maksimal `65ch` per paragraf agar mata tidak cepat lelah.
- **Monospace Font (Data & Metadata):** `JetBrains Mono` / `Geist Mono` / `system-mono`
  - Digunakan khusus pada: angka hitung mundur (*countdown*), kode mata kuliah (misal `TI102`), persentase progress, dan timestamp.
- **Tipografi Terlarang:**
  - ❌ `Comic Sans`, `Papyrus`, `Impact`.
  - ❌ Font serif klasik generik (`Times New Roman`, `Georgia`) pada antarmuka dashboard/aplikasi.
  - ❌ Font generik tanpa kalibrasi kontras yang menyebabkan kelelahan mata.

---

## 4. Component Stylings & Interaction States

### 4.1. Buttons & Action Elements
- **Primary Button:** Latar belakang solid `#FF5A1F`, teks putih tebal, radius sudut `16px` (`rounded-2xl`), bayangan lembut `shadow-fire`.
  - *Active State:* Transisi taktil mengecil `-1px` / `scale(0.97)` saat ditekan.
- **Secondary / Outline Button:** Border `1.5px` solid `#E2E8F0` (light) atau `#334155` (dark), teks netral, hover ke `#FFF7ED` (light) atau `#1E293B` (dark).
- **Icon Buttons:** Area sentuh minimum `44px × 44px` untuk kemudahan akses jempol (mobile thumb-zone).

### 4.2. Cards & Containers
- **Bentuk:** Sudut melengkung halus `16px` (`rounded-2xl`) hingga `24px` (`rounded-3xl`).
- **Materialitas:** Permukaan putih solid dengan border `1px` halus `border-slate-200/80` (light) atau `border-slate-800` (dark).
- **Shadow:** `box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05)`. Tidak ada efek bayangan neon yang berlebihan.

### 4.3. Mascot Flame Interaction
- **Karakter:** Wajah bulat krem-putih dengan rona pipi merah muda, mahkota lidah api 3 lapis (kuning, oranye, merah marun), dan ekspresi wajah dinamis (Senang, Semangat, Berpikir, Ramah).
- **Animasi:** Floating halus 4 detik (`translateY(-6px)`), micro-flicker pada ujung lidah api, dan partikel percikan halus saat state antusias.

### 4.4. Form Inputs & Selectors
- **Struktur:** Label deskriptif di bagian atas, kolom input dengan padding lapang (`px-4 py-3.5`), dan pesan bantuan/error di bawah.
- **Focus Ring:** Aksen ring `2px` solid `#FF5A1F` dengan offset `2px`.

### 4.5. Skeleton Loading & Empty States
- **Loaders:** Skeleton shimmer bergradien lembut yang presisi merefleksikan geometri konten aslinya. Tidak menggunakan spinner lingkaran generik.
- **Empty States:** Menggunakan ilustrasi maskot Nyala dengan pesan ramah penyemangat alih-alih teks kaku "Data Kosong".

---

## 5. Layout Principles & Duolingo Gamified UI Architecture

Nyala menerapkan strategi **Dual-Platform & Duolingo 3D Gamification UI**:

1. **Desktop Web Experience (`/`):**
   - Header navigasi transparan dengan kaca buram (*glassmorphism* `backdrop-blur-md`).
   - Grid bento responsif dengan batas lebar maksimum `max-w-7xl` terpusat.
   - Kolom asimetris untuk menyajikan panduan dan maskot secara berdampingan.
2. **True Fluid Mobile & Tablet App Experience (`/mobile/*`):**
   - Mengadopsi arsitektur **Duolingo Gamified 3D UI Kit**:
     - **Tactile 3D Buttons (`border-b-4`):** Tombol fisik dengan ketebalan border bawah 4px (`duo-btn-primary`, `duo-btn-emerald`, `duo-btn-sky`, `duo-btn-surface`) yang memberikan sensasi tekan mainan taktil (`active:border-b-2 active:translate-y-0.5`).
     - **3D Gamified Cards (`DuolingoCard`):** Kartu berbingkai tegas `border-2 border-b-4` dengan radius `rounded-3xl`.
     - **3D Segmented Tabs (`DuolingoSegmentedTabs`):** Tab selector berbasis kartu 3D dengan respons tekan fisik tebal (`border-b-4`) alih-alih pill/capsule tipis.
     - **Solid Full-Width Bottom Bar:** Navigasi bawah docked rata (*full-width solid bottom bar*) tanpa celah mengambang capsule.
     - **Multifunctional Action Launcher:** Tombol tengah 3D `GridFour` yang membuka **Floating Action Menu Dock (`DuolingoActionMenuDock`)** berisi 8 rute jalan pintas (Tanya AI, Jadwal, SIKAD, Kurikulum TI, Checklist, Health & Mood, Hub Warta, Admin Gedung C).
     - **Gamification Engine:** Sistem Flame Streak harian (`🔥 3d`), pengumpulan energi XP (`⚡ 140 XP`), dan Misi Harian MABA (*Daily Quests*).
   - Tidak ada *horizontal overflow* pada semua ukuran layar mulai dari 320px hingga tablet 1024px.

---

## 6. Psikologi Desain & Prinsip UX (Best UX Standards)

1. **Hick's Law (Reduksi Waktu Keputusan):**
   - Menggantikan scroll panjang tak berujung dengan **3D Segmented Tabs 1-Tap**, **Filter Chips**, dan **Quick Launch Cards**.
2. **Fitts's Law & Thumb-Zone Reachability (Ergonomi Ponsel/Tablet):**
   - Seluruh kontrol kritis dan tombol launcher diletakkan di **40% area bawah layar** dengan ukuran target sentuh minimum `48px × 48px`.
3. **Miller's Law (Chunking 3–5 Item):**
   - Data dipadatkan ke dalam widget mandiri terstruktur agar mudah dicerna tanpa membuat mata lelah.
4. **Law of Common Region & Visual Hierarchy:**
   - Pembagian area visual tegas dengan kartu berkontur tebal `rounded-3xl` dan border 3D.
5. **Gamification & Immediate Feedback:**
   - Efek tekan taktil `border-b-4 -> border-b-2`, reward perolehan XP, dan selebrasi konfeti saat checklist 100%.

---

## 7. Motion Philosophy & Spring Physics

- **Framer Motion Engine:**
  ```typescript
  export const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 32,
    mass: 0.8
  };
  ```
- **Staggered Orchestration:** Daftar tahapan, artikel blog, dan checklist dirender dengan efek stagger `delay: index * 0.06` untuk menghasilkan sensasi air terjun yang elegan.
- **Hardware Acceleration:** Seluruh animasi hanya memanipulasi properti GPU `transform` dan `opacity`.

---

## 8. Anti-Patterns & Strict Bans (AI Tells)

Sistem melarang keras praktik-praktik desain murahan berikut:

- ❌ **Dilarang di Mobile:** Penggunaan **Pill / Capsule floating bar** pada navigasi mobile. Wajib gunakan *Solid Full-Width Docked Bottom Bar*.
- ❌ **Dilarang:** Redundansi grafis (misal: maskot/ilustrasi yang sama berulang kali di header dan kartu konten tepat di bawahnya).
- ❌ **Dilarang:** *Cards inside cards* (pembungkus kartu di dalam kartu dengan judul ganda yang berulang).
- ❌ **Dilarang:** Emoji berlebihan sebagai pengganti ikon profesional. Gunakan paket resmi `@phosphor-icons/react`.
- ❌ **Dilarang:** Gradien ungu neon (*AI Cyberpunk slop*).
- ❌ **Dilarang:** Huruf miring (*italic*) pada judul utama.
- ❌ **Dilarang:** Tiga kartu berukuran identik horizontal (*3-equal cards row* tanpa variasi ritme visual).
- ❌ **Dilarang:** Penggunaan teks placeholder malas ("Lorem ipsum", "John Doe", "Acme Corp"). Selalu gunakan data riil mahasiswa UMKT.
- ❌ **Dilarang:** Border neon berkedip atau animasi gemerlap yang mendistraksi fokus pengguna.
- ❌ **Dilarang:** Teks putus atau tumpang tindih (*text clipping*) pada perangkat ponsel layar sempit.

---

## 9. Ringkasan Desain dalam Satu Kalimat

> **"Nyala menyajikan antarmuka modern Flutter UI Kit yang hangat, energik, dan terstruktur rapi — laksana lentera pemandu yang menuntun mahasiswa baru menjelajahi dunia perkuliahan UMKT dengan percaya diri."**

