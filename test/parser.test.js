import parser from '../src/ca11y/lib/parser'
import assert from 'assert'

describe('parser.js', () => {
  it('parses a string into a Date object', () => {
    const parsed = parser('10/29/1984', ['mm', 'dd', 'yyyy'], '/')
    assert.equal(parsed.getFullYear(), 1984)
    assert.equal(parsed.getMonth(), 9) // months are zero indexed
    assert.equal(parsed.getDate(), 29)
  })

  it('throws if passed an invalid format', () => {
    assert.throws(function() {
      const date = parser('10/29/1984', ['xx', 'yy', 'zzzz'], '/')
    })
  })
})
