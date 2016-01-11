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

  it('renders the toggle button into the document', () => {
    const buttonNode = document.querySelectorAll('.ca11y__toggle')
    assert.equal(buttonNode.length, 1)
  })

  it('renders the calendar into the document', () => {
    const ca11yNode = document.querySelectorAll('.ca11y__picker')
    assert.equal(ca11yNode.length, 1)
  })
})
