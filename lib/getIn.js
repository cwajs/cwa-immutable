"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _invariant = _interopRequireDefault(require("invariant"));

var _utils = require("./utils");

/**
 *
 *
 * @param {Object|Array} target: The target
 * @param {Array} pathes
 * @param {*} fallback
 */
var getIn = function getIn(target, pathes, fallback) {
  (0, _invariant.default)(['string', 'array'].includes((0, _utils.typeOf)(pathes)), "[cwa-immutable] Invalid path: expected String or Array, but got: ".concat((0, _utils.typeOf)(pathes), ".")); // If the target is not array and object, just return fallback.

  var type = (0, _utils.typeOf)(target);

  if (type !== 'object' && type !== 'array') {
    return fallback;
  } // transform string path to array


  if (typeof pathes === 'string') {
    pathes = pathes.split('.');
  }

  pathes = (0, _toConsumableArray2.default)(pathes);

  while (pathes.length) {
    var _type = (0, _utils.typeOf)(target);

    if (!['object', 'array'].includes(_type)) {
      break;
    }

    var path = pathes.shift();

    if (typeof path !== 'number' && typeof path !== 'string') {
      break;
    }

    target = target[path];
  }

  return pathes.length || typeof target === 'undefined' ? fallback : target;
};

var _default = getIn;
exports.default = _default;