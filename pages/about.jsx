// @ts-check

import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head.js';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import BaseLayout from '../components/layouts/BaseLayout.jsx';

const About = () => {
  const { t } = useTranslation('common');

  return (
    <BaseLayout>
      <Head>
        <title>{t('about_page.title')}</title>
      </Head>
      <Container>
        <Row>
          <div className="m-2">
            <h1>{t('about_page.title')}</h1>
            <p>
              {t('about_page.description')}
            </p>
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

export default About;
