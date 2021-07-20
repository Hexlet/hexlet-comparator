import Link from 'next/link';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { getSchools, getProfessions } from 'lib/api.js';
import routes from 'lib/routes.js';
import { cartesian } from 'lib/utils.js';

const SchoolItem = (props) => {
  const { school } = props;

  const vdom = (
    <div className="col">
      <div className="card border-0 shadow-sm bg-light">
        <div className="card-body">
          <h2>{ school.name }</h2>
          <Link href={routes.schoolPath(school.id)}>Подробнее</Link>
        </div>
      </div>
    </div>
  );

  return vdom;
};

const Home = (props) => {
  const { selectedSchools } = props;
  return (
    <BaseLayout>
      <h1 className="mb-5">Сравнение</h1>
      <div className="row row-cols-2 g-2">
        {selectedSchools.map((s) => <SchoolItem key={s.id} school={s} />)}
      </div>
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
  const { params } = context;
  const schools = await getSchools();
  const selectedSchools = params.competitorIdsLine.split('-vs-').map((id) => schools.find((s) => s.id === id));
  console.log(selectedSchools);
  const result = {
    props: {
      selectedSchools,
    },
  };
  return result;
};

export default Home;
