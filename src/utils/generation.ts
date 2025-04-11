import { Repetition } from '../options';
import { BuildProps } from '../types';
import { implementsOptions } from './utils';

export const handleValue = (
  value: any,
  buildOptions: BuildProps,
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

export const handleObject = (
  shape: object,
  buildOptions: BuildProps,
  extraInfo?: {}
): object => {
  const keyArr = Object.keys(shape);
  if (keyArr.length === 0) {
    return {};
  }
  const result = keyArr.reduce((prev: object, currKey: string): object => {
    const currVal: any = shape[currKey as keyof typeof shape];
    const currResult = handleValue(currVal, buildOptions, extraInfo);
    let _currResult;
    if (currVal?.shouldSpread && currResult instanceof Object) {
      _currResult = currResult;
    } else {
      _currResult = { [currKey]: currResult };
    }
    return {
      ...prev,
      ..._currResult,
    };
  }, {});

  return result;
};
