import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
  providers: [
    SpotifyProvider({

      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      token: 'https://accounts.spotify.com/api/token',
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email user-library-modify user-library-read',
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
