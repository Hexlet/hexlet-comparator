// @ts-check

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { getSchools } from 'lib/api.js';
import routes from 'lib/routes.js';
import assetsRoutes from 'lib/assetsRoutes.js';

const SchoolItem = (props) => {
  const { school } = props;

  const vdom = (
    <div className="col mb-5">
      <div className="card border-0 shadow-sm bg-light h-100">
        <div>
          <Image layout="responsive" src={assetsRoutes.logoPath(school)} width="300" height="300" className="card-img-top" alt={school.name} />
        </div>
        <div className="card-body text-center">
          <h2 className="h4 m-0">
            <Link href={routes.schoolPath(school.id)}>
              <a className="link-dark text-decoration-none stretched-link">{ school.name }</a>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );

  return vdom;
};

const Home = (props) => {
  const { schools } = props;
  const { t } = useTranslation('common');

  return (
    <BaseLayout>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <h1 className="mb-5 text-center">{t('title')}</h1>
      <div className="row justify-content-around py-5 bg-light rounded mb-5">
        <div className="col-3">
          <div className="fs-1">1</div>
          <i className="bi bi-chevron-right" />
          {t('home.choose_company')}
        </div>
        <div className="col-3">
          <div className="fs-1">2</div>
          <i className="bi bi-chevron-right" />
          {t('home.choose_profession')}
        </div>
        <div className="col-3">
          <div className="fs-1">3</div>
          <i className="bi bi-chevron-right" />
          {t('home.compare_company')}
        </div>
      </div>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 gx-2 g-sm-4">
        {schools.map((s) => <SchoolItem key={s.id} school={s} />)}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async ({ locale }) => {
  const result = {
    props: {
      schools: await getSchools(),
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
  return result;
};

export default Home;
