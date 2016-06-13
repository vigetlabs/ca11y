import Ca11y from './ca11y'

Ca11y.init('[data-module="ca11y"]', {
  container: document.querySelector('.picker-container'),
  toggle: document.querySelector('.picker-toggle'),
  format: ['yyyy', 'mm', 'dd'],
  delimiter: '-'
})
