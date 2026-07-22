"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../ui/LoadingSpinner";

interface GuestGuardProps {
  children: ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("arcardia-token");

    if (token) {
      router.replace("/dashboard");
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