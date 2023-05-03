// @ts-check

import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head.js';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router.js';
import { getBreadcrumbs } from 'lib/utils.js';
import BaseLayout from '../components/layouts/BaseLayout.jsx';

const About = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const breadcrumbs = getBreadcrumbs(router.asPath, t);

  return (
    <BaseLayout breadcrumbs={breadcrumbs}>
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
