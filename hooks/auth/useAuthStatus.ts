"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import useCheckAuth from "./useCheckAuth";

type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated";

export default function useAuthStatus() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const [initialized, setInitialized] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Read token once
  useEffect(() => {
    const storedToken =
      localStorage.getItem("arcadia-token");

    setToken(storedToken);

    setInitialized(true);
  }, []);

  const {
    data,
    isPending,
    isSuccess,
    isError,
  } = useCheckAuth(initialized && !!token);

  // Keep Zustand in sync
  useEffect(() => {
    if (!initialized) return;

    if (!token) {
      logout();
      return;
    }

    if (isSuccess && data?.agent) {
      login(data.agent);
    }

    if (isError) {
      logout();
      localStorage.removeItem("arcadia-token");
    }
  }, [
    initialized,
    token,
    isSuccess,
    isError,
    data,
    login,
    logout,
  ]);

  let status: AuthStatus = "loading";

  if (!initialized) {
    status = "loading";
  } else if (!token) {
    status = "unauthenticated";
  } else if (isPending) {
    status = "loading";
  } else if (isSuccess) {
    status = "authenticated";
  } else if (isError) {
    status = "unauthenticated";
  }

  return {
    status,
    agent: data?.agent ?? null,
  };
}