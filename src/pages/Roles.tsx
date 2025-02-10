import {
  AccountCircle,
  Add,
  Event,
  Timer,
  AdminPanelSettings,
  SearchSharp,
  ChevronRightSharp,
  KeyboardDoubleArrowRightSharp,
  ChevronLeftSharp,
  KeyboardDoubleArrowLeftSharp,
} from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

type responseData = {
  message: string;
  status: boolean;
};

type roleData = {
  role: string;
  creator: string;
  createdAt: Date;
  updateAt: Date;
};

const columnHelper = createColumnHelper<roleData>();

const columns = [
  columnHelper.accessor("role", {
    header: () => (
      <span className="flex gap-1 items-center">
        <AdminPanelSettings />
        Role
      </span>
    ),
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("creator", {
    header: () => (
      <span className="flex gap-1 items-center">
        <AccountCircle /> Creator
      </span>
    ),
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("createdAt", {
    header: () => (
      <span className="flex gap-1 items-center">
        <Event /> Date Created
      </span>
    ),
    cell: (info) => {
      const dateValue = new Date(info.getValue());
      return <span>{format(dateValue, "dd/MM/yyyy")}</span>;
    },
  }),
  columnHelper.accessor("createdAt", {
    header: () => (
      <span className="flex gap-1 items-center">
        <Timer /> Time
      </span>
    ),
    cell: (info) => {
      const dateValue = new Date(info.getValue());
      return <span>{dateValue.toLocaleTimeString()}</span>;
    },
  }),
];

export default function Roles() {
  const [role, setRole] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data: roles,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const fetchRoles = async () => {
    try {
      const response = await axios.post(
        "https://portal-server-1.onrender.com/role/get-roles",
        {},
        {
          headers: {
            contentType: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response) {
        console.log(response);
        setRoles(response.data.roles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    setIsPending(true);
    try {
      const response = await axios.post(
        "https://portal-server-1.onrender.com/role/add-role",
        {
          role,
          creator: localStorage.getItem("email"),
        }
      );
      if (response) {
        fetchRoles();
        console.log(response.data.message);
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
      console.log(error);
      const axiosError = error as AxiosError;
      const axiosErrorData = axiosError.response?.data as responseData;
      setError(axiosErrorData.message || "An error occured");
    } finally {
      setRole("");
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);
  return (
    <div
      className="p-3 flex gap-3 items-start text-[#2E2B2B] flex-1 justify-around"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="bg-gray-800 flex flex-col rounded-md shadow-md">
        <div
          className="bg-[#7b3434] w-full text-white text-center py-2 rounded-t-md"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <p className="p-0 m-0">Add New Role</p>
        </div>
        <div className="p-3 flex flex-col gap-3">
          <div className="flex gap-1">
            <input
              className="py-2 px-3 border outline-none text-white"
              placeholder="Add Role..."
              type="text"
              value={role || ""}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <button
            className="text-white bg-green-500 py-1 px-2 hover:bg-green-400 disabled:bg-green-300"
            onClick={handleClick}
            disabled={isPending}
          >
            <span className="text-base flex items-center justify-center gap-2 py-1">
              Create Role
              {isPending ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                <Add className="h-5 w-5 text-white mr-2" />
              )}
            </span>
          </button>
        </div>
        <span
          className={`text-white mt-10 bg-green-500 p-2 text-center w-full  ${
            message || error ? "visible" : "invisible"
          } ${error && "bg-red-500"} `}
        >
          {(message && message) || (error && error)}
        </span>
      </div>
      <div className="flex flex-col items-start w-fit gap-2">
        <div
          className="border-2 border-[#7b3434] flex items-center ps-2 py-1"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <SearchSharp />
          <input
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            type="text"
            className="outline-none text-sm"
          />
        </div>
        <table className="w-full bg-[#7b3434] text-white shadow-md">
          <thead className="py-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="divide-x" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-6 py-3 text-left text-xs tracking-wider"
                    key={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y text-gray-900">
            {table.getRowModel().rows.map((row) => (
              <tr className="hover:bg-[#F5E3C2] divide-x" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
}
