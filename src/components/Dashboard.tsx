import { useNavigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const verifyUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/verify",
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
      if (axiosError.status === 403) {
        navigate("/");
      }
      console.error("Error verifying user:", error);
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
    </div>
  );
}
