const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

let isInitialized = false

export function initSiteAnalytics() {
    if (!measurementId || isInitialized || typeof window === "undefined") {
        return
    }

    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
        window.dataLayer.push(arguments)
    }

    window.gtag("js", new Date())
    window.gtag("config", measurementId, {
        send_page_view: false,
    })

    isInitialized = true
}

export function trackPageView(path) {
    if (!measurementId || typeof window === "undefined" || !window.gtag) {
        return
    }

    window.gtag("event", "page_view", {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
    })
}
