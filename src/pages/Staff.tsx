import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Add,
  AdminPanelSettings,
  ChevronLeftSharp,
  ChevronRightSharp,
  Email,
  KeyboardDoubleArrowLeftSharp,
  KeyboardDoubleArrowRightSharp,
  Person,
  Phone,
  SearchSharp,
  UnfoldMore,
} from "@mui/icons-material";
import api from "../api";

type staffType = {
  _id: number;
  accessRole: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  password: string;
  resetPasswordToken: string | null;
  resetPasswordTokenExpiryDate: Date | null;
};

const columnHelper = createColumnHelper<staffType>();

const columns = [
  columnHelper.accessor("firstname", {
    header: () => (
      <span className="flex gap-1 items-center">
        <Person /> Name
      </span>
    ),
    cell: (info) => {
      const { firstname, lastname } = info.row.original;
      return `${firstname} ${lastname}`;
    },
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: () => (
      <span className="flex gap-1 items-center">
        <Email /> Email
      </span>
    ),
    cell: (info) => {
      const { email } = info.row.original;
      return <span className="text-[#B4CF4A] italic">{email}</span>;
    },
  }),
  columnHelper.accessor("accessRole", {
    header: () => (
      <span className="flex gap-1 items-center">
        <AdminPanelSettings /> Access Role
      </span>
    ),
    cell: (info) => {
      const { accessRole } = info.row.original;
      return `${accessRole}`;
    },
  }),
  columnHelper.accessor("phoneNumber", {
    header: () => (
      <span className="flex gap-1 items-center">
        <Phone /> Phone Number
      </span>
    ),
    cell: (info) => {
      const { phoneNumber } = info.row.original;
      return <span className="text-[#B4CF4A] italic">{phoneNumber}</span>;
    },
  }),
];

export default function Staff() {
  const [staff, setStaff] = useState<staffType[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: staff,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const fetchUsers = async () => {
    try {
      const response = await api.get("/fetch-users");
      if (response.data?.users) {
        setStaff(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col h-full flex-1 px-11 bg-[#fff] items-start pt-10 pb-4">
      <div className="flex items-center justify-between w-full mb-2">
        <div
          className="border-2 border-[#7b3434] flex items-center px-2 py-1"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <SearchSharp />
          <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            type="text"
            className="outline-none px-2 text-sm"
          />
        </div>
        <div
          className="flex items-center"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <Link
            className="flex items-center bg-[#6ddd5b] py-1 px-2 active:bg-[#BB7A5A] shadow-sm text-xs shadow-black"
            to="/dashboard/signup"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add Profile
            <Add sx={{ fontSize: "20px" }} />
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg w-full">
        <table
          className="min-w-full border border-gray-300 divide-y divide-gray-200"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {/* Table Header */}
          <thead className="bg-[#7B3434] sticky top-0 z-10 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="divide-x divide-gray-300">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider"
                  >
                    <div
                      {...{
                        className:
                          header.column.getCanSort() &&
                          (header.column.id === "firstname" ||
                            header.column.id === "email")
                            ? "cursor-pointer select-none flex items-center"
                            : "",
                        onClick:
                          header.column.id === "firstname" ||
                          header.column.id === "email"
                            ? header.column.getToggleSortingHandler()
                            : undefined,
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {(header.column.id === "firstname" ||
                        header.column.id === "email") && (
                        <UnfoldMore sx={{ fontSize: "14px" }} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <tbody
            className="bg-white divide-y divide-gray-200"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#F5E3C2] divide-x divide-gray-200"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between align-middle items-center mt-2 text-sm text-gray-500 w-full">
        <div
          className="flex items-center"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="mr-2">Items per page</span>
          <select
            className="border-2 outline-none border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 py-1"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2 gap-2">
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <KeyboardDoubleArrowLeftSharp sx={{ fontSize: "20px" }} />
          </button>
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftSharp sx={{ fontSize: "20px" }} />
          </button>
          <span
            className="flex items-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <input
              className="w-16 p-2 py-1 rounded-md border border-gray-300 text-center"
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
            <span className="ml-1">of {table.getPageCount()}</span>
          </span>
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => {
              const lastPage = table.getPageCount() - 1;
              table.setPageIndex(lastPage);
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightSharp sx={{ fontSize: "20px" }} />
          </button>
          <button
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <KeyboardDoubleArrowRightSharp sx={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
