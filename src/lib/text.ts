export function formatJson(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return ''
  try {
    const parsed = JSON.parse(trimmed)
    return JSON.stringify(parsed, null, 4)
  } catch (err) {
    throw new Error('Invalid JSON')
  }
}

export function unescapeSequences(input: string): string {
  return input
    .replace(/\\r/g, '\r')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')
    .replace(/\\\\/g, '\\')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_m, g1) => String.fromCharCode(parseInt(g1, 16)))
}
