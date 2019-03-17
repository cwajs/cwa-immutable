import invariant from 'invariant';
import { typeOf } from './utils';

/**
 *
 *
 * @param {Object|Array} target: The target
 * @param {Array} pathes
 * @param {*} fallback
 */
const getIn = (target, pathes, fallback) => {
  invariant(
    ['string', 'array'].includes(typeOf(pathes)),
    `[cwa-immutable] Invalid path: expected String or Array, but got: ${typeOf(pathes)}.`
  );

  // If the target is not array and object, just return fallback.
  const type = typeOf(target);

  if (type !== 'object' && type !== 'array') {
    return fallback;
  }

  // transform string path to array
  if (typeof pathes === 'string') {
    pathes = pathes.split('.');
  }

  pathes = [...pathes];

  while (pathes.length) {
    const type = typeOf(target);
    if (!['object', 'array'].includes(type)) {
      break;
    }
    const path = pathes.shift();
    if (typeof path !== 'number' && typeof path !== 'string') {
      break;
    }
    target = target[path];
  }

  return pathes.length || typeof target === 'undefined' ? fallback : target;
}

export default getIn;
