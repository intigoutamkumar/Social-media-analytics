import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter } from "react-icons/fa"
import { FaGoogle } from "react-icons/fa6"
import { LogoOutline } from "./Logo"

export default function AuthLayout({ children }) {
    return (
        <div className="auth-bg">
            <div className="auth-grid">

                {/* Left Side - brand + hero copy */}
                <div className="auth-left">
                    <div style={{ maxWidth: 560 }}>

                        <Link
                            to="/"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                marginBottom: "3rem",
                                textDecoration: "none",
                            }}
                        >
                            <LogoOutline size={44} />
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}>
                                    <span style={{ color: "var(--text-primary)" }}>Social </span>
                                    <span style={{ color: "#e1306c" }}>Pulse</span>
                                </div>
                                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                                    Analytics Platform
                                </div>
                            </div>
                        </Link>

                        <h1 className="hero-title">
                            Grow Faster With{" "}
                            <span className="hero-gradient">Social Analytics</span>
                        </h1>

                        <p className="hero-subtitle">
                            Track Instagram, Facebook, YouTube and X growth
                            using polished demo dashboards and practical analytics.
                        </p>

                        <div style={{ display: "flex", gap: 16, marginTop: "2rem" }}>
                            <FaFacebook size={22} color="var(--text-muted)" />
                            <FaGoogle size={22} color="var(--text-muted)" />
                            <FaTwitter size={22} color="var(--text-muted)" />
                        </div>

                    </div>
                </div>

                {/* Right Side - auth card */}
                <div className="auth-right">
                    {children}
                </div>

            </div>
        </div>
    )
}
