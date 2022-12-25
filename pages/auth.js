// import { unstable_getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AuthForm from "../components/auth/auth-form"
import Loader from "../components/loader/Loader"
// import { authOptions } from "./api/auth/[...nextauth]"

const AuthPage = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const {data: session, status} = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/chat')
    } else {
      setIsLoading(false)
    }
  },[session])


  return isLoading ? <Loader/> : <AuthForm />
}

// export async function getServerSideProps(context) {
//   const session = unstable_getServerSession(context.req, context.res, authOptions)

//   if (session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       session
//     }
//   }
// }

export default AuthPage