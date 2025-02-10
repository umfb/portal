import { Add } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";

export default function Roles() {
  const [role, setRole] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
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
        console.log(response.data.message);
        setMessage(response.data.message);
        setRole("");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div
      className="p-3 text-[#2E2B2B]"
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
              value={role}
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
          className={`text-white mt-10  ${
            message ? "visible" : "invisible"
          } bg-green-500 p-2 text-center w-full`}
        >
          {message && message}
        </span>
      </div>
      <div className="bg-yellow-500"></div>
    </div>
  );
}
