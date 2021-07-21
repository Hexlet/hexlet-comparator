import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';
import { getSchools, getProfessions } from 'lib/api.js';
import { getOrError } from 'lib/utils.js';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import routes from 'lib/routes.js';
import assetsRouter from 'lib/assetsRouter.js';

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

  return (
    <BaseLayout>
      <div className="mb-5">
        <h1 className="mb-5">{school.name}</h1>
        <Image layout="fixed" src={assetsRouter.logoPath(school)} width="300" height="300" className="card-img-top" alt={school.name} />
        { school.reviewsLink && <Link href={school.reviewsLink}><a target="_blank">Отзывы</a></Link> }
      </div>
      <h2 className="mb-5">Профессии</h2>
      <div className="row row-cols-2">
        {professionIds.map((id) => <ProfessionItem professions={professions} school={school} professionId={id} key={id} />)}
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
