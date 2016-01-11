export default {
  getToday() {
    const today = new Date()

    return {
      date     : today,
      fullYear : today.getFullYear(),
      day      : today.getDate(),
      month    : today.getMonth()
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
