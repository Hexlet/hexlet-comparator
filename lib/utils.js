// @ts-check

import _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const getOrError = (obj, key) => {
  if (!_.has(obj, key)) {
    throw new Error(`Key '${key}' not found`);
  }
  return obj[key];
};

export const cartesian = (/** @type {any[]} */ ...arrays) => {
  const result = arrays.reduce((a, b) => a.flatMap((x) => b.map((y) => [...x, y])), [[]]);
  return result;
};

export const upperFirst = (str) => _.upperFirst(str);

export const strReplace = (str, pattern, replacement) => _.replace(str, pattern, replacement);
