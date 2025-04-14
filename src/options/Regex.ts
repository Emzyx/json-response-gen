import { BuildProps, Options } from "../types";
import RandExp from "randexp";

export class Regex implements Options {
  pattern: RegExp;

  constructor(pattern: RegExp) {
    this.pattern = pattern;
  }

  build(buildOptions?: BuildProps, extraInfo?: {}): string {
    return new RandExp(this.pattern).gen();
  }

  /**
   * Quick alias for the build function
   */
  b = this.build;

  test(value: any): boolean {
    return this.pattern.test(value);
  }
}
