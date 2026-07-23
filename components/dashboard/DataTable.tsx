import { ReactNode } from "react";

interface Column {
  header: string;
  key: string;
}

interface Props<T> {
  columns: Column[];
  data: T[];

  renderCell: (
    item: T,
    key: string
  ) => ReactNode;
}

export default function DataTable<T>({
  columns,
  data,
  renderCell,
}: Props<T>) {
  return (
    <div className="hidden md:block overflow-x-auto rounded-xl bg-white border border-[#F0F0F0]">

      <table className="w-full text-left border-collapse bg-[#FFFFFF]">

        <thead className="bg-[#F0F0F0] text-[#0D0900B2]">

          <tr className="border-b">

            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-semibold"
              >
                {column.header}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >

              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-5"
                >
                  {renderCell(item, column.key)}
                </td>
              ))}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}