"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-[#0D0900]">
          {label}
        </label>

        <input
          ref={ref}
          {...props}
          className={`rounded-xl border px-6 py-4 outline-none transition focus:ring-2 focus:ring-[#FFBB06]
          ${
            error
              ? "border-red-500"
              : "border-[#1A13011A]"
          }
          ${className}`}
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;