import axios, { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BouncingComponent from "../components/BouncingComponent";

type ResponseData2 = {
  message: string;
  status: boolean;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = useMemo(
    () => searchParams.get("token"),
    [searchParams.toString()]
  );

  const updatePassword = async () => {
    setIsPending(true);
    try {
      const response = await axios.post(
        "https://portal-server-1.onrender.com/reset-password",
        { token, newPassword }
      );
      if (response.status === 200 && response.data.status) {
        setIsError(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      const responseData = err.response?.data as ResponseData2;
      toast.error(responseData?.message || "An error occured");
    } finally {
      setIsPending(false);
      setTimeout(() => {
        navigate("?");
      }, 3500);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setErrorMessage("Incorrect URL: token missing.");
        setIsPending(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://portal-server-1.onrender.com/reset-password?token=${token}`
        );
        if (response.status === 200 && response.data.status) {
          setVerified(true);
        }
      } catch (error) {
        const err = error as AxiosError;
        const responseData = err.response?.data as ResponseData2;
        setErrorMessage(responseData?.message || "An error occured");
      } finally {
        setIsPending(false);
      }
    };

    verifyToken();
  }, [token]);

  useEffect(() => {
    if (errorMessage) {
      if (!verified) {
        toast.error(errorMessage);
      }
    }
  }, [errorMessage]);

  return (
    <div className="flex items-center justify-center bg-[#7b3434] h-screen relative">
      <div
        style={{ fontFamily: "Poppins, sans-serif" }}
        className={`text-white absolute w-full text-center text-4xl top-4 ${
          !isError ? "visible" : "invisible"
        }`}
      >
        <BouncingComponent text={"Password Updated!!!"} />
        <span className="text-base">
          <Link to="/">Return to the login page</Link>
        </span>
      </div>
      <div className="flex-col gap-3 flex bg-white shadow-md items-center p-3 w-[30%] pb-5">
        <div>
          <img width="70px" src="/mfb-logo.png" alt="bank's logo" />
        </div>
        <div
          className="flex flex-col gap-2 w-full"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <label htmlFor="newPassword">New Password</label>
          <div className="flex items-center border px-2">
            <input
              className="px-3 py-2 outline-none w-full"
              onChange={(e) => setNewPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              value={newPassword}
              id="newPassword"
              name="password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              <span className="text-sm text-[#7b3434] font-bold">
                {showPassword ? "hide" : "show"}
              </span>
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#7b3434] text-white py-2 mt-3 disabled:bg-[#7b34344f] flex gap-1 items-center justify-center"
            style={{ fontFamily: "Inter, sans-serif" }}
            onClick={() => updatePassword()}
            disabled={isPending}
          >
            {isPending ? (
              <>
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
                Resetting
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
