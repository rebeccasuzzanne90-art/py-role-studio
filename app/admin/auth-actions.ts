"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, validateCredentials } from "@/lib/auth";

export async function loginAction(
  _prev: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  if (!validateCredentials(email, password)) {
    return { error: "Invalid email or password" };
  }

  await createSession(email);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
