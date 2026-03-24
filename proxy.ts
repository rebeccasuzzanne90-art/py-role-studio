import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.CONTENTFUL_PREVIEW_SECRET ??
    "fallback-dev-secret"
  );
}

async function verify(signed: string): Promise<boolean> {
  const idx = signed.lastIndexOf(".");
  if (idx === -1) return false;
  const value = signed.slice(0, idx);
  const signature = signed.slice(idx + 1);

  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(value)
  );
  const expected = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expected === signature;
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/admin/login") return NextResponse.next();

  if (path.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await verify(token))) {
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
