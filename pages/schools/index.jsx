// @ts-check
import React from 'react';
// import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getSchools } from 'lib/api.js';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import routes from 'lib/routes.js';
import {
  Button,
} from 'react-bootstrap';

const SchoolItem = (props) => {
  const { school } = props;

  return (
    <div className="d-grid gap-2">
      <Button className="mb-3" href={routes.schoolPath(school.id)} variant="outline-secondary" size="lg">
        {school.name}
      </Button>
    </div>
  /* <div className="col mb-3">
      <div className="card">
        <div className="card-body">
          <Link href={routes.schoolPath(school.id)}>{school.name}</Link>
        </div>
      </div>
    </div> */
  );
};

const SchoolsHome = (props) => {
  const { schools } = props;
  const { t } = useTranslation('schools');

  return (
    <BaseLayout>
      <Head>
        <title>{ t('title') }</title>
      </Head>
      <h1 className="mb-5">{ t('title') }</h1>
      <div className="row row-cols-2">
        {schools.map((s) => <SchoolItem school={s} key={s.id} />)}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async ({ locale }) => {
  const schools = await getSchools();

  const result = {
    props: {
      schools,
      ...(await serverSideTranslations(locale, ['common', 'schools'])),
    },
  };
  return result;
};

export default SchoolsHome;
