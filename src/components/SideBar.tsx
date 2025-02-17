import { useState } from "react";
import {
  AccountBalance,
  AdminPanelSettings,
  AssignmentTurnedIn,
  Campaign,
  // Business,
  ChevronLeftRounded,
  ChevronRightRounded,
  Computer,
  Group,
  History,
  PeopleOutlineRounded,
  Security,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <aside
      className={`h-[95%] my-auto mx-4 bg-[#7b3434] rounded-2xl text-white text-sm m-0 transition-width ease-in-out duration-400 absolute left-[-999px] top-[2.5px] lg:relative lg:left-0 ${
        isExpanded ? "w-[250px]" : "w-[80px]"
      }`}
    >
      <div className="flex items-center justify-center py-3 w-full">
        <img height="20px" width="50px" src="/mfb-logo.png" alt="bank's logo" />
      </div>
      <nav className="flex flex-col text-[#E0E0E0]">
        <div className="flex justify-between items-start shadow-sm px-3 py-2">
          {isExpanded && (
            <div className="flex flex-col gap-1">
              <p
                className="p-0 m-0 text-base font-bold text-[#AFD039] font-poppins"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Welcome,<br></br>
                <span
                  className="text-sm font-semibold text-[white] font-inter"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {localStorage.getItem("user")}
                </span>
              </p>
            </div>
          )}
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronLeftRounded /> : <ChevronRightRounded />}
          </button>
        </div>
        <ul
          className={`flex flex-col mt-3 text-[white] px-2 whitespace-nowrap`}
        >
          <div className={`flex flex-col ${!isExpanded && "items-center"}`}>
            <NavLink
              to="./hr"
              className={({ isActive }) =>
                `flex items-center gap-3 cursor-pointer ps-3 py-2 hover:bg-[#bb7a5a5c] ${
                  isActive ? "bg-[#bb7a5a8c]" : ""
                }`
              }
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <Group />
              {isExpanded && <span>Human Resources</span>}
            </NavLink>
            <NavLink
              to="./finOps"
              className={({ isActive }) =>
                `flex items-center gap-3 cursor-pointer ps-3 py-2 hover:bg-[#bb7a5a5c] ${
                  isActive ? "bg-[#bb7a5a8c]" : ""
                }`
              }
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <AccountBalance />
              {isExpanded && <span>Finance and Operations</span>}
            </NavLink>
            <NavLink
              to="crM"
              className={({ isActive }) =>
                `flex items-center gap-3 cursor-pointer ps-3 py-2 hover:bg-[#bb7a5a5c] ${
                  isActive ? "bg-[#bb7a5a8c]" : ""
                }`
              }
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <Campaign />
              {isExpanded && <span>Credit and Marketing</span>}
            </NavLink>
            <NavLink
              to="audit"
              className={({ isActive }) =>
                `flex items-center gap-3 cursor-pointer ps-3 py-2 hover:bg-[#bb7a5a5c] ${
                  isActive ? "bg-[#bb7a5a8c]" : ""
                }`
              }
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <AssignmentTurnedIn />
              {isExpanded && <span>Audit</span>}
            </NavLink>
            <NavLink
              to="compliance"
              className={({ isActive }) =>
                `flex items-center gap-3 cursor-pointer ps-3 py-2 hover:bg-[#bb7a5a5c] ${
                  isActive ? "bg-[#bb7a5a8c]" : ""
                }`
              }
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <Security />
              {isExpanded && <span>Compliance</span>}
            </NavLink>
            <NavLink
              to="./info-tech"
              className={({ isActive }) =>
                `flex items-center gap-3 cursor-pointer ps-3 py-2 hover:bg-[#bb7a5a5c] ${
                  isActive ? "bg-[#bb7a5a8c]" : ""
                }`
              }
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <Computer />
              {isExpanded && <span>Information Technology</span>}
            </NavLink>

            <div className="border-b border-[#AFD039] my-2"></div>

            <NavLink
              to="staff"
              className={({ isActive }) =>
                `flex items-center gap-3 cursor-pointer ps-3 py-2 hover:bg-[#bb7a5a5c] ${
                  isActive ? "bg-[#bb7a5a8c]" : ""
                }`
              }
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <button className="">
                <PeopleOutlineRounded />
              </button>
              {isExpanded && <button>Staff</button>}
            </NavLink>
            <NavLink
              to="./roles"
              className={({ isActive }) =>
                `flex items-center gap-3 cursor-pointer ps-3 py-2 hover:bg-[#bb7a5a5c] ${
                  isActive ? "bg-[#bb7a5a8c]" : ""
                }`
              }
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <button className="">
                <AdminPanelSettings />
              </button>
              {isExpanded && <button>Roles Config</button>}
            </NavLink>
            <NavLink
              to="./audit-log"
              className={({ isActive }) =>
                `flex items-center gap-3 cursor-pointer ps-3 py-2 hover:bg-[#bb7a5a5c] ${
                  isActive ? "bg-[#bb7a5a8c]" : ""
                }`
              }
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <History />
              {isExpanded && <button>Audit Logs</button>}
            </NavLink>
          </div>
        </ul>
      </nav>
    </aside>
  );
}
