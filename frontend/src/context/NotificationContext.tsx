import { createContext, useContext, useEffect, useState } from "react"
import API from "../services/api"
import { isAuthenticated } from "../utils/auth"

interface NotificationContextType {
    count: number | null
    refresh: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType>({
    count: null,
    refresh: async () => {}
})

export function useNotification() {
    return useContext(NotificationContext)
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState<number | null>(null)

    useEffect(() => {
        setCount(3)
    }, [])

    return (
        <NotificationContext.Provider value={{ count, refresh: async () => {} }}>
            {children}
        </NotificationContext.Provider>
    )
}