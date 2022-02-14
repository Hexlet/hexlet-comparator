import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import Head from 'next/head';
import assetsRoutes from '../lib/assetsRoutes';

const Custom404 = () => (
  <BaseLayout>
    <Head>
      <title>Страница не найдена</title>
    </Head>
    <Container>
      <Row>
        <div className="container-sm text-center">
          <Image layout="fixed" alt="page404" width="300" height="300" src={assetsRoutes.fallbackPath} />
          <h1 className="h4 text-center">Ой, похоже, такой страницы нет!</h1>
          <p className="text-center">
            Но вы можете
            {' '}
            <Link href="/">
              <a className="align-middle">перейти на главную</a>
            </Link>
          </p>
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

export default Custom404;
