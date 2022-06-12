import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
  providers: [
    SpotifyProvider({
      scope:
        'user-read-email playlist-modify-public playlist-modify-private user-library-modify user-library-read',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token
      }
      return token
    },
    async session(session, user) {
      session.user = user
      return session
    },
  },
})
