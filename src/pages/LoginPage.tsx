import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { EmailSharp, Lock } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ForgetPasswordModel from "../components/ForgetPasswordModel";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/,
      "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one digit, and one special character(!@#$%^&*?)."
    ),
});

type responseData = {
  message: string;
  status: boolean;
  token: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const handlePasswordVisibility = (event: MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;
    if (name && name === "password") {
      setIsHidden(!isHidden);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formDetails: FormData) => {
    setIsPending(true);
    if (!formDetails) {
      console.log("missing form data");
    }
    try {
      const data = await axios.post(
        "https://portal-server-1.onrender.com/login",
        formDetails
      );
      if (data) {
        reset();
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("user", data.data.name);
        localStorage.setItem("email", data.data.email);
        toast.success("Authentication Successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as responseData;
      toast.error(responseData?.message || "An error occurred");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="w-full h-full flex items-center relative">
      <form
        className="bg-white w-[95%] mx-auto border-2 py-10 sm:px-2 md:px-20 flex flex-col gap-[18px] h-[90%] items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-[#afd039] text-center" style={{ color: "#7b3434" }}>
          Login
        </h1>
        <div className="relative flex items-center px-1 border-2 border-[#afd039] w-full">
          <EmailSharp />
          <input
            {...register("email")}
            className="outline-none py-[10px] ps-1 pe-3 w-full"
            type="email"
            name="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="absolute top-[100%] text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="relative flex items-center px-1 border-2 border-[#afd039] w-full">
          <Lock />
          <input
            {...register("password")}
            className="outline-none py-[10px] ps-1 pe-3 w-full"
            type={isHidden ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <button
            aria-label={isHidden ? "Show password" : "Hide password"}
            type="button"
            name="password"
            onClick={handlePasswordVisibility}
            className={`font-bold text-[#7b3434]`}
            style={{ fontSize: "14px" }}
          >
            {isHidden ? "Hide" : "Show"}
          </button>
          {errors.password && (
            <p className="absolute top-[100%] text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="text-center w-full mt-4">
          <button
            className={`bg-[#7b3434] text-white p-2 w-full flex items-center justify-center gap-2 ${
              isPending && "bg-[#7b343445]"
            }`}
            style={{ borderRadius: "10px", fontSize: "20px" }}
            type="submit"
            disabled={isPending}
          >
            {isPending && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {isPending ? "Logging in..." : "Login"}
          </button>
          <div
            className="text-right text-sm text-[#7b3434] "
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <button
              type="button"
              onClick={() => setIsModalShown(!isModalShown)}
              className="underline"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </form>
      {isModalShown && (
        <div className="absolute w-full h-screen top-0 left-0 bg-[#0000008f]">
          <ForgetPasswordModel setIsModalShown={setIsModalShown} />
        </div>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
