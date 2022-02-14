import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import Head from 'next/head';
import assetsRoutes from '../lib/assetsRoutes';

const Custom500 = () => (
  <BaseLayout>
    <Head>
      <title>Внутренняя ошибка сервера</title>
    </Head>
    <Container>
      <Row>
        <div className="container-sm text-center">
          <Image layout="fixed" alt="page404" width="300" height="300" src={assetsRoutes.fallbackPath} />
          <h1 className="h4 text-center">Ой, похоже, что-то пошло не так!</h1>
          <p className="text-center">Мы уже решаем эту проблему</p>
        </div>
      </Row>
    </Container>
  </BaseLayout>
);

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Custom500;
