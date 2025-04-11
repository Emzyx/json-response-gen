import { BuildProps, Options, SharedProps } from '../types';
import { handleValue } from '../utils';

export class Shared implements Options {
  key: string;
  value: any;
  shouldSpread?: boolean;

  /**
   * @param key Key is string to be used to save/access data
   * @param options Object containing value to use/build if saving i.e. shape or any of our other utility classes, i.e. Option, Repetition, DateRange, Regex.
   * Also if it returns an object, if it should spread that.
   */
  constructor(key: string, options?: SharedProps) {
    this.key = key;
    this.value = options?.value;
    this.shouldSpread = options?.shouldSpread;
  }

  // Probably call a separate build for when it is a repetition being called back
  build(buildOptions: BuildProps, extraInfo?: {}): any | any[] {
    const { addSharedValue, getSharedValue } = buildOptions;
    const currentValue = getSharedValue?.(this.key);
    if (!currentValue) {
      const genValue = handleValue(this.value, buildOptions);
      addSharedValue?.(this.key, genValue);
      return genValue;
    }
    return currentValue;
  }

  /**
   * Quick alias for the build function
   */
  b = this.build;

  // TODO: test somehow or we can remove the test thing
  test(value: any): boolean {
    return true;
  }
}
