import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import SignUpPage from "./pages/SignUpPage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";
import Staff from "./pages/Staff";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="staff" element={<Staff />} />
      </Route>
    </Routes>
  );
}
