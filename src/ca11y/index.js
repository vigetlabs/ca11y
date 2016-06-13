import delegate from 'delegate'
import defaults from './lib/defaults'
import keys     from './lib/keys'
import styles   from './lib/styles'
import template from './lib/template'
import validate from './lib/validate'
import util     from './lib/util'
import zeroPad  from './lib/zeroPad'
/**
 * Ca11y constructor.
 *
 * @param  { Node }   el       - the html input element to associate to this instance of Ca11y
 * @param  { Object } options  - configuration passed in to customize behavior
 * @return { Object } instance - an object representing the initialized instance of Ca11y
 **/
class Ca11y {

  constructor(el, options = {}) {
    Ca11y.pickers.push(this)
    validate(options)
    this.props = Object.assign({}, defaults, options, { id: Ca11y.pickers.length })
    this.setInitialState(el.value)
    this.setUI(el)
    this.listen()
    this.render(!options.autofill)
  }

  /**
   * An internal mechanism for updating state and re-rendering the UI.
   * @return { Void }
   **/
  setState(state, silent) {
    this.state = Object.assign({}, this.state, state)
    if (!silent) this.render()
  }

  /**
   * Initializes Ca11y's state. Initially set's Ca11y to have today's date selected.
   * @return { Void }
   **/
  setInitialState(value) {
    const parsedValue   = this.props.parser(value, this.props.format, this.props.delimiter)
    const dateFromValue = util.getDateInfo(parsedValue)
    const today         = util.getDateInfo(new Date())
    const initialDate   = dateFromValue || today
    this.state          = {}
    this.subscriptions  = []
    this.setState({ today }, true)
    this.setDate(initialDate.date, true)
  }

  /**
   * Initializes Cally's UI. Using configured options this method invokes
   * templates to populate the datepicker html and then queries the document
   * to populate Ca11y's `ui` prop. Appends the datepicker to the DOM.
   * @param  { Node } el - the input this Ca11y instance is associated with
   * @return { Void }
   **/
  setUI(el) {
    const calendarId = `ca11y-${ this.props.id }__picker`
    const input = typeof el === 'string' ? document.querySelector(el) : el

    this.ui = {
      input      : input,
      wrapper    : this.props.container || input.parentElement,
      datePicker : document.createElement('div')
    }

    this.ui.datePicker.className = 'ca11y'
    this.ui.datePicker.id        = `ca11y-${ this.props.id }`
    this.ui.datePicker.innerHTML = template.calendar(
      Object.assign({}, this.props, {
        calendarId,
        monthHeader : this.renderMonthHeader(),
        dayNames    : this.renderDayNames()
      })
    )

    this.ui.calendar     = this.ui.datePicker.querySelector(`#${calendarId}`)
    this.ui.calendarDays = this.ui.datePicker.querySelector('.ca11y__days')
    this.ui.monthCaption = this.ui.datePicker.querySelector('.ca11y__caption')
    this.ui.monthHeader  = this.ui.datePicker.querySelector('.ca11y__header')
    this.ui.toggle       = this.props.toggle || this.ui.datePicker.querySelector('.ca11y__toggle')
    this.ui.picker       = this.ui.datePicker.querySelector('.ca11y__picker')
    this.ui.wrapper.appendChild(this.ui.datePicker)

    // If using ca11y, disable native datepickers
    input.setAttribute('type', 'text')
  }

  /**
   * Initializes state. Initially set's Ca11y to have today's date selected.
   * @param { Date }    date   - the date to set Ca11y to
   * @param { Boolean } silent - should Ca11y re-render after updating? default: false
   * @return { Void }
   **/
  setDate(date, silent=false) {

    if(date.toString() === "Invalid Date") return

    const month     = date.getMonth()
    const day       = date.getDate()
    const year      = date.getFullYear()
    const monthName = this.props.months[month].displayName || this.props.months[month].fullName

    this.setState({
      date              : date,
      day               : day,
      monthName         : monthName,
      monthNameFull     : this.props.months[month].fullName,
      month             : month,
      monthDisplay      : month + 1,
      fullYear          : date.getFullYear(),
      totalDays         : util.getDays(year, month),
      firstWeekdayValue : util.getFirstDay(year, month),
      parsed: {
        d: day,
        dd:  zeroPad(day),
        ddd: this.props.days[date.getDay(day)].shortName,
        dddd:  this.props.days[date.getDay(day)].fullName,
        m: month + 1,
        mm:  zeroPad(month + 1),
        mmm: this.props.months[month].shortName,
        mmmm:  this.props.months[month].fullName,
        yy:  year.toString().substr(2,3),
        yyyy: year
      }
    }, silent)
  }

