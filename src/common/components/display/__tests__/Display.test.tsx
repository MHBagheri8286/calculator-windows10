import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Display from '../Display'

describe('Display Component', () => {
  it('should render history and result correctly', () => {
    render(<Display history="5 + 3" result="8" />)
    
    expect(screen.getByText('5 + 3')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
  })

  it('should render empty history correctly', () => {
    render(<Display history="" result="0" />)
    
    const historyElement = document.querySelector('.display-history')
    const resultElement = document.querySelector('.display-result')
    
    expect(historyElement).toBeInTheDocument()
    expect(historyElement).toHaveTextContent('')
    expect(resultElement).toHaveTextContent('0')
  })

  it('should apply correct CSS classes', () => {
    render(<Display history="10 * 2" result="20" />)
    
    const displayContainer = document.querySelector('.display')
    const historyElement = document.querySelector('.display-history')
    const resultElement = document.querySelector('.display-result')
    
    expect(displayContainer).toBeInTheDocument()
    expect(historyElement).toBeInTheDocument()
    expect(resultElement).toBeInTheDocument()
  })

  it('should handle long numbers in result', () => {
    const longNumber = '1,234,567,890'
    render(<Display history="" result={longNumber} />)
    
    expect(screen.getByText(longNumber)).toBeInTheDocument()
  })

  it('should handle error state', () => {
    render(<Display history="5 / 0" result="Error" />)
    
    expect(screen.getByText('5 / 0')).toBeInTheDocument()
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('should handle complex operations in history', () => {
    const complexHistory = '√(16) + 5 * 2'
    render(<Display history={complexHistory} result="14" />)
    
    expect(screen.getByText(complexHistory)).toBeInTheDocument()
    expect(screen.getByText('14')).toBeInTheDocument()
  })
})