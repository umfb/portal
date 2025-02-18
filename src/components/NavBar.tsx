import { Event, Logout, Settings } from "@mui/icons-material";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs";
import api from "../api";

type responseData = {
  message: string;
  status: boolean;
};

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const response = await api.post(
        "/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status && response.status === 200) {
        toast.success(response.data.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        setTimeout(() => {
          navigate("/");
        }, 2200);
      }
    } catch (error) {
      const err = error as AxiosError;
      const resData = err.response?.data as responseData;
      toast.error(resData?.message || "An error occured");
    }
  };
  return (
    <nav className="flex justify-between px-3 h-[10%] py-3 items-center">
      <BreadCrumbs />
      <div className="flex gap-4 items-center float-right">
        <button className="text-gray-800">
          <Event sx={{ fontSize: "20px" }} />
        </button>
        <button className="text-gray-800">
          <Settings sx={{ fontSize: "20px" }} />
        </button>
        <button onClick={() => handleLogOut()} className="text-red-500">
          <Logout sx={{ fontSize: "20px" }} />
        </button>
      </div>
    </nav>
  );
}
