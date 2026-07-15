import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PageLoader, InlineLoader } from '../components/Loading'

describe('Loading', () => {
    it('renders PageLoader', () => {
        render(<PageLoader />)
        expect(screen.getByText(/Loading Social Pulse/i)).toBeInTheDocument()
    })

    it('renders InlineLoader with default label', () => {
        render(<InlineLoader />)
        expect(screen.getByText(/Loading/i)).toBeInTheDocument()
    })

    it('renders InlineLoader with custom label', () => {
        render(<InlineLoader label="Saving..." />)
        expect(screen.getByText('Saving...')).toBeInTheDocument()
    })
})
