import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios"

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

export interface TokenRefreshResponse {
    access: string
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

export interface StoredUser {
    username: string
    email: string
}

const API: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
})

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default API
