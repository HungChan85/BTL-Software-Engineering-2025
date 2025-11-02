// src/components/Chat/ChatPanel.js
import React, { useState } from "react";
import "./ChatPanel.css";

export default function ChatPanel({ onClose }) {
  const [selectedTutor, setSelectedTutor] = useState(null);

  // Mock tutor data
  const tutors = [
    {
      id: 1,
      name: "Dr. Binh",
      avatar: "https://i.pravatar.cc/100?img=12",
      lastMessage: "Keep practicing speaking!",
    },
    {
      id: 2,
      name: "Ms. Lan",
      avatar: "https://i.pravatar.cc/100?img=32",
      lastMessage: "Review chapter 4 again.",
    },
    {
      id: 3,
      name: "Mr. Khoa",
      avatar: "https://i.pravatar.cc/100?img=45",
      lastMessage: "Assignment due Friday.",
    },
  ];

  // Temporary mock chat messages for UI
  const messages = [
    { from: "tutor", text: "Hello! How can I help you today?" },
    { from: "me", text: "I need help with exercise 3." },
    { from: "tutor", text: "Sure, let's review it together." },
  ];

  return (
    <>
      {/* Overlay that closes when clicked */}
      <div className="chat-overlay" onClick={onClose}></div>

      <div className="chat-panel">
        {/* Top Bar */}
        <div className="chat-header">
          {selectedTutor ? (
            <>
              <button className="back-btn" onClick={() => setSelectedTutor(null)}>←</button>
              <img src={selectedTutor.avatar} alt="tutor" className="chat-avatar" />
              <div className="chat-tutor-info">
                <div className="chat-tutor-name">{selectedTutor.name}</div>
                <div className="chat-status">Online</div>
              </div>
            </>
          ) : (
            <div className="chat-title">Tutors</div>
          )}

          <button className="chat-close-btn" onClick={onClose}>✖</button>
        </div>

        {/* Tutor List (Left view) */}
        {!selectedTutor && (
          <div className="tutor-list">
            {tutors.map((tutor) => (
              <div
                key={tutor.id}
                className="tutor-item"
                onClick={() => setSelectedTutor(tutor)}
              >
                <img src={tutor.avatar} alt="avatar" className="tutor-avatar" />
                <div className="tutor-info">
                  <div className="tutor-name">{tutor.name}</div>
                  <div className="tutor-last">{tutor.lastMessage}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chat Messages View */}
        {selectedTutor && (
          <div className="chat-body">
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-msg ${msg.from === "me" ? "from-me" : "from-tutor"}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="chat-input-area">
              <input type="text" placeholder="Type a message..." disabled />
              <button className="send-btn" disabled>➤</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
