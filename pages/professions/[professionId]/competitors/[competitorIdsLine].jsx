import Link from 'next/link';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { getSchools, getProfessions } from 'lib/api.js';
// import routes from 'lib/routes.js';
import { cartesian } from 'lib/utils.js';

const Value = (props) => {
  const { school, name, profession } = props;
  const schoolProfession = school.professions[profession.id];

  switch (name) {
    case 'link':
      return schoolProfession.link;
    default:
      return schoolProfession[name];
  }
};

const Item = (props) => {
  const { schools, name, profession } = props;

  const vdom = (
    <tr>
      <td>{name}</td>
      {schools.map((s) => <td key={`${s.id}-${name}`}><Value profession={profession} school={s} name={name} /></td>)}
    </tr>
  );

  return vdom;
};

const Home = (props) => {
  const { selectedSchools, profession } = props;
  const fields = ['link', 'duration'];

  const header = `${profession.name} в школах ${selectedSchools.map((s) => s.name).join(' и ')}`;

  return (
    <BaseLayout>
      <h1 className="mb-5">{header}</h1>
      <div className="row row-cols-2 g-2">
        <table className="table table-striped">
          <tr>
            <th>&nbsp;</th>
            {selectedSchools.map((s) => <th key={s.id}>{s.name}</th>)}
          </tr>
          {fields.map((name) => <Item profession={profession} schools={selectedSchools} name={name} key={name} />)}
        </table>
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

  const professions = await getProfessions();
  const profession = professions.find((s) => s.id === params.professionId);

  const result = {
    props: {
      selectedSchools,
      profession,
    },
  };
  return result;
};

export default Home;
