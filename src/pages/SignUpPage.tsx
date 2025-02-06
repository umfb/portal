import {
  AssignmentInd,
  EmailSharp,
  Lock,
  Person,
  Phone,
} from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

type PasswordField = "password" | "confirmPassword";
type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  accessRole: string;
  password: string;
  confirmPassword: string;
};
interface ApiResponse {
  response: {
    data: {
      [key: string]: any;
    };
  };
  //   message: string;
  data: {
    [key: string]: any;
  };
}

const schema = z
  .object({
    firstname: z.string().trim().nonempty("This field is required"),
    lastname: z.string().trim().nonempty("This field is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("This field is required"),
    phoneNumber: z
      .string()
      .regex(/^\d{11}$/, "Phone number must be 10 digits")
      .nonempty("This field is required"),
    accessRole: z.string().nonempty("This field is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character(!@#$%^&*?)."
      ),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const [isHidden, setIsHidden] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const [isPending, setIsPending] = useState<boolean>(false);

  const handlePasswordVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as PasswordField;
    setIsHidden({ ...isHidden, [name]: !isHidden[name] });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formDetails: FormData) => {
    setIsPending(true);
    try {
      if (!formDetails) {
        console.log("form details is missing");
        return;
      }
      const keysToSend: (keyof FormData)[] = [
        "firstname",
        "lastname",
        "email",
        "phoneNumber",
        "accessRole",
        "password",
      ];
      const actualData = keysToSend.reduce((acc, key) => {
        if (formDetails[key]) {
          acc[key] = formDetails[key];
        }
        return acc;
      }, {} as Partial<FormData>);
      const response = await axios.post<ApiResponse>(
        "https://portal-server-1.onrender.com/register",
        actualData
      );
      if (response.data) {
        toast.success("Profile created successfully");
        console.log(response);
        return;
      }
      toast.error("Please try again");
      console.log(response.data);
    } catch (error) {
      toast.error("Please try again");
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full py-10 px-20 flex flex-col gap-[18px] h-full"
      >
        <h1 className="text-[#afd039] text-center" style={{ color: "#7b3434" }}>
          Create Profile
        </h1>
        <div className="flex items-center border-2 border-[#afd039] px-1 w-full relative">
          <Person />
          <input
            {...register("firstname")}
            className="outline-none py-[10px] ps-1 pe-3 w-full"
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
          />
          {errors.firstname && (
            <p className="text-red-500 text-xs absolute top-[100%]">
              {errors.firstname.message}
            </p>
          )}
        </div>

        <div className="flex items-center border-2 border-[#afd039] w-full px-1 relative">
          <Person />
          <input
            {...register("lastname")}
            className="outline-none py-[10px] ps-1 pe-3 w-full"
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs absolute top-[100%]">
              {errors.lastname.message}
            </p>
          )}
        </div>
        <div className="flex items-center w-full px-1 border-2 border-[#afd039] relative">
          <Phone />
          <input
            {...register("phoneNumber")}
            className="outline-none py-[10px] ps-1 pe-3 w-full"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs absolute top-[100%]">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="flex items-center w-full px-1 border-2 border-[#afd039] relative">
          <EmailSharp />
          <input
            {...register("email")}
            className="outline-none py-[10px] ps-1 pe-3 w-full"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs absolute top-[100%]">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="border-2 border-[#afd039] flex items-center w-full px-1 relative">
          <Lock />
          <input
            {...register("password")}
            className="outline-none py-[10px] ps-1 pe-3 w-full"
            type={isHidden.password ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <button
            name="password"
            onClick={handlePasswordVisibility}
            className={"text-[#7b3434] font-bold"}
            style={{ fontSize: "14px" }}
            type="button"
          >
            {isHidden.password ? "Hide" : "Show"}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs absolute top-[100%]">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center border-2 border-[#afd039] w-full px-1 relative">
          <Lock />
          <input
            {...register("confirmPassword")}
            className="outline-none py-[10px] ps-1 pe-3 w-full"
            type={isHidden.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Repeat Password"
          />
          <button
            aria-label={
              isHidden.confirmPassword ? "Show password" : "Hide password"
            }
            className={"text-[#7b3434] font-bold"}
            type="button"
            name="confirmPassword"
            style={{ fontSize: "14px" }}
            onClick={handlePasswordVisibility}
          >
            {isHidden.confirmPassword ? "Hide" : "Show"}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs absolute top-[100%]">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex items-center px-1 border-2 border-[#afd039]">
          <AssignmentInd />
          <select
            {...register("accessRole")}
            className="w-full py-[10px] outline-none"
            name="accessRole"
            defaultValue=""
          >
            <option className="text-secondary" value="" disabled>
              --Access Role--
            </option>
            <option value="Super">Admin</option>
            <option value="Basic">User</option>
          </select>
          {errors.accessRole && (
            <p className="text-red-500 text-xs absolute top-[100%]">
              {errors.accessRole.message}
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
            {isPending ? "Creating..." : "Create Profile"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
