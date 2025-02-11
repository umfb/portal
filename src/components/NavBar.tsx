import { Event, Logout, Settings } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

type responseData = {
  message: string;
  status: boolean;
};

export default function NavBar() {
  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        "https://portal-server-1.onrender.com/logout",
        null,
        {
          withCredentials: true,
        }
      );
      if (response.status && response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      const err = error as AxiosError;
      const resData = err.response?.data as responseData;
      toast.error(resData?.message || "An error occured");
    }
  };
  return (
    <nav className="flex justify-between px-3 h-[10%] py-3 items-center bg-[#7b3434]">
      <img height="20px" width="50px" src="/mfb-logo.png" alt="bank's logo" />
      <div className="flex gap-4 items-center">
        <button className="text-white">
          <Event sx={{ fontSize: "20px" }} />
        </button>
        <button className="text-white">
          <Settings sx={{ fontSize: "20px" }} />
        </button>
        <button onClick={() => handleLogOut()} className="text-red-500">
          <Logout sx={{ fontSize: "20px" }} />
        </button>
      </div>
    </nav>
  );
}
