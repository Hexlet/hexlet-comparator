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

export const getPathnameSortedBySchoolNames = (pathname) => {
  const partsPathname = pathname.split('/');
  const lastPartPathname = _.last(partsPathname);
  const sortedSchoolNames = lastPartPathname.split('-vs-').sort();
  const sortedLastPartPathname = sortedSchoolNames.join('-vs-');
  const newPartsOfPathname = _.dropRight(partsPathname);
  newPartsOfPathname.push(sortedLastPartPathname);
  const pathnameSortedBySchoolNames = newPartsOfPathname.join('/');
  return pathnameSortedBySchoolNames;
};

const translateBreadcrumb = (part, href, extra, t) => {
  const currentPath = href.split('/');
  const parentPage = currentPath.at(-2);

  switch (parentPage) {
    case '':
      return t(`${part}_page.title`);
    case 'schools':
      return extra.school.name.ru;
    case 'professions':
      return extra.profession.name;
    case 'competitors': {
      const [firstSchool, secondSchool] = extra.selectedSchools;
      return `${firstSchool.name.ru} ${t('home.and')} ${secondSchool.name.ru}`;
    }
    default:
      return t(`home.${part}`);
  }
};

export const getBreadcrumbs = (path, t, extra) => {
  const pathParts = _.compact(path.split('/'));
  const crumbs = pathParts.map((part, idx) => {
    const href = `/${pathParts.slice(0, idx + 1).join('/')}`;
    const normalizedPart = strReplace(part, '%20', ' ');
    const text = translateBreadcrumb(normalizedPart, href, extra, t);
    const id = idx + 1;
    return { text, href, id };
  });

  return [{ text: t('title'), href: '/', id: 0 }, ...crumbs];
};
