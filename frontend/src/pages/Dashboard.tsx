import { useState } from "react"
import { FiBell, FiSearch } from "react-icons/fi"
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { generateAnalyticsData, generateFollowerChart, type AnalyticsData, type ChartDataPoint } from "../utils/analyticsData"
import { getStoredUser, type User } from "../utils/auth"
import { StatCard, FollowersChart } from "../components/AnalyticsWidgets"
import { useNotification } from "../context/NotificationContext"

interface StatCardData {
    label: string
    value: string | number
    sub: string
    up: boolean
    color: string
}

const STAT_CARDS = (stats: AnalyticsData): StatCardData[] => [
  { label: "Followers", value: stats.followers?.toLocaleString() || "49,045", sub: "+17.5% this month", up: true, color: "#6366f1" },
  { label: "Engagement", value: stats.engagement ? `${stats.engagement}%` : "8.5%", sub: "+2.1% this week", up: true, color: "#8b5cf6" },
  { label: "Total posts", value: stats.posts || "485", sub: "+12 this week", up: true, color: "#06b6d4" },
  { label: "Reach", value: stats.reach || "128K", sub: "-3.2% vs last month", up: false, color: "#f43f5e" },
]

interface TopPost {
    rank: number
    title: string
    platform: string
    time: string
    engagement: string
    color: string
    bg: string
}

const TOP_POSTS: TopPost[] = [
  { rank: 1, title: "Morning routine vlog", platform: "Instagram", time: "3 days ago", engagement: "4.2K", color: "#6366f1", bg: "linear-gradient(135deg,#6366f1,#8b5cf6)" },
  { rank: 2, title: "Product review thread", platform: "X", time: "5 days ago", engagement: "3.8K", color: "#38bdf8", bg: "linear-gradient(135deg,#0ea5e9,#38bdf8)" },
  { rank: 3, title: "Tutorial: Editing tips", platform: "YouTube", time: "1 week ago", engagement: "2.9K", color: "#ef4444", bg: "linear-gradient(135deg,#ef4444,#f97316)" },
  { rank: 4, title: "Behind the scenes reel", platform: "Instagram", time: "10 days ago", engagement: "2.1K", color: "#22c55e", bg: "linear-gradient(135deg,#22c55e,#10b981)" },
  { rank: 5, title: "Community Q&A session", platform: "Facebook", time: "2 weeks ago", engagement: "1.7K", color: "#3b82f6", bg: "linear-gradient(135deg,#3b82f6,#6366f1)" },
]

interface AiInsight {
    title: string
    body: string
}

const AI_INSIGHTS: AiInsight[] = [
  { title: "Best time to post:", body: "Tuesdays 6-8 PM get 3.2x more reach on Instagram." },
  { title: "Reels outperform:", body: "Your video content gets 58% more engagement than static posts." },
  { title: "Hashtag tip:", body: "Using 8-12 niche hashtags increases discovery by 41%." },
]

interface PlatformData {
    name: string
    pct: number
    color: string
}

const PLATFORM_DATA: PlatformData[] = [
  { name: "Instagram", pct: 72, color: "#f97316" },
  { name: "YouTube", pct: 14, color: "#ef4444" },
  { name: "X / Twitter", pct: 9, color: "var(--text-secondary)" },
  { name: "Facebook", pct: 5, color: "#3b82f6" },
]

interface EngagementBar {
    week: string
    likes: number
    comments: number
    shares: number
}

