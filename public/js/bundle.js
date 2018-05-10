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

/***/ "./src/elections/components.js":
/*!*************************************!*\
  !*** ./src/elections/components.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("Vue.component('dataPoint', {\n    props: ['result'],\n    \n})\n\nVue.component('resultsRow', {\n    props: ['result'],\n    template: `    \n        <tr>\n            <td> {{ result.state }} </td>\n            <td> {{ result.democrat }} </td>\n            <td> {{ result.republican }} </td>\n            <td> {{ result.other }} </td>\n        </tr>    \n    `\n  })\n\nvar resultsTableVm = new Vue({\n    el: '#app',\n    data: {\n        results: []\n    }\n})\n\nfetch('/api/get-state-results?election=2000')\n.then((response) => {\n    return response.json()\n})\n.then((stateResults) => {    \n    resultsTableVm.results = stateResults\n})\n\n\n//# sourceURL=webpack:///./src/elections/components.js?");

/***/ }),

/***/ "./src/elections/electionResults.js":
/*!******************************************!*\
  !*** ./src/elections/electionResults.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var maps = __webpack_require__(/*! ./maps */ \"./src/elections/maps.js\")\n\nvar self = module.exports = {\n\n    buildElectoralMap: function (election) {\n\n        // get values from selections for params\n        election = election || $('#elections option:selected').text()\n        \n        // build state electoral map \n        let eMap = new maps.electoralMap(election);\n        eMap.buildMap('/api/get-state-results?election=' + election, eMap.stateGeoJson, eMap.stateMap)\n\n    }\n}\n\n//# sourceURL=webpack:///./src/elections/electionResults.js?");

/***/ }),

/***/ "./src/elections/maps.js":
/*!*******************************!*\
  !*** ./src/elections/maps.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n\n    electoralMap: function (election) {\n\n        // sets election year\n        this.election = election;\n\n        // geoJSON locations\n        this.stateGeoJson = '../data/states.json';\n        this.countyGeoJson = '../data/counties.json';\n\n        this.stateMap = function (error, results, states) {\n\n            // $(\"#national-map\").empty()\n\n            var diminesions = {\n                height: 500,\n                width: 1000\n            }\n\n            var padding = {\n                top: 10,\n                bottom: 10,\n                left: 10,\n                right: 10\n            }\n\n            // merge states json with results from api call\n            for (var i = 0; i < states.features.length; i++) {\n                for (var j = 0; j < results.length; j++) {\n                    if (states.features[i].properties.NAME === results[j].state && results[j].republican > results[j].democrat) {\n                        states.features[i].properties.winner = 'R'\n                        break;\n                    } else if (states.features[i].properties.NAME === results[j].state && results[j].republican < results[j].democrat) {\n                        states.features[i].properties.winner = 'D'\n                        break;\n                    }\n                }\n            }\n\n            var path = d3.geoPath().projection(d3.geoAlbersUsa());\n\n            var svg = d3.select(\"#national-map\")\n                .append(\"svg\")\n                .attr(\"width\", \"100%\")\n                .attr(\"height\", \"100%\")\n                .attr(\"viewBox\", \"0 0 \" + diminesions.width + \" \" + diminesions.height)\n\n            svg.selectAll(\"path\")\n                .data(states.features)\n                .enter()\n                .append(\"path\")\n                .classed(\"state\", true)\n                .attr(\"d\", path)\n                .attr(\"stroke\", \"black\")\n                .attr(\"fill\", function (d) {\n                    if (d.properties.winner === 'R') {\n                        return \"#e99d98\"\n                    } else if (d.properties.winner === 'D') {\n                        return \"#9cc0e3\"\n                    }\n                })\n        }\n\n        this.buildMap = function (dataURL, mapURL, func) {\n            d3.queue()\n                .defer(d3.json, dataURL)\n                .defer(d3.json, mapURL)\n                .await(func);\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/elections/maps.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var elex = __webpack_require__(/*! ./elections/electionResults */ \"./src/elections/electionResults.js\")\n__webpack_require__(/*! ./elections/components */ \"./src/elections/components.js\")\n\nwindow.addEventListener('load', function () {\n    let election = window.location.href.split('/').pop()\n    elex.buildElectoralMap(election)\n});\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });