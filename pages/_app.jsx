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
  const { asPath } = useRouter();
  useEffect(() => {
    const origin = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

    const URL = `${origin}${asPath}`;
    const parts = URL.split('//');
    const protocol = parts[0];
    const rest = parts[1];
    if (protocol === 'http:') {
      const newURL = `https://${rest}`;
      router.push(newURL);
    }
  });
  const component = (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
  return component;
};

export default appWithTranslation(HexletComparator);
