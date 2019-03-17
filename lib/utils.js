"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeOf = void 0;
var toString = Object.prototype.toString;

var typeOf = function typeOf(target) {
  return toString.call(target).slice(8, -1).toLowerCase();
};

exports.typeOf = typeOf;