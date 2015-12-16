import delegate from 'delegate'
import defaults from './lib/defaults'
import zeroPad from './lib/zeroPad'

export default class DatePicker {
  constructor(el, options = {}) {
    this.constants = Object.assign({}, defaults, options)
    this.setUI(el)
    this.getInitialState()
    this.listen()
  }

  setUI(el) {
    this.ui = {
      input: el,
      wrapper: el.parentElement,
      calendar: document.createElement('div')
    }

    this.ui.calendar.className = 'calendar'
    this.ui.wrapper.appendChild(this.ui.calendar)
  }

  getInitialState() {
    const today = new Date()
    this.state = {
      today: {
        fullYear: today.getFullYear(),
        day: today.getDate(),
        month: today.getMonth()
      }
    }
    this.initialize(today)
  }

  listen() {
    delegate(this.ui.wrapper, '#calendar__next', 'click', this.incrementMonth.bind(this,  1))
    delegate(this.ui.wrapper, '#calendar__prev', 'click', this.incrementMonth.bind(this,  -1))
    delegate(this.ui.wrapper, '.calendar__day', 'click', this.onDayClick.bind(this))
  }

  initialize(date) {
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()
    const monthName = this.constants.months[month].displayName || this.constants.months[month].fullName
    this.setState({
      date: date,
      day: day,
      monthName: monthName,
      month: month,
      monthDisplay: month + 1,
      fullYear: date.getFullYear(),
      totalDays: this.getDays(year, month),
      firstWeekdayValue: this.getFirstDay(year, month)
    })
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state)
    this.render()
  }

  onDayClick(e) {
    const day = Number(e.target.textContent)
    this.selectDay(day)
  }

  selectDay(day) {
    const date = new Date(this.state.fullYear, this.state.month, day)
    this.initialize(date)
    this.ui.input.value = `${zeroPad(this.state.monthDisplay)}/${zeroPad(this.state.day)}/${this.state.fullYear}`
    return this.state
  }

  incrementMonth(delta) {
    let month = this.state.month + delta
    let year = this.state.fullYear

    if(month > 11) {
      month = 0
      year += delta
    }

    if(month < 0) {
      month = 11
      year += delta
    }

    const date = new Date(year, month, 1)
    this.initialize(date)
  }

  getDays(year, month) {
    return 32 - new Date(year, month, 32).getDate()
  }

  getFirstDay(year, month) {
    return new Date(year, month, 1).getDay()
  }

  getGrid() {
    const { firstWeekdayValue, totalDays } = this.state
    const grid = [[], [], [], [], [], []]
    let rowIndex = 0

    for (let i = 1; i <= 42; i++) {
      let isEmpty = (i - 1 >= firstWeekdayValue) && (i <= totalDays + firstWeekdayValue)
      let day = isEmpty ? (i - firstWeekdayValue) : ''
      grid[rowIndex].push(day)
      if(i % 7 === 0) rowIndex++
    }

    return grid
  }

  isToday(currentDay) {
    const {day, month, fullYear} = this.state.today
    return currentDay === day && this.state.month === month && this.state.fullYear === fullYear
  }

  renderRows() {
    const grid = this.getGrid()
    return this.getGrid().reduce((string, row) => {
      const cells = row.map((day) => {
        const todayClass = this.isToday(day) ? ' -today' : ''
        const selectedClass = this.state.day === day ? ' -selected' : ''
        const data = day ? ` class="calendar__day${todayClass}${selectedClass}" data-day="${day}"` : ''
        const contents = day ? `<button role="button">${day}</button>` : ''
        return `<td${data}>${contents}</td>`
      }).join('')

      return string += `<tr>${cells}</tr>`
    }, '')
  }

  renderDayNames() {
    return this.constants.days.reduce((string, day) => {
      string += `<th aria-label="${day.fullName}">${day.displayName || day.fullName}</th>`
      return string
    }, '')
  }

  render() {
    this.ui.calendar.innerHTML = `
      <p role="heading">${this.state.monthName} ${this.state.fullYear}</p>
      <button id="calendar__prev">Previous</button>
      <button id="calendar__next">Next</button>
      <table>
        <thead>
          <tr>
            ${this.renderDayNames()}
          </tr>
        </thead>
        <tbody>
          ${this.renderRows()}
        </tbody>
      </table>
    `.trim()
  }
}
