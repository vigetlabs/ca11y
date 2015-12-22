import DatePicker from './DatePicker'

const datePickers = Array.from(document.querySelectorAll('[data-module=DatePicker]') || 0)

datePickers.forEach((input) => new DatePicker(input))
