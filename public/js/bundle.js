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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/elections/electionResults.js":
/*!******************************************!*\
  !*** ./src/elections/electionResults.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var maps = __webpack_require__(/*! ./maps */ \"./src/elections/maps.js\")\r\n\r\nvar self = module.exports = {\r\n\r\n    buildElectoralMap: function (election) {\r\n\r\n        // get values from selections for params\r\n        election = election || $('#elections option:selected').text()\r\n        \r\n        // build state electoral map \r\n        let eMap = new maps.electoralMap(election);\r\n        eMap.buildMap('/api/get-state-results?election=' + election, eMap.stateGeoJson, eMap.stateMap)\r\n\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/elections/electionResults.js?");

/***/ }),

/***/ "./src/elections/maps.js":
/*!*******************************!*\
  !*** ./src/elections/maps.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n\r\n    electoralMap: function (election) {\r\n\r\n        // sets election year\r\n        this.election = election;\r\n\r\n        // geoJSON locations\r\n        this.stateGeoJson = '../data/states.json';\r\n        this.countyGeoJson = '../data/counties.json';\r\n\r\n        this.stateMap = function (error, results, states) {\r\n\r\n            // $(\"#national-map\").empty()\r\n\r\n            var diminesions = {\r\n                height: 500,\r\n                width: 1000\r\n            }\r\n\r\n            var padding = {\r\n                top: 10,\r\n                bottom: 10,\r\n                left: 10,\r\n                right: 10\r\n            }\r\n\r\n            // merge states json with results from api call\r\n            for (var i = 0; i < states.features.length; i++) {\r\n                for (var j = 0; j < results.length; j++) {\r\n                    if (states.features[i].properties.NAME === results[j].state && results[j].republican > results[j].democrat) {\r\n                        states.features[i].properties.winner = 'R'\r\n                        break;\r\n                    } else if (states.features[i].properties.NAME === results[j].state && results[j].republican < results[j].democrat) {\r\n                        states.features[i].properties.winner = 'D'\r\n                        break;\r\n                    }\r\n                }\r\n            }\r\n\r\n            var path = d3.geoPath().projection(d3.geoAlbersUsa());\r\n\r\n            var svg = d3.select(\"#national-map\")\r\n                .append(\"svg\")\r\n                .attr(\"width\", \"100%\")\r\n                .attr(\"height\", \"100%\")\r\n                .attr(\"viewBox\", \"0 0 \" + diminesions.width + \" \" + diminesions.height)\r\n\r\n            svg.selectAll(\"path\")\r\n                .data(states.features)\r\n                .enter()\r\n                .append(\"path\")\r\n                .classed(\"state\", true)\r\n                .attr(\"d\", path)\r\n                .attr(\"stroke\", \"black\")\r\n                .attr(\"fill\", function (d) {\r\n                    if (d.properties.winner === 'R') {\r\n                        return \"#e99d98\"\r\n                    } else if (d.properties.winner === 'D') {\r\n                        return \"#9cc0e3\"\r\n                    }\r\n                })\r\n        }\r\n\r\n        this.buildMap = function (dataURL, mapURL, func) {\r\n            d3.queue()\r\n                .defer(d3.json, dataURL)\r\n                .defer(d3.json, mapURL)\r\n                .await(func);\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/elections/maps.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var elex = __webpack_require__(/*! ./elections/electionResults */ \"./src/elections/electionResults.js\")\r\n\r\nwindow.addEventListener('load', function () {\r\n    let election = window.location.href.split('/').pop()\r\n    elex.buildElectoralMap(election)\r\n});\r\n\r\nvar vm = new Vue({\r\n    el: '#app',\r\n    data: {\r\n        results: []\r\n    }\r\n})\r\n\r\nfetch('/api/get-state-results?election=2000')\r\n.then((response) => {\r\n    return response.json()\r\n})\r\n.then((stateResults) => {\r\n    console.log(stateResults)\r\n    vm.results = stateResults\r\n})\r\n\r\nsetTimeout(function() {\r\n    fetch('/api/get-state-results?election=2004')\r\n    .then((response) => {\r\n        return response.json()\r\n    })\r\n    .then((stateResults) => {\r\n        console.log(stateResults)\r\n        vm.results = stateResults\r\n    })\r\n}, 3000)\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });