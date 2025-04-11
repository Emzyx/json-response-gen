import { BuildProps, Options } from '../types';

/**
 * Function to plug and play custom functions has an alias for less typing
 *
 * Equivalent of passing an object like:
 *
 *{ build: () => () }
 * @alias C
 */
export class Custom implements Options {
  callback: Function;
  shouldSpread: boolean;

  constructor(callback: Function, shouldSpread = false) {
    this.callback = callback;
    this.shouldSpread = shouldSpread;
  }

  build(buildOptions?: BuildProps, extraInfo?: {}): string {
    return this.callback();
  }

  /**
   * Quick alias for the build function
   */
  b = this.build;

  test(value: string) {
    return true;
  }
}

export { Custom as C };
