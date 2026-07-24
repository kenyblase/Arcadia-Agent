"use client";

import {
  Users,
  Wallet,
  ArrowUpRight,
  BanknoteArrowDown,
  BanknoteArrowUp,
} from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/dashboard/DataTable";
import MobileListCard from "@/components/dashboard/MobileListCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import { useGetDashboardAnalytics } from "@/hooks/dashboard/useGetDashboardAnalytics";
import Skeleton from "@/components/dashboard/Skeleton";
import { useGetAgentCommissionHistory } from "@/hooks/dashboard/useGetAgentCommissionHistory";
import ErrorState from "@/components/dashboard/ErrorState";
import { useAuthStore } from "@/lib/store/authStore";

export default function DashboardPage() {
  const {
    data: dashboardAnalytics,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
  } = useGetDashboardAnalytics();

  const {
    data: recentCommissions,
    isLoading: isCommissionsLoading,
    isError: isCommissionsError,
  } = useGetAgentCommissionHistory(1, 5);

  const { agent } = useAuthStore()

  type Commission = {
    _id: string
    user: { email: string }
    purchase: {
      property: { propertyName: string }
      plot: { plotNumber: string }
    }
    amount: number
    percentage: number
    commission: number
    createdAt: string
  }

  const formatMongoDate = (dateString: string) => {
      if (!dateString) return "";

      const date = new Date(dateString);

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",   // Oct
        day: "2-digit",   // 12
        year: "numeric",  // 2023
      }).format(date);

      return `${formattedDate}`;
    };

  return (
    <div className="space-y-8">

      <PageHeader
        title="Dashboard"
        description={`Welcome back ${agent?.firstName} ${agent?.lastName}. Here's an overview of your account.`}
      />

      {/* ================= STATISTICS ================= */}

      {isAnalyticsLoading ? (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : isAnalyticsError ? (
        <div className="bg-white rounded-xl border p-8 text-center">
          <p className="text-red-500">
            Failed to load dashboard analytics.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Wallet Balance"
            value={`₦${dashboardAnalytics.walletBalance.toLocaleString()}`}
            icon={<Wallet className="text-[#FFBB06]" size={22} />}
          />

          <StatCard
            title="Referrals"
            value={dashboardAnalytics.totalReferrals}
            icon={<Users className="text-[#FFBB06]" size={22} />}
          />

          <StatCard
            title="Total Commission Earned"
            value={`₦${dashboardAnalytics.totalCommissionEarned.toLocaleString()}`}
            icon={<BanknoteArrowUp className="text-[#FFBB06]" size={22} />}
          />

          <StatCard
            title="Total Withdrawn"
            value={`₦${dashboardAnalytics.totalWithdrawn.toLocaleString()}`}
            icon={<BanknoteArrowDown className="text-[#FFBB06]" size={22} />}
          />
        </div>
      )}

      {/* ================= RECENT TRANSACTIONS ================= */}

      <section className="space-y-4">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              Recent Commissions
            </h2>

            <p className="text-sm text-gray-500">
              Latest commissions earned from your referrals.
            </p>

          </div>

        </div>

        {isCommissionsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : isCommissionsError ? <ErrorState title="Failed to load recent commissions."/> : recentCommissions.commissionHistory.length === 0 ? (
          <EmptyState title="No commissions found." />
        )  : (
          <>
            {/* Desktop */}

            <DataTable
              columns={[
                {
                  header: "User Email",
                  key: "email",
                },
                {
                  header: "Property",
                  key: "property",
                },
                {
                  header: "Plot",
                  key: "plot",
                },
                {
                  header: "Amount",
                  key: "amount",
                },
                {
                  header: "Percentage",
                  key: "percentage",
                },
                {
                  header: "Commission",
                  key: "commission",
                },
                {
                  header: "Date",
                  key: "date",
                },
                // {
                //   header: "",
                //   key: "action",
                // },
              ]}
              data={recentCommissions.commissionHistory}
              renderCell={(item, key) => {
                const commission = item as Commission;

                switch (key) {
                  case "email":
                    return (
                      <p className="font-medium">
                        {commission.user.email}
                      </p>
                    );

                  case "property":
                    return (
                      <span className="font-medium capitalize">
                        {commission.purchase.property.propertyName}
                      </span>
                    );

                  case "plot":
                    return (
                      <span className="font-medium capitalize">
                        {commission.purchase.plot.plotNumber}
                      </span>
                    );

                  case "amount":
                    return (
                      <span className="font-semibold">
                        ₦{commission.amount.toLocaleString()}
                      </span>
                    );

                  case "percentage":
                    return (
                      <span className="font-semibold">
                        {commission.percentage}%
                      </span>
                    );
                  case "commission":
                    return (
                      <span className="font-semibold">
                        ₦{commission.commission.toLocaleString()}
                      </span>
                    );

                  case "date":
                    return formatMongoDate(commission.createdAt);

                  // case "action":
                  //   return (
                  //     <button className="text-[#FFBB06] hover:text-yellow-600">
                  //       <ArrowUpRight size={18} />
                  //     </button>
                  //   );

                  default:
                    return null;
                }
              }}
            />

            {/* Mobile */}

            <div className="space-y-4 md:hidden">

              {recentCommissions.commissionHistory.map((commission: Commission) => (
                <MobileListCard
                  key={commission._id}
                  title={`User: ${commission.user.email}`}
                  subtitle={`Property Details: ${commission.purchase.property.propertyName} ${commission.purchase.plot.plotNumber}`}
                  footer={
                    <div className="flex justify-between items-center">

                      <div>

                        <p className="text-lg">
                          Amount: ₦{commission.amount}
                        </p>

                        <p className="text-lg">
                          Percentage: {commission.percentage}%
                        </p>

                        <p className="text-lg">
                          Commission: ₦{commission.commission}
                        </p>

                        <p className="text-xs text-gray-500">
                          {formatMongoDate(commission.createdAt)}
                        </p>

                      </div>

                      {/* <div className="h-10 w-10 rounded-full bg-[#FFF7E1] flex items-center justify-center">

                        <ArrowUpRight
                          className="text-[#FFBB06]"
                          size={18}
                        />

                      </div> */}

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