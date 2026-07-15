import { FaBell, FaChartLine, FaComment, FaHeart, FaInstagram, FaShare, FaUsers } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts"
import { generateAnalyticsData, type AnalyticsData, type TrendDataPoint, type ChannelDataPoint } from "../utils/analyticsData"
import { getStoredUser, type User } from "../utils/auth"
import { FollowersChart, StatCard } from "../components/AnalyticsWidgets"

export const trendData: TrendDataPoint[] = [
    { day: "Mon", followers: 42000, engagement: 6.1 },
    { day: "Tue", followers: 43500, engagement: 7.4 },
    { day: "Wed", followers: 45100, engagement: 6.8 },
    { day: "Thu", followers: 46800, engagement: 8.2 },
    { day: "Fri", followers: 48900, engagement: 7.9 },
    { day: "Sat", followers: 51200, engagement: 9.1 },
    { day: "Sun", followers: 53600, engagement: 8.6 }
]

export const channelData: ChannelDataPoint[] = [
    { platform: "Instagram", reach: 68, color: "#f97316" },
    { platform: "YouTube", reach: 52, color: "#ef4444" },
    { platform: "X", reach: 36, color: "#38bdf8" },
    { platform: "Facebook", reach: 29, color: "#3b82f6" }
]

export default function Analytics() {
    const currentUser: User = getStoredUser()
    const stats: AnalyticsData = generateAnalyticsData(currentUser.username)

    const cards = [
        { title: "Followers", value: stats.followers?.toLocaleString(), detail: "+17.5% this month", icon: <FaUsers size={24} color="#3b82f6" /> },
        { title: "Engagement", value: stats.engagement ? `${stats.engagement}%` : "", detail: "+2.1% this week", icon: <FaHeart size={24} color="#ec4899" /> },
        { title: "Posts", value: stats.posts?.toLocaleString(), detail: "12 scheduled", icon: <FaInstagram size={24} color="#eab308" /> },
        { title: "Growth", value: stats.growth ? `+${stats.growth}%` : "", detail: "steady audience lift", icon: <FaChartLine size={24} color="#22c55e" /> },
        { title: "Comments", value: stats.comments?.toLocaleString(), detail: "conversation volume", icon: <FaComment size={24} color="#60a5fa" /> },
        { title: "Shares", value: stats.shares?.toLocaleString(), detail: "organic distribution", icon: <FaShare size={24} color="#4ade80" /> }
    ]

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Analytics</h1>
                    <p className="page-subtitle">Social media performance insights</p>
                </div>

                <div className="page-actions">
                    <div className="search-control">
                        <label htmlFor="analytics-search" className="sr-only">Search analytics</label>
                        <FiSearch size={14} />
                        <input id="analytics-search" name="analytics-search" type="text" placeholder="Search analytics..." />
                    </div>

                    <button type="button" className="icon-button" aria-label="Notifications">
                        <FaBell size={16} />
                        <span className="notification-dot">3</span>
                    </button>
                </div>
            </div>

            <div className="metric-grid">
                {cards.map((card) => (
                    <div className="metric-card" key={card.title}>
                        <div className="metric-card-top">
                            <div>
                                <p>{card.title}</p>
                                <h2>{card.value || "-"}</h2>
                            </div>
                            <div className="metric-icon">{card.icon}</div>
                        </div>
                        <span>{card.detail}</span>
                    </div>
                ))}
            </div>

            <div className="analytics-grid">
                <section className="panel">
                    <div className="panel-header">
                        <div>
                            <h2>Audience Trend</h2>
                            <p>Follower momentum over the last week</p>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={trendData} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="followersFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
                                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" tick={{ fill: "var(--text-subtle)", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "var(--text-subtle)", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: "var(--surface-bg)", border: "1px solid var(--border-color)", borderRadius: "10px", color: "var(--text-primary)" }} />
                            <Area type="monotone" dataKey="followers" stroke="#6366f1" strokeWidth={3} fill="url(#followersFill)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </section>

                <section className="panel">
                    <div className="panel-header">
                        <div>
                            <h2>Platform Reach</h2>
                            <p>Relative reach by connected channel</p>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={channelData} layout="vertical" margin={{ top: 8, right: 16, left: 18, bottom: 0 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="platform" type="category" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: "var(--surface-bg)", border: "1px solid var(--border-color)", borderRadius: "10px", color: "var(--text-primary)" }} />
                            <Bar dataKey="reach" radius={[0, 8, 8, 0]} fill="#6366f1" />
                        </BarChart>
                    </ResponsiveContainer>
                </section>
            </div>
        </div>
    )
}
