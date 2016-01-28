import zeroPad from './zeroPad'

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
        type: 'dd',
        value: zeroPad(value)
      }
    case 'dd':
      return {
        type: 'dd',
        value: value
      }
    case 'm':
      return {
        type: 'mm',
        value: zeroPad(value)
      }
    case 'mm':
      return {
        type: 'mm',
        value: value
      }
    case 'mmm':
      timestamp = Date.parse(`${dayStub} ${value} ${yearStub}`)
      return {
        type: 'mm',
        value: zeroPad(new Date(timestamp).getMonth())
      }
    case 'mmmm':
      timestamp = Date.parse(`${dayStub} ${value} ${yearStub}`)
      return {
        type: 'mm',
        value: zeroPad(new Date(timestamp).getMonth())
      }
    case 'yy':
      return {
        type: 'yyyy',
        value: `${inferCenturyFromTwoDigitYear(value)}${value}`
      }
    case 'yyyy':
      return {
        type: 'yyyy',
        value: value
      }
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

  const { yyyy, mm, dd } = normalized
  const valid = yyyy && mm && dd
  console.log(normalized)
  const date = new Date(`${yyyy}-${mm}-${dd}`)
  return { date, valid }
}
