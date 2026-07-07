import { NextRequest, NextResponse } from "next/server";

import { PAGES } from "./shared/config/page.config";
import { getTokens } from "./shared/lib/server/get-tokens.server";
import { JwtVerifyServer } from "./shared/lib/server/jwt-verify.server";

export async function proxy(req: NextRequest) {
  const tokens = await getTokens(req);
  if (!tokens) {
    return NextResponse.redirect(new URL(PAGES.LOGIN, req.url));
  }
  if ("isRefreshed" in tokens) {
    const response = NextResponse.next();
    if (tokens.setCookie) {
      response.headers.set("set-cookie", tokens.setCookie);
      return response;
    }
    return NextResponse.redirect(new URL(PAGES.LOGIN, req.url));
  }
  const verifiedData = await JwtVerifyServer(tokens.accessToken);

  if (!verifiedData) {
    return NextResponse.redirect(new URL(PAGES.LOGIN, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
