/**
 *
 * @param obj Object to get data from
 * @param path Path to the data we want
 * @param defaultValue Default value
 */
export const get = (
  obj: object | string,
  path: string[] | string,
  defaultValue: any
) => {
  if (!path) return undefined;
  const pathArray = Array.isArray(path) ? path : path.match(/([^.[\]])+/g);
  const result = pathArray?.reduce(
    (prevObj, key) => prevObj && prevObj[key as keyof typeof prevObj],
    obj
  );
  return result === undefined ? defaultValue : result;
};
