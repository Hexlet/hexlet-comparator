import fsp from 'fs/promises';
import yaml from 'js-yaml';
import path from 'path';
import BaseLayout from 'components/layouts/BaseLayout.jsx';
import routes from 'lib/routes.js';

const ProfessionItem = (props) => {
  const { profession } = props;
  const vdom = (
    <div className="card">
      <div className="card-body">
        <h2>{ profession.name }</h2>
        <a href={routes.professionPath(profession.id)}>Подробнее</a>
      </div>
    </div>
  );

  return vdom;
};

const Home = (props) => {
  const { professions } = props;
  return (
    <BaseLayout>
      <h1>Сравнение школ программирования</h1>
      {professions.map((p) => <ProfessionItem key={p.id} profession={p} />)}
    </BaseLayout>
  );
};

export const getStaticProps = async () => {
  const professionsPath = path.join(process.cwd(), 'data', 'professions.yml');
  const data = await fsp.readFile(professionsPath, 'utf-8');
  const professions = yaml.load(data);
  // console.log(professions);
  const result = {
    props: {
      professions,
    },
  };
  return result;
};

export default Home;
