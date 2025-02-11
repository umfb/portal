import { Close } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type ForgetPasswordModelProps = {
  setIsModalShown: (x: boolean) => void;
};

type responseData = {
  message: string;
  status: boolean;
};

export default function ForgetPasswordModel({
  setIsModalShown,
}: ForgetPasswordModelProps) {
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const handleSubmit = async () => {
    setIsPending(true);
    try {
      const response = await axios.post(
        "https://portal-server-1.onrender.com/send-email",
        {
          email,
        }
      );
      if (response) {
        toast.success(response.data.message);
      }
    } catch (error) {
      const axiosErr = error as AxiosError;
      const responseData = axiosErr.response?.data as responseData;
      toast.error(responseData?.message || "An error occured");
    } finally {
      setEmail(null);
      setIsPending(false);
      setTimeout(() => {
        setIsModalShown(false);
      }, 2000);
    }
  };
  return (
    <div className="bg-white absolute top-[25%] left-[25%] flex flex-col gap-3 px-3 pt-2 pb-10 w-[50%] shadow-lg">
      <button
        onClick={() => setIsModalShown(false)}
        className="text-right text-red-900 hover:text-red-500"
      >
        <Close />
      </button>
      <div
        className="text-center text-xl text-[#AFCD39] mb-3"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <span className="font-bold">Input your email</span>
      </div>
      <div className="flex flex-col gap-3">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="text-black border outline-none px-3 py-2"
          placeholder="Email..."
          type="email"
          name="email"
          value={email || ""}
        />
        <button
          onClick={() => handleSubmit()}
          className="bg-[#7b3434] text-white py-2 flex items-center justify-center gap-1 disabled:bg-[#7b343457]"
          style={{ fontFamily: "Inter, sans-serif" }}
          disabled={isPending}
        >
          {isPending && (
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
          )}
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
