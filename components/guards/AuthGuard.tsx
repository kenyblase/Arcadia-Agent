"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../ui/LoadingSpinner";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("arcadia-token");

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <LoadingSpinner/>
    );
  }

  return <>{children}</>;
}