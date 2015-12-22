import Ca11yndar from './ca11yndar'

const datePickers = Array.from(document.querySelectorAll('[data-module=ca11yndar]') || 0)

datePickers.forEach((input) => new Ca11yndar(input))
