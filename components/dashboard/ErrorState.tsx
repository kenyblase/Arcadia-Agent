interface ErrorStateProps {
  title: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="bg-white border rounded-xl p-10 text-center space-y-4">
      <p className="text-red-500">{title}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-[#FFBB06] text-black font-medium"
        >
          Retry
        </button>
      )}
    </div>
  );
}