"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

const links = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Dashboard",
  },
  {
    href: "/dashboard/payouts",
    icon: CreditCard,
    label: "Payouts",
  },
  {
    href: "/dashboard/referrals",
    icon: Users,
    label: "Referrals",
  },
  {
    href: "/dashboard/commissions",
    icon: BriefcaseBusiness,
    label: "Commissions",
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex justify-around items-center z-50">

      {links.map((item) => {
        const Icon = item.icon;

        const active =
          pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-xs
            ${
              active
                ? "text-yellow-500"
                : "text-gray-500"
            }`}
          >
            <Icon size={22} />

            <span>{item.label}</span>
          </Link>
        );
      })}

    </nav>
  );
}