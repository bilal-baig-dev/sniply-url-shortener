"use server";
import type { BuiltInProviderType } from "next-auth/providers";
import { auth, signIn, signOut } from "../lib/next-auth/auth";

export async function login(provider?: BuiltInProviderType, redirect: string = "/dashboard") {
  await signIn(provider, { redirectTo: redirect });
}

export async function logout() {
  await signOut();
}

export async function getSession() {
  const session = await auth();
  return session;
}
