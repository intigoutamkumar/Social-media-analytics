import { NavLink } from "react-router-dom"
import {
  FaChartPie, FaChartLine, FaFileAlt, FaBell, FaCog,
  FaInstagram, FaYoutube, FaFacebook, FaMoon, FaSun
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { useTheme } from "../context/themeState"

export default function Sidebar({ user }) {
  const { isDark, toggleTheme } = useTheme()
  const username = user?.username || "Sai"
  const email = user?.email || "sai@gmail.com"
  const initials = username.charAt(0).toUpperCase()

  const navItems = [
    { to: "/dashboard", icon: <FaChartPie size={15} />, label: "Dashboard" },
    { to: "/analytics", icon: <FaChartLine size={15} />, label: "Analytics" },
    { to: "/reports", icon: <FaFileAlt size={15} />, label: "Reports" },
    { to: "/schedule", icon: <FaChartPie size={15} />, label: "Schedule" },
  ]

  const platforms = [
    { label: "Instagram", color: "#f97316", icon: <FaInstagram size={11} /> },
    { label: "YouTube", color: "#ef4444", icon: <FaYoutube size={11} /> },
    { label: "X / Twitter", color: "#38bdf8", icon: <FaXTwitter size={11} /> },
    { label: "Facebook", color: "#3b82f6", icon: <FaFacebook size={11} /> },
  ]

  const accountItems = [
    { to: "/notifications", icon: <FaBell size={14} />, label: "Notifications", badge: 3 },
    { to: "/settings", icon: <FaCog size={14} />, label: "Settings" },
  ]

  return (
    <div className="app-sidebar" style={{
      width: "240px",
      height: "100vh",
      background: "var(--sidebar-bg)",
      borderRight: "1px solid var(--border-soft)",
      display: "flex",
      flexDirection: "column",
      padding: "20px 16px",
      flexShrink: 0,
      overflowY: "auto",
      fontFamily: "'Inter', sans-serif",
      position: "sticky",
      top: 0
    }}>

      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid var(--border-soft)" }}>
        <div style={{
          width: "38px", height: "38px", borderRadius: "12px",
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: "15px", color: "#fff", flexShrink: 0
        }}>{initials}</div>
        <div style={{ overflow: "hidden" }}>
          <div style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{username}</div>
          <div style={{ color: "var(--text-muted)", fontSize: "11px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{email}</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "10px", color: "var(--text-subtle)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px", paddingLeft: "8px" }}>MAIN</div>
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "10px", marginBottom: "3px",
                background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                color: isActive ? "#818cf8" : "var(--text-muted)",
                fontSize: "13px", fontWeight: isActive ? 600 : 400,
                cursor: "pointer", transition: "all 0.15s"
              }}>
                {item.icon}
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* PLATFORMS */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "10px", color: "var(--text-subtle)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px", paddingLeft: "8px" }}>PLATFORMS</div>
        {platforms.map(p => (
          <div key={p.label} style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "9px 12px", borderRadius: "10px", marginBottom: "3px",
            color: "var(--text-muted)", fontSize: "13px", cursor: "pointer"
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            {p.label}
          </div>
        ))}
      </div>

      {/* ACCOUNT */}
      <div style={{ marginBottom: "auto" }}>
        <div style={{ fontSize: "10px", color: "var(--text-subtle)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px", paddingLeft: "8px" }}>ACCOUNT</div>
        {accountItems.map(item => (
          <NavLink key={item.to} to={item.to} style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "10px", marginBottom: "3px",
                background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                color: isActive ? "#818cf8" : "var(--text-muted)",
                fontSize: "13px", cursor: "pointer", position: "relative"
              }}>
                {item.icon}
                {item.label}
                {item.badge && (
                  <span style={{
                    marginLeft: "auto", background: "#6366f1", color: "#fff",
                    borderRadius: "100px", fontSize: "10px", padding: "1px 7px", fontWeight: 700
                  }}>{item.badge}</span>
                )}
              </div>
            )}
          </NavLink>
        ))}

        <button
          onClick={toggleTheme}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "9px 12px",
            borderRadius: "10px",
            marginTop: "8px",
            background: "var(--surface-muted)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            fontSize: "13px",
            cursor: "pointer"
          }}
        >
          {isDark ? <FaSun size={14} /> : <FaMoon size={14} />}
          {isDark ? "Light theme" : "Dark theme"}
        </button>
      </div>

      {/* Upgrade box */}
      <div style={{
        marginTop: "24px", padding: "16px", borderRadius: "14px",
        background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))",
        border: "1px solid rgba(99,102,241,0.2)"
      }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>Upgrade to Pro</div>
        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "12px" }}>Unlock AI content suggestions and advanced reporting.</div>
        <button style={{
          width: "100%", padding: "8px", borderRadius: "8px",
          background: "var(--surface-muted)", border: "1px solid var(--border-color)",
          color: "var(--text-primary)", fontSize: "12px", fontWeight: 600, cursor: "pointer"
        }}>Upgrade now</button>
      </div>
    </div>
  )
}

