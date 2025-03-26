import { BuildOptions, Options } from '../types';
import RandExp from 'randexp';

export class Regex implements Options {
  pattern: RegExp;

  constructor(pattern: RegExp) {
    this.pattern = pattern;
  }

  build(buildOptions: BuildOptions, extraInfo?: {}): string {
    return new RandExp(this.pattern).gen();
  }

  test(value: any): boolean {
    return this.pattern.test(value);
  }
}
