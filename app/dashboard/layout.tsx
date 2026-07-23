"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileTopbar from "@/components/navigation/MobileTopbar";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import AuthGuard from "@/components/guards/AuthGuard";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <AuthGuard>
      <Sidebar />

      <MobileTopbar />

      <main className="lg:ml-64 pt-16 lg:pt-8 pb-20 lg:pb-8 px-4 lg:px-8 min-h-screen bg-[#F8F8F8]">
        {children}
      </main>

      <MobileBottomNav />
    </AuthGuard>
  );
}