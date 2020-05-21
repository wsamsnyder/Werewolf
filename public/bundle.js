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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nError: Cannot find module '@babel/core'\\nRequire stack:\\n- /home/mrclean/node_modules/@babel/plugin-transform-react-jsx/lib/transform-classic.js\\n- /home/mrclean/node_modules/@babel/plugin-transform-react-jsx/lib/index.js\\n- /home/mrclean/node_modules/@babel/preset-react/lib/index.js\\n- /home/mrclean/Projects/Werewolf/node_modules/@babel/core/lib/config/files/plugins.js\\n- /home/mrclean/Projects/Werewolf/node_modules/@babel/core/lib/config/files/index.js\\n- /home/mrclean/Projects/Werewolf/node_modules/@babel/core/lib/index.js\\n- /home/mrclean/Projects/Werewolf/node_modules/babel-loader/lib/index.js\\n- /home/mrclean/Projects/Werewolf/node_modules/loader-runner/lib/loadLoader.js\\n- /home/mrclean/Projects/Werewolf/node_modules/loader-runner/lib/LoaderRunner.js\\n- /home/mrclean/Projects/Werewolf/node_modules/webpack/lib/NormalModule.js\\n- /home/mrclean/Projects/Werewolf/node_modules/webpack/lib/NormalModuleFactory.js\\n- /home/mrclean/Projects/Werewolf/node_modules/webpack/lib/Compiler.js\\n- /home/mrclean/Projects/Werewolf/node_modules/webpack/lib/webpack.js\\n- /home/mrclean/Projects/Werewolf/node_modules/webpack-cli/bin/utils/validate-options.js\\n- /home/mrclean/Projects/Werewolf/node_modules/webpack-cli/bin/utils/convert-argv.js\\n- /home/mrclean/Projects/Werewolf/node_modules/webpack-cli/bin/cli.js\\n- /home/mrclean/Projects/Werewolf/node_modules/webpack/bin/webpack.js\\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:982:15)\\n    at Function.Module._load (internal/modules/cjs/loader.js:864:27)\\n    at Module.require (internal/modules/cjs/loader.js:1044:19)\\n    at require (/home/mrclean/Projects/Werewolf/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)\\n    at Object.<anonymous> (/home/mrclean/node_modules/@babel/plugin-transform-react-jsx/lib/transform-classic.js:14:13)\\n    at Module._compile (/home/mrclean/Projects/Werewolf/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)\\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1178:10)\\n    at Module.load (internal/modules/cjs/loader.js:1002:32)\\n    at Function.Module._load (internal/modules/cjs/loader.js:901:14)\\n    at Module.require (internal/modules/cjs/loader.js:1044:19)\\n    at require (/home/mrclean/Projects/Werewolf/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)\\n    at Object.<anonymous> (/home/mrclean/node_modules/@babel/plugin-transform-react-jsx/lib/index.js:8:48)\\n    at Module._compile (/home/mrclean/Projects/Werewolf/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)\\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1178:10)\\n    at Module.load (internal/modules/cjs/loader.js:1002:32)\\n    at Function.Module._load (internal/modules/cjs/loader.js:901:14)\\n    at Module.require (internal/modules/cjs/loader.js:1044:19)\\n    at require (/home/mrclean/Projects/Werewolf/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)\\n    at Object.<anonymous> (/home/mrclean/node_modules/@babel/preset-react/lib/index.js:10:55)\\n    at Module._compile (/home/mrclean/Projects/Werewolf/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)\\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1178:10)\\n    at Module.load (internal/modules/cjs/loader.js:1002:32)\\n    at Function.Module._load (internal/modules/cjs/loader.js:901:14)\\n    at Module.require (internal/modules/cjs/loader.js:1044:19)\\n    at require (/home/mrclean/Projects/Werewolf/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)\\n    at requireModule (/home/mrclean/Projects/Werewolf/node_modules/@babel/core/lib/config/files/plugins.js:165:12)\\n    at loadPreset (/home/mrclean/Projects/Werewolf/node_modules/@babel/core/lib/config/files/plugins.js:83:17)\\n    at createDescriptor (/home/mrclean/Projects/Werewolf/node_modules/@babel/core/lib/config/config-descriptors.js:154:9)\\n    at /home/mrclean/Projects/Werewolf/node_modules/@babel/core/lib/config/config-descriptors.js:109:50\\n    at Array.map (<anonymous>)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanN4LmpzIiwic291cmNlcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.jsx\n");

/***/ })

/******/ });