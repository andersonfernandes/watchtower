export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> => {
  const result: Partial<T> = {};

  (Object.keys(obj) as (keyof T)[]).forEach((key) => {
    if (!keys.includes(key as K)) {
      result[key] = obj[key];
    }
  });

  return result as Omit<T, K>;
};
