import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts"
import type { ChartDataPoint } from "../utils/analyticsData"

export interface StatCardProps {
    label: string
    value: string | number
    sub: string
    up: boolean
    color: string
}

export function StatCard({ label, value, sub, up, color }: StatCardProps) {
    return (
        <div className="hover-card" style={{
            background: "var(--surface-bg)", borderRadius: "16px",
            border: "1px solid var(--border-soft)", padding: "20px"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{label}</span>
                <div style={{
                    width: "28px", height: "28px", borderRadius: "8px",
                    background: `${color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: color }} />
                </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "8px" }}>{value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{
                    width: "12px", height: "12px", borderRadius: "3px",
                    background: up ? "rgba(34,197,94,0.15)" : "rgba(244,63,94,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px"
                }}>{up ? "+" : "-"}</div>
                <span style={{ fontSize: "11px", color: up ? "#22c55e" : "#f43f5e" }}>{sub}</span>
            </div>
        </div>
    )
}

export interface FollowersChartProps {
    data: ChartDataPoint[] | null
    onExport: () => void
    loading?: boolean
    error?: string | null
}

export function FollowersChart({ data, onExport, loading, error }: FollowersChartProps) {
    if (loading) {
        return (
            <div className="panel">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: "15px" }}>Followers growth</div>
                        <div style={{ fontSize: "12px", color: "var(--text-subtle)" }}>Performance over last 30 days</div>
                    </div>
                    <button type="button" onClick={onExport} className="primary-action">
                        Export
                    </button>
                </div>
                <div style={{ width: "100%", height: "180px", borderRadius: "8px", background: "var(--surface-bg)", animation: "pulse 1.5s ease-in-out infinite" }} />
            </div>
        )
    }

    if (error) {
        return (
            <div className="panel">
                <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>Followers growth</div>
                <div style={{ color: "#f43f5e", fontSize: "13px" }}>{error}</div>
            </div>
        )
    }

    return (
        <div className="panel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <div>
                    <div style={{ fontWeight: 700, fontSize: "15px" }}>Followers growth</div>
                    <div style={{ fontSize: "12px", color: "var(--text-subtle)" }}>Performance over last 30 days</div>
                </div>
                <button type="button" onClick={onExport} className="primary-action">
                    Export
                </button>
            </div>
            <ResponsiveContainer width="100%" height={180}>
                <LineChart data={data || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="date" tick={{ fill: "var(--text-subtle)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--text-subtle)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#1e2130", border: "none", borderRadius: "8px", color: "#fff", fontSize: 12 }} />
                    <Line type="monotone" dataKey="followers" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
