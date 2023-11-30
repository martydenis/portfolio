/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/game.shared.js":
/*!*******************************!*\
  !*** ./src/js/game.shared.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_game_shared_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/game.shared.scss */ \"./src/scss/game.shared.scss\");\n\nconst $controlsTogglers = document.getElementsByClassName('js-controls-toggler');\nfor (let i = 0; i < $controlsTogglers.length; i++) {\n  const $el = $controlsTogglers[i];\n  $el.addEventListener('click', function (e) {\n    document.body.classList.toggle('js-is-controls-open');\n  });\n}\nconst $stopPropagationElements = document.getElementsByClassName('js-stop-propagation');\nfor (let i = 0; i < $stopPropagationElements.length; i++) {\n  const $el = $stopPropagationElements[i];\n  $el.addEventListener('touchend', function (e) {\n    e.stopPropagation();\n  });\n  $el.addEventListener('click', function (e) {\n    e.stopPropagation();\n  });\n  $el.addEventListener('mousedown', function (e) {\n    e.stopPropagation();\n  });\n}\nwindow.AdjustingInterval = function (func, interval, errorFunc) {\n  /**\r\n   * Add support for tab out tab in\r\n   */\n  const that = this;\n  let expected, timeout;\n  this.interval = interval;\n  this.start = function () {\n    expected = Date.now() + this.interval;\n    timeout = setTimeout(step, this.interval);\n  };\n  this.stop = function () {\n    clearTimeout(timeout);\n  };\n  function step() {\n    var drift = Date.now() - expected;\n    if (drift > that.interval) {\n      // You could have some default stuff here too...\n      if (errorFunc) errorFunc();\n    }\n    func();\n    expected += that.interval;\n    timeout = setTimeout(step, Math.max(0, that.interval - drift));\n  }\n};\nwindow.getAngleBetweenPoints = function (p1, p2) {\n  const dX = p2.x - p1.x;\n  const dY = p2.y - p1.y;\n  return Math.atan2(dY, dX);\n};\nwindow.toDegrees = function (rad) {\n  return rad * 180 / Math.PI;\n};\nwindow.roundToTwo = function (num) {\n  return +(Math.round(num + \"e+2\") + \"e-2\");\n};\nwindow.getDistance = function (x1, y1, x2, y2) {\n  const xDiff = x2 - x1;\n  const yDiff = y2 - y1;\n  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));\n};\nwindow.dpi = function (value) {\n  return value * window.devicePixelRatio;\n};\n\n// window.easeInOutCubic = function(x) {\n//   return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;\n// }\n\nwindow.randomIntFromRange = function (min, max) {\n  let round = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;\n  if (round) {\n    return Math.floor(min + Math.random() * (max - min + 1));\n  } else {\n    return min + Math.random() * (max - min + 1);\n  }\n};\nwindow.randomValueFromArray = function (array) {\n  return array[Math.floor(Math.random() * array.length)];\n};\nwindow.hexToRGB = function (hex, alpha) {\n  const r = parseInt(hex.slice(1, 3), 16),\n    g = parseInt(hex.slice(3, 5), 16),\n    b = parseInt(hex.slice(5, 7), 16);\n  if (alpha) {\n    return \"rgba(\" + r + \", \" + g + \", \" + b + \", \" + alpha + \")\";\n  } else {\n    return \"rgb(\" + r + \", \" + g + \", \" + b + \")\";\n  }\n};\n\n// Throttle function from Lodash\nwindow.throttle = function (func, wait, options) {\n  var context, args, result;\n  var timeout = null;\n  var previous = 0;\n  if (!options) options = {};\n  var later = function () {\n    previous = options.leading === false ? 0 : Date.now();\n    timeout = null;\n    result = func.apply(context, args);\n    if (!timeout) context = args = null;\n  };\n  return function () {\n    var now = Date.now();\n    if (!previous && options.leading === false) previous = now;\n    var remaining = wait - (now - previous);\n    context = this;\n    args = arguments;\n    if (remaining <= 0 || remaining > wait) {\n      if (timeout) {\n        clearTimeout(timeout);\n        timeout = null;\n      }\n      previous = now;\n      result = func.apply(context, args);\n      if (!timeout) context = args = null;\n    } else if (!timeout && options.trailing !== false) {\n      timeout = setTimeout(later, remaining);\n    }\n    return result;\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvZ2FtZS5zaGFyZWQuanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21hcnRpbmRlbmlzX3YzLy4vc3JjL2pzL2dhbWUuc2hhcmVkLmpzP2VhMmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zY3NzL2dhbWUuc2hhcmVkLnNjc3MnO1xyXG5cclxuY29uc3QgJGNvbnRyb2xzVG9nZ2xlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy1jb250cm9scy10b2dnbGVyJylcclxuZm9yIChsZXQgaSA9IDA7IGkgPCAkY29udHJvbHNUb2dnbGVycy5sZW5ndGg7IGkrKykge1xyXG4gIGNvbnN0ICRlbCA9ICRjb250cm9sc1RvZ2dsZXJzW2ldO1xyXG5cclxuICAkZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2pzLWlzLWNvbnRyb2xzLW9wZW4nKVxyXG4gIH0pO1xyXG59XHJcblxyXG5jb25zdCAkc3RvcFByb3BhZ2F0aW9uRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy1zdG9wLXByb3BhZ2F0aW9uJylcclxuXHJcbmZvciAobGV0IGkgPSAwOyBpIDwgJHN0b3BQcm9wYWdhdGlvbkVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgY29uc3QgJGVsID0gJHN0b3BQcm9wYWdhdGlvbkVsZW1lbnRzW2ldO1xyXG5cclxuICAkZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pO1xyXG5cclxuICAkZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pO1xyXG5cclxuICAkZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9KTtcclxufVxyXG5cclxud2luZG93LkFkanVzdGluZ0ludGVydmFsID0gZnVuY3Rpb24oZnVuYywgaW50ZXJ2YWwsIGVycm9yRnVuYykge1xyXG4gIC8qKlxyXG4gICAqIEFkZCBzdXBwb3J0IGZvciB0YWIgb3V0IHRhYiBpblxyXG4gICAqL1xyXG4gIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gIGxldCBleHBlY3RlZCwgdGltZW91dDtcclxuICB0aGlzLmludGVydmFsID0gaW50ZXJ2YWw7XHJcblxyXG4gIHRoaXMuc3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgIGV4cGVjdGVkID0gRGF0ZS5ub3coKSArIHRoaXMuaW50ZXJ2YWw7XHJcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChzdGVwLCB0aGlzLmludGVydmFsKTtcclxuICB9XHJcblxyXG4gIHRoaXMuc3RvcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3RlcCgpIHtcclxuICAgIHZhciBkcmlmdCA9IERhdGUubm93KCkgLSBleHBlY3RlZDtcclxuICAgIGlmIChkcmlmdCA+IHRoYXQuaW50ZXJ2YWwpIHtcclxuICAgICAgLy8gWW91IGNvdWxkIGhhdmUgc29tZSBkZWZhdWx0IHN0dWZmIGhlcmUgdG9vLi4uXHJcbiAgICAgIGlmIChlcnJvckZ1bmMpIGVycm9yRnVuYygpO1xyXG4gICAgfVxyXG4gICAgZnVuYygpO1xyXG4gICAgZXhwZWN0ZWQgKz0gdGhhdC5pbnRlcnZhbDtcclxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KHN0ZXAsIE1hdGgubWF4KDAsIHRoYXQuaW50ZXJ2YWwtZHJpZnQpKTtcclxuICB9XHJcbn1cclxuXHJcbndpbmRvdy5nZXRBbmdsZUJldHdlZW5Qb2ludHMgPSBmdW5jdGlvbihwMSwgcDIpIHtcclxuICBjb25zdCBkWCA9IHAyLnggLSBwMS54O1xyXG4gIGNvbnN0IGRZID0gcDIueSAtIHAxLnk7XHJcbiAgcmV0dXJuIE1hdGguYXRhbjIoZFksIGRYKTtcclxufVxyXG5cclxud2luZG93LnRvRGVncmVlcyA9IGZ1bmN0aW9uKHJhZCkge1xyXG4gIHJldHVybiByYWQgKiAxODAgLyBNYXRoLlBJO1xyXG59XHJcblxyXG53aW5kb3cucm91bmRUb1R3byA9IGZ1bmN0aW9uKG51bSkge1xyXG4gIHJldHVybiArKE1hdGgucm91bmQobnVtICsgXCJlKzJcIikgKyBcImUtMlwiKTtcclxufVxyXG5cclxud2luZG93LmdldERpc3RhbmNlID0gZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcclxuICBjb25zdCB4RGlmZiA9IHgyIC0geDE7XHJcbiAgY29uc3QgeURpZmYgPSB5MiAtIHkxO1xyXG4gIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeERpZmYsIDIpICsgTWF0aC5wb3coeURpZmYsIDIpKTtcclxufVxyXG5cclxud2luZG93LmRwaSA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgcmV0dXJuIHZhbHVlICogd2luZG93LmRldmljZVBpeGVsUmF0aW87XHJcbn1cclxuXHJcbi8vIHdpbmRvdy5lYXNlSW5PdXRDdWJpYyA9IGZ1bmN0aW9uKHgpIHtcclxuLy8gICByZXR1cm4geCA8IDAuNSA/IDQgKiB4ICogeCAqIHggOiAxIC0gTWF0aC5wb3coLTIgKiB4ICsgMiwgMykgLyAyO1xyXG4vLyB9XHJcblxyXG53aW5kb3cucmFuZG9tSW50RnJvbVJhbmdlID0gZnVuY3Rpb24obWluLCBtYXgsIHJvdW5kID0gdHJ1ZSkge1xyXG4gIGlmIChyb3VuZCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IobWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpO1xyXG4gIH1cclxufVxyXG5cclxud2luZG93LnJhbmRvbVZhbHVlRnJvbUFycmF5ID0gZnVuY3Rpb24oYXJyYXkpIHtcclxuICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoKV07XHJcbn1cclxuXHJcbndpbmRvdy5oZXhUb1JHQiA9IGZ1bmN0aW9uKGhleCwgYWxwaGEpIHtcclxuICBjb25zdCByID0gcGFyc2VJbnQoaGV4LnNsaWNlKDEsIDMpLCAxNiksXHJcbiAgICBnID0gcGFyc2VJbnQoaGV4LnNsaWNlKDMsIDUpLCAxNiksXHJcbiAgICBiID0gcGFyc2VJbnQoaGV4LnNsaWNlKDUsIDcpLCAxNik7XHJcblxyXG4gIGlmIChhbHBoYSkge1xyXG4gICAgcmV0dXJuIFwicmdiYShcIiArIHIgKyBcIiwgXCIgKyBnICsgXCIsIFwiICsgYiArIFwiLCBcIiArIGFscGhhICsgXCIpXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBcInJnYihcIiArIHIgKyBcIiwgXCIgKyBnICsgXCIsIFwiICsgYiArIFwiKVwiO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVGhyb3R0bGUgZnVuY3Rpb24gZnJvbSBMb2Rhc2hcclxud2luZG93LnRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgb3B0aW9ucykge1xyXG4gIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XHJcbiAgdmFyIHRpbWVvdXQgPSBudWxsO1xyXG4gIHZhciBwcmV2aW91cyA9IDA7XHJcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XHJcbiAgdmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IERhdGUubm93KCk7XHJcbiAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcclxuICB9O1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBub3c7XHJcbiAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XHJcbiAgICBjb250ZXh0ID0gdGhpcztcclxuICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xyXG4gICAgICBpZiAodGltZW91dCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBwcmV2aW91cyA9IG5vdztcclxuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XHJcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/game.shared.js\n");

/***/ }),

/***/ "./src/scss/game.shared.scss":
/*!***********************************!*\
  !*** ./src/scss/game.shared.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2Nzcy9nYW1lLnNoYXJlZC5zY3NzLmpzIiwibWFwcGluZ3MiOiI7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL21hcnRpbmRlbmlzX3YzLy4vc3JjL3Njc3MvZ2FtZS5zaGFyZWQuc2Nzcz9jN2VlIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scss/game.shared.scss\n");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/game.shared.js");
/******/ 	
/******/ })()
;