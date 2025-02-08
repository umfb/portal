import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function Dashboard() {
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
