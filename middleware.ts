import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.CONTENTFUL_PREVIEW_SECRET ??
    "fallback-dev-secret"
  );
}

function verify(signed: string): boolean {
  const idx = signed.lastIndexOf(".");
  if (idx === -1) return false;
  const value = signed.slice(0, idx);
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(value);
  const expected = `${value}.${hmac.digest("hex")}`;
  return expected === signed;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/admin/login") return NextResponse.next();

  if (path.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !verify(token)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
