// @ts-check

const { i18n } = require('./next-i18next.config.js');

module.exports = {
  i18n,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      },
    );
    return config;
  },
  async redirects() {
    return [
        {
            source: '/',
            destination: ' https://schools.hexlet.io/',
            permanent: true,
            statusCode: 301,
        },
    ]
},
};
