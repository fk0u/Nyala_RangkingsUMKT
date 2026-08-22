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

  const userAgent = request.headers.get("user-agent") || "";
  const isMobileOrTablet = MOBILE_OR_TABLET_REGEX.test(userAgent);

  // STRICT RULE: If user is on a mobile or tablet device, lock strictly to /mobile paths
  if (isMobileOrTablet) {
    if (!pathname.startsWith("/mobile")) {
      const mobilePath = pathname === "/" ? "/mobile" : `/mobile${pathname}`;
      const url = request.nextUrl.clone();
      url.pathname = mobilePath;
      return NextResponse.redirect(url);
    }
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
