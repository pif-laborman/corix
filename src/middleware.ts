import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // docs.corix.dev -> rewrite to /docs
  if (host.startsWith("docs.")) {
    const url = request.nextUrl.clone();
    if (url.pathname === "/") {
      url.pathname = "/docs";
      return NextResponse.rewrite(url);
    }
    // docs.corix.dev/anything -> /docs/anything
    if (!url.pathname.startsWith("/docs")) {
      url.pathname = `/docs${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
