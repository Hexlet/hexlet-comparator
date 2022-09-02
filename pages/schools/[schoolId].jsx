// @ts-check

import React, { useState } from 'react';
import { Modal, Carousel } from 'react-bootstrap';

import { NextSeo } from 'next-seo';
import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getSchools, getProfessions, getScreenshots } from 'lib/api.js';
import { getOrError } from 'lib/utils.js';
import routes from 'lib/routes.js';
import assetsRoutes from 'lib/assetsRoutes.js';

import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { useTranslation } from 'next-i18next';

const descriptionFields = [
  'link', 'blog', 'email', 'ceo', 'legal', 'address', 'foundationDate', 'supportOptions',
  'freezing', 'accessByPaymentTypes', 'areasOfStudy', 'learningVariants', 'ageRestriction',
  'owner', 'subscription', 'moneyback', 'installment', 'mobile', 'internship', 'careerConsultation',
  'preparingResume', 'codeReview', 'mentoring', 'phones', 'languages', 'resources', 'paymentMethods',
];

const SocialItem = (props) => {
  const { profile } = props;
  const classLine = `text-secondary fab fa-${profile.type} me-3`;

  return (
    <Link href={profile.link}>
      <a target="_blank">
        <i className={classLine} />
      </a>
    </Link>
  );
};

const DescriptionValue = (props) => {
  const { t } = useTranslation('dicts');
  const { name, value } = props;
  switch (name) {
    case 'link':
      return <Link href={value}>{value}</Link>;
    case 'owner':
      return <Link href={value.link}>{value.name}</Link>;
    case 'ceo':
      return <Link href={value.facebook || value.facebook === '' ? value.facebook : value.vk}>{value.name}</Link>;
    case 'phones':
      return value.map((p) => <a href={p.link} key={p.value}>{p.value}</a>);
    case 'moneyback':
      return <div>{value.exists ? value.description : t('response.no')}</div>;
    case 'mobile':
    case 'subscription':
    case 'internship':
    case 'careerConsultation':
    case 'preparingResume':
    case 'codeReview':
    case 'mentoring':
    case 'freezing':
      return <div>{value.exists ? t('response.yes') : t('response.no')}</div>;
    case 'installment':
      if (!value.exists) {
        return t('response.no');
      }
      return value.variants.join(', ');
    case 'resources':
      return value.map((r) => <div key={r.name}><Link href={r.link}>{r.name}</Link></div>);
    case 'legal':
      return (
        <div>
          <div>{value.name}</div>
          <div>{value.address}</div>
        </div>
      );
    case 'supportOptions':
      return <Link href={value.link}>{value.name}</Link>;
    case 'learningVariants':
      return value.join(', ');
    case 'languages':
      return value.join(', ');
    case 'paymentMethods':
      return value.join(', ');
    case 'accessByPaymentTypes':
      return value.join(', ');
    default:
      return value.toString();
  }
};

const DescriptionField = (props) => {
  const { t } = useTranslation('entities');
  const { name, school } = props;
  const value = school[name];

  if (!value) {
    return null;
  }

  const vdom = (
    <div className="row lead justify-content-center col-rows-2 mb-2">
      <div className="col-4">{t(`school.${name}`)}</div>
      <div className="col-4"><DescriptionValue name={name} value={value} /></div>
    </div>
  );

  return vdom;
};

const ProfessionItem = (props) => {
  const { t } = useTranslation('dicts');
  const { school, professionId, professions } = props;

  const program = getOrError(school.programs, professionId);
  const profession = professions.find((p) => p.id === professionId);
  const iconClassLine = cn(
    'colored fs-2',
    `devicon-${profession.programmingLanguage}-plain`,
  );

  return (
    <div className="col mb-4">
      <div className="card border-0 bg-light shadow-sm h-100">
        <div className="d-flex flex-column card-body">
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
          <div className="mt-auto">
            {t('period')}
            {t('duration', { duration: program.duration })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Screenshot = (props) => {
  const { t } = useTranslation('common');
  const {
    name,
    school,
    index,
    screenshots,
  } = props;

  const [modalShow, setModalShow] = useState(false);

  const [activeScreenshot, setActiveScreenshot] = useState(index);

  const handleHideModal = () => {
    setModalShow(false);
    setActiveScreenshot(index);
  };

  const handleSelect = (selectedIndex) => {
    setActiveScreenshot(selectedIndex);
  };

  const modal = (
    <Modal
      show={modalShow}
      onHide={handleHideModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {t('school.screenshot')}
      </Modal.Header>
      <Modal.Body className="text-center">
        <Carousel activeIndex={activeScreenshot} onSelect={handleSelect} variant="dark" indicators={false}>
          {screenshots.map((screenName) => (
            <Carousel.Item key={screenName}>
              <Image layout="responsive" alt={screenName} width="1440" height="900" src={assetsRoutes.screenshotPath(school, screenName)} />
            </Carousel.Item>
          ))}
        </Carousel>
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
  const { t, i18n } = useTranslation('common');
  const { school, professions, screenshots } = props;
  const currentLanguage = i18n.language;
  const professionIds = Object.keys(school.programs);
  // console.log(professionIds);
  const schoolProgramLine = Object.values(school.programs).map((p) => p.name).join(', ');
  const description = t('school.descriptions.info', {
    foundationDate: school.foundationDate,
    schoolProgramLine,
  });

  return (
    <BaseLayout>
      <NextSeo
        title={t('titles.title_school', { school: school.name[currentLanguage] })}
        description={t('descriptions.description_school', { school: school.name[currentLanguage] })}
      />
      <div className="mx-5">
        <div className="card px-5 py-3 mb-4 bg-light border-0 shadow-sm">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-7">
                <h1 className="mb-3">
                  <span className="me-3">{school.name[currentLanguage]}</span>
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
                <a className="btn btn-primary me-3" href="#professions">{t('school.professions')}</a>
                <a className="btn btn-outline-dark" href="#description">{t('school.describe')}</a>
              </div>
              <div className="d-none d-md-block col-sm-5 text-center">
                <Image layout="responsive" src={assetsRoutes.logoPath(school)} width="200" height="200" alt={school.name} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          {screenshots.map((name, index) => <Screenshot index={index} key={name} school={school} name={name} screenshots={screenshots} />)}
        </div>

        <div className="mb-5">
          <h2 className="mb-3">
            <a id="description" className="text-decoration-none link-dark">{t('school.describe')}</a>
          </h2>

          {descriptionFields.map((f) => <DescriptionField key={f} school={school} name={f} />)}
        </div>

        <div>
          <h2 className="mb-3">
            <a id="professions" className="text-decoration-none link-dark">{t('school.professions')}</a>
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
    // @ts-ignore
    params: { schoolId: school.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const { params, locale } = context;
  const allSchools = await getSchools();
  // @ts-ignore
  const school = allSchools.find((s) => s.id === params.schoolId);
  const professions = await getProfessions();
  const screenshots = await getScreenshots(school);
  // const profession = allProfessions.find((s) => s.id === params.professionId);
  // console.log(allProfessions);
  // console.log(params.professionId, profession);

  const result = {
    props: {
      school,
      professions,
      ...(await serverSideTranslations(locale, ['common', 'entities', 'dicts'])),
      screenshots,
      // profession,
    },
  };
  return result;
};

export default School;
