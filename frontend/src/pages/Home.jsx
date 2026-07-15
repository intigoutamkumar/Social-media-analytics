import { useState } from "react"
import { Link } from "react-router-dom"
import { LogoOutline } from "../components/Logo"

function ArrowRightIcon({ size = 14, color = "currentColor" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m14 5 7 7-7 7" />
        </svg>
    )
}

function PlayIcon({ size = 12, color = "currentColor" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 5v14l11-7z" fill={color} />
        </svg>
    )
}

function TrendingUpIcon({ size = 14, color = "currentColor" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 16 9 11 13 15 20 8" />
            <path d="M20 8v6h-6" />
        </svg>
    )
}



export default function Home() {
    const [isDemoOpen, setIsDemoOpen] = useState(false)

    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--app-bg)",
            color: "var(--text-primary)",
            fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            overflow: "hidden"
        }}>

            {/* Background glows */}
            <div style={{
                position: "fixed", inset: 0,
                pointerEvents: "none", zIndex: 0,
                background: `
                    radial-gradient(ellipse 60% 50% at 10% 20%, rgba(99,102,241,0.12) 0%, transparent 70%),
                    radial-gradient(ellipse 50% 40% at 85% 70%, rgba(168,85,247,0.10) 0%, transparent 70%),
                    radial-gradient(ellipse 40% 30% at 60% 10%, rgba(6,182,212,0.06) 0%, transparent 60%)
                `
            }} />

            {/* Navbar */}
            <nav
                className="home-nav"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 48px",
                    borderBottom: "1px solid var(--border-soft)",
                    position: "relative", zIndex: 10,
                    backdropFilter: "blur(10px)"
                }}
            >

                {/* Logo */}
                <div className="fade-in-left" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <LogoOutline size={44} />

                    <div>
                        <div style={{
                            fontWeight: 700,
                            fontSize: "17px",
                            letterSpacing: "-0.3px",
                            lineHeight: 1.2
                        }}>
                            <span style={{ color: "var(--text-primary)" }}>Social </span>
                            <span style={{ color: "#e1306c" }}>Pulse</span>
                        </div>
                        <div style={{
                            fontSize: "11px",
                            color: "var(--text-muted)"
                        }}>
                            Analytics Platform
                        </div>
                    </div>
                </div>

                {/* Nav links */}
                <div
                    className="home-nav-links"
                    style={{ display: "flex", gap: "36px", alignItems: "center" }}
                >
                    {["Features", "Pricing", "Docs"].map(l => (
                        <a
                            key={l}
                            href={`#${l.toLowerCase()}`}
                            style={{
                                color: "var(--text-secondary)",
                                textDecoration: "none",
                                fontSize: "15px"
                            }}
                        >
                            {l}
                        </a>
                    ))}
                </div>

                {/* Buttons */}
                <div
                    className="home-nav-actions"
                    style={{ display: "flex", gap: "12px" }}
                >
                    <Link
                        to="/login"
                        style={{
                            padding: "9px 24px",
                            borderRadius: "10px",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "var(--text-primary)",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: 500,
                            background: "rgba(255,255,255,0.04)"
                        }}
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        style={{
                            padding: "9px 24px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                            color: "#fff",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: 600,
                            boxShadow: "0 4px 15px rgba(99,102,241,0.3)"
                        }}
                    >
                        Get Started
                    </Link>
                </div>

            </nav>

            {/* Hero */}
            <div
                className="home-hero"
                style={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: "calc(100vh - 85px)",
                    padding: "0 48px",
                    position: "relative", zIndex: 1,
                    maxWidth: "1400px",
                    margin: "0 auto",
                    gap: "60px"
                }}
            >

                {/* Left copy */}
                <div className="home-hero-copy fade-in-left" style={{ flex: "0 0 50%" }}>

                    {/* Badge */}
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "7px 18px",
                        borderRadius: "100px",
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.2)",
                        marginBottom: "28px"
                    }}>
                        <div style={{
                            width: "8px", height: "8px",
                            borderRadius: "50%",
                            background: "#6366f1"
                        }} />
                        <span style={{ fontSize: "13px", color: "#a5b4fc" }}>
                            Demo Analytics Workspace
                        </span>
                    </div>

                    {/* Heading */}
                    <h1
                        className="home-hero-title"
                        style={{
                            fontSize: "62px",
                            fontWeight: 800,
                            lineHeight: 1.1,
                            margin: "0 0 24px",
                            letterSpacing: "-2px"
                        }}
                    >
                        Track Your<br />
                        <span style={{
                            background: "linear-gradient(90deg,#818cf8,#c084fc,#f472b6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            Social Growth
                        </span><br />
                        Intelligently
                    </h1>

                    {/* Sub */}
                    <p style={{
                        fontSize: "17px",
                        color: "var(--text-muted)",
                        lineHeight: 1.8,
                        maxWidth: "440px",
                        marginBottom: "40px"
                    }}>
                        Monitor Instagram, Facebook, YouTube and X with
                        realistic demo dashboards. Explore insights that
                        show how creators can grow.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="home-cta-row"
                        style={{ display: "flex", gap: "16px", marginBottom: "48px" }}
                    >
                        <Link
                            to="/register"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "14px 32px",
                                borderRadius: "12px",
                                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                color: "#fff",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "15px",
                                boxShadow: "0 8px 25px rgba(99,102,241,0.35)"
                            }}
                        >
                            Get Started <ArrowRightIcon />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setIsDemoOpen(true)}
                            style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "14px 32px",
                            borderRadius: "12px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "var(--text-primary)",
                            fontWeight: 600,
                            fontSize: "15px",
                            cursor: "pointer"
                        }}>
                            <PlayIcon /> Watch Demo
                        </button>
                    </div>

                    {/* Works with */}
                    <div
                        className="home-platform-row"
                        style={{ display: "flex", alignItems: "center", gap: "16px" }}
                    >
                        <span style={{ fontSize: "13px", color: "var(--text-subtle)" }}>
                            Works with
                        </span>
                        {[
                            { label: "IG", bg: "linear-gradient(135deg,#f97316,#ec4899,#8b5cf6)" },
                            { label: "YT", bg: "#ef4444" },
                            { label: "X", bg: "#000" },
                            { label: "FB", bg: "#1d4ed8" },
                        ].map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    width: "38px", height: "38px",
                                    borderRadius: "10px",
                                    background: s.bg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "var(--text-primary)",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em"
                                }}
                            >
                                {s.label}
                            </div>
                        ))}
                    </div>

                </div>

                {/* Dashboard preview card */}
                <div className="home-preview fade-in-right" style={{ flex: "0 0 46%" }}>
                    <div style={{
                        background: "var(--surface-raised)",
                        borderRadius: "24px",
                        border: "1px solid var(--border-color)",
                        padding: "28px",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 40px 80px var(--shadow-color)"
                    }}>

                        {/* Card header */}
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px"
                        }}>
                            <span style={{ fontWeight: 700, fontSize: "16px" }}>
                                Dashboard Preview
                            </span>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "5px 12px",
                                borderRadius: "100px",
                                background: "rgba(99,102,241,0.15)",
                                border: "1px solid rgba(99,102,241,0.3)"
                            }}>
                                <div style={{
                                    width: "7px", height: "7px",
                                    borderRadius: "50%",
                                    background: "#818cf8"
                                }} />
                                <span style={{ fontSize: "12px", color: "#a5b4fc" }}>
                                    Live
                                </span>
                            </div>
                        </div>

                        {/* Stats row */}
                        <div
                            className="home-preview-stats"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "12px",
                                marginBottom: "20px"
                            }}
                        >
                            {[
                                {
                                    label: "Followers",
                                    value: "49K",
                                    sub: "+17.5% this month",
                                    subColor: "#22c55e"
                                },
                                {
                                    label: "Engagement",
                                    value: "8.5%",
                                    sub: "+2.1% this week",
                                    subColor: "#22c55e"
                                },
                            ].map((s, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: "18px",
                                        borderRadius: "16px",
                                        background: "var(--surface-muted)",
                                        border: "1px solid var(--border-soft)"
                                    }}
                                >
                                    <div style={{
                                        fontSize: "12px",
                                        color: "var(--text-muted)",
                                        marginBottom: "6px"
                                    }}>
                                        {s.label}
                                    </div>
                                    <div style={{
                                        fontSize: "26px",
                                        fontWeight: 800,
                                        letterSpacing: "-1px"
                                    }}>
                                        {s.value}
                                    </div>
                                    <div style={{
                                        fontSize: "12px",
                                        color: s.subColor,
                                        marginTop: "4px"
                                    }}>
                                        {s.sub}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mini chart */}
                        <div style={{
                            height: "80px",
                            borderRadius: "14px",
                            marginBottom: "16px",
                            overflow: "hidden",
                            background: "linear-gradient(180deg, rgba(99,102,241,0.15) 0%, transparent 100%)",
                            position: "relative"
                        }}>
                            <svg
                                viewBox="0 0 400 80"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    bottom: 0
                                }}
                            >
                                <defs>
                                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"   />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0,70 C60,65 100,55 150,40 C200,25 260,18 320,10 C360,5 380,3 400,2"
                                    fill="none"
                                    stroke="#818cf8"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M0,70 C60,65 100,55 150,40 C200,25 260,18 320,10 C360,5 380,3 400,2 L400,80 L0,80 Z"
                                    fill="url(#lineGrad)"
                                />
                            </svg>
                        </div>

                        {/* AI Insight box */}
                        <div style={{
                            padding: "16px",
                            borderRadius: "14px",
                            background: "rgba(99,102,241,0.08)",
                            border: "1px solid rgba(99,102,241,0.2)"
                        }}>
                            <div style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "flex-start"
                            }}>
                                <div style={{
                                    width: "28px", height: "28px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0
                                }}>
                                    <TrendingUpIcon color="#fff" />
                                </div>
                                <div>
                                    <span style={{
                                        color: "#818cf8",
                                        fontWeight: 700,
                                        fontSize: "13px"
                                    }}>
                                        AI Insight:{" "}
                                    </span>
                                    <span style={{
                                        color: "var(--text-secondary)",
                                        fontSize: "13px"
                                    }}>
                                        Your reels get 3.2x more reach on Tuesdays.
                                        Schedule your next post for 6-8 PM for best results.
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Why Creators section */}
            <div id="features" style={{
                padding: "80px 48px 60px",
                position: "relative", zIndex: 1
            }}>
                <p style={{
                    textAlign: "center",
                    fontSize: "12px",
                    letterSpacing: "3px",
                    color: "var(--text-subtle)",
                    marginBottom: "48px",
                    textTransform: "uppercase"
                }}>
                    Why Creators Choose Social Pulse
                </p>
                <div
                    className="home-feature-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "20px",
                        maxWidth: "1000px",
                        margin: "0 auto"
                    }}
                >
                    {[
                        {
                            icon: "01",
                            title: "Real-time analytics",
                            desc: "Live data across all platforms in a single dashboard."
                        },
                        {
                            icon: "02",
                            title: "AI-powered insights",
                            desc: "Smart recommendations to grow your audience faster."
                        },
                        {
                            icon: "03",
                            title: "Growth forecasting",
                            desc: "Predict trends before they happen with ML models."
                        },
                    ].map((f, i) => (
                        <div key={i} className="fade-in-up" style={{
                                padding: "28px",
                                borderRadius: "20px",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid var(--border-soft)",
                                transition: "border-color 0.2s"
                            }}>
                            <div style={{
                                width: "44px", height: "44px",
                                borderRadius: "14px",
                                fontSize: "20px",
                                background: "rgba(99,102,241,0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "16px"
                            }}>
                                {f.icon}
                            </div>
                            <div style={{
                                fontWeight: 700,
                                fontSize: "16px",
                                marginBottom: "8px"
                            }}>
                                {f.title}
                            </div>
                            <div style={{
                                fontSize: "14px",
                                color: "var(--text-muted)",
                                lineHeight: 1.6
                            }}>
                                {f.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing section */}
            <section id="pricing" className="home-section">
                <div className="home-section-header">
                    <p>Pricing</p>
                    <h2>Simple plans for growing teams</h2>
                </div>
                <div className="home-pricing-grid">
                    {[
                        {
                            name: "Starter",
                            price: "Free",
                            desc: "For solo creators tracking early growth.",
                            features: ["3 social accounts", "Weekly reports", "Basic AI insights"]
                        },
                        {
                            name: "Creator",
                            price: "$19",
                            desc: "For creators who publish consistently.",
                            features: ["10 social accounts", "Real-time dashboards", "Post scheduling"]
                        },
                        {
                            name: "Team",
                            price: "$49",
                            desc: "For agencies and brand teams.",
                            features: ["Unlimited accounts", "Exports and reports", "Priority support"]
                        },
                    ].map((plan) => (
                        <article className="home-plan-card" key={plan.name}>
                            <div>
                                <h3>{plan.name}</h3>
                                <strong>{plan.price}</strong>
                                <p>{plan.desc}</p>
                            </div>
                            <ul>
                                {plan.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                            <Link to="/register">Choose {plan.name}</Link>
                        </article>
                    ))}
                </div>
            </section>

            {/* Docs section */}
            <section id="docs" className="home-section home-docs-section">
                <div className="home-section-header">
                    <p>Docs</p>
                    <h2>Connect, analyze, and report faster</h2>
                </div>
                <div className="home-docs-grid">
                    {[
                        ["Connect accounts", "Add Instagram, YouTube, Facebook, and X from one guided setup."],
                        ["Read insights", "Use trend cards and AI recommendations to decide what to publish next."],
                        ["Export reports", "Download CSV reports for monthly check-ins and client updates."],
                    ].map(([title, body]) => (
                        <article key={title}>
                            <h3>{title}</h3>
                            <p>{body}</p>
                        </article>
                    ))}
                </div>
            </section>

            {isDemoOpen && (
                <div
                    className="demo-modal-backdrop"
                    role="presentation"
                    onClick={() => setIsDemoOpen(false)}
                >
                    <section
                        className="demo-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="demo-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="demo-modal-close"
                            aria-label="Close demo"
                            onClick={() => setIsDemoOpen(false)}
                        >
                            x
                        </button>
                        <div className="demo-video-frame">
                            <PlayIcon size={28} color="#fff" />
                        </div>
                        <h2 id="demo-modal-title">Social Pulse demo</h2>
                        <p>
                            Preview the core workflow: connect channels, review live metrics,
                            find the best posting window, and export a clean performance report.
                        </p>
                        <div className="demo-step-list">
                            <span>1. Connect accounts</span>
                            <span>2. Review AI insights</span>
                            <span>3. Export your report</span>
                        </div>
                        <Link to="/register" className="demo-modal-action">
                            Start with your data <ArrowRightIcon />
                        </Link>
                    </section>
                </div>
            )}

        </div>
    )
}
