"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _invariant = _interopRequireDefault(require("invariant"));

var _utils = require("./utils");

/**
 *
 *
 * @param {Object|Array} target: The target
 * @param {Array} pathes
 * @param {Any} value
 */
var setIn = function setIn(target, pathes, value) {
  var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  (0, _invariant.default)(['string', 'array'].includes((0, _utils.typeOf)(pathes)), "[cwa-immutable] Invalid path: expected String or Array, but got: ".concat((0, _utils.typeOf)(pathes), ".")); // transform string path to array

  if (typeof pathes === 'string') {
    pathes = pathes.split('.');
  } // return value to end the recursion


  if (!pathes.length) {
    return value;
  }

  var type = (0, _utils.typeOf)(target); // return when the value is invalidate

  if (type !== 'undefined' && type !== 'array' && type !== 'object') {
    return target;
  } // when value of path is not existed, create an object.


  if (type === 'undefined' && pathes.length) {
    target = {};
  }

  var newPathes = (0, _toConsumableArray2.default)(pathes);
  var path = newPathes.shift();
  target = type === 'array' ? (0, _toConsumableArray2.default)(target) : (0, _objectSpread2.default)({}, target);
  var newValue = setIn(target[path], newPathes, value, opt); // for assign mode

  if ((0, _typeof2.default)(target[path]) === 'object' && (0, _utils.typeOf)(newValue) === 'object' && opt.assign === true) {
    target[path] = Object.assign({}, target[path], newValue);
  } else {
    target[path] = newValue;
  }

  return target;
};

var _default = setIn;
exports.default = _default;