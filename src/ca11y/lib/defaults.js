export default {
  replaceDateInput: false, // Disable Ca11y when input[type=date] is supported
  transitionDuration: 200, // If animating open the picker, specify the transitionDuration
  months: [
    { fullName: 'January'   , displayName: 'Jan' } ,
    { fullName: 'February'  , displayName: 'Feb' } ,
    { fullName: 'March'     , displayName: 'Mar' } ,
    { fullName: 'April'     , displayName: 'Apr' } ,
    { fullName: 'May'       , displayName: 'May' } ,
    { fullName: 'June'      , displayName: 'Jun' } ,
    { fullName: 'July'      , displayName: 'Jul' } ,
    { fullName: 'August'    , displayName: 'Aug' } ,
    { fullName: 'September' , displayName: 'Sep' } ,
    { fullName: 'October'   , displayName: 'Oct' } ,
    { fullName: 'November'  , displayName: 'Nov' } ,
    { fullName: 'December'  , displayName: 'Dec' }
  ],
  days: [
    { fullName: 'Sunday'    , displayName: 'S' } ,
    { fullName: 'Monday'    , displayName: 'M' } ,
    { fullName: 'Tuesday'   , displayName: 'T' } ,
    { fullName: 'Wednesday' , displayName: 'W' } ,
    { fullName: 'Thursday'  , displayName: 'T' } ,
    { fullName: 'Friday'    , displayName: 'F' } ,
    { fullName: 'Saturday'  , displayName: 'S' }
  ],
  dayTitles: [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth',
    'Ninth',
    'Tenth',
    'Eleventh',
    'Twelth',
    'Thirtheenth',
    'Fourteenth',
    'Fifteenth',
    'Sixteenth',
    'Seventeenth',
    'Eighteenth',
    'Nineteenth',
    'Twentieth',
    'Twenty First',
    'Twenty Second',
    'Twenty Third',
    'Twenty Fourth',
    'Twenty Fifth',
    'Twenty Sixth',
    'Twenty Seventh',
    'Twenty Eighth',
    'Twenty Ninth',
    'Thirtieth',
    'Thirty First'
  ],
  toggle: {
    html: '<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>',
    label: 'Toggle Date Picker'
  },
  next: {
    html: '<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>',
    label: 'Next Month'
  },
  prev: {
    html: '<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/></svg>',
    label: 'Previous Month'
  }
}
