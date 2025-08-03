import { describe, it, expect } from 'vitest'
import { prettifyJsonFn, escapeFn, unescapeFn } from './jsonUtils'

describe('prettifyJsonFn', () => {
  it('formats valid JSON with indentation', () => {
    const input = '{"name":"John","age":30}'
    const output = prettifyJsonFn(input)
    expect(output).toBe('{\n  "name": "John",\n  "age": 30\n}')
  })

  it('returns error message for invalid JSON', () => {
    expect(prettifyJsonFn('{bad json}')).toBe('Invalid JSON')
  })
})

describe('escapeFn', () => {
  it('escapes special characters correctly', () => {
    const input = 'line1\nline2\t"text"'
    expect(escapeFn(input)).toBe('line1\\nline2\\t\\"text\\"')
  })
})

describe('unescapeFn', () => {
  it('unescapes correctly escaped characters', () => {
    const input = 'line1\\nline2\\t\\"text\\"'
    expect(unescapeFn(input)).toBe('line1\nline2\t"text"')
  })
})
