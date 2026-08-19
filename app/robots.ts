import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nyala.umkt.ac.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/adminuse", "/adminuse/*", "/api/admin/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
