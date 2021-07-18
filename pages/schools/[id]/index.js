import { useRouter } from 'next/router'
import Link from 'next/link'
// import Header from '../../../components/header'

const School = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <h1>School: {id}</h1>
      <ul>
        <li>
          <Link href="/post/[id]/[comment]" as={`/post/${id}/first-comment`}>
            <a>First comment</a>
          </Link>
        </li>
        <li>
          <Link href="/post/[id]/[comment]" as={`/post/${id}/second-comment`}>
            <a>Second comment</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default School
