"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/authApi";

export default function useCheckAuth(enabled = true) {
  return useQuery({
    queryKey: ["verify-auth"],
    queryFn: async () => {
      const response = await authApi.checkAuth();
      return response.data;
    },
    retry: false,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}