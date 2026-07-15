import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaFacebook, FaTwitter } from "react-icons/fa"
import { FaGoogle } from "react-icons/fa6"
import AuthLayout from "../components/AuthLayout"
import API from "../services/api"
import { validateEmail, validateMatch, validatePassword, validateRequired } from "../utils/validation"

export default function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" })
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

        const usernameError = validateRequired(form.username, "Username")
        if (usernameError) nextErrors.username = usernameError

        const emailError = validateEmail(form.email)
        if (emailError) nextErrors.email = emailError

        const passwordError = validatePassword(form.password)
        if (passwordError) nextErrors.password = passwordError

        const confirmError = validateMatch(form.confirmPassword, form.password, "Passwords")
        if (confirmError) nextErrors.confirmPassword = confirmError

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setServerError("")

        if (!validate()) return

        setIsSubmitting(true)
        try {
            await API.post("/accounts/register/", {
                username: form.username,
                email: form.email,
                password: form.password,
            })

            navigate("/login", { replace: true, state: { registered: true } })
        } catch (error) {
            const message =
                error.response?.data?.error ||
                "Unable to register. Please try again."
            setServerError(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthLayout>
            <form className="auth-card" onSubmit={handleSubmit} noValidate>

                <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: "1.8rem", marginBottom: 6 }}>
                    Create Account
                </h2>
                <p className="text-muted-custom" style={{ textAlign: "center", marginBottom: 28 }}>
                    Join the future of analytics
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
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    autoComplete="username"
                    value={form.username}
                    onChange={handleChange}
                    style={{ marginBottom: 6 }}
                />
                {errors.username && (
                    <div style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: 10 }}>
                        {errors.username}
                    </div>
                )}

                <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    style={{ marginTop: 14, marginBottom: 6 }}
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
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    style={{ marginTop: 14, marginBottom: 6 }}
                />
                {errors.password && (
                    <div style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: 10 }}>
                        {errors.password}
                    </div>
                )}

                <input
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    style={{ marginTop: 14, marginBottom: 6 }}
                />
                {errors.confirmPassword && (
                    <div style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: 10 }}>
                        {errors.confirmPassword}
                    </div>
                )}

                <button type="submit" className="auth-btn" disabled={isSubmitting} style={{ marginTop: 20 }}>
                    {isSubmitting ? "Creating account..." : "Create Account"}
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
                    Already have an account? <Link to="/login">Log In</Link>
                </p>

            </form>
        </AuthLayout>
    )
}