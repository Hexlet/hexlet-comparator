// @ts-check

import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head.js';
import { Container, Row } from 'react-bootstrap';
import BaseLayout from '../components/layouts/BaseLayout.jsx';

const About = () => (
  <BaseLayout>
    <Head>
      <title>О проекте</title>
    </Head>
    <Container>
      <Row>
        <div className="m-2">
          <h1>О проекте</h1>
          <p>
            Hexlet Comparator - это проект с открытым исходным кодом, созданный и поддерживаемый сообществом Hexlet.
            Присоединяйтесь к сообществу, публикуйте резюме и оставляйте рекомендации другим участникам. Расскажите о сайте коллегам и друзьям!
            Исходный код платформы Hexlet Comparator доступен на GitHub. Вы можете поучаствовать в процессе разработки.
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

export default About;
