import { NextRequest, NextResponse } from "next/server";
import { 
  fetchUMKTApi, 
  UMKTBeritaItem, 
  UMKTEventItem, 
  UMKTPengumumanItem, 
  UMKTFakultasItem, 
  UMKTInformasiItem, 
  UMKTLastUpdateItem, 
  UMKTListResponse 
} from "@/lib/umkt-api";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") || "berita";
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  try {
    // 1. Hub All-in-One Aggregated Mode
    if (type === "all-hub") {
      const [berita, event, pengumuman, fakultas, lastUpdate] = await Promise.all([
        fetchUMKTApi<UMKTListResponse<UMKTBeritaItem>>("berita/", { page_size: 6 }),
        fetchUMKTApi<UMKTListResponse<UMKTEventItem>>("event/", { page_size: 4 }),
        fetchUMKTApi<UMKTListResponse<UMKTPengumumanItem>>("pengumuman/", { page_size: 4 }),
        fetchUMKTApi<UMKTListResponse<UMKTFakultasItem>>("info-fakultas/", { page_size: 10 }),
        fetchUMKTApi<UMKTLastUpdateItem[]>("last-update/"),
      ]);

      return NextResponse.json({
        status: "success",
        source: "https://web.umkt.ac.id/api/",
        timestamp: new Date().toISOString(),
        data: {
          berita: berita?.results || [],
          beritaTotal: berita?.count || 0,
          event: event?.results || [],
          eventTotal: event?.count || 0,
          pengumuman: pengumuman?.results || [],
          pengumumanTotal: pengumuman?.count || 0,
          fakultas: fakultas?.results || fakultas || [],
          lastUpdate: lastUpdate || [],
        }
      });
    }

    // 2. Specific Endpoint Queries
    let endpoint = "berita/";
    if (type === "event") endpoint = "event/";
    else if (type === "pengumuman") endpoint = "pengumuman/";
    else if (type === "info-fakultas") endpoint = "info-fakultas/";
    else if (type === "informasi") endpoint = "informasi/";
    else if (type === "last-update") endpoint = "last-update/";
    else if (type === "sdgs-in-umkt") endpoint = "sdgs-in-umkt/";

    const params: Record<string, string | number> = {};
    if (page) params.page = page;
    if (search) params.search = search;

    const data = await fetchUMKTApi<any>(endpoint, params, 60);

    if (!data) {
      return NextResponse.json(
        { status: "error", message: `Failed to fetch data from UMKT API endpoint: ${endpoint}` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      status: "success",
      endpoint,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
