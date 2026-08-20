import { NextResponse, type NextRequest } from "next/server";

// Regex to detect Mobile and Tablet User Agents
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

  // Check user preference cookie (if user explicitly chooses desktop or mobile)
  const preferViewCookie = request.cookies.get("nyala_view_preference")?.value;
  const userAgent = request.headers.get("user-agent") || "";
  const isMobileOrTablet = MOBILE_OR_TABLET_REGEX.test(userAgent);

  // If user on mobile/tablet and hasn't explicitly chosen desktop
  if (isMobileOrTablet && preferViewCookie !== "desktop") {
    // If not already on a /mobile path, redirect to /mobile/$route
    if (!pathname.startsWith("/mobile")) {
      const mobilePath = pathname === "/" ? "/mobile" : `/mobile${pathname}`;
      const url = request.nextUrl.clone();
      url.pathname = mobilePath;
      return NextResponse.redirect(url);
    }
  }

  // If user on desktop and navigates to root, keep on desktop unless they explicitly visit /mobile
  if (!isMobileOrTablet && preferViewCookie === "desktop" && pathname.startsWith("/mobile")) {
    const desktopPath = pathname.replace(/^\/mobile/, "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = desktopPath;
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
