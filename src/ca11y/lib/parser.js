import zeroPad from './zeroPad'
import util from './util'

export function inferCenturyFromTwoDigitYear(year) {
  const thisYear = new Date().getFullYear()
  const thisCentury = thisYear.toString().substring(0, 2)
  const isTheFuture = Number(`${thisCentury}${year}`) > thisYear
  return zeroPad(isTheFuture ? thisCentury - 1 : thisCentury)
}

export function parseChunk(format, value) {
  const date = new Date()
  let dayStub = 1
  let month = 1
  let yearStub = 2000
  let timestamp = null

  switch (format) {
    case 'd':
      return {
        type: 'day',
        value: Number(value)
      }
    case 'dd':
      return {
        type: 'day',
        value: Number(value)
      }
    case 'm':
      return {
        type: 'month',
        value: Number(value)
      }
    case 'mm':
      return {
        type: 'month',
        value: Number(value - 1)
      }
    case 'mmm':
      timestamp = Date.parse(`${dayStub} ${value} ${yearStub}`)
      return {
        type: 'month',
        value: new Date(timestamp).getMonth()
      }
    case 'mmmm':
      timestamp = Date.parse(`${dayStub} ${value} ${yearStub}`)
      return {
        type: 'month',
        value: new Date(timestamp).getMonth()
      }
    case 'yy':
      return {
        type: 'year',
        value: Number(`${inferCenturyFromTwoDigitYear(value)}${value}`)
      }
    case 'yyyy':
      return {
        type: 'year',
        value: value
      }
    default:
      throw new Error(`${format} is not a valid date format!`)
  }
}

export default function parser(string, format, delimiter) {
  const dateArray = string.split(delimiter)

  const normalized = format.reduce(function(formats, format, i) {
    const value = dateArray[i]
    const parsed = parseChunk(format, value)
    formats[parsed.type] = parsed.value
    return formats
  }, {})

  const { year, month, day } = normalized
  return new Date(year, month, day)
}
