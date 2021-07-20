import _ from 'lodash';

const resolve = (school, parts) => {
  const slug = _.last(parts);

  if (_.get(school, parts)) {
    return `/assets/schools/${school.id}/${slug}.png`;
  }

  return `/assets/fallback/${slug}.png`;
};

const assetRoutes = {
  logoPath: (school) => resolve(school, ['images', 'logo']),
};

export default assetRoutes;
