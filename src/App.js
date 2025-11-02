import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Performance from "./pages/performance";
import Profile from "./pages/Profile";
import Register from "./pages/register";
import TutorDashboard from "./pages/TutorDashboard";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Redirect the root URL to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path ="/performance" element={<Performance />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/tutor" element={<TutorDashboard />} /> 
      </Routes>
    </Router>
  );
}
