import { cn, getBlockBar } from './utils'

describe('cn()', () => {
  it('returns empty string when called with no arguments', () => {
    expect(cn()).toBe('')
  })

  it('returns single class unchanged', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('combines multiple classes with a space', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('includes class when condition is truthy', () => {
    expect(cn('foo', true && 'bar')).toBe('foo bar')
  })

  it('excludes class when condition is falsy', () => {
    expect(cn('foo', false && 'bar')).toBe('foo')
  })

  it('merges conflicting Tailwind classes (later wins): cn("p-2", "p-4") → "p-4"', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('handles null and undefined arguments gracefully', () => {
    expect(cn('foo', null, undefined, 'bar')).toBe('foo bar')
  })
})

describe('getBlockBar()', () => {
  it('normal case: value=2, max=5, length=5 → { filled: 2, empty: 3 }', () => {
    expect(getBlockBar(2, 5, 5)).toEqual({ filled: 2, empty: 3 })
  })

  it('value=0 → { filled: 0, empty: 5 }', () => {
    expect(getBlockBar(0, 5, 5)).toEqual({ filled: 0, empty: 5 })
  })

  it('value equals max → { filled: 5, empty: 0 }', () => {
    expect(getBlockBar(5, 5, 5)).toEqual({ filled: 5, empty: 0 })
  })

  it('value exceeds max → filled is capped at length', () => {
    expect(getBlockBar(10, 5, 5)).toEqual({ filled: 5, empty: 0 })
  })

  it('uses default length of 5 when not specified', () => {
    expect(getBlockBar(2, 5)).toEqual({ filled: 2, empty: 3 })
  })

  it('custom length=10: value=3, max=10 → { filled: 3, empty: 7 }', () => {
    expect(getBlockBar(3, 10, 10)).toEqual({ filled: 3, empty: 7 })
  })
})
