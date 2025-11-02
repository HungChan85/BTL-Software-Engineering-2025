import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("en"); // 🌍 Language state

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      alert(
        language === "en"
          ? `Logged in as ${role}`
          : `Đăng nhập thành công với vai trò ${role === "student" ? "học sinh" : "gia sư"}`
      );
      navigate("/home");
    } else {
      alert(language === "en" ? "Please fill in all fields." : "Vui lòng điền đầy đủ thông tin.");
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  const t = {
    en: {
      title: "Login",
      email: "Email (@hcmut.edu.vn)",
      password: "Password",
      role: "Role",
      student: "Student",
      tutor: "Tutor",
      login: "Login",
      switchTo: "Tiếng Việt",
      register: "Đăng ký",
    },
    vi: {
      title: "Đăng nhập",
      email: "Email (@hcmut.edu.vn)",
      password: "Mật khẩu",
      role: "Vai trò",
      student: "Học sinh",
      tutor: "Gia sư",
      login: "Đăng nhập",
      switchTo: "English",
      register: "Register",
    },
  };

  return (
    <div className="login-container">
      <div className="login-box">
          <div className="login-header">
            <img
              src="https://lms.hcmut.edu.vn/pluginfile.php/3/core_admin/logo/0x200/1761124161/logoBK.png"
              alt="logo-img"
              className="logo-login"
            />
            <h2 className="login-title">{t[language].title}</h2>
          </div>


        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>{t[language].email}:</label>
            <input
              type="email"
              placeholder="@hcmut.edu.vn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>{t[language].password}:</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>{t[language].role}:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">{t[language].student}</option>
              <option value="tutor">{t[language].tutor}</option>
            </select>
          </div>

          <button type="submit" className="login-button" onClick={handleSubmit}>
            {t[language].login}
          </button>
        </form>

        {/* Bottom Row: Language + Change Password */}
        <div className="bottom-row">
          <button className="lang-button" onClick={toggleLanguage}>
            {t[language].switchTo}
          </button>

          <a href="#" onClick={(e) => {navigate("/register"); }} className="change-password-link">
            {t[language].register}
          </a>
        </div>
      </div>
    </div>
  );
}
