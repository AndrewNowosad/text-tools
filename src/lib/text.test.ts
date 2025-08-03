import { describe, it, expect } from 'vitest'
import { formatJson, unescapeSequences } from './text'

describe('formatJson', () => {
  it('formats valid json with 4-space indent', () => {
    const input = '{"a":1,"b":{"c":[1,2]}}'
    const out = formatJson(input)
    expect(out).toContain('\n')
    expect(out).toContain('    "a"')
  })

  it('throws on invalid json', () => {
    expect(() => formatJson('not json')).toThrow(/Invalid JSON/)
  })

  it('returns empty on empty input', () => {
    expect(formatJson('   ')).toBe('')
  })
})

describe('unescapeSequences', () => {
  it('replaces common escapes', () => {
    const input = "Line1\\nLine2\\tTabbed\\rCR"
    const out = unescapeSequences(input)
    expect(out).toBe('Line1\nLine2\tTabbed\rCR')
  })

  it('handles unicode escape', () => {
    expect(unescapeSequences('\\u0041')).toBe('A')
  })
})
