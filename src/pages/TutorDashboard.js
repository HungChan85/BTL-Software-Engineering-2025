import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./TutorDashboard.css";
import Navbar from "../components/Navbar/Navbar";

const AVAIL_KEY = "tutor_availability_v1";
const HOURS = Array.from({ length: 24 }, (_, h) => h);
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function loadAvailability() {
  try {
    const raw = JSON.parse(localStorage.getItem(AVAIL_KEY) || "null");
    if (!raw) return Array.from({ length: 7 }, () => Array(24).fill(false));
    // Validate shape
    if (Array.isArray(raw) && raw.length === 7 && raw.every(d => Array.isArray(d) && d.length === 24)) {
      return raw.map(day => day.map(Boolean));
    }
    return Array.from({ length: 7 }, () => Array(24).fill(false));
  } catch {
    return Array.from({ length: 7 }, () => Array(24).fill(false));
  }
}
function saveAvailability(a) {
  localStorage.setItem(AVAIL_KEY, JSON.stringify(a));
}

// Format helpers
const pad = (n) => String(n).padStart(2, "0");
const hToLabel = (h) => `${pad(h)}:00`;
function compressRanges(day) {
  const ranges = [];
  let start = null;
  for (let h = 0; h < 24; h++) {
    if (day[h] && start === null) start = h;
    const endBlock = (!day[h] && start !== null) || (h === 23 && day[h]);
    if (endBlock) {
      const end = day[h] ? h + 1 : h; // end is exclusive
      ranges.push([start, end]);
      start = null;
    }
  }
  return ranges;
}

export default function TutorDashboard() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [availability, setAvailability] = useState(loadAvailability());
  const [dragging, setDragging] = useState(false);
  const [dragValue, setDragValue] = useState(true); // what value we’re painting
  const [lastPaint, setLastPaint] = useState({ day: -1, hour: -1 });

  useEffect(() => {
    const onUp = () => setDragging(false);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onUp);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onUp);
    };
  }, []);

  useEffect(() => {
    saveAvailability(availability);
  }, [availability]);

  const profile = useMemo(
    () => ({
      name: "Trần Văn B",
      role: "Tutor",
      email: "tv.b@example.com",
      avatar: process.env.PUBLIC_URL + "/assets/avt.png",
    }),
    []
  );

  const startDrag = (d, h) => {
    setDragging(true);
    const next = availability.map((row) => row.slice());
    const nextValue = !next[d][h];
    next[d][h] = nextValue;
    setDragValue(nextValue);
    setAvailability(next);
    setLastPaint({ day: d, hour: h });
  };

  const paintCell = (d, h) => {
    if (!dragging) return;
    if (lastPaint.day === d && lastPaint.hour === h) return;
    setAvailability((prev) => {
      const next = prev.map((row) => row.slice());
      next[d][h] = dragValue;
      return next;
    });
    setLastPaint({ day: d, hour: h });
  };

  const clearAll = () => setAvailability(Array.from({ length: 7 }, () => Array(24).fill(false)));
  const selectAll = () => setAvailability(Array.from({ length: 7 }, () => Array(24).fill(true)));
  const invertAll = () =>
    setAvailability((prev) => prev.map((day) => day.map((v) => !v)));

  return (
    <div className="dashboard-root">
      <Navbar language={language} setLanguage={setLanguage} />

      <main className="dashboard-main container-3col">
        {/* LEFT: Profile */}
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
                <div className="pstat-num">8</div>
                <div className="pstat-label">Students</div>
              </div>
              <div className="pstat">
                <div className="pstat-num">14</div>
                <div className="pstat-label">Sessions</div>
              </div>
              <div className="pstat">
                <div className="pstat-num">22</div>
                <div className="pstat-label">Hours</div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn-outline" onClick={() => navigate("/profile")}>Edit Profile</button>
              <button className="btn-primary" onClick={() => navigate("/home")}>Student View</button>
            </div>
          </div>
        </section>

        {/* CENTER: Availability Grid */}
        <section className="col col-center">
          <div className="card availability-card">
            <div className="card-head">
              <div className="card-title">Availability Planner</div>
              <div className="availability-actions">
                <button className="btn-outline" onClick={clearAll}>Clear</button>
                <button className="btn-outline" onClick={invertAll}>Invert</button>
                <button className="btn-primary" onClick={() => saveAvailability(availability)}>Save</button>
              </div>
            </div>

            <div className="avail-grid" onMouseUp={() => setDragging(false)}>
              {/* Corner empty cell */}
              <div className="avail-corner" />
              {/* Day headers */}
              {DAYS.map((d) => (
                <div key={d} className="avail-day-header">{d}</div>
              ))}
              {/* Hour rows */}
              {HOURS.map((h) => (
                <React.Fragment key={h}>
                  <div className="avail-hour-label">{hToLabel(h)}</div>
                  {DAYS.map((_, dIdx) => {
                    const active = availability[dIdx][h];
                    return (
                      <div
                        key={`${dIdx}-${h}`}
                        className={`avail-cell ${active ? "active" : ""}`}
                        onMouseDown={() => startDrag(dIdx, h)}
                        onMouseEnter={() => paintCell(dIdx, h)}
                        role="button"
                        aria-label={`${DAYS[dIdx]} ${hToLabel(h)} ${active ? "available" : "unavailable"}`}
                        tabIndex={0}
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            <div className="avail-legend">
              <span className="legend-box on" /> Available
              <span className="legend-box off" /> Unavailable
              <span className="legend-hint">Tip: click and drag to paint.</span>
            </div>
          </div>
        </section>

        {/* RIGHT: Summary */}
        <section className="col col-right">
          <div className="card upcoming-card">
            <div className="card-head">
              <div className="card-title">Weekly Summary</div>
            </div>
            <div className="availability-summary">
              {availability.map((day, idx) => {
                const ranges = compressRanges(day);
                return (
                  <div key={idx} className="summary-day">
                    <div className="summary-day-name">{DAYS[idx]}</div>
                    {ranges.length === 0 ? (
                      <div className="summary-empty">No availability</div>
                    ) : (
                      <div className="summary-ranges">
                        {ranges.map(([s, e], i) => (
                          <span key={i} className="summary-range">
                            {hToLabel(s)}–{hToLabel(e)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}