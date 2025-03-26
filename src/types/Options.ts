import { BuildOptions } from './Builder';

export type Options = {
  build(buildOptions: BuildOptions, extraInfo?: {}): any | any[];
  test(value: any): boolean;
};
