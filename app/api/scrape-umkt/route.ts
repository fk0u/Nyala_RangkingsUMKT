import { NextResponse } from "next/server";
import { BlogPost } from "@/lib/masta-data";
import { 
  fetchUMKTApi, 
  UMKTBeritaItem, 
  UMKTListResponse, 
  stripHtml, 
  formatIndonesianDate 
} from "@/lib/umkt-api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let scrapedArticles: BlogPost[] = [];
    let sourceStatus = "live_api_umkt";

    // Fetch live directly from official Django REST API
    const response = await fetchUMKTApi<UMKTListResponse<UMKTBeritaItem>>("berita/", {
      page_size: 12,
    }, 60);

    if (response && response.results && response.results.length > 0) {
      scrapedArticles = response.results.map((item) => {
        let parsedTags = ["Berita Kampus", "UMKT"];
        try {
          if (Array.isArray(item.tags)) {
            parsedTags = item.tags;
          } else if (typeof item.tags === "string" && item.tags.startsWith("[")) {
            parsedTags = JSON.parse(item.tags);
          } else if (item.tags) {
            parsedTags = [String(item.tags)];
          }
        } catch {
          parsedTags = ["Berita Kampus", "UMKT"];
        }

        const plainText = stripHtml(item.isi);
        const excerpt = plainText.length > 180 ? `${plainText.slice(0, 180)}...` : plainText;
        const readTimeMinutes = Math.max(2, Math.ceil(plainText.length / 450));

        // Format SDGs key takeaways if available
        const sdgsList = item.sdgs && item.sdgs.length > 0
          ? item.sdgs.map((s) => s.sdgs)
          : ["Berita resmi terverifikasi Humas Universitas Muhammadiyah Kalimantan Timur"];

        return {
          slug: item.slug || `berita-${Date.now()}`,
          title: item.judul,
          excerpt: excerpt || "Warta dan rilis resmi dari Universitas Muhammadiyah Kalimantan Timur.",
          category: "Berita Kampus",
          readTime: `${readTimeMinutes} menit baca`,
          author: item.created || "Humas & Protokoler UMKT",
          authorRole: "Humas & Redaksi Kampus",
          date: formatIndonesianDate(item.tanggal),
          coverImage: item.thumbnail || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
          tags: parsedTags,
          content: item.isi, // Full official HTML content
          keyTakeaways: sdgsList.slice(0, 3),
          sourceUrl: item.url || `https://www.umkt.ac.id/`,
        };
      });
    }

    return NextResponse.json({
      success: true,
      status: sourceStatus,
      source: "https://web.umkt.ac.id/api/berita/",
      timestamp: new Date().toISOString(),
      count: scrapedArticles.length,
      articles: scrapedArticles,
    });
  } catch (error: any) {
    console.error("Error in scrape-umkt API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil data API resmi UMKT",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
