import { BuildOptions, Options } from '../types';
import { handleValue } from '../utils';

export class Shared implements Options {
  key: string;
  option: any;

  /**
   * @param key Key is string to be used to save/access data
   * @param option option is the value, another shape or any of our other utility classes, i.e. Option, Repetition, DateRange, Regex
   */
  constructor(key: string, option?: any) {
    this.key = key;
    this.option = option;
  }

  // Probably call a separate build for when it is a repetition being called back
  build(buildOptions: BuildOptions, extraInfo?: {}): any | any[] {
    const { addSharedValue, getSharedValue } = buildOptions;
    const currentValue = getSharedValue?.(this.key);
    if (!currentValue) {
      const genValue = handleValue(this.option, buildOptions);
      addSharedValue?.(this.key, genValue);
      return genValue;
    }
    return currentValue;
  }

  // TODO: test somehow or we can remove the test thing
  test(value: any): boolean {
    return true;
  }
}
