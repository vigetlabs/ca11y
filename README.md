# ca11yndar
An accessible, light-weight, dependency-free date picker `< 4kb` minified. Bring your own styles. This is a work in progress!

```
npm install ca11yndar --save 
```

## Usage
```
import Ca11yndar from 'ca11yndar'
const datePicker = new Ca11yndar(input)
```

Pass an input element into a new instance of `Ca11yndar`

Optionally pass in custom options for month, day, and button labels names as second param.

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

## Demo Locally
```
npm install
npm start
```

--

**Check out other open source work happening at [Viget](http://viget.com) on [code.viget.com](http://code.viget.com)**
