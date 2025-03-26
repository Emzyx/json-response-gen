import { get } from '../src';

describe('selector tests', () => {
  describe('Tests for get function', () => {
    it('should get default value', () => {
      expect(get('test', 'testpath', 'defaultValue')).toEqual('defaultValue');
    });
    it('should get undefined for invalid path', () => {
      expect(get('test', '', 'defaultValue')).toEqual(undefined);
    });
    it('should get string via empty path', () => {
      expect(get('test', [], 'defaultValue')).toEqual('test');
    });
    it('should get string via array path', () => {
      const getValue = get(
        {
          test: {
            subField: 'subFieldValue',
          },
          test2: 'test2',
        },
        ['test', 'subField'],
        'defaultValue'
      );
      expect(getValue).toEqual('subFieldValue');
    });
    it('should get string via string path', () => {
      const getValue = get(
        {
          test: {
            subField: 'subFieldValue',
          },
          test2: 'test2',
        },
        'test.subField',
        'defaultValue'
      );
      expect(getValue).toEqual('subFieldValue');
    });
    it('should get object via path', () => {
      const getValue = get(
        { test: 'test', test2: 'test2' },
        ['test2'],
        'defaultValue'
      );
      expect(getValue).toEqual('test2');
    });
  });
});
