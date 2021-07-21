import Head from 'next/head';
import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';
import { getSchools, getProfessions } from 'lib/api.js';
import { getOrError } from 'lib/utils.js';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import routes from 'lib/routes.js';
import assetsRouter from 'lib/assetsRouter.js';

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
  const schoolProfession = getOrError(school.professions, professionId);

  const profession = professions.find((p) => p.id === professionId);
  const iconClassLine = cn(
    'colored fs-2',
    `devicon-${profession.programmingLanguage}-plain`,
  );

  return (
    <div className="col">
      <div className="card border-0 bg-light shadow-sm">
        <div className="card-body">
          <i className={iconClassLine} />
          <h3>
            <Link href={routes.professionPath(professionId)}>
              <a className="text-decoration-none link-dark stretched-link">{schoolProfession.name}</a>
            </Link>
          </h3>
          <div className="text-muted">{ profession.description }</div>
          <div>
            Продолжительность:&nbsp;
            {schoolProfession.duration}
            &nbsp;
            месяцев
          </div>
        </div>
      </div>
    </div>
  );
};

const School = (props) => {
  const { school, professions } = props;
  const professionIds = Object.keys(school.professions);
  // console.log(professionIds);
  const schoolProfessionLine = Object.values(school.professions).map((p) => p.name).join(', ');
  const description = `Школа основана в ${school.foundationDate}. Обучает по направлениям: ${schoolProfessionLine}`;

  return (
    <BaseLayout>
      <Head>
        <title>{school.name}</title>
      </Head>
      <div className="mx-5">
        <div className="card px-5 py-3 mb-5 bg-light border-0 shadow-sm">
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
                <Image layout="responsive" src={assetsRouter.logoPath(school)} width="200" height="200" alt={school.name} />
              </div>
            </div>
          </div>
        </div>

        <h2 className="mb-5">
          <a name="professions" href="#professions" className="text-decoration-none link-dark">Профессии</a>
        </h2>
        <div className="row row-cols-2">
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
  const { params } = context;
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
      // profession,
    },
  };
  return result;
};

export default School;
