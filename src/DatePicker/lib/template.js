import styles from './styles'

export default function template(data) {
  return `
    <button type="button" class="date-picker__toggle" aria-label="Toggle Date Picker" aria-controls="${ data.calendarId }">Toggle Date Picker</button>
    <div class="date-picker__calendar" id="${ data.calendarId }" aria-labelledby="calendar__header" aria-dialog="true" aria-hidden="true" style="display: none">
      <button class="calendar__prev" type="button" aria-label="${data.prev.label}">${data.prev.html}</button>
      <button class="calendar__next" type="button" aria-label="${data.next.label}">${data.next.html}</button>
      <p class="calendar__header" role="heading" aria-live="assertive">${ data.monthHeader }</p>
      <table>
        <caption class="date-picker__caption" style="${ styles.visuallyHidden }"></caption>
        <thead class="datepicker__day-names">
          <tr>${ data.dayNames }</tr>
        </thead>
        <tbody class="datepicker__calendar">
        </tbody>
      </table>
    </div>
  `.trim()
}
