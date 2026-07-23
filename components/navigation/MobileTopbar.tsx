"use client";

import Link from "next/link";
import { Bell, Settings, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function MobileTopbar() {
  const router = useRouter();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = () => {
    localStorage.removeItem("arcadia-token");

    logout();

    toast.success("Logged out successfully");

    router.replace("/auth/login");
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">

      <img
        src="/images/sidebar-logo.png"
        alt="Logo"
        className="w-32"
      />

      <div className="flex items-center gap-5">

        <Link href="/dashboard/notifications">
          <Bell size={22} />
        </Link>

        <Link href="/dashboard/settings">
          <Settings size={22} />
        </Link>

        <button onClick={handleLogout}>
          <LogOut
            size={22}
            className="text-red-500"
          />
        </button>

      </div>

    </header>
  );
}