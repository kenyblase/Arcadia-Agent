"use client";

import { ButtonHTMLAttributes } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`flex h-14 items-center justify-center rounded-xl bg-[#FFBB06] px-10 text-lg font-semibold text-[#0D0900] transition
      ${
        disabled || loading
          ? "cursor-not-allowed opacity-50"
          : "hover:brightness-95"
      }
      ${className}`}
      {...props}
    >
      {loading ? (
        <LoadingSpinner
          size="h-6 w-6"
          spinnerSize="h-6 w-6"
          colour="#0D0900"
        />
      ) : (
        children
      )}
    </button>
  );
}