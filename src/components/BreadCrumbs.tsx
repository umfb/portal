import { Home } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";

export default function BreadCrumbs() {
  const location = useLocation();
  let paths = location.pathname.split("/");
  console.log(paths);

  return (
    <div
      className="flex gap-2 items-center text-sm"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Home />
      {paths
        .filter((path) => path !== "")
        .map((path, index) => {
          if (index < paths.length - 2) {
            return (
              <NavLink
                to={`/${path}`}
                key={path}
                style={{ color: "#333", textDecoration: "none" }}
              >
                {path} /
              </NavLink>
            );
          }
          return (
            <NavLink
              to={`./${path}`}
              key={path}
              style={{ color: "#333", textDecoration: "none" }}
            >
              {path}
            </NavLink>
          );
        })}
    </div>
  );
}
