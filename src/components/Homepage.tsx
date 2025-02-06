import { Outlet } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="lg:w-[50%] md:hidden lg:flex bg-[url(/logo.png)] bg-no-repeat bg-contain bg-center h-full bg-[#7b3434]"></div>
      <div className="lg:w-[60%] md:w-full h-full flex items-center justify-center bg-white">
        <Outlet />
      </div>
    </div>
  );
}
