import invariant from 'invariant';
import { typeOf } from './utils';

/**
 *
 *
 * @param {Object|Array} target: The target
 * @param {Array} pathes
 * @param {Any} value
 */
const setIn = (target, pathes, value, opt = {}) => {
  invariant(
    ['string', 'array'].includes(typeOf(pathes)),
    `[cwa-immutable] Invalid path: expected String or Array, but got: ${typeOf(pathes)}.`
  );
  // transform string path to array
  if (typeof pathes === 'string') {
    pathes = pathes.split('.');
  }

  // return value to end the recursion
  if (!pathes.length) {
    return value;
  }

  const type = typeOf(target);

  // return when the value is invalidate
  if (type !== 'undefined' && type !== 'array' && type !== 'object') {
    return target;
  }

  // when value of path is not existed, create an object.
  if (type === 'undefined' && pathes.length) {
    target = {};
  }

  const newPathes = [...pathes];
  const path = newPathes.shift();
  target = type === 'array' ? [...target] : {...target};
  const newValue = setIn(target[path], newPathes, value, opt);

  // for assign mode
  if (
    typeof(target[path]) === 'object' &&
    typeOf(newValue) === 'object' &&
    opt.assign === true
  ) {
    target[path] = Object.assign({}, target[path], newValue);
  } else {
    target[path] = newValue;
  }


  return target;
}

export default setIn;
