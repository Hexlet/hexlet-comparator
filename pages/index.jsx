import Link from 'next/link';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { getSchools } from 'lib/api.js';
import routes from 'lib/routes.js';

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
  const { schools } = props;
  return (
    <BaseLayout>
      <h1 className="mb-5">Сравнение школ программирования</h1>
      <div className="row row-cols-2 g-2">
        {schools.map((s) => <SchoolItem key={s.id} school={s} />)}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async () => {
  const result = {
    props: {
      schools: await getSchools(),
    },
  };
  return result;
};

export default Home;
