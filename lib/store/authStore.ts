"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface  BankDetails {
    recipientCode: string,
    bankCode: string,
    bankName: string,
    accountNumber: string,
    accountName: string,
}

export interface Agent {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  referralCode: string;
  status: string;
  commissionPercentage: number;
  walletBalance: number;
  totalCommissionEarned: number;
  totalTransactions: number;
  bankDetails: BankDetails
}

interface AuthStore {
  agent: Agent | null;

  setAgent: (agent: Agent) => void;
  login: (agent: Agent) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      agent: null,

      setAgent: (agent: Agent) =>
        set({
          agent,
        }),

      login: (agent: Agent) =>
        set({
          agent
        }),

      logout: () =>
        set({
          agent: null,
        }),
    }),
    {
      name: "agent-store",
    }
  )
);