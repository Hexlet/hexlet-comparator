/* eslint-disable react/jsx-props-no-spreading */
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';

import SEO from '../next-seo.json';

import '../styles/app.scss';

const HexletComparator = ({ Component, pageProps }) => {
  const component = (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
  return component;
};

export default appWithTranslation(HexletComparator);
