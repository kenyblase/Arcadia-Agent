interface Props {
  page: number;
  totalPages: number;

  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPages,
  onNext,
  onPrevious,
}: Props) {
  return (
    <div className="flex items-center justify-between">

      <button
        disabled={page === 1}
        onClick={onPrevious}
        className="px-4 py-2 rounded-lg border disabled:opacity-50"
      >
        Previous
      </button>

      <p>
        {page} / {totalPages}
      </p>

      <button
        disabled={page === totalPages}
        onClick={onNext}
        className="px-4 py-2 rounded-lg border disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}