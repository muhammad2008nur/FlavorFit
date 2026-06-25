import { NextRequest, NextResponse } from "next/server";

import { PAGES } from "./shared/config/page.config";

export function proxy(req: NextRequest) {
  if (!req.cookies.get("accessToken")) {
    return NextResponse.redirect(new URL(PAGES.LOGIN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
