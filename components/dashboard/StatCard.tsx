import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "#FFBB06",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0F0F0]">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm md:text-lg text-[#667085]">
            {title}
          </p>

          <h2 className="mt-2 text-lg md:text-2xl font-bold text-[#0D0900]">
            {value}
          </h2>

        </div>

        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}