import { fireEvent, render, screen, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Home from '../pages/Home'

const renderHome = () => render(
    <BrowserRouter>
        <Home />
    </BrowserRouter>
)

describe('Home', () => {
    it('links top navigation to real homepage sections', () => {
        renderHome()

        expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute('href', '#features')
        expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '#pricing')
        expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '#docs')

        expect(document.querySelector('#features')).toBeInTheDocument()
        expect(document.querySelector('#pricing')).toBeInTheDocument()
        expect(document.querySelector('#docs')).toBeInTheDocument()
    })

    it('opens and closes the demo flow', () => {
        renderHome()

        fireEvent.click(screen.getByRole('button', { name: /watch demo/i }))

        const dialog = screen.getByRole('dialog', { name: /social pulse demo/i })
        expect(dialog).toBeInTheDocument()
        expect(within(dialog).getByText(/connect channels/i)).toBeInTheDocument()
        expect(within(dialog).getByRole('link', { name: /start with your data/i })).toHaveAttribute('href', '/register')

        fireEvent.click(within(dialog).getByRole('button', { name: /close demo/i }))
        expect(screen.queryByRole('dialog', { name: /social pulse demo/i })).not.toBeInTheDocument()
    })

    it('offers register actions from pricing plans', () => {
        renderHome()

        expect(screen.getByRole('link', { name: 'Choose Starter' })).toHaveAttribute('href', '/register')
        expect(screen.getByRole('link', { name: 'Choose Creator' })).toHaveAttribute('href', '/register')
        expect(screen.getByRole('link', { name: 'Choose Team' })).toHaveAttribute('href', '/register')
    })
})
