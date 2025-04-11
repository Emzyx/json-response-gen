import { C, Regex } from '../options';

/**
 * Literally just generates the number given of 'words' where thats just random text between 4-10 in length
 */
export const ALPHA_PHRASE = (wordCount: number) => {
  return new C(() => {
    let phrase = ALPHA_1(4, 10)?.build({});
    for (let i = 1; i < wordCount; i++) {
      const next = LOWER_ALPHA(4, 10).build({});
      phrase += ` ${next}`;
    }
    return phrase;
  });
};

export const UPPER_ALPHA = (min: number, max = min) =>
  new Regex(new RegExp(`^[A-Z]{${min},${max}}$`));
export const LOWER_ALPHA = (min: number, max = min) =>
  new Regex(new RegExp(`^[a-z]{${min},${max}}$`));
export const ALPHA = (min: number, max = min) =>
  new Regex(new RegExp(`^[a-zA-Z]{${min},${max}}$`));

// First letter is capitalized
export const ALPHA_1 = (min: number, max = min) => {
  if (max == 1) return new Regex(new RegExp(`^[A-Z]$`));
  return new Regex(new RegExp(`^[A-Z][a-z]{${min - 1},${max - 1}}$`));
};

export const LOWER_ALPHA_NUMERIC = (min: number, max = min) =>
  new Regex(new RegExp(`^[a-z0-9]{${min},${max}}$`));
export const UPPER_ALPHA_NUMERIC = (min: number, max = min) =>
  new Regex(new RegExp(`^[A-Z0-9]{${min},${max}}$`));
export const ALPHA_NUMERIC = (min: number, max = min) =>
  new Regex(new RegExp(`^[a-zA-Z0-9]{${min},${max}}$`));

export const NUMERIC = (min: number, max = min) =>
  new Regex(new RegExp(`^[0-9]{${min},${max}}$`));

/**
 * Not RFC5322 compliant, just a quick rough email thing
 * @param length Length of string including domain name, @ sign, etc, min = 9 except when domain name is provided
 */
export const EMAIL = (length = 9, domain?: string) => {
  let eCount;
  let dCount;
  if (!!domain) {
    const dLen = domain.length;
    eCount = Math.max(1, length - (dLen + 1));
    dCount = 0;
  } else {
    const usableLen = Math.max(4, length - 5);
    eCount = Math.ceil(Math.max(1, (usableLen * 2) / 3));
    dCount = usableLen - eCount;
  }
  const dom =
    domain || `${ALPHA_NUMERIC(dCount).build({})}.${LOWER_ALPHA(3).build({})}`;
  return new C(() => `${ALPHA_NUMERIC(eCount).build({})}@${dom}`);
};
