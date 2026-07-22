"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import GuestGuard from "@/components/guards/GuestGuard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import useLogin from "@/hooks/auth/useLogin";

import {
  loginSchema,
  LoginFormValues,
} from "@/lib/validations/auth";

export default function LoginPage() {
  const { login, isLoggingIn } = useLogin();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: LoginFormValues
  ) => {
    await login(data.email, data.password);
  };

  return (
    <GuestGuard>
      <div className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/login-background-photo.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-black/50" />

        <main className="relative z-10 flex h-full items-center justify-center px-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-3xl flex-col gap-10 rounded-3xl bg-white p-16 shadow-2xl"
          >
            <h1 className="text-3xl font-bold text-[#0D0900]">
              Agent Login
            </h1>

            <div className="flex flex-col gap-8">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <Button
              type="submit"
              loading={isLoggingIn}
              disabled={!isValid}
            >
              Login
            </Button>
          </form>
        </main>
      </div>
    </GuestGuard>
  );
}