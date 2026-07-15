export interface User {
    username: string
    email: string
}

export const DEFAULT_USER: User = {
    username: "Guest",
    email: "",
}

export function getStoredUser(): User {
    const raw = localStorage.getItem("user")
    if (!raw) return DEFAULT_USER

    try {
        const parsed = JSON.parse(raw)
        return {
            username: parsed.username || DEFAULT_USER.username,
            email: parsed.email || DEFAULT_USER.email,
        }
    } catch {
        return DEFAULT_USER
    }
}

export function setStoredUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("username", user.username)
    localStorage.setItem("email", user.email)
}

export function getAuthToken(): string | null {
    return localStorage.getItem("token")
}

export function setAuthToken(token: string): void {
    localStorage.setItem("token", token)
}

export function setRefreshToken(token: string): void {
    localStorage.setItem("refresh", token)
}

export function getRefreshToken(): string | null {
    return localStorage.getItem("refresh")
}

export function isAuthenticated(): boolean {
    return !!localStorage.getItem("token")
}

export function clearAuth(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("refresh")
    localStorage.removeItem("user")
    localStorage.removeItem("username")
    localStorage.removeItem("email")
}