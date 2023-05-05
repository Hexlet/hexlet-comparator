/* eslint-disable react/jsx-props-no-spreading */
// @ts-check

import React, { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import SEO from '../next-seo.json';

import '../styles/app.scss';

const HexletComparator = ({ Component, pageProps }) => {
  const router = useRouter();
  const BASE_URL = process.env.HOST_NAME || 'http://localhost:3000';
  const ADDITIONAL_URL = router.asPath === '/' ? '' : router.asPath;
  const canonicalUrl = [BASE_URL, ADDITIONAL_URL].join('').split('?')[0];

  useEffect(() => {
    const env = process.env.NODE_ENV;
    const url = new URL(window.location.href);
    const { protocol } = url;
    if (protocol === 'http:' && env === 'production') {
      url.protocol = 'https:';
      router.push(url.href);
    }
  });

  const component = (
    <>
      <DefaultSeo
        {...SEO}
        canonical={canonicalUrl}
      />
      <Component {...pageProps} />
    </>
  );
  return component;
};

export default appWithTranslation(HexletComparator);
