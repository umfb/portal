import { useNavigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../api";

type responseData = {
  message: string;
  status: boolean;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const verifyUser = async () => {
    try {
      const response = await api.post(
        "/verify",
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
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const resData = axiosError.response?.data as responseData;
      toast.error(resData?.message || "An error occured");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex h-[92%]">
        <SideBar />
        <Outlet />
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
