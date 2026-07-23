"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authApi } from "@/api/authApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function useLogin() {
  const router = useRouter();
  const { login: loginStore } = useAuthStore();

  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await authApi.login(email, password);
      return response.data
    },

    onMutate: () => {
      return {
        toastId: toast.loading("Logging in..."),
      };
    },

    onSuccess: (data, _, context) => {
      localStorage.setItem("arcadia-token", data.data.token);

      loginStore(data.data.agent)

      toast.success("Login successful", {
        id: context.toastId,
      });

      router.replace("/dashboard");
    },

    onError: (error: any, _, context) => {
      toast.error(
        error?.response?.data?.message || "Login failed",
        {
          id: context?.toastId,
        }
      );
    },
  });

  const login = async (
    email: string,
    password: string
  ) => {
    return mutation.mutateAsync({
      email,
      password,
    });
  };

  return {
    login,
    isLoggingIn: mutation.isPending,
  };
}