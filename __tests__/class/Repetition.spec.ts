import { Builder } from '../../src';
import { NESTED_10_ARRAY, NESTED_SIMPLE_OBJECT_ARRAY } from '../__utils__';

describe('Repetition', () => {
  it('nested array with primitive value', () => {
    const array = new Builder().build(NESTED_10_ARRAY).getResult();
    expect(NESTED_10_ARRAY.test(<[]>array)).toEqual(true);
  });

  it('nested array with simple object', () => {
    const array = new Builder().build(NESTED_SIMPLE_OBJECT_ARRAY).getResult();
    expect(NESTED_SIMPLE_OBJECT_ARRAY.test(<[]>array)).toEqual(true);
  });
});
