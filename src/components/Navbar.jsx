import { NavLink, Link } from "react-router";
import { Search, Bell } from "lucide-react";
import avatarLucas from "../assets/avatar-lucas.jpg";
import "./Navbar.css";

const links = [
  { to: "/", label: "Courses" },
  { to: "/progress", label: "My Learning" },
  { to: "/community", label: "Community" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <NavLink to="/" className="navbar__logo">nōta</NavLink>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="navbar__right">
        <button className="navbar__icon" aria-label="Search"><Search size={18} /></button>
        <button className="navbar__icon" aria-label="Notifications"><Bell size={18} /></button>
        <Link to="/profile">
            <img src={avatarLucas} alt="Profile" className="navbar__avatar" />
        </Link>
      </div>
    </nav>
  );
}