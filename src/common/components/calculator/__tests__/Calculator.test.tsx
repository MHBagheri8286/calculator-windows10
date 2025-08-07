import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Calculator from '../Calculator'

describe('Calculator Component', () => {
    it('should handle continuous operations', () => {
        render(<Calculator />)

        // Perform 5 + 3 * 2 = 16
        fireEvent.click(screen.getByRole('button', { name: '5' }))
        fireEvent.click(screen.getByRole('button', { name: '+' }))
        fireEvent.click(screen.getByRole('button', { name: '3' }))
        fireEvent.click(screen.getByRole('button', { name: '×' }))
        fireEvent.click(screen.getByRole('button', { name: '2' }))
        fireEvent.click(screen.getByRole('button', { name: '=' }))

        // Should display 16 (5+3=8, then 8*2=16)
        expect(screen.getByText('16')).toBeInTheDocument()
    })

    it('should reset after error and allow new calculations', () => {
        render(<Calculator />)

        // Create an error (division by zero)
        fireEvent.click(screen.getByRole('button', { name: '5' }))
        fireEvent.click(screen.getByRole('button', { name: '÷' }))
        fireEvent.click(screen.getByRole('button', { name: '0' }))
        fireEvent.click(screen.getByRole('button', { name: '=' }))

        // Should display Error
        expect(screen.getByText('Error')).toBeInTheDocument()

        // Clear and start new calculation
        fireEvent.click(screen.getByRole('button', { name: 'C' }))
        fireEvent.click(screen.getByRole('button', { name: '2' }))
        fireEvent.click(screen.getByRole('button', { name: '+' }))
        fireEvent.click(screen.getByRole('button', { name: '3' }))
        fireEvent.click(screen.getByRole('button', { name: '=' }))

        // Should display 5
        expect(screen.getByText('5')).toBeInTheDocument()
    })

})