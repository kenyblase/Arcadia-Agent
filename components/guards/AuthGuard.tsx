"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import LoadingSpinner from "../ui/LoadingSpinner";
import useAuthStatus from "@/hooks/auth/useAuthStatus";

interface Props {
  children: ReactNode;
}

export default function AuthGuard({
  children,
}: Props) {
  const router = useRouter();

  const { status } = useAuthStatus();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated") {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}