export default function format(state, format, delimiter, date) {
  const chunks = format.map((format)=> state[format])
  console.log(state)
  return chunks.join(delimiter)
}
