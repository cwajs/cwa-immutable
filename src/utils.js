const toString = Object.prototype.toString;

export const typeOf = (target) => {
  return toString.call(target).slice(8, -1).toLowerCase();
};
