import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Register() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const [name, setName] = useState("");
  const [hcmutEmail, setHcmutEmail] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [major, setMajor] = useState("");
  const [phone, setPhone] = useState("");
  const [gpa, setGpa] = useState("");
  const [subject, setSubject] = useState("");

  const [errors, setErrors] = useState({});

  const t = {
    en: {
      title: "Register",
      name: "Full name",
      hcmutEmail: "HCMUT Email (@hcmut.edu.vn)",
      personalEmail: "Personal Email",
      major: "Major",
      phone: "Phone number",
      gpa: "Current GPA (0.0–4.0)",
      subject: "Subject to be tutored",
      register: "Register",
      switchTo: "Tiếng Việt",
      backLogin: "Back to login",
      messages: {
        success: "Registration successful!",
        nameRequired: "Name is required.",
        hcmutRequired: "HCMUT email is required.",
        hcmutInvalid: "HCMUT email must end with @hcmut.edu.vn.",
        personalRequired: "Personal email is required.",
        personalInvalid: "Invalid personal email.",
        majorRequired: "Major is required.",
        phoneRequired: "Phone number is required.",
        phoneInvalid: "Invalid phone number.",
        gpaRequired: "GPA is required.",
        gpaInvalid: "GPA must be a number between 0 and 4.",
        subjectRequired: "Subject is required.",
      },
    },
    vi: {
      title: "Đăng ký",
      name: "Họ và tên",
      hcmutEmail: "Email HCMUT (@hcmut.edu.vn)",
      personalEmail: "Email cá nhân",
      major: "Ngành học",
      phone: "Số điện thoại",
      gpa: "GPA hiện tại (0.0–4.0)",
      subject: "Môn muốn được gia sư",
      register: "Đăng ký",
      switchTo: "English",
      backLogin: "Quay lại đăng nhập",
      messages: {
        success: "Đăng ký thành công!",
        nameRequired: "Vui lòng nhập họ và tên.",
        hcmutRequired: "Vui lòng nhập email HCMUT.",
        hcmutInvalid: "Email HCMUT phải kết thúc bằng @hcmut.edu.vn.",
        personalRequired: "Vui lòng nhập email cá nhân.",
        personalInvalid: "Email cá nhân không hợp lệ.",
        majorRequired: "Vui lòng nhập ngành học.",
        phoneRequired: "Vui lòng nhập số điện thoại.",
        phoneInvalid: "Số điện thoại không hợp lệ.",
        gpaRequired: "Vui lòng nhập GPA.",
        gpaInvalid: "GPA phải là số từ 0 đến 4.",
        subjectRequired: "Vui lòng nhập môn muốn được gia sư.",
      },
    },
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  const validate = () => {
    const errs = {};
    const emailRe = /^\S+@\S+\.\S+$/;
    const phoneRe = /^\+?[0-9\s\-()]{7,}$/;

    if (!name.trim()) errs.name = t[language].messages.nameRequired;

    if (!hcmutEmail.trim()) errs.hcmutEmail = t[language].messages.hcmutRequired;
    else if (!hcmutEmail.toLowerCase().endsWith("@hcmut.edu.vn"))
      errs.hcmutEmail = t[language].messages.hcmutInvalid;

    if (!personalEmail.trim()) errs.personalEmail = t[language].messages.personalRequired;
    else if (!emailRe.test(personalEmail)) errs.personalEmail = t[language].messages.personalInvalid;

    if (!major.trim()) errs.major = t[language].messages.majorRequired;

    if (!phone.trim()) errs.phone = t[language].messages.phoneRequired;
    else if (!phoneRe.test(phone)) errs.phone = t[language].messages.phoneInvalid;

    if (!gpa.trim()) errs.gpa = t[language].messages.gpaRequired;
    else {
      const val = parseFloat(gpa);
      if (Number.isNaN(val) || val < 0 || val > 4) errs.gpa = t[language].messages.gpaInvalid;
    }

    if (!subject.trim()) errs.subject = t[language].messages.subjectRequired;

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    const data = { name, hcmutEmail, personalEmail, major, phone, gpa: parseFloat(gpa), subject };
    localStorage.setItem("app_registration", JSON.stringify(data));
    alert(t[language].messages.success);
    navigate("/login");
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
            <label>{t[language].name}:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="" />
            {errors.name && <small style={{ color: "#dc2626" }}>{errors.name}</small>}
          </div>

          <div className="input-group">
            <label>{t[language].hcmutEmail}:</label>
            <input
              type="email"
              placeholder="@hcmut.edu.vn"
              value={hcmutEmail}
              onChange={(e) => setHcmutEmail(e.target.value)}
            />
            {errors.hcmutEmail && <small style={{ color: "#dc2626" }}>{errors.hcmutEmail}</small>}
          </div>

          <div className="input-group">
            <label>{t[language].personalEmail}:</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={personalEmail}
              onChange={(e) => setPersonalEmail(e.target.value)}
            />
            {errors.personalEmail && <small style={{ color: "#dc2626" }}>{errors.personalEmail}</small>}
          </div>

          <div className="input-group">
            <label>{t[language].major}:</label>
            <input value={major} onChange={(e) => setMajor(e.target.value)} placeholder="" />
            {errors.major && <small style={{ color: "#dc2626" }}>{errors.major}</small>}
          </div>

          <div className="input-group">
            <label>{t[language].phone}:</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+84 123 456 789" />
            {errors.phone && <small style={{ color: "#dc2626" }}>{errors.phone}</small>}
          </div>

          <div className="input-group">
            <label>{t[language].gpa}:</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              placeholder="e.g. 8.5"
            />
            {errors.gpa && <small style={{ color: "#dc2626" }}>{errors.gpa}</small>}
          </div>

          <div className="input-group">
            <label>{t[language].subject}:</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Calculus" />
            {errors.subject && <small style={{ color: "#dc2626" }}>{errors.subject}</small>}
          </div>

          <button type="submit" className="login-button">
            {t[language].register}
          </button>
        </form>

        <div className="bottom-row">
          <button className="lang-button" onClick={toggleLanguage}>
            {t[language].switchTo}
          </button>
          <Link to="/login" className="change-password-link">
            {t[language].backLogin}
          </Link>
        </div>
      </div>
    </div>
  );
}