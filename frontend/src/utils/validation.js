export function validateRequired(value, label) {
    if (!value || (typeof value === "string" && value.trim() === "")) {
        return `${label} is required`
    }
    return null
}

export function validateEmail(email) {
    if (!email) return "Email is required"
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(email)) return "Please enter a valid email address"
    return null
}

export function validatePassword(password, min = 8) {
    if (!password) return "Password is required"
    if (password.length < min) return `Password must be at least ${min} characters`
    return null
}

export function validateMatch(value, match, label) {
    if (value !== match) return `${label} do not match`
    return null
}

export function validateForm(values) {
    const errors = {}

    for (const [field, value] of Object.entries(values)) {
        const error = validateRequired(value, field)
        if (error) errors[field] = error
    }

    if (values.email) {
        const emailError = validateEmail(values.email)
        if (emailError) errors.email = emailError
    }

    if (values.password) {
        const passError = validatePassword(values.password)
        if (passError) errors.password = passError
    }

    return Object.keys(errors).length > 0 ? errors : null
}
