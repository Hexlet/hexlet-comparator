const { CI } = process.env;

module.exports = {
  '*.{js,jsx}': (filenames) => `yarn lint . ${filenames.join(' ')}${CI ? ' --fix' : ''}`,
  'package.json': 'npmPkgJsonLint',
};
