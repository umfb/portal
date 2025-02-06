import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import SignUpPage from "./pages/SignUpPage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route index element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
