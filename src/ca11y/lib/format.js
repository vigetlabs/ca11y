import strftime from 'fast-strftime'

export default function format(date) {
  return strftime('%F', date)
}
