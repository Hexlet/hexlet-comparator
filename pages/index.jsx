import cn from 'classnames';
import Link from 'next/link';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import { getProfessions } from 'lib/api.js';
import routes from 'lib/routes.js';

const ProfessionItem = (props) => {
  const { profession } = props;
  const iconClassLine = cn(
    'colored fs-2',
    `devicon-${profession.programmingLanguage}-plain`,
  );

  const vdom = (
    <div className="col">
      <div className="card border-0 shadow-sm bg-light">
        <div className="card-body">
          <i className={iconClassLine} />
          <h2>{ profession.name }</h2>
          <div className="text-muted">{ profession.description }</div>
          <Link href={routes.professionPath(profession.id)}>Подробнее</Link>
        </div>
      </div>
    </div>
  );

  return vdom;
};

const Home = (props) => {
  const { professions } = props;
  return (
    <BaseLayout>
      <h1 className="mb-5">Сравнение школ программирования</h1>
      <div className="row row-cols-2 g-2">
        {professions.map((p) => <ProfessionItem key={p.id} profession={p} />)}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async () => {
  const result = {
    props: {
      professions: await getProfessions(),
    },
  };
  return result;
};

export default Home;
