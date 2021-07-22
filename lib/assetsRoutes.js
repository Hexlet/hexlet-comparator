import _ from 'lodash';

const resolve = (school, parts) => {
  if (_.get(school, ['images', ...parts])) {
    return `/assets/schools/${school.id}/${parts.join('/')}.png`;
  }

  return `/assets/fallback/${parts.join('/')}.png`;
};

const assetRoutes = {
  logoPath: (school) => resolve(school, ['logo']),
  screenshotPath: (school, screenshot) => `/assets/schools/${school.id}/screenshots/${screenshot}.jpg`,
};

export default assetRoutes;
