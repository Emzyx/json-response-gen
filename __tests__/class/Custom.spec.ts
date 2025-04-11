import { C } from '../../src';

describe('Custom', () => {
  it('within current date test', () => {
    const c = new C(() => {});
    expect(c.test('Nun')).toEqual(true);
  });
});
