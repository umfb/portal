import { Outlet } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="md:w-[50%] hidden md:flex bg-[url(/mfb-logo.png)] bg-no-repeat bg-center h-full bg-[length:30%] bg-[#333]"></div>
      <div className="flex-1 h-full flex items-center justify-center bg-white">
        <Outlet />
      </div>
    </div>
  );
}
