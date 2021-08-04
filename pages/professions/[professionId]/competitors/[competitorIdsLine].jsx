import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import _ from 'lodash';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getSchools, getProfessions } from 'lib/api.js';
// import routes from 'lib/routes.js';
import { cartesian } from 'lib/utils.js';
import assetsRoutes from 'lib/assetsRoutes.js';
import routes from 'lib/routes.js';

const Value = (props) => {
  const {
    school,
    name,
    profession,
    index,
  } = props;

  const program = school.programs[profession.id];

  let children;

  switch (name) {
    case 'link':
      children = program.link;
      break;
    case 'trial':
      children = program.trial ? 'Есть' : 'Нет';
      break;
    case 'duration':
      children = `${program.duration} месяцев`;
      break;
    case 'learning': {
      const { learning } = program;
      children = (
        <ul className="mb-0">
          <li>{learning.hasWebinars && 'Вебинары'}</li>
          <li>{learning.hasTexts && 'Текстовые уроки'}</li>
          <li>{learning.hasVideos && 'Записанное видео'}</li>
        </ul>
      );
      break;
    }
    case 'employment': {
      const { employment = {} } = program;
      children = (
        <ul>
          <li>{employment.exists ? 'Есть' : 'Нет'}</li>
        </ul>
      );
      break;
    }
    case 'internship': {
      const { internship } = program;
      if (!internship.exists) {
        return 'Стажировка отсутствует';
      }
      children = (
        <ul className="list-unstyled mb-0">
          <li>
            Внутренняя:
            {' '}
            {internship.hasInternal ? 'Есть' : 'Нет'}
          </li>
          <li>
            У партнеров:
            {' '}
            {internship.hasPartners ? 'Есть' : 'Нет'}
          </li>
        </ul>
      );
      break;
    }
    case 'price':
      children = `${program.price} рублей`;
      break;
    case 'practice': {
      const { practice } = program;
      if (!practice.exists) {
        return 'Практика отсутствует';
      }
      children = (
        <ul className="list-unstyled mb-0">
          <li>
            Тренажер:
            {' '}
            {practice.hasSimulator ? 'Есть' : 'Нет'}
          </li>
          <li>
            Автопроверки:
            {' '}
            {practice.hasAutomaticCheck ? 'Есть' : 'Нет'}
          </li>
        </ul>
      );
      break;
    }
    case 'mentoring': {
      const { mentoring } = program;
      children = (
        <ul>
          <li>{mentoring.exists ? 'Есть' : 'Нет'}</li>
        </ul>
      );
      break;
    }
    default:
      children = program[name] || '';
  }

  const classLine = cn('col p-3 d-flex', {
    'border-end': index === 0,
  });

  return (
    <div className={classLine}>
      <div className="mx-auto">{children}</div>
    </div>
  );
};

const ComparingBlock = (props) => {
  const { schools, name, profession } = props;

  const entities = useTranslation('entities');
  const common = useTranslation('common');

  const popover = (
    <Popover>
      <Popover.Body>
        {common.t(`school.descriptions.${name}`)}
      </Popover.Body>
    </Popover>
  );

  const vdom = (
    <div className="row justify-content-center mb-5">
      <div className="col-8">
        <div className="card">
          <div className="card-header d-flex">
            <h2 className="fs-4 m-0 my-1">{entities.t(`school.${name}`)}</h2>
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
              <i role="button" aria-label="Справка" className="fs-5 my-auto ms-auto bi bi-question-circle text-muted" />
            </OverlayTrigger>
          </div>
          <div className="card-body p-0">
            <div className="row g-0 lead">
              {schools.map((s, index) => <Value index={index} key={`${s.id}-${name}`} profession={profession} school={s} name={name} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return vdom;
};

const SchoolHeader = (props) => {
  const { school, profession } = props;

  const program = school.programs[profession.id];

  return (
    <div className="col-4">
      <Image layout="fixed" src={assetsRoutes.logoPath(school)} width="50" height="50" alt={school.name} />
      <h2>
        <span className="me-3">
          <Link href={routes.schoolPath(school.id)}>{school.name}</Link>
        </span>
        {program && (
          <Link href={program.link}>
            <a target="_blank" className="fs-4"><i className="bi bi-box-arrow-up-right" /></a>
          </Link>
        ) }
      </h2>
    </div>
  );
};

const Home = (props) => {
  const { t } = useTranslation('common');
  const { selectedSchools, profession } = props;

  const fields = ['duration', 'trial', 'price', 'learning', 'practice', 'internship', 'mentoring', 'employment'];

  const header = `Выбираю между ${selectedSchools.map((s) => s.name).join(' и ')}`;

  const canBeCompared = selectedSchools.every((s) => _.has(s.programs, profession.id));

  return (
    <BaseLayout>
      <NextSeo
        title={t('titles.title_comparison', {
          profession: profession.name,
          school_1: selectedSchools[0].name,
          school_2: selectedSchools[1].name,
        })}
        description={t('descriptions.description_comparison', {
          profession: profession.name,
          school_1: selectedSchools[0].name,
          school_2: selectedSchools[1].name,
        })}
      />
      <div className="lead">
        <Link href={routes.professionPath(profession.id)}>
          <a className="link-dark">{profession.name}</a>
        </Link>
      </div>
      <h1 className="mb-5">{header}</h1>
      <div className="row justify-content-center text-center row-cols-2 mb-5">
        {selectedSchools.map((s) => <SchoolHeader key={s.id} profession={profession} school={s} />)}
      </div>
      {!canBeCompared && <div className="lead text-center">Как минимум в одной из школ нет такой профессии. Сравнивать нечего</div>}
      {canBeCompared && fields.map((name) => <ComparingBlock profession={profession} schools={selectedSchools} name={name} key={name} />)}
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
      ...(await serverSideTranslations(locale, ['common', 'entities'])),
    },
  };
  return result;
};

export default Home;