  /**
   * Initializes listeners. Initially set's Ca11y to have today's date selected.
   * @return { Void }
   **/
  listen() {
    this.subscriptions.push(
      delegate(this.ui.calendar, '.ca11y__nav.-next', 'click', this.incrementMonth.bind(this,  1)),
      delegate(this.ui.calendar, '.ca11y__nav.-prev', 'click', this.incrementMonth.bind(this,  -1)),
      delegate(this.ui.calendarDays, '.ca11y__day', 'click', this.onDayClick.bind(this)),
      delegate(this.ui.calendar, 'button', 'blur', this.close.bind(this), true),
      delegate(this.ui.calendar, 'button', 'focus', this.cancelClose.bind(this), true)
    )
    this.ui.wrapper.addEventListener('keydown', this.onKeydown.bind(this))
    this.ui.toggle.addEventListener('click', this.toggle.bind(this))
    this.ui.toggle.addEventListener('focus', this.cancelClose.bind(this))
    this.ui.input.addEventListener('change', this.onInputChange.bind(this))
  }

  /**
   * Tears down a Ca11y's instance.
   * @return { Void }
   **/
  destroy() {
    this.subscriptions.forEach(sub => sub.destroy())
    this.ui.wrapper.removeEventListener('keydown', this.onKeydown.bind(this))
    this.ui.toggle.removeEventListener('click', this.toggle.bind(this))
    this.ui.toggle.removeEventListener('focus', this.cancelClose.bind(this))
    this.ui.input.removeEventListener('change', this.onInputChange.bind(this))
    this.ui.wrapper.removeChild(this.ui.datePicker)
  }

  /**
   * Focuses the node representing the currently selected day.
   * @return { Void }
   **/
  focusSelectedDay() {
    // You can't focus() an element during a transition,
    // and the `transtionend` event is a bubbling nightmare,
    // so we're relying on a manually defined transitionDuration
    clearTimeout(this.transitionTimeout)
    this.transitionTimeout = setTimeout(() => {
      this.ui.selectedDay.focus()
    }, this.props.transitionDuration)
  }

  /**
   * Key Down event handler for the associated input.
   * When the key is 'ESC', the datepicker should close.
   * @return { Void }
   **/
  onKeydown(e) {
    if (e.keyCode === keys.esc) this.close()
  }

  /**
   * Change event handler for the associated input.
   * When the value changes and isn't empty, attempt to parse it. If parsing
   * succeeds, set Ca11y to the resulting date.
   * @param  { Object } e - the event object
   * @return { Void }
   **/
  onInputChange(e) {
    if (e.target.value) {
      const parsedDate = this.props.parser(e.target.value, this.props.format, this.props.delimiter)

      if (parsedDate) {
        this.setDate(parsedDate)
      } else {
        this.setDate(util.getToday()) // show current month
        // #TODO: set state to focused, not selected
        // If the date is not valid, Ca11y will not display a selected date but
        // will show the current month.
      }
    }
  }

  /**
   * Toggle Ca11y's open state.
   * @return { Void }
   **/
  toggle() {
    this.state.isOpen ? this.close() : this.open()
  }

  /**
   * Shows the Ca11y datepicker and focuses the selected day.
   * @return { Void }
   **/
  open() {
    clearTimeout(this.closeTimeout)
    this.ui.calendar.removeAttribute('aria-hidden')
    this.ui.monthHeader.innerHTML = this.renderMonthHeader()
    this.state.isOpen = true
    this.focusSelectedDay()
  }

  /**
   * Cancel the close timeout. Used to prevent `close` from executing after `open`
   * has been fired if it's fired after `close` but before the timeout has fired.
   * @return { Void }
   **/
  cancelClose() {
    clearTimeout(this.closeTimeout)
  }

  /**
   * Closes the datepicker after a short delay (100ms).
   * @param  { Boolean } silent - should Ca11y re-render after the update?
   * @return { Void }
   **/
  close(silent) {
    this.closeTimeout = setTimeout(() => {
      if (!silent) this.ui.toggle.focus()
      this.ui.calendar.setAttribute('aria-hidden', true)
      this.state.isOpen = false
      clearTimeout(this.transitionTimeout)
    }, 100)
  }

  /**
   * Click event handler for each day displayed in the calendar. Parses
   * which day was clicked and delegates to `selectDay`.
   * @param  { Object } e - the event object
   * @return { Void }
   **/
  onDayClick(e) {
    const day = Number(e.target.textContent)
    this.selectDay(day)
  }

