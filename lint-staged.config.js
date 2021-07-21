const { CI } = process.env;

module.exports = {
  '*.{js,jsx}': (filenames) => `npm run lint . ${filenames.join(' ')}${CI ? ' --fix' : ''}`,
  'package.json': 'npmPkgJsonLint',
};
