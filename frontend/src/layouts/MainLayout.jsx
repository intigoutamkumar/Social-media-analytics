import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { getStoredUser } from "../utils/auth"

export default function MainLayout() {
  const user = getStoredUser()

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <main className="app-content" aria-label="Application content">
        <Outlet />
      </main>
    </div>
  )
}
