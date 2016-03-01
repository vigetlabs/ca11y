export default function validate(options) {
  if (!!options.parser && typeof options.parser !== 'function') {
    throw new TypeError(`Ca11y: "options.parser" must be a function.`)
  }

  if (!!options.formatter && typeof options.formatter !== 'function') {
    throw new TypeError(`Ca11y: "options.formatter" must be a function.`)
  }
}
