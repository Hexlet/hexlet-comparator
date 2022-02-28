// @ts-check

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getProfessions } from 'lib/api.js';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import routes from 'lib/routes.js';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

const ProfessionItem = (props) => {
  const { profession } = props;

  const iconClassLine = cn(
    'colored fs-2',
    `devicon-${profession.programmingLanguage}-plain`,
  );

  return (
    <div className="col mb-3">
      <div className="card border-0 bg-light h-100">
        <div className="card-body">
          <i className={iconClassLine} />
          <h2>
            <Link href={routes.professionPath(profession.id)}>
              <a className="link-dark text-decoration-none stretched-link">{profession.name}</a>
            </Link>
          </h2>
          <div className="text-muted">{profession.description}</div>
        </div>
      </div>
    </div>
  );
};

const ProfessionsHome = (props) => {
  const { professions } = props;
  const { t } = useTranslation('common');

  return (
    <BaseLayout>
      <NextSeo
        title={t('titles.title_professions')}
        description={t('descriptions.description_professions')}
      />
      <h1 className="mb-5">{t('home.professions')}</h1>
      <div className="row row-cols-md-2">
        {professions.map((s) => <ProfessionItem profession={s} key={s.id} />)}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async ({ locale }) => {
  const professions = await getProfessions();

  const result = {
    props: {
      professions,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
  return result;
};

export default ProfessionsHome;
