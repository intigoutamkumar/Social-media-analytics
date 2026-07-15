import { FaDownload, FaFileAlt } from "react-icons/fa"
import { generateAnalyticsData } from "../utils/analyticsData"
import { getStoredUser } from "../utils/auth"

export default function Reports() {
    const user = getStoredUser()
    const stats = generateAnalyticsData(user.username)

    const reportItems = [
        { label: "Followers", value: stats.followers?.toLocaleString(), note: "Audience size" },
        { label: "Engagement", value: stats.engagement ? `${stats.engagement}%` : "", note: "Interaction rate" },
        { label: "Growth", value: stats.growth ? `+${stats.growth}%` : "", note: "Monthly lift" },
        { label: "Posts", value: stats.posts?.toLocaleString(), note: "Published content" },
        { label: "Likes", value: stats.likes?.toLocaleString(), note: "Positive reactions" },
        { label: "Comments", value: stats.comments?.toLocaleString(), note: "Audience replies" },
        { label: "Shares", value: stats.shares?.toLocaleString(), note: "Amplified reach" }
    ]

    const downloadReport = () => {
        const report = `
SOCIAL MEDIA REPORT

Username: ${user.username || "-"}
Followers: ${stats.followers?.toLocaleString() || "-"}
Engagement: ${stats.engagement ? `${stats.engagement}%` : "-"}
Growth: ${stats.growth ? `${stats.growth}%` : "-"}
Posts: ${stats.posts?.toLocaleString() || "-"}
Likes: ${stats.likes?.toLocaleString() || "-"}
Comments: ${stats.comments?.toLocaleString() || "-"}
Shares: ${stats.shares?.toLocaleString() || "-"}
`

        const blob = new Blob([report], { type: "text/plain" })
        const link = document.createElement("a")

        link.href = URL.createObjectURL(blob)
        link.download = "social-media-report.txt"
        link.click()
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Reports Center</h1>
                    <p className="page-subtitle">Analytics report for {user.username || "your account"}</p>
                </div>

                <button className="primary-action" onClick={downloadReport}>
                    <FaDownload size={13} />
                    Download Report
                </button>
            </div>

            <section className="report-hero">
                <div className="report-icon">
                    <FaFileAlt size={22} />
                </div>
                <div>
                    <h2>Monthly Performance Summary</h2>
                    <p>
                        Your audience is growing steadily, with strongest traction coming from engagement and share activity.
                    </p>
                </div>
                <div className="report-score">
                    <span>Health score</span>
                    <strong>92</strong>
                </div>
            </section>

            <div className="report-grid">
                {reportItems.map((item) => (
                    <div className="report-card" key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value || "-"}</strong>
                        <p>{item.note}</p>
                    </div>
                ))}
            </div>

            <section className="panel">
                <div className="panel-header">
                    <div>
                        <h2>Recommended Actions</h2>
                        <p>High-impact next steps based on this report</p>
                    </div>
                </div>

                <div className="recommendation-list">
                    <div>Schedule more short-form video during evening windows.</div>
                    <div>Turn high-comment posts into follow-up carousels or threads.</div>
                    <div>Reuse top-performing hooks across Instagram and YouTube Shorts.</div>
                </div>
            </section>
        </div>
    )
}
