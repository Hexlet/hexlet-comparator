// @ts-check

const { i18n } = require('./next-i18next.config.js');

const NEXT_PUBLIC_BASE_URL = (process.env.NODE_ENV === 'production') ? "https://schools.hexlet.io" : 'http://localhost:3000';

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
  env: {
    NEXT_PUBLIC_BASE_URL,
  },
};
