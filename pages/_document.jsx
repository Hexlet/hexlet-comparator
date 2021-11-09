// @ts-check

import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html prefix="og: http://ogp.me/ns#">
        <Head>
          {process.env.NODE_ENV === 'production'
              && (
                // eslint-disable-next-line @next/next/next-script-for-ga
                <script
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer', "${process.env.NEXT_PUBLIC_GTM_ID}");`,
                  }}
                />
              )}
        </Head>
        <body>
          {process.env.NODE_ENV === 'production'
              && (
                <noscript>
                  <iframe
                    title="gtm"
                    src={`https://www.googletagmanager.com/ns.html?id="${process.env.NEXT_PUBLIC_GTM_ID}"`}
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                  />
                </noscript>
              )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
