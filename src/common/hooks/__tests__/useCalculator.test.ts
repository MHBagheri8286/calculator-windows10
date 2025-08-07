import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCalculator } from '../useCalculator'
import type { ButtonConfig } from '@models/calculator'

describe('useCalculator Hook', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useCalculator())
    
    expect(result.current.state.display).toBe('0')
    expect(result.current.state.history).toBe('')
    expect(result.current.state.currentValue).toBe(0)
    expect(result.current.state.previousValue).toBe(null)
    expect(result.current.state.operation).toBe(null)
    expect(result.current.state.waitingForOperand).toBe(false)
  })

  it('should handle number input correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    const numberButton: ButtonConfig = {
      value: '5',
      label: '5',
      type: 'number'
    }

    act(() => {
      result.current.handleButtonClick(numberButton)
    })

    expect(result.current.state.display).toBe('5')
    expect(result.current.state.currentValue).toBe(5)
  })

  it('should handle multiple number inputs correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    const buttons = [
      { value: '1', label: '1', type: 'number' as const },
      { value: '2', label: '2', type: 'number' as const },
      { value: '3', label: '3', type: 'number' as const }
    ]

    act(() => {
      buttons.forEach(button => result.current.handleButtonClick(button))
    })

    expect(result.current.state.display).toBe('123')
    expect(result.current.state.currentValue).toBe(123)
  })

  it('should handle decimal point correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    const decimalButton: ButtonConfig = {
      value: '.',
      label: '.',
      type: 'number'
    }

    act(() => {
      result.current.handleButtonClick({ value: '5', label: '5', type: 'number' })
      result.current.handleButtonClick(decimalButton)
      result.current.handleButtonClick({ value: '2', label: '2', type: 'number' })
    })

    expect(result.current.state.display).toBe('5.2')
    expect(result.current.state.currentValue).toBe(5.2)
  })

  it('should handle basic addition correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '5', label: '5', type: 'number' })
      result.current.handleButtonClick({ value: '+', label: '+', type: 'operator' })
      result.current.handleButtonClick({ value: '3', label: '3', type: 'number' })
      result.current.handleButtonClick({ value: '=', label: '=', type: 'equals' })
    })

    expect(result.current.state.display).toBe('8')
    expect(result.current.state.currentValue).toBe(8)
  })

  it('should handle basic subtraction correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '9', label: '9', type: 'number' })
      result.current.handleButtonClick({ value: '-', label: '-', type: 'operator' })
      result.current.handleButtonClick({ value: '4', label: '4', type: 'number' })
      result.current.handleButtonClick({ value: '=', label: '=', type: 'equals' })
    })

    expect(result.current.state.display).toBe('5')
    expect(result.current.state.currentValue).toBe(5)
  })

  it('should handle basic multiplication correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '6', label: '6', type: 'number' })
      result.current.handleButtonClick({ value: '*', label: '*', type: 'operator' })
      result.current.handleButtonClick({ value: '7', label: '7', type: 'number' })
      result.current.handleButtonClick({ value: '=', label: '=', type: 'equals' })
    })

    expect(result.current.state.display).toBe('42')
    expect(result.current.state.currentValue).toBe(42)
  })

  it('should handle basic division correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '1', label: '1', type: 'number' })
      result.current.handleButtonClick({ value: '5', label: '5', type: 'number' })
      result.current.handleButtonClick({ value: '/', label: '/', type: 'operator' })
      result.current.handleButtonClick({ value: '3', label: '3', type: 'number' })
      result.current.handleButtonClick({ value: '=', label: '=', type: 'equals' })
    })

    expect(result.current.state.display).toBe('5')
    expect(result.current.state.currentValue).toBe(5)
  })

  it('should handle clear (C) correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '5', label: '5', type: 'number' })
      result.current.handleButtonClick({ value: 'C', label: 'C', type: 'clear' })
    })

    expect(result.current.state.display).toBe('0')
    expect(result.current.state.currentValue).toBe(0)
    expect(result.current.state.history).toBe('')
  })

  it('should handle clear entry (CE) correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '5', label: '5', type: 'number' })
      result.current.handleButtonClick({ value: '+', label: '+', type: 'operator' })
      result.current.handleButtonClick({ value: '3', label: '3', type: 'number' })
      result.current.handleButtonClick({ value: 'CE', label: 'CE', type: 'clear' })
    })

    expect(result.current.state.display).toBe('0')
    expect(result.current.state.currentValue).toBe(0)
    expect(result.current.state.previousValue).toBe(5)
    expect(result.current.state.operation).toBe('+')
  })

  it('should handle backspace correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '1', label: '1', type: 'number' })
      result.current.handleButtonClick({ value: '2', label: '2', type: 'number' })
      result.current.handleButtonClick({ value: '3', label: '3', type: 'number' })
      result.current.handleButtonClick({ value: 'backspace', label: '⌫', type: 'function' })
    })

    expect(result.current.state.display).toBe('12')
    expect(result.current.state.currentValue).toBe(12)
  })

  it('should handle square root function correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '9', label: '9', type: 'number' })
      result.current.handleButtonClick({ value: 'sqrt', label: '√x', type: 'function' })
    })

    expect(result.current.state.display).toBe('3')
    expect(result.current.state.currentValue).toBe(3)
  })

  it('should handle negate function correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '5', label: '5', type: 'number' })
      result.current.handleButtonClick({ value: 'negate', label: '±', type: 'function' })
    })

    expect(result.current.state.display).toBe('-5')
    expect(result.current.state.currentValue).toBe(-5)
  })

  it('should handle division by zero error', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '5', label: '5', type: 'number' })
      result.current.handleButtonClick({ value: '/', label: '/', type: 'operator' })
      result.current.handleButtonClick({ value: '0', label: '0', type: 'number' })
      result.current.handleButtonClick({ value: '=', label: '=', type: 'equals' })
    })

    expect(result.current.state.display).toBe('Error')
  })

  it('should handle continuous operations correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => {
      result.current.handleButtonClick({ value: '5', label: '5', type: 'number' })
      result.current.handleButtonClick({ value: '+', label: '+', type: 'operator' })
      result.current.handleButtonClick({ value: '3', label: '3', type: 'number' })
      result.current.handleButtonClick({ value: '*', label: '*', type: 'operator' })
      result.current.handleButtonClick({ value: '2', label: '2', type: 'number' })
      result.current.handleButtonClick({ value: '=', label: '=', type: 'equals' })
    })

    expect(result.current.state.display).toBe('16')
    expect(result.current.state.currentValue).toBe(16)
  })
})