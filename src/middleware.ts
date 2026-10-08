import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_LANGS = ["es", "en"];
const DEFAULT_LANG = "es";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* Skip: static files, Next.js internals, API routes, admin panel */
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  /* If the path already starts with a valid lang prefix, pass through
     and attach x-lang header so the root layout can read it. */
  const firstSegment = pathname.split("/")[1];
  if (VALID_LANGS.includes(firstSegment)) {
    const response = NextResponse.next();
    response.headers.set("x-lang", firstSegment);
    return response;
  }

  /* Otherwise redirect / → /es (default language) */
  const redirectUrl = new URL(`/${DEFAULT_LANG}${pathname === "/" ? "" : pathname}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next|api|admin|images|.*\\..*).*)"],
};
