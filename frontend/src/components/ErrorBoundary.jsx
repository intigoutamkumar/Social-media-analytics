import { Component } from "react"
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--app-bg)",
                    color: "var(--text-primary)",
                    fontFamily: "Inter, system-ui, sans-serif",
                    gap: "16px",
                    padding: "24px",
                }}>
                    <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Something went wrong</h1>
                    <p style={{ color: "var(--text-muted)", maxWidth: "400px", textAlign: "center" }}>
                        The application hit an unexpected error. Please refresh the page or return home.
                    </p>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false, error: null })
                            window.location.href = "/"
                        }}
                        style={{
                            padding: "10px 24px",
                            borderRadius: "10px",
                            border: "none",
                            background: "#6366f1",
                            color: "#fff",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Return Home
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}
