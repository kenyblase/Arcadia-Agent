"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("arcadia-token");

    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <LoadingSpinner/>
  );
}