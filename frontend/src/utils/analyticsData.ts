export interface AnalyticsData {
    followers: number
    engagement: string
    growth: string
    posts: number
    likes: number
    comments: number
    shares: number
    reach: string
}

export interface ChartDataPoint {
    date: string
    followers: number
}

export interface TrendDataPoint {
    day: string
    followers: number
    engagement: number
}

export interface ChannelDataPoint {
    platform: string
    reach: number
    color: string
}

export function generateAnalyticsData(username = "Sai"): AnalyticsData {
    let seed = 0

    for (let i = 0; i < username.length; i++) {
        seed += username.charCodeAt(i)
    }

    const followers = ((seed * 137) % 90000) + 10000
    const engagement = (((seed * 17) % 90) / 10 + 1).toFixed(1)
    const growth = (((seed * 29) % 300) / 10 + 1).toFixed(1)
    const posts = ((seed * 31) % 1200) + 50
    const likes = ((seed * 43) % 50000) + 2000
    const comments = ((seed * 19) % 12000) + 500
    const shares = ((seed * 23) % 8000) + 300
    const reach = Math.floor(((seed * 41) % 150) + 50) + "K"

    return {
        followers,
        engagement,
        growth,
        posts,
        likes,
        comments,
        shares,
        reach
    }
}

export function generateFollowerChart(
    followers: number,
    range: "7d" | "30d" | "90d" = "30d"
): ChartDataPoint[] {
    const ranges: Record<string, { labels: string[]; multipliers: number[] }> = {
        "7d": {
            labels: ["May 14", "May 15", "May 16", "May 17", "May 18", "May 19", "May 20"],
            multipliers: [0.91, 0.93, 0.94, 0.96, 0.98, 0.99, 1],
        },
        "30d": {
            labels: ["Apr 21", "Apr 28", "May 5", "May 12", "May 19"],
            multipliers: [0.78, 0.83, 0.88, 0.94, 1],
        },
        "90d": {
            labels: ["Feb 20", "Mar 10", "Mar 28", "Apr 15", "May 3", "May 20"],
            multipliers: [0.58, 0.66, 0.72, 0.81, 0.91, 1],
        },
    }
    const selectedRange = ranges[range] || ranges["30d"]

    return selectedRange.labels.map((date, index) => ({
        date,
        followers: Math.round(followers * selectedRange.multipliers[index])
    }))
}