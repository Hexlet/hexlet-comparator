import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { getSchools } from 'lib/api.js';
import routes from 'lib/routes.js';
import assetsRouter from 'lib/assetsRouter.js';

const SchoolItem = (props) => {
  const { school } = props;

  const vdom = (
    <div className="col">
      <div className="card border-0 shadow-sm bg-light">
        <Image src={assetsRouter.logoPath(school)} width="300" height="300" className="card-img-top" alt={school.name} />
        <div className="card-body">
          <h2>
            <Link href={routes.schoolPath(school.id)}>{ school.name }</Link>
          </h2>
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
      <Head>
        <title>Сравнение школ программирования</title>
      </Head>
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
