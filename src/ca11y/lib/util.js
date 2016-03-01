export default {
  isDateValid(date) {
    // http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      return false
    }
    return !isNaN(date.getTime())
  },

  getDateInfo(date) {
    if (this.isDateValid(date)) {
      return {
        date     : date,
        fullYear : date.getFullYear(),
        day      : date.getDate(),
        month    : date.getMonth()
      }
    } else {
      return false
    }
  },

  getDays(year, month) {
    return 32 - new Date(year, month, 32).getDate()
  },

  getFirstDay(year, month) {
    return new Date(year, month, 1).getDay()
  },

  getGrid(firstWeekdayValue, totalDays) {
    const grid = [[], [], [], [], [], []]
    let rowIndex = 0

    for (let i = 1; i <= 42; i++) {
      let isEmpty = (i - 1 >= firstWeekdayValue) && (i <= totalDays + firstWeekdayValue)
      let day = isEmpty ? (i - firstWeekdayValue) : ''
      grid[rowIndex].push(day)
      if (i % 7 === 0) rowIndex++
    }

    return grid
  }

}
