// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../components/Navbar/Navbar";

// localStorage helpers
const EVENTS_KEY = "app_events_v1";
const loadEvents = () => {
  try { return JSON.parse(localStorage.getItem(EVENTS_KEY) || "[]"); }
  catch { return []; }
};
const saveEvents = (events) => localStorage.setItem(EVENTS_KEY, JSON.stringify(events));

/* MiniCalendar component kept compact (center column) */
function MiniCalendar({ events }) {
  const [date, setDate] = useState(new Date());
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startWeekday = startOfMonth.getDay();
  const today = new Date();

  const prevMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const nextMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));

  // build 6x7 calendar cells
  const cells = [];
  const totalCells = 42;
  const firstDateToShow = new Date(startOfMonth);
  firstDateToShow.setDate(firstDateToShow.getDate() - startWeekday);

  for (let i = 0; i < totalCells; i++) {
    const cellDate = new Date(firstDateToShow);
    cellDate.setDate(firstDateToShow.getDate() + i);
    const iso = cellDate.toISOString().slice(0, 10);
    const hasEvent = events.some((ev) => ev.date === iso);
    cells.push({ date: cellDate, iso, hasEvent });
  }

  return (
    <div className="mini-calendar">
      <div className="mini-cal-header">
        <button className="cal-nav" onClick={prevMonth}>‹</button>
        <div className="mini-cal-title">{date.toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
        <button className="cal-nav" onClick={nextMonth}>›</button>
      </div>

      <div className="mini-weekdays">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="mini-weekday">{d}</div>
        ))}
      </div>

      <div className="mini-grid">
        {cells.map((c, i) => {
          const isThisMonth = c.date.getMonth() === date.getMonth();
          const isToday = c.date.toDateString() === today.toDateString();
          return (
            <div
              key={i}
              className={`mini-cell ${isThisMonth ? '' : 'mini-other'} ${isToday ? 'mini-today' : ''}`}
            >
              <div className="mini-day">{c.date.getDate()}</div>
              {c.hasEvent && <div className="mini-dot" aria-hidden />}
            </div>
          );
        })}
      </div>

      <div className="mini-footer">
        <Link to="/calendar" className="mini-open">Open full calendar</Link>
      </div>
    </div>
  );
}

/* Dashboard main component */
export default function Dashboard() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [events, setEvents] = useState(loadEvents());

  useEffect(() => { saveEvents(events); }, [events]);

  // Mock profile & feedbacks
  const profile = {
    name: "Nguyễn Văn A",
    role: "Student",
    email: "nv.a@example.com",
    avatar: process.env.PUBLIC_URL + "/assets/avt.png", 
  };

  const [feedbacks] = useState([
    { id: 1, tutor: "Dr. Binh", date: "2025-10-20", short: "Great progress on assignment 2. Keep practicing speaking.", details: "Student showed improvement in problem-solving. Suggest more exercises on recursion." },
    { id: 2, tutor: "Ms. Lan", date: "2025-10-25", short: "Revision needed on chapter 4.", details: "Focus on theorem proofs and practice additional past questions." },
  ]);

  // Upcoming events: next 6
  const upcoming = [...events]
    .sort((a,b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <div className="dashboard-root">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="dashboard-main container-3col">
        {/* LEFT: Profile Square */}
        <section className="col col-left">
          <div className="card profile-square">
            <img src={profile.avatar} alt="avatar" className="profile-avatar-large" />
            <div className="profile-main">
              <div className="profile-name">{profile.name}</div>
              <div className="profile-role">{profile.role}</div>
              <div className="profile-email">{profile.email}</div>
            </div>

            <div className="profile-stats-grid">
              <div className="pstat">
                <div className="pstat-num">3</div>
                <div className="pstat-label">Courses</div>
              </div>
              <div className="pstat">
                <div className="pstat-num">5</div>
                <div className="pstat-label">Tasks</div>
              </div>
              <div className="pstat">
                <div className="pstat-num">12</div>
                <div className="pstat-label">Hours</div>
              </div>
            </div>
            <div className="profile-actions">
              <button className="btn-outline">Edit Profile</button>
              <Link to="/courses" className="btn-primary">My Courses</Link>
            </div>
          </div>
        </section>

        {/* CENTER: Mini Calendar */}
            <section className="col col-center">
            <div className="card calendar-card">
                <MiniCalendar events={events} />
            </div>
            </section>


        {/* RIGHT: Upcoming Events (top) & Tutor Feedback (bottom) */}
        <section className="col col-right">
          <div className="card upcoming-card">
            <div className="card-head">
              <div className="card-title">Upcoming Events</div>
              <Link to="/calendar" className="small-link">Manage</Link>
            </div>

            {upcoming.length === 0 ? (
              <div className="empty">No upcoming events.</div>
            ) : (
              <div className="upcoming-list">
                {upcoming.map(ev => (
                  <div className="upcoming-item" key={ev.id}>
                    <div className="up-date">{ev.date}</div>
                    <div className="up-title">{ev.title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card feedback-card">
            <div className="card-head">
              <div className="card-title">Tutor Feedback</div>
              <div className="small-muted">Latest</div>
            </div>

            <div className="feedback-list">
              {feedbacks.map(f => (
                <div className="feedback-card-item" key={f.id}>
                  <div className="fb-left">
                    <div className="fb-tutor">{f.tutor}</div>
                    <div className="fb-date">{f.date}</div>
                  </div>
                  <div className="fb-right">
                    <div className="fb-short">{f.short}</div>
                    <div className="fb-details">{f.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
