// src/components/Navbar/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ language, setLanguage }) {
  const navigate = useNavigate();

  const toggleLanguage = () => {
    if (setLanguage) setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="dashboard-nav">
      <div className="nav-left">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/performance" className="nav-link">View Performance</Link>
      </div>

      <div className="nav-right">
        {setLanguage && (
          <button className="nav-lang" onClick={toggleLanguage}>
            {language === "en" ? "Tiếng Việt" : "English"}
          </button>
        )}
        <button className="nav-logout" onClick={handleLogout}>
          {language === "en" ? "Logout" : "Đăng xuất"}
        </button>
      </div>
    </nav>
  );
}
