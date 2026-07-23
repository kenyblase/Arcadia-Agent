interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl lg:text-3xl font-bold text-[#0D0900]">
        {title}
      </h1>

      {description && (
        <p className="text-sm text-[#667085]">
          {description}
        </p>
      )}
    </div>
  );
}