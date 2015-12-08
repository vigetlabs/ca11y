class Calendar {
  constructor() {
    this.getInitialState()
  }

  getInitialState() {
    this.state = {}
    this.initialize(new Date())
  },

  initialize(date) {
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()

    this.setState({
      date: date,
      monthName: monthNames[month],
      monthValue: month,
      weekdayName: null,
      weekdayValue: null,
      fullYear: date.getFullYear(),
      totalDays: this.getDays(year, month),
      firstWeekdayValue: this.getFirstDay(year, month)
    })
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state)
    this.render()
  }

  getDays(year, month) {
    return 32 - new Date(year, month, 32).getDate()
  }

  getStartWeekday(year, month) {
    return  new Date(year, month, 1).getDay()
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
    return this.getGrid.reduce(() => {
      const cells = row.map((day) => {
        return `<td>${day}</td>`
      })

      return string += `<tr>${cells}</tr>`
    }, '')
  }

  render() {
    this.ui.wrapper.innerHTML = `
      <div className="ca11yndar">
        <p role="heading">${data.monthName}</p>
        <table>
          <thead>
            <tr>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          <tbody>
            ${this.renderRows}
          </tbody>
        </table>
      </div>
    `
  }
}
