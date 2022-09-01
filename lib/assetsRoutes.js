import _ from 'lodash';

const resolve = (school, parts) => {
  if (_.get(school, ['images', ...parts])) {
    return `/assets/schools/${school.id}/${parts.join('/')}.svg`;
  }
  return `/assets/fallback/${parts.join('/')}.svg`;
};

const assetRoutes = {
  logoPath: (school) => resolve(school, ['logo']),
  screenshotPath: (school, screenshot) => `/assets/schools/${school.id}/screenshots/${screenshot}.jpg`,
  fallbackPath: '/assets/fallback/logo.svg',
  hexletLogoPath: '/assets/fallback/hexlet-logo.png',
};

export default assetRoutes;
