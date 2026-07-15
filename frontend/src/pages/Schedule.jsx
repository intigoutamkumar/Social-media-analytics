import { FaCalendarAlt, FaClock, FaInstagram, FaPlus, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

const scheduledPosts = [
    {
        title: "Instagram reel",
        platform: "Instagram",
        time: "Today, 6:30 PM",
        status: "Ready",
        icon: <FaInstagram size={18} />,
        color: "#f97316",
    },
    {
        title: "Weekly analytics thread",
        platform: "X / Twitter",
        time: "Tomorrow, 10:00 AM",
        status: "Draft",
        icon: <FaXTwitter size={18} />,
        color: "#38bdf8",
    },
    {
        title: "Product tutorial short",
        platform: "YouTube",
        time: "Friday, 5:00 PM",
        status: "Queued",
        icon: <FaYoutube size={18} />,
        color: "#ef4444",
    },
]

export default function Schedule() {
    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Schedule</h1>
                    <p className="page-subtitle">Plan, review, and prepare upcoming social posts</p>
                </div>

                <button className="primary-action">
                    <FaPlus size={12} />
                    New Post
                </button>
            </div>

            <section className="report-hero">
                <div className="report-icon">
                    <FaCalendarAlt size={22} />
                </div>
                <div>
                    <h2>Publishing Queue</h2>
                    <p>Three posts are ready for review across your connected channels this week.</p>
                </div>
                <div className="report-score">
                    <span>Ready</span>
                    <strong>3</strong>
                </div>
            </section>

            <div className="report-grid">
                {scheduledPosts.map((post) => (
                    <article className="report-card schedule-card" key={post.title}>
                        <div className="metric-card-top">
                            <div>
                                <span>{post.platform}</span>
                                <strong>{post.title}</strong>
                            </div>
                            <div className="metric-icon" style={{ color: post.color }}>
                                {post.icon}
                            </div>
                        </div>

                        <p className="schedule-time">
                            <FaClock size={12} />
                            {post.time}
                        </p>

                        <span
                            className="status-pill"
                            style={{
                                background: `${post.color}1f`,
                                color: post.color,
                                borderColor: `${post.color}33`,
                            }}
                        >
                            {post.status}
                        </span>
                    </article>
                ))}
            </div>
        </div>
    )
}
