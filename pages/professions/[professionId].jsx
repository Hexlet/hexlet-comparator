import _ from 'lodash';
import Link from 'next/link';
import { getProfessions, getSchools } from 'lib/api.js';
import { getOrError } from 'lib/utils.js';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import routes from 'lib/routes.js';

const SchoolItem = (props) => {
  const { school, profession } = props;
  // console.log(school);
  const schoolProfession = getOrError(school.professions, profession.id);

  return (
    <div className="col md-3">
      <div className="card bg-light border-0">
        <div className="card-body">
          <h2>
            <Link href={routes.schoolPath(school.id)}>
              <a className="link-dark text-decoration-none">{school.name}</a>
            </Link>
          </h2>
          <div className="text-muted">{schoolProfession.link}</div>
        </div>
      </div>
    </div>
  );
};

const Profession = (props) => {
  const { schools, profession } = props;
  return (
    <BaseLayout>
      <h1 className="mb-5">{profession.name}</h1>
      <div className="row row-cols-2 g-2">
        {schools.map((s) => <SchoolItem profession={profession} school={s} key={s.id} />)}
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
  const { params } = context;
  const allSchools = await getSchools();
  const schools = allSchools.filter((s) => _.has(s.professions, params.professionId));
  const allProfessions = await getProfessions();
  const profession = allProfessions.find((s) => s.id === params.professionId);
  // console.log(allProfessions);
  // console.log(params.professionId, profession);

  const result = {
    props: {
      schools,
      profession,
    },
  };
  return result;
};

export default Profession;
