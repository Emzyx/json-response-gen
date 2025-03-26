import {
  DEFAULT_DIR,
  getDay,
  implementsOptions,
  isLeapYear,
  noop,
  Options,
  prepDirs,
  SELECTION_TYPES,
  SelectionType,
  toReverseLookupMap,
} from '../src';

jest.mock('fs');

describe('utils tests', () => {
  describe('noop', () => {
    it('should have called noop', () => {
      noop();
      expect(noop()).not.toBeDefined();
    });
  });
  describe('type guard tests', () => {
    it('should pass for Options', () => {
      const selection: SelectionType = SELECTION_TYPES.RANDOM;
      const option: Options = {
        build: () => {},
        test: (value) => {
          return false;
        },
      };
      expect(implementsOptions(selection)).toEqual(false);
      expect(implementsOptions(option)).toEqual(true);
    });
  });

  describe('leap date tests', () => {
    it('should pass leap years', () => {
      const year3 = 3;
      const year298 = 298;
      const year1700 = 1700;
      const year2000 = 2000;
      expect(isLeapYear(year3)).toEqual(false);
      expect(isLeapYear(year298)).toEqual(false);
      expect(isLeapYear(year1700)).toEqual(false);
      expect(isLeapYear(year2000)).toEqual(true);
    });

    it('should get leap day', () => {
      const month2 = 2;
      const month10 = 10;
      const year3 = 3;
      const year298 = 298;
      const year1600 = 1600;
      const year2000 = 2000;
      expect(getDay(month2, year3)).toEqual(28);
      expect(getDay(month10, year298)).toEqual(31);
      expect(getDay(month2, year1600)).toEqual(29);
      expect(getDay(month2, year2000)).toEqual(29);
      expect(getDay(month10, year2000)).toEqual(31);
    });
  });

  describe('reverse lookup creation tests', () => {
    it('should generate reverse lookup with default behavior', () => {
      const ogMap = undefined;
      const resultMap = {};
      expect(toReverseLookupMap(ogMap!)).toEqual(resultMap);
    });

    it('should generate reverse lookup', () => {
      const ogMap = {
        originalKey1: ['newKey1', 'path1.newKey1'],
        'originalKey2.originalSubkey': [
          'path2.subPath.newKey2',
          'path2.subPath.subSubPath.newKey2',
        ],
      };
      const resultMap = {
        newKey1: 'originalKey1',
        'path1.newKey1': 'originalKey1',
        'path2.subPath.newKey2': 'originalKey2.originalSubkey',
        'path2.subPath.subSubPath.newKey2': 'originalKey2.originalSubkey',
      };
      expect(toReverseLookupMap(ogMap)).toEqual(resultMap);
    });

    it('should generate reverse lookup with generic key', () => {
      const ogMap = {
        'originalKey.originalSubkey': [],
        'originalKey2.originalSubkey2.biggestSubkey': [],
      };
      const resultMap = {
        originalSubkey: 'originalSubkey',
        biggestSubkey: 'biggestSubkey',
      };
      expect(toReverseLookupMap(ogMap)).toEqual(resultMap);
    });
  });

  describe('Path tests', () => {
    it('should return valid path', () => {
      const fileName = 'fileName.txt';
      const path = prepDirs(fileName);
      expect(path).toEqual(`${DEFAULT_DIR}/${fileName}`);
    });
    it('should return valid path', () => {
      const fileName = '/boogster/fileName.txt';
      const path = prepDirs(fileName);
      expect(path).toEqual(`${DEFAULT_DIR}${fileName}`);
    });
  });
});
