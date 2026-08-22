/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 hours image cache
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.umkt.ac.id",
      },
      {
        protocol: "https",
        hostname: "web.umkt.ac.id",
      },
      {
        protocol: "https",
        hostname: "media.umkt.ac.id",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "file.garden",
      },
    ],
  },
  async headers() {
    return [
      {
        // Global Security Headers for all routes
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https://www.umkt.ac.id https://web.umkt.ac.id https://media.umkt.ac.id https://images.unsplash.com https://file.garden https://kou.bio",
              "media-src 'self' https://file.garden blob: data:",
              "connect-src 'self' https://web.umkt.ac.id https://*.umkt.ac.id https://zpi.sh https://*.zpi.sh https://file.garden https://kou.bio",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      {
        // Long-term Caching for Favicons, PWA Manifest, and Static Fonts
        source: "/(favicon.svg|manifest.json)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Cache Strategy for Live Portal APIs (SWR 5-10 mins)
        source: "/api/umkt-portal",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=180, stale-while-revalidate=600",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        // Cache Strategy for Scraped/Aggregated Blog APIs
        source: "/api/scrape-umkt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=300, stale-while-revalidate=1200",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        // Strict No-Cache & Privacy for Chat AI & Admin Authentication
        source: "/api/(chat|admin-auth)/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-cache, no-store, must-revalidate" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
