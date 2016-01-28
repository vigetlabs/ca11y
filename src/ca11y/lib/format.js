export default function format(state, format, delimiter, date) {
  return format.map((format)=> state[format]).join(delimiter)
}
