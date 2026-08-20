import { checkRateLimit, checkAdminRateLimit, sanitizeInput, timingSafeCompare } from "../lib/security.js";
import { normalizeQuery, getFromCache, saveToCache } from "../lib/cache.js";

console.log("=== 1. Testing Security Module ===");
console.log("Input Sanitization Test:", sanitizeInput("<script>alert('xss')</script> halo"));
console.log("Prototype Pollution Test:", sanitizeInput('{"__proto__": {}}'));
console.log("Timing Safe Compare True:", timingSafeCompare("NyalaUMKT2026SecureAdmin!", "NyalaUMKT2026SecureAdmin!"));
console.log("Timing Safe Compare False:", timingSafeCompare("wrongPass", "NyalaUMKT2026SecureAdmin!"));

console.log("\n=== 2. Testing Rate Limiter ===");
for (let i = 0; i < 8; i++) {
  const res = checkRateLimit("192.168.1.100");
  console.log(`Req ${i + 1}: allowed=${res.allowed}, remaining=${res.remaining}`);
}

console.log("\n=== 3. Testing Admin Rate Limiter ===");
for (let i = 0; i < 6; i++) {
  const res = checkAdminRateLimit("10.0.0.1");
  console.log(`Admin Attempt ${i + 1}: allowed=${res.allowed}, remaining=${res.remaining}`);
}

console.log("\n=== 4. Testing Cache System ===");
saveToCache("Apa itu MASTA UMKT 2026?", "MASTA adalah Masa Taaruf Mahasiswa Baru.");
const hit = getFromCache("apa itu masta umkt 2026???");
console.log("Normalized Cache Hit Result:", hit);
