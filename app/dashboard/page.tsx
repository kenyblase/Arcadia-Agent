"use client";

import {
  Building2,
  Users,
  Wallet,
  UserCheck,
  ArrowUpRight,
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
} from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/dashboard/DataTable";
import MobileListCard from "@/components/dashboard/MobileListCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";

type Transaction = {
  id: number;
  customer: string;
  property: string;
  amount: string;
  status: string;
  date: string;
};

export default function DashboardPage() {
  // Replace with React Query later
  const transactions: Transaction[] = [
    {
      id: 1,
      customer: "John Doe",
      property: "Arcadia Estate",
      amount: "₦2,500,000",
      status: "success",
      date: "12 Jul 2026",
    },
    {
      id: 2,
      customer: "Mary Johnson",
      property: "Green Villa",
      amount: "₦1,800,000",
      status: "pending",
      date: "10 Jul 2026",
    },
    {
      id: 3,
      customer: "David Williams",
      property: "Prime Gardens",
      amount: "₦3,200,000",
      status: "failed",
      date: "09 Jul 2026",
    },
    {
      id: 4,
      customer: "Sarah Smith",
      property: "Arcadia Estate",
      amount: "₦950,000",
      status: "processing",
      date: "08 Jul 2026",
    },
  ];

  return (
    <div className="space-y-8">

      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's an overview of your platform."
      />

      {/* ================= STATISTICS ================= */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          title="Wallet Balance"
          value='₦1.456M'
          icon={<Wallet className="text-[#FFBB06]" size={22} />}
        />

        <StatCard
          title="Referrals"
          value={1485}
          icon={<Users className="text-[#FFBB06]" size={22} />}
        />


        <StatCard
          title="Total Commission Earned"
          value="₦145.6M"
          icon={<BanknoteArrowUp className="text-[#FFBB06]" size={22} />}
        />
        
        <StatCard
          title="Total Withdrawn"
          value={42}
          icon={<BanknoteArrowDown className="text-[#FFBB06]" size={22} />}
        />

      </div>

      {/* ================= RECENT TRANSACTIONS ================= */}

      <section className="space-y-4">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              Recent Transactions
            </h2>

            <p className="text-sm text-gray-500">
              Latest payments made on the platform.
            </p>

          </div>

        </div>

        {transactions.length === 0 ? (
          <EmptyState title="No transactions found." />
        ) : (
          <>
            {/* Desktop */}

            <DataTable
              columns={[
                {
                  header: "Customer",
                  key: "customer",
                },
                {
                  header: "Property",
                  key: "property",
                },
                {
                  header: "Amount",
                  key: "amount",
                },
                {
                  header: "Status",
                  key: "status",
                },
                {
                  header: "Date",
                  key: "date",
                },
                {
                  header: "",
                  key: "action",
                },
              ]}
              data={transactions}
              renderCell={(item, key) => {
                const transaction = item as Transaction;

                switch (key) {
                  case "customer":
                    return (
                      <p className="font-medium">
                        {transaction.customer}
                      </p>
                    );

                  case "property":
                    return transaction.property;

                  case "amount":
                    return (
                      <span className="font-semibold">
                        {transaction.amount}
                      </span>
                    );

                  case "status":
                    return (
                      <StatusBadge
                        status={transaction.status}
                      />
                    );

                  case "date":
                    return transaction.date;

                  case "action":
                    return (
                      <button className="text-[#FFBB06] hover:text-yellow-600">
                        <ArrowUpRight size={18} />
                      </button>
                    );

                  default:
                    return null;
                }
              }}
            />

            {/* Mobile */}

            <div className="space-y-4 md:hidden">

              {transactions.map((transaction) => (
                <MobileListCard
                  key={transaction.id}
                  title={transaction.customer}
                  subtitle={transaction.property}
                  right={
                    <StatusBadge
                      status={transaction.status}
                    />
                  }
                  footer={
                    <div className="flex justify-between items-center">

                      <div>

                        <p className="text-lg font-semibold">
                          {transaction.amount}
                        </p>

                        <p className="text-xs text-gray-500">
                          {transaction.date}
                        </p>

                      </div>

                      <div className="h-10 w-10 rounded-full bg-[#FFF7E1] flex items-center justify-center">

                        <ArrowUpRight
                          className="text-[#FFBB06]"
                          size={18}
                        />

                      </div>

                    </div>
                  }
                />
              ))}

            </div>
          </>
        )}

      </section>

    </div>
  );
}