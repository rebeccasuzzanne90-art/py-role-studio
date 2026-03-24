// Supabase middleware is no longer used for auth.
// Admin auth is handled via env-var credentials + signed cookies.
// This file is kept for reference if Supabase auth is re-enabled later.

import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  return NextResponse.next({ request });
}
