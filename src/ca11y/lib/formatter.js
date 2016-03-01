export default function formatter(state, format, delimiter, date) {
  return format.map((format)=> state[format]).join(delimiter)
}
