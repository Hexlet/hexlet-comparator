import BaseLayout from 'components/layouts/BaseLayout.jsx';

const Home = () => {
  const greeting = 'jopa';
  return (
    <BaseLayout>
      <h1>{greeting}</h1>
    </BaseLayout>
  );
};

export default Home;
