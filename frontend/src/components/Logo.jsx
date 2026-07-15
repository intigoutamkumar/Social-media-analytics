export function LogoOutline({ size = 44 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id="lo-grad"
                    x1="0%" y1="0%"
                    x2="100%" y2="100%"
                >
                    <stop offset="0%"   stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
            </defs>

            <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke="url(#lo-grad)"
                strokeWidth="2.5"
            />

            <polyline
                points="14,40 20,28 26,46 32,18 38,46 44,30 52,40"
                fill="none"
                stroke="url(#lo-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <circle cx="52" cy="40" r="3.5" fill="#818cf8" />
        </svg>
    )
}
