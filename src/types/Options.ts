import { BuildProps } from "./BuildProps";

export type Options = {
  build(buildOptions?: BuildProps, extraInfo?: {}): any | any[];
  test(value: any): boolean;
};
