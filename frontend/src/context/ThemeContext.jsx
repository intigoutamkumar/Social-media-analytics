import { useEffect, useMemo, useState } from "react"
import { ThemeContext } from "./themeState"

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark"
    })

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const value = useMemo(() => ({
        theme,
        isDark: theme === "dark",
        toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark")
    }), [theme])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
