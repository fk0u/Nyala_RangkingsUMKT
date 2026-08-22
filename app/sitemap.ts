import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/masta-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nyala-umkt.vercel.app";
  const currentDate = new Date();

  // 1. Desktop Routes
  const desktopRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hub-umkt`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/panduan-ti`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/panduan-sikad`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/companion`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/jadwal`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/checklist`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/health-check`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/tentang-masta`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Mobile Native PWA Routes
  const mobileRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/mobile`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mobile/hub-umkt`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mobile/jadwal`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mobile/profile`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mobile/companion`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mobile/checklist`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/mobile/panduan-sikad`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/mobile/panduan-ti`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/mobile/health-check`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mobile/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  // 3. Dynamic Educational Articles (Desktop & Mobile)
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) => [
    {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mobile/blog/${post.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]);

  return [...desktopRoutes, ...mobileRoutes, ...blogRoutes];
}
