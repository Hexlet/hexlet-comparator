import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import Head from 'next/head';
import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getSchools, getProfessions } from 'lib/api.js';
import { getOrError } from 'lib/utils.js';
import routes from 'lib/routes.js';
import assetsRoutes from 'lib/assetsRoutes.js';

import BaseLayout from 'components/layouts/BaseLayout.jsx';

const SocialItem = (props) => {
  const { link, type } = props;
  if (!link) {
    return null;
  }

  const classLine = `text-secondary bi bi-${type} me-3`;

  return (
    <Link href={link}>
      <a target="_blank">
        <i className={classLine} />
      </a>
    </Link>
  );
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
              <Link href={routes.professionPath(professionId)}>
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
  const { school, professions } = props;
  const professionIds = Object.keys(school.programs);
  // console.log(professionIds);
  const schoolProgramLine = Object.values(school.programs).map((p) => p.name).join(', ');
  const description = `Школа основана в ${school.foundationDate}. Обучает по направлениям: ${schoolProgramLine}`;
  const { screenshots = [] } = school.images;

  return (
    <BaseLayout>
      <Head>
        <title>{school.name}</title>
      </Head>
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
                  <SocialItem link={school.facebookLink} type="facebook" />
                  <SocialItem link={school.twitterLink} type="twitter" />
                  <SocialItem link={school.youtubeLink} type="youtube" />
                  <SocialItem link={school.instagramLink} type="instagram" />
                  <SocialItem link={school.communityLink} type="chat-fill" />
                </div>
                <Link href="#professions">
                  <a className="btn btn-primary">Профессии</a>
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

        <h2 className="mb-5">
          <a name="professions" href="#professions" className="text-decoration-none link-dark">Профессии</a>
        </h2>
        <div className="row row-cols-md-2">
          {professionIds.map((id) => <ProfessionItem professions={professions} school={school} professionId={id} key={id} />)}
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
      ...(await serverSideTranslations(locale, ['common'])),
      // profession,
    },
  };
  return result;
};

export default School;
