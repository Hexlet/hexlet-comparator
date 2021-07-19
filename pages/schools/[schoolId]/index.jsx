import { useRouter } from 'next/router';
import Link from 'next/link';
// import Header from '../../../components/header'

const School = () => {
  const router = useRouter();
  const { schoolId } = router.query;

  return (
    <>
      <h1>
        School:
        {schoolId}
      </h1>
      <ul>
        <li>
          <Link href="/post/[schoolId]/[comment]" as={`/post/${schoolId}/first-comment`}>
            First comment
          </Link>
        </li>
        <li>
          <Link href="/post/[schoolId]/[comment]" as={`/post/${schoolId}/second-comment`}>
            Second comment
          </Link>
        </li>
      </ul>
    </>
  );
};

export default School;
