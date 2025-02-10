import { useState } from "react";
import {
  AdminPanelSettings,
  Business,
  ChevronLeftRounded,
  ChevronRightRounded,
  History,
  KeyboardArrowDown,
  KeyboardArrowUp,
  PeopleOutlineRounded,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isListVisible, setIsListVisible] = useState<boolean>(false);

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <aside
      className={`h-full bg-[#F4F4F4] text-[#1C1C1C] m-0 border-r transition-width ease-in-out duration-700 ${
        isExpanded ? "w-[250px]" : "w-[80px]"
      }`}
    >
      <nav className="flex flex-col text-[#E0E0E0]">
        <div className="flex justify-between items-start shadow-sm px-3 py-2">
          {isExpanded && (
            <div className="flex flex-col gap-1">
              <p className="p-0 m-0 text-base font-bold text-[#37474F]">
                Welcome,<br></br>
                <span className="text-sm font-semibold text-[#1C1C1C]">
                  {localStorage.getItem("user")}
                </span>
              </p>
            </div>
          )}
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronLeftRounded /> : <ChevronRightRounded />}
          </button>
        </div>
        <ul className="flex flex-col gap-3 mt-3 px-0 text-[#1C1C1C]">
          <div
            className="flex items-center gap-3"
            style={{ textDecoration: "none" }}
          >
            <div className="flex items-center gap-3 ps-3">
              <button className="text-[#1C1C1C]">
                <Business />
              </button>
              {isExpanded && <button>Departments</button>}
            </div>
            <button
              onClick={(event) => {
                event.stopPropagation();
                toggleListVisibility();
              }}
            >
              {isListVisible ? (
                <KeyboardArrowUp
                  style={{
                    height: "20px",
                    color: "gray",
                  }}
                />
              ) : (
                <KeyboardArrowDown
                  style={{
                    height: "20px",
                    color: "gray",
                  }}
                />
              )}
            </button>
          </div>
          <div
            className="m-0 p-0"
            style={{
              overflow: "hidden",
              transition: "max-height 0.5s ease-in-out",
              maxHeight: isListVisible ? "200px" : "0",
              padding: "0",
            }}
          >
            <div className="flex flex-col ms-4">
              <NavLink
                to=""
                className="text-gray-700 hover:bg-[#dcee96] hover:text-black ps-3 py-1"
                style={{
                  textDecoration: "none",
                  color: "#7b3434",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                HR
              </NavLink>
              <NavLink
                to=""
                className="text-gray-700 hover:bg-[#dcee96] hover:text-black ps-3 py-1"
                style={{
                  textDecoration: "none",
                  color: "#7b3434",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Finance & Ops
              </NavLink>
              <NavLink
                to=""
                className="text-gray-700 hover:bg-[#dcee96] hover:text-black ps-3 py-1 active:bg-red-500"
                style={{
                  textDecoration: "none",
                  color: "#7b3434",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Credit & Marketing
              </NavLink>
              <NavLink
                to=""
                className="text-gray-700 hover:bg-[#dcee96] hover:text-black ps-3 py-1"
                style={{
                  textDecoration: "none",
                  color: "#7b3434",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Audit
              </NavLink>
              <NavLink
                to=""
                className="text-gray-700 hover:bg-[#dcee96] hover:text-black ps-3 py-1"
                style={{
                  textDecoration: "none",
                  color: "#7b3434",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Compliance
              </NavLink>
              <NavLink
                to=""
                className="text-gray-700 hover:bg-[#dcee96] hover:text-black ps-3 py-1"
                style={{
                  textDecoration: "none",
                  color: "#7b3434",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                IT
              </NavLink>
            </div>
          </div>
          <NavLink
            to="staff"
            className={({ isActive }) =>
              `flex items-center gap-3 cursor-pointer ps-3 py-3 hover:bg-[#C8E363] ${
                isActive ? "bg-[#BB7A5A]" : ""
              }`
            }
            style={{
              textDecoration: "none",
              color: "#1C1C1C",
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
              `flex items-center gap-3 cursor-pointer ps-3 py-3 hover:bg-[#C8E363] ${
                isActive ? "bg-[#BB7A5A]" : ""
              }`
            }
            style={{
              textDecoration: "none",
              color: "#1C1C1C",
            }}
          >
            <button className="">
              <AdminPanelSettings />
            </button>
            {isExpanded && <button>Roles Config</button>}
          </NavLink>
          <NavLink
            to="./activities"
            className={({ isActive }) =>
              `flex items-center gap-3 cursor-pointer ps-3 py-3 hover:bg-[#C8E363] ${
                isActive ? "bg-[#BB7A5A]" : ""
              }`
            }
            style={{
              textDecoration: "none",
              color: "#1C1C1C",
            }}
          >
            <History />
            {isExpanded && <button>Activities</button>}
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
}
