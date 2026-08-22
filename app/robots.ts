import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://nyala-umkt.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/adminuse",
          "/adminuse/*",
          "/api/admin-auth",
          "/api/admin-auth/*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/adminuse", "/api/admin-auth"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
