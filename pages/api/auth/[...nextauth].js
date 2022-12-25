import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import connectToDatabase from '../../../lib/db'
import { comparePasswords } from '../../../lib/hash'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      secret: process.env.JWT_SECRET,
      pages: {
        singIn: '/auth',
      },
      credentials: {
        name: {
          label: 'Name',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'text',
        },
      },
      async authorize(credentials, req) {
        const client = await connectToDatabase()
        const db = client.db()

        const usersCollection = db.collection('users')

        const user = await usersCollection.findOne({ name: credentials.name })

        if (!user) {
          client.close()
          throw new Error('User does not exists!')
        }

        const isValid = await comparePasswords(
          credentials.password,
          user.hashedPassword
        )

        if (!isValid) {
          client.close()
          throw new Error('Name or password is incorrect')
        }

        client.close()
        return { id: user._id, name: user.name}
      },
      
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: { ...token.user },
      }
    },
  },
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)
