import cn from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getSchools, getProfessions } from 'lib/api.js';
// import routes from 'lib/routes.js';
import { cartesian } from 'lib/utils.js';
import assetsRouter from 'lib/assetsRouter.js';
import routes from 'lib/routes.js';

const Value = (props) => {
  const {
    school,
    name,
    profession,
    index,
  } = props;

  const schoolProfession = school.professions[profession.id];

  if (!schoolProfession) {
    if (name === 'existence') {
      return <span>Нет такой профессии</span>;
    }

    return '';
  }

  let children;

  switch (name) {
    case 'link':
      children = schoolProfession.link;
      break;
    case 'duration':
      children = `${schoolProfession.duration} месяцев`;
      break;
    default:
      children = schoolProfession[name];
  }

  const classLine = cn('col p-3', {
    'border-end': index === 0,
  });

  return (
    <div className={classLine}>
      {children}
    </div>
  );
};

const ComparingBlock = (props) => {
  const { schools, name, profession } = props;

  const vdom = (
    <div className="row justify-content-center mb-4">
      <div className="col-8 rounded shadow-sm border-1">
        <h2 className="fs-4 mb-3">{name}</h2>
        <div className="border-top row justify-content-center row-cols-2">
          {schools.map((s, index) => <Value index={index} key={`${s.id}-${name}`} profession={profession} school={s} name={name} />)}
        </div>
      </div>
    </div>
  );

  return vdom;
};

const SchoolHeader = (props) => {
  const { school } = props;

  return (
    <div className="col-4">
      <Image layout="fixed" src={assetsRouter.logoPath(school)} width="50" height="50" alt={school.name} />
      <h2>
        <Link href={routes.schoolPath(school.id)}>{school.name}</Link>
      </h2>
    </div>
  );
};

const Home = (props) => {
  const { selectedSchools, profession } = props;
  const fields = ['existence', 'link', 'duration'];

  const header = `${profession.name} в школах ${selectedSchools.map((s) => s.name).join(' и ')}`;

  return (
    <BaseLayout>
      <Head>
        <title>{header}</title>
      </Head>
      <h1 className="mb-5">{header}</h1>
      <div className="row justify-content-center text-center row-cols-2 mb-5">
        {selectedSchools.map((s) => <SchoolHeader key={s.id} school={s} />)}
      </div>
      {fields.map((name) => <ComparingBlock profession={profession} schools={selectedSchools} name={name} key={name} />)}
    </BaseLayout>
  );
};

export const getStaticPaths = async () => {
  const schools = await getSchools();
  const ids = schools.map((s) => s.id);
  const matrix = cartesian(ids, ids);
  const competitorIdsLines = matrix.map(([a, b]) => `${a}-vs-${b}`);
  const professions = await getProfessions();
  const paths = professions.flatMap((profession) => {
    const result = competitorIdsLines.map((line) => ({ params: { professionId: profession.id, competitorIdsLine: line } }));
    return result;
  });

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const { params, locale } = context;
  const schools = await getSchools();
  const selectedSchools = params.competitorIdsLine.split('-vs-').map((id) => schools.find((s) => s.id === id));

  const professions = await getProfessions();
  const profession = professions.find((s) => s.id === params.professionId);

  const result = {
    props: {
      selectedSchools,
      profession,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
  return result;
};

export default Home;
