import { generateAnalyticsData } from "../utils/analyticsData"
import { getStoredUser } from "../utils/auth"

export default function Notifications() {
    const currentUser = getStoredUser()
    const data = generateAnalyticsData(currentUser.username)

    const notifications = [
        { title: "Followers increased", body: `Audience is now ${data.followers?.toLocaleString() || "-"}.` },
        { title: "Engagement improved", body: `Engagement rate reached ${data.engagement || "-"}%.` },
        { title: "Growth is trending up", body: `Monthly growth increased by ${data.growth || "-"}%.` },
        { title: "Post volume updated", body: `Total posts reached ${data.posts?.toLocaleString() || "-"}.` },
        { title: "Comments crossed a milestone", body: `${data.comments?.toLocaleString() || "-"} comments recorded.` },
        { title: "Shares are expanding reach", body: `${data.shares?.toLocaleString() || "-"} shares generated.` }
    ]

    return (
        <main>
            <header className="page-header" aria-labelledby="notifications-title">
                <div>
                    <h1 id="notifications-title" className="page-title">Notifications</h1>
                    <p className="page-subtitle">Recent analytics changes and account alerts</p>
                </div>
            </header>

            <section className="recommendation-list" aria-live="polite">
                {notifications.map((item) => (
                    <article key={item.title}>
                        <strong style={{ display: "block", color: "var(--text-primary)", marginBottom: "4px" }}>
                            {item.title}
                        </strong>
                        <p style={{ margin: 0 }}>{item.body}</p>
                    </article>
                ))}
            </section>
        </main>
    )
}
