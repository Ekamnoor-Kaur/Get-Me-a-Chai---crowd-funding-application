import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/app/models/User'
import Payment from '@/app/models/Payment'
import connectDB from '@/app/db/connectDB'

export const authoptions = ({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email }) {
      try {
        if (account.provider === "github") {
          await connectDB()
          const currentUser = await User.findOne({ email: user.email })
          if (!currentUser) {
            const NewUser = new User({    // new user: create them
              email: user.email,
              username: user.email.split("@")[0],
            })
            await NewUser.save()
          }
          return true
        }
      }
      catch (err) {
        // console.error('signIn failed:', err)
        return false
      }
    },
    async session({ session, token, user }) {
      await connectDB()
      const dbUser = await User.findOne({ email: session.user.email })
      if (dbUser) {
        session.user.name = dbUser.username
      }
      return session
    }
  }

})
const handler = NextAuth(authoptions)
export { handler as GET, handler as POST }