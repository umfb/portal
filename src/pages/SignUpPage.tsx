import {
  AssignmentInd,
  Business,
  EmailSharp,
  Lock,
  Person,
  Phone,
} from "@mui/icons-material";
import { useState, MouseEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";

type PasswordField = "password" | "confirmPassword";
type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  accessRole: string;
  department: string;
  password: string;
  confirmPassword: string;
};
interface ApiResponse {
  response: {
    data: {
      [key: string]: any;
    };
  };
  data: {
    [key: string]: any;
  };
}

type responseData = {
  message: string;
  status: boolean;
  token: string;
};

type roleData = {
  role: string;
  creator: string;
  createdAt: Date;
  updateAt: Date;
};

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
    department: z.string().nonempty("This field is required"),
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
  const [roles, setRoles] = useState<roleData[]>([]);

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

  const handlePasswordVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as PasswordField;
    setIsHidden({ ...isHidden, [name]: !isHidden[name] });
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
        "department",
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
        reset();
        return;
      }
    } catch (error) {
      console.log(error);

      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as responseData;
      toast.error(responseData?.message || "An error occurred");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="bg-[#b4cf4ab4] w-full flex items-center ">
      <div className="w-[60%] mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full rounded-2xl px-10 py-5 flex flex-col gap-[18px] h-fit shadow-2xl"
        >
          <h1
            className="text-[#afd039] text-center"
            style={{ color: "#7b3434" }}
          >
            Create Profile
          </h1>
          <div className="flex gap-2 items-center">
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
          </div>
          <div className="flex gap-2">
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
          <div className="flex items-center px-1 border-2 relative border-[#afd039]">
            <Business />
            <select
              {...register("department")}
              className="w-full py-[10px] outline-none"
              name="department"
              defaultValue=""
            >
              <option className="text-secondary" value="" disabled>
                --Department--
              </option>
              <option value="Audit">Audit</option>
              <option value="Compliance">Compliance</option>
              <option value="Credit and Marketing">Credit & Marketing</option>
              <option value="Finance and Ops">Finance & Ops</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-xs absolute top-[100%]">
                {errors.department.message}
              </p>
            )}
          </div>
          <div className="flex items-center px-1 border-2 relative border-[#afd039]">
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
              {roles.map((role) => (
                <option key={role.role} value={role.role}>
                  {role.role}
                </option>
              ))}
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
    </div>
  );
}
