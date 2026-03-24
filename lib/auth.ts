import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const s = process.env.ADMIN_SESSION_SECRET ?? process.env.CONTENTFUL_PREVIEW_SECRET ?? "fallback-dev-secret";
  return s;
}

function sign(value: string): string {
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(value);
  return `${value}.${hmac.digest("hex")}`;
}

function verify(signed: string): string | null {
  const idx = signed.lastIndexOf(".");
  if (idx === -1) return null;
  const value = signed.slice(0, idx);
  if (sign(value) === signed) return value;
  return null;
}

export async function createSession(email: string) {
  const payload = JSON.stringify({ email, iat: Date.now() });
  const token = sign(Buffer.from(payload).toString("base64url"));

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSession(): Promise<{ email: string } | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const value = verify(token);
  if (!value) return null;

  try {
    const payload = JSON.parse(Buffer.from(value, "base64url").toString());
    if (payload.email) return { email: payload.email };
  } catch {
    // invalid
  }

  return null;
}

export function validateCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) return false;

  return (
    email.toLowerCase() === adminEmail.toLowerCase() &&
    password === adminPassword
  );
}
