import Link from 'next/link';
import { getSchools } from 'lib/api.js';
import { getOrError } from 'lib/utils.js';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import routes from 'lib/routes.js';

const ProfessionItem = (props) => {
  const { school, professionId } = props;
  const profession = getOrError(school.professions, professionId);

  return (
    <div className="col">
      <div className="card border-0 bg-light shadow-sm">
        <div className="card-body">
          <Link href={routes.professionPath(professionId)}>{profession.name}</Link>
        </div>
      </div>
    </div>
  );
};

const School = (props) => {
  const { school } = props;
  const professionIds = Object.keys(school.professions);
  return (
    <BaseLayout>
      <h1 className="mb-5">{school.name}</h1>
      <div className="row row-cols-2 g-2">
        {professionIds.map((id) => <ProfessionItem school={school} professionId={id} key={id} />)}
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
  // const allProfessions = await getProfessions();
  // const profession = allProfessions.find((s) => s.id === params.professionId);
  // console.log(allProfessions);
  // console.log(params.professionId, profession);

  const result = {
    props: {
      school,
      // profession,
    },
  };
  return result;
};

export default School;
