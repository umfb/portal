import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import SignUpPage from "./pages/SignUpPage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";
import Staff from "./pages/Staff";
import Roles from "./pages/Roles";
import ResetPassword from "./pages/ResetPassword";
import Activities from "./pages/Activities";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="staff" element={<Staff />} />
        <Route path="roles" element={<Roles />} />
        <Route path="audit-log" element={<Activities />} />
      </Route>
      <Route path="reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
