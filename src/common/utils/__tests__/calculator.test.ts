import { describe, expect, it } from 'vitest'
import { calculate, formatNumber, parseFormattedNumber, performFunction } from '../calculator'

describe('calculator utils', () => {
  describe('calculate', () => {
    it('should add two numbers correctly', () => {
      expect(calculate(5, 3, '+')).toBe(8)
      expect(calculate(0, 0, '+')).toBe(0)
      expect(calculate(-5, 3, '+')).toBe(-2)
    })

    it('should subtract two numbers correctly', () => {
      expect(calculate(5, 3, '-')).toBe(2)
      expect(calculate(0, 5, '-')).toBe(-5)
      expect(calculate(-5, -3, '-')).toBe(-2)
    })

    it('should multiply two numbers correctly', () => {
      expect(calculate(5, 3, '*')).toBe(15)
      expect(calculate(0, 5, '*')).toBe(0)
      expect(calculate(-5, 3, '*')).toBe(-15)
    })

    it('should divide two numbers correctly', () => {
      expect(calculate(15, 3, '/')).toBe(5)
      expect(calculate(0, 5, '/')).toBe(0)
      expect(calculate(-15, 3, '/')).toBe(-5)
    })

    it('should throw error when dividing by zero', () => {
      expect(() => calculate(5, 0, '/')).toThrow('Cannot divide by zero')
    })

    it('should return second operand for null operation', () => {
      expect(calculate(5, 3, null)).toBe(3)
    })
  })

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000')
      expect(formatNumber(1234567)).toBe('1,234,567')
    })

    it('should handle decimal numbers', () => {
      expect(formatNumber(1234.56)).toBe('1,234.56')
      expect(formatNumber(0.123)).toBe('0.123')
    })

    it('should use exponential notation for very long numbers', () => {
      const longNumber = 12345678901234578
      const result = formatNumber(longNumber)
      expect(result).toMatch(/e\+/)
    })

    it('should handle negative numbers', () => {
      expect(formatNumber(-1000)).toBe('-1,000')
      expect(formatNumber(-1234.56)).toBe('-1,234.56')
    })
  })

  describe('parseFormattedNumber', () => {
    it('should parse formatted numbers correctly', () => {
      expect(parseFormattedNumber('1,000')).toBe(1000)
      expect(parseFormattedNumber('1,234,567')).toBe(1234567)
      expect(parseFormattedNumber('1,234.56')).toBe(1234.56)
    })

    it('should handle numbers without formatting', () => {
      expect(parseFormattedNumber('123')).toBe(123)
      expect(parseFormattedNumber('123.45')).toBe(123.45)
    })

    it('should handle negative numbers', () => {
      expect(parseFormattedNumber('-1,000')).toBe(-1000)
      expect(parseFormattedNumber('-123.45')).toBe(-123.45)
    })
  })

  describe('performFunction', () => {
    it('should calculate square root correctly', () => {
      expect(performFunction(9, 'sqrt')).toBe(3)
      expect(performFunction(16, 'sqrt')).toBe(4)
      expect(performFunction(0, 'sqrt')).toBe(0)
    })

    it('should throw error for negative square root', () => {
      expect(() => performFunction(-9, 'sqrt')).toThrow('Invalid input')
    })

    it('should calculate square correctly', () => {
      expect(performFunction(3, 'sqr')).toBe(9)
      expect(performFunction(5, 'sqr')).toBe(25)
      expect(performFunction(0, 'sqr')).toBe(0)
      expect(performFunction(-3, 'sqr')).toBe(9)
    })

    it('should calculate cube correctly', () => {
      expect(performFunction(3, 'cube')).toBe(27)
      expect(performFunction(2, 'cube')).toBe(8)
      expect(performFunction(0, 'cube')).toBe(0)
      expect(performFunction(-2, 'cube')).toBe(-8)
    })

    it('should calculate fraction correctly', () => {
      expect(performFunction(4, 'fraction')).toBe(0.25)
      expect(performFunction(2, 'fraction')).toBe(0.5)
      expect(performFunction(-4, 'fraction')).toBe(-0.25)
    })

    it('should throw error for fraction with zero', () => {
      expect(() => performFunction(0, 'fraction')).toThrow('Cannot divide by zero')
    })

    it('should calculate percentage correctly', () => {
      expect(performFunction(50, 'percentage')).toBe(0.5)
      expect(performFunction(100, 'percentage')).toBe(1)
      expect(performFunction(25, 'percentage')).toBe(0.25)
    })

    it('should negate numbers correctly', () => {
      expect(performFunction(5, 'negate')).toBe(-5)
      expect(performFunction(-5, 'negate')).toBe(5)
      expect(performFunction(0, 'negate')).toBe(0)
    })

    it('should return original value for unknown function', () => {
      expect(performFunction(5, 'unknown')).toBe(5)
    })
  })
})