  /**
   * Selects a day, updating internal state and, if `silent` is true, the input's
   * value as well. If `keepOpen` is not true, the datepicker is hidden afterwards.
   *
   * @param  { Number }  day      - 1-indexed day number to select
   * @param  { Boolean } keepOpen - keep the datepicker open after selecting the day?
   * @param  { Boolean } silent   - re-render after updates?
   * @return { Void }
   **/
  selectDay(day, keepOpen=false, silent=false) {
    const { month, fullYear } = this.state
    const date = new Date(fullYear, month, day)

    this.setDate(date, silent)

    if (!keepOpen) this.close(silent)
  }

  /**
   * Helper method to increment the selected month up or down based on a
   * provided delta. Handles changes that would cause the month to be out
   * of bounds by correctly incrementing/decrementing the year.
   * @param  { Number } delta - either "1" or "-1" (forward or backwards 1 month)
   * @return { Void }
   **/
  incrementMonth(delta) {
    this.cancelClose()
    let month = this.state.month + delta
    let year  = this.state.fullYear

    if (month > 11) {
      month = 0
      year += delta
    }

    if (month < 0) {
      month = 11
      year += delta
    }

    const date = new Date(year, month, 1)
    this.setDate(date)
  }

  /**
   * Determines if a day is today.
   * @param  { Number } currentDay - the day number to compare with
   * @return { Boolean } whether the given day is the same as `this.state.today`
   **/
  isToday(currentDay) {
    const { day, month, fullYear } = this.state.today

    return (
      currentDay === day &&
      this.state.month === month &&
      this.state.fullYear === fullYear
    )
  }

  /**
   * Collects the necessary information to render an individual
   * day table-cell in the calendar grid.
   * @param  { Number } day - the day number
   * @return { Object } dayData
   **/
  getDayData(day) {
    return {
      day,
      title               : this.props.dayTitles[day - 1],
      cellEmptyClass      : (day ? '' : ' -empty'),
      cellAriaHidden      : (day ? '' : ' aria-hidden="true"'),
      buttonTodayClass    : (this.isToday(day) ? ' -today' : ''),
      buttonSelectedClass : (this.state.day === day ? ' -selected' : '')
    }
  }

  /**
   * Renders the calendar's rows.
   * @return { String } rows - html string representing the calendar table rows
   **/
  renderRows() {
    const { firstWeekdayValue, totalDays } = this.state

    return util.getGrid(firstWeekdayValue, totalDays).reduce((string, row) => {
      const cells = row.map(day => template.tableCell(this.getDayData(day))).join('')
      return string + template.tableRow({ cells })
    }, '')
  }

  /**
   * Renders the calendar's table header consisting of day names.
   * @return { String } rows - html string representing the calendar table rows
   **/
  renderDayNames() {
    return this.props.days.reduce((string, day) => string + template.tableHeader({ day }), '')
  }

  /**
   * Renders the calendar's label consisting of the month name and year.
   * @return { String } rows - html string representing the calendar table rows
   **/
  renderMonthHeader() {
    const { monthNameFull, monthName, fullYear } = this.state
    return template.monthHeader({ monthNameFull, monthName, fullYear })
  }

  /**
   * Renders the calendar. Updates the month header html content, the month caption
   * html content, the calendar days html content, and the selected day DOM node reference.
   * @return { Void }
   **/
  render(silent) {
    const { input, monthHeader, monthCaption, calendarDays, selectedDay, calendar } = this.ui
    const { parsed } = this.state
    const { format, formatter, delimiter, date, onSelect } = this.props
    const formattedValue = formatter(parsed, format, delimiter, date)

    monthHeader.innerHTML    = this.renderMonthHeader()
    monthCaption.textContent = `${this.state.monthNameFull} ${this.state.fullYear}`
    calendarDays.innerHTML   = this.renderRows()
    this.ui.selectedDay      = calendar.querySelector('.ca11y__day.-selected')

    // update the input to reflect new state
    if(!silent) onSelect(input, formattedValue, parsed, date)
  }
}

/**
 * Ca11y.pickers is used to globally track instances of Ca11y within a give page.
 **/
Ca11y.pickers = []

/**
 * Ca11y.init is used to instantiate multiple datepickers on a page simultaneously.
 **/
Ca11y.init = function(selector, options) {
  const datePickers = document.querySelectorAll(selector)
  for (let i = 0; i < datePickers.length; i++) {
    const input = datePickers[i]
    new Ca11y(input, options)
  };
}

export default Ca11y
