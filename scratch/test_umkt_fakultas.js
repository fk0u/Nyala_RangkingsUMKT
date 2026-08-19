const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
  "Referer": "https://web.umkt.ac.id/",
  "Origin": "https://web.umkt.ac.id"
};

async function testFakultasAndInfo() {
  for (const ep of ["info-fakultas", "informasi"]) {
    try {
      const res = await fetch(`https://web.umkt.ac.id/api/${ep}/?page_size=50`, { headers });
      const data = await res.json();
      console.log(`\n=== ${ep} ===`);
      console.log("Total Count:", data.count);
      const items = data.results || data;
      console.log("Fetched items:", items.length);
      console.log("List:", items.map(i => `${i.nama_lembaga} (${i.jenis}) -> ${i.url}`).slice(0, 15));
    } catch (e) {
      console.error(ep, e.message);
    }
  }
}

testFakultasAndInfo();
