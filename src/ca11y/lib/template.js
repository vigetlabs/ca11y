import styles from './styles'

const TEMPLATES = {
  dayButton(data) {
    return `
      <button
        type="button"
        class="ca11y__day${ data.buttonTodayClass }${ data.buttonSelectedClass }"
        data-day="${ data.day }"
        aria-label="The ${ data.title }"
      >
        ${ data.day }
      </button>
    `.trim()
  },

  tableCell(data) {
    return `
      <td class="ca11y__cell${ data.cellEmptyClass }"${ data.cellAriaHidden }>
        ${ data.day && TEMPLATES.dayButton(data) }
      </td>
    `.trim()
  },

  tableRow(data) {
    return `<tr class="ca11y__row">${ data.cells }</tr>`
  },

  tableHeader(data) {
    return `
      <th class="datepicker__day-name" scope="col" aria-label="${ data.day.fullName }">
        ${ data.day.displayName || data.day.fullName }
      </th>
    `.trim()
  },

  monthHeader(data) {
    return `
      <span style="${ styles.visuallyHidden }">
        ${ data.monthNameFull }
      </span>
      <span aria-hidden="true" class="ca11y__month-display">
        ${ data.monthName }
      </span>
      <span class="ca11y__year-display">
        ${ data.fullYear }
      </span>
    `.trim()
  },

  calendar(data) {
    const defaultButton = `
      <button
        type="button"
        class="ca11y__toggle"
        aria-label="Toggle Date Picker"
        aria-controls="${ data.calendarId }"
        aria-label="${ data.toggleAriaLabel }"
      >
        ${ data.toggleIcon }
      </button>
    `

    const button = data.toggle ? '' : defaultButton

    return `
      ${ button }
      <div
        role="dialog"
        id="${ data.calendarId }"
        class="ca11y__picker"
        aria-hidden="true"
        aria-labelledby="ca11y__header"
      >
        <button class="ca11y__nav -prev" type="button" aria-label="${ data.prev.label }">
          ${ data.prev.html }
        </button>

        <button class="ca11y__nav -next" type="button" aria-label="${ data.next.label }">
          ${ data.next.html }
        </button>

        <p class="ca11y__header" role="heading" aria-live="assertive">${ data.monthHeader }</p>

        <table class="ca11y__table">
          <caption class="ca11y__caption" style="${ styles.visuallyHidden }"></caption>

          <thead class="ca11y__day-names">
            <tr>${ data.dayNames }</tr>
          </thead>

          <tbody class="ca11y__days"></tbody>
        </table>
      </div>
    `.trim()
  }
}

export default TEMPLATES
