export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const SYSTEM_PROMPT = `
Kamu adalah "Nyala", virtual companion dan asisten digital resmi untuk Mahasiswa Baru (MABA) Universitas Muhammadiyah Kalimantan Timur (UMKT) Angkatan 2026.
Tagline-mu adalah: "Nyala. Teman perjalanan MABA-mu."

BRAND & PERSONALITY:
- Kamu ramah, hangat, penuh energi positif, suportif, dan dekat (seperti sahabat atau kakak tingkat yang asik).
- Sedikit playful (sesekali pakai emoji api 🔥, senyum 😊, semangat ✨), namun tetap santun, respect, dan edukatif.
- Bahasa: Bahasa Indonesia yang santai, luwes, dan Gen-Z friendly namun tetap informatif dan jelas.
- Jangan kaku, jangan menjawab seperti bot birokrasi, tapi jadilah teman yang menguatkan dan menyemangati.

INFORMASI RESMI MASTA UMKT 2026:
- MASTA MABA = Masa Ta'aruf Mahasiswa Baru UMKT 2026.
- 3 Fokus Utama: 1) Adaptasi Kehidupan Kampus, 2) Pembentukan Karakter, 3) Pengenalan Peluang Mahasiswa.
- 4 Pilar Tujuan: Orientasi, Akademik, Relasi, dan Karakter.
- 5 Tahapan Alur Resmi:
  1. Membaca Panduan Resmi
  2. Verifikasi Identitas
  3. Kegiatan Daring (Zoom Meeting)
  4. UKM Expo
  5. Puncak dan Evaluasi
- Website Resmi UMKT: https://www.umkt.ac.id/
- Portal Resmi MASTA: https://masta-maba.odoo.com/
- Layanan Kemahasiswaan: https://www.umkt.ac.id/kemahasiswaan/

TUGAS UTAMA:
1. Menjawab pertanyaan seputar alur dan persiapan MASTA UMKT 2026.
2. Memberikan tips praktis (mengatasi rasa gugup/anxiety, tips On-Cam Zoom, manajemen waktu, mencari teman baru).
3. Memberikan motivasi dan dukungan kesehatan mental bagi MABA.
4. Mengingatkan MABA untuk menjaga kesehatan fisik (tidur cukup, minum air, sarapan).
5. Selalu sertakan dorongan positif dan jika relevan sertakan tautan ke website resmi UMKT (https://www.umkt.ac.id/).
`;

