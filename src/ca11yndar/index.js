import delegate from 'delegate'
import defaults from './lib/defaults'
import zeroPad  from './lib/zeroPad'
import keys     from './lib/keys'
import styles   from './lib/styles'

class Ca11yndar {
  constructor(el, options = {}) {
    Ca11yndar.pickers.push(this)
    this.props = Object.assign({}, defaults, options, {id: Ca11yndar.pickers.length })
    this.setInitialState()
    this.setUI(el)
    this.selectDay(this.state.day, false, true)
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
    this.setDate(today, true)
  }

  setDate(date, silent) {
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()
    const monthName = this.props.months[month].displayName || this.props.months[month].fullName
    this.setState({
      date: date,
      day: day,
      monthName: monthName,
      monthNameFull: this.props.months[month].fullName,
      month: month,
      monthDisplay: month + 1,
      fullYear: date.getFullYear(),
      totalDays: this.getDays(year, month),
      firstWeekdayValue: this.getFirstDay(year, month)
    }, silent)
  }

  listen() {
    delegate(this.ui.calendar, '.ca11yndar__nav.-next', 'click', this.incrementMonth.bind(this,  1))
    delegate(this.ui.calendar, '.ca11yndar__nav.-prev', 'click', this.incrementMonth.bind(this,  -1))
    delegate(this.ui.calendarDays, '.ca11yndar__day', 'click', this.onDayClick.bind(this))
    delegate(this.ui.calendar, 'button', 'blur', this.close.bind(this), true)
    delegate(this.ui.calendar, 'button', 'focus', this.cancelClose.bind(this), true)
    this.ui.wrapper.addEventListener('keydown', this.onKeydown.bind(this))
    this.ui.toggle.addEventListener('click', this.toggle.bind(this))
    this.ui.toggle.addEventListener('focus', this.cancelClose.bind(this))
  }

  focusSelectedDay() {
    // You can't focus() an element during a transition,
    // and the `transtionend` event is a bubbling nightmare,
    // so we're relying on a manually defined transitionDuration
    clearTimeout(this.transitionTimeout)
    this.transitionTimeout = setTimeout(() => {
      this.ui.selectedDay.focus()
    }, this.props.transitionDuration)
  }

  onKeydown(e) {
    if(e.keyCode === keys.esc) {
      this.close()
    }
  }

  setState(state, silent) {
    this.state = Object.assign({}, this.state, state)
    if(!silent) this.render()
  }

  toggle() {
    this.state.isOpen ? this.close() : this.open()
  }

  open() {
    clearTimeout(this.closeTimeout)
    this.ui.calendar.removeAttribute('aria-hidden')
    this.ui.monthHeader.innerHTML = this.renderMonthHeader()
    this.state.isOpen = true
    this.focusSelectedDay()
  }

  cancelClose() {
    clearTimeout(this.closeTimeout)
  }

  close(silent) {
    this.closeTimeout = setTimeout(() => {
      !silent && this.ui.toggle.focus()
      this.ui.calendar.setAttribute('aria-hidden', true)
      this.state.isOpen = false
      clearTimeout(this.transitionTimeout)
    }, 100)
  }

  onDayClick(e) {
    const day = Number(e.target.textContent)
    this.selectDay(day)
  }

  selectDay(day, keepOpen, silent) {
    if(!silent) {
      this.ui.input.value = `${zeroPad(this.state.monthDisplay)}/${zeroPad(day)}/${this.state.fullYear}`
    }
    this.setState({day})
    if(!keepOpen) {
      this.close(silent)
    }
  }

  // Helpers
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

  // Rendering
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
        let contents = ''
        if(day) {
          const todayClass = this.isToday(day) ? ' -today' : ''
          const selectedClass = this.state.day === day ? ' -selected' : ''
          contents = `<button type="button" class="ca11yndar__day${todayClass}${selectedClass}" data-day="${day}" aria-label="The ${this.props.dayTitles[day - 1]}">${day}</button>`
        }
        return `<td class="ca11yndar__cell ${!day && ' -empty'}"${!day && ' aria-hidden="true"'}>${contents}</td>`
      }).join('')

      return string += `<tr class="ca11yndar__row">${cells}</tr>`
    }, '')
  }

  renderDayNames() {
    return this.props.days.reduce((string, day) => {
      string += `<th class="datepicker__day-name" scope="col" aria-label="${day.fullName}">${day.displayName || day.fullName}</th>`
      return string
    }, '')
  }

  renderMonthHeader() {
    return `<span style="${styles.visuallyHidden}">${this.state.monthNameFull}</span> <span aria-hidden="true" class="ca11yndar__month-display">${this.state.monthName}</span> <span class="ca11yndar__year-display">${this.state.fullYear}</span>`
  }

  setUI(el) {
    const calendarId = `ca11yndar-${this.props.id}__picker`

    this.ui = {
      input: el,
      wrapper: el.parentElement,
      datePicker: document.createElement('div')
    }

    this.ui.datePicker.className = 'ca11yndar'
    this.ui.datePicker.id = `ca11yndar-${this.props.id}`
    this.ui.datePicker.innerHTML = `
      <button type="button" class="ca11yndar__toggle" aria-label="Toggle Date Picker" aria-controls="${calendarId}" aria-label="${this.props.toggle.label}">${this.props.toggle.html}</button>
      <div class="ca11yndar__picker" id="${calendarId}" aria-labelledby="ca11yndar__header" role="dialog" aria-hidden="true">
        <button class="ca11yndar__nav -prev" type="button" aria-label="${this.props.prev.label}">${this.props.prev.html}</button>
        <button class="ca11yndar__nav -next" type="button" aria-label="${this.props.next.label}">${this.props.next.html}</button>
        <p class="ca11yndar__header" role="heading" aria-live="assertive">${this.renderMonthHeader()}</p>
        <table class="ca11yndar__table">
          <caption class="ca11yndar__caption" style="${styles.visuallyHidden}"></caption>
          <thead class="ca11yndar__day-names">
            <tr>
              ${this.renderDayNames()}
            </tr>
          </thead>
          <tbody class="ca11yndar__days">
          </tbody>
        </table>
      </div>
    `.trim()

    this.ui.calendar     = this.ui.datePicker.querySelector(`#${calendarId}`)
    this.ui.calendarDays = this.ui.datePicker.querySelector('.ca11yndar__days')
    this.ui.monthCaption = this.ui.datePicker.querySelector('.ca11yndar__caption')
    this.ui.monthHeader  = this.ui.datePicker.querySelector('.ca11yndar__header')
    this.ui.toggle       = this.ui.datePicker.querySelector('.ca11yndar__toggle')
    this.ui.picker       = this.ui.datePicker.querySelector('.ca11yndar__picker')
    this.ui.wrapper.appendChild(this.ui.datePicker)
  }

  render() {
    this.ui.monthHeader.innerHTML = this.renderMonthHeader()
    this.ui.monthCaption.textContent = `${this.state.monthNameFull} ${this.state.fullYear}`
    this.ui.calendarDays.innerHTML = this.renderRows()
    this.ui.selectedDay = this.ui.calendar.querySelector('.ca11yndar__day.-selected')
  }
}

Ca11yndar.pickers = []

export default Ca11yndar
