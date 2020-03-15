/*! zsim 0.1.0 */
window["zsim"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/ksim3/src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/ksim3/src/config.js":
/*!**************************************!*\
  !*** ./examples/ksim3/src/config.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cube */ "./examples/ksim3/src/cube.js");

var gui = new dat.GUI();

if (window.innerWidth < 800) {
  gui.close();
}

gui.add(_cube__WEBPACK_IMPORTED_MODULE_0__["default"], 'tps');
gui.add(_cube__WEBPACK_IMPORTED_MODULE_0__["default"], 'size', 10, 1000);
gui.add(_cube__WEBPACK_IMPORTED_MODULE_0__["default"], 'backface');

/***/ }),

/***/ "./examples/ksim3/src/cube.js":
/*!************************************!*\
  !*** ./examples/ksim3/src/cube.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var element = document.querySelector('body').appendChild(document.createElement('div'));
element.className = 'cube';
var cube = zsim["default"](element, {
  size: 750,
  tps: 10,
  rotate: {
    x: -(Math.PI / 4),
    y: 0
  }
});
/* harmony default export */ __webpack_exports__["default"] = (cube);

/***/ }),

/***/ "./examples/ksim3/src/keymap.js":
/*!**************************************!*\
  !*** ./examples/ksim3/src/keymap.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cube */ "./examples/ksim3/src/cube.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var keys = [['1', 'S'], ['2', 'S\''], ['I', 'R2'], ['K', "R2"], ['F', "U2"], ['J', "U2"], ['i', 'R'], ['k', "R'"], ['8', 'R2'], ['u', 'r'], ['m', "r'"], ['j', 'U'], ['f', "U'"], ['s', 'D'], ['l', "D'"], ['n', 'F'], ['v', "F'"], ['o', "B'"], ['w', 'B'], ['g', "M'"], ['H', 'E2'], ['G', 'E2'], ['h', 'M'], ['d', 'L'], ['e', "L'"], ['3', 'L2'], ['c', 'l'], ['r', "l'"], [';', 'y'], ['a', "y'"], ['y', 'x'], ['t', "x'"], ['p', 'z'], ['q', "z'"]].reduce(function (a, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      b = _ref2[0],
      c = _ref2[1];

  return a[b] = c, a;
}, {});
window.addEventListener('keydown', function (e) {
  if (keys[e.key]) {
    _cube__WEBPACK_IMPORTED_MODULE_0__["default"].move(keys[e.key]);
  } else if (e.key === 'Escape') {
    _cube__WEBPACK_IMPORTED_MODULE_0__["default"].reset();
  }
});

/***/ }),

/***/ "./examples/ksim3/src/main.js":
/*!************************************!*\
  !*** ./examples/ksim3/src/main.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cube__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cube */ "./examples/ksim3/src/cube.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./examples/ksim3/src/config.js");
/* harmony import */ var _keymap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keymap */ "./examples/ksim3/src/keymap.js");




/***/ })

/******/ });
//# sourceMappingURL=ksim.js.map