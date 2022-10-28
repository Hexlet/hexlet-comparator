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

  useEffect(() => {
    const url = new URL(window.location.href);
    const { protocol } = url;
    if (protocol === 'http:') {
      url.protocol = 'https:';
      router.push(url.href);
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
