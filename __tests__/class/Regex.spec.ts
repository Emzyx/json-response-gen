import { ALPHA, ALPHA_1, EMAIL, LOWER_ALPHA_NUMERIC, Regex } from '../../src';

describe('Regex', () => {
  it('simple value test', () => {
    const regex = ALPHA(10, 15);
    const value = regex.build({});
    expect(regex.test(value)).toEqual(true);
  });

  it('simple alphanumeric test', () => {
    const regex = LOWER_ALPHA_NUMERIC(10);
    const value = regex.build({});
    expect(regex.test(value)).toEqual(true);
  });

  it('should pass ALPHA_1', () => {
    const reg1 = ALPHA_1(1).build({});
    expect(reg1.length).toEqual(1);
    const reg10 = ALPHA_1(10).build({});
    expect(reg10.length).toEqual(10);
    expect(new RegExp('^[A-Z][a-z]{9,9}$').test(reg10)).toEqual(true);
  });

  it('should pass EMAIL', () => {
    const em = EMAIL().build();
    expect(em.length).toEqual(9);
    const em5 = EMAIL(5).build();
    expect(em5.length).toEqual(9);
    const em27 = EMAIL(27).build();
    expect(em27.length).toEqual(27);
    const em50 = EMAIL(50, 'boog.com').build();
    expect(em50.length).toEqual(50);
  });
});
