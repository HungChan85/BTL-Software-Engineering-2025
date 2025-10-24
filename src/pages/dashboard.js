import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; 


export default function Dashboard() {
  const navigate = useNavigate();


  const [role, setRole] = useState(localStorage.getItem('userRole') || 'student');
  const [language, setLanguage] = useState("en"); // 🌍 Language state

  const handleLogout = () => {
    navigate("/");
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  // --- Translation Object ---
  const t = {
    en: {
      logout: "Logout",
      switchTo: "Tiếng Việt",
      studentDashboard: "Student Dashboard",
      tutorDashboard: "Tutor Dashboard",
      adminDashboard: "Admin Dashboard",
      // Student
      appointments: "Upcoming Appointments",
      newMessages: "New Messages",
      newFeedback: "New Feedback",
      pendingRequests: "Pending Requests",
      // Tutor
      pendingStudents: "Pending Student Requests",
      actionItems: "Action Items",
      submitFeedback: "Submit Session Feedback",
      // Admin
      keyStats: "Key Statistics",
      activeStudents: "Active Students",
      activeTutors: "Active Tutors",
      programActivity: "Program Activity",
      pendingApprovals: "Pending Tutor Approvals",
      // Dummy Data
      dummyDate: "Mon, Oct 27 @ 10:00 AM",
      dummyMsgCount: "2 New Messages",
      dummyFeedback: "Feedback for Math 101 available",
      dummyPending: "Request for Dr. Binh is pending",
      dummyStudents: "3 new requests",
      dummyAction: "2 sessions need feedback",
      dummyStatStudent: "85 Students",
      dummyStatTutor: "12 Tutors",
      dummyActivity: "34 sessions this week",
      dummyApproval: "1 new tutor application",
    },
    vi: {
      logout: "Đăng xuất",
      switchTo: "English",
      studentDashboard: "Bảng điều khiển (Sinh viên)",
      tutorDashboard: "Bảng điều khiển (Gia sư)",
      adminDashboard: "Bảng điều khiển (Quản trị)",
      // Student
      appointments: "Lịch hẹn sắp tới",
      newMessages: "Tin nhắn mới",
      newFeedback: "Phản hồi mới",
      pendingRequests: "Yêu cầu đang chờ",
      // Tutor
      pendingStudents: "Yêu cầu từ sinh viên",
      actionItems: "Việc cần làm",
      submitFeedback: "Gửi phản hồi buổi học",
      // Admin
      keyStats: "Thống kê chính",
      activeStudents: "Số sinh viên",
      activeTutors: "Số gia sư",
      programActivity: "Hoạt động chương trình",
      pendingApprovals: "Duyệt gia sư mới",
      // Dummy Data
      dummyDate: "Thứ 2, 27/10 @ 10:00",
      dummyMsgCount: "2 tin nhắn mới",
      dummyFeedback: "Đã có phản hồi cho môn Toán 101",
      dummyPending: "Yêu cầu cho TS. Bình đang chờ",
      dummyStudents: "3 yêu cầu mới",
      dummyAction: "2 buổi học cần phản hồi",
      dummyStatStudent: "85 Sinh viên",
      dummyStatTutor: "12 Gia sư",
      dummyActivity: "34 buổi học tuần này",
      dummyApproval: "1 đơn đăng ký gia sư mới",
    },
  };


  const StudentDashboard = () => (
    <>
      <h2 className="dashboard-title">{t[language].studentDashboard}</h2>
      <div className="widget-grid">
        <div className="widget-card">
          <h3 className="widget-title">{t[language].appointments}</h3>
          <p className="widget-data-list">{t[language].dummyDate}</p>
        </div>
        <div className="widget-card">
          <h3 className="widget-title">{t[language].newMessages}</h3>
          <p className="widget-data highlight">{t[language].dummyMsgCount}</p>
        </div>
        <div className="widget-card">
          <h3 className="widget-title">{t[language].newFeedback}</h3>
          <p className="widget-data-list">{t[language].dummyFeedback}</p>
        </div>
        <div className="widget-card">
          <h3 className="widget-title">{t[language].pendingRequests}</h3>
          <p className="widget-data">{t[language].dummyPending}</p>
        </div>
      </div>
    </>
  );

  const TutorDashboard = () => (
    <>
      <h2 className="dashboard-title">{t[language].tutorDashboard}</h2>
      <div className="widget-grid">
        <div className="widget-card priority">
          <h3 className="widget-title">{t[language].pendingStudents}</h3>
          <p className="widget-data highlight">{t[language].dummyStudents}</p>
        </div>
        <div className="widget-card priority">
          <h3 className="widget-title">{t[language].actionItems}</h3>
          <p className="widget-data-list">{t[language].submitFeedback}:</p>
          <p className="widget-data highlight-secondary">
            {t[language].dummyAction}
          </p>
        </div>
        <div className="widget-card">
          <h3 className="widget-title">{t[language].appointments}</h3>
          <p className="widget-data-list">{t[language].dummyDate}</p>
        </div>
        <div className="widget-card">
          <h3 className="widget-title">{t[language].newMessages}</h3>
          <p className="widget-data highlight">{t[language].dummyMsgCount}</p>
        </div>
      </div>
    </>
  );


  return (
    <div className="dashboard-container">
      {/* === Navigation Bar === */}
      <nav className="dashboard-nav">
        <img
          src="https://lms.hcmut.edu.vn/pluginfile.php/3/core_admin/logo/0x200/1761124161/logoBK.png"
          alt="logo-img"
          className="dashboard-logo"
        />
        
        <div className="nav-right">
          <button className="lang-button-nav" onClick={toggleLanguage}>
            {t[language].switchTo}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            {t[language].logout}
          </button>
        </div>
        

      </nav>

      {/* === Main Content Area === */}
      <main className="dashboard-content">

        


        {role === "student" && <StudentDashboard />}
        {role === "tutor" && <TutorDashboard />}
      </main>
    </div>
  );
}