// Offline Smart Knowledge Base Responder
export function generateLocalResponse(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

  if (query.includes("halo") || query.includes("hai") || query.includes("siapa kamu") || query.includes("nyala")) {
    return "Halo Sobat MABA UMKT 2026! 🔥 Aku **Nyala**, teman perjalanan MABA-mu! Aku siap nemenin kamu melewati masa orientasi (MASTA) dari awal sampai puncak acara. Ada yang bikin kamu penasaran atau bingung tentang MASTA?";
  }

  if (query.includes("alur") || query.includes("tahap") || query.includes("jadwal") || query.includes("proses")) {
    return `Alur resmi **MASTA MABA UMKT 2026** terdiri dari 5 tahapan utama nih Sobat:
1. 📖 **Membaca Panduan**: Memahami tata tertib dan petunjuk teknis.
2. 🆔 **Verifikasi Identitas**: Validasi NIM dan berkas registrasi.
3. 💻 **Kegiatan Daring (Zoom)**: Sesi materi akademik & sidang terbuka.
4. 🎪 **UKM Expo**: Eksplorasi minat, bakat, dan organisasi mahasiswa.
5. 🏆 **Puncak dan Evaluasi**: Inaugurasi resmi, evaluasi, & penerbitan sertifikat.

Kamu bisa cek timeline lengkapnya di menu **Jadwal & Alur** di atas ya! ✨`;
  }

  if (query.includes("bawa") || query.includes("syarat") || query.includes("perlengkapan") || query.includes("siap") || query.includes("checklist")) {
    return `Beberapa perlengkapan wajib yang harus kamu siapkan untuk MASTA 2026:
- 📄 **Dokumen**: Kartu Peserta MASTA & bukti registrasi aktif.
- 💻 **Perangkat**: Laptop/Smartphone dengan aplikasi Zoom versi terbaru & kuota cadangan.
- 👔 **Pakaian**: Kemeja putih polos berkerah, bawahan hitam formal (bukan jeans), jilbab/dasi sesuai ketentuan gugus.
- 💧 **Kesehatan**: Air minum dalam botol & kondisi fisik yang fit!

Biar gak ada yang kelupaan, yuk buka menu **Checklist Persiapan** untuk mencentang barang bawaanmu! 🔥`;
  }

  if (query.includes("gugup") || query.includes("takut") || query.includes("stres") || query.includes("cemas") || query.includes("anxiety") || query.includes("teman")) {
    return `Wajar banget kalau kamu merasa sedikit nervous atau gugup, Sobat! Memulai dunia baru di kampus memang tantangan seru. 
Berikut tips dari Nyala:
1. 🫁 **Tarik napas dalam-dalam**: Tenangkan pikiran, kamu tidak sendirian—ribuan MABA lain juga merasakan hal yang sama!
2. 🤝 **Sapa teman se-gugus**: Jangan ragu untuk melempar senyum atau mengetik salam di chat Zoom/grup WhatsApp.
3. 🧘 **Cek Kondisi Mental**: Manfaatkan fitur **Health Check** di aplikasi Nyala ini untuk memantau mood dan energi harianmu.

Ingat, kamu hebat dan pantas berada di UMKT! Nyala selalu ada di sini buat nemenin kamu. 🔥💪`;
  }

  if (query.includes("zoom") || query.includes("oncam") || query.includes("kamera") || query.includes("daring")) {
    return `Saat sesi daring (Zoom Meeting) MASTA UMKT 2026:
- Pastikan format nama akun: \`[Nomor Gugus]_[Nama Lengkap]\`.
- Siapkan koneksi internet stabil (bisa pakai hotspot cadangan jika WiFi kampus/rumah drop).
- Gunakan pencahayaan yang cukup dari depan (menghadap jendela/lampu).
- Wajib On-Cam dengan pakaian rapi sesuai tata tertib! ✨`;
  }

  if (query.includes("ukm") || query.includes("organisasi") || query.includes("expo") || query.includes("kegiatan")) {
    return `Di sesi **UKM Expo**, kamu bakal berkenalan dengan beragam Unit Kegiatan Mahasiswa (UKM) di UMKT—mulai dari seni, olahraga, riset, penalaran, jurnalistik, tapak suci, hingga pecinta alam! 🎨⚽
Tips dari Nyala: Pilih organisasi yang sesuai minatmu untuk mengasah relasi dan soft skill kepemimpinan ya!`;
  }

  if (query.includes("link") || query.includes("web") || query.includes("website") || query.includes("resmi") || query.includes("odoo") || query.includes("umkt")) {
    return `Tentu! Ini portal resmi yang wajib kamu simpan:
- 🌐 **Website Utama UMKT**: [https://www.umkt.ac.id/](https://www.umkt.ac.id/)
- 🏛️ **Biro Kemahasiswaan**: [https://www.umkt.ac.id/kemahasiswaan/](https://www.umkt.ac.id/kemahasiswaan/)
- 📖 **Portal Resmi MASTA**: [https://masta-maba.odoo.com/](https://masta-maba.odoo.com/)

Ada hal lain yang mau kamu tanyakan seputar kampus UMKT? 😊`;
  }

  return `Pertanyaan yang bagus sekali, Sobat MABA! 🔥 

Terkait hal tersebut, pastikan kamu selalu merujuk pada pedoman resmi di portal [masta-maba.odoo.com](https://masta-maba.odoo.com/) dan website resmi [Universitas Muhammadiyah Kalimantan Timur](https://www.umkt.ac.id/). 

Apakah ada bagian khusus yang ingin kamu bahas lebih detail, misalnya tentang **Jadwal Kegiatan**, **Checklist Bawaan**, atau **Tips Menjaga Mood & Stamina**? Nyala siap bantu! ✨`;
}

// Handler for AI APIs
export async function queryAICompanion(messages: ChatMessage[]): Promise<string> {
  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;

  const lastUserMessage = messages.filter(m => m.role === "user").pop()?.content || "";

  // 1. Coba Gemini API jika API Key tersedia
  if (geminiKey && geminiKey.trim() !== "") {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: messages.map(m => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }]
            })),
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (e) {
      console.warn("Gemini API error, falling back:", e);
    }
  }

  // 2. Coba Groq API jika API Key tersedia
  if (groqKey && groqKey.trim() !== "") {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 800,
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) return text;
      }
    } catch (e) {
      console.warn("Groq API error, falling back:", e);
    }
  }

  // 3. Coba OpenRouter jika API Key tersedia
  if (openRouterKey && openRouterKey.trim() !== "") {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://nyala.umkt.ac.id",
          "X-Title": "Nyala Companion UMKT",
        },
        body: JSON.stringify({
          model: "google/gemini-flash-1.5-exp",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages
          ],
          temperature: 0.7,
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) return text;
      }
    } catch (e) {
      console.warn("OpenRouter error, falling back:", e);
    }
  }

  // Fallback: Smart Local Knowledge Engine
  return generateLocalResponse(lastUserMessage);
}
