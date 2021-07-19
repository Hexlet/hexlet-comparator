const HexletComparator = ({ Component, pageProps }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const component = <Component {...pageProps} />;
  return component;
};

export default HexletComparator;
