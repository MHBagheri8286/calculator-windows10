import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../Button'
import type { ButtonConfig } from '@models/calculator'

describe('Button Component', () => {
  const mockOnClick = vi.fn()

  const defaultButton: ButtonConfig = {
    value: '1',
    label: '1',
    type: 'number',
    className: 'btn-number'
  }

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('should render button with correct label', () => {
    render(<Button button={defaultButton} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: '1' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('1')
  })

  it('should apply correct CSS classes', () => {
    render(<Button button={defaultButton} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'btn-number')
  })

  it('should call onClick handler when clicked', () => {
    render(<Button button={defaultButton} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith(defaultButton)
  })

  it('should render operator button correctly', () => {
    const operatorButton: ButtonConfig = {
      value: '+',
      label: '+',
      type: 'operator',
      className: 'btn-operator'
    }

    render(<Button button={operatorButton} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: '+' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn', 'btn-operator')
  })

  it('should render equals button correctly', () => {
    const equalsButton: ButtonConfig = {
      value: '=',
      label: '=',
      type: 'equals',
      className: 'btn-equals'
    }

    render(<Button button={equalsButton} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: '=' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn', 'btn-equals')
  })

  it('should handle special symbols correctly', () => {
    const backspaceButton: ButtonConfig = {
      value: 'backspace',
      label: '⌫',
      type: 'function',
      className: 'btn-operator'
    }

    render(<Button button={backspaceButton} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: '⌫' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('⌫')
  })

  it('should work without optional className', () => {
    const buttonWithoutClass: ButtonConfig = {
      value: '2',
      label: '2',
      type: 'number'
    }

    render(<Button button={buttonWithoutClass} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn')
    expect(button).not.toHaveClass('undefined')
  })
})