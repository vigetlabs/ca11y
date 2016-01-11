export default function validate(options) {
  if (!!options.parse && typeof options.parse !== 'function') {
    throw new TypeError(`Ca11y: "options.parse" must be a function.`)
  }

  if (!!options.format && typeof options.format !== 'function') {
    throw new TypeError(`Ca11y: "options.format" must be a function.`)
  }
}
