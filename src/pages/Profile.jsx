import { useState, useEffect } from "react";
import { Download, Share2, ChevronDown, Trash2 } from "lucide-react";
import { courses } from "../data/courses";
import { getCertificates } from "../data/progress-store";
import avatarLucas from "../assets/avatar-lucas.jpg";
import "./Profile.css";

const tabs = ["Certificates", "Account", "Preferences"];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`toggle ${checked ? "toggle--on" : ""}`}
      onClick={onChange}
    >
      <span className="toggle__knob" />
    </button>
  );
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Certificates");

  /* Dynamic certificates from localStorage */
  const certificates = getCertificates();

  /* Account state */
  const [username, setUsername] = useState("Pedro Costa");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Europe/Lisbon (GMT+0)");

  /* Preferences state */
  const [emailNotif, setEmailNotif] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [marketing, setMarketing] = useState(false);

  /* Dark mode — synced to localStorage + document attribute.
     Defaults to OS preference when no saved value exists. */
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("nota_darkMode");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch { return false; }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    try { localStorage.setItem("nota_darkMode", String(darkMode)); }
    catch { /* ignore */ }
  }, [darkMode]);

  return (
    <>
      <div className="profile-header">
        <img src={avatarLucas} alt="Pedro Costa" className="profile-header__avatar" />
        <div>
          <h1 className="profile-header__name">Pedro Costa</h1>
          <p className="profile-header__email">pedro@nota.io</p>
        </div>
      </div>

      <div className="profile-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`badge ${tab === activeTab ? "badge--primary" : "badge--neutral"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Certificates" && (
        <div className="certificates">
          {certificates.length === 0 && (
            <p className="certificates__empty">
              Complete all lessons in a course to earn a certificate.
            </p>
          )}
          {certificates.map(({ courseId, completedDate }) => {
            const course = courses.find((c) => c.id === courseId);
            if (!course) return null;
            return (
              <article key={courseId} className="certificate">
                <div className="certificate__bar" />
                <span className="certificate__label">Certificate of Completion</span>
                <h2 className="certificate__course">{course.title}</h2>
                <div className="certificate__info">
                  <span className="certificate__awarded">
                    Awarded to <strong>Pedro Costa</strong>
                  </span>
                  <span className="certificate__date">Completed on {completedDate}</span>
                </div>
                <div className="certificate__divider" />
                <div className="certificate__actions">
                  <button className="btn btn--outline">
                    <Download size={14} />
                    Download PDF
                  </button>
                  <button className="btn btn--secondary">
                    <Share2 size={14} />
                    Share
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {activeTab === "Account" && (
        <div className="account">
          <div className="profile-section">
            <h2 className="profile-section__title">Account Settings</h2>

            <div className="form-fields">
              <label className="form-field">
                <span className="form-field__label">Username</span>
                <input
                  type="text"
                  className="form-field__input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>

              <label className="form-field">
                <span className="form-field__label">Email</span>
                <input
                  type="email"
                  className="form-field__input form-field__input--readonly"
                  value="pedro@nota.io"
                  readOnly
                />
              </label>

              <label className="form-field">
                <span className="form-field__label">Language</span>
                <div className="form-field__select-wrap">
                  <select
                    className="form-field__select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option>English</option>
                    <option>Português</option>
                    <option>Español</option>
                    <option>Français</option>
                  </select>
                  <ChevronDown size={16} className="form-field__chevron" />
                </div>
              </label>

              <label className="form-field">
                <span className="form-field__label">Timezone</span>
                <div className="form-field__select-wrap">
                  <select
                    className="form-field__select"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  >
                    <option>Europe/Lisbon (GMT+0)</option>
                    <option>Europe/London (GMT+0)</option>
                    <option>America/New_York (GMT-5)</option>
                    <option>America/Los_Angeles (GMT-8)</option>
                    <option>Asia/Tokyo (GMT+9)</option>
                  </select>
                  <ChevronDown size={16} className="form-field__chevron" />
                </div>
              </label>
            </div>

            <button className="btn btn--primary" style={{ marginTop: 8 }}>
              Save Changes
            </button>
          </div>

          <div className="danger-zone">
            <h3 className="danger-zone__title">Danger Zone</h3>
            <p className="danger-zone__text">
              Once you delete your account, there is no going back.
            </p>
            <button className="btn btn--danger">
              <Trash2 size={14} />
              Delete Account
            </button>
          </div>
        </div>
      )}

      {activeTab === "Preferences" && (
        <div className="preferences">
          <div className="profile-section">
            <h2 className="profile-section__title">Notifications</h2>

            <div className="toggle-row">
              <div className="toggle-row__text">
                <span className="toggle-row__label">Email Notifications</span>
                <span className="toggle-row__desc">Receive email about your course progress</span>
              </div>
              <Toggle checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
            </div>

            <div className="toggle-row__divider" />

            <div className="toggle-row">
              <div className="toggle-row__text">
                <span className="toggle-row__label">Course Updates</span>
                <span className="toggle-row__desc">Get notified when courses you follow are updated</span>
              </div>
              <Toggle checked={courseUpdates} onChange={() => setCourseUpdates(!courseUpdates)} />
            </div>

            <div className="toggle-row__divider" />

            <div className="toggle-row">
              <div className="toggle-row__text">
                <span className="toggle-row__label">Marketing</span>
                <span className="toggle-row__desc">Receive tips, product updates and promotions</span>
              </div>
              <Toggle checked={marketing} onChange={() => setMarketing(!marketing)} />
            </div>
          </div>

          <div className="profile-section">
            <h2 className="profile-section__title">Display</h2>

            <div className="toggle-row">
              <div className="toggle-row__text">
                <span className="toggle-row__label">Dark Mode</span>
                <span className="toggle-row__desc">Switch between light and dark theme</span>
              </div>
              <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
