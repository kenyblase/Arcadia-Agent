import { ReactNode } from "react";
import AuthGuard from "@/components/guards/AuthGuard";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}