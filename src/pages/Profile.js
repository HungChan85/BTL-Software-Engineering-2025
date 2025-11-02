import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";



const PROFILE_KEY = "app_profile_v1";

const defaultProfile = {
  name: "Nguyễn Văn A",
  email: "nv.a@gmail.com",
  phone: "0904363636",
  major: "Computer Science",
  address: "268 Lý Thường Kiệt, Phường 14, Quận 10, TP. Hồ Chí Minh",
  avatar: process.env.PUBLIC_URL + "/assets/avt.png",
};

// i18n dictionary
const t = {
  en: {
    title: "Profile Management",
    back: "Back",
    edit: "Edit",
    cancel: "Cancel",
    save: "Save",
    changeAvatar: "Change Avatar",
    noAvatar: "No Avatar",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone number",
      major: "Major",
      address: "Address",
    },
    placeholders: {
      name: "Your full name",
      email: "you@domain.com",
      phone: "+84 123 456 789",
      major: "Your major",
      address: "Street, City, Country",
    },
    errors: {
      nameRequired: "Name is required.",
      emailRequired: "Email is required.",
      invalidEmail: "Invalid email.",
      invalidPhone: "Invalid phone.",
    },
  },
  vi: {
    title: "Quản lý hồ sơ",
    back: "Quay lại",
    edit: "Chỉnh sửa",
    cancel: "Hủy",
    save: "Lưu",
    changeAvatar: "Đổi ảnh đại diện",
    noAvatar: "Chưa có ảnh",
    fields: {
      name: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại",
      major: "Ngành học",
      address: "Địa chỉ",
    },
    placeholders: {
      name: "Họ và tên đầy đủ",
      email: "ban@truong.edu.vn",
      phone: "+84 123 456 789",
      major: "Ngành học của bạn",
      address: "Số nhà, Phường/Xã, Quận/Huyện, Tỉnh/TP",
    },
    errors: {
      nameRequired: "Vui lòng nhập họ và tên.",
      emailRequired: "Vui lòng nhập email.",
      invalidEmail: "Email không hợp lệ.",
      invalidPhone: "Số điện thoại không hợp lệ.",
    },
  },
};

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) || defaultProfile;
  } catch {
    return defaultProfile;
  }
}
function saveProfile(p) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export default function Profile() {
  const navigate = useNavigate();
  const [lang, setLanguage] = useState("en");
  const [profile, setProfile] = useState(loadProfile());
  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => { setDraft(profile); }, [profile]);

  const startEdit = () => { setDraft(profile); setEditing(true); setErrors({}); };
  const cancelEdit = () => { setDraft(profile); setEditing(false); setErrors({}); };

  const onChange = (e) => {
    const { name, value } = e.target;
    setDraft((d) => ({ ...d, [name]: value }));
  };

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const next = {};
    if (!draft.name?.trim()) next.name = t[lang].errors.nameRequired;
    if (!draft.email?.trim()) next.email = t[lang].errors.emailRequired;
    else if (!/^\S+@\S+\.\S+$/.test(draft.email)) next.email = t[lang].errors.invalidEmail;
    if (draft.phone && !/^\+?[0-9\s\-()]{7,}$/.test(draft.phone)) next.phone = t[lang].errors.invalidPhone;
    return next;
  };

  const save = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setProfile(draft);
    saveProfile(draft);
    setEditing(false);
  };

  return (
    <>
    <div className="navbar-sticky">
        <Navbar language={lang} setLanguage={setLanguage} />
      </div>
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-card-head">
          <button className="btn-text" onClick={() => navigate(-1)}>← {t[lang].back}</button>
          <h2 className="title">{t[lang].title}</h2>
          {!editing ? (
            <button className="btn-primary" onClick={startEdit}>{t[lang].edit}</button>
          ) : (
            <div className="head-actions">
              <button className="btn-outline" onClick={cancelEdit}>{t[lang].cancel}</button>
              <button className="btn-primary" onClick={save}>{t[lang].save}</button>
            </div>
          )}
        </div>

        <form className="profile-form" onSubmit={save}>
          <div className="avatar-section">
            <div className="avatar-wrap">
              {draft.avatar ? (
                <img src={draft.avatar} alt="avatar" className="avatar-img" />
              ) : (
                <div className="avatar-placeholder">{t[lang].noAvatar}</div>
              )}
            </div>
            {editing && (
              <label className="btn-outline file-btn">
                {t[lang].changeAvatar}
                <input type="file" accept="image/*" onChange={onAvatarChange} hidden />
              </label>
            )}
          </div>

          <div className="fields-grid">
            <div className="field">
              <label>{t[lang].fields.name}</label>
              <input
                name="name"
                value={draft.name}
                onChange={onChange}
                disabled={!editing}
                placeholder={t[lang].placeholders.name}
              />
              {errors.name && <div className="err">{errors.name}</div>}
            </div>

            <div className="field">
              <label>{t[lang].fields.email}</label>
              <input
                name="email"
                type="email"
                value={draft.email}
                onChange={onChange}
                disabled={!editing}
                placeholder={t[lang].placeholders.email}
              />
              {errors.email && <div className="err">{errors.email}</div>}
            </div>

            <div className="field">
              <label>{t[lang].fields.phone}</label>
              <input
                name="phone"
                value={draft.phone}
                onChange={onChange}
                disabled={!editing}
                placeholder={t[lang].placeholders.phone}
              />
              {errors.phone && <div className="err">{errors.phone}</div>}
            </div>

            <div className="field">
              <label>{t[lang].fields.major}</label>
              <input
                name="major"
                value={draft.major}
                onChange={onChange}
                disabled={!editing}
                placeholder={t[lang].placeholders.major}
              />
            </div>

            <div className="field span-2">
              <label>{t[lang].fields.address}</label>
              <input
                name="address"
                value={draft.address}
                onChange={onChange}
                disabled={!editing}
                placeholder={t[lang].placeholders.address}
              />
            </div>
          </div>

          {editing && (
            <div className="form-actions">
              <button type="button" className="btn-outline" onClick={cancelEdit}>{t[lang].cancel}</button>
              <button type="submit" className="btn-primary">{t[lang].save}</button>
            </div>
          )}
        </form>
      </div>
    </div>
    </>
  );
}