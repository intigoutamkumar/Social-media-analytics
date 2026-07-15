import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaSave, FaSignOutAlt, FaUserCog, FaLock, FaUser, FaEnvelope, FaTrash, FaPalette, FaMoon, FaSun } from "react-icons/fa"
import { getStoredUser } from "../utils/auth"
import API from "../services/api"
import { useTheme } from "../context/themeState"

export default function Settings() {
    const navigate = useNavigate()
    const { isDark, toggleTheme } = useTheme()
    const [user, setUser] = useState(() => getStoredUser())
    const [isSaving, setIsSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState("")

    const handleSave = async () => {
        setIsSaving(true)
        setSaveMessage("")

        const payload = {
            username: user.username,
            email: user.email
        }
        if (user.password) {
            payload.password = user.password
        }

        try {
            const response = await API.put("/accounts/profile/", payload)

            const updatedUser = {
                username: response.data.username,
                email: response.data.email
            }

            localStorage.setItem("user", JSON.stringify(updatedUser))
            setUser(updatedUser)
            setSaveMessage("Profile updated successfully")
        } catch (error) {
            setSaveMessage(error.response?.data?.error || "Failed to update profile")
        } finally {
            setIsSaving(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("username")
        localStorage.removeItem("email")
        navigate("/")
    }

    const deleteAccount = async () => {
        if (!confirm("Are you sure? This action cannot be undone.")) return

        try {
            await API.delete("/accounts/profile/")
            logout()
        } catch {
            console.error("Failed to delete account")
        }
    }

    return (
        <div className="fade-in-up">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Settings</h1>
                    <p className="page-subtitle">Manage your profile and preferences</p>
                </div>
            </div>

            <div className="settings-grid">
                <div className="panel" style={{ padding: "24px" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "24px",
                        paddingBottom: "20px",
                        borderBottom: "1px solid var(--border-soft)"
                    }}>
                        <div style={{
                            width: "48px", height: "48px", borderRadius: "14px",
                            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 800, fontSize: "18px", color: "#fff", flexShrink: 0
                        }}>
                            {(user?.username || "U").charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 style={{ fontWeight: 700, fontSize: "16px", margin: 0, color: "var(--text-primary)" }}>
                                {(user?.username) || "User"}
                            </h2>
                            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "2px 0 0" }}>
                                {(user?.email) || "user@example.com"}
                            </p>
                        </div>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
                            Profile Information
                        </h3>

                        <div style={{ marginBottom: "16px" }}>
                            <label className="form-label" htmlFor="settings-username">
                                Username
                            </label>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <FaUser size={14} color="var(--text-muted)" />
                                <input
                                    id="settings-username"
                                    type="text"
                                    className="form-control"
                                    style={{ flex: 1 }}
                                    value={user.username || ""}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <label className="form-label" htmlFor="settings-email">
                                Email Address
                            </label>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <FaEnvelope size={14} color="var(--text-muted)" />
                                <input
                                    id="settings-email"
                                    type="email"
                                    className="form-control"
                                    style={{ flex: 1 }}
                                    value={user.email || ""}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <label className="form-label" htmlFor="settings-password">
                                New Password
                            </label>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <FaLock size={14} color="var(--text-muted)" />
                                <input
                                    id="settings-password"
                                    type="password"
                                    className="form-control"
                                    style={{ flex: 1 }}
                                    placeholder="Leave blank to keep current password"
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {saveMessage && (
                        <div style={{
                            padding: "10px 12px",
                            borderRadius: "8px",
                            background: saveMessage.includes("success") ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                            color: saveMessage.includes("success") ? "#22c55e" : "#ef4444",
                            fontSize: "13px",
                            marginBottom: "16px"
                        }}>
                            {saveMessage}
                        </div>
                    )}

                    <button
                        type="button"
                        className="primary-action settings-action"
                        onClick={handleSave}
                        disabled={isSaving}
                        style={{ opacity: isSaving ? 0.7 : 1 }}
                    >
                        <FaSave size={13} />
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div className="panel" style={{ padding: "22px" }}>
                        <div className="panel-header">
                            <div>
                                <h2 style={{ fontSize: "15px", margin: 0 }}>Appearance</h2>
                            </div>
                            <div style={{
                                width: "32px", height: "32px", borderRadius: "8px",
                                background: "rgba(99,102,241,0.12)",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <FaPalette size={14} color="#818cf8" />
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{
                                width: "38px", height: "38px", borderRadius: "10px",
                                background: isDark ? "rgba(99,102,241,0.15)" : "rgba(251,191,36,0.15)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0
                            }}>
                                {isDark ? <FaMoon size={14} color="#818cf8" /> : <FaSun size={14} color="#f59e0b" />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                                    {isDark ? "Dark theme" : "Light theme"}
                                </div>
                                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                                    Toggle between light and dark mode
                                </div>
                            </div>
                            <button
                                onClick={toggleTheme}
                                style={{
                                    width: "44px", height: "24px", borderRadius: "999px",
                                    background: isDark ? "#6366f1" : "#94a3b8",
                                    border: "none", cursor: "pointer", position: "relative",
                                    transition: "background 0.2s"
                                }}
                            >
                                <span style={{
                                    position: "absolute", top: "2px",
                                    left: isDark ? "22px" : "2px",
                                    width: "20px", height: "20px",
                                    borderRadius: "50%", background: "#fff",
                                    transition: "left 0.2s"
                                }} />
                            </button>
                        </div>
                    </div>

                    <div className="panel" style={{ padding: "22px" }}>
                        <div className="panel-header">
                            <div>
                                <h2 style={{ fontSize: "15px", margin: 0 }}>Account Health</h2>
                                <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "2px 0 0" }}>
                                    Your account is active and secure
                                </p>
                            </div>
                            <div style={{
                                width: "32px", height: "32px", borderRadius: "8px",
                                background: "rgba(99,102,241,0.12)",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <FaUserCog size={14} color="#818cf8" />
                            </div>
                        </div>

                        <div className="recommendation-list">
                            <div>Keep your email current for report exports.</div>
                            <div>Use logout on shared devices to clear session.</div>
                            <div>Connect live APIs before production launch.</div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={logout}
                        style={{
                            width: "100%",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            border: "none",
                            borderRadius: "10px",
                            padding: "12px 16px",
                            background: "rgba(239,68,68,0.1)",
                            color: "#ef4444",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer"
                        }}
                    >
                        <FaSignOutAlt size={13} />
                        Logout
                    </button>

                    <button
                        type="button"
                        onClick={deleteAccount}
                        style={{
                            width: "100%",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            border: "1px solid rgba(239,68,68,0.3)",
                            borderRadius: "10px",
                            padding: "12px 16px",
                            background: "transparent",
                            color: "#ef4444",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        <FaTrash size={12} />
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}