export default function Dashboard() {
  const [user] = useState<User>(() => getStoredUser())
  const [stats] = useState<AnalyticsData>(() => generateAnalyticsData(getStoredUser().username))
  const [activeRange, setActiveRange] = useState<"7d" | "30d" | "90d">("30d")
  const [searchTerm, setSearchTerm] = useState("")
  const { count } = useNotification()

  const chartData: ChartDataPoint[] = generateFollowerChart(stats.followers, activeRange)
  const visiblePosts = TOP_POSTS.filter((post) => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) return true

    return `${post.title} ${post.platform}`.toLowerCase().includes(query)
  })

  const exportDashboard = () => {
    const rows = [
      ["Metric", "Value"],
      ["Followers", stats.followers],
      ["Engagement", `${stats.engagement}%`],
      ["Posts", stats.posts],
      ["Reach", stats.reach],
    ]
    const csv = rows.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const link = document.createElement("a")

    link.href = URL.createObjectURL(blob)
    link.download = "social-pulse-dashboard.csv"
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const engagementBar: EngagementBar[] = [
    { week: "Wk 1", likes: 3800, comments: 1200, shares: 600 },
    { week: "Wk 2", likes: 2900, comments: 800, shares: 400 },
    { week: "Wk 3", likes: 4200, comments: 1500, shares: 900 },
    { week: "Wk 4", likes: 3100, comments: 900, shares: 500 },
  ]

  return (
    <div>

        {/* Top bar */}
        <div className="dashboard-header">
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>Dashboard</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "13px", margin: "3px 0 0" }}>
              Welcome back, {user.username}. Here's your overview.
            </p>
          </div>
          <div className="dashboard-actions">
            {/* Range toggles */}
            <div className="dashboard-range" style={{
              display: "flex", background: "var(--surface-bg)", borderRadius: "10px",
              border: "1px solid var(--border-color)", padding: "4px", gap: "4px"
            }}>
              {["7d", "30d", "90d"].map(r => (
                <button key={r} onClick={() => setActiveRange(r as "7d" | "30d" | "90d")} style={{
                  padding: "6px 14px", borderRadius: "7px", border: "none", cursor: "pointer",
                  background: activeRange === r ? "#6366f1" : "transparent",
                  color: activeRange === r ? "#fff" : "var(--text-muted)",
                  fontSize: "12px", fontWeight: 600, transition: "all 0.15s"
                }}>{r}</button>
              ))}
            </div>

            {/* Search */}
            <div className="dashboard-search">
              <FiSearch size={14} color="var(--text-subtle)" />
              <input
                type="text"
                aria-label="Search analytics"
                placeholder="Search analytics..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            {/* Bell */}
            <div style={{ position: "relative", cursor: "pointer" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: "var(--surface-bg)", border: "1px solid var(--border-color)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <FiBell size={16} />
              </div>
              {count !== null && (
                <div style={{
                  position: "absolute", top: "-4px", right: "-4px",
                  background: "#6366f1", borderRadius: "100px", fontSize: "9px",
                  fontWeight: 800, color: "#fff", padding: "1px 5px"
                }}>{count}</div>
              )}
            </div>
          </div>
        </div>

        <div className="demo-data-banner" role="status">
          Demo data is shown here. Metrics are generated for portfolio review and are not connected to live social accounts.
        </div>

        {/* Stat cards */}
        <div className="dashboard-stat-grid">
          {STAT_CARDS(stats).map((s, i) => (
            <StatCard key={i} label={s.label} value={s.value} sub={s.sub} up={s.up} color={s.color} />
          ))}
        </div>

        {/* Charts row */}
        <div className="dashboard-chart-grid">
          <FollowersChart data={chartData} onExport={exportDashboard} />

          {/* Engagement breakdown */}
          <div className="panel">
            <div style={{ marginBottom: "6px" }}>
              <div style={{ fontWeight: 700, fontSize: "15px" }}>Engagement breakdown</div>
              <div style={{ fontSize: "12px", color: "var(--text-subtle)" }}>Likes, comments, shares</div>
            </div>
            <div style={{ display: "flex", gap: "16px", marginBottom: "10px" }}>
              {[{ l: "Likes", c: "#6366f1" }, { l: "Comments", c: "#ec4899" }, { l: "Shares", c: "#22c55e" }].map(x => (
                <div key={x.l} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "var(--text-muted)" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: x.c }} />
                  {x.l}
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={engagementBar} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="week" tick={{ fill: "var(--text-subtle)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--text-subtle)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1e2130", border: "none", borderRadius: "8px", color: "#fff", fontSize: 12 }} />
                <Bar dataKey="likes" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="comments" fill="#ec4899" radius={[4, 4, 0, 0]} />
                <Bar dataKey="shares" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom row */}
        <div className="dashboard-bottom-grid">

          {/* Left column: Platform breakdown + AI insights */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Platform breakdown */}
            <div className="panel">
              <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>Platform breakdown</div>
              <div style={{ fontSize: "11px", color: "var(--text-subtle)", marginBottom: "16px" }}>Followers by platform</div>
              {PLATFORM_DATA.map(p => (
                <div key={p.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", color: p.color }}>{p.name}</span>
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{p.pct}%</span>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="panel">
              <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "14px" }}>AI insights</div>
              {AI_INSIGHTS.map((ins, i) => (
                <div key={i} style={{
                  padding: "12px", borderRadius: "10px", marginBottom: "10px",
                  background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)"
                }}>
                  <div style={{ fontSize: "12px" }}>
                    <span style={{ color: "#818cf8", fontWeight: 700 }}>{ins.title} </span>
                    <span style={{ color: "var(--text-muted)" }}>{ins.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top performing posts */}
          <div style={{
            background: "var(--surface-bg)", borderRadius: "16px",
            border: "1px solid var(--border-soft)", padding: "22px"
          }}>
            <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>Top performing posts</div>
            <div style={{ fontSize: "12px", color: "var(--text-subtle)", marginBottom: "20px" }}>By engagement this month</div>
            {visiblePosts.map(p => (
              <div key={p.rank} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)"
              }}>
                <div style={{ color: "var(--text-subtle)", fontSize: "13px", width: "16px", textAlign: "center" }}>{p.rank}</div>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "10px",
                  background: p.bg, flexShrink: 0
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-subtle)" }}>{p.platform} / {p.time}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: "rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7px" }}>+</div>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#818cf8" }}>{p.engagement}</span>
                </div>
              </div>
            ))}
            {visiblePosts.length === 0 && (
              <div style={{ color: "var(--text-muted)", fontSize: "13px", padding: "14px 0" }}>
                No posts match your search.
              </div>
            )}
          </div>
        </div>
    </div>
  )
}
