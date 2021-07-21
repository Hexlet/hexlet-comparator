import { appWithTranslation } from 'next-i18next';

import '../styles/app.scss';

const HexletComparator = ({ Component, pageProps }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const component = <Component {...pageProps} />;
  return component;
};

export default appWithTranslation(HexletComparator);
