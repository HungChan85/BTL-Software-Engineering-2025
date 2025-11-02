// src/components/Navbar/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import ChatPanel from "../Chat/ChatPanel";   // ⬅️ Import ChatPanel
import "./Navbar.css";                       // your existing CSS

export default function Navbar({ language, setLanguage }) {
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();
  const toggleLanguage = () => {
    setLanguage(prev => (prev === "en" ? "vi" : "en"));
  };

  return (
    <>
      <nav className="dashboard-nav">

        <div className="nav-left">
          <img src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-Bach-Khoa-HCMUT.png" alt="logo" className="nav-logo" />

          <div>
            <div className="brand-title">BKU Private Tutor</div>
            <div className="brand-sub">{language === "en" ? "Student Dashboard" : "Trang học tập"}</div>
          </div>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/performance" className="nav-link">Performance</Link>
          {/* Navigation links if you add them later */}
        </div>

        <div className="nav-right">

          {/* 💬 Chat Icon Button */}
          <button
            className="nav-chat-btn"
            onClick={() => setChatOpen(true)}
            title={language === "en" ? "Chat" : "Trò chuyện"}
          >
            {/* Custom SVG Chat Bubble */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 8.7 3.9 8.38 8.38 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8.5z" />
            </svg>
          </button>

          {/* 🌍 Language button (already existed) */}
          <button className="nav-lang" onClick={toggleLanguage}>
            {language === "en" ? "EN" : "VI"}
          </button>

          {/* 🔴 Logout button */}
          <button className="nav-logout" onClick={() => navigate("/login")}>
            {language === "en" ? "Logout" : "Đăng xuất"}
          </button>
        </div>
      </nav>

      {/* Render Chat Panel if open */}
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </>
  );
}
