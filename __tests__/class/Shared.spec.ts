import { ALPHA, ALPHA_1, Shared } from '../../src';

describe('Shared', () => {
  it('should pass test', () => {
    const map = new Map();
    const getSharedValue = (key: string) => {
      return map.get(key);
    };
    const addSharedValue = (key: string, val: any) => {
      map.set(key, val);
    };

    const shared = new Shared('name', { value: ALPHA_1(5) });
    const res = shared.build({
      getSharedValue,
      addSharedValue,
    });
    expect(shared.test(res)).toEqual(true);
  });
});
