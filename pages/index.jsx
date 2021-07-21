import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { getSchools } from 'lib/api.js';
import routes from 'lib/routes.js';
import assetsRouter from 'lib/assetsRouter.js';

const SchoolItem = (props) => {
  const { school } = props;

  const vdom = (
    <div className="col mb-5">
      <div className="card border-0 shadow-sm bg-light">
        <Image layout="responsive" src={assetsRouter.logoPath(school)} width="300" height="300" className="card-img-top" alt={school.name} />
        <div className="card-body text-center">
          <h2 className="h4 m-0">
            <Link href={routes.schoolPath(school.id)}>
              <a className="link-dark text-decoration-none stretched-link">{ school.name }</a>
            </Link>
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
      <div className="row row-cols-4">
        {schools.map((s) => <SchoolItem key={s.id} school={s} />)}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async ({ locale }) => {
  const result = {
    props: {
      schools: await getSchools(),
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
  return result;
};

export default Home;
