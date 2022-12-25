import { unstable_getServerSession } from 'next-auth/next'
import Room from '../../components/room/room'
import { authOptions } from '../api/auth/[...nextauth]'

const Home = () => {
  return (
    <Room/>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default Home
