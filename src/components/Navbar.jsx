import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router";
import { Search, Bell, Menu, X } from "lucide-react";
import avatarLucas from "../assets/avatar-lucas.jpg";
import "./Navbar.css";

const links = [
  { to: "/", label: "Courses" },
  { to: "/progress", label: "My Learning" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <NavLink to="/" className="navbar__logo">nōta</NavLink>
        <div className="navbar__links">
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
      </div>

      <div className="navbar__right">
        <button className="navbar__icon" aria-label="Search"><Search size={18} /></button>
        <button className="navbar__icon" aria-label="Notifications"><Bell size={18} /></button>
        <Link to="/profile" className="navbar__avatar-link">
          <img src={avatarLucas} alt="Profile" className="navbar__avatar" />
        </Link>
        <button
          className="navbar__hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="navbar__overlay"
          aria-label="Close menu"
          role="button"
          tabIndex={0}
          onClick={() => setMenuOpen(false)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setMenuOpen(false); }}
        />
      )}

      <div className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            onClick={closeMenu}
            className={({ isActive }) => `navbar__mobile-link ${isActive ? "navbar__mobile-link--active" : ""}`}
          >
            {link.label}
          </NavLink>
        ))}
        <div className="navbar__mobile-divider" />
        <Link to="/profile" onClick={closeMenu} className="navbar__mobile-link">Profile</Link>
      </div>
    </nav>
  );
}
