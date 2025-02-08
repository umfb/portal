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
      className={`h-full bg-white text-gray-900 m-0 border-r transition-width ease-in-out duration-700 ${
        isExpanded ? "w-[18%]" : "w-[5%]"
      }`}
    >
      <nav className="flex flex-col">
        <div className="flex justify-between items-start shadow-sm px-3 py-2">
          {isExpanded && (
            <div className="flex flex-col gap-1">
              <p className="p-0 m-0 text-base font-bold">
                Welcome,<br></br>
                <span className="text-sm font-semibold text-[#7d3434]">
                  {localStorage.getItem("user")}
                </span>
              </p>
            </div>
          )}
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronLeftRounded /> : <ChevronRightRounded />}
          </button>
        </div>
        <ul className="flex flex-col gap-3 mt-3 px-3">
          <div
            className="flex items-center gap-3 text-gray-900"
            style={{ textDecoration: "none" }}
          >
            <div className="flex items-center gap-3 text-gray-900">
              <button>
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
                className="text-gray-700 hover:bg-[#dcee96] hover:text-black ps-3 py-1"
                style={{
                  textDecoration: "none",
                  color: "#7b3434",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                AUDIT
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
            className="flex items-center gap-3 cursor-pointer text-gray-900 mb-3"
            style={{
              textDecoration: "none",
              color: "oklch(0.21 0.034 264.665)",
            }}
          >
            <button>
              <PeopleOutlineRounded />
            </button>
            {isExpanded && <button>Staff</button>}
          </NavLink>
          <NavLink
            to="roles"
            className="flex items-center gap-3 cursor-pointer text-gray-900 mb-3"
            style={{
              textDecoration: "none",
              color: "oklch(0.21 0.034 264.665)",
            }}
          >
            <button>
              <AdminPanelSettings />
            </button>
            {isExpanded && <button>Roles Config</button>}
          </NavLink>
          <NavLink
            to="activities"
            className="flex items-center gap-3 cursor-pointer text-gray-900 mb-3"
            style={{
              textDecoration: "none",
              color: "oklch(0.21 0.034 264.665)",
            }}
          >
            <button>
              <History />
            </button>
            {isExpanded && <button>Activities</button>}
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
}
