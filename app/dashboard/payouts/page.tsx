"use client";

import {
  BanknoteArrowDown,
  Plus,
} from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/dashboard/DataTable";
import MobileListCard from "@/components/dashboard/MobileListCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import Skeleton from "@/components/dashboard/Skeleton";
import ErrorState from "@/components/dashboard/ErrorState";
import { useGetWithdrawaldAnalytics } from "@/hooks/payouts/useGetWithdrawalAnalytics";
import { useGetAgentWithdrawalHistory } from "@/hooks/payouts/useGetWIthdrawalHistory";
import Pagination from "@/components/dashboard/Pagination";
import WithdrawalModal from "@/components/modals/WithdrawalModal";
import { useState } from "react";
import { useMakeWithdrawal } from "@/hooks/payouts/useMakeWithdrawal";

export default function PayoutPage() {
  const [withdrawalsPage, setWithdrawalsPage] = useState(1) 
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const {
    data: withdrawalAnalytics,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
  } = useGetWithdrawaldAnalytics();

  const {
    data: withdrawals,
    isLoading: isWithdrawalsLoading,
    isError: isWithdrawalsError,
  } = useGetAgentWithdrawalHistory(1, 10);

  const { makeWithdrawal, isMakingWithdrawal } = useMakeWithdrawal()

  type Withdrawal = {
    _id: string
    amount: number
    status: string
    bankName: string
    accountName: string
    accountNumber: string
    processedAt: string
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

    const handleWithdrawal = async (amount: number) => {
      await makeWithdrawal(amount)

      setWithdrawalModalOpen(false);
    };

  return (
    <div className="space-y-8">

      <PageHeader
        title="Payouts"
        description="Here's an overview of the withdrawals made on your account."
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
            title="Total Withdrawn"
            value={`₦${withdrawalAnalytics.totalWithdrawn.toLocaleString()}`}
            icon={<BanknoteArrowDown className="text-[#FFBB06]" size={22} />}
          />

          <StatCard
            title="Yesterday's Withdrawal"
            value={`₦${withdrawalAnalytics.yesterdayWithdrawn.toLocaleString()}`}
            icon={<BanknoteArrowDown className="text-[#FFBB06]" size={22} />}
          />

          <StatCard
            title="Last Week's Withdrawal"
            value={`₦${withdrawalAnalytics.lastWeekWithdrawn.toLocaleString()}`}
            icon={<BanknoteArrowDown className="text-[#FFBB06]" size={22} />}
          />

          <StatCard
            title="Last Month's Withdrawal"
            value={`₦${withdrawalAnalytics.lastMonthWithdrawn.toLocaleString()}`}
            icon={<BanknoteArrowDown className="text-[#FFBB06]" size={22} />}
          />
        </div>
      )}

      {/* ================= RECENT TRANSACTIONS ================= */}

      <section className="space-y-4">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              Payouts
            </h2>

            <p className="text-sm text-gray-500">
              Withdrawals made on your account.
            </p>

          </div>

          <button  onClick={() => setWithdrawalModalOpen(true)} disabled={isMakingWithdrawal} className="flex gap-1 items-center bg-yellow-400 rounded-md p-3">
            <Plus size={20} color="#000000"/>

            <p className="text-black font-medium text-lg hidden md:block">Make a withdrawal</p>
          </button>

        </div>

        {isWithdrawalsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : isWithdrawalsError ? <ErrorState title="Failed to load recent commissions."/> : withdrawals.withdrawalHistory.length === 0 ? (
          <EmptyState title="No commissions found." />
        )  : (
          <>
            {/* Desktop */}

            <DataTable
              columns={[
                {
                  header: "Bank Name",
                  key: "bankName",
                },
                {
                  header: "Account Number",
                  key: "accountNumber",
                },
                {
                  header: "Account Name",
                  key: "accountName",
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
                  header: "Date Requested",
                  key: "requestedAt",
                },
                {
                  header: "Date Processed",
                  key: "processedAt",
                },
              ]}
              data={withdrawals.withdrawalHistory}
              renderCell={(item, key) => {
                const withdrawal = item as Withdrawal;

                switch (key) {
                  case "bankName":
                    return (
                      <p className="font-medium">
                        {withdrawal.bankName.toUpperCase()}
                      </p>
                    );

                  case "accountNumber":
                    return (
                      <span className="font-medium">
                        {withdrawal.accountNumber}
                      </span>
                    );

                  case "accountName":
                    return (
                      <span className="font-medium capitalize">
                        {withdrawal.accountName}
                      </span>
                    );

                  case "amount":
                    return (
                      <span className="font-semibold">
                        ₦{withdrawal.amount}
                      </span>
                    );

                  case "status":
                    return <StatusBadge
                      status={withdrawal.status}
                    />

                  case "requestedAt":
                    return formatMongoDate(withdrawal.createdAt);

                  case "processedAt":
                    return formatMongoDate(withdrawal.processedAt) || 'N/A';

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

              {withdrawals.withdrawalHistory.map((withdrawal: Withdrawal) => (
                <MobileListCard
                  key={withdrawal._id}
                  title={`Amount: ₦${withdrawal.amount}`}
                  right={
                    <StatusBadge
                      status={withdrawal.status}
                    />
                  }
                  footer={
                    <div className="flex justify-between items-center">

                      <div>

                        <p className="text-lg capitalize">
                          Account Name: {withdrawal.accountName}
                        </p>

                        <p className="text-lg capitalize">
                          Bank Name: {withdrawal.bankName}
                        </p>

                        <p className="text-lg">
                          Account Number: {withdrawal.accountNumber}
                        </p>

                        <p className="text-xs text-gray-500">
                          Date Requested: {formatMongoDate(withdrawal.createdAt)}
                        </p>

                        <p className="text-xs text-gray-500">
                          Date Processed: {formatMongoDate(withdrawal.processedAt) || 'N/A'}
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

        <Pagination 
          page={withdrawalsPage} 
          totalPages={withdrawals?.totalPages}
          onNext={()=>setWithdrawalsPage(prev=>prev + 1)}
          onPrevious={()=>setWithdrawalsPage(prev=>prev - 1)}
        />

      </section>

      <WithdrawalModal
        isOpen={withdrawalModalOpen}
        onClose={() => setWithdrawalModalOpen(false)}
        onSubmit={handleWithdrawal}
        isLoading={isMakingWithdrawal}
      />

    </div>
  );
}