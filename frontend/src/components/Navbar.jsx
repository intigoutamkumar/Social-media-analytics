import { useState } from "react"
import { NavLink } from "react-router-dom"
import {
  FaBars, FaTimes, FaChartPie, FaChartLine, FaFileAlt, FaBell, FaCog,
  FaInstagram, FaYoutube, FaFacebook, FaMoon, FaSun, FaSearch
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { useTheme } from "../context/themeState"
import { useNotification } from "../context/NotificationContext"

export default function Navbar({ user }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { count } = useNotification()
  const username = user?.username || "Sai"
  const email = user?.email || "sai@gmail.com"
  const initials = username.charAt(0).toUpperCase()

  const navItems = [
    { to: "/dashboard", icon: <FaChartPie size={13} />,  label: "Dashboard" },
    { to: "/analytics", icon: <FaChartLine size={13} />, label: "Analytics" },
    { to: "/reports",   icon: <FaFileAlt size={13} />,   label: "Reports"   },
    { to: "/schedule",  icon: <FaChartPie size={13} />,  label: "Schedule"  },
  ]

  const platforms = [
    { label: "Instagram", color: "#f97316", icon: <FaInstagram size={11} /> },
    { label: "YouTube",   color: "#ef4444", icon: <FaYoutube size={11} />   },
    { label: "X",         color: "#38bdf8", icon: <FaXTwitter size={11} />  },
    { label: "Facebook",  color: "#3b82f6", icon: <FaFacebook size={11} />  },
  ]

  return (
    <header className="navbar" role="banner">
      <div className="navbar-brand">
        <div style={{
          width: "34px", height: "34px", borderRadius: "10px",
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: "14px", color: "#fff",
        }}>{initials}</div>
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>{username}</div>
          <div style={{ fontSize: "10px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{email}</div>
        </div>
      </div>

      <button
        type="button"
        className="navbar-toggle"
        aria-expanded={mobileOpen}
        aria-label="Toggle navigation"
        onClick={() => setMobileOpen((open) => !open)}
      >
        {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      <nav className={`navbar-menu ${mobileOpen ? "open" : ""}`} aria-label="Primary navigation">
        <div className="navbar-menu-group">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.icon}{item.label}
            </NavLink>
          ))}
        </div>

        <div className="navbar-menu-group">
          {platforms.map(p => (
            <span key={p.label} className="navbar-link" style={{ color: p.color }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.color }} />
              {p.label}
            </span>
          ))}
        </div>

        <div className="navbar-actions">
          <div className="dashboard-search" style={{ width: "220px" }}>
            <FaSearch size={12} color="var(--text-muted)" />
            <input type="text" placeholder="Search analytics..." aria-label="Search analytics" />
          </div>

          <NavLink
            to="/notifications"
            className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
            onClick={() => setMobileOpen(false)}
            aria-label="Notifications"
            style={{ position: "relative" }}
          >
            <FaBell size={15} />
            {count !== null && (
              <span style={{
                position: "absolute", top: "5px", right: "6px",
                background: "#6366f1", color: "#fff", borderRadius: "100px",
                fontSize: "9px", padding: "1px 4px", fontWeight: 700, lineHeight: 1.4,
              }}>{count}</span>
            )}
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
            onClick={() => setMobileOpen(false)}
            aria-label="Settings"
          >
            <FaCog size={15} />
          </NavLink>

          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? "Switch to light" : "Switch to dark"}
            className="navbar-toggle"
            style={{ minWidth: "auto", padding: "0 12px" }}
          >
            {isDark ? <FaSun size={14} /> : <FaMoon size={14} />}
          </button>
        </div>
      </nav>
    </header>
  )
}