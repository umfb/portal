import { Event, Logout, Settings } from "@mui/icons-material";
import { useState } from "react";

export default function NavBar() {
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
        <button className="text-red-500">
          <Logout sx={{ fontSize: "20px" }} />
        </button>
      </div>
    </nav>
  );
}
