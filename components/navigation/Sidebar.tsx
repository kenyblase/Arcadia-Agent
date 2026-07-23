"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  TrendingUp,
  CreditCard,
  Users,
  BriefcaseBusiness,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/lib/store/authStore";

const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Payouts",
    href: "/dashboard/payouts",
    icon: CreditCard,
  },
  {
    title: "Referrals",
    href: "/dashboard/referrals",
    icon: Users,
  },
  {
    title: "Commissions",
    href: "/dashboard/commissions",
    icon: BriefcaseBusiness,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    localStorage.removeItem("arcadia-token");
    logout();

    toast.success("Logged out successfully");

    router.replace("/auth/login");
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex-col">

      <div className="px-8 py-8">
        <img
          src="/images/sidebar-logo.png"
          alt="Logo"
          className="w-36"
        />
      </div>

      <nav className="flex-1 px-5 space-y-2">

        {links.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-4 py-3 transition
              ${
                active
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span>{item.title}</span>
              </div>

              {active && <ChevronRight size={18} />}
            </Link>
          );
        })}

      </nav>

      <div className="p-5">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}