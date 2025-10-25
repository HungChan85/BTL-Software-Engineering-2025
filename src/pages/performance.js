import React, { useState } from "react";
import "./Performance.css";

// Mock data simulating an API response
const mockData = {
  student: { name: "Nguyen Van An", id: "2352359" },
  course: { name: "Software Engineering", code: "CO3001" },
  overallGrade: 7,
  classRank: 12,
  classSize: 80,
  attendance: "95%",
  grades: [
    { id: 1, name: "Homework 1", score: "10/10", weight: "5%" },
    { id: 2, name: "Homework 2", score: "8/10", weight: "5%" },
    { id: 3, name: "Midterm Exam", score: "85/100", weight: "30%" },
    { id: 4, name: "Final Project", score: "90/100", weight: "40%" },
    { id: 5, name: "Final Exam", score: "80/100", weight: "20%" },
  ],
};

export default function Performance() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  const t = {
    en: {
      title: "Performance Summary",
      studentName: "Student",
      studentId: "Student ID",
      course: "Course",
      overallGrade: "Overall Grade",
      classRank: "Class Rank",
      attendance: "Attendance",
      gradeBreakdown: "Grade Breakdown",
      assessment: "Assessment",
      score: "Score",
      weight: "Weight",
      switchTo: "Tiếng Việt",
      changeView: "View Details",
      logoAlt: "BKU Logo",
    },
    vi: {
      title: "Tổng kết học tập",
      studentName: "Họ và tên",
      studentId: "MSSV",
      course: "Môn học",
      overallGrade: "Điểm tổng kết",
      classRank: "Xếp hạng",
      attendance: "Chuyên cần",
      gradeBreakdown: "Bảng điểm",
      assessment: "Bài tập/Thi",
      score: "Điểm",
      weight: "Trọng số",
      switchTo: "English",
      changeView: "Xem chi tiết",
      logoAlt: "Logo BKU",
    },
  };

  const { student, course, overallGrade, classRank, classSize, attendance, grades } = mockData;

  // Small presentational components — kept inline for simplicity (like login.js)
  const Header = () => (
    <div className="perf-header">
      <div className="perf-header-left">
        <img
          src="https://lms.hcmut.edu.vn/pluginfile.php/3/core_admin/logo/0x200/1761124161/logoBK.png"
          alt={t[language].logoAlt}
          className="perf-logo"
        />
        <h2 className="perf-title">{t[language].title}</h2>
      </div>

      <div className="perf-header-right">
        <button className="perf-lang-btn" onClick={toggleLanguage}>
          {t[language].switchTo}
        </button>
      </div>
    </div>
  );

  const InfoCard = () => (
    <div className="perf-card perf-info">
      <div>
        <label className="perf-label">{t[language].studentName}</label>
        <div className="perf-value">{student.name}</div>
      </div>
      <div>
        <label className="perf-label">{t[language].studentId}</label>
        <div className="perf-value">{student.id}</div>
      </div>
      <div className="perf-course">
        <label className="perf-label">{t[language].course}</label>
        <div className="perf-value">{course.name} ({course.code})</div>
      </div>
    </div>
  );

  const OverallGrade = () => {
    const percentage = (overallGrade / 10) * 100;
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="perf-overall">
        <svg viewBox="0 0 100 100" className="perf-circle">
          <circle cx="50" cy="50" r="40" className="perf-circle-bg" strokeWidth="8" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="40"
            className="perf-circle-fg"
            strokeWidth="8"
            fill="none"
            style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="perf-overall-text">
          <div className="perf-grade">{overallGrade.toFixed(2)}</div>
          <div className="perf-sub">/ 10.00</div>
        </div>
      </div>
    );
  };

  const GradesTable = () => (
    <div className="perf-card perf-table">
      <h3 className="perf-section-title">{t[language].gradeBreakdown}</h3>
      <table className="perf-table-el">
        <thead>
          <tr>
            <th>{t[language].assessment}</th>
            <th>{t[language].score}</th>
            <th>{t[language].weight}</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr key={g.id}>
              <td>{g.name}</td>
              <td>{g.score}</td>
              <td>{g.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="perf-page">
      <Header />

      <main className="perf-main">
        <div className="perf-grid">
          <div className="perf-left">
            <InfoCard />
            <GradesTable />
          </div>

          <aside className="perf-right">
            <div className="perf-card perf-overall-card">
              <h3 className="perf-section-title">{t[language].overallGrade}</h3>
              <OverallGrade />
            </div>

            <div className="perf-card perf-stat">
              <label className="perf-label">{t[language].classRank}</label>
              <div className="perf-value">{classRank} / {classSize}</div>
            </div>

            <div className="perf-card perf-stat">
              <label className="perf-label">{t[language].attendance}</label>
              <div className="perf-value">{attendance}</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
