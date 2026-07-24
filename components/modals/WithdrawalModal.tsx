"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  isLoading?: boolean;
}

export default function WithdrawalModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: WithdrawalModalProps) {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount <= 0) return;

    onSubmit(parsedAmount);

    setAmount("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Make Withdrawal
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the amount you want to withdraw.
            </p>

          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="space-y-2">

          <label className="font-medium">
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#FFBB06]"
          />

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3"
          >
            Cancel
          </button>

          <button
            disabled={isLoading || !amount}
            onClick={handleSubmit}
            className="rounded-xl bg-[#FFBB06] px-5 py-3 font-semibold disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Withdraw"}
          </button>

        </div>

      </div>

    </div>
  );
}