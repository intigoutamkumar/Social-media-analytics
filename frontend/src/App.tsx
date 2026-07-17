import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import { ThemeProvider } from "./context/ThemeContext"
import { NotificationProvider } from "./context/NotificationContext"
import ErrorBoundary from "./components/ErrorBoundary"
import ProtectedRoute from "./components/ProtectedRoute"
import { initSiteAnalytics, trackPageView } from "./utils/siteAnalytics"

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Analytics = lazy(() => import("./pages/Analytics"))
const Reports = lazy(() => import("./pages/Reports"))
const Notifications = lazy(() => import("./pages/Notifications"))
const Settings = lazy(() => import("./pages/Settings"))
const Schedule = lazy(() => import("./pages/Schedule"))
const MainLayout = lazy(() => import("./layouts/MainLayout"))

function PageLoader() {
    return (
        <div className="page-loader">
            Loading Social Pulse...
        </div>
    )
}

function AnalyticsTracker() {
    const location = useLocation()

    useEffect(() => {
        initSiteAnalytics()
    }, [])

    useEffect(() => {
        trackPageView(`${location.pathname}${location.search}`)
    }, [location.pathname, location.search])

    return null
}

export default function App() {

    return (

        <ThemeProvider>

        <NotificationProvider>

        <ErrorBoundary>

        <BrowserRouter>

            <AnalyticsTracker />

            <Suspense fallback={<PageLoader />}>
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="/reports"
                        element={<Reports />}
                    />

                    <Route
                        path="/schedule"
                        element={<Schedule />}
                    />

                    <Route
                        path="/notifications"
                        element={<Notifications />}
                    />

                    <Route path="/settings" element={<Settings />} />

                </Route>
                </Route>

            </Routes>
            </Suspense>

        </BrowserRouter>

        </ErrorBoundary>

        </NotificationProvider>

        </ThemeProvider>

    )

}
