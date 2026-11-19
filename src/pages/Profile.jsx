import { useState } from "react";
import { Download, Share2 } from "lucide-react";
import Badge from "../components/Badge";
import { courses } from "../data/courses";
import avatarLucas from "../assets/avatar-lucas.jpg";
import "./Profile.css";

const tabs = ["Certificates", "Account", "Preferences"];

const certificates = [
  { courseId: "marketing", date: "Nov 4, 2026" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Certificates");

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
          {certificates.map(({ courseId, date }) => {
            const course = courses.find((c) => c.id === courseId);
            return (
              <article key={courseId} className="certificate">
                <div className="certificate__bar" />
                <span className="certificate__label">Certificate of Completion</span>
                <h2 className="certificate__course">{course.title}</h2>
                <div className="certificate__info">
                  <span className="certificate__awarded">
                    Awarded to <strong>Pedro Costa</strong>
                  </span>
                  <span className="certificate__date">Completed on {date}</span>
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
        <div className="profile-section">
          <h2 className="profile-section__title">Account Settings</h2>
          <p className="profile-section__text">Coming soon.</p>
        </div>
      )}

      {activeTab === "Preferences" && (
        <div className="profile-section">
          <h2 className="profile-section__title">Preferences</h2>
          <p className="profile-section__text">Coming soon.</p>
        </div>
      )}
    </>
  );
}