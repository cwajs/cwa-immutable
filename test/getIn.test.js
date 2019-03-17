const { getIn } = require('../lib');

describe('function getIn', function() {

  it('deep get with array path', () => {
    const m = { a: { b: { c: 10 } } };
    expect(getIn(m, ['a', 'b', 'c'])).toEqual(10);
  });

  it('deep get with string path', () => {
    const m = { a: { b: { c: 10 } } };
    expect(getIn(m, 'a.b.c')).toEqual(10);
  });

  it('throws when path is not array and string', () => {
    expect(() => getIn([])).toThrow(
      '[cwa-immutable] Invalid path: expected String or Array, but got: undefined.'
    );
    expect(() => getIn([], null)).toThrow(
      '[cwa-immutable] Invalid path: expected String or Array, but got: null.'
    );
    expect(() => getIn([], 123)).toThrow(
      '[cwa-immutable] Invalid path: expected String or Array, but got: number.'
    );
    expect(() => getIn([], /hello/)).toThrow(
      '[cwa-immutable] Invalid path: expected String or Array, but got: regexp.'
    );
    expect(() => getIn([], true)).toThrow(
      '[cwa-immutable] Invalid path: expected String or Array, but got: boolean.'
    );
  });

  it('deep get returns not found if path does not match', () => {
    const m = { a: { b: { c: 10 } } };
    expect(getIn(m, ['a', 'b', 'z'])).toEqual(undefined);
    expect(getIn(m, ['a', 'b', 'z'], 123)).toEqual(123);
    expect(getIn(m, ['a', 'y', 'z'])).toEqual(undefined);
    expect(getIn(m, ['a', 'y', 'z'], 123)).toEqual(123);
  });

  it('does not use fallback when path does exist but value is null', () => {
    const m = { a: { b: { c: null, d: undefined } } };
    expect(getIn(m, ['a', 'b', 'c'])).toEqual(null);
    expect(getIn(m, ['a', 'b', 'd'])).toEqual(undefined);
    expect(getIn(m, ['a', 'b', 'c'], 123)).toEqual(null);
  });

  it('deep get returns fallback if path array contains invalidate subpath.', () => {
    const m = { a: { b: { c: null, d: undefined } } };
    expect(getIn(m, ['a', 'b', 'c', 'x'])).toEqual(undefined);
    expect(getIn(m, ['a', 'b', 'c', 'x'], 123)).toEqual(123);
    expect(getIn(m, ['a', new Date(), 'c', 'x'])).toEqual(undefined);
    expect(getIn(m, ['a', new Date(), 'c', 'x'], 123)).toEqual(123);
  });

  it('gets in nested plain Objects and Arrays', () => {
    const m = [{ key: ['item'] }];
    expect(getIn(m, [0, 'key', 0])).toEqual('item');
  });

  it('deep get returns not found if non-existing path in plain Object', () => {
    const deep = { key: { regular: 'jsobj' }, list: [{ num: 10 }] };
    expect(getIn(deep, ['key', 'foo', 'item'])).toBe(undefined);
    expect(getIn(deep, ['key', 'foo', 'item'], 'notSet')).toBe('notSet');
    expect(getIn(deep, ['list', 0, 'num', 'badKey'])).toBe(undefined);
    expect(getIn(deep, ['list', 0, 'num', 'badKey'], 'notSet')).toBe('notSet');
  });
});
