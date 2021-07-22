import _ from 'lodash';
import Link from 'next/link';
import Head from 'next/head';
import { getProfessions, getSchools } from 'lib/api.js';
// import { getOrError } from 'lib/utils.js';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import routes from 'lib/routes.js';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ComparingRow = (props) => {
  const { state, profession } = props;

  if (state.length < 2) {
    return <div className="fs-5 mb-3">Выберите 2 школы для сравнения</div>;
  }

  const comparingSchoolsLine = state.map((s) => s.name).join(' и ');
  const ids = state.map((s) => s.id);

  return (
    <div className="fs-5 mb-3">
      <Link href={routes.professionCompetitorPath(profession.id, ids)}>
        <a className="text-decoration-none">
          Сравниваем:&nbsp;
          <span className="me-2">{comparingSchoolsLine}</span>
          <i className="bi bi-chevron-double-right" />
        </a>
      </Link>
    </div>
  );
};

const ComparingButton = (props) => {
  const { setState, selected, school } = props;

  const addForCompare = () => setState((s) => [...s, school]);
  const removeFromCompare = () => setState((s) => s.filter((sch) => sch.id !== school.id));

  if (selected) {
    return <button type="button" onClick={removeFromCompare} className="btn btn-sm btn-outline-secondary">Убрать</button>;
  }

  return <button type="button" onClick={addForCompare} className="btn btn-sm btn-outline-primary">Добавить</button>;
};

const SchoolItem = (props) => {
  const {
    school,
    // profession,
    state,
    setState,
  } = props;

  // const schoolProfession = getOrError(school.professions, profession.id);

  const selected = !!state.find((s) => s.id === school.id);

  return (
    <div className="col mb-4">
      <div className="card bg-light border-0">
        <div className="card-body d-flex">
          <h2>
            <Link href={routes.schoolPath(school.id)}>
              <a className="link-dark text-decoration-none">{school.name}</a>
            </Link>
          </h2>
          <div className="text-end ms-auto my-auto">
            <ComparingButton school={school} selected={selected} setState={setState} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Profession = (props) => {
  const { schools, profession } = props;
  const [state, setState] = useState([]);
  return (
    <BaseLayout>
      <Head>
        <title>{profession.name}</title>
      </Head>
      <h1 className="mb-5">{profession.name}</h1>
      <ComparingRow state={state} schools={schools} profession={profession} />
      <div className="row row-cols-2">
        {schools.map((s) => <SchoolItem state={state} setState={setState} profession={profession} school={s} key={s.id} />)}
      </div>
    </BaseLayout>
  );
};

export const getStaticPaths = async () => {
  const professions = await getProfessions();
  const paths = professions.map((profession) => ({
    params: { professionId: profession.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const { params, locale } = context;
  const allSchools = await getSchools();
  const schools = allSchools.filter((s) => _.has(s.programs, params.professionId));
  const allProfessions = await getProfessions();
  const profession = allProfessions.find((s) => s.id === params.professionId);
  // console.log(allProfessions);
  // console.log(params.professionId, profession);

  const result = {
    props: {
      schools,
      profession,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
  return result;
};

export default Profession;
