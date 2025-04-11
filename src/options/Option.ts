import { SELECTION_TYPES } from '../constants/constants';
import { BuildProps, OptionProps, Options } from '../types';
import { hasTestFunc, handleValue } from '../utils';

export class Option implements Options {
  selectionType?: string;
  array: any[];
  nextIdx: number;
  shouldSpread?: boolean;

  /**
   *
   * @param array - Array of options to select, if filled with Regex it returns a random instance of the pattern
   * @param selectionType - How to select the item, check out our SELECTION_TYPES
   */
  constructor(array: any[], options?: OptionProps) {
    this.array = array;
    this.nextIdx = 0;
    this.selectionType = options?.selectionType;
    this.shouldSpread = options?.shouldSpread;
  }

  /**
   * @returns an item from the given array depending on the selection type
   */
  build(buildOptions: BuildProps, extraInfo?: {}) {
    const selectionType = this.selectionType || buildOptions?.selectionType;
    let idx: number;
    if (selectionType === SELECTION_TYPES.RANDOM) {
      idx = Math.floor(Math.random() * this.array.length);
    } else {
      if (this.nextIdx >= this.array.length) {
        this.nextIdx = 0;
      }
      idx = this.nextIdx++;
    }
    const value = this.array[idx];
    return handleValue(value, buildOptions);
  }

  /**
   * Quick alias for the build function
   */
  b = this.build;

  test(value: any) {
    const result = this.array.some((option) => {
      if (hasTestFunc(option)) {
        return option.test(value);
      } else {
        return option === value;
      }
    });
    return result;
  }
}
