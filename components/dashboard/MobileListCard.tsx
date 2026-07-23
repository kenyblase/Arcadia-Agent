import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;

  right?: ReactNode;

  footer?: ReactNode;

  onClick?: () => void;
}

export default function MobileListCard({
  title,
  subtitle,
  right,
  footer,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl p-4 text-left shadow-sm border border-[#F0F0F0]"
    >

      <div className="flex justify-between items-start">

        <div>

          <h3 className="font-medium">
            {title}
          </h3>

          {subtitle && (
            <p className="text-sm text-[#667085] mt-1 capitalize">
              {subtitle}
            </p>
          )}

        </div>

        {right}

      </div>

      {footer && (
        <div className="mt-4">
          {footer}
        </div>
      )}

    </button>
  );
}