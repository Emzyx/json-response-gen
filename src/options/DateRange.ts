import { NUMERIC } from '../utils/regexOptions';
import { BuildOptions, Options } from '../types';
import { conditionalDatePrefix, getDay } from '../utils';

/**
 * Builds a random date in MM/DD/YYYY
 */
export class DateRange implements Options {
  range: number;
  maxToday: boolean;

  /**
   * @param range +/- from current year
   */
  constructor(range: number, maxToday = true) {
    this.range = range;
    this.maxToday = maxToday;
  }

  /**
   * @returns date in MM/DD/YYY
   */
  build(buildOptions: BuildOptions, extraInfo?: {}): string {
    const month = (Number(NUMERIC(2).build(buildOptions)) % 12) + 1;
    const mult = [-1, 1][this.maxToday ? 0 : Math.floor(Math.random() * 2)];
    const year =
      new Date().getFullYear() + mult * Math.round(Math.random() * this.range);
    const day = getDay(month, year);

    return `${conditionalDatePrefix(month)}/${conditionalDatePrefix(day)}/${year}`;
  }

  test(value: string) {
    const reg = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    const year = value.slice(value.length - 4);
    const withinRange = Number(year) >= new Date().getFullYear() - this.range;
    return reg.test(value) && withinRange;
  }
}
