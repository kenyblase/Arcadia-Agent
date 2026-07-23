interface Props {
  title: string;
}

export default function EmptyState({
  title,
}: Props) {
  return (
    <div className="bg-white rounded-xl py-20 flex justify-center">

      <p className="text-[#667085]">
        {title}
      </p>

    </div>
  );
}