import { Repetition } from '../options';
import { BuildOptions } from '../types';
import { implementsOptions } from './utils';

export const handleValue = (
  value: any,
  buildOptions: BuildOptions,
  extraInfo?: {}
): any => {
  if (implementsOptions(value)) {
    return value.build(buildOptions, extraInfo);
  } else if (Array.isArray(value)) {
    return new Repetition(value[0]).build(buildOptions, extraInfo);
  } else if (value instanceof Object) {
    return handleObject(value, buildOptions, extraInfo);
  }
  return value;
};

// Maybe Pss down some sharedOptions obj that contains map obj, shared paths, and more
export const handleObject = (
  shape: object,
  buildOptions: BuildOptions,
  extraInfo?: {}
): object => {
  const keyArr = Object.keys(shape);
  if (keyArr.length === 0) {
    return {};
  }
  const result = keyArr.reduce((prev: object, currKey: string): object => {
    const currVal: any = shape[currKey as keyof typeof shape];
    return {
      ...prev,
      [currKey]: handleValue(currVal, buildOptions, extraInfo),
    };
  }, {});

  return result;
};
