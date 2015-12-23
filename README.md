**NOTE:** This is a work in progress in early development! Not quite ready for prime-time. [Issues](https://github.com/vigetlabs/ca11y/issues) and [pull requests](https://github.com/vigetlabs/ca11y/pulls) welcome.

# ca11y
An accessible, light-weight, dependency-free date picker `< 5kb` gzipped. Bring your own styles.

```
npm install ca11y --save 
```

## Usage
**es6**
```
import Ca11y from 'ca11y'
const datePicker = new Ca11y(input, options)
```

**es5**
```
var Ca11y = require('ca11y') 
var datePicker = new Ca11y(input, options)
```

Pass an input element into a new instance of `Ca11y`, and optionally pass in props to override the following defaults:
```
{
  transitionDuration: 0,
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

`fullName` and `label` values are read by screen readers. Provide `transitionDuration` if you are using the css `transition` property on the `.ca11y__picker` element to allow auto-focusing of the selected day on transition end.

## Demo Locally
```
npm install
npm start
```

--

**Check out other open source work happening at [Viget](http://viget.com) on [code.viget.com](http://code.viget.com)**

## Deploy to GitHub Pages
```
npm run deploy
```
