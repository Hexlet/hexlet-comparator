import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import Head from 'next/head';
import assetsRoutes from '../lib/assetsRoutes';

const Custom500 = () => {
  const { t } = useTranslation('common');
  return (
    <BaseLayout>
      <Head>
        <title>{ t('titles.title_error_unspecific') }</title>
      </Head>
      <Container>
        <Row>
          <div className="container-sm text-center">
            <Image layout="fixed" alt="page404" width="300" height="300" src={assetsRoutes.fallbackPath} />
            <h1 className="h4 text-center">{ t('error.unspecific.title') }</h1>
            <p className="text-center">{ t('error.unspecific.message') }</p>
          </div>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Custom500;
