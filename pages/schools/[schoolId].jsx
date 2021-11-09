// @ts-check

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { NextSeo } from 'next-seo';
import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getSchools, getProfessions } from 'lib/api.js';
import { getOrError } from 'lib/utils.js';
import routes from 'lib/routes.js';
import assetsRoutes from 'lib/assetsRoutes.js';

import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { useTranslation } from 'next-i18next';

const descriptionFields = [
  'link', 'blog', 'email', 'ceo',
];

const SocialItem = (props) => {
  const { profile } = props;
  const classLine = `text-secondary bi bi-${profile.type} me-3`;

  return (
    <Link href={profile.link}>
      <a target="_blank">
        <i className={classLine} />
      </a>
    </Link>
  );
};

const DescriptionField = (props) => {
  const { t } = useTranslation('entities');
  const { name, school } = props;
  const value = school[name];

  if (!value) {
    return null;
  }

  let renderedValue;
  switch (name) {
    case 'ceo':
      renderedValue = <Link href={value.facebook}>{value.name}</Link>;
      break;
    default:
      renderedValue = value;
  }

  const vdom = (
    <div className="row lead justify-content-center col-rows-2 mb-2">
      <div className="col-4">{t(`school.${name}`)}</div>
      <div className="col-4">{renderedValue}</div>
    </div>
  );

  return vdom;
};

const ProfessionItem = (props) => {
  const { school, professionId, professions } = props;

  const program = getOrError(school.programs, professionId);
  const profession = professions.find((p) => p.id === professionId);
  const iconClassLine = cn(
    'colored fs-2',
    `devicon-${profession.programmingLanguage}-plain`,
  );

  return (
    <div className="row">
      <div className="col m-2">
        <div className="card border-0 bg-light shadow-sm">
          <div className="card-body">
            <i className={iconClassLine} />
            <h3>
              <Link href={{
                pathname: routes.professionPath(professionId),
                query: { school_id: school.id },
              }}
              >
                <a className="text-decoration-none link-dark stretched-link">{program.name}</a>
              </Link>
            </h3>
            <div className="text-muted">{profession.description}</div>
            <div>
              Продолжительность:&nbsp;
              {program.duration}
              &nbsp;месяцев
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Screenshot = (props) => {
  const { name, school, index } = props;

  const [modalShow, setModalShow] = useState(false);

  const modal = (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        Скриншот
      </Modal.Header>
      <Modal.Body className="text-center">
        <Image layout="responsive" alt={name} width="800" height="450" src={assetsRoutes.screenshotPath(school, name)} />
      </Modal.Body>
    </Modal>
  );

  return (
    <span className="me-3">
      <span role="button" tabIndex={index} onKeyDown={() => setModalShow(false)} onClick={() => setModalShow(true)}>
        <Image layout="fixed" alt={name} width="100" height="70" src={assetsRoutes.screenshotPath(school, name)} />
      </span>
      {modal}
    </span>
  );
};

const School = (props) => {
  const { t } = useTranslation('common');
  const { school, professions } = props;
  const professionIds = Object.keys(school.programs);
  // console.log(professionIds);
  const schoolProgramLine = Object.values(school.programs).map((p) => p.name).join(', ');
  const description = `Школа основана в ${school.foundationDate}. Обучает по направлениям: ${schoolProgramLine}`;
  const { screenshots = [] } = school.images;

  return (
    <BaseLayout>
      <NextSeo
        title={t('titles.title_school', { school: school.name })}
        description={t('descriptions.description_school', { school: school.name })}
      />
      <div className="mx-5">
        <div className="card px-5 py-3 mb-4 bg-light border-0 shadow-sm">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-7">
                <h1 className="mb-3">
                  <span className="me-3">{school.name}</span>
                  <Link href={school.link}>
                    <a className="fs-5 align-middle" target="_blank">
                      <i className="bi bi-box-arrow-up-right" />
                    </a>
                  </Link>
                </h1>
                <p className="lead">{description}</p>
                <div className="fs-3 mb-4">
                  {school.profiles.map((p) => <SocialItem profile={p} key={p.type} />)}
                </div>
                <Link href="#professions">
                  <a className="btn btn-primary me-3">Профессии</a>
                </Link>
                <Link href="#description">
                  <a className="btn btn-outline-dark">Описание</a>
                </Link>
              </div>
              <div className="d-none d-md-block col-sm-5 text-center">
                <Image layout="responsive" src={assetsRoutes.logoPath(school)} width="200" height="200" alt={school.name} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          {screenshots.map((name, index) => <Screenshot index={index} key={name} school={school} name={name} />)}
        </div>

        <div className="mb-5">
          <h2 className="mb-3">
            <a href="#description" className="text-decoration-none link-dark">Описание</a>
          </h2>

          {descriptionFields.map((f) => <DescriptionField key={f} school={school} name={f} />)}
        </div>

        <div>
          <h2 className="mb-3">
            <a href="#professions" className="text-decoration-none link-dark">Профессии</a>
          </h2>

          <div className="row row-cols-md-2">
            {professionIds.map((id) => <ProfessionItem professions={professions} school={school} professionId={id} key={id} />)}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export const getStaticPaths = async () => {
  const schools = await getSchools();
  const paths = schools.map((school) => ({
    params: { schoolId: school.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const { params, locale } = context;
  const allSchools = await getSchools();
  const school = allSchools.find((s) => s.id === params.schoolId);
  const professions = await getProfessions();
  // const profession = allProfessions.find((s) => s.id === params.professionId);
  // console.log(allProfessions);
  // console.log(params.professionId, profession);

  const result = {
    props: {
      school,
      professions,
      ...(await serverSideTranslations(locale, ['common', 'entities'])),
      // profession,
    },
  };
  return result;
};

export default School;
