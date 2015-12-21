import delegate from 'delegate'
import defaults from './lib/defaults'
import zeroPad from './lib/zeroPad'

const keys = {
  esc: 27
}

export default class DatePicker {
  constructor(el, options = {}) {
    this.props = Object.assign({}, defaults, options)
    this.setUI(el)
    this.setInitialState()
    this.listen()
  }

  setInitialState() {
    const today = new Date()
    this.state = {
      today: {
        fullYear: today.getFullYear(),
        day: today.getDate(),
        month: today.getMonth()
      }
    }
    this.setDate(today)
  }

  setDate(date) {
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()
    const monthName = this.props.months[month].displayName || this.props.months[month].fullName
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

  listen() {
    delegate(this.ui.wrapper, '#calendar__next', 'click', this.incrementMonth.bind(this,  1))
    delegate(this.ui.wrapper, '#calendar__prev', 'click', this.incrementMonth.bind(this,  -1))
    delegate(this.ui.wrapper, '.calendar__day', 'click', this.onDayClick.bind(this))
    delegate(this.ui.wrapper, 'button', 'blur', this.close.bind(this), true)
    delegate(this.ui.wrapper, 'button', 'focus', this.open.bind(this), true)
    this.ui.input.addEventListener('focus', this.open.bind(this))
    this.ui.input.addEventListener('blur', this.close.bind(this))
    this.ui.wrapper.addEventListener('keydown', this.onKeydown.bind(this))
  }

  onKeydown(e) {
    if(e.keyCode === keys.esc) {
      this.close()
    }
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state)
    this.render()
  }

  open() {
    clearTimeout(this.closeTimeout)
    this.selectDay(this.state.day, true)
    this.ui.datePicker.removeAttribute('style')
  }

  close() {
    clearTimeout(this.closeTimeout)
    this.closeTimeout = setTimeout(() => {
      this.ui.datePicker.style.display = 'none'
    }, 120)
  }

  onDayClick(e) {
    const day = Number(e.target.textContent)
    this.selectDay(day)
  }

  selectDay(day, keepOpen) {
    this.ui.input.value = `${zeroPad(this.state.monthDisplay)}/${zeroPad(day)}/${this.state.fullYear}`
    if(!keepOpen) {
      this.close()
    }
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
    this.setDate(date)
  }

  getDays(year, month) {
    return 32 - new Date(year, month, 32).getDate()
  }

  getFirstDay(year, month) {
    return new Date(year, month, 1).getDay()
  }

  isToday(currentDay) {
    const {day, month, fullYear} = this.state.today
    return currentDay === day && this.state.month === month && this.state.fullYear === fullYear
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

  renderRows() {
    return this.getGrid().reduce((string, row) => {

      const cells = row.map((day) => {
        const todayClass = this.isToday(day) ? ' -today' : ''
        const selectedClass = this.state.day === day ? ' -selected' : ''
        const data = day ? ` class="calendar__day${todayClass}${selectedClass}" data-day="${day}"` : ''
        const contents = day ? `<button type="button">${day}</button>` : ''
        return `<td${data}>${contents}</td>`
      }).join('')

      return string += `<tr>${cells}</tr>`
    }, '')
  }

  renderDayNames() {
    return this.props.days.reduce((string, day) => {
      string += `<th aria-label="${day.fullName}">${day.displayName || day.fullName}</th>`
      return string
    }, '')
  }

  setUI(el) {
    this.ui = {
      input: el,
      wrapper: el.parentElement,
      toggle: document.createElement('button'),
      datePicker: document.createElement('div')
    }

    this.ui.datePicker.className = 'calendar'
    this.ui.datePicker.style.display = 'none'
    this.ui.datePicker.innerHTML = `
      <p class="calendar__header" role="heading"></p>
      <button id="calendar__prev" type="button">${this.props.previousLabel}</button>
      <button id="calendar__next" type="button">${this.props.nextLabel}</button>
      <table>
        <thead class="datepicker__day-names">
          <tr>
            ${this.renderDayNames()}
          </tr>
        </thead>
        <tbody class="datepicker__calendar">
        </tbody>
      </table>
    `.trim()

    this.ui.monthHeader = this.ui.datePicker.querySelector('.calendar__header')
    this.ui.calendarPage = this.ui.datePicker.querySelector('.datepicker__calendar')
    this.ui.wrapper.appendChild(this.ui.datePicker)
  }

  render() {
    this.ui.monthHeader.textContent = `${this.state.monthName} ${this.state.fullYear}`
    this.ui.calendarPage.innerHTML = this.renderRows()
  }
}
