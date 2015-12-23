import Ca11y from './ca11y'

const datePickers = Array.from(document.querySelectorAll('[data-module=ca11y]') || 0)

datePickers.forEach((input) => new Ca11y(input))
