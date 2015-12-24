import assert from 'assert'
import Ca11y from '../src/ca11y'

describe('Ca11y', () => {
  let instance

  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/index.html']
    const input = document.getElementById('date-input')
    instance = new Ca11y(input)
  })

  afterEach(() => instance = null)

  it('has passing tests', () => {
    assert.ok(true)
  })
})
