import Link from 'next/link';
import { getSchools } from 'lib/api.js';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import routes from 'lib/routes.js';

const SchoolItem = (props) => {
  const { school } = props;

  return (
    <div className="col mb-3">
      <div className="card">
        <div className="card-body">
          <Link href={routes.schoolPath(school.id)}>{school.name}</Link>
        </div>
      </div>
    </div>
  );
};

const SchoolsHome = (props) => {
  const { schools } = props;
  return (
    <BaseLayout>
      <h1 className="mb-5">Школы программирования</h1>
      <div className="row row-cols-2">
        {schools.map((s) => <SchoolItem school={s} key={s.id} />)}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async () => {
  const schools = await getSchools();

  const result = {
    props: {
      schools,
    },
  };
  return result;
};

export default SchoolsHome;
