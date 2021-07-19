import { useRouter } from 'next/router';
// import Link from 'next/link'
// import Header from '../../../components/header'

const Competitor = () => {
  const router = useRouter();
  const { competitorId } = router.query;

  return (
    <>
      <h1>
        Competitor Id:
        {competitorId}
      </h1>
    </>
  );
};

export default Competitor;
