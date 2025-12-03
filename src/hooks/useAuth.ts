"use client";

import { authClient } from "@/lib/auth-client";

type UserWithRole = {
  role?: string;
  [key: string]: unknown;
};

export function useAuth() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as UserWithRole | undefined;

  return {
    user: session?.user,
    isAuthenticated: !!session?.user,
    isPending,
    isAdmin: user?.role === "admin" || user?.role === "owner",
    isUser: user?.role === "user",
    signIn: authClient.signIn.email,
    signOut: authClient.signOut,
    signUp: authClient.signUp.email,
  };
}