const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
  "Referer": "https://web.umkt.ac.id/",
  "Origin": "https://web.umkt.ac.id"
};

async function testEventAndPengumuman() {
  for (const ep of ["event", "pengumuman", "sdgs-in-umkt", "berita-lembaga"]) {
    try {
      const res = await fetch(`https://web.umkt.ac.id/api/${ep}/`, { headers });
      const data = await res.json();
      console.log(`\n=== ${ep} ===`);
      console.log("Count:", data.count);
      if (data.results && data.results.length > 0) {
        console.log("First item:", JSON.stringify(data.results[0], null, 2).slice(0, 500));
      }
    } catch (e) {
      console.error(ep, e.message);
    }
  }
}

testEventAndPengumuman();
