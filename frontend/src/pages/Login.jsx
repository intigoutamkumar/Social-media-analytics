import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaFacebook, FaTwitter } from "react-icons/fa"
import { FaGoogle } from "react-icons/fa6"
import AuthLayout from "../components/AuthLayout"
import API from "../services/api"
import { setAuthToken, setRefreshToken, setStoredUser } from "../utils/auth"
import { validateEmail, validateRequired } from "../utils/validation"

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: null }))
    }

    const validate = () => {
        const nextErrors = {}
        const emailError = validateEmail(form.email)
        if (emailError) nextErrors.email = emailError

        const passwordError = validateRequired(form.password, "Password")
        if (passwordError) nextErrors.password = passwordError

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setServerError("")

        if (!validate()) return

        setIsSubmitting(true)
        try {
            const response = await API.post("/accounts/login/", {
                email: form.email,
                password: form.password,
            })

            const { access, refresh, username, email } = response.data
            setAuthToken(access)
            setRefreshToken(refresh)
            setStoredUser({ username, email })

            navigate("/dashboard", { replace: true })
        } catch (error) {
            const message =
                error.response?.data?.error ||
                "Unable to log in. Please check your credentials and try again."
            setServerError(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthLayout>
            <form className="auth-card" onSubmit={handleSubmit} noValidate>

                <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: "1.8rem", marginBottom: 6 }}>
                    Welcome Back
                </h2>
                <p className="text-muted-custom" style={{ textAlign: "center", marginBottom: 28 }}>
                    Log in to your account
                </p>

                {serverError && (
                    <div
                        role="alert"
                        style={{
                            background: "rgba(220,38,38,0.12)",
                            border: "1px solid rgba(220,38,38,0.35)",
                            color: "#f87171",
                            borderRadius: 12,
                            padding: "0.7rem 1rem",
                            marginBottom: 16,
                            fontSize: "0.9rem",
                        }}
                    >
                        {serverError}
                    </div>
                )}

                <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Email or Username"
                    autoComplete="username"
                    value={form.email}
                    onChange={handleChange}
                    style={{ marginBottom: 6 }}
                />
                {errors.email && (
                    <div style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: 10 }}>
                        {errors.email}
                    </div>
                )}

                <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    style={{ marginTop: 14, marginBottom: 6 }}
                />
                {errors.password && (
                    <div style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: 10 }}>
                        {errors.password}
                    </div>
                )}

                <button type="submit" className="auth-btn" disabled={isSubmitting} style={{ marginTop: 20 }}>
                    {isSubmitting ? "Logging in..." : "Log In"}
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
                    <div style={{ flex: 1, height: 1, background: "var(--border-color)" }} />
                    <span className="text-muted-custom" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                        OR CONTINUE WITH
                    </span>
                    <div style={{ flex: 1, height: 1, background: "var(--border-color)" }} />
                </div>

                <div className="social-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                    <button type="button" className="social-btn" aria-label="Continue with Google">
                        <FaGoogle />
                    </button>
                    <button type="button" className="social-btn" aria-label="Continue with Facebook">
                        <FaFacebook />
                    </button>
                    <button type="button" className="social-btn" aria-label="Continue with X">
                        <FaTwitter />
                    </button>
                </div>

                <p className="text-muted-custom" style={{ textAlign: "center", marginTop: 24 }}>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>

            </form>
        </AuthLayout>
    )
}