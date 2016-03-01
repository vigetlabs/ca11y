import Ca11y from './ca11y'

Ca11y.init('[data-module="ca11y"]', {
  format: ['yyyy', 'mm', 'dd'],
  delimiter: '-',
  onDaySet: function(state) {
    console.log('Day set!')
    console.log(state)
  }
})
