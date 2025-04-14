import { existsSync, mkdirSync } from "fs";
import { DAY_RANGE, DEFAULT_MOCKS_DIR } from "../constants";
import { Options } from "../types";
import path from "path";

export function noop() {}

export function implementsOptions(object: any): object is Options {
  return !!(<Options>object)?.build;
}

/**
 * Wrapper for implementsOptions, just more semantic for testing
 */
export const hasTestFunc = (value: any) => {
  return implementsOptions(value);
};

export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getDay = (month: number, year: number): number => {
  const dayKey = month === 2 && isLeapYear(year) ? "LEAP" : month;
  return DAY_RANGE[dayKey as keyof typeof DAY_RANGE];
};

export const conditionalDatePrefix = (
  dateNumber: number,
  prefix = "0",
): string => {
  if (dateNumber < 10) {
    return `${prefix}${dateNumber}`;
  }
  return `${dateNumber}`;
};

/**
 * Util to change from a easy to define object on the user end, to a more practical one
 * @param lookupMap
 * @returns
 */
export const toReverseLookupMap = (
  lookupMap?: Object,
): { [key: string]: string } => {
  if (!lookupMap) return {};
  const reverseLookup = Object.keys(lookupMap).reduce((prevMap, currKey) => {
    const stringArr = <string[]>(
      (<unknown>lookupMap[currKey as keyof typeof lookupMap])
    );
    let keyMap: Object;
    if (stringArr.length === 0) {
      const lastKey = currKey.split(".").at(-1);
      keyMap = { [lastKey!]: lastKey };
    } else {
      keyMap = stringArr.reduce((prev, currValue) => {
        return {
          ...prev,
          [currValue]: currKey,
        };
      }, {});
    }
    return {
      ...prevMap,
      ...keyMap,
    };
  }, {});
  return reverseLookup;
};

export const shouldGetFromExtraDetails = (path: string): [boolean, string] => {
  const pathArr = path.split(".");
  const idx = pathArr.findIndex((str) => str === "?");
  if (idx === -1) return [false, path];
  return [true, pathArr.slice(idx + 1).join("")];
};

/**
 * Check for path, and recursively create path to write files
 */
export const prepDirs = (str: string, writeDir?: string) => {
  const dir = writeDir || DEFAULT_MOCKS_DIR;
  const fullPath = path.join(dir, str);
  const fullPath2 = fullPath.split("\\").join("/");

  const dirPath = fullPath.split("\\").slice(0, -1).join("/");

  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  return fullPath2;
};
