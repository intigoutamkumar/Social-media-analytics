import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { LogoOutline } from '../components/Logo'

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('LogoOutline', () => {
    it('renders without crashing', () => {
        renderWithRouter(<LogoOutline />)
        expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('accepts custom size', () => {
        renderWithRouter(<LogoOutline size={64} />)
        const svg = document.querySelector('svg')
        expect(svg).toBeInTheDocument()
    })
})
