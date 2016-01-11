export default function parse(str) {
  // implicit Date.parse( .. )
  const date = new Date()

  // correct for local time
  const offset = date.getTimezoneOffset() * 60 * 1000

  // returns NaN or number (epoch offset)
  const parsed = Date.parse(str)
  const valid  = !isNaN(parsed)

  // if the date is valid, add the offset and save the value
  if (valid) date.setTime(parsed + offset)

  return { date, valid }
}
