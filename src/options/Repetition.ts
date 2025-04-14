import { BuildProps, Options, RepetitionProps } from "../types";
import {
  get,
  handleValue,
  shouldGetFromExtraDetails,
  toReverseLookupMap,
} from "../utils";

/**
 * A class to use when describing an array shape
 */
export class Repetition implements Options {
  shape: any;
  options?: RepetitionProps;
  sharedOptions?: boolean;

  /**
   *
   * @param shape Object of the array element
   * @param repetitions Amount of elements in the array
   */
  constructor(shape: any, options?: RepetitionProps) {
    this.shape = shape;
    this.options = options;
    this.sharedOptions = !!options?.baseArrayPath;
  }

  /**
   * @returns Array filled with randomly generated elements of described shape
   */
  build(buildOptions: BuildProps, extraInfo?: {}): any[] {
    if (this.sharedOptions) {
      return this.buildShared(buildOptions, extraInfo);
    }
    const repetitions = this.options?.repetitions || buildOptions?.repetitions;
    return Array(repetitions)
      .fill(0)
      .map(() => handleValue(this.shape, buildOptions));
  }

  /**
   * Quick alias for the build function
   */
  b = this.build;

  buildShared(buildOptions: BuildProps, extraInfo = {}): any[] {
    const { getFromGeneration } = buildOptions;
    const { baseArrayPath, sharedKeysMap = {} } = this.options!;

    const [shouldGetFromExtra, newPath] = shouldGetFromExtraDetails(
      baseArrayPath!,
    );

    let baseArray: any[];
    if (shouldGetFromExtra) {
      const relativeValue = get(extraInfo, newPath, undefined);
      if (Array.isArray(relativeValue)) {
        baseArray = relativeValue;
      } else {
        // not pointed to a valid array to iterate, so nothing to iterate over.
        return [];
      }
    } else {
      baseArray = getFromGeneration?.(baseArrayPath!);
    }

    // Pointed to non array, cant iterate
    if (!Array.isArray(baseArray)) return [];

    // Reducing maps for easier gets
    const { toShare, toRename } = sharedKeysMap!;
    const reducedShare = toShare?.reduce((prev, currString) => {
      return {
        ...prev,
        [currString]: currString,
      };
    }, {});
    const reducedRename = toReverseLookupMap(toRename);
    const reducedMap: { [key: string]: string } = {
      ...reducedShare,
      ...reducedRename,
    };

    // Iterating over array
    return baseArray.map((currObj) => {
      const newGen = handleValue(this.shape, buildOptions, {
        ...extraInfo,
        ...currObj,
      });

      // Generated straight up array, so was given Repetition shape, no
      if (Array.isArray(newGen)) {
        return newGen;
      }

      // Provided shape doesnt return an object, so theres nothing to copy, unsure why buildShared was called, but a safety.
      if (!(newGen instanceof Object)) {
        return newGen;
      }

      // Unsure why it would be called in this instance, but people be crazy, this is just a copy basically.
      if (!(currObj instanceof Object)) {
        return currObj;
      }

      const sharedGen = Object.keys(reducedMap).reduce((prev, currKey) => {
        const oldKey = reducedMap[currKey];
        const sharedValue = currObj[oldKey];
        return {
          ...prev,
          [currKey]: sharedValue,
        };
      }, {});
      return {
        ...newGen,
        ...sharedGen,
      };
    });
  }

  /**
   * TODO:
   * what if:
   * Object: should we iterate and verify each object? its for testing so probly
   * Option: call its test function for generated value
   * Repetition: call test function for generated value i guess?
   * DateRange: call its test function for generated value
   * Regex: call its test function for generated value
   */
  test(value: any[]) {
    const isLength = value.length === this.options?.repetitions;

    return isLength;
  }
}
