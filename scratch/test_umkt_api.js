const endpoints = {
  berita: "https://web.umkt.ac.id/api/berita/",
  event: "https://web.umkt.ac.id/api/event/",
  pengumuman: "https://web.umkt.ac.id/api/pengumuman/",
  "berita-lembaga": "https://web.umkt.ac.id/api/berita-lembaga/",
  "event-lembaga": "https://web.umkt.ac.id/api/event-lembaga/",
  "pengumuman-lembaga": "https://web.umkt.ac.id/api/pengumuman-lembaga/",
  "sdgs-in-umkt": "https://web.umkt.ac.id/api/sdgs-in-umkt/",
  informasi: "https://web.umkt.ac.id/api/informasi/",
  "info-fakultas": "https://web.umkt.ac.id/api/info-fakultas/",
  "last-update": "https://web.umkt.ac.id/api/last-update/"
};

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
  "Referer": "https://web.umkt.ac.id/",
  "Origin": "https://web.umkt.ac.id"
};

async function inspectAll() {
  for (const [key, url] of Object.entries(endpoints)) {
    try {
      console.log(`\n================= ${key.toUpperCase()} =================`);
      const res = await fetch(url, { headers });
      console.log(`Status: ${res.status}`);
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        console.log(`Count: ${data.count}, Results length: ${data.results.length}`);
        if (data.results.length > 0) {
          console.log("Sample Item Keys:", Object.keys(data.results[0]));
          console.log("First item:", JSON.stringify(data.results[0], null, 2));
        }
      } else if (Array.isArray(data)) {
        console.log(`Array length: ${data.length}`);
        if (data.length > 0) {
          console.log("Sample Item Keys:", Object.keys(data[0]));
          console.log("First item:", JSON.stringify(data[0], null, 2));
        }
      } else {
        console.log("Object Keys:", Object.keys(data));
        console.log("Data preview:", JSON.stringify(data, null, 2).slice(0, 500));
      }
    } catch (e) {
      console.error(`Error on ${key}:`, e.message);
    }
  }
}

inspectAll();
