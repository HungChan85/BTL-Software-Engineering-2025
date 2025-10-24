import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Redirect the root URL to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/home" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}
