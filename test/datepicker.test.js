import assert from 'assert'
import DatePicker from '../src/DatePicker'

describe('DatePicker', () => {
  let instance

  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/index.html']
    const input = document.getElementById('date-input')
    instance = new DatePicker(input)
  })

  afterEach(() => instance = null)

  it('has passing tests', () => {
    assert.ok(true)
  })
})
