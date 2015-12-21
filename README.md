\# DatePicker

Barebones vanilla js (es6) date picker. This is a work in progress!

## Demo Locally
```
npm install
npm start
```

## Usage
```
import DatePicker from './DatePicker'
const datePicker = new DatePicker(input)
```

Pass an input element into a new instance of `DatePicker`

Optionally pass in custom options for month and day names as second param.

The following are the default values:
```
{
  months: [
    { fullName: 'January'   , displayName: 'Jan' }  ,
    { fullName: 'February'  , displayName: 'Feb' }  ,
    { fullName: 'March'     , displayName: 'Mar' }  ,
    { fullName: 'April'     , displayName: 'Apr' }  ,
    { fullName: 'May'       , displayName: 'May' }  ,
    { fullName: 'June'      , displayName: 'June' } ,
    { fullName: 'July'      , displayName: 'July' } ,
    { fullName: 'August'    , displayName: 'Aug' }  ,
    { fullName: 'September' , displayName: 'Sep' }  ,
    { fullName: 'October'   , displayName: 'Oct' }  ,
    { fullName: 'November'  , displayName: 'Nov' }  ,
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
  next: {
    html: '>',
    label: 'Next Month'
  },
  prev: {
    html: '<',
    label: 'Previous Month'
  }
}
```

`fullName` is what gets read by screen readers, and will be used if `displayName` is not provided.
