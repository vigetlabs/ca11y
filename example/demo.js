/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ca11yndar = __webpack_require__(1);

	var _ca11yndar2 = _interopRequireDefault(_ca11yndar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var datePickers = Array.from(document.querySelectorAll('[data-module=ca11yndar]') || 0);

	datePickers.forEach(function (input) {
	  return new _ca11yndar2.default(input);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _delegate = __webpack_require__(2);

	var _delegate2 = _interopRequireDefault(_delegate);

	var _defaults = __webpack_require__(5);

	var _defaults2 = _interopRequireDefault(_defaults);

	var _zeroPad = __webpack_require__(6);

	var _zeroPad2 = _interopRequireDefault(_zeroPad);

	var _keys = __webpack_require__(7);

	var _keys2 = _interopRequireDefault(_keys);

	var _styles = __webpack_require__(8);

	var _styles2 = _interopRequireDefault(_styles);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ca11yndar = (function () {
	  function Ca11yndar(el) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Ca11yndar);

	    Ca11yndar.pickers.push(this);
	    this.props = _extends({}, _defaults2.default, options, { id: Ca11yndar.pickers.length });
	    this.setInitialState();
	    this.setUI(el);
	    this.selectDay(this.state.day, false, true);
	    this.listen();
	  }

	  _createClass(Ca11yndar, [{
	    key: 'setInitialState',
	    value: function setInitialState() {
	      var today = new Date();
	      this.state = {
	        today: {
	          fullYear: today.getFullYear(),
	          day: today.getDate(),
	          month: today.getMonth()
	        }
	      };
	      this.setDate(today, true);
	    }
	  }, {
	    key: 'setDate',
	    value: function setDate(date, silent) {
	      var month = date.getMonth();
	      var day = date.getDate();
	      var year = date.getFullYear();
	      var monthName = this.props.months[month].displayName || this.props.months[month].fullName;
	      this.setState({
	        date: date,
	        day: day,
	        monthName: monthName,
	        monthNameFull: this.props.months[month].fullName,
	        month: month,
	        monthDisplay: month + 1,
	        fullYear: date.getFullYear(),
	        totalDays: this.getDays(year, month),
	        firstWeekdayValue: this.getFirstDay(year, month)
	      }, silent);
	    }
	  }, {
	    key: 'listen',
	    value: function listen() {
	      (0, _delegate2.default)(this.ui.calendar, '.ca11yndar__nav.-next', 'click', this.incrementMonth.bind(this, 1));
	      (0, _delegate2.default)(this.ui.calendar, '.ca11yndar__nav.-prev', 'click', this.incrementMonth.bind(this, -1));
	      (0, _delegate2.default)(this.ui.calendarDays, '.ca11yndar__day', 'click', this.onDayClick.bind(this));
	      (0, _delegate2.default)(this.ui.calendar, 'button', 'blur', this.close.bind(this), true);
	      (0, _delegate2.default)(this.ui.calendar, 'button', 'focus', this.cancelClose.bind(this), true);
	      this.ui.wrapper.addEventListener('keydown', this.onKeydown.bind(this));
	      this.ui.toggle.addEventListener('click', this.toggle.bind(this));
	      this.ui.toggle.addEventListener('focus', this.cancelClose.bind(this));
	    }
	  }, {
	    key: 'onKeydown',
	    value: function onKeydown(e) {
	      if (e.keyCode === _keys2.default.esc) {
	        this.close();
	      }
	    }
	  }, {
	    key: 'setState',
	    value: function setState(state, silent) {
	      this.state = _extends({}, this.state, state);
	      if (!silent) this.render();
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      this.state.isOpen ? this.close() : this.open();
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      clearTimeout(this.closeTimeout);
	      this.ui.calendar.removeAttribute('aria-hidden');
	      this.ui.selectedDay.focus();
	      this.ui.monthHeader.innerHTML = this.renderMonthHeader();
	      this.state.isOpen = true;
	    }
	  }, {
	    key: 'cancelClose',
	    value: function cancelClose() {
	      clearTimeout(this.closeTimeout);
	    }
	  }, {
	    key: 'close',
	    value: function close(silent) {
	      var _this = this;

	      this.closeTimeout = setTimeout(function () {
	        !silent && _this.ui.toggle.focus();
	        _this.ui.calendar.setAttribute('aria-hidden', true);
	        _this.state.isOpen = false;
	      }, 100);
	    }
	  }, {
	    key: 'onDayClick',
	    value: function onDayClick(e) {
	      var day = Number(e.target.textContent);
	      this.selectDay(day);
	    }
	  }, {
	    key: 'selectDay',
	    value: function selectDay(day, keepOpen, silent) {
	      if (!silent) {
	        this.ui.input.value = (0, _zeroPad2.default)(this.state.monthDisplay) + '/' + (0, _zeroPad2.default)(day) + '/' + this.state.fullYear;
	      }
	      this.setState({ day: day });
	      if (!keepOpen) {
	        this.close(silent);
	      }
	    }

	    // Helpers

	  }, {
	    key: 'incrementMonth',
	    value: function incrementMonth(delta) {
	      var month = this.state.month + delta;
	      var year = this.state.fullYear;

	      if (month > 11) {
	        month = 0;
	        year += delta;
	      }

	      if (month < 0) {
	        month = 11;
	        year += delta;
	      }

	      var date = new Date(year, month, 1);
	      this.setDate(date);
	    }
	  }, {
	    key: 'getDays',
	    value: function getDays(year, month) {
	      return 32 - new Date(year, month, 32).getDate();
	    }
	  }, {
	    key: 'getFirstDay',
	    value: function getFirstDay(year, month) {
	      return new Date(year, month, 1).getDay();
	    }
	  }, {
	    key: 'isToday',
	    value: function isToday(currentDay) {
	      var _state$today = this.state.today;
	      var day = _state$today.day;
	      var month = _state$today.month;
	      var fullYear = _state$today.fullYear;

	      return currentDay === day && this.state.month === month && this.state.fullYear === fullYear;
	    }

	    // Rendering

	  }, {
	    key: 'getGrid',
	    value: function getGrid() {
	      var _state = this.state;
	      var firstWeekdayValue = _state.firstWeekdayValue;
	      var totalDays = _state.totalDays;

	      var grid = [[], [], [], [], [], []];
	      var rowIndex = 0;

	      for (var i = 1; i <= 42; i++) {
	        var isEmpty = i - 1 >= firstWeekdayValue && i <= totalDays + firstWeekdayValue;
	        var day = isEmpty ? i - firstWeekdayValue : '';
	        grid[rowIndex].push(day);
	        if (i % 7 === 0) rowIndex++;
	      }

	      return grid;
	    }
	  }, {
	    key: 'renderRows',
	    value: function renderRows() {
	      var _this2 = this;

	      return this.getGrid().reduce(function (string, row) {

	        var cells = row.map(function (day) {
	          var contents = '';
	          if (day) {
	            var todayClass = _this2.isToday(day) ? ' -today' : '';
	            var selectedClass = _this2.state.day === day ? ' -selected' : '';
	            contents = '<button type="button" class="ca11yndar__day' + todayClass + selectedClass + '" data-day="' + day + '" aria-label="The ' + _this2.props.dayTitles[day - 1] + '">' + day + '</button>';
	          }
	          return '<td class="ca11yndar__cell ' + (!day && ' -empty') + '"' + (!day && ' aria-hidden="true"') + '>' + contents + '</td>';
	        }).join('');

	        return string += '<tr class="ca11yndar__row">' + cells + '</tr>';
	      }, '');
	    }
	  }, {
	    key: 'renderDayNames',
	    value: function renderDayNames() {
	      return this.props.days.reduce(function (string, day) {
	        string += '<th class="datepicker__day-name" scope="col" aria-label="' + day.fullName + '">' + (day.displayName || day.fullName) + '</th>';
	        return string;
	      }, '');
	    }
	  }, {
	    key: 'renderMonthHeader',
	    value: function renderMonthHeader() {
	      return '<span style="' + _styles2.default.visuallyHidden + '">' + this.state.monthNameFull + '</span> <span aria-hidden="true" class="ca11yndar__month-display">' + this.state.monthName + '</span> <span class="ca11yndar__year-display">' + this.state.fullYear + '</span>';
	    }
	  }, {
	    key: 'setUI',
	    value: function setUI(el) {
	      var calendarId = 'ca11yndar-' + this.props.id + '__picker';

	      this.ui = {
	        input: el,
	        wrapper: el.parentElement,
	        datePicker: document.createElement('div')
	      };

	      this.ui.datePicker.className = 'ca11yndar';
	      this.ui.datePicker.id = 'ca11yndar-' + this.props.id;
	      this.ui.datePicker.innerHTML = ('\n      <button type="button" class="ca11yndar__toggle" aria-label="Toggle Date Picker" aria-controls="' + calendarId + '" aria-label="' + this.props.toggle.label + '">' + this.props.toggle.html + '</button>\n      <div class="ca11yndar__picker" id="' + calendarId + '" aria-labelledby="ca11yndar__header" aria-dialog="true" aria-hidden="true">\n        <button class="ca11yndar__nav -prev" type="button" aria-label="' + this.props.prev.label + '">' + this.props.prev.html + '</button>\n        <button class="ca11yndar__nav -next" type="button" aria-label="' + this.props.next.label + '">' + this.props.next.html + '</button>\n        <p class="ca11yndar__header" role="heading" aria-live="assertive">' + this.renderMonthHeader() + '</p>\n        <table class="ca11yndar__table">\n          <caption class="ca11yndar__caption" style="' + _styles2.default.visuallyHidden + '"></caption>\n          <thead class="ca11yndar__day-names">\n            <tr>\n              ' + this.renderDayNames() + '\n            </tr>\n          </thead>\n          <tbody class="ca11yndar__days">\n          </tbody>\n        </table>\n      </div>\n    ').trim();

	      this.ui.calendar = this.ui.datePicker.querySelector('#' + calendarId);
	      this.ui.calendarDays = this.ui.datePicker.querySelector('.ca11yndar__days');
	      this.ui.monthCaption = this.ui.datePicker.querySelector('.ca11yndar__caption');
	      this.ui.monthHeader = this.ui.datePicker.querySelector('.ca11yndar__header');
	      this.ui.toggle = this.ui.datePicker.querySelector('.ca11yndar__toggle');

	      this.ui.wrapper.appendChild(this.ui.datePicker);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.ui.monthHeader.innerHTML = this.renderMonthHeader();
	      this.ui.monthCaption.textContent = this.state.monthNameFull + ' ' + this.state.fullYear;
	      this.ui.calendarDays.innerHTML = this.renderRows();
	      this.ui.selectedDay = this.ui.calendar.querySelector('.ca11yndar__day.-selected');
	    }
	  }]);

	  return Ca11yndar;
	})();

	Ca11yndar.pickers = [];

	exports.default = Ca11yndar;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var closest = __webpack_require__(3);

	/**
	 * Delegates event to a selector.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function delegate(element, selector, type, callback, useCapture) {
	    var listenerFn = listener.apply(this, arguments);

	    element.addEventListener(type, listenerFn, useCapture);

	    return {
	        destroy: function() {
	            element.removeEventListener(type, listenerFn, useCapture);
	        }
	    }
	}

	/**
	 * Finds closest match and invokes callback.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Function}
	 */
	function listener(element, selector, type, callback) {
	    return function(e) {
	        e.delegateTarget = closest(e.target, selector, true);

	        if (e.delegateTarget) {
	            callback.call(element, e);
	        }
	    }
	}

	module.exports = delegate;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var matches = __webpack_require__(4)

	module.exports = function (element, selector, checkYoSelf) {
	  var parent = checkYoSelf ? element : element.parentNode

	  while (parent && parent !== document) {
	    if (matches(parent, selector)) return parent;
	    parent = parent.parentNode
	  }
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	/**
	 * Element prototype.
	 */

	var proto = Element.prototype;

	/**
	 * Vendor function.
	 */

	var vendor = proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	/**
	 * Expose `match()`.
	 */

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  months: [{ fullName: 'January', displayName: 'Jan' }, { fullName: 'February', displayName: 'Feb' }, { fullName: 'March', displayName: 'Mar' }, { fullName: 'April', displayName: 'Apr' }, { fullName: 'May', displayName: 'May' }, { fullName: 'June', displayName: 'Jun' }, { fullName: 'July', displayName: 'Jul' }, { fullName: 'August', displayName: 'Aug' }, { fullName: 'September', displayName: 'Sep' }, { fullName: 'October', displayName: 'Oct' }, { fullName: 'November', displayName: 'Nov' }, { fullName: 'December', displayName: 'Dec' }],
	  days: [{ fullName: 'Sunday', displayName: 'S' }, { fullName: 'Monday', displayName: 'M' }, { fullName: 'Tuesday', displayName: 'T' }, { fullName: 'Wednesday', displayName: 'W' }, { fullName: 'Thursday', displayName: 'T' }, { fullName: 'Friday', displayName: 'F' }, { fullName: 'Saturday', displayName: 'S' }],
	  dayTitles: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelth', 'Thirtheenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth', 'Twentieth', 'Twenty First', 'Twenty Second', 'Twenty Third', 'Twenty Fourth', 'Twenty Fifth', 'Twenty Sixth', 'Twenty Seventh', 'Twenty Eighth', 'Twenty Ninth', 'Thirtieth', 'Thirty First'],
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
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = zeroPad;
	function zeroPad(number) {
	  return ("0" + number).slice(-2);
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var keys = {
	  esc: 27
	};

	exports.default = keys;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var styles = {
	  visuallyHidden: "\n    position: absolute;\n    clip: rect(1px, 1px, 1px, 1px);\n  ".trim()
	};

	exports.default = styles;

/***/ }
/******/ ]);