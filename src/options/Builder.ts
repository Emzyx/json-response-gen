import { writeFile } from 'fs';
import { DEFAULT_DIR, SELECTION_TYPES } from '../constants';
import { BuildOptions, InputType, OutputType } from '../types';
import { get, handleValue, noop, prepDirs } from '../utils';

const defaultOptions: BuildOptions = {
  repetitions: 3,
  selectionType: SELECTION_TYPES.IN_ORDER,
  addSharedValue: noop,
  getSharedValue: noop,
  getFromGeneration: noop,
};
/**
 * TODO: Add support so names array propagates on buildSupplementals
 *
 */
export class Builder {
  results: OutputType[];
  path?: string;
  options: BuildOptions;
  valueMap: Map<string, any>;

  /**
   *
   * @param path  Path in which to save the files under
   * @param {BuildOptions} options Build options to configure the builder
   *
   */
  constructor(path?: string, options?: BuildOptions) {
    this.path = path;
    this.valueMap = new Map<string, any>();
    this.results = new Array();
    this.options = {
      ...defaultOptions,
      ...options,
      addSharedValue: this.addSharedValue,
      getSharedValue: this.getSharedValue,
      getFromGeneration: this.getFromGeneration,
    };
  }

  /**
   * @param result Result which was built, probly only used internally
   */
  addResult = (result: OutputType) => {
    const newResults = [...this.results, result];
    this.results = newResults;
  };

  /**
   * @returns Get result at index, defaults to 0, or first generated result
   */
  getResult = (index = 0) => {
    return this.results[index];
  };

  getResults = () => {
    return this.results;
  };

  addSharedValue = (key: string, value: any) => {
    this.valueMap.set(key, value);
  };

  getSharedValue = (key: string): any => {
    return this.valueMap.get(key);
  };

  /**
   *
   * @param key Key to get an item from the base generation, use '/' to get the root of the object, same as getResult()
   * @returns
   */
  getFromGeneration = (key: string, genNumber = 0): any => {
    if (key === '/') return this.results[genNumber];
    return get(this.results[genNumber], key, undefined);
  };

  /**
   * @param shape Shape of the object to build
   * @returns Same Builder object with baseGeneration populated for future builds, saved if save option is enabled
   */
  build = (shape: InputType, fileName?: string): Builder => {
    const result = handleValue(shape, this.options);
    this.addResult(result);

    const shouldSave = !!fileName;
    if (shouldSave) {
      const filePath = prepDirs(fileName);
      writeFile(`${filePath}`, JSON.stringify(result), 'utf8', noop);
    }
    return this;
  };
}
