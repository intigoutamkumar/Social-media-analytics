export function SocialBadge({ label, color = "#6366f1" }) {
    return (
        <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "38px",
            height: "38px",
            borderRadius: "12px",
            background: color,
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.9rem"
        }}>
            {label}
        </span>
    )
}
