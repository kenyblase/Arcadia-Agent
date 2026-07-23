"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoadingSpinner from "../ui/LoadingSpinner";
import useAuthStatus from "@/hooks/auth/useAuthStatus";

export default function RootRedirect() {
  const router = useRouter();

  const { status } = useAuthStatus();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }

    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  return <LoadingSpinner />;
}