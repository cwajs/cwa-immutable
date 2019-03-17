const { setIn, getIn } = require('../lib');

describe('function setIn', function() {

  it('throws when path is not array and string', () => {
    expect(() => setIn([])).toThrow(
      '[cwa-immutable] Invalid path: expected String or Array, but got: undefined.'
    );
    expect(() => setIn([], null)).toThrow(
      '[cwa-immutable] Invalid path: expected String or Array, but got: null.'
    );
    expect(() => setIn([], 123)).toThrow(
      '[cwa-immutable] Invalid path: expected String or Array, but got: number.'
    );
    expect(() => setIn([], /hello/)).toThrow(
      '[cwa-immutable] Invalid path: expected String or Array, but got: regexp.'
    );
    expect(() => setIn([], true)).toThrow(
      '[cwa-immutable] Invalid path: expected String or Array, but got: boolean.'
    );
  });

  it('setIn a deep value', () => {
    const value = [ { aKey: ['bad', 'good'], other: {} } ];
    const newValue = setIn(value, [0, 'aKey', 1], 'great');
    expect(getIn(value, [0, 'aKey', 1])).toBe('good');
    expect(getIn(newValue, [0, 'aKey', 1])).toBe('great');
    expect(value === newValue).toBe(false);
    expect(value[0].other === newValue[0].other).toBe(true);
  });

  it('setIn a deep value when path no exists', () => {
    const m = setIn({}, ['a', 'b', 'c'], 'X');
    expect(m).toEqual({ a: { b: { c: 'X' } } });
  });

  it('returns value when setting empty path', () => {
    expect(setIn({}, [], 'X')).toBe('X');
  });

  it('setIn undefined', () => {
    const m = setIn({}, ['a', 'b', 'c'], undefined);
    const n = setIn({}, 'a.b.c', undefined);
    expect(m).toEqual({ a: { b: { c: undefined } } });
    expect(n).toEqual({ a: { b: { c: undefined } } });
  });

  it('setIn with string path', () => {
    const n = setIn({}, 'a.b.c', 'x');
    expect(n).toEqual({ a: { b: { c: 'x' } } });
  });

  it('returns self for a no-op', () => {
    const m = { a: { b: { c: 123 } } };
    expect(setIn(m, ['a', 'b', 'c'], 123)).toEqual(m);
  });

  it('deep setIn returns not found if path does not match', () => {
    const m = { a: { b: 134 } };
    const newM = setIn(m, ['a', 'b', 'z'], 321)
    expect(newM).toEqual({ a: { b: 134 } });
    expect(newM).not.toBe(m);
    expect(newM.a).not.toBe(m.a);
    expect(newM.b).toBe(m.b);
  });

  it('setIn with assign mode', () => {
    const m = { a: { b: { c: 1 } } };
    const m1 = setIn(m, ['a', 'b'], { d: 2 }, { assign: true });
    const m2 = setIn(m, ['a', 'b'], { d: 2 });
    expect(m1).toEqual({ a: { b: { c: 1, d: 2 } } });
    expect(m2).toEqual({ a: { b: { d: 2 } } });
  });

});
