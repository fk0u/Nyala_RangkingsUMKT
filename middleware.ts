import { NextResponse, type NextRequest } from "next/server";

// Regex to detect Mobile and Tablet User Agents (including Chrome/Edge DevTools Device Simulation)
const MOBILE_OR_TABLET_REGEX = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet|kindle|silk|playbook/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, API routes, internal Next.js paths, and images
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/adminuse") ||
    pathname.includes(".") || // e.g. /favicon.svg, /manifest.json, /sw.js, /robots.txt
    pathname === "/opengraph-image" ||
    pathname === "/twitter-image" ||
    pathname.endsWith("/opengraph-image")
  ) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") || "";
  const isMobileOrTablet = MOBILE_OR_TABLET_REGEX.test(userAgent);

  // RULE 1: Mobile/Tablet devices are locked to /mobile/*
  if (isMobileOrTablet) {
    if (!pathname.startsWith("/mobile")) {
      const mobilePath = pathname === "/" ? "/mobile" : `/mobile${pathname}`;
      const url = request.nextUrl.clone();
      url.pathname = mobilePath;
      return NextResponse.redirect(url);
    }
  }

  // RULE 2: Desktop browsers (without DevTools mobile simulation) are blocked from /mobile/*
  if (!isMobileOrTablet && pathname.startsWith("/mobile")) {
    let desktopTarget = "/";
    if (pathname.startsWith("/mobile/jadwal")) desktopTarget = "/jadwal";
    else if (pathname.startsWith("/mobile/panduan-sikad")) desktopTarget = "/panduan-sikad";
    else if (pathname.startsWith("/mobile/panduan-ti")) desktopTarget = "/panduan-ti";
    else if (pathname.startsWith("/mobile/checklist")) desktopTarget = "/checklist";
    else if (pathname.startsWith("/mobile/health-check")) desktopTarget = "/health-check";
    else if (pathname.startsWith("/mobile/companion")) desktopTarget = "/companion";
    else if (pathname.startsWith("/mobile/hub-umkt")) {
      desktopTarget = pathname.replace("/mobile/hub-umkt", "/hub-umkt") || "/hub-umkt";
    }
    else if (pathname.startsWith("/mobile/blog")) {
      desktopTarget = pathname.replace("/mobile/blog", "/blog") || "/blog";
    }
    else if (pathname.startsWith("/mobile/tentang-masta")) desktopTarget = "/tentang-masta";
    else if (pathname.startsWith("/mobile/profile")) desktopTarget = "/";

    const url = request.nextUrl.clone();
    url.pathname = desktopTarget;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files
     */
    "/((?!api|_next/static|_next/image|favicon.svg|manifest.json|sw.js).*)",
  ],
};
