/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/bundle.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/style.scss */ "./src/styles/style.scss");

var APIKEY = '7eff271b45954de50f23ce0e9f1da0a5';
var form = document.getElementById('search-form');
var input = document.getElementById('search');
var info = document.querySelector('.info');
var today = document.querySelector('.today');
var forecast = document.querySelector('.forecast');

function showForecast(forecastData) {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var daily = forecastData.daily;
  var i;
  var length = daily.length;
  forecast.innerHTML = '';

  for (i = 1; i <= length - 1; i++) {
    var div = document.createElement('div');
    div.classList.add('forecast-item');
    var dayInfo = document.createElement('p');
    dayInfo.classList.add('forecast-day');
    var date = new Date(daily[i].dt * 1000);
    var day = days[date.getDay()];
    dayInfo.innerText = day;
    div.appendChild(dayInfo);
    var ico = document.createElement('img');
    ico.classList.add('forecast-icon');
    ico.setAttribute('src', "https://openweathermap.org/img/w/".concat(daily[i].weather[0].icon, ".png"));
    div.appendChild(ico);
    var tempInfo = document.createElement('p');
    tempInfo.classList.add('forecast-temp');
    tempInfo.innerText = "".concat(daily[i].temp.day.toFixed(0), "\xB0/").concat(daily[i].temp.night.toFixed(0), "\xB0");
    div.appendChild(tempInfo);
    forecast.appendChild(div);
  }
}

function getForecast(lat, lon) {
  try {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(lat, "&lon=").concat(lon, "&exclude=minutely,hourly,alerts&appid=").concat(APIKEY, "&units=metric")).then(function (response) {
      return response.json();
    }).then(function (data) {
      return showForecast(data);
    });
  } catch (error) {
    console.log(error);
  }
}

function showWeather(cityWeather) {
  today.innerHTML = "<div class=\"icon\"><img src=\"https://openweathermap.org/img/w/".concat(cityWeather.weather[0].icon, ".png\" alt=\"icon\"/></div>\n    <div>\n        <p class=\"temp\">").concat(Math.round(cityWeather.main.temp), " \xB0C</p>\n        <p class=\"description\">").concat(cityWeather.weather[0].main, "</p>\n    </div>\n\n    <div>\n        <span>Humidity: ").concat(cityWeather.main.humidity, "%</span>\n        <span>Wind: ").concat(Math.round(cityWeather.wind.speed), " km/h</span>\n        <span>Pressure: ").concat(Math.round(cityWeather.main.pressure * 100 / 133), "mm Hg</span>\n    </div>\n    <div>\n        <span>").concat(cityWeather.name, ", ").concat(cityWeather.sys.country, "</span>\n        <span>Max: ").concat(Math.round(cityWeather.main.temp_max), "\xB0C</span>\n        <span>Min: ").concat(Math.round(cityWeather.main.temp_min), "\xB0C</span>\n    </div>");
  var lat = cityWeather.coord.lat;
  var lon = cityWeather.coord.lon;
  getForecast(lat, lon);
}

function getWeather(city) {
  try {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(APIKEY, "&units=metric")).then(function (response) {
      return response.json();
    }).then(function (data) {
      return showWeather(data);
    });
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var inputValue = input.value;
  getWeather(inputValue);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map